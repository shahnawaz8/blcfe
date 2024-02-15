import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../components/navbar';
function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route
            path="/"
            element={
                <>
                 <Navbar />
                </>
               }
            >

            </Route>
        </Routes>
    </div>
  )
}

export default AllRoutes