// import React from "react";
// import { CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const SuccessMessage = () => {
//   const navigate = useNavigate();

//   const handleStartOver = () => {
//     navigate("/register", { replace: true });
//   };

//   return (
//     <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl items-center justify-center text-center p-8">
//       <CheckCircle className="h-16 w-16 text-green-500 mb-6" />

//       <h2 className="text-3xl font-bold text-gray-900 mb-3">
//         Account Complete!
//       </h2>

//       <p className="text-lg text-gray-600 mb-8">
//         Your account has been created successfully.
//       </p>

//       <button
//         onClick={handleStartOver}
//         className="w-full py-3.5 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg transition-all hover:bg-pyngl-pink-dark"
//       >
//         Start
//       </button>
//     </div>
//   );
// };

// export default SuccessMessage;


import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white items-center justify-center text-center p-8">

      <CheckCircle className="h-16 w-16 text-green-500 mb-6" />

      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Account Complete!
      </h2>

      <p className="text-lg text-gray-600 mb-8">
        Your account has been created successfully 🎉
      </p>

      <button
        onClick={goToDashboard}
        className="w-full py-3.5 bg-pyngl-pink text-white rounded-full shadow-lg hover:bg-pyngl-pink-dark font-semibold"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessMessage;
