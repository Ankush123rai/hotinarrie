import { useState, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Star, Building2, Calendar, IndianRupee, Filter, Grid3X3, List } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockVendors, mockEvents } from "@/data/mockData";
import StarRating from "@/components/landing/StarRating";
import EventCard from "@/components/landing/EventCard";

const Services = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "all";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter vendors based on search
  const filteredVendors = useMemo(() => {
    return mockVendors.filter((vendor) => {
      const matchesQuery = vendor.organizationName.toLowerCase().includes(query) ||
        vendor.city.toLowerCase().includes(query);
      const matchesCity = !city || vendor.city.toLowerCase() === city.toLowerCase();
      return matchesQuery && matchesCity;
    });
  }, [query, city]);

  // Filter events based on search
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesQuery = event.service.toLowerCase().includes(query) ||
        event.vendorName.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);
      return matchesQuery;
    });
  }, [query]);

  const showVendors = type === "all" || type === "vendor";
  const showEvents = type === "all" || type === "event";

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
            <Badge className="mb-4 px-4 py-1">
              {filteredVendors.length + filteredEvents.length} Results Found
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
              Search Results for{" "}
              <span className="text-gradient">"{query}"</span>
            </h1>
            {city && (
              <p className="text-lg text-muted-foreground">
                Showing results in <span className="font-semibold text-foreground">{city}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      
      <main className="flex-1 container py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={type === "all" ? "default" : "outline"} 
              className="cursor-pointer px-4 py-2 transition-all duration-300 hover:scale-105"
              onClick={() => navigate(`/services?q=${query}&city=${city}&type=all`)}
            >
              All Results
            </Badge>
            <Badge 
              variant={type === "vendor" ? "default" : "outline"} 
              className="cursor-pointer px-4 py-2 transition-all duration-300 hover:scale-105"
              onClick={() => navigate(`/services?q=${query}&city=${city}&type=vendor`)}
            >
              <Building2 className="w-3 h-3 mr-1" />
              Vendors ({filteredVendors.length})
            </Badge>
            <Badge 
              variant={type === "event" ? "default" : "outline"} 
              className="cursor-pointer px-4 py-2 transition-all duration-300 hover:scale-105"
              onClick={() => navigate(`/services?q=${query}&city=${city}&type=event`)}
            >
              <Calendar className="w-3 h-3 mr-1" />
              Events ({filteredEvents.length})
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

        {/* Vendors Section */}
        {showVendors && filteredVendors.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8 flex items-center gap-3 animate-fade-in">
              <span className="w-12 h-1 bg-primary rounded-full" />
              <Building2 className="w-6 h-6 text-primary" />
              Event Organizers
            </h2>
            
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredVendors.map((vendor, index) => (
                <Link to={`/vendor/${vendor.id}`} key={vendor.id}>
                  <Card 
                    className={`group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-in-up ${
                      viewMode === "list" ? "flex flex-row" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-[4/3]"}`}>
                      <img 
                        src={vendor.image} 
                        alt={vendor.organizationName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
                        Verified
                      </Badge>
                    </div>
                    
                    <CardContent className={`p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {vendor.organizationName}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {vendor.city}, {vendor.state}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StarRating rating={vendor.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">
                            ({vendor.reviewCount})
                          </span>
                        </div>
                        
                        <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Events Section */}
        {showEvents && filteredEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8 flex items-center gap-3 animate-fade-in">
              <span className="w-12 h-1 bg-accent rounded-full" />
              <Calendar className="w-6 h-6 text-accent" />
              Events & Services
            </h2>
            
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredVendors.length === 0 && filteredEvents.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Filter className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
              No results found
            </h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find anything matching "{query}"
            </p>
            <Button onClick={() => navigate("/")} size="lg">
              Back to Home
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Services;