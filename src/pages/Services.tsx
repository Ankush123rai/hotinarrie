import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, Star, Play, X, Building2, Calendar, IndianRupee } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockVendors, mockEvents, Vendor, EventService } from "@/data/mockData";
import StarRating from "@/components/landing/StarRating";

const Services = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "all";

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventService | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

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

  const getVendorById = (vendorId: string) => mockVendors.find(v => v.id === vendorId);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Search Results Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
            Search Results for "{query}"
          </h1>
          {city && <p className="text-muted-foreground">in {city}</p>}
          <div className="flex gap-2 mt-4">
            <Badge 
              variant={type === "all" ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => navigate(`/services?q=${query}&city=${city}&type=all`)}
            >
              All Results
            </Badge>
            <Badge 
              variant={type === "vendor" ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => navigate(`/services?q=${query}&city=${city}&type=vendor`)}
            >
              Vendors ({filteredVendors.length})
            </Badge>
            <Badge 
              variant={type === "event" ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => navigate(`/services?q=${query}&city=${city}&type=event`)}
            >
              Events ({filteredEvents.length})
            </Badge>
          </div>
        </div>

        {/* Vendors Section */}
        {showVendors && filteredVendors.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Event Organizers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor, index) => (
                <Card 
                  key={vendor.id}
                  className="group cursor-pointer hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedVendor(vendor)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={vendor.image} 
                      alt={vendor.organizationName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-primary-foreground text-lg truncate">
                        {vendor.organizationName}
                      </h3>
                      <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                        <MapPin className="w-3 h-3" />
                        {vendor.city}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <StarRating rating={vendor.rating} size="sm" />
                      <span className="text-sm text-muted-foreground">
                        {vendor.reviewCount} reviews
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Events Section */}
        {showEvents && filteredEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Events & Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <Card 
                  key={event.id}
                  className="group cursor-pointer hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.photos[0]} 
                      alt={event.service}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {event.videoUrl && (
                      <div className="absolute top-3 right-3 bg-foreground/80 text-primary-foreground p-2 rounded-full">
                        <Play className="w-4 h-4" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <Badge className="absolute top-3 left-3">{event.service}</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-primary-foreground text-lg truncate">
                        {event.vendorName}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <StarRating rating={event.rating} size="sm" />
                      <div className="flex items-center text-primary font-semibold">
                        <IndianRupee className="w-4 h-4" />
                        {event.amount.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredVendors.length === 0 && filteredEvents.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-4">No results found for "{query}"</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        )}
      </main>

      {/* Vendor Detail Modal */}
      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{selectedVendor?.organizationName}</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-6">
              <img 
                src={selectedVendor.image} 
                alt={selectedVendor.organizationName}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {/* Vendor Events */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Events & Services</h3>
                <div className="grid gap-3">
                  {mockEvents.filter(e => e.vendorId === selectedVendor.id).map((event) => (
                    <Card 
                      key={event.id} 
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => {
                        setSelectedVendor(null);
                        setSelectedEvent(event);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={event.photos[0]} 
                          alt={event.service}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{event.service}</h4>
                          <div className="flex items-center text-primary font-semibold mt-1">
                            <IndianRupee className="w-4 h-4" />
                            {event.amount.toLocaleString()}
                          </div>
                        </div>
                        <StarRating rating={event.rating} size="sm" />
                      </div>
                    </Card>
                  ))}
                  {mockEvents.filter(e => e.vendorId === selectedVendor.id).length === 0 && (
                    <p className="text-muted-foreground text-sm">No events listed yet</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.state} - {selectedVendor.pincode}
              </div>
              
              <div className="flex gap-3">
                <Button onClick={() => navigate(`/vendor/${selectedVendor.id}`)} className="flex-1">
                  View Full Profile
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {selectedVendor.phone}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{selectedEvent?.service}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              {/* Photos Gallery */}
              <div className="space-y-3">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img 
                    src={selectedEvent.photos[activePhotoIndex]} 
                    alt={selectedEvent.service}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedEvent.photos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedEvent.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === activePhotoIndex ? "border-primary" : "border-transparent opacity-70"
                        }`}
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* YouTube Video */}
              {selectedEvent.videoUrl && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Video</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={selectedEvent.videoUrl}
                      title="Event Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <IndianRupee className="w-6 h-6" />
                {selectedEvent.amount.toLocaleString()}
              </div>

              {/* Vendor Info */}
              {(() => {
                const vendor = getVendorById(selectedEvent.vendorId);
                if (!vendor) return null;
                return (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-lg">Contact Information</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium text-foreground">{vendor.organizationName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {vendor.address}, {vendor.city}, {vendor.state} - {vendor.pincode}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${vendor.phone}`} className="text-primary hover:underline">
                          {vendor.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex gap-3">
                <Button className="flex-1">Book Now</Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const vendor = getVendorById(selectedEvent.vendorId);
                    if (vendor) navigate(`/vendor/${vendor.id}`);
                  }}
                >
                  View Vendor Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Services;
