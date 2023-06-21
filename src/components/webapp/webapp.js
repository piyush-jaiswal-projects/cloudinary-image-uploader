import React, { useState } from 'react'
import $ from 'jquery'

import useWindowSize from '../../hooks/useWindowSize';
import getCookie from '../../functions/getCookie';

export default function WebApp() {
  
  const presetCookie = getCookie("preset");
  const cloudCookie = getCookie("cloudName");
  const rememberCookie = getCookie("remember");

  const windows = useWindowSize();
  const [image, setImage] = useState("");
  const [preset, setPreset] = useState(presetCookie);
  const [cloudName, setCloudName] = useState(cloudCookie);
  const [imageURL, setImageURL] = useState("");
  const [newImage, uploadNewImage] = useState("");
  const [message, setMessage] = useState(<label className='text-[darkgreen]'>Free to use</label>)
  const [status, setStatus] = useState(<label className='text-[darkgreen]'>IDLE</label>)

  var previewClass = "parent mx-auto w-[" + String(windows.width) + "px] h-[" + String(windows.height) + "px] rounded "

  function handleFileChange(e) {
    setImage(() => e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageElement = document.createElement("img");
        imageElement.className = "child"
        imageElement.src = e.target.result;
        const targetDiv = document.getElementById("parent");
        targetDiv.appendChild(imageElement);
      };
      reader.readAsDataURL(file);
    }
  }

  function uploadFile() {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", preset === "" ? process.env.REACT_APP_UPLOAD_PRESET : preset)
    data.append("cloud_name", cloudName === "" ? process.env.REACT_APP_CLOUD_NAME : cloudName)

    setStatus(<label className='text-[orange]'>PENDING</label>)
    setMessage(<label className='text-[orange]'>Please Wait...</label>)
    fetch(`https://api.cloudinary.com/v1_1/${cloudName === "" ? process.env.REACT_APP_CLOUD_NAME : cloudName}/upload`, {
      method: "post",
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        var parentElement = document.getElementById('parent');
        var childElement = parentElement.querySelector('img');
        parentElement.removeChild(childElement);
        if (data.error) {
          setMessage(<label className='text-[red]'>{data.error.message}</label>);
          setStatus(<label className='text-[red]'>FAILED</label>)
          uploadNewImage(<><button className='cursor-pointer rounded-sm text-[red]' onClick={() => { window.location.reload(); }}>Reload</button> |</>)
        }
        else {
          setStatus(<label className='text-[green] font-bold'>SUCCESS</label>)
          setMessage(<label className='text-[green] font-bold'>Image Uploaded Successfully</label>)
          uploadNewImage(<><button className='cursor-pointer rounded-sm text-[green] font-bold' onClick={() => { window.location.reload(); }}> Upload Another Image</button> |</>)
          setImage("");
          setImageURL(() => data.url);
        }
      })
      .catch((error) => {
        setStatus(<label className='text-[red]'>PENDING</label>)
        setMessage(<label className='text-[red]'>Some Error Occurred</label>)
        uploadNewImage(<><button className='cursor-pointer rounded-sm text-[red]' onClick={() => { window.location.reload(); }}>Reload</button> |</>)
        console.log(error);
      })
  }

  function toggleHelp() {
    $("#help").toggleClass("hidden");
  }

  function handleCheckboxChange(event) {
    if (event.target.checked) {
      document.cookie = "preset=" + preset;
      document.cookie = "cloudName=" + cloudName;
      document.cookie = "remember=true";
    window.location.reload();
    }
  }

  function clearCookies() {
    document.cookie = "preset=";
    document.cookie = "cloudName=";
    document.cookie = "remember=false";
    window.location.reload();
  }

  return (
    <>
      <div id="help" className='hidden p-2 animate fixed right-2 shadow-xl m-5 z-50 bg-dark w-[300px] h-[500px] overflow-y-scroll rounded-lg'>
        <button className='bg-light shadow-lg text-white p-1 px-2 rounded-lg m-2' onClick={toggleHelp}>Close</button>
        <div className='text-white'>
          <ul>
            <li>- To get the required details, signup on <a className='underline cursor-pointer' href='https://cloudinary.com/' target='_blank' rel='noreferrer'>cloudinary</a> for FREE</li><br />
            <li>- Click on Dashboard present on right side of console, and you will find Cloud Name under "Product Environment Credentials"</li><br />
            <li>- To get preset, click on "setings icon" at bottom left. And then go to "Upload" section present on left side bar.</li><br />
            <li>- Scroll down to upload preset section. Click "Add upload Preset". Enter preset name and click "Save"</li>
          </ul>
        </div>
      </div>

      
      <div className='overflow-x-hidden bg-white w-[100vw] h-[83vh] mt-[4rem] p-[1rem]'>
        
        <div className='w-[95vw] lg:w-[100%] flex items-center flex-wrap justify-left p-2  border-b-2 border-[grey]'>
          
          <div className='mx-auto my-2 w-[100%] lg:w-[35%] flex items-center justify-around'>
            <label>Enter Upload Preset: </label>
            <input className='p-1 border border-dark outline-none rounded-sm' type="text" value={preset} onChange={(e) => setPreset(e.target.value)} />
          </div>
          
          <div className='mx-auto my-2 w-[100%] lg:w-[35%] flex items-center justify-around'>
            <label>Enter Cloud Name: </label>
            <input className='p-1 border border-dark outline-none rounded-sm' type="text" value={cloudName} onChange={(e) => setCloudName(e.target.value)} />
          </div>
          
          <div className='mx-auto mt-2 w-[100%] lg:w-[20%] text-center'>
            {rememberCookie === "true" ? <label className='cursor-pointer' onClick={clearCookies}>Clear Details</label> :
              <>
                <input className='p-1' id="remember" type="checkbox" onChange={handleCheckboxChange} />
                <label>Remember details</label>
              </>
            }
          </div>
          
          <div onClick={toggleHelp} className='cursor-pointer mx-auto w-[100%] lg:w-[10%] text-center'>Need Help?
          </div>

        </div>

        <div className='overflow-x-hidden w-[90vw] h-[90%] mx-auto text-center p-4 border border-[grey] rounded-lg'>
          
          <input className='bg-dark text-white ' type="file" accept='.png, .jpg, .jpeg, .svg' onChange={handleFileChange} />
          <button className='bg-dark hover:bg-light text-white p-1 px-2 rounded-lg m-2' onClick={uploadFile}>Upload Image</button>
          
          <div className=''>
          | Upload Status: {status} | Message: {message} | {newImage}
          </div>
          
          <p className='m-2 text-dark'>Uploaded Image URL: <a className='underline' target='_blank' rel='noreferrer' href={imageURL}>{imageURL}</a></p>
          
          <div>
            <label>Image Preview</label>
            <div id="parent" className={previewClass}>
            </div>
          </div>
        
        </div>
      
      </div>
    </>
  )
}