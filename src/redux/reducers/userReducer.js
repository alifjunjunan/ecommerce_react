
const INITIAL_STATE={
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    cart: []
}


//func userReducer: untuk mereturn data dari action.payload agar dapat disimpan oleh STATE REDUCER
export const userReducer = (state=INITIAL_STATE, action) => {
    //switch..case. : dignakan untuk menentukan data dari action.payload untuk disimpan ke bagian STATE yang dituju berdasarkan action.type
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("data dari action payload ==>", action.payload)
            return {
                ...state,  //menduplikat object agar property dapat diperbaharui
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                status: action.payload.status,
                cart: action.payload.cart
            }
        case "UPDATE_CART_USER" :
            return {
                ...state,
                cart: action.payload
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state;
    }
}