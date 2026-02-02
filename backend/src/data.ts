export interface Booking {
  bookingId: number
  movieId: number
  movieTitle: string
  showId: number
  showTime: string
  seats: number
  totalAmount: number
  status: "confirmed" | "cancelled"
  bookingDate: string
  cancelledAt?: string
}

export interface User {
  userId: number
  username: string
  email: string
  password: string
  bookings: Booking[]
  createdAt: string
}

export interface Show {
  showId: number
  time: string
  pricePerSeat: number
  availableSeats: number
}

export interface Movie {
  id: number
  title: string
  genre: string
  duration: number
  shows: Show[]
}

export const data: {
  users: User[]
  movies: Movie[]
} = {
  users: [],
  movies: [
    {
      id: 1,
      title: "The Shawshank Redemption",
      genre: "Drama",
      duration: 142,
      shows: [
        { showId: 101, time: "10:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 102, time: "2:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 103, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 2,
      title: "The Godfather",
      genre: "Crime",
      duration: 175,
      shows: [
        { showId: 201, time: "11:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 202, time: "3:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 203, time: "7:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 3,
      title: "The Dark Knight",
      genre: "Action",
      duration: 152,
      shows: [
        { showId: 301, time: "12:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 302, time: "5:00 PM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 303, time: "9:00 PM", pricePerSeat: 350, availableSeats: 50 }
      ]
    },
    {
      id: 4,
      title: "The Godfather Part II",
      genre: "Crime",
      duration: 202,
      shows: [
        { showId: 401, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 402, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 5,
      title: "12 Angry Men",
      genre: "Drama",
      duration: 96,
      shows: [
        { showId: 501, time: "10:30 AM", pricePerSeat: 150, availableSeats: 50 },
        { showId: 502, time: "2:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 503, time: "6:30 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 6,
      title: "Schindler's List",
      genre: "Drama",
      duration: 195,
      shows: [
        { showId: 601, time: "11:30 AM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 602, time: "4:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 7,
      title: "The Lord of the Rings: The Return of the King",
      genre: "Fantasy",
      duration: 201,
      shows: [
        { showId: 701, time: "12:30 PM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 702, time: "5:30 PM", pricePerSeat: 350, availableSeats: 50 }
      ]
    },
    {
      id: 8,
      title: "Pulp Fiction",
      genre: "Crime",
      duration: 154,
      shows: [
        { showId: 801, time: "1:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 802, time: "6:30 PM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 803, time: "9:30 PM", pricePerSeat: 350, availableSeats: 50 }
      ]
    },
    {
      id: 9,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      genre: "Fantasy",
      duration: 178,
      shows: [
        { showId: 901, time: "11:00 AM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 902, time: "4:00 PM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 903, time: "8:00 PM", pricePerSeat: 350, availableSeats: 50 }
      ]
    },
    {
      id: 10,
      title: "Forrest Gump",
      genre: "Drama",
      duration: 142,
      shows: [
        { showId: 1001, time: "10:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1002, time: "2:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1003, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 11,
      title: "Inception",
      genre: "Sci-Fi",
      duration: 148,
      shows: [
        { showId: 1101, time: "11:30 AM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1102, time: "3:30 PM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 1103, time: "7:30 PM", pricePerSeat: 350, availableSeats: 50 }
      ]
    },
    {
      id: 12,
      title: "The Lord of the Rings: The Two Towers",
      genre: "Fantasy",
      duration: 179,
      shows: [
        { showId: 1201, time: "12:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1202, time: "5:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 13,
      title: "Fight Club",
      genre: "Drama",
      duration: 139,
      shows: [
        { showId: 1301, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1302, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1303, time: "9:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 14,
      title: "Star Wars: Episode V - The Empire Strikes Back",
      genre: "Sci-Fi",
      duration: 124,
      shows: [
        { showId: 1401, time: "10:30 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1402, time: "2:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1403, time: "6:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 15,
      title: "The Matrix",
      genre: "Sci-Fi",
      duration: 136,
      shows: [
        { showId: 1501, time: "11:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1502, time: "3:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1503, time: "7:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 16,
      title: "Goodfellas",
      genre: "Crime",
      duration: 146,
      shows: [
        { showId: 1601, time: "12:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1602, time: "4:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1603, time: "8:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 17,
      title: "One Flew Over the Cuckoo's Nest",
      genre: "Drama",
      duration: 133,
      shows: [
        { showId: 1701, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1702, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 18,
      title: "Se7en",
      genre: "Crime",
      duration: 127,
      shows: [
        { showId: 1801, time: "2:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 1802, time: "6:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 1803, time: "10:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 19,
      title: "Interstellar",
      genre: "Sci-Fi",
      duration: 169,
      shows: [
        { showId: 1901, time: "11:30 AM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 1902, time: "4:30 PM", pricePerSeat: 350, availableSeats: 50 },
        { showId: 1903, time: "8:30 PM", pricePerSeat: 400, availableSeats: 50 }
      ]
    },
    {
      id: 20,
      title: "City of God",
      genre: "Crime",
      duration: 130,
      shows: [
        { showId: 2001, time: "1:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 2002, time: "5:30 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 21,
      title: "Saving Private Ryan",
      genre: "War",
      duration: 169,
      shows: [
        { showId: 2101, time: "12:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2102, time: "5:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 22,
      title: "The Green Mile",
      genre: "Drama",
      duration: 189,
      shows: [
        { showId: 2201, time: "1:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2202, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 23,
      title: "Life Is Beautiful",
      genre: "Drama",
      duration: 116,
      shows: [
        { showId: 2301, time: "10:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 2302, time: "2:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2303, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 24,
      title: "The Silence of the Lambs",
      genre: "Thriller",
      duration: 118,
      shows: [
        { showId: 2401, time: "11:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 2402, time: "3:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2403, time: "7:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 25,
      title: "Star Wars: Episode IV - A New Hope",
      genre: "Sci-Fi",
      duration: 121,
      shows: [
        { showId: 2501, time: "10:30 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 2502, time: "2:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2503, time: "6:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 26,
      title: "Parasite",
      genre: "Thriller",
      duration: 132,
      shows: [
        { showId: 2601, time: "12:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2602, time: "4:00 PM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 2603, time: "8:00 PM", pricePerSeat: 350, availableSeats: 50 }
      ]
    },
    {
      id: 27,
      title: "The Usual Suspects",
      genre: "Crime",
      duration: 106,
      shows: [
        { showId: 2701, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 2702, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2703, time: "9:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 28,
      title: "The Prestige",
      genre: "Mystery",
      duration: 130,
      shows: [
        { showId: 2801, time: "11:30 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 2802, time: "3:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2803, time: "7:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 29,
      title: "Gladiator",
      genre: "Action",
      duration: 155,
      shows: [
        { showId: 2901, time: "12:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 2902, time: "5:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 30,
      title: "The Departed",
      genre: "Crime",
      duration: 151,
      shows: [
        { showId: 3001, time: "1:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 3002, time: "6:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 31,
      title: "Whiplash",
      genre: "Drama",
      duration: 106,
      shows: [
        { showId: 3101, time: "10:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3102, time: "2:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 3103, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 32,
      title: "The Lion King",
      genre: "Animation",
      duration: 88,
      shows: [
        { showId: 3201, time: "9:00 AM", pricePerSeat: 150, availableSeats: 50 },
        { showId: 3202, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3203, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 33,
      title: "Back to the Future",
      genre: "Sci-Fi",
      duration: 116,
      shows: [
        { showId: 3301, time: "10:30 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3302, time: "2:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 3303, time: "6:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 34,
      title: "The Pianist",
      genre: "Drama",
      duration: 150,
      shows: [
        { showId: 3401, time: "11:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3402, time: "4:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 35,
      title: "Psycho",
      genre: "Horror",
      duration: 109,
      shows: [
        { showId: 3501, time: "12:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3502, time: "4:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 3503, time: "8:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 36,
      title: "Terminator 2: Judgment Day",
      genre: "Action",
      duration: 137,
      shows: [
        { showId: 3601, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3602, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 3603, time: "9:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 37,
      title: "American History X",
      genre: "Drama",
      duration: 119,
      shows: [
        { showId: 3701, time: "2:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3702, time: "6:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 38,
      title: "Modern Times",
      genre: "Comedy",
      duration: 87,
      shows: [
        { showId: 3801, time: "10:00 AM", pricePerSeat: 150, availableSeats: 50 },
        { showId: 3802, time: "2:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3803, time: "6:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 39,
      title: "Spirited Away",
      genre: "Animation",
      duration: 125,
      shows: [
        { showId: 3901, time: "11:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 3902, time: "3:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 3903, time: "7:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 40,
      title: "Léon: The Professional",
      genre: "Action",
      duration: 110,
      shows: [
        { showId: 4001, time: "12:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 4002, time: "4:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 4003, time: "8:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 41,
      title: "The Shining",
      genre: "Horror",
      duration: 146,
      shows: [
        { showId: 4101, time: "1:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 4102, time: "5:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 4103, time: "9:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 42,
      title: "Apocalypse Now",
      genre: "War",
      duration: 147,
      shows: [
        { showId: 4201, time: "2:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 4202, time: "6:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 43,
      title: "Django Unchained",
      genre: "Western",
      duration: 165,
      shows: [
        { showId: 4301, time: "12:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 4302, time: "5:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 44,
      title: "WALL-E",
      genre: "Animation",
      duration: 98,
      shows: [
        { showId: 4401, time: "9:30 AM", pricePerSeat: 150, availableSeats: 50 },
        { showId: 4402, time: "1:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 4403, time: "5:30 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 45,
      title: "The Lives of Others",
      genre: "Drama",
      duration: 137,
      shows: [
        { showId: 4501, time: "11:00 AM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 4502, time: "3:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    },
    {
      id: 46,
      title: "Avengers: Infinity War",
      genre: "Action",
      duration: 149,
      shows: [
        { showId: 4601, time: "10:30 AM", pricePerSeat: 300, availableSeats: 50 },
        { showId: 4602, time: "2:30 PM", pricePerSeat: 350, availableSeats: 50 },
        { showId: 4603, time: "6:30 PM", pricePerSeat: 400, availableSeats: 50 }
      ]
    },
    {
      id: 47,
      title: "Memento",
      genre: "Mystery",
      duration: 113,
      shows: [
        { showId: 4701, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 4702, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 4703, time: "9:00 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 48,
      title: "The Great Dictator",
      genre: "Comedy",
      duration: 125,
      shows: [
        { showId: 4801, time: "11:30 AM", pricePerSeat: 150, availableSeats: 50 },
        { showId: 4802, time: "3:30 PM", pricePerSeat: 200, availableSeats: 50 }
      ]
    },
    {
      id: 49,
      title: "Aliens",
      genre: "Sci-Fi",
      duration: 137,
      shows: [
        { showId: 4901, time: "12:30 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 4902, time: "4:30 PM", pricePerSeat: 250, availableSeats: 50 },
        { showId: 4903, time: "8:30 PM", pricePerSeat: 300, availableSeats: 50 }
      ]
    },
    {
      id: 50,
      title: "Coco",
      genre: "Animation",
      duration: 105,
      shows: [
        { showId: 5001, time: "9:00 AM", pricePerSeat: 150, availableSeats: 50 },
        { showId: 5002, time: "1:00 PM", pricePerSeat: 200, availableSeats: 50 },
        { showId: 5003, time: "5:00 PM", pricePerSeat: 250, availableSeats: 50 }
      ]
    }
  ]
}