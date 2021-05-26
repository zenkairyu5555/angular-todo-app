import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import {
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
  addTodo,
  addTodoSuccess,
  deleteTodo,
  deleteTodoSuccess,
  markTodo,
  markTodoSuccess,
  getStatistics,
  getStatisticsSuccess
} from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => loadTodosFailure)
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap((payload) =>
        this.todoService.addTodo(payload.title, payload.description).pipe(
          map((todo) => addTodoSuccess(todo)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  markTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markTodo),
      mergeMap((payload) =>
        this.todoService.markTodo(payload.id).pipe(
          map((todo) => markTodoSuccess(todo)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap((payload) =>
        this.todoService.deleteTodo(payload.id).pipe(
          map(() => deleteTodoSuccess(payload)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStatistics),
      mergeMap(() =>
        this.todoService.getStatistics().pipe(
          map((statistics) => getStatisticsSuccess({statistics, })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
