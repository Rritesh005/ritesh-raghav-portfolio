export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  createdAt: number;
  avatar: string;
  avatarBg: string;
  pinned?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  link: string;
  impact?: {
    metric: string;
    description: string;
    percentage: number;
  };
}
