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
const FacebookChat = () => {
    useEffect(() => {
        // Create a chatbox element
        const chatbox = document.createElement('div');
        chatbox.id = 'fb-customer-chat';
        chatbox.className = 'fb-customerchat';

        // Set page_id and attribution
        chatbox.setAttribute('page_id', '148092848380107');
        chatbox.setAttribute('attribution', 'biz_inbox');

        // Append the chatbox element to the document body
        document.body.appendChild(chatbox);

        // Load and initialize the Facebook SDK script
        const loadFacebookSDK = () => {
            window.fbAsyncInit = function () {
                FB.init({
                    xfbml: true,
                    version: 'v18.0',
                });
            };

            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        };

        // Check if the Facebook SDK is already loaded
        if (window.FB) {
            loadFacebookSDK(); // Initialize immediately if it's already loaded
        } else {
            // Add a listener for when the SDK is loaded
            window.addEventListener('load', loadFacebookSDK);
        }
    }, []);

    return null; // Return null since this component doesn't render anything
};

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
                                                <FacebookChat />
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
                        // const FacebookChat = () => {
                        //     useEffect(() => {
                        //         // Create a chatbox element
                        //         const chatbox = document.createElement('div');
                        //         chatbox.id = 'fb-customer-chat';
                        //         chatbox.className = 'fb-customerchat';

                        //         // Set page_id and attribution
                        //         chatbox.setAttribute('page_id', '148092848380107');
                        //         chatbox.setAttribute('attribution', 'biz_inbox');

                        //         // Append the chatbox element to the document body
                        //         document.body.appendChild(chatbox);

                        //         // Load and initialize the Facebook SDK script
                        //         const loadFacebookSDK = () => {
                        //             window.fbAsyncInit = function () {
                        //                 FB.init({
                        //                     xfbml: true,
                        //                     version: 'v18.0',
                        //                 });
                        //             };

                        //             (function (d, s, id) {
                        //                 var js,
                        //                     fjs = d.getElementsByTagName(s)[0];
                        //                 if (d.getElementById(id)) return;
                        //                 js = d.createElement(s);
                        //                 js.id = id;
                        //                 js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                        //                 fjs.parentNode.insertBefore(js, fjs);
                        //             })(document, 'script', 'facebook-jssdk');
                        //         };

                        //         // Check if the Facebook SDK is already loaded
                        //         if (window.FB) {
                        //             loadFacebookSDK(); // Initialize immediately if it's already loaded
                        //         } else {
                        //             // Add a listener for when the SDK is loaded
                        //             window.addEventListener('load', loadFacebookSDK);
                        //         }
                        //     }, []);

                        //     return null; // Return null since this component doesn't render anything
                        // };
                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        {/* <FacebookChat /> */}
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
