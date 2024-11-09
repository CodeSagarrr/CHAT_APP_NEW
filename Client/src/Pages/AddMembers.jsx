import React, { useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiSolidMessageSquareDetail } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import ChatBox from '../Components/ChatBox'
import { ContextData } from '../Context/Context.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function AddMembers() {
    const { user } = ContextData();

    const [inpEmail, setInpEmail] = useState({ email: "" })

    const handleChange = (e) => {
        setInpEmail({ ...inpEmail, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inpEmail.email) {
            toast.warning('Please enter a valid email')
            return;
        }
        try {
            const res = await axios.post(`/chat/chatmember/${user._id}`, inpEmail)
            if (res.data.msg === 'success') {
                toast.success('user added successfully')
                setInpEmail({ email: "" })
            } else {
                toast.warning(res.data.msg);
            }
        } catch (error) {
            console.log(error.message || 'error occured')
        }
    }
    return (
        <>

            <div className='flex w-[90vw] h-[94vh] rounded-md bg-[#222E35] mt-3 mx-auto'>
                {/* {left icon section } */}
                <section className='flex justify-center pt-4 w-[4rem] h-full bg-[#202C33] border-r-[1px] border-[#2F3B43]'>
                    <div>
                        <Link to='/'><span><BiSolidMessageSquareDetail className='text-2xl cursor-pointer text-[#878A92]' /></span></Link>
                        <Link to="/profile"><span><CgProfile className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span></Link>
                        <span><MdOutlineGroupAdd className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
                        <span><AiOutlineSetting className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
                        <div className="dropdown dropdown-bottom mt-5 text-[#878A92]">
                            <div tabIndex={0} role="button" className=" m-1"><BsThreeDotsVertical /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                                <Link to="/signup"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Signup</li></Link>

                                <Link to="/login"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Login</li></Link>

                                <li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* {center user id } */}
                <section className=' relative w-[46vw] h-full bg-[#111B21] pt-4'>
                    <hr className='mt-2' />
                    <div>
                        <img src={user?.profilepic} className='w-[80px] h-[80px] rounded-[50%] mx-auto mt-5' />
                        <p className='font-[kanit] mt-4 text-center'>{user.firstname}</p>
                        <hr className='mt-4' />
                        <h1 className='ml-4 mt-5'>Add users</h1>

                        <form>
                            <label className="input input-bordered flex items-center gap-2 mt-6 mx-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="email" name='email' onChange={handleChange} />
                            </label>
                            <button className="btn bg-[#06cf9c] text-white  ml-4 mt-4"
                                onClick={handleSubmit}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-5 w-5 ">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                Invite
                            </button>
                        </form>
                    </div>

                </section>

                {/* {right side chat} */}

                <div className='w-full h-full'>
                    <ChatBox />
                </div>

            </div>
        </>
    )
}

export default AddMembers
