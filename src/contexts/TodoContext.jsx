import { createContext, useState } from "react";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [isEditIngTodo, setIsEditIngTodo] = useState(false);
  const [isEditIngData, setIsEditIngData] = useState({});

  return (
    <TodoContext.Provider
      value={{
        isEditIngTodo,
        setIsEditIngTodo,
        isEditIngData,
        setIsEditIngData,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoContextProvider };
