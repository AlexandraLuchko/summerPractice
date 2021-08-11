const moduleName = 'users';

export const GET_USERS = `${moduleName}/GET_USERS`;
const DELETE_USER = `${moduleName}/DELETE_USER`;
const CREATE_USER = `${moduleName}/CREATE_USER`;
const EDIT_USER = `${moduleName}/EDIT_USER`;
export const REQUEST_USERS =`${moduleName}/REQUEST_USER`;

const defaultState = {
  users: [],
};

export default (state = defaultState, { type, payload }) => {
    switch (type) {
      case GET_USERS:
        return { ...state, users: payload };
      case DELETE_USER:
        return { ...state, users: state.users.filter(item => item.id !== payload.id) };
      case CREATE_USER:
        return { ...state, users: [...state.users, payload] };
      case EDIT_USER:
        return {...state, users: payload};
      default:
        return state;
    }
  };

  export function getUsers(){
    return {
      type: REQUEST_USERS
    }
  }

  // export const getUsers = () => async (dispatch) => {
  //   try {
  //     await fetch('http://localhost:3000/users/')
  //       .then((response) => response.json())
  //       .then((data) => dispatch({ type: GET_USERS, payload: data }))
  //   } catch (error) {
  //     console.log(error)
  //   } 
  // }
  
  export const deleteUser = (id) => async (dispatch) => {
      dispatch({ type: DELETE_USER, payload: { id } })
  }

