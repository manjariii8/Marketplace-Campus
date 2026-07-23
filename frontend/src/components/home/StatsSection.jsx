const stats = [

    {
        title: "Products",
        value: "25K+"
    },

    {
        title: "Customers",
        value: "50K+"
    },

    {
        title: "Sellers",
        value: "3K+"
    },

    {
        title: "Orders",
        value: "120K+"
    }

];

const StatsSection = () => {

    return (

        <section className="bg-slate-900 text-white py-16">

            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-6">

                {stats.map((stat) => (

                    <div
                        key={stat.title}
                        className="text-center"
                    >

                        <h2 className="text-5xl font-bold text-orange-400">

                            {stat.value}

                        </h2>

                        <p className="mt-4 text-slate-300">

                            {stat.title}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

};

export default StatsSection;