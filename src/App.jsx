import { Route, Link, Routes } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import "./styles.css";
import { getUsers, loadingSuccess } from "./redux.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.users;
  });
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}
