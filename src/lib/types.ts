export type Story = {
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  content: string;
  category: 'love' | 'friendship' | 'both';
  is_featured: boolean;
  views: number;
  likes: number;
  created_at: string;
  updated_at?: string;
  image?: string; // Base64-encoded image string
};

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at?: string;
};

export type User = {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
};
