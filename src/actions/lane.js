import {
  CREATE_LANE,
  UPDATE_LANE,
  DELETE_LANE,
  REARRANGE_LANES
} from "../reducers/board";

export const createLane = payload => ({
  type: CREATE_LANE,
  payload
});

export const updateLane = payload => ({
  type: UPDATE_LANE,
  payload
});

export const rearrangeLanes = payload => ({
  type: REARRANGE_LANES,
  payload
});

export const deleteLane = payload => ({
  type: DELETE_LANE,
  payload
});
