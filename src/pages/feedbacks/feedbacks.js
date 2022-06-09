import React from 'react'
import { Layout } from '../../components'
import SideBar from '../../components/Navbar/SideBar'
import Switch from "react-switch";


function FeedBacks() {
    return (
        <Layout>
            <div className="relative  flex flex-row items-start justify-start w-screen h-screen">
                <SideBar active="feedbacks" />
                <div className="w-full h-screen overflow-y-auto p-2">
                    <div id="head" className="w-full p-2">
                        <h2 className="text-white-200 text-[30px] ">Testimonial Feedbacks</h2>
                        <small className="text-white-300">Manage all your feedbacks here.</small>
                        <br />
                        <br />
                        <div className="w-full flex flex-row items-start justify-start gap-5">
                            <span className={`px-4 py-1 ${true ? "bg-green-200 text-dark-100" : "bg-dark-200 text-white-200"} font-extrabold rounded-md`}>
                                All
                            </span>
                            <span className={`px-3 py-1 ${false ? "bg-green-200 text-dark-2" : "bg-dark-200 text-white-200"} font-extrabold rounded-md`}>
                                temp_xxxxx
                            </span>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-auto">
                        <table className="w-full  rounded-md bg-dark-300 py-4 shadow-lg ">
                            <thead className='w-full bg-dark-200 py-3 rounded-md'>
                                <tr>
                                    <th className='p-4 text-white-200'>Template Name</th>
                                    <th className='p-4 text-white-200'>Template ID</th>
                                    <th className='p-4 text-white-200'>Message</th>
                                    <th className='p-4 text-white-200'>User Image</th>
                                    <th className='p-4 text-white-200'>Ratings</th>
                                    <th className='p-4 text-white-200'>Published</th>
                                    <th className='p-4 text-white-200'>Created At</th>
                                    <th className='p-4 text-white-200'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array(5).fill(1).map((list, i) => {
                                        return <FeedbackRows keys={i} />
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="w-full h-[100px]"></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FeedBacks


function FeedbackRows({ keys }) {

    return (
        <tr key={keys} className='bg-dark-300 hover:bg-dark-400'>
            <td className=' py-4 px-6 '>
                <small className="text-white-100 text-[15px] ">custom name</small>
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-white-100 text-[15px] ">
                    temp_xxxxxx
                </small>
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-white-100 text-[15px] ">
                    You are one of a kind....
                </small>
            </td>
            <td className=' py-4 px-6 '>
                <img src="" className=' w-[50px] h-[50px] ' alt="user image" />
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-green-200 text-[15px] ">
                    {keys * 2}
                </small>
            </td>
            <td className=' py-4 px-6 '>
                <Switch checked={false} />
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-white-300 text-[12px] ">
                    May 3, 2020
                </small>
            </td>
            <td className=' py-4 px-6 flex flex-col items-start justify-start gap-3'>
                <button className="px-3 py-1 bg-dark-200 rounded-md scale-[.70] ">View</button>
                <button className="px-3 py-1 bg-red-500 text-white-100 rounded-md scale-[.70] ">Delete</button>
            </td>
        </tr>
    )
}