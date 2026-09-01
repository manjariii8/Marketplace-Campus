import { ShoppingBag, Store, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Container } from "../ui";
import { HERO_CONTENT } from "../../utils/constants";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <Container>
        <div className="grid min-h-screen items-center gap-10 py-20 lg:grid-cols-2 lg:gap-12 lg:py-16">
          {/* ================= LEFT ================= */}
          <div className="relative z-10">
            {/* Badge */}
            <span className="inline-flex items-center rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
              <Sparkles size={15} className="mr-2" />

              {HERO_CONTENT.badge}
            </span>

            {/* Heading */}
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {HERO_CONTENT.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {HERO_CONTENT.description}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Explore Products */}
              <Link to={HERO_CONTENT.buttons.shop.path} className="group">
                <Button
                  className="
                    flex items-center
                    bg-white
                    px-6 py-3
                    font-bold
                    text-blue-700
                    shadow-lg
                    shadow-black/20
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:bg-blue-50
                    hover:text-blue-800
                    hover:shadow-xl
                  "
                >
                  <ShoppingBag size={18} className="mr-2 text-blue-700" />

                  <span className="text-blue-700 group-hover:text-blue-800">
                    {HERO_CONTENT.buttons.shop.text}
                  </span>

                  <ArrowRight
                    size={17}
                    className="ml-2 text-blue-700 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>

              {/* Become Seller */}
              <Link to={HERO_CONTENT.buttons.seller.path} className="group">
                <Button
                  variant="outline"
                  className="
                    flex items-center
                    border-2
                    border-white/80
                    bg-white/10
                    px-6 py-3
                    font-bold
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-white
                    hover:bg-white
                    hover:text-blue-700
                    hover:shadow-lg
                  "
                >
                  <Store
                    size={18}
                    className="mr-2 text-white group-hover:text-blue-700"
                  />

                  <span className="text-white group-hover:text-blue-700">
                    {HERO_CONTENT.buttons.seller.text}
                  </span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-white/15 pt-7 sm:gap-8">
              {HERO_CONTENT.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-300 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* ================= RIGHT ================= */}
          <div className="relative hidden items-center justify-center lg:flex">
            {/* Glow behind illustration */}
            <div className="absolute h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-3xl" />

            {/* Main Card */}
            <div className="relative flex h-[410px] w-[370px] flex-col items-center justify-between rounded-[2.5rem] border border-white/10 bg-white/10 px-7 py-8 shadow-2xl backdrop-blur-md">
              {/* Brand */}
              <div className="text-center">

                <p className="mt-1.5 text-xs text-slate-300">
                  Everything you need, all in one place.
                </p>
              </div>

              {/* Illustration */}
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-blue-500/30 to-indigo-500/20 shadow-inner">
                {/* Inner Glow */}
                <div className="absolute h-36 w-36 rounded-full bg-blue-400/10 blur-2xl" />

                <ShoppingBag
                  size={150}
                  strokeWidth={1.15}
                  className="relative text-white drop-shadow-2xl"
                />
              </div>

              {/* Bottom Content */}
              <div className="text-center">

                <p className="mt-1 text-xs text-slate-300">
                  Shop • Sell • Connect
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
};

export default Hero;
