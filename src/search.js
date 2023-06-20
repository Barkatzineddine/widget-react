import FadeMenu from './components/drop-down.js';
import { useState,useEffect,useCallback } from 'react';
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";


import { CandlestickChartRounded } from '@mui/icons-material';

export default function Search({addProduct}){
    const [loading,setLoading] = useState(false);
    const [query,setQuery] = useState(null);
    const [products,setProducts] = useState([]);
    const [changed,setChanged] = useState(0)
    
const change = () =>{
    if(changed===0){setChanged(1)}else{setChanged(0)}
}

console.log(changed)

   /* useEffect(()=>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    }
    ,[])*/

    useEffect(()=>{
        
        console.log("the query is",query)
        if(query !== null && query !== "")
        {
            setLoading(true)
            
            fetch(`https://stagingapi.techspecs.io/v4/product/search/?query=${query}`,
            {
                method:"POST",
                headers:{
                    Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19OZzFEZjJ0bkN1S2puNSIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNS3M5MkJESWxQbVVQcE10aTJXeENhdSIsImlhdCI6MTY4MDk3MzQwM30.Kr3uEIIb4V0M2gWFSsNu0-35E4FYWhuvT_jofJg13-E"
                }
            }).then(res => res.json()).then((data) => {
            
                setProducts(data.data.items);
                setLoading(false)
                console.log(data.data.items)
            }).catch(err => console.log(err))
        }else{
            setProducts([])
            setLoading(false)
        }
    },[query,changed])

    return (
<>
<div className='search-main'>



        <form onSubmit={(e)=>{
            
            e.preventDefault();
            setQuery(query);
            change();
            console.log("submitted")
            
        }}
            
            placeholder='search for products'  
        >
            <img src='/searchinput.svg'/>
            <input type="text" placeholder='Search for a Device'  onChange={e => setQuery(e.target.value)} />
        </form>

        <div className={loading?'search-container loading':'search-container'}>
            {loading?
                    <ClipLoader
                    color={"#03A9F4"}
                    loading={loading}
                    
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                     />

                    :

                products.map(product => 
                <div className='product'>
                    <img style={{height:"70px",width:"40px"}} src={product.image.front?product.image.front:product.image.back} />
                    <div className='details'>
                        <span>{product.product.model}</span>
                        <span style={{fontSize:"11px",color:"#91A8BF",marginTop:"10px"}}>{product.versions}</span>
                    </div>
                    <button onClick={()=>{addProduct(product.product.id)}} className='add-to-compare'>
                        <img src='/plus.svg' />
                    </button>
                </div> )

            }


        </div>
        
</div>
</>
    )

}
