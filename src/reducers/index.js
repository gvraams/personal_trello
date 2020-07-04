import { combineReducers } from "redux";
import board from "./board";
import card from "./card";

export default combineReducers({
  board,
  card
});
