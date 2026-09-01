import {
    Truck,
    ShieldCheck,
    CreditCard,
    RefreshCcw
} from "lucide-react";

import { Card, Container, SectionTitle } from "../ui";

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        desc: "Nationwide delivery with live tracking."
    },
    {
        icon: ShieldCheck,
        title: "Secure Shopping",
        desc: "100% secure payment gateway."
    },
    {
        icon: CreditCard,
        title: "Easy Payments",
        desc: "Multiple payment methods."
    },
    {
        icon: RefreshCcw,
        title: "Easy Returns",
        desc: "Simple return policy."
    }
];

const WhyChooseUs = () => (
    <section className="py-20">

        <Container>

            <SectionTitle
                title="Why Choose Us"
                subtitle="Everything you need in one marketplace"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {features.map((feature) => {

                    const Icon = feature.icon;

                    return (
                        <Card key={feature.title}>

                            <Icon
                                className="text-blue-600"
                                size={40}
                            />

                            <h3 className="mt-5 font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-slate-500">
                                {feature.desc}
                            </p>

                        </Card>
                    );

                })}

            </div>

        </Container>

    </section>
);

export default WhyChooseUs;