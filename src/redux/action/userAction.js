

export const loginAction = (data) => {
    console.log("DATA DARI UI/COMPONENT =>>", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}