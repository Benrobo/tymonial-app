import React from 'react'
import { Layout } from '../../components'
import SideBar from '../../components/Navbar/SideBar'

function FeedBacks() {
    return (
        <Layout>
            <div className="relative  flex flex-row items-start justify-start w-screen h-screen">
                <SideBar active="feedbacks" />
                <div className="w-full h-screen overflow-y-auto p-2">

                    <br />

                </div>
            </div>
        </Layout>
    )
}

export default FeedBacks