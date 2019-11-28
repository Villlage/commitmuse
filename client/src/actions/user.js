import { REGISTER } from './types'
import axios from 'axios'


export const Register = (data) => {
  return (dispatch) => {
    return axios.post(`login`, { email: data.email, password: data.password } )
      .then(response => {
        dispatch({
            type: REGISTER,
            error: null
        })
      })
      .catch(error => {
        dispatch({
            type: REGISTER,
            error: error
        })
      });
  };
};
