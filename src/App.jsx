import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoContextProvider } from "./contexts/TodoContext";
const queryClient = new QueryClient();

const App = () => {
  return (
    <TodoContextProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ToastContainer />
      </QueryClientProvider>
    </TodoContextProvider>
  );
};

export default App;
