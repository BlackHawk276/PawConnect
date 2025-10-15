// Shelter type definitions for public-facing shelter data
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
