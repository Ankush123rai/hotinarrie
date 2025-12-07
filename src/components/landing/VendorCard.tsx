import { Link } from "react-router-dom";
import { Star, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Vendor } from "@/data/mockData";

interface VendorCardProps {
  vendor: Vendor;
  index?: number;
}

const VendorCard = ({ vendor, index = 0 }: VendorCardProps) => {
  return (
    <Link to={`/vendor/${vendor.id}`}>
      <Card
        variant="interactive"
        className="overflow-hidden animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={vendor.image}
            alt={vendor.organizationName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-semibold">{vendor.rating}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold font-heading text-lg mb-1 line-clamp-1">
            {vendor.organizationName}
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{vendor.city}, {vendor.state}</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>{vendor.phone}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <span className="text-xs text-muted-foreground">
              {vendor.reviewCount} reviews
            </span>
            <span className="text-sm font-medium text-primary">
              View Details →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VendorCard;
