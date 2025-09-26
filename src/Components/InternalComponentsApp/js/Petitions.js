import { useState } from "react";

const Petitions = (endpoint,array) =>{
    const[response_petition,setResponse] = useState('');
    const correo = localStorage.getItem("correo");
    const token = localStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('mail',correo);
    formdata.append('token',token);

    for(let obj in array){
        formdata.append(obj,array[obj]);
    }
    fetch(endpoint,{
        method:'POST',
        body:formdata
    }).then(response=>{
        return data.json();
    }).then(data=>{
        setResponse(data);
    })

    return response_petition;
}

export default Petitions