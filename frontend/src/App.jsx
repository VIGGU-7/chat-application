import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loginpage from './pages/Loginpage'
import SignupPage from './pages/Signuppage'
import Profilepage from './pages/Profilepage'
import {  useUserContext } from './context/userAuth'
import { UserProvider } from './context/context'
import { Loader, Users } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Logout from './pages/Logout'
import { MessageContextProvider, useMessageContext } from './context/userMessage'
function AppContent() {
  const { checkAuth, authUser, isCheckingauth} = useUserContext()
  useEffect(() => {
    checkAuth()
  },[])
  if (isCheckingauth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen bg-blue-500'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    <>
        
    <Toaster/>
<MessageContextProvider>
<Routes>
    <Route path='/Home' element={authUser ?  <Navigate to="/" /> : <Navigate to="/login" /> } />
    <Route path='/' element={authUser ? <Homepage /> :  <Navigate to="/login" /> } />
    <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignupPage />} />
    <Route path='/login' element={authUser ?  <Navigate to="/" />  : <Loginpage />} />
    <Route path='/profile' element={authUser ?  <Profilepage/> :  <Navigate to="/login" />} />
    <Route path='/logout' element={authUser ?  <Logout/> :  <Navigate to="/login" />} />
</Routes>
</MessageContextProvider>
    </>

  )
}

function App() {
  return (
   
    <UserProvider>
      <AppContent />
    </UserProvider>
  
  )
}

export default App