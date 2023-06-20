
import FadeMenu from './components/drop-down.js';
import { useState,useEffect,useCallback } from 'react';
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './Home.css'


export default function Home({goAdd,goDetails}){

    const [loading,setLoading] = useState(false);
    const [query,setQuery] = useState(null);
    const [products,setProducts] = useState([]);
    const [changed,setChanged] = useState(0);
    const [current,setCurrent] = useState("home");
    const [widgetOn, setwidgetOn] = useState(true)
    
const change = () =>{
    if(changed===0){setChanged(1)}else{setChanged(0)}
}

const turnWidgetOn = () =>{
    setwidgetOn(true)
  }
  const turnWidgetOff = () =>{
    setwidgetOn(false)
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

    return(
    <div className='widget-home-container'> 
        <div className={widgetOn?'home-container':"off"}>
            <div className='home-header'>
                <img className='logo-home' src='/home-logo.svg' />
                <div className='language'>
                    <FadeMenu />
                    <img src='/england.svg' />
                </div>
            </div>
            <div className='home-main'>

                <div className='home-search'>
                    <span>SEARCH</span>
                    <form onSubmit={(e)=>{
            
                        e.preventDefault();
                        setQuery(query);
                        change();
                     console.log("submitted")
            
                    }}
            
                     placeholder='search for products'  
                    >
                        <img src='/searchinput.svg'/>
                        <input type="text" placeholder='Find a device'  onChange={e => setQuery(e.target.value)} />
                    </form>

                    <div className='home-products-container'>

                    {loading?
                    <div className='loading'>
                    <ClipLoader
                    color={"#03A9F4"}
                    loading={loading}
                    
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                     />
                     </div>

                    :

                products.map(product => 
                <div onClick={()=>{
                    goDetails(product.product.id);
                    

                }} className='home-product'>
                    <img style={{height:"70px",width:"40px"}} src={product.image.front?product.image.front:product.image.back} />
                    <div className='home-product-details'>
                        <span>{product.product.model}</span>
                        <span style={{fontSize:"12px",color:"#91A8BF",marginTop:"10px"}}>{product.versions}</span>
                    </div>
                    
                </div> )

            }
            </div>

                </div>

                <div className='home-compare'>
                    <span>COMPARE</span>
                    <button onClick={goAdd} className='compare-btn'>

                        <img src='/compare.svg' />
                        <span>Compare Products</span>

                    </button>


                </div>

            </div>

            <div className='home-footer'>
                <span>Powered By</span>
                <img src='/logo.svg'/>
            </div>
        </div>
        <div onClick={()=>{
            console.log("click")
            if(widgetOn){turnWidgetOff()}else{turnWidgetOn()}
        }} className="widget-btn-container">
            <div className="widget-btn ">

                <img src='/down.svg'/>

            </div>
    </div>
    </div>  
    )

}