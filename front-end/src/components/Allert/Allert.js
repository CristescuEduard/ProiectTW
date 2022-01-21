import React, {useState,useEffect} from 'react';
import {Alert,Button} from 'react-bootstrap';
import './Allert.css';
import axios from 'axios';
const Allert = () => {

    const id = localStorage.getItem("id");
    const [show, setShow] = useState(true);
    const [allert,setAllert] =useState([]);


    useEffect(()=>{
        try{
            axios.get('http://localhost:8080/productExpiration/'+id)
            .then(response=>setAllert(response.data))
            .then(error=>console.log(error));
        }catch(err){
        console.error(err.response);
    }
},[]);

        if(allert[0]!=null){
            localStorage.setItem("afisat",1);
            return (
                    <>
                    <Alert show={show} variant="success" className='allert'>
                        <p>
                        Aveti produse ce urmeaza sa expire curand.
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close!
                        </Button>
                        </div>
                    </Alert>
                    </>
              );

        }
        else {
            return 0;
        }
};

export default Allert;