import type { MetaFunction } from "@remix-run/node";
import { useTodosContext } from "~/features/todos/todos-provider";
import { Todo } from "~/features/todos/types";

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
    <div className="container mx-auto my-8 flex flex-col gap-4 p-4">
      <section className="flex flex-col gap-4">
        <SectionHeader>1. Auto Delete Todo List</SectionHeader>
        <div className="grid grid-cols-3 gap-x-4">
          <Column>
            <ColumnHeader>👉 Please Select</ColumnHeader>
            <div>
              <List items={todos} onTodoClick={handleOnTodoClick} />
            </div>
          </Column>
          <Column>
            <ColumnHeader>🍉 Fruit</ColumnHeader>
            <div>
              <List items={fruits} onTodoClick={handleOnFruitClick} />
            </div>
          </Column>
          <Column>
            <ColumnHeader>🥬 Vegetable</ColumnHeader>
            <div>
              <List items={vegetables} onTodoClick={handleOnVegetableClick} />
            </div>
          </Column>
        </div>
      </section>

      <hr className="border-t border-dashed border-gray-400" />

      <section className="flex flex-col gap-4">
        <SectionHeader>2) Department API</SectionHeader>
        <a className="underline text-blue-400" href="departments">
          Click here
        </a>
      </section>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl/8 font-bold bg-gray-100">{children}</h2>;
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-4 border-gray-100 border-solid">
      {children}
    </div>
  );
}

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg/8 font-bold bg-gray-100 ">{children}</h3>;
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
