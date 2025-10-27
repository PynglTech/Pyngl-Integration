import React from 'react';
const SkeletonPiece = ({ className }) => <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} />;

const AnalyticsSkeleton = () => (
    <div className="bg-gray-50 dark:bg-pyngl-dark min-h-screen">
        {/* Skeleton Header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700"></div>
        <div className="p-4 space-y-4">
            {/* Title Card Skeleton */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <SkeletonPiece className="h-7 w-3/4 mb-3" />
                <SkeletonPiece className="h-4 w-1/4" />
            </div>
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-2 gap-4">
                <SkeletonPiece className="h-24 rounded-lg" />
                <SkeletonPiece className="h-24 rounded-lg" />
            </div>
            {/* Breakdown Card Skeleton */}
            <SkeletonPiece className="h-48 rounded-lg" />
            <SkeletonPiece className="h-32 rounded-lg" />
        </div>
    </div>
);
export default AnalyticsSkeleton;