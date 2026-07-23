import {
    FaLaptop,
    FaMobileAlt,
    FaTshirt,
    FaBook,
    FaHome
} from "react-icons/fa";

const categories = [

    {
        name: "Electronics",
        icon: <FaLaptop size={36}/>
    },

    {
        name: "Mobiles",
        icon: <FaMobileAlt size={36}/>
    },

    {
        name: "Fashion",
        icon: <FaTshirt size={36}/>
    },

    {
        name: "Books",
        icon: <FaBook size={36}/>
    },

    {
        name: "Home",
        icon: <FaHome size={36}/>
    }

];

const CategorySection = () => {

    return (

        <section className="py-16 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-slate-800">

                    Shop by Category

                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-10">

                    {categories.map((item) => (

                        <div
                            key={item.name}
                            className="bg-slate-50 rounded-2xl p-8 text-center shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
                        >

                            <div className="text-blue-600 flex justify-center">

                                {item.icon}

                            </div>

                            <h3 className="mt-5 font-semibold">

                                {item.name}

                            </h3>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default CategorySection;