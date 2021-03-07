import React from "react";

export default function todos({ todos_fromTodoList, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todos_fromTodoList.id);
  }

  return (
    <div>
      <form action="#">
        <p>
          <label>
            <input
              type="checkbox"
              checked={todos_fromTodoList.complete}
              onChange={handleTodoClick}
            />
            <span>{todos_fromTodoList.name}</span>
          </label>
        </p>
      </form>
    </div>
  );
}
