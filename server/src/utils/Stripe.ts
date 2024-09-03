import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51Ox87BJzUDgZKWy154KV6Z1vRCXn5rMB3rGa3vDsdM5CYmPHPLXMquM2dVUaThlXZayYd6Wst1bPwmkEIp1zVkHf00S3cNdrlv',
  {
    apiVersion: '2024-06-20',
    typescript: true
  }
);

const endpointSecret = 'whsec_6a543ec33f60ea23f93b34261e3ee94b77f7c01d95a1608af41b711d9023d38d';

export { stripe, endpointSecret };
