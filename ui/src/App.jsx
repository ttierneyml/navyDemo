import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Templates
import StandardPageTemplate from "./templates/standard";

// Pages
import RootPage from "./routes/root";
import SearchPage from "./routes/search";
import DetailsPage from "./routes/details";
// import SourceDetailsPage from "./routes/source";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandardPageTemplate><RootPage /></StandardPageTemplate>,
  },
  {
    path: "/search",
    element: <StandardPageTemplate><SearchPage /></StandardPageTemplate>,
  },
  {
    path: "/details",
    element: <StandardPageTemplate><DetailsPage /></StandardPageTemplate>,
  }
]);


function App() {
    return <RouterProvider router={router} />
}

export default App
