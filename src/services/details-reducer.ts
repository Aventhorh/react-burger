import { ADD_DETAILS, REMOVE_DETAILS, TActions } from "./actions/actions";

type TDefaultDetails = {
  details: {
    price?: number;
  };
};

const defaultDetails: TDefaultDetails = {
  details: {},
};

export const detailsReducer = (
  state = defaultDetails,
  action: TActions
): TDefaultDetails => {
  switch (action.type) {
    case ADD_DETAILS:
      return { ...state, details: action.payload };
    case REMOVE_DETAILS:
      return { details: action.payload };
    default:
      return state;
  }
};
