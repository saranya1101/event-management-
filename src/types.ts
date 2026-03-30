export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
  bookingDate: string;
  userName: string;
  eventTitle: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
