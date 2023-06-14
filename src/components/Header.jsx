import plusImg from "../assets/images/plus.png";
import doubleTickImg from "../assets/images/double-tick.png";
import { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { IoMdOptions } from "react-icons/io";
import { MdOutlineSubtitles } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import useIsEditing from "../hooks/useIsEditing";

export default function Header() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const queryClient = useQueryClient();
  const { isEditIngTodo, setIsEditIngTodo, isEditIngData, setIsEditIngData } =
    useIsEditing(false);

  const postTodo = async (data) => {
    try {
      const res = Axios.post("/api/tasks", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate: addTodo } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Added Todo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTodoDescription("");
      setTodoTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleAddTodo = (event) => {
    event.preventDefault();
    addTodo({
      title: todoTitle,
      description: todoDescription,
      todoStatus: "Pending",
    });
  };
  const updateTodoApi = async (data) => {
    try {
      const res = await Axios.put(`/api/tasks/${isEditIngData?.id}`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate: updateTodo } = useMutation({
    mutationFn: updateTodoApi,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Updated Todo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTodoDescription("");
      setTodoTitle("");
      setIsEditIngTodo(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleUpdateTodo = (event) => {
    event.preventDefault();
    updateTodo(isEditIngData);
  };

  const deleteCompletdTodoApi = async () => {
    try {
      const res = Axios.delete("/api/completed");
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate: deleteCompletdTodo } = useMutation({
    mutationFn: deleteCompletdTodoApi,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Deleted Completed Todos!", {
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

  const markCompletdTodoApi = async () => {
    try {
      const res = Axios.put("/api/mark-completed");
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate: markCompletdTodo } = useMutation({
    mutationFn: markCompletdTodoApi,
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
    <>
      <div>
        {!isEditIngTodo && (
          <form
            className="flex flex-col sm:flex-row gap-x-1"
            onSubmit={handleAddTodo}
          >
            <div className="flex-1">
              <div className="flex items-center bg-gray-100 px-4 py-4 border border-b">
                <MdOutlineSubtitles className="w-8 h-8" />
                <input
                  type="text"
                  placeholder="Type your todo title"
                  required
                  onChange={(e) => setTodoTitle(e.target.value)}
                  value={todoTitle}
                  className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-4">
                <BiDetail className="w-8 h-8" />
                <input
                  type="text"
                  placeholder="Type your todo description"
                  required
                  onChange={(e) => setTodoDescription(e.target.value)}
                  value={todoDescription}
                  className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />
              </div>
            </div>
            {/* make it full height */}
            <div className="flex justify-center items-center w-24 bg-white shadow">
              <button
                type="submit"
                className="appearance-none  w-10 h-10  bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${plusImg})` }}
              ></button>
            </div>
          </form>
        )}
        {isEditIngTodo && (
          <form
            className="flex sm:flex-row gap-x-1"
            onSubmit={handleUpdateTodo}
          >
            <div className="flex-1">
              <div className="flex items-center bg-gray-100 px-4 py-4 border border-b">
                <MdOutlineSubtitles className="w-8 h-8" />
                <input
                  type="text"
                  placeholder="Type your todo title"
                  required
                  onChange={(e) =>
                    setIsEditIngData({
                      ...isEditIngData,
                      title: e.target.value,
                    })
                  }
                  value={isEditIngData?.title}
                  className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-4">
                <IoMdOptions className="w-8 h-8" />
                <input
                  type="text"
                  placeholder="Type your todo description"
                  required
                  onChange={(e) =>
                    setIsEditIngData({
                      ...isEditIngData,
                      description: e.target.value,
                    })
                  }
                  value={isEditIngData?.description}
                  className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-4">
                <BiDetail className="w-8 h-8" />
                <select
                  id="todoStatus"
                  value={isEditIngData?.todoStatus}
                  className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                  onChange={(e) =>
                    setIsEditIngData({
                      ...isEditIngData,
                      todoStatus: e.target.value,
                    })
                  }
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            {/* make it full height */}
            <div className="flex justify-center items-center w-24 bg-white shadow">
              <button
                type="submit"
                className="appearance-none  w-10 h-10  bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${plusImg})` }}
              ></button>
            </div>
          </form>
        )}
        <ul className="flex justify-between my-4 text-xs text-gray-500">
          <li
            className="flex space-x-1 cursor-pointer"
            onClick={markCompletdTodo}
          >
            <img className="w-4 h-4" src={doubleTickImg} alt="Complete" />

            <span className="hover:text-purple-700">Complete All Tasks</span>
          </li>
          <li className="cursor-pointer" onClick={deleteCompletdTodo}>
            Clear completed
          </li>
        </ul>
      </div>
      <hr className="mt-4" />
    </>
  );
}
