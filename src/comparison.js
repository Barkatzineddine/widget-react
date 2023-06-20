import { useEffect, useState } from "react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './comparison.css'


export default function Comparison({notFull,full,removeProduct,products,addClicked,productFull,clickSearch,clickAdd,maxProducts}){

   const [productsDetails,setProductsDetails] = useState([])
   const [loading,setLoading] = useState(false);
   const [change,setChange]= useState(0)
 


    
const changed = () =>{
    if(change === 0){setChange(1)}else{setChange(0)}
}

 
useEffect(() => {
    
      setLoading(true);
      
      const fetchData = async () => {
        
        const promises = products.map(async (product) => {
            console.log("produuuuct id",product)
          try {
            const response = await fetch(
              `https://stagingapi.techspecs.io/v4/product/detail/en?productId=${product}`,
              {
                method: "GET",
                headers: {
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19OZzFEZjJ0bkN1S2puNSIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNS3M5MkJESWxQbVVQcE10aTJXeENhdSIsImlhdCI6MTY4MDk3MzQwM30.Kr3uEIIb4V0M2gWFSsNu0-35E4FYWhuvT_jofJg13-E",
                },
              }
            );
            const data = await response.json();
            return data.data.items[0];
          } catch (error) {
            console.error(error);
            return [];
          }
        });
  
        const results = await Promise.all(promises);
        const mergedItems = results.flat();
        setProductsDetails(mergedItems);
        setLoading(false);
      };
  
      fetchData();
    
  }, [products,change]);


console.log("max :",maxProducts)
console.log("products",products.length)
console.log("full",productFull)

if(products.length >= maxProducts){
    full()
}else{
    notFull()
}   

    return(
        <div className={
            products.length===0?"widget-comparison-main no-products":
            maxProducts===1?"widget-comparison-main one-device":
            maxProducts===2?"widget-comparison-main two-device":
            maxProducts===3?"widget-comparison-main three-device":
            maxProducts===4?"widget-comparison-main four-device":
            maxProducts===5?"widget-comparison-main five-device":
            "widget-comparison-main no-products"
        }>
       
        
       {!loading?<>
            <div className={productsDetails.length===0?"property-names disable":"property-names"}>
                <div className="vide"></div>
                <div className="design">Design</div>
                <div>Height</div>
                <div>width</div>
                <div>Weight</div>
                <div>Thickness</div>
                <div>color</div>
                <div>cpu</div>
                <div>cpu clock speed</div>
                <div>gpu</div>
                <div>ram</div>
                <div>storage</div>
                <div>Price</div>
            </div>
            
           {console.log("the details are:",productsDetails)}
          

            {productsDetails.map(
                detail => {
              
                return(
                    <div className="product-details">
                    <div className="product-img">
                        <img onClick={()=>{
                            
                            removeProduct(detail.product.id);
                            changed();
                            }} className="delete-img" src="/delete.svg"/>
                        <img
                            src={detail.image?
                                (detail.image.front
                                    ? detail.image.front
                                    : detail.image.back
                                    ? detail.image.back
                                    : detail.image.i
                                    ? detail.image.i
                                    : detail.image.ii
                                    ? detail.image.ii
                                    : ""):""
                            }
                        />
                    </div>
                    <div>{detail.name?detail.name:""}</div>
                    <div>{detail.design.body.height?detail.design.body.height:""}</div>
                    <div>{detail.design.body.width?detail.design.body.width:""}</div>
                    <div>{detail.design.body.weight?detail.design.body.weight:""}</div>
                    <div>{detail.design.body.thickness?detail.design.body.thickness:""}</div>
                    <div>{detail.design.body.color?detail.design.body.color:""}</div>
                    <div>{detail.inside.processor?(detail.inside.processor.cpu?detail.inside.processor.cpu:""):""}</div>
                    <div>{detail.inside.processor?(detail.inside.processor.gpu?detail.inside.processor.gpu:""):""}</div>
                    
                    <div>{detail.inside.processor?(detail.inside.processor.cpu_clock_speed?detail.inside.processor.cpu_clock_speed:""):""}</div>
                    <div>{detail.inside.ram?(detail.inside.ram.capacity?detail.inside.ram.capacity:""):""}</div>
                    <div>{detail.inside.storage?(detail.inside.storage.capacity?detail.inside.storage.capacity:""):""}</div>
                    <div>{detail.price?detail.price.msrp:""}</div>
                    {/* Add other details */}
                </div>
                )}
                )}
               

        
       

        {!productFull?
        <div className='add-products'>
            
        <div className='add-btn-container'>
            <button onClick={clickAdd} className={!addClicked?'add-btn':'close-btn'}>
                {
                !addClicked
                ?
                <img src='/plus.svg' />
                :
                <img src='/close.svg' />
                }
            </button>
        </div>
       {!addClicked?<span>Add products to compare</span>:""}

       {
        addClicked
        ?
        <div className='btn-option'>
            
            
            <button onClick={clickSearch} className='search'>
                <img src='/search.svg'></img>
                <span>search</span>
            </button>
            
            
            <button className='recent'>
                <img src='/recent.svg'></img>
                <span>recent</span>
            </button>
           

        </div>
        :<div className='btn-option disabled'>
            
            
        <button onClick={clickSearch} className='search'>
            <img src='/search.svg'></img>
            <span>search</span>
        </button>
        
        
        <button className='recent'>
            <img src='/recent.svg'></img>
            <span>recent</span>
        </button>
       

    </div>}



        </div>
        :""}

</>
            
            :<ClipLoader
            color={"#03A9F4"}
            loading={loading}
            
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
             />

}
        </div>

    )
}