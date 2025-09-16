import React from 'react';
import { Link } from 'react-router-dom';

const CreatePollPage = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Create a New Poll</h2>
        <p className="text-gray-600">The form to create a new poll will go here.</p>
        <Link to="/dashboard" className="mt-4 text-pyngl-purple hover:underline">
            &larr; Back to Dashboard
        </Link>
    </div>
);

export default CreatePollPage; 