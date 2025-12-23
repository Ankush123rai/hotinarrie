import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Filter, Grid3X3, List, Calendar, ChevronDown } from "lucide-react";
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
import { mockEvents, services, cities } from "@/data/mockData";
import EventCard from "@/components/landing/EventCard";

const ServicePage = () => {
  const { serviceId } = useParams();
  const [selectedCity, setSelectedCity] = useState("All India");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const service = services.find(s => s.id === serviceId);

  // Filter events based on service and city
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesService = event.service.toLowerCase().includes(service?.name.toLowerCase() || "") ||
        serviceId === event.service.toLowerCase().replace(/\s+/g, '-');
      const matchesCity = selectedCity === "All India" || 
        event.vendorName.toLowerCase().includes(selectedCity.toLowerCase());
      return matchesService || matchesCity;
    });
  }, [serviceId, service, selectedCity]);

  // Get all events if service not found (show all related)
  const displayEvents = filteredEvents.length > 0 ? filteredEvents : mockEvents.slice(0, 6);

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
              Find the best event organizers for your {service?.name.toLowerCase() || "special occasion"}
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
              {displayEvents.length} Events Found
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

        {/* Events Grid */}
        {displayEvents.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {displayEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any events for this service in {selectedCity}
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
