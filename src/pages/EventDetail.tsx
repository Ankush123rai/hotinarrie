import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Play, X, Calendar, IndianRupee, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StarRating from "@/components/landing/StarRating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { mockVendors, mockEvents, mockReviews } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const event = mockEvents.find((e) => e.id === id);
  const vendor = event ? mockVendors.find((v) => v.id === event.vendorId) : null;
  const eventReviews = mockReviews.filter((r) => r.vendorId === event?.vendorId);

  if (!event || !vendor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmitReview = () => {
    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Please login to save your review.",
    });
    setUserRating(0);
    setReviewMessage("");
  };

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % event.photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + event.photos.length) % event.photos.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Banner */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={event.photos[0]}
            alt={event.service}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container">
              <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20" asChild>
                <Link to={`/vendor/${vendor.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {vendor.organizationName}
                </Link>
              </Button>
              
              <Badge className="mb-4 animate-fade-in">{event.service}</Badge>
              
              <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary-foreground mb-4 animate-fade-in-up">
                {event.service}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90 animate-fade-in-up stagger-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold">{event.rating}</span>
                  <span className="text-primary-foreground/70">({event.reviewCount} reviews)</span>
                </div>
                <span className="hidden md:block w-1 h-1 rounded-full bg-primary-foreground/50" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>by {vendor.organizationName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Photo Gallery */}
              <section className="animate-fade-in-up">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <span className="w-12 h-1 bg-primary rounded-full" />
                  Event Gallery
                </h2>
                
                {/* Main Photo */}
                <div 
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 group cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={event.photos[activePhotoIndex]}
                    alt={`${event.service} - Photo ${activePhotoIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Navigation Arrows */}
                  {event.photos.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Photo Counter */}
                  <div className="absolute bottom-4 right-4 bg-foreground/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    {activePhotoIndex + 1} / {event.photos.length}
                  </div>
                </div>
                
                {/* Thumbnails */}
                {event.photos.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {event.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                          index === activePhotoIndex 
                            ? "ring-3 ring-primary ring-offset-2 ring-offset-background scale-105" 
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img 
                          src={photo} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* Video Section */}
              {event.videoUrl && (
                <section className="animate-fade-in-up stagger-2">
                  <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <span className="w-12 h-1 bg-accent rounded-full" />
                    Watch Video
                  </h2>
                  
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated">
                    <iframe
                      src={event.videoUrl}
                      title={`${event.service} Video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </section>
              )}

              {/* Description */}
              <section className="animate-fade-in-up stagger-3">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <span className="w-12 h-1 bg-primary rounded-full" />
                  About This Event
                </h2>
                
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed">{event.description}</p>
                  
                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    <Card className="p-6 flex items-center gap-4 hover-lift">
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                        <Users className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Perfect for</p>
                        <p className="font-semibold text-foreground">All group sizes</p>
                      </div>
                    </Card>
                    
                    <Card className="p-6 flex items-center gap-4 hover-lift">
                      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                        <Clock className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold text-foreground">Customizable</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section className="animate-fade-in-up stagger-4">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <span className="w-12 h-1 bg-accent rounded-full" />
                  Customer Reviews
                </h2>

                {/* Add Review */}
                <Card className="p-6 mb-8 border-2 border-dashed border-primary/30">
                  <h3 className="font-semibold text-lg mb-4">Share Your Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Rating</label>
                      <StarRating
                        rating={userRating}
                        size="lg"
                        interactive
                        onRatingChange={setUserRating}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Review</label>
                      <Textarea
                        placeholder="Tell us about your experience..."
                        value={reviewMessage}
                        onChange={(e) => setReviewMessage(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    <Button onClick={handleSubmitReview} className="w-full sm:w-auto">
                      Submit Review
                    </Button>
                  </div>
                </Card>

                {/* Existing Reviews */}
                <div className="space-y-4">
                  {eventReviews.map((review, index) => (
                    <Card
                      key={review.id}
                      className="p-6 animate-fade-in-up hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.userName}</h4>
                            <p className="text-sm text-muted-foreground">{review.createdAt}</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-muted-foreground pl-15">{review.message}</p>
                    </Card>
                  ))}

                  {eventReviews.length === 0 && (
                    <div className="text-center py-12 bg-muted/30 rounded-2xl">
                      <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <Card className="p-6 shadow-elevated animate-fade-in-up overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-bl-full" />
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <IndianRupee className="w-8 h-8 text-primary" />
                    <span className="text-4xl font-bold font-heading text-foreground">
                      {event.amount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button className="w-full" size="lg">
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Get Custom Quote
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>Trusted by {event.reviewCount}+ customers</span>
                  </div>
                </Card>

                {/* Vendor Card */}
                <Card className="p-6 animate-fade-in-up stagger-2">
                  <h3 className="font-semibold mb-4">Event Organizer</h3>
                  
                  <Link to={`/vendor/${vendor.id}`} className="block group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={vendor.image} 
                          alt={vendor.organizationName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {vendor.organizationName}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span>{vendor.rating}</span>
                          <span>({vendor.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {vendor.address}, {vendor.city}, {vendor.state} - {vendor.pincode}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href={`tel:${vendor.phone}`} className="text-primary hover:underline">
                        {vendor.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href={`mailto:${vendor.email}`} className="text-primary hover:underline truncate">
                        {vendor.email}
                      </a>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to={`/vendor/${vendor.id}`}>
                      View All Events
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 text-primary-foreground flex items-center justify-center transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <img
            src={event.photos[activePhotoIndex]}
            alt="Full size"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {event.photos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setActivePhotoIndex(index); }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activePhotoIndex 
                    ? "bg-primary w-8" 
                    : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
