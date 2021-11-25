

export const addProductAction = (data) => {
    console.log("DATA DARI UI/COMPONENT =>>", data)
    return {
        type: "ADD_SUCCES",
        payload: data
    }
}