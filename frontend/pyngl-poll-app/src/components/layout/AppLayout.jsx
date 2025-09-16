// import React from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import { LogOut, Bell } from 'lucide-react';

// // --- The Main AppLayout Component ---
// const AppLayout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { userInfo, logout } = useAuthStore();

//     // Define which pages should show a header from this layout
//     const isHomePage = location.pathname === '/dashboard';
//     const isCreatePage = location.pathname === '/create-text-poll' || location.pathname === '/create-image-poll';
//     const isPreviewPage = location.pathname.startsWith('/preview');

//     // This condition determines if ANY AppLayout header should be shown
//     const showAppLayoutHeader = isHomePage || isCreatePage || isPreviewPage;

//     const getHeaderTitle = () => {
//         if (location.pathname === '/create-text-poll') return 'Text to poll';
//         if (location.pathname === '/create-image-poll') return 'Image to poll';
//         if (isPreviewPage) return 'Preview';
//         return '';
//     };

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                
//                 {/* --- THIS IS THE FIX --- */}
//                 {/* The entire header is now conditional. It will NOT render on /trending, /analytics, etc. */}
//                 {showAppLayoutHeader && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         {/* Homepage Header */}
//                         {isHomePage && (
//                             <>
//                                 <h1 className="text-lg font-bold">
//                                     <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                                 </h1>
//                                 <div className="flex items-center">
//                                     <button title="Notifications" className="text-gray-600 p-1">
//                                         <Bell className="w-6 h-6 text-gray-700" />
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                         {/* Other Pages Header (Create/Preview) */}
//                         {(isCreatePage || isPreviewPage) && (
//                              <>
//                                  <button onClick={() => navigate(-1)} className="text-gray-600 text-lg p-2">←</button>
//                                  <h1 className="flex-1 text-center font-semibold">{getHeaderTitle()}</h1>
//                                  <div className="w-10"></div> {/* Placeholder for alignment */}
//                              </>
//                         )}
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from "./BottomNav";
import useAuthStore from '../../store/useAuthStore';
import { Bell } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo, logout } = useAuthStore();

    const isHomePage = location.pathname === '/dashboard';
    const isCreatePage = location.pathname === '/create-text-poll' || location.pathname === '/create-image-poll';
    const isPreviewPage = location.pathname.startsWith('/preview');
    const showAppLayoutHeader = isHomePage || isCreatePage || isPreviewPage;

    const getHeaderTitle = () => {
        if (location.pathname === '/create-text-poll') return 'Text to poll';
        if (location.pathname === '/create-image-poll') return 'Image to poll';
        if (isPreviewPage) return 'Preview';
        return '';
    };

    return (
        <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
            <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#333',
                            color: '#fff',
                            borderRadius: '9999px',
                            fontSize: '15px'
                        },
                        error: {
                            style: {
                                background: '#FFF1F2',
                                color: '#DC2626',
                                border: `1px solid #FCA5A5`,
                            },
                        },
                    }}
                />
                
                {showAppLayoutHeader && (
                    <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
                        {isHomePage && (
                            <>
                                <h1 className="text-lg font-bold">
                                    <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
                                </h1>
                                <div className="flex items-center">
                                    <button title="Notifications" className="text-gray-600 p-1">
                                        <Bell className="w-6 h-6 text-gray-700" />
                                    </button>
                                </div>
                            </>
                        )}
                        {(isCreatePage || isPreviewPage) && (
                             <>
                                 <button onClick={() => navigate(-1)} className="text-gray-600 text-lg p-2">←</button>
                                 <h1 className="flex-1 text-center font-semibold">{getHeaderTitle()}</h1>
                                 <div className="w-10"></div>
                             </>
                        )}
                    </header>
                )}

                <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
                    <Outlet />
                </main>
                
                <BottomNav />
            </div>
        </div>
    );
};

export default AppLayout;