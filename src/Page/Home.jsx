import React, {  useState } from 'react'
import '../Style/Home.css'
import { BsCardImage } from 'react-icons/bs';
import { MdImageNotSupported } from 'react-icons/md';
import imageCompression from 'browser-image-compression';


export const Home = () => {
    const[orginalimage,setOrginalimage]=useState("")
    const[orginalimagefile,setOrginalimagefile]=useState("")
    const[compressedimage,setCompressedimage]=useState("")
    const[filename,setFilename]=useState("")
 

    const handlechange=(e)=>{
        const imagefile=e.target.files[0]
        setOrginalimage(imagefile)
        setOrginalimagefile(URL.createObjectURL(imagefile))
        setFilename(imagefile.name)
    }

    
   
    const handlecompress=(e)=>{
    
            e.preventDefault()
            const options={
            maxSizeMB :1,
            maxWidthOrHeight:500,
            useWebworker:true
        }
        if(options.maxSizeMB>=orginalimage/1024){
            alert("Image is too small")
            return 0
        }
        let output;
        imageCompression(orginalimage,options).then((e)=>{
        output=e;
        const downloader=URL.createObjectURL(output)
        setCompressedimage(downloader)
      })
    }
  return (
  <>
    <h1 style={{fontSize:"3rem",marginTop:"40px"}}>Image Compressor</h1>

    <div className='container'>

        <div className='child_div'>
            {orginalimage ?  <img src={orginalimagefile} alt="" />:
          <BsCardImage size={"15rem"}/>}
           
        </div>
        <div className='middle_child_div'>
            <input  type="file" accept='image'
            onChange={(e)=>handlechange(e)}  />

        {orginalimagefile &&    <button  id="btn" onClick={(e)=>handlecompress(e)}>Compress Image</button>}
        <br />
       {compressedimage &&     <button id="btn">
        <a href={compressedimage} download={filename}>
        Download</a></button>}

        </div>
        <div className='child_div'>
        {compressedimage ?  <img src={compressedimage} alt="" />:
          <MdImageNotSupported size={"15rem"}/>}
        
        </div>

    </div>
    </>
  )
}
