import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectTodos } from 'src/app/ngrx/reducers';
import { loadTodos, addTodo, deleteTodo, markTodo } from 'src/app/ngrx/actions/todo.actions';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectTodos));
    this.getTodos();
  }

  getTodos(): void {
    this.store.dispatch(loadTodos());
  }

  add(title: string, description: string): void {
    title = title.trim();
    description = description.trim();
    if (!title) {
      return;
    }
    this.store.dispatch(addTodo({ title, description }));
  }

  mark(todo: Todo): void {
    this.store.dispatch(markTodo(todo));
  }

  delete(todo: Todo): void {
    this.store.dispatch(deleteTodo(todo));
  }
}
