import React from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";
import {Provider} from "react-redux";
import {store} from "./store/store.js";

import "./styles/index.css";

const App = lazy(() => import("./App.jsx"));
const Cats = lazy(() => import("./components/cats/Cats.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "cats",
        element: <Cats/>
      }
    ]
  }
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}/>
      </Suspense>
    </Provider>
  </React.StrictMode>
);