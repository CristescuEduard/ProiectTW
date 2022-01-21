import React, {useState} from 'react';
import axios from 'axios'
import {Table, Toast} from 'react-bootstrap'
import Header from '../Header/Header';
import './FoodList.css'
const ListGroups =()=> {

    const id = localStorage.getItem("id");
    const [product,setProductsByCategory] =useState([]);
    
    const onnChange =(e)=>{
        axios.get('http://localhost:8080/getProductsByCategory/'+ e.target.value+"/"+id)
        .then(response=>setProductsByCategory(response.data))
        .then(error=>console.log(error));

    };

    const clickme = async (e,i) =>{
        e.preventDefault();
        try{
            axios.put('http://localhost:8080/setAvailable/'+i)
            .then(response=>console.log(response.data))
            .then(error=>console.log(error));
        } catch (err){
            console.log(err);
            Toast.error(err.response.data.message);
        }
    };

    return(
        
        <div><Header />
        <div className="haiii">

<select onChange={onnChange} className='selectie'>
    <option value="fructe">Fructe</option>
    <option value="legume">Legume</option>
    <option value="carne">Carne</option>
    <option value="lactate">Lactate</option>
</select>
<br/>
<br/>
<Table hover="true">
    <thead> 
        <tr className='header'>
            <td>Name</td>
            <td>Quantity</td>
            <td>Expiration Date</td>
            <td>Available</td>
            <td>Set Available</td>
        </tr>
    </thead>
    <tbody>
        {product.map((produc) => (

            <tr key={produc.Productid} className='items'>
                <td>{produc.name}</td>
                <td>{produc.quantity}</td>
                <td>{produc.expirationDate}</td>
                <td>{produc.isAvailable.toString()}</td>
                <td>
                    <button onClick={(e)=>{clickme(e,produc.Productid)}}> Set</button>
                </td>
            </tr>
        ))}
    </tbody>
</Table>
</div>
        </div>
        
    )
};




export default ListGroups;