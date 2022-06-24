import React, { useState, useEffect } from 'react'
import { Layout } from '../../components'
import SideBar from '../../components/Navbar/SideBar'
import Switch from "react-switch";
import Fetch from "../../helpers/fetch"
import API_ROUTES from '../../config/apiRoutes';
import moment from "moment"
import { Notification } from '../../helpers';

const notif = new Notification(4000)

function FeedBacks() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [feedbacks, setFeedbacks] = useState([])

    let user = JSON.parse(localStorage.getItem("tymonial"))

    useEffect(() => {
        getFeedbacks()
    }, [])

    async function getFeedbacks() {
        try {
            setLoading(true)
            const req = await Fetch(API_ROUTES.getFeedback, {
                method: "POST",
                body: JSON.stringify({ userId: user?.id, type: "user" })
            })
            const { res, data } = req;
            setLoading(false)

            if (data && data.error) {
                setError(data.message)
                if (res.status === 403) {
                    window.location.reload()
                }
                return
            }

            setFeedbacks([...data.data])
            console.log(data);
        }
        catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }

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
                            {/* <span className={`px-3 py-1 ${false ? "bg-green-200 text-dark-2" : "bg-dark-200 text-white-200"} font-extrabold rounded-md`}>
                                temp_xxxxx
                            </span> */}
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-auto">
                        <table className="w-full  rounded-md bg-dark-300 py-4 shadow-lg ">
                            <thead className='w-full bg-dark-200 py-3 rounded-md'>
                                <tr>
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
                                    loading ?
                                        <p className="w-full text-center text-white-200">Feedback Loading..</p>
                                        :
                                        error !== null ?
                                            <p className="w-full text-center text-white-200">{error}</p>
                                            :
                                            feedbacks.length === 0 ?
                                                <p className="w-full text-center text-white-200">Opps, No feedbacks Avaialable.</p>
                                                :
                                                feedbacks.map((list, i) => {
                                                    return <FeedbackRows keys={i} data={list} />
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


function FeedbackRows({ keys, data }) {

    const [loading, setLoading] = useState(false);
    const [delloading, setDelLoading] = useState(false);
    const [userData, setUserData] = useState({
        published: data?.published
    })

    let user = JSON.parse(localStorage.getItem("tymonial"))


    async function publishFeedback(e) {
        let dataset = e.target.dataset;

        if (Object.entries(dataset).length > 0) {
            const { id } = dataset;
            try {
                setLoading(true)
                const isPub = userData.published === false ? true : false;
                const result = await Fetch(API_ROUTES.publishFeedback, {
                    method: "PUT",
                    body: JSON.stringify({
                        userId: user?.id,
                        id,
                        published: isPub
                    })
                })

                const { data } = result;

                if (data.error) {
                    setLoading(false)
                    return notif.error(data.message)
                }
                setLoading(false)
                setUserData((prevVal) => ({ ...prevVal, ['published']: !userData.published }))
                return
            } catch (e) {
                setLoading(false)
                notif.error(e.message)
                console.error(e)
            }
        }
    }

    async function deleteFeedback(e) {
        let dataset = e.target.dataset;

        if (Object.entries(dataset).length > 0) {
            const { id } = dataset;
            try {
                const check = window.confirm("Are you sure about this action.")

                if (!check) return;

                setDelLoading(true)
                const result = await Fetch(API_ROUTES.deleteFeedback, {
                    method: "DELETE",
                    body: JSON.stringify({
                        userId: user?.id,
                        id,
                    })
                })
                const { res, data } = result;

                if (data.error) {
                    setDelLoading(false)
                    notif.error(data.message)

                    if (res.status === 403) {
                        window.alert("Something went wrong, reload page to confinue")
                    }
                    return
                }
                setDelLoading(false)
                window.location.reload(true)
                return
            } catch (e) {
                setDelLoading(false)
                notif.error(e.message)
                console.error(e)
            }
        }
    }

    return (
        <tr key={keys} className='bg-dark-300 hover:bg-dark-400'>
            <td className=' py-4 px-6 '>
                <small className="text-white-100 text-[15px] ">
                    {data?.templateId}
                </small>
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-white-100 text-[15px] ">
                    {data?.message}
                </small>
            </td>
            <td className=' py-4 px-6 '>
                {data?.profileImg === "" ? "None" : <img src={data?.profileImg} className=' w-[50px] h-[50px] ' alt="user image" />}
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-green-200 text-[15px] ">
                    {data?.ratings}
                </small>
            </td>
            <td className=' py-4 px-6 flex flex-row items-center justify-start '>
                {/* <Switch checked={userData.published} onChange={publishFeedback} /> */}
                {
                    loading ?
                        <small className="text-white-200">Publishing...</small>
                        :
                        <>
                            <input type="checkbox" checked={userData.published} data-id={data?.feedbackId} onChange={publishFeedback} />
                            <small className='ml-4 text-white-300 '>{userData.published ? "Yes" : "No"}</small>
                        </>
                }
            </td>
            <td className=' py-4 px-6 '>
                <small className="text-white-300 text-[12px] ">
                    {moment(data?.createdAt).startOf('hour').fromNow()}
                </small>
            </td>
            <td className=' py-4 px-6 flex flex-col items-start justify-start gap-3'>
                <button className="px-3 py-1 bg-red-500 text-white-100 rounded-md scale-[.70] " onClick={deleteFeedback} data-id={data?.feedbackId} >
                    {delloading ? "Deleting..." : "Delete"}
                </button>
            </td>
        </tr>
    )
}