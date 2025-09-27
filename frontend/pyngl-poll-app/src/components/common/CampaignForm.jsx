import React from 'react';
import { useState, useRef } from 'react';
import apiClient from '../../api/axiosConfig';

// Helper component for each step in the wizard
const WizardStep = ({ isActive, children }) => (
    <div className={isActive ? 'block animate-fade-in' : 'hidden'}>
        {children}
    </div>
);

export default function CampaignForm({ poll }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        pollCommentary: `Powered by Pyngl (pyngl.com)`,
        pollQuestion: poll.question,
        pollOptions: poll.options.map(opt => opt.text),
        bannerCaption: `🗳️ ${poll.question}\n\nVote here & see results → [PYNGL_LINK]`,
        pinnedComment: `Full results and voting available on Pyngl: [PYNGL_LINK]`,
        bannerImage: null,
    });
    const [previews, setPreviews] = useState({ image: null });
    const [isPublishing, setIsPublishing] = useState(false);
    const fileInputRef = useRef(null);
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, bannerImage: file }));
            setPreviews(prev => ({ ...prev, image: URL.createObjectURL(file) }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        try {
            const data = new FormData();
            data.append('pynglPollId', poll._id); // Pass the original poll ID
            data.append('pollCommentary', formData.pollCommentary);
            data.append('pollQuestion', formData.pollQuestion);
            data.append('pollOptions', JSON.stringify(formData.pollOptions));
            data.append('bannerCaption', formData.bannerCaption);
            data.append('pinnedComment', formData.pinnedComment);
            data.append('bannerImage', formData.bannerImage);

            const response = await apiClient.post('/api/linkedin/publish', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Success! Your campaign has been published to LinkedIn.');
            // Optionally navigate away or show a success message
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to publish campaign.');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="text-left p-4">
            {/* Header with Progress Bar */}
            <div className="sticky top-4 z-10 p-4 bg-gray-800 rounded-xl shadow-lg mb-8">
                {/* ... Progress bar and step indicators ... */}
            </div>

            <form onSubmit={handleSubmit}>
                {/* --- Step 1: Poll Details --- */}
                <WizardStep isActive={currentStep === 1}>
                    {/* ... Inputs for pollQuestion, pollOptions etc. ... */}
                    {/* Use value={formData.pollQuestion} and onChange={handleInputChange} */}
                    <div className="mt-8 text-right">
                        <button type="button" onClick={() => setCurrentStep(2)}>Next</button>
                    </div>
                </WizardStep>

                {/* --- Step 2: Banner Post --- */}
                <WizardStep isActive={currentStep === 2}>
                    {/* ... Inputs for bannerCaption, pinnedComment, and the file input ... */}
                    {/* ... Show image preview using previews.image ... */}
                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={() => setCurrentStep(1)}>Back</button>
                        <button type="button" onClick={() => setCurrentStep(3)}>Next</button>
                    </div>
                </WizardStep>

                {/* --- Step 3: Review & Publish --- */}
                <WizardStep isActive={currentStep === 3}>
                    {/* ... Review details from the formData state ... */}
                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={() => setCurrentStep(2)}>Back</button>
                        <button type="submit" disabled={isPublishing}>
                            {isPublishing ? 'Publishing...' : 'Publish Campaign'}
                        </button>
                    </div>
                </WizardStep>
            </form>
        </div>
    );
}