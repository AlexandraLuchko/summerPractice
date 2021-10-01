const moduleName = 'users';

export const GET_USERS = `${moduleName}/GET_USERS`;
export const DELETE_USER = `${moduleName}/DELETE_USER`;
export const CREATE_USER = `${moduleName}/CREATE_USER`;
export const EDIT_USER = `${moduleName}/EDIT_USER`;
export const REQUEST_USERS =`${moduleName}/REQUEST_USER`;
export const SAGA_DELETE_USER = `${moduleName}/SAGA_DELETE_USER`;
export const ADD_USER = `${moduleName}/ADD_USER`;
export const SAGA_EDIT_USER = `${moduleName}/SAGA_EDIT_USER`;

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
        return { ...state, users: [...state.users, payload]};
      case EDIT_USER:
        return {...state, users: [...state.users, payload]};
      default:
        return state;
    }
  };

  export function getUsers(){
    return {
      type: REQUEST_USERS
    }
  }
  
  export function deleteUser(id){
    return {
      type: SAGA_DELETE_USER,
      payload: { id }
    }
  }

  export function createUser(user){
    return {
      type : ADD_USER,
      payload: user
    }
  }

