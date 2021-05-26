import {
  // ActionReducer,
  ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Todo } from '../../models/todo';
import { Statistic } from '../../models/statistic';
import * as todoActions from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
  statistics: Statistic[]
}

const initialTodoState: TodoState = {
  todos: [],
  statistics: []
};

export interface AppState {
  todo: TodoState;
}

const todoReducer = createReducer(
  initialTodoState,
  on(todoActions.loadTodosSuccess, (state: TodoState, { todos }) => ({
    ...state,
    todos,
  })),
  on(todoActions.loadTodosFailure, (state: TodoState) => ({
    ...state,
    todos: [],
  })),
  on(todoActions.addTodoSuccess, (state: TodoState, todo) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(todoActions.deleteTodoSuccess, (state: TodoState, todo) => ({
      ...state,
      todos: state.todos.filter(t => t.id !== todo.id),
  })),
  on(todoActions.markTodoSuccess, (state: TodoState, todo) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id? todo: t),
  })),
  on(todoActions.getStatisticsSuccess, (state: TodoState, { statistics, }) => ({
    ...state,
    statistics,
  })),
);

export const selectTodos = (state: AppState) => state.todo.todos;
export const selectStatistics = (state: AppState) => state.todo.statistics;

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
