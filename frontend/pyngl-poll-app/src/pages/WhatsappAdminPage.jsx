import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/axiosConfig';
import { ArrowLeft } from 'lucide-react';

export default function WhatsAppAdminPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cc: '91', // Default to India's country code
        phoneNumber: '',
        method: 'sms',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Requesting registration code...');
        try {
            const { data } = await apiClient.post('/api/whatsapp-admin/request-code', formData);
            toast.success(data.message, { id: toastId, duration: 6000 });
            console.log("WhatsApp API Response:", data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto min-h-screen max-w-md bg-gray-50">
            <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-4 p-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
                    <h1 className="text-lg font-semibold">WhatsApp Admin</h1>
                </div>
            </div>

            <div className="p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                    <h2 className="text-lg font-bold">Request Registration Code</h2>
                    <p className="text-sm text-gray-500">Use this form to complete the one-time registration of your business phone number with the WhatsApp API.</p>

                    <div>
                        <label htmlFor="cc" className="block text-sm font-medium text-gray-700">Country Code</label>
                        <input type="text" name="cc" id="cc" value={formData.cc} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., 91" />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number (without country code)</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., 9876543210" />
                    </div>

                    <div>
                        <label htmlFor="method" className="block text-sm font-medium text-gray-700">Verification Method</label>
                        <select name="method" id="method" value={formData.method} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="sms">SMS</option>
                            <option value="voice">Voice Call</option>
                        </select>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-full font-medium disabled:opacity-50">
                        {isLoading ? 'Sending Request...' : 'Request Code'}
                    </button>
                </form>
            </div>
        </div>
    );
}
