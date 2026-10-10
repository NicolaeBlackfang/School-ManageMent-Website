// services/payment.js
//
// Provider-agnostic payment adapter for the public admission fee.
//
// Design goals (see audit Q1):
//   * The amount is ALWAYS determined server-side (application.payableAmount);
//     a client-supplied amount is never read.
//   * One file per provider. A real gateway (bKash / Nagad / SSLCommerz) is
//     added by implementing an adapter with the same contract below and setting
//     PAYMENT_PROVIDER — no route changes required.
//   * The default "sandbox" adapter performs NO network call and is explicitly
//     labelled. It is refused outright in production so a mock payment flow can
//     never silently ship to real users.
//
// Adapter contract:
//   async verify({ application, txnId, method }) ->
//     { verified: true, amount, reference, provider, sandbox }
//   or throws an Error with an optional `.status` code.
//
// A real adapter MUST perform a server-to-server lookup of `txnId` with the
// gateway and confirm the paid amount is >= application.payableAmount before
// resolving `verified: true`.

const PROVIDER = (process.env.PAYMENT_PROVIDER || 'sandbox').toLowerCase();

const adapters = {
  // Development-only simulator. Performs no external verification; the caller
  // still enforces idempotency and a server-set amount.
  sandbox: async ({ application, txnId, method }) => {
    return {
      verified: true,
      amount: Number(application.payableAmount) || 0,
      reference: String(txnId).trim(),
      method: typeof method === 'string' && method.trim() ? method.trim().slice(0, 32) : 'Sandbox',
      provider: 'sandbox',
      sandbox: true,
    };
  },

  // Example stub for a real provider. Enable with PAYMENT_PROVIDER=bkash and
  // fill in the server-to-server verification call + credentials.
  // bkash: async ({ application, txnId }) => { ... },
};

const isSandbox = PROVIDER === 'sandbox';

const verifyPayment = async (ctx) => {
  const adapter = adapters[PROVIDER];
  if (!adapter) {
    const err = new Error('The configured payment provider is not available.');
    err.status = 503;
    throw err;
  }
  // Never allow the sandbox simulator to serve production traffic.
  if (isSandbox && process.env.NODE_ENV === 'production') {
    const err = new Error('Payment provider not configured for production.');
    err.status = 503;
    throw err;
  }
  return adapter(ctx);
};

module.exports = { PROVIDER, isSandbox, verifyPayment };
