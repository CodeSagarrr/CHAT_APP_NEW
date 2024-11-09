import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiSolidMessageSquareDetail } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const LeftIcons = () => {
  return (
<>
     
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
                <Link to="/signup"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Signup</li></Link>

                <Link to="/login"><li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Login</li></Link>

                <li className='mx-2 transition-all hover:bg-[#545454]  rounded-lg p-2'>Logout</li>
              </ul>
            </div>
          </div>
        </section>
  </>
  )
}

export default LeftIcons
