import axios from "axios"
import { API_URL } from "../../helper"

export const getProductAction = (search=null) => {
    // console.log("DATA DARI UI/COMPONENT =>>", data)
    // return {
    //     type: "GET_DATA_PRODUCTS",
    //     payload: data
    // }

    return async (dispatch) => {
        try {
            let response;
            // cara 1
            if (search) {
                if (search.nama) {
                    console.log(search.nama)
                    if (search.hargaMax > 0 && search.hargaMin > 0) {
                        response = await axios.get(`${API_URL}/products?harga_gte=${search.hargaMin}&harga_lte=${search.hargaMax}&nama=${search.nama}`)
                    } else {
                        response = await axios.get(`${API_URL}/products?nama=${search.nama}`)
                    }
                } else {
                    response = await axios.get(`${API_URL}/products?harga_gte=${search.hargaMin}&harga_lte=${search.hargaMax}`)
                }
            } else {
                console.log("cek")
                response = await axios.get(`${API_URL}/products`)
            }

            //cara 2
             //response = await axios.get(`${API_URL}/products${search ?`?nama${search}` : ``}`)

            //console.log("DATA DARI UI/COMPONENT =>>", response)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const sortProductAction = (sort=null) => {
    return async (dispatch) => {
        try {
           let response
           if (sort) {
                if(sort == "harga-asc") {
                    response = await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)
                } else if (sort == "harga-desc") {
                    response = await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)
                } else if (sort == "nama-asc") {
                    response = await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
                }else if (sort == "nama-desc") {
                    response = await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)
                }else {
                    response = await axios.get(`${API_URL}/products?_sort=id&_order=asc`)
                }
           } else {
            response = await axios.get(`${API_URL}/products`)
           }

            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}