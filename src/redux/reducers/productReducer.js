
const INITIAL_STATE = {
    nama: "",
    deskripsi: "",
    brand: "",
    kategori: "",
    harga: 0,
    stock: [],
    images: [],
    id: 0
  }

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_SUCCES":
            console.log("data dari action payload ==>", action.payload)
            return {
                ...state,
                nama: action.payload.nama,
                deskripsi: action.payload.deskripsi,
                brand: action.payload.brand,
                kategori: action.payload.kategori,
                harga: action.payload.harga,
                stock: action.payload.stock,
                images: action.payload.images,
                id: action.payload.id,
            }        
        default:
            return state;
    }
}

