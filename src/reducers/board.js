import { convertToArray, convertToObject } from "./utils";
import uuid4 from "uuid4";

const boardRecords = {};
const laneRecords = {};

// Seed sample data
for (let boardNum = 0; boardNum < 17; boardNum += 1) {
  const boardId = uuid4();
  const laneIds = [];

  for (let laneNum = 0; laneNum <= 5; laneNum += 1) {
    const laneId = uuid4();
    const title = "Lane " + (laneNum + 1);
    const position = laneNum;

    const laneRecord = {
      id: laneId,
      title,
      position,
      boardId
    };

    laneIds.push(laneId);
    laneRecords[laneId] = laneRecord;
  }

  const boardRecord = {
    id: boardId,
    title: "Board " + (boardNum + 1),
    laneIds
  };

  boardRecords[boardId] = boardRecord;
}

const INITIAL_STATE = {
  records: boardRecords,
  lanes: laneRecords
};

export const CREATE_BOARD = "CREATE_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";

export const CREATE_LANE = "CREATE_LANE";
export const UPDATE_LANE = "UPDATE_LANE";
export const DELETE_LANE = "DELETE_LANE";
export const REARRANGE_LANES = "REARRANGE_LANES";

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      const { board } = action.payload;
      const { lanes = [] } = board;
      const laneIds = lanes.map(lane => lane.id);

      const record = {
        id: board.id,
        title: board.text,
        laneIds
      };

      return {
        ...state,
        records: {
          ...state.records,
          [record.id]: {
            ...state.recorods[record.id],
            ...record
          }
        },
        lanes: {
          ...state.lanes,
          ...convertToObject(lanes)
        }
      };
    }

    case UPDATE_BOARD: {
      const { board } = action.payload;

      return {
        ...state,
        records: {
          ...state.records,
          [board.id]: {
            ...state.records[board.id],
            ...board
          }
        }
      };
    }

    case DELETE_BOARD: {
      const recordId = action.payload.id;

      const filteredRecords = convertToArray(state.records).filter(
        board => board.id !== recordId
      );

      const filteredLanes = convertToArray(state.lanes).filter(
        lane => lane.boardId !== recordId
      );

      return {
        ...state,
        records: {
          ...filteredRecords
        },
        lanes: {
          ...filteredLanes
        }
      };
    }

    case CREATE_LANE:
    case UPDATE_LANE: {
      const { lane } = action.payload;
      const board = state.records[lane.boardId];
      board["laneIds"] = [...board["laneIds"], lane.id];

      return {
        ...state,
        records: {
          ...state.records,
          [board.id]: {
            ...state.records[board.id],
            ...board
          }
        },
        lanes: {
          ...state.lanes,
          [lane.id]: {
            ...state.lanes[lane.id],
            ...lane
          }
        }
      };
    }

    case DELETE_LANE: {
      const id = action.payload.id;
      const filteredLanes = convertToObject(
        convertToArray(state.lanes).filter(lane => lane.id !== id)
      );

      return {
        ...state,
        lanes: {
          ...filteredLanes
        }
      };
    }

    case REARRANGE_LANES: {
      const { lanes } = action.payload;
      const rearrangedLanes = {};

      lanes.forEach(lane => {
        const { id, position } = lane;

        rearrangedLanes[id] = {
          ...state.records[id],
          position
        };
      });

      return {
        ...state,
        records: {
          ...state.records,
          ...rearrangedLanes
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default board;
