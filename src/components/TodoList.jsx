import { useQuery } from "@tanstack/react-query";
// import Todo from "./Todo";
import Axios from "../utils/Axios";
import Loading from "./Loading";
import Todo from "./Todo";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";

export default function TodoList() {
  const [selectTodo, setSelectTodo] = useState("All");
  const getTodos = async (data) => {
    try {
      const res = await Axios.get("/api/tasks", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <Loading val={20000} />
        <Loading val={300} />
        <Loading val={360} />
        <Loading val={300} />
        <Loading val={360} />
      </>
    );
  }

  if (!isLoading && isError) {
    content = "There was an error";
  }

  if (!isLoading && !isError && todos?.length === 0) {
    content = "No todos found!";
  }

  if (!isLoading && !isError && todos?.length > 0) {
    if (selectTodo === "All") {
      content = todos
  
        .map((todo, index) => (
          <Todo key={todo._id} todo={todo} index={index} />
        ));
    } else {
      content = todos
        .filter((el) => el.todoStatus === selectTodo)
        .map((todo, index) => (
          <Todo key={todo._id} todo={todo} index={index} />
        ));
    }
  }

  const tabsItems = ["All", "Pending", "In Progress", "Completed"];

  return (
    <>
      <Tabs>
        <TabList>
          {tabsItems.map((el, index) => (
            <Tab key={index} onClick={() => setSelectTodo(el)}>
              {el}
            </Tab>
          ))}
        </TabList>
        {tabsItems.map((el, index) => (
          <TabPanel key={index}>
            <div className="mt-2 text-gray-700 text-sm h-[300px] overflow-y-auto overflow-x-auto todo-lists  ">
              {content}
            </div>
          </TabPanel>
        ))}
      </Tabs>

      <hr className="mt-4" />
    </>
  );
}
