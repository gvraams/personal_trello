import { convertToArray, convertToObject } from "./utils";

const INITIAL_STATE = {
  records: {}
};

export const CREATE_LANE = "CREATE_LANE";
export const UPDATE_LANE = "UPDATE_LANE";
export const DELETE_LANE = "DELETE_LANE";
export const REARRANGE_LANES = "REARRANGE_LANES";

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default board;
