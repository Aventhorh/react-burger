import { REGISTER_USER, TActions } from "./actions/actions";

type TDefaultRegister = {
  user: {
    success?: boolean;
  };
};

const defaultRegister: TDefaultRegister = {
  user: {},
};

export const registerUser = (
  state = defaultRegister,
  action: TActions
): TDefaultRegister => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
