import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { useSelector } from 'react-redux';
// import { loginSelector } from './Redux/selector';
import Cookies from 'js-cookie';

function PrivateRoute({ element, isAuthenticated, to }) {
    return isAuthenticated ? element : <Navigate to={to} />;
}

function App() {
    // const isAuthenticated = useSelector(loginSelector);
    const token = Cookies.get('token');

    return (
        <Router>
            <div className="App">
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
