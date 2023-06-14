import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
// import editImage from "../assets/images/edit.png";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import LoadingSingle from "./LoadingSingle";
import { MdOutlineCancel } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import useIsEditing from "../hooks/useIsEditing";

export default function Todo({ todo, index }) {
  // eslint-disable-next-line react/prop-types
  const { _id, title, description, todoStatus } = todo;
  const { isEditIngTodo, setIsEditIngTodo, setIsEditIngData } = useIsEditing();
  const queryClient = useQueryClient();
  const deleteTodoApi = async (data) => {
    try {
      const res = Axios.delete(`/api/tasks/${_id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Deleted Todo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="flex gap-x-1 justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-1 border-b border-gray-400/20 last:border-0">
      {deleteTodo.isLoading ? (
        <LoadingSingle />
      ) : (
        <>
          <div
            className={`select-none flex-1 ${
              todoStatus === "Completed" && "line-through"
            }`}
          >
            {title}
          </div>

          <div
            className={`select-none sm:flex-1 ${
              todoStatus === "Completed" && "line-through"
            }`}
          >
            {description}
          </div>

          <div>
            <span>{todoStatus}</span>
          </div>
          <div>
            <AiOutlineEdit
              size={25}
              className="cursor-pointer text-red-400 transition hover:text-red-500"
              onClick={() => {
                setIsEditIngTodo(true);
                setIsEditIngData({
                  id: _id,
                  title,
                  description,
                  todoStatus,
                });
              }}
            />
          </div>
          <div>
            <AiOutlineDelete
              size={25}
              className="cursor-pointer text-red-400 transition hover:text-red-500"
              onClick={deleteTodo}
            />
          </div>
        </>
      )}
    </div>
  );
}
