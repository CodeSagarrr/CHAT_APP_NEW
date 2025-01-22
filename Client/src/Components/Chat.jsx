import React, { useEffect, useRef, useState } from 'react'
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineGroupAdd } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import UserBanner from '../Components/UserBanner.jsx'
import axios from 'axios';
import { ContextData } from '../Context/Context.jsx';
import ChatBox from './ChatBox.jsx';
import { io } from 'socket.io-client'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Chat = () => {
    const navigate = useNavigate()
    const { user, getUser, logout } = ContextData()
    const [member, setMember] = useState([]); // get all member 
    const [currentChat, setCurrentChat] = useState(null);
    const [userOnline, setUserOnline] = useState([]) // get user from socket
    const [sendMessage, setSendMessage] = useState(null); // message send direct socket
    const [recievedMessage, setRecievedMessage] = useState(null);
    const socket = useRef();

    useEffect(() => {
        getUser(); // route protect
    }, [])


    useEffect(() => {
        const getMember = async () => {
            try {
                const res = await axios.get(`/chat/chatmember/${user?._id}`)
                setMember(res.data)
            } catch (error) {
                console.log(error.message || 'error occurred')
            }

        }
        getMember()
    }, [user, member._id])

    // send message
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    // socket connection
    useEffect(() => {
        socket.current = io('https://chat-app-new-ncrs.onrender.com/')
        socket.current.emit('new-user-add', user?._id)
        socket.current.on('get-user', (user) => {
            setUserOnline(user);
        })

        return () => {
            socket.current.disconnect();
        };
    }, [user])
    // reciev message
    useEffect(() => {
        socket.current.on('received-message', (message) => {
            setRecievedMessage(message);
        })
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get('/chat/logout')
            toast.success('user logged out successfully')
            navigate('/login')
            logout();
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
                        <span><BiSolidMessageSquareDetail className='text-2xl cursor-pointer text-[#878A92]' /></span>
                        <Link to="/profile"><span><CgProfile className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span></Link>
                        <Link to="/member"><span><MdOutlineGroupAdd className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span></Link>
                        <span><AiOutlineSetting className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
                        <div className="dropdown dropdown-bottom mt-5 text-[#878A92]">
                            <div tabIndex={0} role="button" className=" m-1"><BsThreeDotsVertical /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                                <Link to="/signup"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2 '>Signup</li></Link>

                                <Link to="/login"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Login</li></Link>

                                <li onClick={handleLogout} className='mx-2 transition-all hover:bg-[#545454] rounded-lg p-2 cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* {center user id } */}
                <section className='w-[28vw] h-full bg-[#111B21] pt-4'>
                    <div className='ml-4'>
                        <h1>Chats</h1>
                    </div>
                    <div className='ml-4 mt-4 mr-4'>
                        <label className="input input-bordered flex items-center gap-1">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                    <div className='ml-4'>
                        {
                            member.map((curr, i) => (
                                <div key={i} onClick={() => setCurrentChat(curr)}>
                                    <UserBanner allMember={curr} currentUser={user._id} userOnline={userOnline}/>
                                </div>

                            ))
                        }
                    </div>
                </section>

                {/* {right side chat} */}

                <div className='w-full h-full'>
                    <ChatBox chat={currentChat} currUser={user?._id} setSendMessage={setSendMessage} recievedMessage={recievedMessage} />
                </div>

            </div>
        </>

    )
}

export default Chat
