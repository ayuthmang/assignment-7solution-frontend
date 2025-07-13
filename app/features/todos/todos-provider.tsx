import {createContext, useCallback, useContext, useRef} from "react";
import {useTodoList} from "./use-todo-list";
import rawTodos from './data.json'
import {Todo} from "~/features/todos/types";

type TodosContextType = {
    todos: Todo[];
    vegetables: Todo[];
    fruits: Todo[];
    handleOnTodoClick: (todo: Todo) => void;
    handleOnFruitClick: (todo: Todo) => void;
    handleOnVegetableClick: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

const TODO_EXPIRY_DURATION_MS = 5000;

export function TodosProvider({children}: { children: React.ReactNode }) {
    const {todos, addTodo, removeTodo} = useTodoList({
        initialTodos: rawTodos as Todo[],
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
    const timeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
        new Map()
    );

    const handleOnTodoClick = useCallback(
        (todo: Todo) => {
            // remove from the current todo
            removeTodo(todo);
            if (todo.type === "Vegetable") {
                addVegetable(todo);
            } else if (todo.type === "Fruit") {
                addFruit(todo);
            }

            const interval = setTimeout(() => {
                if (todo.type === "Vegetable") {
                    removeVegetable(todo);
                } else if (todo.type === "Fruit") {
                    removeFruit(todo);
                }
                addTodo(todo);
            }, TODO_EXPIRY_DURATION_MS);
            timeoutRef.current.set(todo.name, interval);
        },
        [addFruit, addTodo, addVegetable, removeFruit, removeTodo, removeVegetable]
    );

    const handleOnFruitClick = useCallback(
        (todo: Todo) => {
            // remove from the vegetable list
            removeFruit(todo);

            // (if this todo is in the pending pool, then remove it)
            clearInterval(timeoutRef.current.get(todo.name));

            // add to the todo list
            addTodo(todo);
        },
        [addTodo, removeFruit]
    );

    const handleOnVegetableClick = useCallback(
        (todo: Todo) => {
            // remove from the vegetable list
            removeVegetable(todo);

            // (if this todo is in the pending pool, then remove it)
            clearInterval(timeoutRef.current.get(todo.name));

            // add to the todo list
            addTodo(todo);
        },
        [addTodo, removeVegetable]
    );

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
