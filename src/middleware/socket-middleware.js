import { getCookie } from "../utils/getCookie";

export const socketMiddleware = (
    wsActions
) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const accessToken = getCookie("accessToken");
            const {
                wsInit,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(payload);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: accessToken };
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    };
};