// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Lock, BarChart3, TrendingUp, ListChecks } from 'lucide-react';

// // This component is highly reusable. We just pass in the details for the specific page.
// const LockedContentPage = ({ icon, title, description, features }) => {
//     const IconComponent = icon;

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center p-6 overflow-hidden">
//             {/* Background decorative shapes */}
//             <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-200 rounded-full opacity-30 blur-2xl animate-pulse"></div>
//             <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full opacity-30 blur-2xl animate-pulse animation-delay-400"></div>

//             <div className="relative z-10 max-w-2xl mx-auto">
//                 {/* Main Icon with Gradient Glow */}
//                 <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
//                     <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-50"></div>
//                     <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-lg">
//                         <IconComponent className="text-purple-600" size={48} strokeWidth={1.5} />
//                     </div>
//                 </div>

//                 {/* Animated Text Content */}
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in-down">
//                     {title}
//                 </h1>
//                 <p className="text-lg text-gray-500 mb-8 animate-fade-in-up animation-delay-200">
//                     {description}
//                 </p>

//                 {/* Animated Feature List */}
//                 <div className="space-y-3 text-left max-w-md mx-auto mb-10">
//                     {features.map((feature, index) => (
//                         <div
//                             key={index}
//                             className="flex items-center bg-white/70 p-3 rounded-lg shadow-sm animate-fade-in-up"
//                             style={{ animationDelay: `${(index * 100) + 400}ms` }}
//                         >
//                             <Lock size={18} className="text-pink-500 mr-3 flex-shrink-0" />
//                             <span className="text-gray-700">{feature}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Call to Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-700">
//                     <Link
//                         to="/signup"
//                         className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg"
//                     >
//                         Sign Up to Unlock
//                     </Link>
//                     <Link
//                         to="/login"
//                         className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg border border-gray-200"
//                     >
//                         Already have an account?
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // We define different versions of the page here for easy import
// export const LockedTrendingPage = () => (
//     <LockedContentPage
//         icon={TrendingUp}
//         title="Discover What's Hot"
//         description="Sign up to get exclusive access to real-time trending polls and see what the world is talking about."
//         features={["Track the most voted polls", "Filter trends by category", "Get daily insights"]}
//     />
// );

// export const LockedAnalyticsPage = () => (
//     <LockedContentPage
//         icon={BarChart3}
//         title="Unlock Powerful Insights"
//         description="Join Pyngl to access detailed analytics for your polls. Understand your audience like never before."
//         features={["Analyze voter demographics", "Track engagement over time", "Export your data to CSV"]}
//     />
// );

// export const LockedPollsActivityPage = () => (
//     <LockedContentPage
//         icon={ListChecks}
//         title="Manage Your Polls"
//         description="Create an account to see all your poll activity, manage your creations, and view their performance in one place."
//         features={["View your active and expired polls", "See vote counts at a glance", "Share or embed your polls easily"]}
//     />
// );
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, BarChart3, TrendingUp, ListChecks, ArrowRight } from 'lucide-react';

// This is the enhanced, reusable component with advanced animations.
const LockedContentPage = ({ icon, title, description, features }) => {
    const IconComponent = icon;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center p-6 overflow-hidden relative">
            
            {/* ENHANCED: Dynamic, rotating gradient background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
            </div>

            <div 
                className="relative z-10 max-w-2xl mx-auto p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 transition-all duration-300"
                style={{ perspective: '1000px' }}
            >
                {/* Main Icon with new animations */}
                <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center animate-spring-in">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="relative bg-white rounded-full p-6 shadow-lg">
                        <IconComponent className="text-purple-600" size={48} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Animated Text Content */}
                <h1 
                    className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 animate-spring-in"
                    style={{ animationDelay: '100ms' }}
                >
                    {title}
                </h1>
                <p 
                    className="text-lg text-gray-500 mb-8 animate-spring-in"
                    style={{ animationDelay: '200ms' }}
                >
                    {description}
                </p>

                {/* ENHANCED: Animated Feature List with staggered spring-in effect */}
                <div className="space-y-3 text-left max-w-md mx-auto mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-white/80 p-4 rounded-xl shadow-sm animate-spring-in transition-transform duration-300 hover:scale-105"
                            style={{ animationDelay: `${(index * 100) + 400}ms` }}
                        >
                            <Lock size={18} className="text-pink-500 mr-4 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* ENHANCED: Call to Action Buttons with new hover effects */}
                <div 
                    className="flex flex-col sm:flex-row gap-4 justify-center animate-spring-in"
                    style={{ animationDelay: '800ms' }}
                >
                    <Link
                        to="/signup"
                        className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Sign Up to Unlock
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-gray-800 font-bold py-4 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200"
                    >
                        Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
};


// We define different versions of the page here for easy import
export const LockedTrendingPage = () => (
    <LockedContentPage
        icon={TrendingUp}
        title="Discover What's Hot"
        description="Sign up to get exclusive access to real-time trending polls and see what the world is talking about."
        features={["Track the most voted polls", "Filter trends by category", "Get daily insights"]}
    />
);

export const LockedAnalyticsPage = () => (
    <LockedContentPage
        icon={BarChart3}
        title="Unlock Powerful Insights"
        description="Join Pyngl to access detailed analytics for your polls. Understand your audience like never before."
        features={["Analyze voter demographics", "Track engagement over time", "Export your data to CSV"]}
    />
);

export const LockedPollsActivityPage = () => (
    <LockedContentPage
        icon={ListChecks}
        title="Manage Your Polls"
        description="Create an account to see all your poll activity, manage your creations, and view their performance in one place."
        features={["View your active and expired polls", "See vote counts at a glance", "Share or embed your polls easily"]}
    />
);

