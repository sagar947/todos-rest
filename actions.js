import axios from "axios";
import * as types from "./types";

export const fetchUsers = () => async (dispatch) => {
  let users = await axios
    .get("https://devza.com/tests/tasks/listusers", {
      headers: {
        AuthToken: "iE3rT27l71BGchrgkJwLukDvEny8t3ex",
      },
    })
    .then((res) => res.data.users)
    .catch((err) => console.log(err));
  dispatch({
    type: types.SET_USERS,
    payload: users,
  });
};

export const fetchTasks = () => async (dispatch) => {
  let tasks = await axios({
    method: "GET",
    url: "https://devza.com/tests/tasks/list",
    headers: {
      AuthToken: "iE3rT27l71BGchrgkJwLukDvEny8t3ex",
    },
  })
    .then((res) => res.data.tasks)
    .catch((err) => console.log(err));
  dispatch({
    type: types.SET_TASKS,
    payload: tasks,
  });
};

export const addNewTask = (taskDetails) => async (dispatch) => {
  let due_date = new Date(taskDetails.due_date);
  let bodyFormData = new FormData();
  bodyFormData.append("message", taskDetails.message);
  bodyFormData.append("due_date", due_date);
  bodyFormData.append("assigned_to", taskDetails.assigned_to);
  bodyFormData.append("priority", taskDetails.priority);
  await axios({
    method: "POST",
    url: "https://devza.com/tests/tasks/create",
    data: bodyFormData,
    headers: {
      AuthToken: "iE3rT27l71BGchrgkJwLukDvEny8t3ex",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
  dispatch(fetchTasks());
};

export const editTask = (taskDetails) => async (dispatch) => {
  let due_date = new Date(taskDetails.due_date);
  let bodyFormData = new FormData();
  bodyFormData.append("message", taskDetails.message);
  bodyFormData.append("due_date", due_date);
  bodyFormData.append("assigned_to", taskDetails.assigned_to);
  bodyFormData.append("priority", taskDetails.priority);
  bodyFormData.append("taskid", taskDetails.id);
  await axios({
    method: "POST",
    url: "https://devza.com/tests/tasks/update",
    data: bodyFormData,
    headers: {
      AuthToken: "iE3rT27l71BGchrgkJwLukDvEny8t3ex",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
  dispatch(fetchTasks());
  return Promise.resolve();
};

export const deleteTask = (taskid) => async (dispatch) => {
  let bodyFormData = new FormData();
  bodyFormData.append("taskid", taskid);
  await axios({
    method: "POST",
    url: "https://devza.com/tests/tasks/delete",
    headers: {
      AuthToken: "iE3rT27l71BGchrgkJwLukDvEny8t3ex",
    },
    data: bodyFormData,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  dispatch(fetchTasks());
  return Promise.resolve();
};
