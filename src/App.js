import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #27005d;
`;

const TodoInput = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #27005d;
  border-radius: 5px;
  font-size: 16px;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #9400ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #7200cc;
  }
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e4f1ff;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #aed2ff;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #27005d;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor || "#9400FF"};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#7200cc"};
  }
`;

const DeleteAllButton = styled(Button)`
  margin-top: 10px;
  background-color: #ff4d4d;
  &:hover {
    background-color: #cc0000;
  }
`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const saveEditTodo = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? editValue : todo));
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <AppContainer>
      <Header>Todo App</Header>
      <TodoInput
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Enter a new todo'
      />
      <AddButton onClick={addTodo}>Add Todo</AddButton>
      <TodoList>
        {todos.map((todo, index) => (
          <TodoItem key={index}>
            {editIndex === index ? (
              <>
                <EditInput
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <Button
                  bgColor='#00cc66'
                  hoverColor='#009944'
                  onClick={() => saveEditTodo(index)}
                >
                  Save
                </Button>
                <Button onClick={() => setEditIndex(null)}>Cancel</Button>
              </>
            ) : (
              <>
                {todo}
                <div>
                  <Button
                    bgColor='#ffaa00'
                    hoverColor='#cc8800'
                    onClick={() => editTodo(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    bgColor='#ff4d4d'
                    hoverColor='#cc0000'
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
      <DeleteAllButton onClick={deleteAllTodos}>Delete All</DeleteAllButton>
    </AppContainer>
  );
};

export default App;
