import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Award, 
  Heart, 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Star,
  MapPin,
  Calendar,
  Zap,
  Shield,
  Lightbulb,
  Rocket,
  Send,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers", color: "text-primary" },
    { icon: Award, value: "500+", label: "Event Partners", color: "text-accent" },
    { icon: Calendar, value: "5,000+", label: "Events Organized", color: "text-primary" },
    { icon: MapPin, value: "50+", label: "Cities Covered", color: "text-accent" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make starts with understanding our customers' needs and exceeding their expectations."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in building lasting relationships through honest communication and reliable service."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly evolving our platform to bring you the best event planning experience."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We partner only with verified, top-rated vendors who share our commitment to quality."
    },
  ];

  const features = [
    "Verified event organizers with background checks",
    "Real customer reviews and ratings",
    "Secure booking and payment options",
    "24/7 customer support",
    "Customizable event packages",
    "Pan-India coverage with local expertise",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">About Hostinarrie</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
              Turning <span className="text-gradient">Dreams</span> Into
              <br />
              Unforgettable <span className="text-gradient">Events</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Founded with a vision to revolutionize event planning in India, Hostinarrie connects you 
              with the finest event organizers to create magical experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-background shadow-card flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />
                <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-elevated">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                    alt="Ritesh Singh - Founder"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold font-heading">Ritesh Singh</h3>
                    <p className="text-white/80">Founder & CEO</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-background rounded-2xl shadow-elevated p-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Visionary Leader</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-elevated p-4 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-accent" />
                  <span className="font-medium text-sm">Tech Innovator</span>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                A Vision to <span className="text-gradient">Simplify</span> Event Planning
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-semibold">Ritesh Singh</span> founded Hostinarrie 
                  with a simple yet powerful idea: make event planning accessible, transparent, and delightful 
                  for everyone across India.
                </p>
                
                <p>
                  Having experienced the challenges of organizing events firsthand — from finding reliable 
                  vendors to comparing prices and reading genuine reviews — Ritesh envisioned a platform 
                  that would bridge the gap between customers and quality event organizers.
                </p>
                
                <p>
                  <span className="text-foreground font-semibold">Our Platform Logic:</span> We've built 
                  an ecosystem where verified vendors showcase their work, customers share honest feedback, 
                  and everyone benefits from transparency. Whether you're planning an intimate birthday 
                  celebration or a grand wedding, Hostinarrie empowers you with all the information and 
                  tools you need to make confident decisions.
                </p>
                
                <p>
                  <span className="text-foreground font-semibold">User Interaction:</span> Browse through 
                  curated event organizers, explore their portfolios with stunning photos and videos, 
                  read real customer reviews, compare packages, and connect directly — all in one place. 
                  Our intuitive design ensures you spend less time searching and more time celebrating.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="gradient" asChild>
                  <Link to="/services">
                    Start Exploring
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              What Drives <span className="text-gradient">Us</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every aspect of Hostinarrie, from how we build our platform 
              to how we support our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className={`group border-0 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Why Hostinarrie</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Why Thousands <span className="text-gradient">Trust Us</span>
              </h2>
              
              <p className="text-muted-foreground mb-8">
                We're committed to making your event planning journey smooth, transparent, and enjoyable. 
                Here's what sets us apart:
              </p>

              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400"
                      alt="Wedding"
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400"
                      alt="Birthday"
                      className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
                      alt="Corporate"
                      className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
                      alt="Party"
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-muted/30" id="contact">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Get In Touch</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Let's <span className="text-gradient">Connect</span>
              </h2>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have questions about our services? Want to partner with us? Or just want to say hello? 
                We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-card hover:shadow-elevated transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email Us</div>
                    <div className="text-muted-foreground text-sm">hello@hostinarrie.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-card hover:shadow-elevated transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Call Us</div>
                    <div className="text-muted-foreground text-sm">+91 98765 43210</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-card hover:shadow-elevated transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Visit Us</div>
                    <div className="text-muted-foreground text-sm">Main Road, 11, 9th Cross, 16th Main Rd, Tavarekere, BTM 1st Stage, Bengaluru, Karnataka 560029</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <Card className="border-0 shadow-elevated overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold font-heading mb-6 text-foreground">Send us a Message</h3>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="bg-background"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your event or inquiry..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        className="bg-background resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Ready to Create <span className="text-gradient">Magic</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who trusted Hostinarrie for their special occasions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/services">
                Find Event Organizers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/register">Join as Partner</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
