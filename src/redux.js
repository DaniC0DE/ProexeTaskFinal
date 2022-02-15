const initialState = {
  users: []
};

// Actions
const ADD = "ADD";
const EDIT = "EDIT";
const DELETE = "DELETE";
const LOADING_SUCCESS = "LOADING_SUCCESS";

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_SUCCESS:
      return { ...state, users: action.users };
    case ADD:
      return { ...state, users: [...state.users, action.newUser] };
    case DELETE:
      const newList = state.users.filter((user) => {
        return user.id !== action.userToDelete;
      });
      return { ...state, users: newList };
    case EDIT:
      const editList = state.users.map((user) => {
        if (user.id === action.userToEdit.id) {
          return action.userToEdit;
        } else {
          return user;
        }
      });
      return { ...state, users: editList };
    default:
      return state;
  }
}

// Action Creators
export function addUser(newUser) {
  return { type: ADD, newUser };
}

export function editUser(userToEdit) {
  return { type: EDIT, userToEdit };
}

export function deleteUser(userToDelete) {
  return { type: DELETE, userToDelete };
}

export function loadingSuccess(users) {
  return { type: LOADING_SUCCESS, users };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function getUsers() {
  return (dispatch) => {
    fetch(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    )
      .then((response) => {
        return response.json();
      })
      .then((users) => dispatch(loadingSuccess(users)));
  };
}

const BASE_URL =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

export function addUserAPI(user) {
  return (dispatch) => {
    fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        username: user.username,
        address: {
          city: user.address.city
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch(addUser(user));
      });
  };
}

export function editUserAPI(user) {
  return (dispatch) => {
    fetch(`${BASE_URL}/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        username: user.username,
        address: {
          city: user.address.city
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch(editUser(user));
      });
  };
}

export function deleteUserAPI(user) {
  let { id } = user;
  return (dispatch) => {
    fetch(`${BASE_URL}/${user.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        dispatch(deleteUser(id));
      });
  };
}
