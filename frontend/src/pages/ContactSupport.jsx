import { useState } from "react";
import { Container } from ".././components/ui";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Support request:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
            ✉
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Support
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Have a question or facing an issue? Send us a message and
            our support team will help you.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Information */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold">
              We're here to help
            </h2>

            <p className="mt-4 leading-7 text-blue-100">
              Whether you have a question about an order, product,
              account, or seller experience, feel free to contact us.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm font-semibold text-blue-200">
                  Response Time
                </p>

                <p className="mt-1 font-medium">
                  Usually within 24–48 hours
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-200">
                  Support Hours
                </p>

                <p className="mt-1 font-medium">
                  Monday – Saturday
                </p>

                <p className="text-sm text-blue-100">
                  9:00 AM – 6:00 PM
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-200">
                  Email
                </p>

                <p className="mt-1 font-medium">
                  support@marketplace.com
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  Message Received
                </h2>

                <p className="mt-3 max-w-md text-slate-500">
                  Thank you for contacting us. Your support request
                  has been received.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900">
                  Send us a message
                </h2>

                <p className="mt-2 text-slate-500">
                  Fill out the form below and we'll get back to you.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What can we help you with?"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Describe your issue..."
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactSupport;