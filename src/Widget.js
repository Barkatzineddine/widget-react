import FadeMenu from './components/drop-down.js';
import { useState,useEffect,useCallback } from 'react';
import React from "react";
import './Widget.css'; 
import Comparison from './comparison.js';
import Search from './search.js'
import Home from './Home.js'
import Details from './details.js'
import { CandlestickChartRounded } from '@mui/icons-material';

export default function Widget(){

    const [current,setCurrent] = useState("home");
    const [products,setProducts] = useState([]);
    const [addClicked,setAddClicked] = useState(false);
    const [productFull,setproductFull] = useState(false);
    const [actualProduct,setActualProduct]  = useState(null);
    const [maxProducts,setMaxProducts] = useState(5);
    const [widgetOn,setwidgetOn] = useState(true)
    

    useEffect(() => {
        // Function to handle the resize event
        const handleResize = () => {
            console.log("resizing now")
            if(window.innerWidth >= 800){
                setMaxProducts(5)
            }else if ((window.innerWidth < 800)&&(window.innerWidth > 600) ) {
            setMaxProducts(4)
          } else if((window.innerWidth <= 600)&&(window.innerWidth > 500)) {
            setMaxProducts(3)
          }else if( window.innerWidth <= 500){
            setMaxProducts(2)
          }
          
        };


        
        // Add event listener for the resize event
        window.addEventListener('resize', handleResize);
    
        // Call the handleResize function initially
        handleResize();
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    
      const turnWidgetOn = () =>{
        setwidgetOn(true)
      }
      const turnWidgetOff = () =>{
        setwidgetOn(false)
      }


      const full = ()=>{
        setproductFull(true)
      }
      const notFull = () =>{
        setproductFull(false)
      }



    const removeProduct = function (id){

        const index = products.indexOf(id);
        console.log("index :",index)
        if (index !== -1) {
            products.splice(index, 1)
            console.log(products)
          setProducts(products);
          if(products.length !== maxProducts){
          setproductFull(false)
        }}
    
    }

    const addProduct = (id) =>{
        if(products.length >= (maxProducts - 1))
        {
            setproductFull(true)
        }
        setProducts([...products,id])
        setCurrent("add")
        
    }
    


    const clickAdd = () =>{
        if(addClicked){
            setAddClicked(false)
        }else{
            setAddClicked(true)
        }
    }

    const clickSearch = () =>{
      
            setCurrent("search");
           
        
    }

    const goAdd = () =>{
        setCurrent("add")
    }

    const goHome = () =>{
        setCurrent("home")
    }

    const goDetails = (id) =>{
        setActualProduct(id)
        setCurrent("details")
    }


    const Return = () =>{
        
        if(current === "search"){setCurrent("add")}
        if(current === "add"){setCurrent("home")}
        if(current === "details"){setCurrent("home")}
       

    }



    return (
<>
{current==="home"?<Home turnWidgetOff={turnWidgetOff} turnWidgetOn={turnWidgetOn} goAdd={goAdd} goDetails={goDetails}/>:
<>
<div className="widget-container">
    <div className={widgetOn?"widget-comparison":"off"}>
        <div className="widget-comparison-header">
            <div className="widget-comparison-left">
                <img onClick={Return} className='return' src="/return.svg"/>
                <img className="logo" src="/logo.svg"/>
            </div>
            <div className="widget-comparison-right">
                <div className='language'>
                <FadeMenu />
                <img src='/england.svg' />
                </div>
                
            </div>
        </div>
       
           
         {current ==="add"?
         
            <Comparison notFull={notFull} full={full} maxProducts={maxProducts} goHome={goHome} removeProduct={removeProduct} addClicked={addClicked} productFull={productFull} products={products} clickSearch={clickSearch}  clickAdd={clickAdd} /> 
            :
            current==="search"?
            <Search goAdd={goAdd} addProduct={addProduct} />
            :current==="details"?
            <Details goHome={goHome} actualProduct={actualProduct} />:""
         }
         
  
       
        <div className="widget-comparison-footer">

        </div>
    </div>
    <div onClick={()=>{
            if(widgetOn){turnWidgetOff()}else{turnWidgetOn()}
        }} className="widget-btn-container">
            <div className="widget-btn ">

                <img src='/down.svg'/>

            </div>
    </div>

</div>
    </>
}

</>
   
    )

}
