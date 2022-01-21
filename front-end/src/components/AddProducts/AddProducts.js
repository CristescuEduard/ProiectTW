import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../Header/Header';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AddProducts.css'
const AddProducts = () => {
  
    const id = localStorage.getItem("id");
    const [name,setNume]=useState("");
    const [quantity,setQuantity]=useState("");
    const [expirationDate,setExpirationDate]=useState("");
    const [category,setCategory]=useState("");
    const [data,setData]= useState({
        id:"",
    });

    useEffect(()=>{
        try{
            axios.get("http://localhost:8080/getUserById/"+ id  
            ).then((res)=>{
                const user= res.data;
                console.log(user);
                const {id}=user;
                const newData={
                    id,
                };
                setData(newData);
        }).catch((error) => {
            console.error(error);
            
        });
        }catch(err){
        console.error(err.response);
    }
},[]);


    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(name===""){
            toast.error("Vă rugăm să vă completați numele!");
            return;
        }
        if(quantity===""){
            toast.error("Vă rugăm să vă completați cantitatea!");
            return;
        }
        if(expirationDate===""){
            toast.error("Vă rugăm să vă completați data!");
            return;
        }
        if(category===""){
            toast.error("Vă rugăm să vă completați categoria!");
            return;
        }

        const formValues={
            id:data.id,
            name,
            quantity,
            expirationDate,
            category
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/addProduct",formValues
            );

            console.log(response.data);
            if (response.data){
                toast.success("Produsul-ul a fost adaugat cu succes!");
                setExpirationDate("");
                setQuantity("");
                setNume("");
                setCategory("");
            }
        }catch(err){
            console.warn(err);
            toast.error(err.response.data.message);
        }
    }
    return (
      <div><Header/>
        <div className="addProduct">
          <div className="main">
            <form className="container" onSubmit={handleSubmit}>
              <h1 className="title">Add Product!</h1>
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setNume(e.target.value)}
                  className="register-input"
                />
              </div>
    
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="Quantity"
                  name="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="register-input"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="date"
                  placeholder="Data Expirare"
                  name="dataExpirare"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="register-input"
                />
              </div>
              <div className="inputContainer">
                <select 
                  name="Mijloc de transport"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="register-input"
                >
                  <option value="alege">Choose a category</option>
                  <option value="fructe">Fructe</option>
                  <option value="legume">Legume</option>
                  <option value="carne">Carne</option>
                  <option value="lactate">Lactate</option>
                </select>
              </div>
    

              <div className="loginBtns">
            <input
              type="submit"
              value="Add Product     "
              className="submit-btn-login"
            />
          </div>
            </form>
          </div>
          <ToastContainer />
        </div>
        </div>
      );
};

export default AddProducts;