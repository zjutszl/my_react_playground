import React from "react";
import TodoList from "./components/TodoList";
import styled from "styled-components";

const Layout = styled.div`
  min-height: 100vh;
  margin-left: 20vw;
  margin-top: 10vh;
`;

const App: React.FC<Props> = () => {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
};

export default App;
