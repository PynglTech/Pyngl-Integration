import React, { useState } from 'react';
import { ArrowLeft, Bell, Eye, EyeOff, ChevronRight, Home, TrendingUp, BarChart3, User } from 'lucide-react';

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState('Week');
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    name: 'Manoj shah',
    email: 'manoj.shah@domain.com',
    phone: '+91 234 5643 234',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const themeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const inputClass = darkMode 
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500';

  return (
    <div className={`mx-auto min-h-screen max-w-md sm:max-w-lg lg:max-w-2xl ${themeClass}`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} ${themeClass}`}>
        <div className="flex items-center justify-between p-4">
          <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          <h1 className="text-lg font-semibold">Profile</h1>
          <Bell className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        </div>
      </div>

      {/* Overview Section */}
      <div className="p-4">
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Overview
        </h2>

          <div className={`border mb-4 ${cardClass} border-gray-100 rounded-xl p-4 relative`}>
            <div className="absolute top-[-30%] left-[38%] mx-auto w-20 h-20 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MS</span>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-8 mb-2 mt-2">
            <div className="text-center">
              <div className="text-2xl font-bold">120</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Pings Created
              </div>
            </div>
            
            <div className="text-center mt-1">
              <div className="text-sm font-medium">Manoj Shah</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">540</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Participate
              </div>
            </div>
          </div>

        {/* Time Filter Buttons */}
        <div className="flex justify-center space-x-2">
          {['Week', 'Month', 'All-time'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveTimeFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTimeFilter === filter
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 border border-gray-600'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className={`flex items-center justify-between p-4 rounded-xl mb-4 ${cardClass} border`}>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
              💡
            </div>
            <div>
              <div className="font-medium">Dark View</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Turn of the light
              </div>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Upgrade to Pro */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Upgrade to pro</h3>
          <p className="text-sm opacity-90 mb-4">Unlock analytics & unlimited polls</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium">
            ₹125 / Month
          </button>
        </div>

        {/* Edit Information */}
        <div className={`mb-6 p-4 rounded-xl border ${cardClass}`}>
          <h3 className="text-lg font-semibold mb-4">Edit Information</h3>
          
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-pink-500 mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-full border ${inputClass} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-pink-500 mb-2">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-full border ${inputClass} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-pink-500 mb-2">Phone</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📞</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-full border ${inputClass} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium mb-6">
            Save Information
          </button>
        </div>

        {/* Account Security */}
        <div className={`mb-6 p-4 rounded-xl border ${cardClass}`}>
          <h3 className="text-lg font-semibold mb-4">Account Security</h3>
          
          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-pink-500 mb-2">Old password</label>
            <div className="relative">
              <input
                type={showPasswords.old ? 'text' : 'password'}
                value={formData.oldPassword}
                onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-3 rounded-full border ${inputClass} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              <button
                onClick={() => togglePasswordVisibility('old')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPasswords.old ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-pink-500 mb-2">New password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-3 rounded-full border ${inputClass} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              <button
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-pink-500 mb-2">Confirm password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-3 rounded-full border ${inputClass} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              <button
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium mb-6">
            Save Information
          </button>
        </div>

        {/* Support Section */}
        <div className="mb-20">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          
          <div className={`rounded-xl border ${cardClass} overflow-hidden`}>
            <button className={`w-full flex items-center justify-between p-4 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
              <span className="font-medium">Help Center</span>
              <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </button>
            
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <button className={`w-full flex items-center justify-between p-4 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                <span className="font-medium">Terms of services</span>
                <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md sm:max-w-lg lg:max-w-2xl ${themeClass} border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center space-y-1">
            <Home className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Trending</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <BarChart3 className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Analytics</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-6 h-6 text-pink-500" />
            <span className="text-xs text-pink-500">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}