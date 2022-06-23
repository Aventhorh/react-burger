import { FORGOT_PASSWORD, TActions } from "./actions/actions";

type TDefaultForgotPassword = {
  password: string;
};

const defaultForgotPassword: TDefaultForgotPassword = {
  password: "",
};

export const forgotPassword = (
  state = defaultForgotPassword,
  action: TActions
): TDefaultForgotPassword => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
