import { verifyPayment } from "../services/paymentService";

export async function openRazorpay(
  paymentData,
  onSuccess,
  onFailure
) {
  const options = {
    key: paymentData.key,
    amount: paymentData.amount * 100,
    currency: paymentData.currency,
    name: "Marketplace",
    description: "Order Payment",
    order_id: paymentData.razorpayOrderId,

    handler: async function (response) {
      try {
        await verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });

        onSuccess(response);
      } catch (error) {
        console.error(error);
        onFailure(error);
      }
    },

    modal: {
      ondismiss: function () {
        onFailure(new Error("Payment cancelled"));
      },
    },

    theme: {
      color: "#2563eb",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}