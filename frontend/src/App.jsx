import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import WebRoutes from "./router/WebRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUser from "./hooks/useUser";
import usePosts from "./hooks/usePosts";
import { ThreeDots } from "react-loader-spinner";
import useCommunity from "./hooks/useCommunity";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useNotification from "./hooks/useNotification";

function App() {
  const { getProfile } = useUser();
  const { getNotification } = useNotification();
  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <WebRoutes />
    </>
  );
}
export default App;
