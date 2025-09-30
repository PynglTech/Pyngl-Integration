import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// A reusable component for each section of the policy
const Section = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
            {children}
        </div>
    </section>
);

export default function PrivacyPolicyPage() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto min-h-screen max-w-md bg-gray-50 text-gray-900 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
                    <h1 className="text-lg font-semibold">Privacy Policy</h1>
                    <div className="w-6"></div> {/* Spacer */}
                </div>
            </div>

            <main className="p-4">
                <div className="mb-6 text-sm text-gray-500">
                    <p><strong>Effective Date:</strong> 01/09/2025</p>
                    <p><strong>Last Updated:</strong> 23/09/2025</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <Section title="Welcome to Pyngl">
                        <p>Experiencious (“Company,” “we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Services.</p>
                    </Section>

                    <Section title="1. Information We Collect">
                        <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Information You Provide</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Account details: Name, username, email, phone number, profile photo.</li>
                            <li>User-generated content: Polls, comments, images, and feedback.</li>
                            <li>Payment details for premium services.</li>
                        </ul>

                        <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Information Collected Automatically</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Device information, IP address, and browser type.</li>
                            <li>Usage analytics on how you interact with the Services.</li>
                        </ul>
                    </Section>
                    
                    <Section title="2. How We Use Your Data">
                        <ul className="list-disc list-inside space-y-2">
                            <li>To provide, personalize, and improve the Services.</li>
                            <li>To communicate with you about updates, security alerts, and support.</li>
                            <li>To prevent fraud and ensure the security of our platform.</li>
                            <li>To comply with legal obligations.</li>
                        </ul>
                    </Section>

                    <Section title="3. Data Sharing and Disclosure">
                         <ul className="list-disc list-inside space-y-2">
                            <li>With service providers who help us operate (e.g., cloud hosting, payment processors).</li>
                            <li>If required by law or in response to a valid legal request.</li>
                            <li>Content you make public (polls, comments) will be visible to other users.</li>
                        </ul>
                    </Section>

                    <Section title="4. Your Rights">
                        <p>You have the right to access, correct, or request the deletion of your personal data. To exercise these rights, please contact us.</p>
                    </Section>

                    <Section title="5. Contact Information">
                        <p>For questions regarding this Policy, please contact our Privacy Officer:</p>
                        <address className="not-italic mt-2 bg-gray-100 p-4 rounded-lg text-sm">
                            <strong>Experiencious</strong><br />
                            7, Madhuvan Society, Gotri, Vadodara 390021<br />
                            Email: <a href="mailto:privacy@pyngl.com" className="text-blue-600 hover:underline">privacy@pyngl.com</a>
                        </address>
                    </Section>
                </div>
            </main>
        </div>
    );
}
