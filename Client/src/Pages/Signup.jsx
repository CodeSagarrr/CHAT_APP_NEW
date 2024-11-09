import React, { useState } from 'react'
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineGroupAdd } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/chat/register', registerData)
      if (res.data.msg === 'success') {
        toast.success('Registration Successful')
        navigate('/login');
        setRegisterData({
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        })
      } else {
        toast.error(res.data.msg)
      }
    } catch (err) {
      console.log(err.message || 'error occurred')
    }
  }




  return (
    <>
      <div className='flex w-[90vw] h-[94vh] rounded-md bg-[#222E35] mt-3 mx-auto'>
        {/* {left icon section } */}
        <section className='flex justify-center pt-4 w-[4rem] h-full bg-[#202C33] border-r-[1px] border-[#2F3B43]'>
          <div>
            <Link to="/"><span><BiSolidMessageSquareDetail className='text-2xl cursor-pointer text-[#878A92]' /></span></Link>
            <span><CgProfile className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
            <span><MdOutlineGroupAdd className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
            <span><AiOutlineSetting className='text-2xl mt-5 cursor-pointer text-[#878A92]' /></span>
            <div className="dropdown dropdown-bottom mt-5 text-[#878A92]">
              <div tabIndex={0} role="button" className=" m-1"><BsThreeDotsVertical /></div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                <Link to="/signup"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2 '>Signup</li></Link>

                <Link to="/login"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2 '>Login</li></Link>

                <li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2 '>Logout</li>
              </ul>
            </div>
          </div>
        </section>

        {/* {center user id } */}
        <section className='flex justify-center items-center w-[82vw] h-[90vh] bg-[#111B21] m-auto rounded-lg'>
          <h1 className='absolute top-8 left-30 ml-5 mt-5'>Signup</h1>
          <form className='flex flex-col flex-wrap font-normal border rounded-lg w-[30rem] h-[30rem] p-4'>
            <span className='text-3xl relative left-[48%] mb-6'> <FaLock /></span>
            <label className='mt-3'> Firstname</label>
            <input type='text' name='firstname' placeholder='Enter firstname' required onChange={handleChange} className='bg-white mt-1 py-1 px-2 text-black rounded-md font-medium' />

            <label className='mt-4'> Lastname</label>
            <input type='text' name='lastname' placeholder='Enter lastname' required onChange={handleChange} className='bg-white mt-1 py-1 px-2 text-black rounded-md font-medium' />

            <label className='mt-4'> Email</label>
            <input type='text' name='email' placeholder='Enter email' required onChange={handleChange} className='bg-white mt-1 py-1 px-2 text-black rounded-md font-medium' />

            <label className='mt-4'> Password</label>
            <input type='password' name='password' placeholder='Enter password' required onChange={handleChange} className='bg-white mt-1 py-1 px-2 text-black rounded-md font-medium' />
            <p className='text-[14px] mt-4 '>Already have member ? <Link to="/login">Login</Link></p>
            <button className='w-[9rem] h-[2.5rem] mt-2 rounded-lg bg-[#00A884]' onClick={handleSubmit}>
              Signup
            </button>
          </form>
        </section>




      </div >
    </>
  )
}

export default Signup
