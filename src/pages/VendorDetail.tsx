import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Play, X, Building2, Calendar, Award, CheckCircle } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StarRating from "@/components/landing/StarRating";
import EventCard from "@/components/landing/EventCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { mockVendors, mockEvents, mockReviews } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const VendorDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const vendor = mockVendors.find((v) => v.id === id);
  const vendorEvents = mockEvents.filter((e) => e.vendorId === id);
  const vendorReviews = mockReviews.filter((r) => r.vendorId === id);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Vendor not found</h1>
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

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const allPhotos = vendorEvents.flatMap((e) => e.photos);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={vendor.image}
            alt={vendor.organizationName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container">
              <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge className="bg-primary/90 backdrop-blur-sm animate-fade-in">
                  <Award className="w-3 h-3 mr-1" />
                  Verified Vendor
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground animate-fade-in stagger-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {vendorEvents.length} Events
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary-foreground mb-3 animate-fade-in-up">
                {vendor.organizationName}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90 animate-fade-in-up stagger-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold text-lg">{vendor.rating}</span>
                  <span className="text-primary-foreground/70">({vendor.reviewCount} reviews)</span>
                </div>
                <span className="hidden md:block w-1 h-1 rounded-full bg-primary-foreground/50" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.city}, {vendor.state}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <section className="animate-fade-in-up">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <span className="w-12 h-1 bg-primary rounded-full" />
                  About {vendor.organizationName}
                </h2>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="p-6 text-center hover-lift">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl gradient-primary flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground">{vendorEvents.length}+</h4>
                    <p className="text-sm text-muted-foreground">Events Organized</p>
                  </Card>
                  
                  <Card className="p-6 text-center hover-lift">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-accent flex items-center justify-center">
                      <Star className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground">{vendor.rating}</h4>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </Card>
                  
                  <Card className="p-6 text-center hover-lift">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-secondary flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-secondary-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground">5+</h4>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </Card>
                </div>
              </section>

              {/* Events - No Popup, Direct Navigation */}
              {vendorEvents.length > 0 && (
                <section className="animate-fade-in-up stagger-2">
                  <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <span className="w-12 h-1 bg-accent rounded-full" />
                    Our Events & Services
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {vendorEvents.map((event, index) => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        index={index}
                        showVendor={false}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Photo Gallery */}
              {allPhotos.length > 0 && (
                <section className="animate-fade-in-up stagger-3">
                  <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <span className="w-12 h-1 bg-primary rounded-full" />
                    Photo Gallery
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allPhotos.slice(0, 6).map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => openLightbox(photo)}
                        className="group relative aspect-square rounded-xl overflow-hidden"
                      >
                        <img
                          src={photo}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                            View
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

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
                  {vendorReviews.map((review, index) => (
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
                      <p className="text-muted-foreground">{review.message}</p>
                    </Card>
                  ))}

                  {vendorReviews.length === 0 && (
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
                {/* Contact Card */}
                <Card className="p-6 shadow-elevated animate-fade-in-up overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-bl-full" />
                  
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-foreground">
                          {vendor.address}, {vendor.city}, {vendor.state} - {vendor.pincode}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a href={`tel:${vendor.phone}`} className="font-medium text-primary hover:underline">
                          {vendor.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${vendor.email}`} className="font-medium text-primary hover:underline">
                          {vendor.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full" size="lg">
                      Contact Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Get Quote
                    </Button>
                  </div>
                </Card>

                {/* Owner Info */}
                <Card className="p-6 animate-fade-in-up stagger-2">
                  <h3 className="font-semibold mb-4">Business Owner</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {vendor.ownerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{vendor.ownerName}</h4>
                      <p className="text-sm text-muted-foreground">Owner & Manager</p>
                    </div>
                  </div>
                  {vendor.gstNo && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">GST Number</p>
                      <p className="font-mono text-sm">{vendor.gstNo}</p>
                    </div>
                  )}
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
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center animate-fade-in p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 text-primary-foreground flex items-center justify-center transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default VendorDetail;
