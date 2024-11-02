import React from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";
import {Provider} from "react-redux";
import {store} from "./store/store.js";

import "./styles/index.css";

const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const Teacher = lazy(() => import("./components/teacher/Teacher.jsx"));
const Student = lazy(() => import("./components/student/Student.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/profile",
    element: <App/>,
    children: [
      {
        path: "teacher",
        element: <Teacher/>
      },
      {
        path: "student",
        element: <Student/>
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