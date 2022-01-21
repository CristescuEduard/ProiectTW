import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {Table,Toast} from 'react-bootstrap'
import Header from '../Header/Header';
import './AvailableFood.css'
const AvailableFood =()=> {

    const id = localStorage.getItem("id");
    const [availables,setProductsAvailable] =useState([]);
    const [cartss,setCartss] =useState([]);


    useEffect(()=>{
        try{
            axios.get('http://localhost:8080/getAvailable/'+id)
            .then((res)=>{
                const product= res.data;
                console.log(product);
                setProductsAvailable(product);
            });
        }catch(err){
        console.error(err.response);
    }
},[]);


        const ClaimProduct = async (e,i) =>{
            e.preventDefault();
            try{
                axios.put('http://localhost:8080/setClaimed/'+i+'/'+id)
                .then(response=>console.log(response.data))
                .then(error=>console.log(error));
            } catch (err){
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
                    <td>Claim</td>
                </tr>
            </thead>
            <tbody>
                {availables.map((produc) => (
                    <tr key={produc.Productid} className='items'>
                        <td>{produc.name}</td>
                        <td>{produc.quantity}</td>
                        <td>{produc.expirationDate}</td>
                        <td>
                            <button onClick={(e)=>{ClaimProduct(e,produc.Productid)}}> Claim</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </div>
    )
};




export default AvailableFood;