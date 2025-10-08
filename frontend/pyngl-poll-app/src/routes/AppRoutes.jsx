// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PublicAuthPage from '../pages/PublicAuthPage';
// import ProtectedRoute from './ProtectedRoute';
// import AppLayout from '../components/layout/AppLayout';
// import HomePage from '../components/HomePage';
// import CreatePollPage from '../pages/CreatePollPage';
// import CreateImageToPoll from "../pages/CreateImageToPoll";
// import CreateTextToPoll from "../pages/CreateTextToPoll";
// import PreviewImageToPoll from "../pages/PreviewImageToPoll";
// import PreviewTextToPoll from "../pages/PreviewTextToPoll";
// import VoteOnPollPage from '../pages/VoteOnPollPage';
// import TrendingPolls from '../pages/TrendingPolls';
// import ProfilePage from '../pages/ProfilePage';
// import Analytics from '../pages/Analytics';
// import Share from '../pages/SharePage'
// import LinkedInPublisher from '../pages/LinkedInPublisher';
// import HelpCenter from '../pages/HelpCenter';
// import Terms from '../pages/TermsPage';
// import PrivacyPolicy from '../pages/PrivacyPolicyPage';
// import NotificationsPage from '../pages/NotificationPage';
// // Simple placeholder components for the new pages
// const TrendingPage = () => <div className="p-6"><h2>Trending Page</h2></div>;
// const AnalyticsPage = () => <div className="p-6"><h2>Analytics Page</h2></div>;


// const AppRoutes = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<PublicAuthPage />} />
//                 <Route path="/poll/:pollId" element={<VoteOnPollPage />} />
//                 <Route element={<ProtectedRoute />}>
//                     <Route element={<AppLayout />}>
//                         <Route path="/dashboard" element={<HomePage />} />
//                         <Route path="/create-poll" element={<CreatePollPage />} />
//                         {/* Add the new routes here */}
//                          <Route path="/trending" element={<TrendingPolls />} />
//                         <Route path="/analytics" element={<Analytics />} />
//                         <Route path="/profile" element={<ProfilePage />} />
//                          <Route path="/create-image-poll" element={<CreateImageToPoll />} />
//                          <Route path="/create-text-poll" element={<CreateTextToPoll />} />
//                         <Route path="/preview-image-poll" element={<PreviewImageToPoll />} />
//                         <Route path="/preview-text-poll" element={<PreviewTextToPoll />} />
//                         <Route path='/help-center' element={<HelpCenter/>}/>
//                         <Route path="/share-linkedin" element={<LinkedInPublisher />} />
//                         <Route path='/profile' element={<ProfilePage/>} />
//                         <Route path='/share' element={<Share/>} />
//                         <Route path='/terms-of-service' element={<Terms/>}/>
//                         <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
//                         <Route path='/notifications' element={<NotificationsPage/>}/>
//                     </Route>
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// };

// export default AppRoutes;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Component Imports from both files
import PublicAuthPage from '../pages/PublicAuthPage';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../components/HomePage';
import CreatePollPage from '../pages/CreatePollPage';
import CreateImageToPoll from "../pages/CreateImageToPoll";
import CreateTextToPoll from "../pages/CreateTextToPoll";
import PreviewImageToPoll from "../pages/PreviewImageToPoll";
import PreviewTextToPoll from "../pages/PreviewTextToPoll";
import VoteOnPollPage from '../pages/VoteOnPollPage';
import TrendingPolls from '../pages/TrendingPolls';
import ProfilePage from '../pages/ProfilePage';
import Analytics from '../pages/Analytics';
import LinkedInPublisher from '../pages/LinkedInPublisher';
import HelpCenter from '../pages/HelpCenter';
import Terms from '../pages/TermsPage';
import PrivacyPolicy from '../pages/PrivacyPolicyPage';
import NotificationsPage from '../pages/NotificationPage';

// NEW: Components from your partner's file
import BasicAnalytics from '../components/analytics/BasicAnalytics';
import GmailShare from '../pages/GmailShare'; // Replaces your old 'Share' component
import PlusAnalytics from '../components/analytics/PlusAnalytics';
import ProAnalytics from '../components/analytics/ProAnalytics';
import CompareLastPolls from '../components/analytics/comparePolls';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* --- Public Routes (No Login Required) --- */}
                <Route path="/" element={<PublicAuthPage />} />
                {/* Kept public so anyone can vote on a shared poll link */}
                <Route path="/poll/:pollId" element={<VoteOnPollPage />} />

                {/* --- Protected Routes (Login Required) --- */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<HomePage />} />
                        <Route path="/create-poll" element={<CreatePollPage />} />
                        <Route path="/create-image-poll" element={<CreateImageToPoll />} />
                        <Route path="/create-text-poll" element={<CreateTextToPoll />} />
                        <Route path="/preview-image-poll" element={<PreviewImageToPoll />} />
                        <Route path="/preview-text-poll" element={<PreviewTextToPoll />} />
                        <Route path="/trending" element={<TrendingPolls />} />
                        <Route path="/analytics" element={<Analytics />} />
                        {/* NEW: Route for specific poll analytics */}
                        <Route path="/analytics/:pollId" element={<BasicAnalytics />} /> 
                        <Route path="/plus-analytics/:pollId" element={<PlusAnalytics />} /> 
                        <Route path="/pro-analytics/:pollId" element={<ProAnalytics />} /> 
                        <Route path="/compare" element={<CompareLastPolls />} /> 

                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/share-linkedin" element={<LinkedInPublisher />} />
                        {/* UPDATED: '/share' now uses the GmailShare component */}
                        <Route path='/share' element={<GmailShare />} /> 
                        <Route path='/help-center' element={<HelpCenter />} />
                        <Route path='/terms-of-service' element={<Terms />} />
                        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;