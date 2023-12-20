export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const FETCH_TASK_BY_ID_REQUEST = 'FETCH_TASK_BY_ID_REQUEST';
export const FETCH_TASK_BY_ID_SUCCESS = 'FETCH_TASK_BY_ID_SUCCESS';
export const FETCH_TASK_BY_ID_FAILURE = 'FETCH_TASK_BY_ID_FAILURE';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const fetchTasks = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTaskById = (taskId) => ({
  type: FETCH_TASK_BY_ID_REQUEST,
  payload: taskId,
});

export const addTask = (task) => ({
  type: ADD_TASK_REQUEST,
  payload: task,
});

export const updateTask = (taskId, task) => ({
  type: UPDATE_TASK_REQUEST,
  payload: { taskId, task },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK_REQUEST,
  payload: taskId,
});