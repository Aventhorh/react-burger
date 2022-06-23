import { AUTH_USER_DATA, TActions } from "./actions/actions";

type TDefaultAuth = {
  userData: {
    user?: {
      success: boolean;
      user: {
        email: string;
        name: string;
      };
    };
    success?: boolean;
  };
};

const defaultAuth: TDefaultAuth = {
  userData: {},
};

export const authUserData = (
  state = defaultAuth,
  action: TActions
): TDefaultAuth => {
  switch (action.type) {
    case AUTH_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
