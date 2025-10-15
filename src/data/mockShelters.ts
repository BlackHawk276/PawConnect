// Mock data for shelter listings - provides sample data for Layer 1 development
export interface Shelter {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  image: string;
  verified: boolean;
  email: string;
  phone: string;
  website?: string;
  establishedYear?: number;
}

export const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Mumbai Street Dogs Care',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: 'Rescuing and rehabilitating street dogs in Mumbai since 2015. Over 2000 dogs treated and adopted.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    verified: true,
    email: 'contact@mumbaidogs.org',
    phone: '+91 98765 43210',
    website: 'https://mumbaidogs.org',
    establishedYear: 2015
  },
  {
    id: '2',
    name: 'Delhi Animal Rescue',
    city: 'New Delhi',
    state: 'Delhi',
    description: 'Emergency medical care and shelter for abandoned animals in the capital city.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    verified: true,
    email: 'help@delhianimalrescue.org',
    phone: '+91 98765 43211',
    establishedYear: 2018
  },
  {
    id: '3',
    name: 'Bangalore Paw Shelter',
    city: 'Bangalore',
    state: 'Karnataka',
    description: 'Community-driven shelter focusing on adoption and animal welfare education.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop',
    verified: true,
    email: 'info@bangalorepaws.org',
    phone: '+91 98765 43212',
    website: 'https://bangalorepaws.org',
    establishedYear: 2016
  },
  {
    id: '4',
    name: 'Chennai Animal Care',
    city: 'Chennai',
    state: 'Tamil Nadu',
    description: 'Providing comprehensive veterinary care and shelter services for stray animals.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    verified: true,
    email: 'care@chennaianimalcare.org',
    phone: '+91 98765 43213',
    establishedYear: 2017
  },
  {
    id: '5',
    name: 'Pune Pet Sanctuary',
    city: 'Pune',
    state: 'Maharashtra',
    description: 'A safe haven for abandoned pets with focus on rehabilitation and adoption.',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&h=600&fit=crop',
    verified: true,
    email: 'sanctuary@punepets.org',
    phone: '+91 98765 43214',
    establishedYear: 2019
  },
  {
    id: '6',
    name: 'Kolkata Animal Welfare',
    city: 'Kolkata',
    state: 'West Bengal',
    description: 'Dedicated to rescuing, treating, and rehoming street animals since 2010.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop',
    verified: true,
    email: 'welfare@kolkataanimals.org',
    phone: '+91 98765 43215',
    establishedYear: 2010
  }
];
