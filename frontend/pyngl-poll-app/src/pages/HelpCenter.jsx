import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Plus, Minus, Headset, MessageSquare, Globe } from 'lucide-react';

// Reusable component for each FAQ item
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-2xl">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left"
            >
                <span className="font-semibold text-gray-800">{question}</span>
                {isOpen ? <Minus size={20} className="text-pink-500" /> : <Plus size={20} className="text-gray-500" />}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

// Reusable component for each Contact Us link
const ContactItem = ({ icon, title, link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
            {icon}
            <span className="font-semibold text-gray-800">{title}</span>
        </a>
    );
};

export default function HelpCenter() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('FAQs');

    const faqs = [
        { q: 'What is Pyngl?', a: 'Pyngl is a polling app where you can create, share, and collect real-time feedback easily from your audience.' },
        { q: 'Is Pyngl free to use?', a: 'Yes, Pyngl offers a generous free tier. We also have a Pro plan with advanced features like unlimited polls and detailed analytics.' },
        { q: 'How many options can I add in a poll?', a: 'You can add up to 6 options in a single poll.' },
        { q: 'How do I share a poll?', a: 'After creating a poll, you can click the "Share" button to get a shareable link and a QR code. You can also share directly to various social media platforms.' },
    ];
    
    const contactLinks = [
        { icon: <Headset className="text-blue-500"/>, title: 'Customer Services', link: 'mailto:support@pyngl.com' },
        { icon: <MessageSquare className="text-green-500"/>, title: 'WhatsApp', link: 'https://wa.me/your-whatsapp-number' },
        { icon: <Globe className="text-gray-500"/>, title: 'Website', link: 'https://pyngl.com' },
    ];

    return (
        <div className="mx-auto min-h-screen max-w-md bg-white">
            {/* Header */}
            <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
                    <h1 className="text-lg font-semibold">Help Center</h1>
                    <button><Bell className="w-6 h-6 text-gray-700" /></button>
                </div>
            </div>

            <div className="p-4">
                {/* Tabs */}
                <div className="flex border border-gray-200 rounded-full p-1 mb-6">
                    <button 
                        onClick={() => setActiveTab('FAQs')}
                        className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${activeTab === 'FAQs' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                    >
                        FAQ's
                    </button>
                    <button 
                        onClick={() => setActiveTab('Contact')}
                        className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${activeTab === 'Contact' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                    >
                        Contact us
                    </button>
                </div>

                {/* Content based on active tab */}
                <div className="space-y-4">
                    {activeTab === 'FAQs' ? (
                        faqs.map((faq, index) => <FaqItem key={index} question={faq.q} answer={faq.a} />)
                    ) : (
                        contactLinks.map((item, index) => <ContactItem key={index} icon={item.icon} title={item.title} link={item.link} />)
                    )}
                </div>
            </div>
        </div>
    );
}
