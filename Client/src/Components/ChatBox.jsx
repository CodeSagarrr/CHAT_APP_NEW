import axios from 'axios';
import { format } from 'timeago.js'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs';
import InputEmoji from "react-input-emoji";

function ChatBox({ chat, currUser, setSendMessage, recievedMessage }) {
    const [userChat, setUserChat] = useState(null); // getting other user 
    const [newMessage, setNewMessage] = useState(''); // user message type in input field
    const [getMessage, setGetMessage] = useState([]);
    const scroll = useRef()
    //  recievedMessage from the socket server



    useEffect(() => {
        if (recievedMessage !== null) {
            setGetMessage(prevMessages => [...prevMessages, recievedMessage]);
        }
    }, [recievedMessage]);


    useEffect(() => { // get user
        const userId = chat?.members?.filter((id) => id !== currUser)
        const getUser = async () => {
            try {
                const res = await axios.get(`/chat/${userId}`)
                setUserChat(res.data)
            } catch (error) {
                console.log(error || 'error occured')
            }

        }
        getUser()
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }



    // send message to other user 
    const sendData = async (e) => {
        e.preventDefault();
        const message = {
            sender: currUser,
            message: newMessage,
            receiver: chat._id
        }
        // send message to socket server
        const receiverId = chat?.members?.find((id) => id !== currUser)
        setSendMessage({ ...message, receiverId })
        try {
            await axios.post('/chat/message', message)
            const newMsg = {
                sender: currUser,
                message: newMessage,
                receiver: chat.id,
                createdAt: new Date().toISOString()
            }
            setGetMessage([...getMessage, newMsg])
            setNewMessage("")

        } catch (error) {
            console.log(error.message || ' error occured')
        }
    }

        // getting user message from database
        useEffect(() => {
            const getMessage = async () => {
                try {
                    const res = await axios.get(`/chat/message/${chat?._id}`)
                    setGetMessage(res.data)
                } catch (error) {
                    console.log(error.message || 'error occured')
                }
            }
            getMessage()
        }, [chat])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [getMessage])
    return (
        <>
            {userChat ?
                <div className='bg-[url("https://i.pinimg.com/736x/e6/29/25/e62925d2af795db245dffbc42e05296b.jpg")] bg-cover bg-center h-full text-white '>
                    <div className='flex gap-x-3 py-3  bg-[#202C33] w-full '>
                        <div>
                            <img src={userChat.profilepic} className='w-[38px] h-[38px] rounded-[50%] ml-5' />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='font-semibold text-[14px] text-white'>{userChat.firstname}</p>
                        </div>
                    </div>
                    {/* <hr style={{ width: '56vw', border: '0.1px solid #ececec', marginLeft: '2rem' }} /> */}

                    <div className='overflow-y-scroll h-[74vh]'>
                        {
                            getMessage.map((msg, i) => (
                                <div key={i} className='py-4' ref={scroll} >
                                    {msg.sender === currUser ? <>
                                        <div className="chat chat-end">
                                            <div className="chat-bubble mr-4 chat-bubble-success text-[13px] bg-[#005C4B] text-[#FFFFFF]">{msg.message}
                                                <p className='text-[9px] text-[#b9bdbf] mt-1'>{format(msg.createdAt)}</p>
                                            </div>

                                        </div></> : <>
                                        <div className="chat-bubble ml-4 text-[13px] bg-[#202C33] text-white">{msg.message}
                                            <p className='text-[9px] text-[#7A8185] mt-1'>{format(msg.createdAt)}</p>
                                        </div> </>}

                                </div>
                            ))
                        }
                    </div>


                    <div className='absolute bottom-0 w-[53vw] mb-10 ml-2 '>
                        <InputEmoji
                            value={newMessage}
                            onChange={handleChange}
                            cleanOnEnter
                            placeholder="Type here ..." />
                    </div>


                    <button className="btn absolute bottom-0 right-[5rem] mb-10 bg-[#005C4B] " ><BsFillSendFill className='text-[22px] ' onClick={sendData} /></button>




                </div> : <div className='flex justify-center items-center h-full w-full text-white rounded-lg bg-[#222E35]'>
                    <p className='font-normal  text-center'>Select a conversation to start chatting.</p>
                </div>}

        </>
    )
}

export default ChatBox
// {msg.sender === currUser ? <div className="chat chat-end">
//     <div className="chat-bubble chat-bubble-success">{msg.message} : <div className="chat-bubble">{}</div>}</div>
// </div>}