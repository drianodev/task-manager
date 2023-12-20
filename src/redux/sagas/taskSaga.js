import { put, takeLatest, call, all } from 'redux-saga/effects';
import { 
  FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
  DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE,
  ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
  UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE 
} from '../actions/taskActions';
import api from '../../services/api';

// Saga para buscar tarefas
function* fetchTasksSaga() {
  try {
    const response = yield call(api.get, '/tasks');
    yield put({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILURE, error: error.message });
  }
}

// Saga para adicionar tarefa
function* createTaskSaga(action) {
  try {
    const response = yield call(api.post, '/tasks', action.payload);
    yield put({ type: ADD_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_TASK_FAILURE, error: error.message });
  }
}

// Saga para atualizar tarefa
function* updateTaskSaga(action) {
  try {
    const response = yield call(api.put, `/tasks/${action.payload.taskId}`, action.payload.task);
    yield put({ type: UPDATE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_TASK_FAILURE, error: error.message });
  }
}

// Saga para excluir tarefa
function* deleteTaskSaga(action) {
  try {
    yield call(api.delete, `/tasks/${action.payload}`);
    yield put({ type: DELETE_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_TASK_FAILURE, error: error.message });
  }
}

// Função que reúne todas as sagas
function* taskSaga() {
  yield all([
    takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga),
    takeLatest(ADD_TASK_REQUEST, createTaskSaga),
    takeLatest(UPDATE_TASK_REQUEST, updateTaskSaga),
    takeLatest(DELETE_TASK_REQUEST, deleteTaskSaga),
  ]);
}

export default taskSaga;
