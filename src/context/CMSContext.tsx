import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Event, Booking, AuthState } from '../types';
import { mockUsers, mockEvents, mockBookings } from '../services/mockData';
import { toast } from 'sonner';

interface CMSContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  users: User[];
  deleteUser: (id: string) => void;
  bookings: Booking[];
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  updateProfile: (name: string, email: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('eventify_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('eventify_events');
    return saved ? JSON.parse(saved) : mockEvents;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('eventify_users');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('eventify_bookings');
    return saved ? JSON.parse(saved) : mockBookings;
  });

  useEffect(() => {
    localStorage.setItem('eventify_auth', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem('eventify_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventify_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('eventify_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const login = async (email: string, password: string) => {
    // Mock login logic
    if (email === 'admin@eventify.com' && password === 'admin123') {
      setAuthState({ user: mockUsers[0], isAuthenticated: true });
      toast.success('Login successful!');
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    toast.info('Logged out');
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent = { ...eventData, id: Math.random().toString(36).substr(2, 9) };
    setEvents([...events, newEvent]);
    toast.success('Event added successfully');
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...eventData } : e));
    toast.success('Event updated successfully');
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success('Event deleted');
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success('User removed');
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    toast.success(`Booking ${status.toLowerCase()}`);
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    toast.success('Booking removed');
  };

  const updateProfile = (name: string, email: string) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, name, email };
      setAuthState({ ...authState, user: updatedUser });
      setUsers(users.map(u => u.id === authState.user?.id ? updatedUser : u));
      toast.success('Profile updated');
    }
  };

  return (
    <CMSContext.Provider value={{
      authState, login, logout,
      events, addEvent, updateEvent, deleteEvent,
      users, deleteUser,
      bookings, updateBookingStatus, deleteBooking,
      updateProfile
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};
