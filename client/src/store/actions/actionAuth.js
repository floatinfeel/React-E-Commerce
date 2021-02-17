import axios from 'axios'
import { toast } from 'react-toastify'
import { urlDevelopment } from '../../helpers/URL'
import {REGISTER_SUCCESS, REGISTER_FAIL} from '../constants/constanta'

export const register = ({name, email, password}) => async (dispatch) => {

    //config for header for axios
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    //setbody
    const body = JSON.stringify({name, email, password})

    try {
        //get res
        const res = await axios.post(`${urlDevelopment}/user/register`, body, config)
        dispatch({type: REGISTER_SUCCESS, payload: res.data})

    } catch (err) {
        const errors = err.response.data.errors
        
        if (errors) {
            errors.forEach(error => toast.error(error.msg))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}