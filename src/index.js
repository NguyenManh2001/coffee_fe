/* global FB */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from '~/Redux/store';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/Components/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
        {/* <FacebookChat /> */}
        <GlobalStyles>
            <Provider store={store}>
                <App />
            </Provider>
        </GlobalStyles>
    </QueryClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
