import { FETCH_ALL, CREATE, UPDATE, DELETE_POTLUCK } from '../constants/ActionTypes'


export default (potlucks = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...potlucks, action.payload];

    case UPDATE:
      return potlucks.map((potluck) =>
      potluck._id === action.payload._id ? action.payload : potluck);

    case DELETE_POTLUCK:
      return potlucks.filter((potluck) => potluck._id !== action.payload);
      
    default:
      return potlucks;
  }
};
