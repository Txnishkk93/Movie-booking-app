const API_BASE_URL = 'http://localhost:3000';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'An error occurred' };
    }

    return { data };
  } catch (error) {
    return { error: 'Network error. Please check if the server is running.' };
  }
}

// Auth
export const signup = (username: string, email: string, password: string) =>
  fetchApi<{ message: string; userId: number; username: string; token: string }>('/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });

export const login = (email: string, password: string) =>
  fetchApi<{ message: string; userId: number; username: string; token: string }>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

// Movies
export interface Show {
  showId: number;
  time: string;
  pricePerSeat: number;
  availableSeats: number;
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
  shows: Show[];
}

export const getMovies = () =>
  fetchApi<{ movies: Movie[]; count: number }>('/movies');

export const getMovieShows = (movieId: number) =>
  fetchApi<Movie>(`/movies/${movieId}/shows`);

// Bookings
export interface Booking {
  bookingId: number;
  movieId: number;
  movieTitle: string;
  showId: number;
  showTime: string;
  seats: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled';
  bookingDate: string;
  cancelledAt?: string;
}

export const createBooking = (movieId: number, showId: number, seats: number) =>
  fetchApi<{ message: string; booking: Booking }>('/bookings', {
    method: 'POST',
    body: JSON.stringify({ movieId, showId, seats }),
  });

export const getBookings = () =>
  fetchApi<{ bookings: Booking[]; count: number }>('/bookings');

export const getBooking = (bookingId: number) =>
  fetchApi<Booking>(`/bookings/${bookingId}`);

export const updateBooking = (bookingId: number, seats: number) =>
  fetchApi<{ message: string; booking: { bookingId: number; seats: number; totalAmount: number } }>(
    `/bookings/${bookingId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ seats }),
    }
  );

export const cancelBooking = (bookingId: number) =>
  fetchApi<{ message: string; refundAmount: number }>(`/bookings/${bookingId}`, {
    method: 'DELETE',
  });

// Summary
export interface UserSummary {
  userId: number;
  username: string;
  totalBookings: number;
  totalAmountSpent: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalSeatsBooked: number;
}

export const getSummary = () => fetchApi<UserSummary>('/summary');
