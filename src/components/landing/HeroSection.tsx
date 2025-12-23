import { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight, Building2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cities, mockVendors, mockEvents } from "@/data/mockData";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920",
    title: "Dream Weddings",
    subtitle: "Create unforgettable moments",
  },
  {
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920",
    title: "Birthday Celebrations",
    subtitle: "Make every year special",
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920",
    title: "Corporate Events",
    subtitle: "Professional excellence",
  },
  {
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920",
    title: "Grand Parties",
    subtitle: "Entertainment at its finest",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Filter cities based on search
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase()) && city !== "All India"
  ).slice(0, 3);

  // Live search results - includes cities, vendors, and events
  const searchResults = {
    cities: searchQuery.length >= 2 ? filteredCities : [],
    vendors: searchQuery.length >= 2 
      ? mockVendors.filter(v => 
          v.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.city.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3)
      : [],
    events: searchQuery.length >= 2 
      ? mockEvents.filter(e => 
          e.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3)
      : []
  };

  const hasResults = searchResults.cities.length > 0 || searchResults.vendors.length > 0 || searchResults.events.length > 0;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Carousel Background */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image.url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
      ))}

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container h-full flex flex-col items-center justify-center text-center text-primary-foreground">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-4">
            {heroImages[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {heroImages[currentSlide].subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl animate-fade-in-up stagger-2" ref={searchRef}>
          <div className="bg-background rounded-2xl p-2 shadow-elevated flex flex-col md:flex-row gap-2 relative">
            {/* Unified Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events, vendors, cities..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onKeyDown={handleKeyDown}
                className="pl-12 h-12 border-0 bg-transparent text-foreground focus-visible:ring-0"
              />
              
              {/* Live Search Dropdown */}
              {showSearchDropdown && hasResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background rounded-lg shadow-elevated border max-h-80 overflow-y-auto z-50 animate-fade-in">
                  {searchResults.cities.length > 0 && (
                    <div className="p-2">
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Cities
                      </p>
                      {searchResults.cities.map((city) => (
                        <button
                          key={city}
                          className="w-full flex items-center gap-3 px-2 py-2 hover:bg-muted rounded-md transition-colors text-left"
                          onClick={() => {
                            navigate(`/services?q=${encodeURIComponent(city)}&city=${encodeURIComponent(city)}`);
                            setShowSearchDropdown(false);
                          }}
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{city}</p>
                            <p className="text-xs text-muted-foreground">View vendors in {city}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchResults.vendors.length > 0 && (
                    <div className="p-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> Event Organizers
                      </p>
                      {searchResults.vendors.map((vendor) => (
                        <button
                          key={vendor.id}
                          className="w-full flex items-center gap-3 px-2 py-2 hover:bg-muted rounded-md transition-colors text-left"
                          onClick={() => {
                            navigate(`/vendor/${vendor.id}`);
                            setShowSearchDropdown(false);
                          }}
                        >
                          <img 
                            src={vendor.image} 
                            alt={vendor.organizationName}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm text-foreground">{vendor.organizationName}</p>
                            <p className="text-xs text-muted-foreground">{vendor.city}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchResults.events.length > 0 && (
                    <div className="p-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Events & Services
                      </p>
                      {searchResults.events.map((event) => (
                        <button
                          key={event.id}
                          className="w-full flex items-center gap-3 px-2 py-2 hover:bg-muted rounded-md transition-colors text-left"
                          onClick={() => {
                            navigate(`/event/${event.id}`);
                            setShowSearchDropdown(false);
                          }}
                        >
                          <img 
                            src={event.photos[0]} 
                            alt={event.service}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm text-foreground">{event.service}</p>
                            <p className="text-xs text-muted-foreground">{event.vendorName}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <button
                    className="w-full text-center text-sm text-primary hover:bg-muted p-3 border-t transition-colors"
                    onClick={handleSearch}
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <Button variant="hero" size="xl" className="md:w-auto w-full" onClick={handleSearch}>
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 animate-fade-in-up stagger-3">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">500+</p>
            <p className="text-sm opacity-80">Event Vendors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">10K+</p>
            <p className="text-sm opacity-80">Events Organized</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">50+</p>
            <p className="text-sm opacity-80">Cities</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">4.8★</p>
            <p className="text-sm opacity-80">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
