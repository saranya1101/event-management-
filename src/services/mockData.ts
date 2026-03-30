import { User, Event, Booking } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@eventify.com', role: 'admin', createdAt: '2024-01-01' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: '2024-02-15' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2024-03-10' },
  { id: '4', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', createdAt: '2024-03-20' },
  { id: '5', name: 'Bob Brown', email: 'bob@example.com', role: 'user', createdAt: '2024-03-25' },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'The biggest tech gathering of the year.',
    date: '2024-06-15',
    time: '09:00 AM',
    location: 'San Francisco, CA',
    image: 'https://picsum.photos/seed/tech/800/600',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'A weekend of amazing live music.',
    date: '2024-07-20',
    time: '04:00 PM',
    location: 'Austin, TX',
    image: 'https://picsum.photos/seed/music/800/600',
    category: 'Entertainment'
  },
  {
    id: '3',
    title: 'Startup Pitch Day',
    description: 'Watch the next big things pitch to investors.',
    date: '2024-08-05',
    time: '10:00 AM',
    location: 'New York, NY',
    image: 'https://picsum.photos/seed/startup/800/600',
    category: 'Business'
  },
];

export const mockBookings: Booking[] = [
  { id: '1', eventId: '1', userId: '2', status: 'Approved', bookingDate: '2024-03-01', userName: 'John Doe', eventTitle: 'Tech Conference 2024' },
  { id: '2', eventId: '2', userId: '3', status: 'Pending', bookingDate: '2024-03-05', userName: 'Jane Smith', eventTitle: 'Music Festival' },
  { id: '3', eventId: '1', userId: '4', status: 'Cancelled', bookingDate: '2024-03-10', userName: 'Alice Johnson', eventTitle: 'Tech Conference 2024' },
];
