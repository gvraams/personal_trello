import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  REARRANGE_CARDS
} from "../reducers/card";

export const createCard = payload => ({
  type: CREATE_CARD,
  payload
});

export const updateCard = payload => ({
  type: UPDATE_CARD,
  payload
});

export const rearrangeCards = payload => ({
  type: REARRANGE_CARDS,
  payload
});

export const deleteCard = payload => ({
  type: DELETE_CARD,
  payload
});
