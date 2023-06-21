import React from 'react'

export default function Header() {
    return (
        <div className='bg-dark fixed top-0 w-[100vw] flex justify-center items-center p-3'>
            <div className='w-[90vw] flex justify-center'>
            <a href="/" className='outline-none'><h1 className='text-white text-[2rem]'>PicUpCloud</h1></a>
            </div>
        </div>
    )
}