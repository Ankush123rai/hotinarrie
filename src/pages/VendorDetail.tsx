import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Play, X } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StarRating from "@/components/landing/StarRating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { mockVendors, mockEvents, mockReviews } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const VendorDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");

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

  const allPhotos = vendorEvents.flatMap((e) => e.photos);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={vendor.image}
                alt={vendor.organizationName}
                className="w-full h-full object-cover"
              />
              {vendorEvents[0]?.videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/30 hover:bg-foreground/40 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                  </div>
                </button>
              )}
            </div>

            {allPhotos.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {allPhotos.slice(0, 4).map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(photo)}
                    className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={photo}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="animate-fade-in-up stagger-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                  {vendor.organizationName}
                </h1>
                <p className="text-muted-foreground">Owned by {vendor.ownerName}</p>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-bold text-lg">{vendor.rating}</span>
                <span className="text-muted-foreground text-sm">({vendor.reviewCount})</span>
              </div>
            </div>

            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    {vendor.address}, {vendor.city}, {vendor.state} - {vendor.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{vendor.email}</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="hero" size="lg" className="flex-1">
                Contact Now
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Get Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Services */}
        {vendorEvents.length > 0 && (
          <section className="mb-12 animate-fade-in-up stagger-3">
            <h2 className="text-2xl font-bold font-heading mb-6">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {vendorEvents.map((event) => (
                <Card key={event.id} variant="gradient" className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{event.service}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                    </div>
                    <span className="text-xl font-bold text-primary">
                      ₹{event.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={event.rating} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      ({event.reviewCount} reviews)
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-6">Reviews & Ratings</h2>

          {/* Add Review */}
          <Card className="p-6 mb-8 animate-fade-in-up">
            <h3 className="font-semibold mb-4">Add Your Review</h3>
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
                  placeholder="Share your experience..."
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </div>
          </Card>

          {/* Existing Reviews */}
          <div className="space-y-4">
            {vendorReviews.map((review, index) => (
              <Card
                key={review.id}
                className="p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <p className="text-sm text-muted-foreground">{review.createdAt}</p>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-muted-foreground">{review.message}</p>
              </Card>
            ))}

            {vendorReviews.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-background hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}

      {/* Video Modal */}
      {showVideo && vendorEvents[0]?.videoUrl && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            className="absolute top-4 right-4 text-background hover:text-primary transition-colors"
            onClick={() => setShowVideo(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={vendorEvents[0].videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetail;
