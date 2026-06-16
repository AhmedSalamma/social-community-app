import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import PostContextProvider from "./context/PostContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/stores/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PostContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </PostContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
