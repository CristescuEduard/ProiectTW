import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {Table,Toast} from 'react-bootstrap'
import Header from '../Header/Header';
import './Cart.css'
const Cart =()=> {

    const id = localStorage.getItem("id");
    const [products,setProducts] =useState([]);

useEffect(()=>{
    try{
        axios.get('http://localhost:8080/getClamedByUser/'+id)
        .then((res)=>{
            const product= res.data;
            console.log(product);
            setProducts(product);
        });
    }catch(err){
    console.error(err.response);
}
},[]);


const Delete = async (e,i) =>{
    e.preventDefault();
        try{
            axios.put('http://localhost:8080/setFree/'+i)
            .then(response=>console.log(response.data))
            .then(error=>console.log(error)
            )
        }catch (err){
            console.log(err);
            Toast.error(err.response.data.message);
    }
};

const Claim = async (e,i) =>{
    e.preventDefault();
    try{
        products.map((produc)=>(
        axios.delete('http://localhost:8080/deleteProductbyId/'+ produc.Productid)
        .then(response=>console.log(response.data))
        .then(error=>console.log(error))
        ))
    }catch (err){
        console.log(err);
        Toast.error(err.response.data.message);
    }
};

    return(
        <div><Header/>
        <div className="haiii">
        <Table>
            <thead> 
                <tr className='header'>
                    <td>Name</td>
                    <td>Quantity</td>
                    <td>Expiration Date</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {products.map((produc) => (
                    <tr key={produc.Productid} className='items'>
                        <td>{produc.name}</td>
                        <td>{produc.quantity}</td>
                        <td>{produc.expirationDate}</td>
                        <td>
                            <button onClick={(e)=>{Delete(e,produc.Productid)}}> Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <button onClick={(e)=>{Claim(e,products)}} className='buttonCart'>Claim</button>
        </div>
        </div>
    )
};




export default Cart;