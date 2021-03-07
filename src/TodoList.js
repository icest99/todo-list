import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos_state, toggleTodo }) {
  return todos_state.map((each) => {
    return (
      <Todo key={each.id} todos_fromTodoList={each} toggleTodo={toggleTodo} />
    );
  });
}
