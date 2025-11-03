import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { User, Calendar, Award, Clock, Edit, Upload, MapPin, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    bio: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setEditFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '+1 (234) 567-890',
      location: parsedUser.location || 'Mumbai, India',
      skills: parsedUser.skills || 'Teaching, Web Development, Communication',
      bio: parsedUser.bio || 'Passionate volunteer looking to make a positive impact in the community.',
    });
  }, [navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success('Profile picture updated!');
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...editFormData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const myOpportunities = [
    {
      id: '1',
      title: 'Teaching Underprivileged Children',
      organization: 'Education for All',
      status: 'Active',
      hoursCompleted: 12,
      totalHours: 20,
      nextSession: '2025-11-10',
    },
    {
      id: '2',
      title: 'Beach Cleanup Drive',
      organization: 'Green Earth Foundation',
      status: 'Completed',
      hoursCompleted: 8,
      totalHours: 8,
      nextSession: null,
    },
    {
      id: '3',
      title: 'Medical Camp Organization',
      organization: 'Health for Everyone',
      status: 'Upcoming',
      hoursCompleted: 0,
      totalHours: 15,
      nextSession: '2025-11-25',
    },
  ];

  const stats = [
    { label: 'Total Hours', value: '142', icon: <Clock className="w-5 h-5" /> },
    { label: 'Opportunities Joined', value: '12', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Certificates Earned', value: '5', icon: <Award className="w-5 h-5" /> },
    { label: 'Impact Score', value: '89%', icon: <Award className="w-5 h-5" /> },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-[#2e7d32] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Volunteer Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
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
            <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">Active & Upcoming Opportunities</CardTitle>
                <CardDescription>Track your volunteer commitments and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="border-l-4 border-l-[#2e7d32]">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg text-[#2e7d32]">{opportunity.title}</h3>
                              <Badge
                                variant={
                                  opportunity.status === 'Active'
                                    ? 'default'
                                    : opportunity.status === 'Completed'
                                    ? 'secondary'
                                    : 'outline'
                                }
                                className={
                                  opportunity.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : ''
                                }
                              >
                                {opportunity.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{opportunity.organization}</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="text-[#2e7d32]">
                                  {opportunity.hoursCompleted}/{opportunity.totalHours} hours
                                </span>
                              </div>
                              <Progress
                                value={(opportunity.hoursCompleted / opportunity.totalHours) * 100}
                                className="h-2"
                              />
                            </div>
                            
                            {opportunity.nextSession && (
                              <p className="text-sm text-gray-600 mt-2">
                                <Calendar className="inline w-4 h-4 mr-1" />
                                Next session: {new Date(opportunity.nextSession).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          
                          <Button
                            variant="outline"
                            className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    onClick={() => navigate('/opportunities')}
                    className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                  >
                    Browse More Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#2e7d32]">My Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center">
                        <Avatar className="w-32 h-32 mb-4">
                          <AvatarImage src={profileImage} />
                          <AvatarFallback className="bg-[#2e7d32] text-white text-3xl">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <label htmlFor="profile-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 text-[#2e7d32] hover:underline">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Upload Photo</span>
                          </div>
                          <input
                            id="profile-upload"
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
                            <User className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Full Name</span>
                          </div>
                          <p className="text-lg">{editFormData.name}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Email</span>
                          </div>
                          <p className="text-lg">{editFormData.email}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Phone</span>
                          </div>
                          <p className="text-lg">{editFormData.phone}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Location</span>
                          </div>
                          <p className="text-lg">{editFormData.location}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {editFormData.skills.split(',').map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Bio</span>
                          </div>
                          <p className="text-gray-700">{editFormData.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input
                          id="edit-name"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="rounded-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                          className="rounded-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Phone</Label>
                        <Input
                          id="edit-phone"
                          value={editFormData.phone}
                          onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                          className="rounded-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                          id="edit-location"
                          value={editFormData.location}
                          onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                          className="rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-skills">Skills (comma separated)</Label>
                      <Input
                        id="edit-skills"
                        value={editFormData.skills}
                        onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
                        className="rounded-full"
                        placeholder="Teaching, Web Development, Communication"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-bio">Bio</Label>
                      <Input
                        id="edit-bio"
                        value={editFormData.bio}
                        onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                        className="rounded-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                    >
                      Save Changes
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">My Certificates</CardTitle>
                <CardDescription>View and download your earned certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5].map((cert) => (
                    <Card key={cert} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                            <Award className="w-8 h-8 text-[#2e7d32]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg text-[#2e7d32] mb-1">Volunteer Excellence</h3>
                            <p className="text-sm text-gray-600 mb-2">Teaching Program - 2025</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                            >
                              Download
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
        </Tabs>
      </div>
    </div>
  );
};
