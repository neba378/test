import { describe, it, expect } from 'vitest';
import { handleRefund } from '../paymentController';

describe('PaymentController Regression - Reason Code Exception', () => {
  it('safely handles missing reason parameter without throwing TypeError', async () => {
    let result: any = null;
    const req = {
      body: {
        paymentId: 'pay_123',
        amount: 5000
        // reason is omitted
      }
    };
    const res = {
      status: () => ({
        json: (data: any) => { result = data; }
      })
    };

    await expect(handleRefund(req as any, res)).resolves.not.toThrow();
    expect(result.success).toBe(true);
    expect(result.reasonCode).toBe('UNKNOWN');
  });
});