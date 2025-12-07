export interface Vendor {
  id: string;
  organizationName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  state: string;
  city: string;
  gstNo?: string;
  rating: number;
  reviewCount: number;
  image: string;
  createdAt: string;
}

export interface EventService {
  id: string;
  vendorId: string;
  vendorName: string;
  service: string;
  description: string;
  amount: number;
  photos: string[];
  videoUrl?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  vendorId: string;
  userId: string;
  userName: string;
  rating: number;
  message: string;
  createdAt: string;
}

export const services = [
  { id: "birthday", name: "Birthday Parties", icon: "🎂", color: "bg-pink-100 text-pink-600" },
  { id: "wedding", name: "Weddings", icon: "💒", color: "bg-rose-100 text-rose-600" },
  { id: "anniversary", name: "Anniversaries", icon: "💑", color: "bg-red-100 text-red-600" },
  { id: "baby-shower", name: "Baby Showers", icon: "👶", color: "bg-blue-100 text-blue-600" },
  { id: "corporate", name: "Corporate Events", icon: "🏢", color: "bg-slate-100 text-slate-600" },
  { id: "graduation", name: "Graduation", icon: "🎓", color: "bg-purple-100 text-purple-600" },
  { id: "engagement", name: "Engagement", icon: "💍", color: "bg-amber-100 text-amber-600" },
  { id: "housewarming", name: "Housewarming", icon: "🏠", color: "bg-green-100 text-green-600" },
  { id: "retirement", name: "Retirement", icon: "🌴", color: "bg-teal-100 text-teal-600" },
  { id: "concert", name: "Concerts", icon: "🎵", color: "bg-indigo-100 text-indigo-600" },
  { id: "exhibition", name: "Exhibitions", icon: "🎨", color: "bg-orange-100 text-orange-600" },
  { id: "sports", name: "Sports Events", icon: "⚽", color: "bg-emerald-100 text-emerald-600" },
];

export const mockVendors: Vendor[] = [
  {
    id: "1",
    organizationName: "Celebrations Unlimited",
    ownerName: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "info@celebrationsunlimited.com",
    address: "123 Event Street, Sector 15",
    pincode: "110001",
    state: "Delhi",
    city: "New Delhi",
    gstNo: "07AAACR1234F1ZP",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    organizationName: "Dream Events Co.",
    ownerName: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "hello@dreamevents.in",
    address: "456 Party Avenue, Andheri West",
    pincode: "400053",
    state: "Maharashtra",
    city: "Mumbai",
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    organizationName: "Royal Occasions",
    ownerName: "Vikram Singh",
    phone: "+91 76543 21098",
    email: "contact@royaloccasions.com",
    address: "789 Celebration Road, Jayanagar",
    pincode: "560041",
    state: "Karnataka",
    city: "Bangalore",
    gstNo: "29AABCR5678G1ZQ",
    rating: 4.9,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    organizationName: "Festive Moments",
    ownerName: "Ananya Reddy",
    phone: "+91 65432 10987",
    email: "book@festivemoments.in",
    address: "321 Joy Lane, Banjara Hills",
    pincode: "500034",
    state: "Telangana",
    city: "Hyderabad",
    rating: 4.5,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    organizationName: "Grand Celebrations",
    ownerName: "Amit Patel",
    phone: "+91 54321 09876",
    email: "info@grandcelebrations.com",
    address: "567 Festival Street, Satellite",
    pincode: "380015",
    state: "Gujarat",
    city: "Ahmedabad",
    gstNo: "24AABCG9012H1ZR",
    rating: 4.7,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    createdAt: "2024-05-12",
  },
  {
    id: "6",
    organizationName: "Eternal Events",
    ownerName: "Sneha Joshi",
    phone: "+91 43210 98765",
    email: "hello@eternalevents.in",
    address: "890 Memory Lane, Koregaon Park",
    pincode: "411001",
    state: "Maharashtra",
    city: "Pune",
    rating: 4.4,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    createdAt: "2024-06-18",
  },
];

export const mockEvents: EventService[] = [
  {
    id: "e1",
    vendorId: "1",
    vendorName: "Celebrations Unlimited",
    service: "Birthday Parties",
    description: "Complete birthday party packages with decorations, catering, entertainment, and photography. We make every birthday special and memorable for all ages.",
    amount: 25000,
    photos: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.8,
    reviewCount: 89,
    createdAt: "2024-01-20",
  },
  {
    id: "e2",
    vendorId: "2",
    vendorName: "Dream Events Co.",
    service: "Weddings",
    description: "Luxury wedding planning services including venue decoration, catering, music, photography, and complete event management for your dream wedding.",
    amount: 500000,
    photos: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    ],
    rating: 4.9,
    reviewCount: 156,
    createdAt: "2024-02-25",
  },
  {
    id: "e3",
    vendorId: "3",
    vendorName: "Royal Occasions",
    service: "Corporate Events",
    description: "Professional corporate event management including conferences, seminars, product launches, and team building activities with world-class execution.",
    amount: 150000,
    photos: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    ],
    rating: 4.7,
    reviewCount: 78,
    createdAt: "2024-03-15",
  },
  {
    id: "e4",
    vendorId: "4",
    vendorName: "Festive Moments",
    service: "Baby Showers",
    description: "Beautiful baby shower celebrations with themed decorations, games, catering, and photography to welcome the little one in style.",
    amount: 35000,
    photos: [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800",
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800",
    ],
    rating: 4.6,
    reviewCount: 45,
    createdAt: "2024-04-10",
  },
  {
    id: "e5",
    vendorId: "5",
    vendorName: "Grand Celebrations",
    service: "Anniversaries",
    description: "Romantic anniversary celebrations with elegant decorations, gourmet dining, live music, and memorable experiences for couples.",
    amount: 45000,
    photos: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
    ],
    rating: 4.8,
    reviewCount: 67,
    createdAt: "2024-05-20",
  },
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    vendorId: "1",
    userId: "u1",
    userName: "Rahul Mehta",
    rating: 5,
    message: "Absolutely fantastic experience! They organized my daughter's birthday party and it was beyond our expectations. The decorations were stunning and the kids had a blast!",
    createdAt: "2024-06-15",
  },
  {
    id: "r2",
    vendorId: "1",
    userId: "u2",
    userName: "Sunita Verma",
    rating: 4,
    message: "Great service and professional team. The event was well-managed and everyone enjoyed it. Would recommend for birthday parties.",
    createdAt: "2024-06-10",
  },
  {
    id: "r3",
    vendorId: "2",
    userId: "u3",
    userName: "Karan Singh",
    rating: 5,
    message: "Dream Events made our wedding truly magical. Every detail was perfect and our guests couldn't stop complimenting the arrangements.",
    createdAt: "2024-05-28",
  },
];

export const cities = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export const states = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Telangana",
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
];
