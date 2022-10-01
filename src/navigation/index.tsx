import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/login/login.page'
import SignUp from '../pages/signup/signup.page'

const MainNavigator = () => {
    return (
        <Router>
            <div>
                {/* <Navbar/> */}
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
    )
}

export default MainNavigator
