import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// A reusable component for each section of the terms
const Section = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">{title}</h2>
        <div className="space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            {children}
        </div>
    </section>
);

export default function TermsPage() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
            {/* Header */}
            <div className="sticky top-0 z-40 border-b border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-lg font-semibold">Terms of Service</h1>
                    <div className="w-6"></div> {/* Spacer */}
                </div>
            </div>

            <main className="p-4 mx-auto md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
                <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <p><strong>Effective Date:</strong> 01/09/2025</p>
                    <p><strong>Last Updated:</strong> 23/09/2025</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Section title="Welcome to Pyngl">
                        <p>
                            These Terms and Conditions (“Terms”) govern your access to and use of Pyngl, operated by Experiencious (“Company,” “we,” “our,” or “us”). 
                            By using our website, mobile application, and related services (collectively, the “Services”), you agree to be bound by these Terms.
                        </p>
                    </Section>

                    <Section title="1. Eligibility">
                        <ul className="list-disc list-inside space-y-2">
                            <li>You must be at least 13 years old to use the Services.</li>
                            <li>If you are under the legal age of majority, you must have parental or guardian consent.</li>
                            <li>Accounts may not be created by bots or individuals previously banned from Pyngl.</li>
                        </ul>
                    </Section>
                    
                    <Section title="2. User-Generated Content">
                         <ul className="list-disc list-inside space-y-2">
                            <li>You retain ownership of content you post on Pyngl.</li>
                            <li>By posting, you grant Pyngl a worldwide, non-exclusive, royalty-free license to use, store, display, reproduce, and distribute your content within the Services.</li>
                            <li>We may remove or moderate content at our discretion without prior notice.</li>
                        </ul>
                    </Section>

                    <Section title="3. Disclaimers">
                         <ul className="list-disc list-inside space-y-2">
                            <li>The Services are provided “as is” without warranties of any kind.</li>
                            <li>We do not guarantee that the Services will be uninterrupted or error-free.</li>
                            <li>We do not endorse or verify the accuracy of user-generated content.</li>
                        </ul>
                    </Section>

                    <Section title="4. Governing Law">
                        <ul className="list-disc list-inside space-y-2">
                            <li>These Terms are governed by the laws of India.</li>
                            <li>Courts in Vadodara, Gujarat shall have exclusive jurisdiction over any disputes.</li>
                        </ul>
                    </Section>

                    <Section title="5. Contact Information">
                        <p>For questions regarding these Terms, please contact us:</p>
                        <address className="not-italic mt-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm">
                            <strong>Experiencious</strong><br />
                            7, Madhuvan Society, Gotri, Vadodara 390021<br />
                            Email: <a href="mailto:contact@pyngl.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@pyngl.com</a>
                        </address>
                    </Section>
                </div>
            </main>
        </div>
    );
}
