import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import Spinner from "./components/common/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // react query stop refetch when switch browser tabs
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Spinner />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route {...route} />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
