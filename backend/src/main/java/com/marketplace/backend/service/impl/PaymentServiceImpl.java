package com.marketplace.backend.service.impl;

import com.marketplace.backend.dto.payment.CreateOrderRequest;
import com.marketplace.backend.dto.payment.RazorpayOrderResponse;
import com.marketplace.backend.entity.Order;
import com.marketplace.backend.entity.Payment;
import com.marketplace.backend.enums.OrderStatus;
import com.marketplace.backend.enums.PaymentStatus;
import com.marketplace.backend.exception.PaymentVerificationException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.repository.OrderRepository;
import com.marketplace.backend.repository.PaymentRepository;
import com.marketplace.backend.service.PaymentService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    public RazorpayOrderResponse createRazorpayOrder(CreateOrderRequest request) {

        try {

            Order order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Order not found"));
            if (order.getStatus() != OrderStatus.PENDING) {
                throw new PaymentVerificationException(
                        "Only pending orders can be paid"
                );
            }

            JSONObject options = new JSONObject();

            options.put(
                    "amount",
                    order.getTotalAmount()
                            .multiply(BigDecimal.valueOf(100))
                            .intValue()
            );

            options.put("currency", "INR");
            options.put("receipt", "order_" + order.getId());

            RazorpayClient client = getClient();

            com.razorpay.Order razorpayOrder =
                    client.orders.create(options);

            Payment payment = paymentRepository
                    .findByOrderId(order.getId())
                    .orElseGet(() -> Payment.builder()
                            .order(order)
                            .build());

            payment.setRazorpayOrderId(razorpayOrder.get("id"));
            payment.setAmount(order.getTotalAmount());
            payment.setStatus(PaymentStatus.CREATED);
            payment.setRazorpayPaymentId(null);
            payment.setRazorpaySignature(null);
            payment.setPaymentDate(java.time.LocalDateTime.now());

            paymentRepository.save(payment);

            return RazorpayOrderResponse.builder()
                    .orderId(order.getId().toString())
                    .razorpayOrderId(razorpayOrder.get("id"))
                    .amount(order.getTotalAmount())
                    .currency("INR")
                    .key(keyId)
                    .build();

        } catch (RazorpayException e) {

            throw new RuntimeException(
                    "Unable to create Razorpay order",
                    e
            );
        }
    }

    @Override
    public void verifyPayment(
            String razorpayOrderId,
            String razorpayPaymentId,
            String razorpaySignature) {

        Payment payment = paymentRepository
                .findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return;
        }

        try {

            JSONObject options = new JSONObject();

            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            boolean isValid = Utils.verifyPaymentSignature(
                    options,
                    keySecret
            );

            if (!isValid) {

                payment.setStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);

                throw new PaymentVerificationException(
                        "Invalid Razorpay signature"
                );
            }

            RazorpayClient client = getClient();

            com.razorpay.Payment razorpayPayment =
                    client.payments.fetch(razorpayPaymentId);

            int paidAmount = razorpayPayment.get("amount");

            int expectedAmount = payment.getAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .intValue();

            if (paidAmount != expectedAmount) {

                payment.setStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);

                throw new PaymentVerificationException(
                        "Payment amount mismatch"
                );
            }

            Order order = payment.getOrder();

            if (order.getStatus() != OrderStatus.PENDING) {

                throw new PaymentVerificationException(
                        "Order has already been processed"
                );
            }

            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setRazorpaySignature(razorpaySignature);
            payment.setStatus(PaymentStatus.SUCCESS);

            paymentRepository.save(payment);

            order.setStatus(OrderStatus.CONFIRMED);

            orderRepository.save(order);

        } catch (PaymentVerificationException e) {

            throw e;

        } catch (Exception e) {

            if (payment.getStatus() != PaymentStatus.SUCCESS) {

                payment.setStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);
            }

            throw new PaymentVerificationException(
                    "Payment verification failed",e);
        }
    }

    private RazorpayClient getClient() throws RazorpayException {

        return new RazorpayClient(
                keyId,
                keySecret
        );
    }
}