import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUserAPI, editUserAPI } from "./redux";

export default function Form() {
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    address: { city: "" }
  });
  const [error, setError] = useState(true);

  const users = useSelector((state) => {
    return state.users;
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { edit } = location?.state;

  useEffect(() => {
    if (edit) {
      const { user: id } = location?.state;
      const editUser = users.find((user) => {
        return user.id === id;
      });
      setNewUser({
        id: editUser.id,
        name: editUser.name,
        email: editUser.email,
        username: editUser.username,
        address: { city: editUser.address.city }
      });
    }
  }, [edit]);

  useEffect(() => {
    if (newUser.name.length > 0 && newUser.email.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [newUser.name, newUser.email]);

  const handleForm = (e) => {
    if (e.target.name === "city") {
      setNewUser({
        ...newUser,
        address: { [e.target.name]: e.target.value }
      });
    } else {
      setNewUser({
        ...newUser,
        id: users.length + 1,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleEditForm = (e) => {
    if (e.target.name === "city") {
      setNewUser({ ...newUser, address: { [e.target.name]: e.target.value } });
    } else {
      setNewUser({
        ...newUser,
        id: newUser.id,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = () => {
    dispatch(addUserAPI(newUser));
    navigate("/");
  };

  const handleEditSubmit = () => {
    dispatch(editUserAPI(newUser));
    navigate("/");
  };

  function classNameGenerator(condition) {
    let classNames = ["input"];
    if (condition) {
      classNames.push("red");
    } else {
      classNames.push("green");
    }
    return classNames.join(" ");
  }

  return (
    <div className="Dashboard-Container">
      <h1 className="Dashboard-Title">Dashboard</h1>
      <div className="List-Container">
        <div className="List-Header">
          <h1 className="List-Title">Form</h1>
        </div>
        <div className="Form-Container">
          <div>
            <p>Name</p>
            <span className="input-container">
              <input
                className={classNameGenerator(error)}
                name="name"
                onChange={edit ? handleEditForm : handleForm}
                value={newUser.name}
                type="text"
                placeholder="enter your name"
              />
              <span>*Required</span>
            </span>
          </div>
          <div>
            <p>Email</p>
            <span className="input-container">
              <input
                className={classNameGenerator(error)}
                name="email"
                onChange={edit ? handleEditForm : handleForm}
                value={newUser.email}
                type="text"
                placeholder="enter your email"
              />
              <span>*Required</span>
            </span>
          </div>
          <div>
            <p>Username</p>
            <input
              className="input"
              name="username"
              onChange={edit ? handleEditForm : handleForm}
              value={newUser.username}
              type="text"
              placeholder="enter your username"
            />
          </div>
          <div>
            <p>City</p>
            <input
              className="input"
              name="city"
              onChange={edit ? handleEditForm : handleForm}
              value={newUser.address.city}
              type="text"
              placeholder="enter your city"
            />
          </div>
        </div>
        <div className="btn-form-container">
          <Link className="cancelform-btn cancelform-btn-link" to="/">
            Cancel
          </Link>
          {edit ? (
            <button
              className="submit-btn"
              disabled={error}
              onClick={handleEditSubmit}
            >
              Edit
            </button>
          ) : (
            <button
              className="submit-btn"
              disabled={error}
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
