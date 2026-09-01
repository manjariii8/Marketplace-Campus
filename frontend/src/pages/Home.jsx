import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
// import PromoBanner from "../components/home/PromoBanner";
import WhyChooseUs from "../components/home/WhyChooseUs";


const Home = () => {
    return (
        <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <WhyChooseUs />
            {/* <PromoBanner />
            */}
        </>
    );
};

export default Home;