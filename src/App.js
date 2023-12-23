/* global FB */
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { useSelector, useDispatch } from 'react-redux';
import { tokenSelector } from '../src/Redux/selector';
import { DefaultLayout } from '~/layouts';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

function PrivateRoute({ element, isAuthenticated, userRole, to }) {
    // Check if the user is authenticated and has the required role
    if (isAuthenticated && userRole === 1) {
        return element;
    } else {
        return <Navigate to={to} />;
    }
}

function App() {
    // const [userRole, setUserRole] = useState();
    const token = Cookies.get('token');

    // useEffect(() => {
    //     if (token !== undefined) {
    //     const deToken = jwt_decode(token);
    //     setUserRole(deToken?.role);
    //     }
    // }, [token]);
    // console.log(userRole);
    const userRole = useSelector(tokenSelector);

    return (
        <Router>
            <div className="App">
                {/* {userRole !== 1 && <FacebookChat />} */}
                <Routes>
                    {privateRoutes.map((router, index) => {
                        const Page = router.component;
                        const Layout = router.layout || Fragment;
                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <PrivateRoute
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                        isAuthenticated={!!token}
                                        userRole={userRole?.role}
                                        to="/login"
                                    />
                                }
                            />
                        );
                    })}

                    {publicRoutes.map((router, index) => {
                        const Page = router.component;
                        const Layout = router.layout || Fragment;

                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
