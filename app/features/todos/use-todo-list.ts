import { useCallback } from "react";
import { useImmer } from "use-immer";

import {Todo} from "~/features/todos/types";


/**
 * Todo list hook that manages a list of todos.
 */
export function useTodoList({ initialTodos = [] }: { initialTodos?: Todo[]; } = {}) {
  const [todos, setTodos] = useImmer<Todo[]>(initialTodos);

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos((draft) => {
      const index = draft.findIndex((t) => t.name === newTodo.name);
      if (index === -1) draft.push(newTodo);
    });
  }, []);

  const removeTodo = useCallback((todo: Todo) => {
    setTodos((draft) => {
      const index = draft.findIndex((t) => t.name === todo.name);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }, []);

  return { todos, setTodos, addTodo, removeTodo };
}
