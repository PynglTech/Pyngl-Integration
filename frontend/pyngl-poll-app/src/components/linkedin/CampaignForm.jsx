import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/axiosConfig';

// Helper component for each step in the wizard
const WizardStep = ({ isActive, children }) => (
    <div className={isActive ? 'block animate-fade-in' : 'hidden'}>{children}</div>
);

export default function CampaignForm({ poll }) {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // State to manage all form inputs, pre-filled with poll data
    const [formData, setFormData] = useState({
        pollCommentary: `Powered by Pyngl (pyngl.com)`,
        pollQuestion: poll.question,
        pollOptions: poll.options.map(opt => opt.text),
        bannerCaption: `🗳️ ${poll.question}\n\nVote here & see results → [PYNGL_LINK]`,
        pinnedComment: `Full results and voting available on Pyngl: [PYNGL_LINK]`,
        bannerImage: null,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, bannerImage: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.bannerImage) {
            toast.error("A banner image is required.");
            return;
        }
        setIsPublishing(true);
        const toastId = toast.loading('Publishing campaign to LinkedIn...');

        const data = new FormData();
        data.append('pynglPollId', poll._id);
        data.append('pollQuestion', formData.pollQuestion);
        data.append('pollOptions', JSON.stringify(formData.pollOptions));
        data.append('pollCommentary', formData.pollCommentary);
        data.append('bannerCaption', formData.bannerCaption);
        data.append('pinnedComment', formData.pinnedComment);
        data.append('bannerImage', formData.bannerImage);

        try {
            await apiClient.post('/api/linkedin/publish', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Success! Your campaign has been published.', { id: toastId });
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to publish campaign.', { id: toastId });
        } finally {
            setIsPublishing(false);
        }
    };
    
    const progressPercentage = currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%';

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-gray-200">
            <header className="sticky top-4 z-10 p-4 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Create a New Campaign</h2>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500" style={{ width: progressPercentage }}></div>
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2">
                    <span>Poll Details</span>
                    <span>Banner Post</span>
                    <span>Review & Publish</span>
                </div>
            </header>

            <form onSubmit={handleSubmit}>
                <WizardStep isActive={currentStep === 1}>
                    {/* Your Step 1 JSX here */}
                    <div className="mt-8 text-right">
                        <button type="button" onClick={() => setCurrentStep(2)} className="btn-gradient">Next: Banner Post</button>
                    </div>
                </WizardStep>

                <WizardStep isActive={currentStep === 2}>
                    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg space-y-5">
                         <h3 className="font-bold text-lg text-white">2. Banner Image Post</h3>
                         <div>
                            <label htmlFor="banner-caption" className="block text-sm font-medium text-gray-300 mb-1">Image Caption</label>
                            <textarea id="bannerCaption" value={formData.bannerCaption} onChange={handleInputChange} rows="3" className="form-input"></textarea>
                         </div>
                         <div>
                            <label htmlFor="pinned-comment" className="block text-sm font-medium text-gray-300 mb-1">Cross-Link Comment</label>
                            <textarea id="pinnedComment" value={formData.pinnedComment} onChange={handleInputChange} rows="3" className="form-input"></textarea>
                         </div>
                         <div>
                             <label htmlFor="banner-image" className="block text-sm font-medium text-gray-300 mb-1">Upload Banner (1080x1080)</label>
                             <input type="file" id="banner-image" onChange={handleImageChange} accept="image/png, image/jpeg" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900/50 file:text-blue-300 hover:file:bg-blue-900"/>
                             {imagePreview && <img src={imagePreview} alt="Banner Preview" className="mt-4 rounded-lg w-full aspect-video object-cover"/>}
                         </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={() => setCurrentStep(1)} className="btn-secondary">Back</button>
                        <button type="button" onClick={() => setCurrentStep(3)} className="btn-gradient">Next: Review</button>
                    </div>
                </WizardStep>
                
                <WizardStep isActive={currentStep === 3}>
                    {/* Your Step 3 JSX here */}
                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={() => setCurrentStep(2)} className="btn-secondary">Back</button>
                        <button type="submit" disabled={isPublishing} className="btn-gradient">
                            {isPublishing ? 'Publishing...' : 'Publish Campaign'}
                        </button>
                    </div>
                </WizardStep>
            </form>
        </div>
    );
}