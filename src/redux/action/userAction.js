import axios from "axios"
import { API_URL } from "../../helper"


export const loginAction = (email,password) => {
    //cara 1
    // return (dispatch) => {
    //     axios.get(`${API_URL}/akun?email=${email}&password${password}`)
    //     .then((response) => {
    //         localStorage.setItem("data", JSON.stringify(response.data[0]))
    //         // dispatch : meneruskan data ke reducer
    //         dispatch({
    //             type: "LOGIN_SUCCESS",
    //             payload: response.data[0]
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    //cara 2
    return async (dispatch) => {
        try {
            let response = await axios.get(`${API_URL}/akun?email=${email}&password${password}`)
            if (response.data.length > 0) {
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data[0]
                })
                return {success: true}
            }  
        } catch (error) {
            console.log(error)
        }
    }

    
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}