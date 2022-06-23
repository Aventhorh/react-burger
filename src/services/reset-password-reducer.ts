import { RESET_PASSWORD, TActions } from "./actions/actions";

type TDefaultResetPassword = {
  password: string;
};

const defaultResetPassword: TDefaultResetPassword = {
  password: "",
};

export const resetPassword = (
  state = defaultResetPassword,
  action: TActions
): TDefaultResetPassword => {
  switch (action.type) {
    case RESET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
