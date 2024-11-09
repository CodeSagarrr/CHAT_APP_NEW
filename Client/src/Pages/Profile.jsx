import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiSolidMessageSquareDetail } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import ChatBox from '../Components/ChatBox'
import { ContextData } from '../Context/Context.jsx'
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Profile() {
    const { user } = ContextData();
    const inputRef = useRef();
    const [profilePic, setProfilePic] = useState(null)
    const [updateUser , setUpdateUser] = useState([]);

    const handleImageClick = () => {
        inputRef.current.click()
    }
    const handleImageChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        setProfilePic(file)

        const formData = new FormData();
        formData.append('imageFile', file);
        try {
            const res = await axios.put(`/chat/profilePic/${user?._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(res.data.msg)
            setProfilePic(null)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        const getUser = async() =>{
            try {
                const res = await axios.get(`/chat/${user._id}`)
                setUpdateUser(res.data)
            } catch (error) {
                console.log(error.message || 'error occured')
            }
        }
        getUser()
    },[user])
    return (
        <>
            <div className='flex w-[90vw] h-[94vh] rounded-md bg-[#222E35] mt-3 mx-auto'>
                {/* {left icon section } */}
                <section className='flex justify-center pt-4 w-[4rem] h-full bg-[#202C33] border-r-[1px] border-[#2F3B43]'>
                    <div>
                        <Link to='/'><span><BiSolidMessageSquareDetail className='text-2xl cursor-pointer text-[#878A92]' /></span></Link>
                        <Link to="/profile"><span><CgProfile className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span></Link>
                        <Link to="/member"><span><MdOutlineGroupAdd className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span></Link>
                        <span><AiOutlineSetting className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
                        <div className="dropdown dropdown-bottom mt-5 text-[#878A92]">
                            <div tabIndex={0} role="button" className=" m-1"><BsThreeDotsVertical /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                                <Link to="/signup"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Signup</li></Link>

                                <Link to="/login"><li  className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Login</li></Link>

                                <li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* {center user id } */}
                <section className=' relative w-[36vw] h-full bg-[#111B21] pt-4'>
                    <div className='ml-4'>
                        <h1>Profile</h1>
                    </div>
                    <div className='w-[32vw] h-[24vh] border-y-2 mt-4'>

                    </div>
                    <div className='absolute left-[8.5rem] top-[11rem] flex justify-center flex-col'>
                        <img src={updateUser?.profilepic} onClick={handleImageClick} className='w-[100px] h-[100px] rounded-[50%] bg-center bg-cover cursor-pointer ' />
                        <input type="file" className='hidden' name="imageFile" accept='image/*' ref={inputRef} onChange={handleImageChange} />
                    </div>
                    <div className='mt-4'>
                        <h1 className='text-xl font-[Kanit] font-bold text-center mt-16'>{user.firstname}</h1>

                    </div>
                    <hr className='mt-6' />
                    <div>
                        <div className='flex gap-x-4 mt-6 ml-6' >
                            <FaUser className='text-xl' /> <p>{user.firstname} {user.lastname}</p>
                        </div>
                        <div className='flex gap-x-4 mt-6 ml-6'>
                            <MdEmail className='text-xl' /> <p> {user.email}</p>
                        </div>

                        <div className='flex gap-x-4 mt-6 ml-6'>
                            <MdLocationOn className='text-xl' /> <p>India</p>
                        </div>
                    </div>
                    <hr className='w-[90%] mx-auto mt-10' />
                </section>

                {/* {right side chat} */}

                <div className='w-full h-full'>
                    <ChatBox />
                </div>

            </div>
        </>
    )
}

export default Profile
