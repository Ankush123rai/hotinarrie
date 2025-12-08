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
  eventId?: string;
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
    description: "Complete birthday party packages with decorations, catering, entertainment, and photography. We make every birthday special and memorable for all ages. Our team of experts will handle everything from venue setup to cake cutting, ensuring you enjoy every moment without any stress. We offer themed parties including superhero, princess, sports, and custom themes based on your preferences.",
    amount: 25000,
    photos: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.8,
    reviewCount: 89,
    createdAt: "2024-01-20",
  },
  {
    id: "e2",
    vendorId: "1",
    vendorName: "Celebrations Unlimited",
    service: "Kids Entertainment",
    description: "Fun-filled entertainment packages for children including games, magic shows, puppet shows, and interactive activities. Our professional entertainers know how to keep kids engaged and create lasting memories. From balloon artists to face painters, we have everything to make your child's party unforgettable.",
    amount: 15000,
    photos: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800",
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800",
    ],
    rating: 4.7,
    reviewCount: 56,
    createdAt: "2024-02-15",
  },
  {
    id: "e3",
    vendorId: "2",
    vendorName: "Dream Events Co.",
    service: "Weddings",
    description: "Luxury wedding planning services including venue decoration, catering, music, photography, and complete event management for your dream wedding. We specialize in both traditional and modern wedding themes, ensuring every detail reflects your unique love story. Our comprehensive packages include pre-wedding shoots, mehendi, sangeet, and reception planning.",
    amount: 500000,
    photos: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.9,
    reviewCount: 156,
    createdAt: "2024-02-25",
  },
  {
    id: "e4",
    vendorId: "2",
    vendorName: "Dream Events Co.",
    service: "Engagement Ceremony",
    description: "Beautiful engagement ceremony planning with elegant decorations, ring ceremony arrangements, and professional photography. We create romantic settings that perfectly capture this special milestone in your journey together.",
    amount: 75000,
    photos: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    ],
    rating: 4.8,
    reviewCount: 45,
    createdAt: "2024-03-01",
  },
  {
    id: "e5",
    vendorId: "3",
    vendorName: "Royal Occasions",
    service: "Corporate Events",
    description: "Professional corporate event management including conferences, seminars, product launches, and team building activities with world-class execution. We understand the importance of brand representation and ensure every event reflects your company's values and vision. Our services include AV setup, keynote speaker arrangements, and networking session management.",
    amount: 150000,
    photos: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.7,
    reviewCount: 78,
    createdAt: "2024-03-15",
  },
  {
    id: "e6",
    vendorId: "3",
    vendorName: "Royal Occasions",
    service: "Product Launch",
    description: "Grand product launch events with stunning stage setups, media coverage, influencer invitations, and immersive brand experiences. We create buzz-worthy launches that make your product the talk of the town.",
    amount: 200000,
    photos: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    ],
    rating: 4.9,
    reviewCount: 34,
    createdAt: "2024-03-20",
  },
  {
    id: "e7",
    vendorId: "4",
    vendorName: "Festive Moments",
    service: "Baby Showers",
    description: "Beautiful baby shower celebrations with themed decorations, games, catering, and photography to welcome the little one in style. We offer various themes including classic, bohemian, rustic, and custom designs. Our packages include games, favors, and keepsakes that make your celebration truly special.",
    amount: 35000,
    photos: [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800",
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800",
    ],
    rating: 4.6,
    reviewCount: 45,
    createdAt: "2024-04-10",
  },
  {
    id: "e8",
    vendorId: "4",
    vendorName: "Festive Moments",
    service: "Gender Reveal Party",
    description: "Exciting gender reveal celebrations with creative reveal ideas, decorations in pink and blue, and memorable photo opportunities. We offer unique reveal concepts including balloon releases, cake reveals, and confetti cannons.",
    amount: 25000,
    photos: [
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
    ],
    rating: 4.5,
    reviewCount: 28,
    createdAt: "2024-04-15",
  },
  {
    id: "e9",
    vendorId: "5",
    vendorName: "Grand Celebrations",
    service: "Anniversaries",
    description: "Romantic anniversary celebrations with elegant decorations, gourmet dining, live music, and memorable experiences for couples. Whether it's your first or fiftieth anniversary, we create intimate settings that rekindle your love story. Our packages include surprise elements, photo shoots, and personalized touches.",
    amount: 45000,
    photos: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    ],
    rating: 4.8,
    reviewCount: 67,
    createdAt: "2024-05-20",
  },
  {
    id: "e10",
    vendorId: "5",
    vendorName: "Grand Celebrations",
    service: "Surprise Party Planning",
    description: "Expert surprise party planning with secret coordination, stunning reveals, and unforgettable moments. We handle every detail while keeping your plans completely confidential until the big reveal.",
    amount: 30000,
    photos: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    ],
    rating: 4.7,
    reviewCount: 41,
    createdAt: "2024-05-25",
  },
  {
    id: "e11",
    vendorId: "6",
    vendorName: "Eternal Events",
    service: "Concert Organization",
    description: "Professional concert and music event organization with stage setup, sound systems, lighting, artist management, and crowd control. We have experience handling events from intimate acoustic sessions to large-scale music festivals.",
    amount: 300000,
    photos: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.6,
    reviewCount: 52,
    createdAt: "2024-06-01",
  },
  {
    id: "e12",
    vendorId: "6",
    vendorName: "Eternal Events",
    service: "Music Festival",
    description: "Complete music festival planning and execution with multiple stages, artist lineups, vendor management, and immersive experiences. We create festivals that music lovers remember for a lifetime.",
    amount: 1000000,
    photos: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    ],
    rating: 4.8,
    reviewCount: 23,
    createdAt: "2024-06-10",
  },
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    vendorId: "1",
    eventId: "e1",
    userId: "u1",
    userName: "Rahul Mehta",
    rating: 5,
    message: "Absolutely fantastic experience! They organized my daughter's birthday party and it was beyond our expectations. The decorations were stunning and the kids had a blast! The team was professional and attentive to every detail.",
    createdAt: "2024-06-15",
  },
  {
    id: "r2",
    vendorId: "1",
    eventId: "e1",
    userId: "u2",
    userName: "Sunita Verma",
    rating: 4,
    message: "Great service and professional team. The event was well-managed and everyone enjoyed it. Would recommend for birthday parties. Minor delays in setup but overall excellent experience.",
    createdAt: "2024-06-10",
  },
  {
    id: "r3",
    vendorId: "2",
    eventId: "e3",
    userId: "u3",
    userName: "Karan Singh",
    rating: 5,
    message: "Dream Events made our wedding truly magical. Every detail was perfect and our guests couldn't stop complimenting the arrangements. From the mandap decoration to the reception setup, everything was flawless.",
    createdAt: "2024-05-28",
  },
  {
    id: "r4",
    vendorId: "2",
    eventId: "e3",
    userId: "u4",
    userName: "Meera Kapoor",
    rating: 5,
    message: "The best decision we made for our wedding was hiring Dream Events. They understood our vision perfectly and executed it beautifully. The coordination was seamless and stress-free.",
    createdAt: "2024-05-20",
  },
  {
    id: "r5",
    vendorId: "3",
    eventId: "e5",
    userId: "u5",
    userName: "Arjun Reddy",
    rating: 5,
    message: "Our corporate event was handled with utmost professionalism. Royal Occasions exceeded our expectations in every way. The AV setup was flawless and the catering was excellent.",
    createdAt: "2024-04-15",
  },
  {
    id: "r6",
    vendorId: "4",
    eventId: "e7",
    userId: "u6",
    userName: "Priyanka Das",
    rating: 4,
    message: "Lovely baby shower arrangements! The theme was adorable and the games were fun. Everyone had a great time. Would have liked more variety in the menu options.",
    createdAt: "2024-04-20",
  },
  {
    id: "r7",
    vendorId: "5",
    eventId: "e9",
    userId: "u7",
    userName: "Vikash Sharma",
    rating: 5,
    message: "Celebrated our 25th anniversary with Grand Celebrations and it was perfect! The romantic setup, the music, everything was exactly what we wanted. Thank you for making it special.",
    createdAt: "2024-06-01",
  },
  {
    id: "r8",
    vendorId: "6",
    eventId: "e11",
    userId: "u8",
    userName: "Aditya Nair",
    rating: 4,
    message: "Great concert organization! The sound quality was excellent and the crowd management was professional. Looking forward to more events by Eternal Events.",
    createdAt: "2024-06-20",
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