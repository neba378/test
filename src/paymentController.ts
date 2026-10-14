export interface CheckoutRequest {
  amount: number;
  currency: string;
  customerId: string;
  metadata?: {
    billingDetails?: {
      postalCode?: string;
    };
  };
}

export interface RefundRequest {
  paymentId: string;
  amount: number;
  reason?: {
    code?: string;
    description?: string;
  };
}

export async function handleCheckout(req: { body: CheckoutRequest }, res: any) {
  try {
    const { amount, currency, customerId, metadata } = req.body;

    // Buggy: metadata is assumed to always be an object, throws TypeError when customer sends null
    const billingZip = (metadata as any).billingDetails.postalCode;

    return res.status(200).json({
      success: true,
      amount,
      currency,
      customerId,
      zip: billingZip
    });
  } catch (error: any) {
    throw error;
  }
}

export async function handleRefund(req: { body: RefundRequest }, res: any) {
  try {
    const { paymentId, amount, reason } = req.body;

    // Buggy: reason is assumed to always be an object, throws TypeError when client sends null or undefined
    const reasonCode = (reason as any)?.code ? (reason as any).code.toUpperCase() : "UNKNOWN";

    return res.status(200).json({
      success: true,
      paymentId,
      amount,
      reasonCode
    });
  } catch (error: any) {
    throw error;
  }
}
