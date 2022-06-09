import React, { useState, useContext } from 'react'
import DataContext from '../../context/DataContext'
import { Navigate, Route } from "react-router-dom"
// import {Route} from "react-router"

function ProtectedRoute({ component, ...rest }) {

    const { isAuthenticated } = useContext(DataContext)

    return (
        <>
            {
                isAuthenticated ?
                    component
                    :
                    <Navigate to={"/login"} />
            }
        </>
    )
}

export default ProtectedRoute