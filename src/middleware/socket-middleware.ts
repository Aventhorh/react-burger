import { getCookie } from "../utils/getCookie";
import { AnyAction, MiddlewareAPI, Middleware } from 'redux';

type TWSAction = {
    wsInit: string,
    wsSendMessage: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string
}

export const socketMiddleware = (
    wsActions: TWSAction
): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: (i: AnyAction) => void) => (action: AnyAction) => {
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