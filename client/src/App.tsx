import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {

  return (
    <>
      <Toaster position="top-right" />
    
      <RouterProvider router={router} />;
    </>
  );
}
