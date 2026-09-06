import { useState } from "react";
import { Container } from ".././components/ui";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse the products available on Marketplace, open the product you want, add it to your cart, and proceed to checkout. Enter your shipping details and complete the order.",
    },
    {
      question: "How can I check my orders?",
      answer:
        "After logging in, go to the My Orders section from your account or navigation menu. You can view your previous orders and their current status.",
    },
    {
      question: "Can I become a seller?",
      answer:
        "Yes. You can register as a seller through the Become a Seller option. After completing the seller registration process, you can start managing your products according to the marketplace rules.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Log in to your account and open your Profile page. From there, you can update the available account information.",
    },
    {
      question: "What should I do if I have a problem with my order?",
      answer:
        "If you experience an issue with an order, contact our support team with your order details and a description of the problem. Our team will help you resolve it.",
    },
    {
      question: "Is my account information secure?",
      answer:
        "Marketplace uses authentication and protected backend APIs to help keep your account information secure. Never share your password or authentication details with anyone.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Order cancellation depends on the current status of your order. If cancellation is available, contact support with your order details for assistance.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team through the Contact Support page. Provide your name, email, subject, and a detailed description of your issue.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
            ?
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Find quick answers to the most common questions about
            Marketplace.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-5">
                    <p className="leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold">
            Didn't find your answer?
          </h2>

          <p className="mt-2 text-blue-100">
            Our support team is ready to help.
          </p>

          <a
            href="/contact-support"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Contact Support
          </a>
        </div>
      </Container>
    </div>
  );
};

export default FAQs;