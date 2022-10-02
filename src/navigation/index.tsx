import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/login/login.page'
import SignUp from '../pages/signup/signup.page'
import UsersPage from '../pages/users/users.page'
import { useSelector } from 'react-redux'
import { getIsLogged } from '../store/session/session.selectors'
import NavBarComponent from '../components/navbar/navbar.component'

const MainNavigator = () => {
    const isLogged = useSelector(getIsLogged)
    return (
        <Router>
            {isLogged && <NavBarComponent />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </Router>
    )
}

export default MainNavigator
