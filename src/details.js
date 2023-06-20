import FadeMenu from './components/drop-down.js';
import { useState,useEffect,useCallback } from 'react';
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './details.css'; 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Details({goHome,actualProduct}){

    const [actualDetails,setActualDetails] = useState([]);
    const [loading,setLoading] = useState(false);
    const [change,setChange]= useState(0);
    const [detail,setDetail] = useState(null)
    const [version, setVersion] = React.useState('');
    const [clickedType,setClickedType] = useState("design")

    const handleChange = (event) => {
      setVersion(event.target.value);
    };

    const changed = () =>{
        if(change === 0){setChange(1)}else{setChange(0)}
    }

    
       

    useEffect(() => {
        console.log("in use effect")
        setLoading(true);

        fetch(
            `https://stagingapi.techspecs.io/v4/product/detail/en?productId=${actualProduct}`,
            {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19OZzFEZjJ0bkN1S2puNSIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNS3M5MkJESWxQbVVQcE10aTJXeENhdSIsImlhdCI6MTY4MDk3MzQwM30.Kr3uEIIb4V0M2gWFSsNu0-35E4FYWhuvT_jofJg13-E",
              },
            }
          ).then(res =>res.json()).then((data) =>{
            setLoading(false)
            setActualDetails([...data.data.items])
            setDetail(data.data.items[0])
          } )
    
    
}, [actualProduct,change]);
  
console.log("loading :",loading)


    return(

        <div className='widget-details-main'>
            {loading || !detail?

                    <ClipLoader
                    color={"#03A9F4"}
                    loading={loading}

                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                :
                <>
                    <div className='widget-details-left'>
                        <img src={detail.image?(
                            detail.image.front?detail.image.front:
                            detail.image.back?detail.image.back:
                            detail.image.i?detail.image.i:
                            detail.image.ii?detail.image.ii:""
                        ):""} />

                    </div>

                    <div className='widget-details-right'>

                        <h1>{
                        detail.product?detail.product.model:""
                        }</h1>
                        <FormControl fullWidth style={{width:"110px"}} >
                        <InputLabel id="demo-simple-select-label">{detail.product.version}</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={version}
                        label={detail.product.version}
                        onChange={handleChange}
                        >
                            {actualDetails.map((det)=>

                                <MenuItem onClick={()=>{setDetail(det)}} value={det.product.version}>{det.product.version}</MenuItem>
                            )
                            
                            }
                        </Select>
                        </FormControl>
                        
                        <div className='buttons'>
                            <button onClick={()=>{setClickedType("design")}} className={clickedType==="design"?'design-btn selected':"design-btn"}>Design</button>
                            <button onClick={()=>{setClickedType("display")}} className={clickedType==="display"?"display-btn selected":'display-btn'}>Display</button>
                            <button onClick={()=>{setClickedType("camera")}} className={clickedType==="camera"?"camera-btn selected":'camera-btn'}>Camera</button>
                            <button onClick={()=>{setClickedType("wi")}} className={clickedType==="wi"?"wi-btn selected":'wi-btn'}>What's inside</button>
                        </div>

                        <div className='informations'>

                            <div>
                                <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#04A7F1"}}>{clickedType==="design"?"Design":clickedType==="display"?"Display":clickedType==="camera"?"Camera":clickedType==="wi"?"What's inside":""}</span>
                            </div>
                            {clickedType==="design"?
                            <>
                                <div>
                                    <span>Height</span>
                                    <span>{detail.design.body.height?detail.design.body.height:""}</span>
                                </div>
                                <div>
                                    <span>Width</span>
                                    <span>{detail.design.body.width?detail.design.body.width:""}</span>
                                </div>
                                <div>
                                    <span>Weight</span>
                                    <span>{detail.design.body.weight?detail.design.body.weight:""}</span>
                                </div>
                                <div>
                                    <span>Thickness</span>
                                    <span>{detail.design.body.thickness?detail.design.body.thickness:""}</span>
                                </div>
                                <div>
                                    <span>Color</span>
                                    <span>{detail.design.body.color?detail.design.body.color:""}</span>
                                </div>
                                <div>
                                    <span>CPU</span>
                                    <span>{detail.inside.processor?(detail.inside.processor.cpu?detail.inside.processor.cpu:""):""}</span>
                                </div>
                                <div>
                                    <span>GPU</span>
                                    <span>{detail.inside.processor?(detail.inside.processor.gpu?detail.inside.processor.gpu:""):""}</span>
                                </div>
                                <div>
                                    <span>cpu clock speed</span>
                                    <span>{detail.inside.processor?(detail.inside.processor.cpu_clock_speed?detail.inside.processor.cpu_clock_speed:""):""}</span>
                                </div>
                                <div>
                                    <span>RAM</span>
                                    <span>{detail.inside.ram?(detail.inside.ram.capacity?detail.inside.ram.capacity:""):""}</span>
                                </div>
                                <div>
                                    <span>Storage</span>
                                    <span>{detail.inside.storage?(detail.inside.storage.capacity?detail.inside.storage.capacity:""):""}</span>
                                </div>
                                <div>
                                    <span>Price</span>
                                    <span>{detail.price?detail.price.msrp:""}</span>
                                </div>
                            </>:clickedType==="display"?
                            <>
                                <div>
                                    <span>Type</span>
                                    <span>{detail.display.type?detail.display.type:""}</span>
                                </div>
                                <div>
                                    <span>Diagonal</span>
                                    <span>{detail.display.diagonal?detail.display.diagonal:""}</span>
                                </div>
                                <div>
                                    <span>Pixel density</span>
                                    <span>{detail.display.pixel_density?detail.display.pixel_density:""}</span>
                                </div>
                                <div>
                                    <span>Refresh rate</span>
                                    <span>{detail.display.refresh_rate?detail.display.refresh_rate:""}</span>
                                </div>
                                <div>
                                    <span>Width</span>
                                    <span>{detail.display.width?detail.display.width:""}</span>
                                </div>
                                <div>
                                    <span>Height</span>
                                    <span>{detail.display.height?detail.display.height:""}</span>
                                </div>
                                <div>
                                    <span>Illumination</span>
                                    <span>{detail.display?(detail.display.illumination?detail.display.illumination:""):""}</span>
                                </div>
                                <div>
                                    <span>Dynamic range</span>
                                    <span>{detail.display?(detail.display.dynamic_range?detail.display.dynamic_range:""):""}</span>
                                </div>
                                <div>
                                    <span>Pixel size</span>
                                    <span>{detail.display?(detail.display.pixel_size?detail.display.pixel_size:""):""}</span>
                                </div>
                                <div>
                                    <span>Color depth</span>
                                    <span>{detail.display?(detail.display.color_depth?detail.display.color_depth:""):""}</span>
                                </div>
                                <div>
                                    <span>Subpixels</span>
                                    <span>{detail.display?(detail.display.subpixels?detail.display.subpixels:""):""}</span>
                                </div>
                                <div>
                                    <span>Number of colors</span>
                                    <span>{detail.display?(detail.display.number_of_colors?detail.display.number_of_colors:""):""}</span>
                                </div>
                                <div>
                                    <span>Screen to body ratio</span>
                                    <span>{detail.display?(detail.display.screen_to_body_ratio?detail.display.screen_to_body_ratio:""):""}</span>
                                </div>
                                <div>
                                    <span>Bezel width</span>
                                    <span>{detail.display?(detail.display.bezel_width?detail.display.bezel_width:""):""}</span>
                                </div>
                                <div>
                                    <span>lcd mode</span>
                                    <span>{detail.display?(detail.display.lcd_mode?detail.display.lcd_mode:""):""}</span>
                                </div>
                                <div>
                                    <span>Touchpoints</span>
                                    <span>{detail.display?(detail.display.touchpoints?detail.display.touchpoints:""):""}</span>
                                </div>
                                <div>
                                    <span>Glass</span>
                                    <span>{detail.display?(detail.display.glass?detail.display.glass:""):""}</span>
                                </div>
                                <div>
                                    <span>Notch</span>
                                    <span>{detail.display?(detail.display.notch?detail.display.notch:""):""}</span>
                                </div>
                                <div>
                                    <span>Touch screen type</span>
                                    <span>{detail.display?(detail.display.touch_screen_type?detail.display.touch_screen_type:""):""}</span>
                                </div>
                            </>:clickedType==="camera"?
                            <>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Back camera :</span>
                                    
                                </div>
                                <div>
                                    <span>Focus</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.focus?detail.camera.back_camera.focus:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Resolution</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.resolution?detail.camera.back_camera.resolution:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Video format</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.video_format?detail.camera.back_camera.video_format:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Video resolution</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.video_resolution?detail.camera.back_camera.video_resolution:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Image format</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.image_format?detail.camera.back_camera.image_format:""):""):""}</span>
                                </div>
                                <div>
                                    <span>pixel_size</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.pixel_size?detail.camera.back_camera.pixel_size:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Zoom</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.zoom?detail.camera.back_camera.zoom:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Flash</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.flash?detail.camera.back_camera.flash:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Sensor</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.sensor?detail.camera.back_camera.sensor:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Equivalent focal length</span>
                                    <span>{detail.camera?(detail.camera.back_camera?(detail.camera.back_camera.equivalent_focal_length?detail.camera.back_camera.equivalent_focal_length:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Front camera :</span>
                                   
                                </div>
                                <div>
                                    <span>Resolution</span>
                                    <span>{detail.camera?(detail.camera.front_camera?(detail.camera.front_camera.resolution?detail.camera.front_camera.resolution:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Video resolution</span>
                                    <span>{detail.camera?(detail.camera.front_camera?(detail.camera.front_camera.video_resolution?detail.camera.front_camera.video_resolution:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Video format</span>
                                    <span>{detail.camera?(detail.camera.front_camera?(detail.camera.front_camera.video_format?detail.camera.front_camera.video_format:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Image format</span>
                                    <span>{detail.camera?(detail.camera.front_camera?(detail.camera.front_camera.image_format?detail.camera.front_camera.image_format:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Sensor</span>
                                    <span>{detail.camera?(detail.camera.front_camera?(detail.camera.front_camera.sensor?detail.camera.front_camera.sensor:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Minimum focal length</span>
                                    <span>{detail.camera?(detail.camera.front_camera?(detail.camera.front_camera.minimum_focal_length?detail.camera.front_camera.minimum_focal_length:""):""):""}</span>
                                </div>

                           
                            
                            </>:clickedType==="wi"?

                            <>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Software :</span>
                                   
                                </div>
                                <div>
                                    <span>OS</span>
                                    <span>{detail.inside?(detail.inside.software?(detail.inside.software.os?detail.inside.software.os:""):""):""}</span>
                                </div>
                                <div>
                                    <span>OS version</span>
                                    <span>{detail.inside?(detail.inside.software?(detail.inside.software.os_version?detail.inside.software.os_version:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Processor :</span>
                                   
                                </div>
                                <div>
                                    <span>CPU</span>
                                    <span>{detail.inside?(detail.inside.processor?(detail.inside.processor?detail.inside.processor.cpu:""):""):""}</span>
                                </div>
                                <div>
                                    <span>CPU clock speed</span>
                                    <span>{detail.inside?(detail.inside.processor?(detail.inside.processor?detail.inside.processor.cpu_clock_speed:""):""):""}</span>
                                </div>
                                <div>
                                    <span>GPU</span>
                                    <span>{detail.inside?(detail.inside.processor?(detail.inside.processor?detail.inside.processor.gpu:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>RAM :</span>
                                   
                                </div>
                                <div>
                                    <span>Type</span>
                                    <span>{detail.inside?(detail.inside.ram?(detail.inside.ram?detail.inside.ram.type:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Capacity</span>
                                    <span>{detail.inside?(detail.inside.ram?(detail.inside.ram?detail.inside.ram.capacity:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Module</span>
                                    <span>{detail.inside?(detail.inside.ram?(detail.inside.ram?detail.inside.ram.module:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Storage :</span>
                                   
                                </div>
                                <div>
                                    <span>Type</span>
                                    <span>{detail.inside?(detail.inside.storage?(detail.inside.storage.type?detail.inside.storage.type:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Capacity</span>
                                    <span>{detail.inside?(detail.inside.storage?(detail.inside.storage.capacity?detail.inside.storage.capacity:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Module</span>
                                    <span>{detail.inside?(detail.inside.storage?(detail.inside.storage.module?detail.inside.storage.module:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Audio :</span>
                                   
                                </div>
                                <div>
                                    <span>Channel</span>
                                    <span>{detail.inside?(detail.inside.audio?(detail.inside.audio.channel?detail.inside.audio.channel:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Output</span>
                                    <span>{detail.inside?(detail.inside.audio?(detail.inside.audio.output?detail.inside.audio.output:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Hearing aid compatibility</span>
                                    <span>{detail.inside?(detail.inside.audio?(detail.inside.audio.hearing_aid_compatibility?detail.inside.audio.hearing_aid_compatibility:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Microphone input</span>
                                    <span>{detail.inside?(detail.inside.audio?(detail.inside.audio.microphone_input?detail.inside.audio.microphone_input:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Microphone</span>
                                    <span>{detail.inside?(detail.inside.audio?(detail.inside.audio.microphone?detail.inside.audio.microphone:""):""):""}</span>
                                </div>
                                <div>
                                    <span>av_resolution</span>
                                    <span>{detail.inside?(detail.inside.audio?(detail.inside.audio.av_resolution?detail.inside.audio.av_resolution:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Cellular :</span>
                                   
                                </div>
                                <div>
                                    <span>SIM slot</span>
                                    <span>{detail.inside?(detail.inside.cellular?(detail.inside.cellular.sim_slot?detail.inside.cellular.sim_slot:""):""):""}</span>
                                </div>
                                <div>
                                    <span>sim_ii_module</span>
                                    <span>{detail.inside?(detail.inside.cellular?(detail.inside.cellular.sim_ii_module?detail.inside.cellular.sim_ii_module:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Dual SIM Type</span>
                                    <span>{detail.inside?(detail.inside.cellular?(detail.inside.cellular.dual_sim_type?detail.inside.cellular.dual_sim_type:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Generation</span>
                                    <span>{detail.inside?(detail.inside.cellular?(detail.inside.cellular.generation?detail.inside.cellular.generation:""):""):""}</span>
                                </div>
                                <div>
                                    <span>SIM type</span>
                                    <span>{detail.inside?(detail.inside.cellular?(detail.inside.cellular.sim_type?detail.inside.cellular.sim_type:""):""):""}</span>
                                </div>
                                <div>
                                    <span style={{fontStyle:"normal",
                                            fontWeight:"600",
                                            fontSize:"18px",
                                            lineHeight:"14px",
                                            color: "#8F00FF"}}>Battery :</span>
                                   
                                </div>
                                <div>
                                    <span>Type</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.type?detail.inside.battery.type:""):""):""}</span>
                                </div>
                                <div>
                                    <span>cell_i</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.cell_i?detail.inside.battery.cell_i:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Capacity</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.capacity?detail.inside.battery.capacity:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Voltage</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.voltage?detail.inside.battery.voltage:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Energy</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.energy?detail.inside.battery.energy:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Wireless charging</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.wireless_charging?detail.inside.battery.wireless_charging:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Charging power</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.charging_power?detail.inside.battery.charging_power:""):""):""}</span>
                                </div>
                                <div>
                                    <span>Style</span>
                                    <span>{detail.inside?(detail.inside.battery?(detail.inside.battery.style?detail.inside.battery.style:""):""):""}</span>
                                </div>

                                
                            </>:""
                            
                            }
                        </div>
                        </div>
                </>

            }

        </div>


    )

}