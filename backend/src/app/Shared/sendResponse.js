
// type ApiResponse<T> =  {

//     statusCode:number
//     success:boolean
//     message:string;
//     meta?: {
//         page: number;
//         limit: number;
//         total: number;
//     };
//     data:T|null
// }


const sendResponse = (res , data) => {

  return   res.status(data.statusCode).json(data)
}

export default sendResponse