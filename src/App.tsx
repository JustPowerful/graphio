import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import Project from "./routes/project/Project";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<div>Project list</div>} />
        <Route path="/project/:title" element={<Project />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
