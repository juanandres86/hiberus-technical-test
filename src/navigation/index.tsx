import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom'
import LoginPage from '../pages/login/login.page'
import SignUpPage from '../pages/signup/signup.page'
import UsersPage from '../pages/users/users.page'
import { useSelector } from 'react-redux'
import { getIsLogged } from '../store/session/session.selectors'
import NavBarComponent from '../components/navbar/navbar.component'
import UpdateUserPage from '../pages/updateUser/updateUser.page'
import CreateUserPage from '../pages/createUser/createUser.page'

const ProtectedRoute = ({
    isLogged,
    children,
}: {
    isLogged: boolean
    children: JSX.Element
}) => {
    if (!isLogged) {
        return <Navigate to="/" />
    }
    return children
}

const MainNavigator = () => {
    const isLogged = useSelector(getIsLogged)
    return (
        <Router>
            {isLogged && <NavBarComponent />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute isLogged={isLogged}>
                            <UsersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update"
                    element={
                        <ProtectedRoute isLogged={isLogged}>
                            <UpdateUserPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={'/create'}
                    element={
                        <ProtectedRoute isLogged={isLogged}>
                            <CreateUserPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
        </Router>
    )
}

export default MainNavigator
