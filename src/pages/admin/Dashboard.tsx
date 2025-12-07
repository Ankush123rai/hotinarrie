import { Building2, Calendar, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockVendors, mockEvents } from "@/data/mockData";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Vendors",
      value: mockVendors.length,
      icon: Building2,
      change: "+12%",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Events",
      value: mockEvents.length,
      icon: Calendar,
      change: "+8%",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Reviews",
      value: mockVendors.reduce((acc, v) => acc + v.reviewCount, 0),
      icon: Users,
      change: "+23%",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Avg. Rating",
      value: (mockVendors.reduce((acc, v) => acc + v.rating, 0) / mockVendors.length).toFixed(1),
      icon: TrendingUp,
      change: "+5%",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            variant="gradient"
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold font-heading mt-1">{stat.value}</p>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in-up stagger-2">
          <CardHeader>
            <CardTitle>Recent Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVendors.slice(0, 5).map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={vendor.image}
                    alt={vendor.organizationName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{vendor.organizationName}</p>
                    <p className="text-sm text-muted-foreground">{vendor.city}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">⭐ {vendor.rating}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up stagger-3">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={event.photos[0]}
                    alt={event.service}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.service}</p>
                    <p className="text-sm text-muted-foreground">{event.vendorName}</p>
                  </div>
                  <span className="text-sm font-semibold">₹{event.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
