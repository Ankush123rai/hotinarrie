import { Link } from "react-router-dom";
import { services } from "@/data/mockData";

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we have the perfect vendors for every occasion
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-background hover:shadow-card transition-all duration-300 group-hover:-translate-y-1">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${service.color} flex items-center justify-center text-2xl md:text-3xl mb-3 transition-transform group-hover:scale-110`}
                >
                  {service.icon}
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  {service.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
