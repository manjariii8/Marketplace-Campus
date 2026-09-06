import { Link } from "react-router-dom";
import { Container } from ".././components/ui";

const HelpCenter = () => {
  const topics = [
    {
      icon: "🛒",
      title: "Shopping & Products",
      description:
        "Learn how to browse products, view details, add items to your cart, and place orders.",
      link: "/products",
    },
    {
      icon: "📦",
      title: "Orders",
      description:
        "Track your orders and check your previous purchases.",
      link: "/orders",
    },
    {
      icon: "👤",
      title: "Account",
      description:
        "Manage your profile, account information, and login details.",
      link: "/profile",
    },
    {
      icon: "🏪",
      title: "Selling",
      description:
        "Interested in selling products? Learn more about becoming a seller.",
      link: "/seller/register",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/20">
            ?
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
            Help Center
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Find answers and helpful information about shopping,
            orders, accounts, and selling on Marketplace.
          </p>
        </div>

        {/* Topics */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              to={topic.link}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:bg-blue-600">
                  {topic.icon}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">
                    {topic.title}
                  </h2>

                  <p className="mt-2 leading-6 text-slate-500">
                    {topic.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 text-white shadow-xl md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Still need help?
              </h2>

              <p className="mt-2 text-blue-100">
                Our support team is here to help you with your questions.
              </p>
            </div>

            <Link
              to="/contact-support"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpCenter;