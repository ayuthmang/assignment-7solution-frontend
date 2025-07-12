import type { MetaFunction } from "@remix-run/node";
import { useTodosContext, type Todo } from "../providers/todos/todos-provider";

export const meta: MetaFunction = () => {
  return [
    { title: "Auto Delete Todo List" },
    { name: "description", content: "Welcome to Auto Delete Todo List" },
  ];
};

export default function Index() {
  const {
    todos,
    vegetables,
    fruits,
    handleOnTodoClick,
    handleOnFruitClick,
    handleOnVegetableClick,
  } = useTodosContext();

  return (
    <div className="grid grid-cols-3 gap-x-4">
      <Column>
        <ColumnHeader>Please Select</ColumnHeader>
        <div>
          <List items={todos} onTodoClick={handleOnTodoClick} />
        </div>
      </Column>
      <Column>
        <ColumnHeader>Fruit</ColumnHeader>
        <div>
          <List items={fruits} onTodoClick={handleOnFruitClick} />
        </div>
      </Column>
      <Column>
        <ColumnHeader>Vegetable</ColumnHeader>
        <div>
          <List items={vegetables} onTodoClick={handleOnVegetableClick} />
        </div>
      </Column>
    </div>
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border border-gray-100 border-solid">
      {children}
    </div>
  );
}

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

function List({
  items,
  onTodoClick,
}: {
  items: Todo[];
  onTodoClick: (todo: Todo) => void;
}) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <ListItem
          key={item.name}
          item={item}
          onClick={() => onTodoClick(item)}
        />
      ))}
    </ul>
  );
}

function ListItem({ item, onClick }: { item: Todo; onClick: () => void }) {
  return (
    <button
      type="button"
      key={item.name}
      className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200 block w-full"
      onClick={onClick}
    >
      {item.name}
    </button>
  );
}
