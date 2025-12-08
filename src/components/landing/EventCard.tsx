import { Link } from "react-router-dom";
import { Star, IndianRupee, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventService } from "@/data/mockData";

interface EventCardProps {
  event: EventService;
  index?: number;
  showVendor?: boolean;
}

const EventCard = ({ event, index = 0, showVendor = true }: EventCardProps) => {
  return (
    <Link to={`/event/${event.id}`}>
      <Card 
        className="group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={event.photos[0]} 
            alt={event.service}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Video Indicator */}
          {event.videoUrl && (
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-4 h-4 text-accent-foreground fill-current ml-0.5" />
            </div>
          )}
          
          {/* Service Badge */}
          <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
            {event.service}
          </Badge>
          
          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-primary-foreground text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {event.service}
            </h3>
            {showVendor && (
              <p className="text-primary-foreground/80 text-sm">
                by {event.vendorName}
              </p>
            )}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium text-sm">{event.rating}</span>
              <span className="text-muted-foreground text-sm">({event.reviewCount})</span>
            </div>
            <div className="flex items-center text-primary font-bold">
              <IndianRupee className="w-4 h-4" />
              <span>{event.amount.toLocaleString()}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {event.description}
          </p>
          
          {/* Hover indicator */}
          <div className="mt-4 flex items-center justify-center">
            <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;