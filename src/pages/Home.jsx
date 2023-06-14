import Header from "../components/Header";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <>
      <div className="grid place-items-center bg-blue-100 h-screen sm:px-6 font-sans overflow-hidden">
        <div className="w-full max-w-3xl shadow-lg rounded-lg p-2 sm:p-6 bg-white">
          <Header />
          <TodoList />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
