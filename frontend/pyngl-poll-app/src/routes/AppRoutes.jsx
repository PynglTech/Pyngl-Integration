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
import useAuthStore from '../store/useAuthStore';
// Component Imports from both files
import PublicAuthPage from '../pages/PublicAuthPage';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
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
import LinkedinShowPage from '../pages/LinkedinShowPage';
import { 
    LockedTrendingPage, 
    LockedAnalyticsPage, 
    LockedPollsActivityPage 
} from '../pages/LockedContentPage';
import PollActivityPage from '../pages/PollActivityPage';
// NEW: Components from your partner's file
import BasicAnalytics from '../components/analytics/BasicAnalytics';
import GmailShare from '../pages/GmailShare'; // Replaces your old 'Share' component
import PlusAnalytics from '../components/analytics/PlusAnalytics';
import ProAnalytics from '../components/analytics/ProAnalytics';
import CompareLastPolls from '../components/analytics/comparePolls';
import CreateSegment from '../components/analytics/CreateSegment';
import EnterpriseAnalytics from '../components/analytics/EnterpriseAnalytics';
import RegisterPage from "../pages/RegisterPage";
const AppRoutes = () => {
      const { userInfo } = useAuthStore();
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<PublicAuthPage />} />
                <Route path="/login" element={<PublicAuthPage />} />
                <Route path="/signup" element={<RegisterPage />} />
<Route path="/signup/otp" element={<RegisterPage />} />
<Route path="/signup/username" element={<RegisterPage />} />
<Route path="/signup/dob" element={<RegisterPage />} />
<Route path="/signup/set-password" element={<RegisterPage />} />
<Route path="/signup/success" element={<RegisterPage />} />
                <Route path="/signup" element={<PublicAuthPage />} />
                <Route path='/forgot-password' element={<PublicAuthPage/>} />
                 {!userInfo && (
                    <>
                        <Route path="/trending" element={<LockedTrendingPage />} />
                        <Route path="/analytics" element={<LockedAnalyticsPage />} />
                        <Route path="/polls" element={<LockedPollsActivityPage />} />
                        <Route path='/terms-of-service' element={<Terms />} />
                        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    </>
                )}

                {/* --- Public Routes (No Login Required) --- */}
                <Route path="/" element={<PublicAuthPage />} />
                {/* Kept public so anyone can vote on a shared poll link */}
                <Route path="/poll/:pollId" element={<VoteOnPollPage />} />
        <Route path='/share' element={<GmailShare />} /> 
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
                        <Route path="/enterprise-analytics/:pollId" element={<EnterpriseAnalytics />} />
                        <Route path="/compare" element={<CompareLastPolls />} /> 
                        <Route path="/create-segment/:pollId" element={<CreateSegment />} /> 
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/share-linkedin" element={<LinkedinShowPage />} />
                
                        <Route path='/help-center' element={<HelpCenter />} />
                        
                        <Route path='/polls' element={<PollActivityPage/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;