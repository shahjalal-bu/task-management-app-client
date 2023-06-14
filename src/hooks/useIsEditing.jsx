import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const useIsEditing = () => {
  const { isEditIngTodo, setIsEditIngTodo, isEditIngData, setIsEditIngData } =
    useContext(TodoContext);
  return { isEditIngTodo, setIsEditIngTodo, isEditIngData, setIsEditIngData };
};

export default useIsEditing;
