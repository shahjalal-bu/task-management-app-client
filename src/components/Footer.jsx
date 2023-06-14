
// import { useGetAllUnCompletedTodosQuery } from "../features/api/apiSlice";

export default function Footer({ setCompleted, setColor, color, completed }) {
//   const { data: unCompletedData, isSuccess } = useGetAllUnCompletedTodosQuery();

  return (
    <>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>50 tasks left</p>
        <ul className="flex space-x-1 items-center text-xs">
          <li
            className={`cursor-pointer ${completed === "all" && "font-bold"}`}
            onClick={() => {
              setColor("");
              setCompleted("all");
            }}
          >
            All
          </li>
          <li>|</li>
          <li
            className={`cursor-pointer ${
              completed === "incomplete" && "font-bold"
            }`}
            onClick={() => {
              setColor("");
              setCompleted("incomplete");
            }}
          >
            Incomplete
          </li>
          <li>|</li>
          <li
            className={`cursor-pointer ${
              completed === "complete" && "font-bold"
            }`}
            onClick={() => {
              setColor("");
              setCompleted("complete");
            }}
          >
            Complete
          </li>
          <li></li>
          <li></li>
          <li
            className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
              color === "green" && "bg-green-500"
            }`}
            onClick={() => {
              setCompleted("");
              setColor("green");
            }}
          ></li>
          <li
            className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
              color === "red" && "bg-red-500"
            }`}
            onClick={() => {
              setCompleted("");
              setColor("red");
            }}
          ></li>
          <li
            className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
              color === "yellow" && "bg-yellow-500"
            }`}
            onClick={() => {
              setCompleted("");
              setColor("yellow");
            }}
          ></li>
        </ul>
      </div>
    </>
  );
}
