import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockEvents, mockVendors, services, EventService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventService[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventService | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const [formData, setFormData] = useState({
    vendorId: "",
    service: "",
    description: "",
    amount: "",
    videoUrl: "",
  });

  const filteredEvents = events.filter(
    (event) =>
      event.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      vendorId: "",
      service: "",
      description: "",
      amount: "",
      videoUrl: "",
    });
    setPhotoUrls([]);
    setNewPhotoUrl("");
    setEditingEvent(null);
  };

  const handleEdit = (event: EventService) => {
    setEditingEvent(event);
    setFormData({
      vendorId: event.vendorId,
      service: event.service,
      description: event.description,
      amount: event.amount.toString(),
      videoUrl: event.videoUrl || "",
    });
    setPhotoUrls(event.photos);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    toast({
      title: "Event deleted",
      description: "The event has been removed successfully.",
    });
  };

  const addPhotoUrl = () => {
    if (newPhotoUrl.trim()) {
      setPhotoUrls([...photoUrls, newPhotoUrl.trim()]);
      setNewPhotoUrl("");
    }
  };

  const removePhotoUrl = (index: number) => {
    setPhotoUrls(photoUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const vendor = mockVendors.find((v) => v.id === formData.vendorId);
    if (!vendor) return;

    if (editingEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === editingEvent.id
            ? {
                ...ev,
                vendorId: formData.vendorId,
                vendorName: vendor.organizationName,
                service: formData.service,
                description: formData.description,
                amount: parseFloat(formData.amount),
                photos: photoUrls,
                videoUrl: formData.videoUrl || undefined,
              }
            : ev
        )
      );
      toast({
        title: "Event updated",
        description: "The event has been updated successfully.",
      });
    } else {
      const newEvent: EventService = {
        id: Date.now().toString(),
        vendorId: formData.vendorId,
        vendorName: vendor.organizationName,
        service: formData.service,
        description: formData.description,
        amount: parseFloat(formData.amount),
        photos: photoUrls,
        videoUrl: formData.videoUrl || undefined,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setEvents([newEvent, ...events]);
      toast({
        title: "Event created",
        description: "The new event has been created successfully.",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold font-heading">Events</h1>
          <p className="text-muted-foreground mt-1">Manage your event services</p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorId">Organizer *</Label>
                  <Select
                    value={formData.vendorId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, vendorId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organizer" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.organizationName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Type *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.icon} {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                />
              </div>

              {/* Photo URLs */}
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter photo URL..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={addPhotoUrl}>
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                {photoUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {photoUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhotoUrl(index)}
                          className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">YouTube Video URL (Optional)</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://www.youtube.com/embed/..."
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gradient">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="mb-6 animate-fade-in-up stagger-1">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search events by service or vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="animate-fade-in-up stagger-2">
        <CardHeader>
          <CardTitle>All Events ({filteredEvents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Organizer</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={event.photos[0]}
                          alt={event.service}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{event.service}</span>
                      </div>
                    </TableCell>
                    <TableCell>{event.vendorName}</TableCell>
                    <TableCell>
                      <span className="line-clamp-2 max-w-xs">{event.description}</span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{event.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">⭐ {event.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">
                        ({event.reviewCount})
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(event)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
