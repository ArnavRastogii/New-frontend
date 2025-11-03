import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Building, Users, Calendar, Plus, Edit, Trash2, Upload, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { toast } from 'sonner';

export const NgoDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    volunteersNeeded: '',
    date: '',
    skills: '',
  });

  const [opportunities, setOpportunities] = useState([
    {
      id: '1',
      title: 'Teaching Program',
      category: 'education',
      location: 'Mumbai',
      volunteersNeeded: 10,
      volunteersJoined: 7,
      status: 'Active',
      date: '2025-11-15',
    },
    {
      id: '2',
      title: 'Community Outreach',
      category: 'community',
      location: 'Delhi',
      volunteersNeeded: 15,
      volunteersJoined: 15,
      status: 'Completed',
      date: '2025-10-20',
    },
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  }, [navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success('Organization logo updated!');
    }
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    const opportunity = {
      id: Date.now().toString(),
      ...newOpportunity,
      volunteersNeeded: parseInt(newOpportunity.volunteersNeeded),
      volunteersJoined: 0,
      status: 'Active',
    };
    setOpportunities([opportunity, ...opportunities]);
    setNewOpportunity({
      title: '',
      category: '',
      location: '',
      description: '',
      volunteersNeeded: '',
      date: '',
      skills: '',
    });
    setIsDialogOpen(false);
    toast.success('Opportunity created successfully!');
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities(opportunities.filter(opp => opp.id !== id));
    toast.success('Opportunity deleted successfully!');
  };

  const stats = [
    { label: 'Active Opportunities', value: opportunities.filter(o => o.status === 'Active').length.toString(), icon: <Calendar className="w-5 h-5" /> },
    { label: 'Total Volunteers', value: '47', icon: <Users className="w-5 h-5" /> },
    { label: 'Completed Projects', value: opportunities.filter(o => o.status === 'Completed').length.toString(), icon: <Calendar className="w-5 h-5" /> },
    { label: 'Impact Score', value: '92%', icon: <Building className="w-5 h-5" /> },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#2e7d32] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              NGO Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-[#2e7d32]">Create New Opportunity</DialogTitle>
                <DialogDescription>
                  Post a new volunteer opportunity for your organization
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateOpportunity} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="opp-title">Opportunity Title</Label>
                  <Input
                    id="opp-title"
                    value={newOpportunity.title}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                    placeholder="e.g., Teaching Program"
                    className="rounded-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="opp-category">Category</Label>
                    <Select
                      value={newOpportunity.category}
                      onValueChange={(value) => setNewOpportunity({ ...newOpportunity, category: value })}
                    >
                      <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                        <SelectItem value="community">Community Development</SelectItem>
                        <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="opp-location">Location</Label>
                    <Input
                      id="opp-location"
                      value={newOpportunity.location}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, location: e.target.value })}
                      placeholder="City, Country"
                      className="rounded-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="opp-volunteers">Volunteers Needed</Label>
                    <Input
                      id="opp-volunteers"
                      type="number"
                      value={newOpportunity.volunteersNeeded}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, volunteersNeeded: e.target.value })}
                      placeholder="10"
                      className="rounded-full"
                      required
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="opp-date">Start Date</Label>
                    <Input
                      id="opp-date"
                      type="date"
                      value={newOpportunity.date}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, date: e.target.value })}
                      className="rounded-full"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="opp-skills">Required Skills (comma separated)</Label>
                  <Input
                    id="opp-skills"
                    value={newOpportunity.skills}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, skills: e.target.value })}
                    placeholder="Teaching, Communication, Patience"
                    className="rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="opp-description">Description</Label>
                  <Textarea
                    id="opp-description"
                    value={newOpportunity.description}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                    placeholder="Describe the opportunity, responsibilities, and impact..."
                    className="rounded-lg min-h-24"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                >
                  Create Opportunity
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl text-[#2e7d32]">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-3">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="profile">Organization Profile</TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">Your Opportunities</CardTitle>
                <CardDescription>Manage your posted volunteer opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="border-l-4 border-l-[#2e7d32]">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg text-[#2e7d32]">{opportunity.title}</h3>
                              <Badge
                                variant={opportunity.status === 'Active' ? 'default' : 'secondary'}
                                className={opportunity.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                              >
                                {opportunity.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                              <div>
                                <p className="text-sm text-gray-600">Category</p>
                                <p className="text-sm">{opportunity.category}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Location</p>
                                <p className="text-sm">{opportunity.location}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Volunteers</p>
                                <p className="text-sm">
                                  {opportunity.volunteersJoined}/{opportunity.volunteersNeeded}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Date</p>
                                <p className="text-sm">{new Date(opportunity.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-500 hover:bg-red-50 rounded-full"
                              onClick={() => handleDeleteOpportunity(opportunity.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">Active Volunteers</CardTitle>
                <CardDescription>Manage volunteers enrolled in your programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Card key={v} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-[#2e7d32] text-white">
                              V{v}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-lg">Volunteer Name {v}</h3>
                            <p className="text-sm text-gray-600">Teaching Program • 12 hours completed</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">Teaching</Badge>
                              <Badge variant="outline" className="text-xs">Communication</Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                          >
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">Organization Profile</CardTitle>
                <CardDescription>Manage your organization information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage src={profileImage} />
                        <AvatarFallback className="bg-[#2e7d32] text-white text-3xl">
                          <Building className="w-16 h-16" />
                        </AvatarFallback>
                      </Avatar>
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 text-[#2e7d32] hover:underline">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Logo</span>
                        </div>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="w-4 h-4 text-[#2e7d32]" />
                          <span className="text-sm text-gray-600">Organization Name</span>
                        </div>
                        <p className="text-lg">{user.name}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-[#2e7d32]" />
                          <span className="text-sm text-gray-600">Email</span>
                        </div>
                        <p className="text-lg">{user.email}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-[#2e7d32]" />
                          <span className="text-sm text-gray-600">Phone</span>
                        </div>
                        <p className="text-lg">+1 (234) 567-890</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-[#2e7d32]" />
                          <span className="text-sm text-gray-600">Location</span>
                        </div>
                        <p className="text-lg">Mumbai, India</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-4 h-4 text-[#2e7d32]" />
                          <span className="text-sm text-gray-600">Website</span>
                        </div>
                        <p className="text-lg">www.greenearth.org</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="w-4 h-4 text-[#2e7d32]" />
                          <span className="text-sm text-gray-600">About Organization</span>
                        </div>
                        <p className="text-gray-700">
                          We are a non-profit organization dedicated to environmental conservation 
                          and community development. Since 2010, we've been working to create 
                          sustainable solutions for a better tomorrow.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
