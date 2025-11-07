import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/axiosConfig";

// Import the new components
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsSkeleton from "../components/analytics/AnalyticsSkeleton";
import PollTitleCard from "../components/analytics/PollTitleCard";
import StatCard from "../components/analytics/StatCard";
import RealtimeAnalytics from "../components/analytics/RealtimeAnalytics";
import BreakdownCard from "../components/analytics/BreakdownCard";
import UpgradeCTA from "../components/analytics/UpgradeCTA";

// The data processing function remains the same
const enhancePollDataDynamic = (rawData) => {
  const now = new Date();
  const expiresDate = rawData.expiresAt ? new Date(rawData.expiresAt) : now;
  const timeDiffMs = expiresDate.getTime() - now.getTime();

  let timeLeftDisplay = "0s";

  if (timeDiffMs <= 0) {
    timeLeftDisplay = "Expired";
  } else {
    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);

    if (days >= 1) {
      timeLeftDisplay = `${days} day${days > 1 ? "s" : ""} left`;
    } else if (hours >= 1) {
      timeLeftDisplay = `${hours}h ${minutes}m left`;
    } else {
      timeLeftDisplay = `${minutes}m left`;
    }
  }

  return {
    ...rawData,
    views: rawData.views || 0,
    clicks: rawData.totalVotes || 0,
    totalVotes: rawData.totalVotes || 0,
    responseRate:
      rawData.views > 0
        ? ((rawData.totalVotes / rawData.views) * 100).toFixed(2) + "%"
        : "0%",
    avgTime:
      rawData.totalVotes > 0
        ? `${Math.round(rawData.totalTimeSpent / rawData.totalVotes)}s`
        : "0s",
    platformBreakdown: rawData.platformBreakdown || {},
    browserBreakdown: rawData.browserBreakdown || {},
    deviceBreakdown: rawData.deviceBreakdown || {},
    earlyVoters: rawData.earlyVoters || 0,
    lateVoters: rawData.lateVoters || 0,
    completed: rawData.completed || 0,
    daysLeft: timeLeftDisplay, // formatted display
    msLeft: Math.max(0, timeDiffMs), // ✅ raw milliseconds for live indicator
  };
};

const BasicAnalytics = () => {
    const { pollId } = useParams();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
                setPoll(enhancePollDataDynamic(res.data));
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [pollId]);

    if (loading) {
        return <AnalyticsSkeleton />;
    }

    if (!poll) {
        return <div className="text-center py-10 text-gray-500 dark:text-gray-400">No analytics found.</div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-pyngl-dark min-h-screen">
            <AnalyticsHeader />
            <main className="p-4 space-y-4">
                <PollTitleCard question={poll.question} status={poll.daysLeft} msLeft={poll.msLeft} />
                
                <div className="grid grid-cols-2 gap-4">
                    <StatCard label="Views" value={poll.views} />
                    <StatCard label="Clicks" value={poll.clicks} />
                </div>

                <RealtimeAnalytics
                    responseRate={poll.responseRate}
                    completed={poll.completed}
                    avgTime={poll.avgTime}
                />

                <BreakdownCard title="Platform Breakdown" data={poll.platformBreakdown} total={poll.totalVotes} type="platform" />
                <BreakdownCard title="Early vs Late Voters" data={{ 'First half': poll.earlyVoters, 'Second half': poll.lateVoters }} total={poll.earlyVoters + poll.lateVoters} type="timing" />
                <BreakdownCard title="Device Breakdown" data={poll.deviceBreakdown} total={poll.totalVotes} type="tags" />
                <BreakdownCard title="Browser Breakdown" data={poll.browserBreakdown} total={poll.totalVotes} type="tags" />

                <UpgradeCTA />
            </main>
        </div>
    );
};

export default BasicAnalytics;