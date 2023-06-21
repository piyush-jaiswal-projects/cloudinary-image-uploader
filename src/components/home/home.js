import React from 'react'
import Hero from '../../images/hero.png'

export default function Home() {

    function open(type) {
        if (type === "git") {
            window.open("https://github.com/piyush-jaiswal-projects/cloudinary-image-uploader", "_blank");
            return;
        }
        window.location.replace('/app')
    }
    
    return (
        <>
        <div className="bg-white h-[83vh] mt-[4rem] p-[1rem]">
      
                <div className='animate flex justify-center items-center p-[1rem]'>
                    <h1 className='text-dark text-center text-[1.8rem] lg:text-[3rem] leading-tight'>
                        Simplify the way you upload
                        <br />
                        images to cloudinary
                    </h1>
                </div>
      
                <div className='flex justify-center'>
                    <button onClick={() => open("app")} className='m-2 p-2 px-4 bg-dark hover:bg-light hover:border border-2-white hover:text-dark text-white rounded-lg text-[1.2rem] lg:text-[1.5rem]'>Use WebApp</button>
                    <button onClick={() => open("git")} className='m-2 p-2 px-4 bg-dark hover:bg-light hover:border border-2-white hover:text-dark text-white rounded-lg text-[1.2rem] lg:text-[1.5rem]'>Fork GitHub</button>
                </div>
                
                <div className='mx-auto w-[20rem] flex justify-center'>
                    <img className='animate object-cover' src={Hero} alt="" />
                </div>
                
    </div>
        </>
    )
}