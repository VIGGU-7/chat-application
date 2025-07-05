import React, { useEffect } from 'react'
import { useUserContext } from '../context/userAuth'

function Logout() {
    const {Logout}=useUserContext()
    useEffect(()=>{
        Logout()
        window.location="/login"
    },[])
  return (

    <div className='bg-white text-black'>Logging You Out</div>
  )
}

export default Logout