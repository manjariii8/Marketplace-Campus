import {
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiUsers
} from "react-icons/fi";

const cards = [
  {
    title: "Products",
    value: 24,
    icon: <FiPackage className="text-blue-600" size={28} />
  },
  {
    title: "Orders",
    value: 156,
    icon: <FiShoppingCart className="text-green-600" size={28} />
  },
  {
    title: "Revenue",
    value: "₹2.4L",
    icon: <FiDollarSign className="text-orange-500" size={28} />
  },
  {
    title: "Customers",
    value: 89,
    icon: <FiUsers className="text-purple-600" size={28} />
  }
];

const DashboardCards = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">{card.title}</p>
              <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
            </div>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;