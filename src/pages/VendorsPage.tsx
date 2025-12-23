import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Grid3X3, List, Building2, ChevronDown } from "lucide-react";
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
import { mockVendors, cities } from "@/data/mockData";
import StarRating from "@/components/landing/StarRating";

const VendorsPage = () => {
  const [selectedCity, setSelectedCity] = useState("All India");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter vendors based on city
  const filteredVendors = useMemo(() => {
    if (selectedCity === "All India") {
      return mockVendors;
    }
    return mockVendors.filter((vendor) => 
      vendor.city.toLowerCase() === selectedCity.toLowerCase()
    );
  }, [selectedCity]);

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
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
              <span className="text-gradient">Event Organizers</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover trusted event vendors across India
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
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Building2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
              No vendors found
            </h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any vendors in {selectedCity}
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

export default VendorsPage;
