import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51Ox87BJzUDgZKWy154KV6Z1vRCXn5rMB3rGa3vDsdM5CYmPHPLXMquM2dVUaThlXZayYd6Wst1bPwmkEIp1zVkHf00S3cNdrlv',
  {
    apiVersion: '2024-06-20',
    typescript: true
  }
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export { stripe, endpointSecret };
