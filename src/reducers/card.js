import { convertToArray, convertToObject } from "./utils";

const INITIAL_STATE = {
  records: {}
};

export const CREATE_CARD = "CREATE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const REARRANGE_CARDS = "REARRANGE_CARDS";

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CARD:
    case UPDATE_CARD: {
      const { card } = action.payload;

      return {
        ...state,
        records: {
          ...state.records,
          [card.id]: {
            ...state.records[card.id],
            ...card
          }
        }
      };
    }

    case DELETE_CARD: {
      const recordId = action.payload.id;

      const filteredRecords = convertToObject(
        convertToArray(state.records).filter(card => card.id !== recordId)
      );

      return {
        ...state,
        records: {
          ...filteredRecords
        }
      };
    }

    case REARRANGE_CARDS: {
      const { cards } = action.payload;
      const rearrangedCards = {};

      cards.forEach(card => {
        const { id, position } = card;

        rearrangedCards[id] = {
          ...state.records[id],
          position
        };
      });

      return {
        ...state,
        records: {
          ...state.records,
          ...rearrangedCards
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default board;
