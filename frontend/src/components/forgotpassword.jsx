import React, { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendResetLink = async (email) => {
        try {
            const response = await axios.post('/users/user/forgotpassword', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendResetLink(email);
            toast.success(`Password reset link has been sent to ${email}`);
            setEmail('');
            navigate('/login');
        } catch (error) {
            toast.error('An error occurred. Please try again.', { position: toast.POSITION.TOP_CENTER });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Forgot Your Password?</h2>
                <p className="text-gray-600 mb-6 text-center">Enter your email address, and we will send you a link to reset your password.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="example@domain.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
                            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                        
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;