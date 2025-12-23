import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Grid3X3, List, Users, ChevronDown, Star } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockVendors, services, cities } from "@/data/mockData";

const ServicePage = () => {
  const { serviceId } = useParams();
  const [selectedCity, setSelectedCity] = useState("All India");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const service = services.find(s => s.id === serviceId);

  // Filter vendors based on service and city
  const filteredVendors = useMemo(() => {
    return mockVendors.filter((vendor) => {
      const matchesService = serviceId ? vendor.services.includes(serviceId) : true;
      const matchesCity = selectedCity === "All India" || vendor.city === selectedCity;
      return matchesService && matchesCity;
    });
  }, [serviceId, selectedCity]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft stagger-2" />
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            {service && (
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${service.color} flex items-center justify-center text-4xl`}>
                {service.icon}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
              <span className="text-gradient">{service?.name || "Services"}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find the best vendors for your {service?.name.toLowerCase() || "special occasion"}
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fade-in">
          <div className="flex flex-wrap items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedCity}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-64 overflow-y-auto">
                {cities.map((city) => (
                  <DropdownMenuItem 
                    key={city} 
                    onClick={() => setSelectedCity(city)}
                    className={selectedCity === city ? "bg-primary/10 text-primary" : ""}
                  >
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Badge variant="secondary" className="px-4 py-2">
              {filteredVendors.length} Vendors Found
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Vendors Grid */}
        {filteredVendors.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredVendors.map((vendor, index) => (
              <Link to={`/vendor/${vendor.id}`} key={vendor.id}>
                <Card 
                  className={`group overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={vendor.image} 
                      alt={vendor.organizationName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-foreground">{vendor.rating}</span>
                        <span className="text-xs text-muted-foreground">({vendor.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                      {vendor.organizationName}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{vendor.city}, {vendor.state}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {vendor.services.slice(0, 3).map((serviceId) => {
                        const svc = services.find(s => s.id === serviceId);
                        return svc ? (
                          <Badge key={serviceId} variant="secondary" className="text-xs">
                            {svc.icon} {svc.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Users className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
              No vendors found
            </h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any vendors for this service in {selectedCity}
            </p>
            <Button onClick={() => setSelectedCity("All India")} size="lg">
              View All Cities
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;