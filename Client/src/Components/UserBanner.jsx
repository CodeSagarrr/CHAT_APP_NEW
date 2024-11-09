import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UserBanner({allMember , currentUser , userOnline}) {

    const [ userData , setUserData] = useState([]);

    useEffect(()=>{
        const getData = async() =>{
            const userId = allMember.members?.filter((id) => id !== currentUser)
            try {
                const res = await axios.get(`/chat/${userId}`)
                setUserData(res.data)
            } catch (error) {
                console.log(error.message || 'error occured')
            }
        }
        getData()
    },[allMember.members , currentUser])
    return (
        <>
          
            <div className='flex flex-row gap-x-3 pt-4 transition-all hover:bg-[#545454] pb-4 rounded-xl cursor-pointer mr-4 mt-2'>
                <div className='ml-2'>
                    <img src={userData?.profilepic} className='w-[40px] h-[40px] rounded-[50%] bg-center bg-cover' />
                </div>
                <div className='flex flex-col justify-center '>
                    <p className='text-[14px]'>{userData?.firstname}</p>
                    <p className='text-[10px]'>{userOnline ? 'online' : 'offline'}</p>
                </div>
            </div>

        </>
    )
}

export default UserBanner
