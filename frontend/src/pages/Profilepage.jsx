import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { useUserContext } from '../context/userAuth'
import { MdOutlineModeEdit } from "react-icons/md"

function Profilepage() {
  const { authUser } = useUserContext()
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const {updateProfile}=useUserContext()
  const handleEditProfile = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setPreview(reader.result);
        await updateProfile({ profilePic: reader.result });
        setPreview(null); // Clear preview to use updated context value
      }
      reader.readAsDataURL(file)
    }
  }
useEffect(()=>{
  
})
  return (
    <>
      <Navbar param="Home" />
      <div className="bg-gray-500min-h-screen flex flex-col items-center pt-10">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <div className="relative">
            <img
              className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover"
              src={
                preview ||
                authUser?.profilePic ||
                `https://www.gravatar.com/avatar/${authUser?.email}?s=200&d=identicon`
              }
              alt={authUser?.fullName ? `${authUser.fullName}'s profile` : "Profile"}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow hover:bg-blue-600 transition"
              title="Edit Profile Picture"
              onClick={handleEditProfile}
              type="button"
            >
              <MdOutlineModeEdit size={18} />
            </button>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{authUser?.fullName || "User"}</h2>
          <p className="text-gray-500">{authUser?.email}</p>
          <button
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={handleEditProfile}
            type="button"
          >
            Edit Profile
          </button>
          <div className="mt-6 w-full">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Joined:</span>
              <span>{authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : "--"}</span>
            </div>
            {/* Add more profile details here if needed */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profilepage