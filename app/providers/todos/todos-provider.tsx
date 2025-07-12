import { createContext, useCallback, useContext } from "react";
import { useImmer } from "use-immer";
import { useTodoList } from "./use-todo-list";

export type Todo = {
  type: "Fruit" | "Vegetable";
  name: string;
};

export const rawTodos: Todo[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

type TodosContextType = {
  todos: Todo[];
  vegetables: Todo[];
  fruits: Todo[];
  handleOnTodoClick: (todo: Todo) => void;
  handleOnFruitClick: (todo: Todo) => void;
  handleOnVegetableClick: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const { todos, addTodo, removeTodo } = useTodoList({
    initialTodos: rawTodos,
  });
  const {
    todos: fruits,
    addTodo: addFruit,
    removeTodo: removeFruit,
  } = useTodoList();
  const {
    todos: vegetables,
    addTodo: addVegetable,
    removeTodo: removeVegetable,
  } = useTodoList();

  const [pendingTodosMap, setPendingTodosMap] = useImmer<Map<string, Todo>>(
    new Map()
  );

  const handleOnTodoClick = useCallback((todo: Todo) => {
    // remove from the current todo
    removeTodo(todo);
    if (todo.type === "Vegetable") {
      addVegetable(todo);
    } else if (todo.type === "Fruit") {
      addFruit(todo);
    }
  }, []);

  const handleOnFruitClick = useCallback((todo: Todo) => {
    // remove from the vegetable list
    removeFruit(todo);

    // (if this todo is in the pending pool, then remove it)
    // TODO:

    // add to the todo list
    addTodo(todo);
  }, []);

  const handleOnVegetableClick = useCallback((todo: Todo) => {
    // remove from the vegetable list
    removeVegetable(todo);

    // (if this todo is in the pending pool, then remove it)
    // TODO:

    // add to the todo list
    addTodo(todo);
  }, []);

  console.log({ todos, vegetables, fruits });

  return (
    <TodosContext.Provider
      value={{
        todos,
        vegetables,
        fruits,
        handleOnTodoClick,
        handleOnFruitClick,
        handleOnVegetableClick,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodosContext() {
  const context = useContext(TodosContext);
  if (!context)
    throw new Error("useTodosContext must be used within a TodosProvider");
  return context;
}
