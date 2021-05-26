import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/todo';
import { Statistic } from '../models/statistic';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private todosUrl = 'http//localhost:3000/api/todos';  // URL to web api
  private todosUrl = 'http://localhost:3000/api/todos'; // URL to web api
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
   }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.todosUrl)
  }

  addTodo(title: string, description: string): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, { title, description }, this.httpOptions);
  }

  markTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.put<Todo>(url, this.httpOptions);
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  getStatistics(): Observable<Statistic[]> {
    const url = `${this.todosUrl}/statistics`;
    return this.http.get<Statistic[]>(url);
  }
}
