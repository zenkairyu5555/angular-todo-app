import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo'
import { Statistic } from '../../models/statistic';

export const loadTodos = createAction(
  '[Todo] Load Todos'
);

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ title: string, description: string }>()
)

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<Todo>()
)

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<Todo>()
)

export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<Todo>()
)

export const markTodo = createAction(
  '[Todo] Mark Todo',
  props<Todo>()
)

export const markTodoSuccess = createAction(
  '[Todo] Mark Todo Success',
  props<Todo>()
)

export const getStatistics = createAction(
  '[Todo] Get Todo Statistics',
)

export const getStatisticsSuccess = createAction(
  '[Todo] Get Todo Statistic',
  props<{ statistics: Statistic[] }>()
)
