import React, { useEffect, useState } from 'react'
import './navbar.css'

const Navbar = () => {
  const [show , handleShow] = useState(false);  

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    });

    return ()=>{
        window.removeEventListener("scroll");
    };
  },[])

  return (
    <div className={`navbar ${show && "navbar_black"}`}>
        <img className='navbar_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
        <img className='navbar_avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Logo" />
    </div>
  )
}

export default Navbar