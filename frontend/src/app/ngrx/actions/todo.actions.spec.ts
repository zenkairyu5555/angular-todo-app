import * as fromTodo from './todo.actions';

describe('loadTodos', () => {
  it('should return an action', () => {
    expect(fromTodo.loadTodos().type).toBe('[Todo] Load Todos');
  });
});
