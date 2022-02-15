import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAPI } from "./redux.js";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import sort from "./resources/sort.svg";

export default function Home() {
  const [order, setOrder] = useState("ASC");
  const [field, setField] = useState("id");
  const users = useSelector((state) => {
    return state.users;
  });

  const handleSort = (field) => {
    if (order) {
      if (order === "DESC") {
        setOrder("ASC");
      } else {
        setOrder("DESC");
      }
    } else {
      setOrder("ASC");
    }
    setField(field);
  };

  return (
    <div className="Dashboard-Container">
      <h1 className="Dashboard-Title">Dashboard</h1>
      <div className="List-Container">
        <div className="List-Header">
          <h2 className="List-Title">User list</h2>
          <Link
            className="Add-btn Add-btn-link"
            to="/form"
            state={{ edit: false }}
          >
            Add new
          </Link>
        </div>
        <div className="List-sub-container">
          <div className="List-subtitles">
            <span onClick={() => handleSort("id")}>
              Id <img height="20px" src={sort} alt="" />
            </span>
            <span>Name</span>
            <span onClick={() => handleSort("username")}>
              Username
              <img height="20px" src={sort} alt="" />
            </span>
            <span>Email</span>
            <span>City</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>
          <div>
            <Card users={users} order={order} field={field} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div>
      {props.users.length > 0 ? (
        props.users
          .sort(function (a, b) {
            if (props.order === "ASC") {
              if (a[props.field] < b[props.field]) {
                return -1;
              }
              if (a[props.field] > b[props.field]) {
                return 1;
              }
              return 0;
            } else {
              if (a[props.field] > b[props.field]) {
                return -1;
              }
              if (a[props.field] < b[props.field]) {
                return 1;
              }
              return 0;
            }
          })
          .map((user) => {
            return (
              <div key={user.id} className="Card-Container">
                <div>{user.id}</div>
                <div>{user.name}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.address.city}</div>
                <div>
                  <Link
                    className="Edit-btn Edit-btn-link"
                    to="/form"
                    state={{ user: user.id, edit: true }}
                  >
                    Edit
                  </Link>
                </div>
                <div>
                  <PopupDelete user={user} />
                </div>
              </div>
            );
          })
      ) : (
        <div className="Nousers-container">
          <h1 className="Nousers-Text"> There are no users in the database </h1>
        </div>
      )}
    </div>
  );
}

function PopupDelete(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleDelete = (user) => {
    dispatch(deleteUserAPI(user));
  };
  return (
    <Popup
      className="popup-background"
      trigger={<button className="Delete-btn"> Delete </button>}
      modal
    >
      {(close) => (
        <div className="modal-container">
          <a className="close" onClick={close}>
            &times;
          </a>
          <div className="popup-text">
            Are you sure you want to delete this user?
          </div>
          <div className="popup-btn-container">
            <button
              className="popup-btn"
              onClick={() => {
                close();
                navigate("/");
              }}
            >
              Cancel
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                handleDelete(props.user);
                close();
                navigate("/");
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
