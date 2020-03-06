import React, { useState, useReducer, useEffect, useRef } from "react";
import Todo from "./Todo";
import * as R from "ramda";

function reducer(
  state: {
    text: string;
    todoList: Array<{
      id: string;
      checked: boolean;
      text: string;
    }>;
  },
  action: object
) {
  switch (action.type) {
    case "ToggleTodo":
      const { targetId } = action.payload;
      return {
        ...state,
        todoList: state.todoList.map(todo => {
          if (todo.id === targetId) {
            todo.checked = !todo.checked;
            return todo;
          }
          return todo;
        })
      };
    case "CheckAll":
      return {
        ...state,
        todoList: state.todoList.map(todo => {
          todo.checked = true;
          return todo;
        })
      };
    case "CancelAll":
      return {
        ...state,
        todoList: state.todoList.map(todo => {
          todo.checked = false;
          return todo;
        })
      };
    case "addTodo":
      const newTodo = action.payload;
      return {
        ...state,
        text: "",
        todoList: [
          ...state.todoList,
          {
            id: String(Math.random() * 10000),
            text: newTodo.text,
            checked: false
          }
        ]
      };
    case "DeleteTodo":
      const { targetId: id } = action.payload;
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== id)
      };
    case "updateInput":
      const { text } = action.payload;
      return {
        ...state,
        text
      };
    default:
      break;
  }
}

const initialState = {
  text: "",
  todoList: []
};

const TodoList: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const handleClick = (targetId: string) => {
    dispatch({ type: "ToggleTodo", payload: { targetId } });
  };

  const toggleAll = (e: Event) => {
    dispatch({ type: e.target.checked ? "CheckAll" : "CancelAll" });
  };

  const handleChange = (e: Event) => {
    dispatch({
      type: "updateInput",
      payload: {
        text: e.target.value
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      onAdd();
    }
  };

  const handleDelete = (targetId: string) => {
    dispatch({ type: "DeleteTodo", payload: { targetId } });
  };

  const onAdd = () => {
    if (!state.text) return;
    dispatch({ type: "addTodo", payload: { text: state.text } });
    inputRef.current && inputRef.current.focus();
  };

  return (
    <div>
      <input type="checkbox" id="toggleAll" onChange={toggleAll} />
      <label htmlFor="toggleAll" className="ui-checkbox" />
      <label>全选</label>
      {state.todoList.map((todo, index) => (
        <Todo
          key={index}
          {...todo}
          onToggle={handleClick}
          onDelete={handleDelete}
        />
      ))}
      <br />
      <input
        value={state.text}
        className="ui-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button className="ui-button" onClick={onAdd}>
        add todo
      </button>
    </div>
  );
};

export default TodoList;
