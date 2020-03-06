import React, { useState, useReducer } from "react";
import styled from "styled-components";

const TodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CheckBox = styled.input`
  width: 14px;
  height: 14px;
  border: 1px solid grey;
`;

interface Props {
  id: string;
  checked: boolean;
  text: string;
  onToggle: Function;
  onDelete: Function;
}

const Todo: React.FC<Props> = (props: Props) => {
  const { id, checked, text, onToggle, onDelete } = props;

  const handleToggle = (e: Event) => {
    onToggle(id);
  };
  const handleDelete = (e: Event) => {
    onDelete(id);
  };

  return (
    <TodoContainer>
      <input type="checkbox" id={id} name="checkbox" checked={checked} />
      <label
        htmlFor={id}
        className="ui-checkbox"
        onClick={handleToggle}
      ></label>
      <label
        onClick={handleToggle}
        style={{
          textDecoration: checked ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {text}
      </label>
      <div onClick={handleDelete} style={{ marginLeft: 10, cursor: "pointer" }}>
        x
      </div>
    </TodoContainer>
  );
};

export default Todo;
