import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "@/App.tsx";
import { store } from "@/redux/store";
import "@/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer position="bottom-right" autoClose={5000} />
    <App />
  </Provider>
);
