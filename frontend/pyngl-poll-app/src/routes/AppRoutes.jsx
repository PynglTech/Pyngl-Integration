import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import GmailShare from '../pages/GmailShare';
import BasicAnalytics from '../components/analytics/BasicAnalytics';

// Simple placeholder components for the new pages
const TrendingPage = () => <div className="p-6"><h2>Trending Page</h2></div>;
const AnalyticsPage = () => <div className="p-6"><h2>Analytics Page</h2></div>;


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicAuthPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<HomePage />} />
                        <Route path="/create-poll" element={<CreatePollPage />} />
                        {/* Add the new routes here */}
                         <Route path="/trending" element={<TrendingPolls />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/analytics/:pollId" element={<BasicAnalytics />} />
                        <Route path="/profile" element={<ProfilePage />} />
                         <Route path="/create-image-poll" element={<CreateImageToPoll />} />
                         <Route path="/create-text-poll" element={<CreateTextToPoll />} />
                        <Route path="/preview-image-poll" element={<PreviewImageToPoll />} />
                        <Route path="/preview-text-poll" element={<PreviewTextToPoll />} />
                        <Route path="/poll/:pollId" element={<VoteOnPollPage />} />
                        <Route path="/share-linkedin" element={<LinkedInPublisher />} />
                        <Route path='/profile' element={<ProfilePage/>} />
                        <Route path='/share' element={<GmailShare />} />  
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;