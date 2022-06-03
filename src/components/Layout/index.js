
import React, { useEffect, useState } from "react"
import { NavBar, Header, DomHead } from ".."

function Layout({ children }) {

  return (
    <div className={`w-screen h-screen overflow-hidden`}>
      <DomHead />
      <NavBar />
      {children}
    </div>
  )
}

export default Layout

