import { combineReducers } from "redux";
import * as types from "./types";

const usersReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.SET_USERS:
      state = payload;
      return state;
    default:
      return state;
  }
};

const tasksReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.SET_TASKS:
      state = payload;
      return state;
    default:
      return state;
  }
};

const reducers = {
  users: usersReducer,
  tasks: tasksReducer,
};

export default combineReducers(reducers);
