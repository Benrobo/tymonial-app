import React, { useState, useContext, useEffect } from 'react'
import { Layout, DomHead, NavBar } from "../components";
import SideBar from '../components/Navbar/SideBar';
import DataContext from '../context/DataContext';
import { Notification } from '../helpers';
import moment from "moment"
import API_ROUTES from '../config/apiRoutes';
import Fetch from '../helpers/fetch';
import { Bar, Doughnut, Line, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto"

const notif = new Notification(4000)

function Dashboard() {
    const { isAuthenticated } = useContext(DataContext)
    const [active, setActive] = useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


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

    const pendingfeedback = feedbacks.length > 0 ? feedbacks.filter(feed => !feed.published).length : 0;
    const approvedfeedback = feedbacks.length > 0 ? feedbacks.filter(feed => feed.published).length : 0;

    return (
        <Layout>
            <div className="relative  flex flex-row items-start justify-start w-screen h-screen">
                <SideBar active="tasks" />
                <div className="w-full h-screen overflow-y-auto p-2">
                    <div id="head" className="w-full h-auto p-3  flex flex-col items-start justify-start ">
                        <p className="text-white-100 font-extrabold">Dashboard</p>
                        <div className="w-full h-auto flex flex-wrap items-start justify-start mt-10 gap-5">
                            <div id="card" className="w-[250px] h-auto p-3 flex flex-col items-start justify-start rounded-md bg-dark-200 mr-4">
                                <h2 className="text-[12px] px-3 py-1 bg-green-600 text-green-200 mb-4 rounded-md ">Testimonials Feedbacks</h2>
                                <h2 className="text-[30px] text-white-300 ">Approved</h2>
                                <h2 className="text-[35px] font-extrabold ">{approvedfeedback}</h2>
                            </div>
                            <div id="card" className="w-[250px] h-auto p-3 flex flex-col items-start justify-start rounded-md bg-dark-200 mr-4">
                                <h2 className="text-[12px] px-3 py-1 bg-green-600 text-green-200 mb-4 rounded-md ">Testimonials Feedbacks</h2>
                                <h2 className="text-[30px] text-white-300 ">Pending</h2>
                                <h2 className="text-[35px] font-extrabold ">{pendingfeedback}</h2>
                            </div>
                            <div id="card" className="w-[250px] h-auto p-3 flex flex-col items-start justify-start rounded-md bg-dark-200 mr-4">
                                <h2 className="text-[12px] px-3 py-1 bg-green-600 text-green-200 mb-4 rounded-md ">All Feedbacks</h2>
                                {/* <select className="text-[12px] px-2 py-1 bg-dark-100 text-white-200 mb-4 rounded-md ">
                                    <option value="" className="">template_ID</option>
                                </select> */}
                                <h2 className="text-[30px] text-white-300 ">Response</h2>
                                <h2 className="text-[35px] font-extrabold ">{feedbacks.length}</h2>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    {feedbacks.length > 0 && <ChartSection feedbacks={feedbacks} pending={pendingfeedback} approved={approvedfeedback} />}
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard

function ChartSection({ feedbacks, pending, approved }) {

    const [data, setData] = useState({
        labels: [`Pending Feedbacks ${pending}`, `Approved Feedbacks ${approved}`, `All Feedbacks ${feedbacks.length}`],
        datasets: [
            {
                id: 1,
                label: 'Feedback Data',
                data: [pending, approved, feedbacks.length],
                backgroundColor: ["#4898f0", "#64f4acea", "#fff"],
                borderWidth: 0
            }

        ]
    })

    const chartOptions = {
        responsive: true,
    }

    return (
        <div className="w-[300px] h-[100px] ">
            <Pie width={50} data={data} />
            <div className="w-full h-[100px] "></div>
        </div>
    )
}