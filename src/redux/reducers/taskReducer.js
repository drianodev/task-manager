import { 
  FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
  FETCH_TASK_BY_ID_SUCCESS, FETCH_TASK_BY_ID_FAILURE, 
  ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
  UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE,
  DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE
} from '../actions/taskActions';

const initialState = {
  tasks: [],
  deleteSuccess: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case FETCH_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        task: action.payload,
      };
    case FETCH_TASK_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        deleteSuccess: action.success, // Atualiza o estado de sucesso
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        deleteSuccess: false,
        error: action.error,
      };      
    default:
      return state;
  }
};

export default taskReducer;
