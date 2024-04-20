import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import Spinner from "./components/common/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { SideBarProvider } from "./context/SideBarContext";

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
        position="bottom-right"
        autoClose={3000}
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
        <SideBarProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {routes.map((route) => (
                  <Route {...route} />
                ))}
              </Routes>
            </Router>
          </AuthProvider>
        </SideBarProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
