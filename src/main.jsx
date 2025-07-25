import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    {/* className="dark:bg-slate-900 dark:text-white" */}
      <div >
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);
