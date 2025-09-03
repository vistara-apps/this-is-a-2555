import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkPaymentStatus } from '../api';
import Button from '../components/Button';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get session ID from URL query parameters
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        
        if (!sessionId) {
          setError('Payment session ID not found');
          return;
        }
        
        // Check payment status
        const { status: paymentStatus, error: paymentError } = await checkPaymentStatus(sessionId);
        
        if (paymentError) {
          throw new Error(paymentError);
        }
        
        setStatus(paymentStatus);
      } catch (err) {
        console.error('Error verifying payment:', err);
        setError(err.message || 'Failed to verify payment');
      }
    };

    verifyPayment();
  }, [location]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Verification Failed</h2>
          <p className="text-muted mb-8">{error}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
        </div>
      );
    }

    if (status === 'processing') {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Processing Your Payment</h2>
          <p className="text-muted mb-8">Please wait while we verify your payment...</p>
        </div>
      );
    }

    if (status === 'succeeded') {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-muted mb-8">Thank you for your purchase. Your premium features are now active.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
            <Button variant="secondary" onClick={() => navigate('/profile')}>
              View Your Profile
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Status: {status}</h2>
        <p className="text-muted mb-8">Your payment is being processed. Please check back later.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-surface rounded-lg shadow-medium p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentSuccess;

