import axios from "axios"
import { authAxios } from "../axios"

const URL = "/recommend" 
export const recommend = async (data)=>{

    const response   =await  authAxios.post(`${URL}/recommendations` ,  data);
    console.log(response)
return response.data;
}