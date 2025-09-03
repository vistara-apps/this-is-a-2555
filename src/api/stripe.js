/**
 * Stripe API integration for handling payments
 */

// Initialize Stripe client
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Check if Stripe is available
const isStripeAvailable = () => {
  return !!stripePublicKey;
};

/**
 * Initialize Stripe payment session
 * @param {number} amount - Amount to charge in cents
 * @param {string} currency - Currency code (e.g., 'usd')
 * @param {string} featureId - ID of the feature being purchased
 * @returns {Promise<{sessionId: string} | {error: string}>}
 */
export const createPaymentSession = async (amount, currency = 'usd', featureId) => {
  try {
    if (!isStripeAvailable()) {
      console.warn('Stripe is not configured. Using demo mode.');
      return { 
        sessionId: 'demo-session-id',
        clientSecret: 'demo-client-secret'
      };
    }

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        featureId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create payment session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment session:', error);
    return { error: error.message || 'Failed to create payment session' };
  }
};

/**
 * Process a payment with Stripe Elements
 * @param {Object} stripe - Stripe instance
 * @param {Object} elements - Stripe Elements instance
 * @param {string} clientSecret - Client secret from payment intent
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const processPayment = async (stripe, elements, clientSecret) => {
  try {
    if (!isStripeAvailable()) {
      console.warn('Stripe is not configured. Using demo mode.');
      return { success: true };
    }

    if (!stripe || !elements || !clientSecret) {
      throw new Error('Missing required payment parameters');
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check payment status
 * @param {string} sessionId - Payment session ID
 * @returns {Promise<{status: string} | {error: string}>}
 */
export const checkPaymentStatus = async (sessionId) => {
  try {
    if (!isStripeAvailable()) {
      console.warn('Stripe is not configured. Using demo mode.');
      return { status: 'succeeded' };
    }

    const response = await fetch(`/api/check-payment-status?session_id=${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to check payment status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return { error: error.message || 'Failed to check payment status' };
  }
};

/**
 * Get user's payment history
 * @returns {Promise<{transactions: Array} | {error: string}>}
 */
export const getPaymentHistory = async () => {
  try {
    if (!isStripeAvailable()) {
      console.warn('Stripe is not configured. Using demo mode.');
      return { 
        transactions: [
          {
            id: 'demo-tx-1',
            amount: 500,
            currency: 'usd',
            status: 'succeeded',
            created: new Date().toISOString(),
            description: 'Premium Community Access'
          },
          {
            id: 'demo-tx-2',
            amount: 200,
            currency: 'usd',
            status: 'succeeded',
            created: new Date(Date.now() - 86400000).toISOString(),
            description: 'Advanced AI Idea Generation'
          }
        ] 
      };
    }

    const response = await fetch('/api/payment-history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get payment history');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting payment history:', error);
    return { error: error.message || 'Failed to get payment history' };
  }
};

