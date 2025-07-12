import { createContext, useCallback, useContext } from "react";
import { useImmer } from "use-immer";

export type Todo = {
  type: "Fruit" | "Vegetable";
  name: string;
};

export const todos: Todo[] = [
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
  onTodoClick: (todo: Todo) => void;
};

const todosContextInitialValue: TodosContextType = {
  todos,
  vegetables: [],
  fruits: [],
  onTodoClick: () => {
    // Default no-op function
  },
};

const TodosContext = createContext<TodosContextType | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useImmer(todosContextInitialValue.todos);
  const [vegetables, setVegetables] = useImmer<Todo[]>([]);
  const [fruits, setFruits] = useImmer<Todo[]>([]);
  console.log({ todos, vegetables, fruits });

  const handleTodoClick = useCallback((todo: Todo) => {
    console.log(`Todo clicked: ${todo.name}`);

    if (todo.type === "Fruit") {
      setFruits((fruitsDraft) => {
        fruitsDraft.push(todo);
      });
    } else if (todo.type === "Vegetable") {
      setVegetables((vegetablesDraft) => {
        vegetablesDraft.push(todo);
      });
    }
    removeTodo(todo);

    setTimeout(() => {
      if (todo.type === "Fruit") {
        setFruits((fruitsDraft) =>
          fruitsDraft.filter((f) => f.name !== todo.name)
        );
      } else {
        setVegetables((vegetablesDraft) =>
          vegetablesDraft.filter((v) => v.name !== todo.name)
        );
      }
      addTodo(todo);
    }, 5000);
  }, []);

  const addTodo = useCallback((todo: Todo) => {
    setTodos((todosDraft) => {
      todosDraft.push(todo);
    });
  }, []);

  const removeTodo = useCallback((todo: Todo) => {
    setTodos((todosDraft) => todosDraft.filter((t) => t.name !== todo.name));
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, vegetables, fruits, onTodoClick: handleTodoClick }}
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
