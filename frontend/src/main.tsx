import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";

import { Toaster } from "sonner";
import App from "./App";
import Login from "./Login";
import { ThemeProvider } from "next-themes";
import SecurePage from "./components/SecurePage";
import TopBar from "./components/TopBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity, //
      retry: 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <SecurePage>
          <TopBar />
          <App />
        </SecurePage>
      </QueryClientProvider>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark">
    <div className="bg-background text-text min-h-screen overflow-hidden font-semibold ">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  </ThemeProvider>
);
