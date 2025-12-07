import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VendorCard from "./VendorCard";
import { mockVendors } from "@/data/mockData";

const PopularVendors = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Popular <span className="text-gradient">Event Companies</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover top-rated event management companies trusted by thousands of customers
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex group mt-4 md:mt-0" asChild>
            <Link to="/vendors">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVendors.slice(0, 6).map((vendor, index) => (
            <VendorCard key={vendor.id} vendor={vendor} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/vendors">
              View All Companies
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularVendors;
