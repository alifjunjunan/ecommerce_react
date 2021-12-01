
const INITIAL_STATE = {
   productList: []
  }

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("data dari action payload ==>", action.payload)
            return {
                ...state,
                productList: action.payload
            }        
        default:
            return state;
    }
}

