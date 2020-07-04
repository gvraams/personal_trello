import {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LANE,
  UPDATE_LANE,
  DELETE_LANE
} from "../reducers/board";

export const createBoard = payload => ({
  type: CREATE_BOARD,
  payload
});

export const updateBoard = payload => ({
  type: UPDATE_BOARD,
  payload
});

export const deleteBoard = payload => ({
  type: DELETE_BOARD,
  payload
});

export const createLane = payload => ({
  type: CREATE_LANE,
  payload
});

export const updateLane = payload => ({
  type: UPDATE_LANE,
  payload
});

export const deleteLane = payload => ({
  type: DELETE_LANE,
  payload
});
