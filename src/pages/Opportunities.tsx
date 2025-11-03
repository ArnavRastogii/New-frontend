import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  description: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  date: string;
  skills: string[];
}

export const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - Replace with API call
    const mockOpportunities: Opportunity[] = [
      {
        id: '1',
        title: 'Teaching Underprivileged Children',
        organization: 'Education for All',
        category: 'education',
        location: 'Mumbai, India',
        description: 'Help teach basic mathematics and English to children from underprivileged communities. Make a lasting impact on young minds.',
        volunteersNeeded: 10,
        volunteersJoined: 7,
        date: '2025-11-15',
        skills: ['Teaching', 'Communication', 'Patience'],
      },
      {
        id: '2',
        title: 'Beach Cleanup Drive',
        organization: 'Green Earth Foundation',
        category: 'environment',
        location: 'Goa, India',
        description: 'Join us for a weekend beach cleanup initiative. Help protect marine life and keep our beaches clean.',
        volunteersNeeded: 50,
        volunteersJoined: 32,
        date: '2025-11-20',
        skills: ['Physical Fitness', 'Team Work'],
      },
      {
        id: '3',
        title: 'Medical Camp Organization',
        organization: 'Health for Everyone',
        category: 'healthcare',
        location: 'Delhi, India',
        description: 'Assist in organizing a free medical camp for rural communities. Help with registration, crowd management, and basic first aid.',
        volunteersNeeded: 15,
        volunteersJoined: 8,
        date: '2025-11-25',
        skills: ['Healthcare', 'Organization', 'Communication'],
      },
      {
        id: '4',
        title: 'Animal Shelter Support',
        organization: 'Paws & Care',
        category: 'animal-welfare',
        location: 'Bangalore, India',
        description: 'Help care for rescued animals at our shelter. Tasks include feeding, cleaning, and providing companionship to animals.',
        volunteersNeeded: 8,
        volunteersJoined: 5,
        date: '2025-11-18',
        skills: ['Animal Care', 'Compassion', 'Physical Work'],
      },
      {
        id: '5',
        title: 'Community Center Development',
        organization: 'Build Together',
        category: 'community',
        location: 'Chennai, India',
        description: 'Help build and renovate community centers in rural areas. Construction experience is a plus but not required.',
        volunteersNeeded: 20,
        volunteersJoined: 12,
        date: '2025-12-01',
        skills: ['Construction', 'Team Work', 'Physical Fitness'],
      },
      {
        id: '6',
        title: 'Disaster Relief Training',
        organization: 'Rapid Response Team',
        category: 'disaster-relief',
        location: 'Kolkata, India',
        description: 'Join our disaster relief training program. Learn essential skills for emergency response and help communities in crisis.',
        volunteersNeeded: 25,
        volunteersJoined: 18,
        date: '2025-11-22',
        skills: ['First Aid', 'Crisis Management', 'Leadership'],
      },
    ];

    setTimeout(() => {
      setOpportunities(mockOpportunities);
      setFilteredOpportunities(mockOpportunities);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((opp) => opp.category === selectedCategory);
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedCategory, opportunities]);

  const handleJoin = (opportunityId: string, title: string) => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('Please login to join opportunities');
      return;
    }

    toast.success(`Successfully joined: ${title}`);
    // Add API call here to join opportunity
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      education: 'bg-blue-100 text-blue-800',
      healthcare: 'bg-red-100 text-red-800',
      environment: 'bg-green-100 text-green-800',
      'animal-welfare': 'bg-purple-100 text-purple-800',
      community: 'bg-yellow-100 text-yellow-800',
      'disaster-relief': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Volunteer Opportunities
          </h1>
          <p className="text-xl text-[#e8f5e9]">
            Find the perfect opportunity to make a difference
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                  <SelectItem value="community">Community Development</SelectItem>
                  <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 px-4 bg-gradient-to-br from-[#e8f5e9] to-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#2e7d32] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading opportunities...</p>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No opportunities found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getCategoryColor(opportunity.category)}>
                        {opportunity.category.replace('-', ' ')}
                      </Badge>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(opportunity.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-[#2e7d32]">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.organization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{opportunity.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-[#2e7d32]" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-[#2e7d32]" />
                        {opportunity.volunteersJoined}/{opportunity.volunteersNeeded} volunteers
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleJoin(opportunity.id, opportunity.title)}
                      className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                    >
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
