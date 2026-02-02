import express, { Request, Response, NextFunction, RequestHandler } from 'express'
import { data } from './data.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'


const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cors({
    origin:"http://localhost:8080"
}))

// CORS configuration
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const SALT_ROUNDS = 10
const INITIAL_BOOKING_ID = 1001

let userIdCounter = 1
let bookingIdCounter = INITIAL_BOOKING_ID

// Extended Request type with user property
interface AuthRequest extends Request {
    user?: {
        userId: number
        username: string
    }
}

// Rate limit record interface
interface RateLimitRecord {
    count: number
    resetTime: number
}

// Middleware: Authentication
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'Access token required' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string }
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' })
    }
}

// Middleware: Rate limiting (simple in-memory version)
const rateLimitMap = new Map<string, RateLimitRecord>()
const rateLimit = (maxRequests: number = 100, windowMs: number = 60000): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const key = req.ip || 'unknown'
        const now = Date.now()
        
        if (!rateLimitMap.has(key)) {
            rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
            next()
            return
        }

        const record = rateLimitMap.get(key)!
        
        if (now > record.resetTime) {
            record.count = 1
            record.resetTime = now + windowMs
            next()
            return
        }

        if (record.count >= maxRequests) {
            res.status(429).json({ message: 'Too many requests, please try again later' })
            return
        }

        record.count++
        next()
    }
}

// Input validation helpers
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const validatePassword = (password: string): boolean => {
    return Boolean(password && password.length >= 8)
}

const validateUsername = (username: string): boolean => {
    return Boolean(username && username.length >= 3 && username.length <= 50)
}

const sanitizeInput = (input: string): string => {
    if (typeof input !== 'string') return input
    return input.trim().replace(/[<>]/g, '')
}

// POST /signup - Create new user
app.post("/signup", rateLimit(10, 60000), async (req: Request, res: Response): Promise<void> => {
    try {
        let { username, email, password } = req.body

        // Sanitize inputs
        username = sanitizeInput(username)
        email = sanitizeInput(email)

        // Validate required fields
        if (!username || !password || !email) {
            res.status(400).json({
                message: "All fields are required"
            })
            return
        }

        // Validate username
        if (!validateUsername(username)) {
            res.status(400).json({
                message: "Username must be between 3 and 50 characters"
            })
            return
        }

        // Validate email
        if (!validateEmail(email)) {
            res.status(400).json({
                message: "Invalid email format"
            })
            return
        }

        // Validate password
        if (!validatePassword(password)) {
            res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
            return
        }

        // Check if user already exists
        const existingUser = data.users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() || 
            u.username.toLowerCase() === username.toLowerCase()
        )

        if (existingUser) {
            res.status(409).json({
                message: "User with this email or username already exists"
            })
            return
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = {
            userId: userIdCounter++,
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            bookings: [],
            createdAt: new Date().toISOString()
        }
        
        data.users.push(newUser)

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.userId, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(201).json({
            message: "User created successfully",
            userId: newUser.userId,
            username: newUser.username,
            token
        })
    } catch (error) {
        console.error('Signup error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// POST /login - User login
app.post("/login", rateLimit(5, 60000), async (req: Request, res: Response): Promise<void> => {
    try {
        let { email, password } = req.body

        email = sanitizeInput(email)

        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required"
            })
            return
        }

        const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase())

        if (!user) {
            res.status(401).json({
                message: "Invalid email or password"
            })
            return
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid email or password"
            })
            return
        }

        const token = jwt.sign(
            { userId: user.userId, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Login successful",
            userId: user.userId,
            username: user.username,
            token
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// GET /movies - Get all movies
app.get("/movies", (req: Request, res: Response): void => {
    try {
        res.status(200).json({
            movies: data.movies,
            count: data.movies.length
        })
    } catch (error) {
        console.error('Get movies error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// GET /movies/:movieId/shows - Get shows for a specific movie
app.get("/movies/:movieId/shows", (req: Request, res: Response): void => {
    try {
        const movieId = Number(req.params.movieId)

        if (isNaN(movieId)) {
            res.status(400).json({ message: "Invalid movie ID" })
            return
        }

        const movie = data.movies.find((m) => m.id === movieId)

        if (!movie) {
            res.status(404).json({
                message: "Movie not found"
            })
            return
        }

        res.status(200).json(movie)
    } catch (error) {
        console.error('Get movie shows error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// POST /bookings - Create new booking (protected route)
app.post("/bookings", authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user!.userId
        const { movieId, showId, seats } = req.body
        
        // Validate input
        if (!movieId || !showId || !seats) {
            res.status(400).json({
                message: "movieId, showId and seats are required"
            })
            return
        }

        if (!Number.isInteger(seats) || seats <= 0) {
            res.status(400).json({
                message: "Seats must be a positive integer"
            })
            return
        }

        if (seats > 10) {
            res.status(400).json({
                message: "Cannot book more than 10 seats at once"
            })
            return
        }

        const user = data.users.find(u => u.userId === userId)
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        const movie = data.movies.find(m => m.id === movieId)
        if (!movie) {
            res.status(404).json({
                message: "Movie not found"
            })
            return
        }

        const show = movie.shows.find(s => s.showId === showId)
        if (!show) {
            res.status(404).json({
                message: "Show not found"
            })
            return
        }

        if (show.availableSeats < seats) {
            res.status(400).json({
                message: `Not enough seats available. Only ${show.availableSeats} seats remaining`
            })
            return
        }

        const totalAmount = seats * show.pricePerSeat

        // Update available seats
        show.availableSeats -= seats

        const booking = {
            bookingId: bookingIdCounter++,
            movieId,
            movieTitle: movie.title,
            showId,
            showTime: show.time,
            seats,
            totalAmount,
            status: "confirmed" as const,
            bookingDate: new Date().toISOString()
        }

        user.bookings.push(booking)

        res.status(201).json({
            message: "Booking successful",
            booking: {
                bookingId: booking.bookingId,
                movieTitle: booking.movieTitle,
                showTime: booking.showTime,
                seats: booking.seats,
                totalAmount: booking.totalAmount,
                status: booking.status
            }
        })
    } catch (error) {
        console.error('Create booking error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// GET /bookings - Get all bookings for authenticated user
app.get("/bookings", authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user!.userId

        const user = data.users.find(u => u.userId === userId)
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        res.status(200).json({
            bookings: user.bookings,
            count: user.bookings.length
        })
    } catch (error) {
        console.error('Get bookings error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// GET /bookings/:bookingId - Get specific booking for authenticated user
app.get("/bookings/:bookingId", authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user!.userId
        const bookingId = Number(req.params.bookingId)

        if (isNaN(bookingId)) {
            res.status(400).json({ message: "Invalid booking ID" })
            return
        }

        const user = data.users.find(u => u.userId === userId)
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        const booking = user.bookings.find(b => b.bookingId === bookingId)
        if (!booking) {
            res.status(404).json({ message: "Booking not found" })
            return
        }

        res.status(200).json(booking)
    } catch (error) {
        console.error('Get booking error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// PUT /bookings/:bookingId - Update booking for authenticated user
app.put("/bookings/:bookingId", authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user!.userId
        const bookingId = Number(req.params.bookingId)
        const { seats } = req.body

        if (isNaN(bookingId)) {
            res.status(400).json({ message: "Invalid booking ID" })
            return
        }

        if (!seats || !Number.isInteger(seats) || seats <= 0) {
            res.status(400).json({ message: "Invalid seats value" })
            return
        }

        if (seats > 10) {
            res.status(400).json({
                message: "Cannot book more than 10 seats at once"
            })
            return
        }

        const user = data.users.find(u => u.userId === userId)
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        const booking = user.bookings.find(b => b.bookingId === bookingId)
        if (!booking) {
            res.status(404).json({ message: "Booking not found" })
            return
        }

        if (booking.status === "cancelled") {
            res.status(400).json({ message: "Cannot update cancelled booking" })
            return
        }

        const movie = data.movies.find(m => m.id === booking.movieId)
        const show = movie?.shows.find(s => s.showId === booking.showId)

        if (!show) {
            res.status(404).json({ message: "Show not found" })
            return
        }

        // Calculate seat difference
        const seatDifference = seats - booking.seats

        if (seatDifference > 0) {
            // User wants to add more seats
            if (seatDifference > show.availableSeats) {
                res.status(400).json({
                    message: `Not enough seats available. Only ${show.availableSeats} additional seats remaining`
                })
                return
            }
            show.availableSeats -= seatDifference
        } else if (seatDifference < 0) {
            // User wants to reduce seats - return them to the pool
            show.availableSeats += Math.abs(seatDifference)
        }
        // If seatDifference === 0, no changes needed

        booking.seats = seats
        booking.totalAmount = seats * show.pricePerSeat

        res.status(200).json({
            message: "Booking updated successfully",
            booking: {
                bookingId: booking.bookingId,
                seats: booking.seats,
                totalAmount: booking.totalAmount
            }
        })
    } catch (error) {
        console.error('Update booking error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// DELETE /bookings/:bookingId - Cancel booking for authenticated user
app.delete("/bookings/:bookingId", authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user!.userId
        const bookingId = Number(req.params.bookingId)

        if (isNaN(bookingId)) {
            res.status(400).json({ message: "Invalid booking ID" })
            return
        }

        const user = data.users.find(u => u.userId === userId)
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        const booking = user.bookings.find(b => b.bookingId === bookingId)
        if (!booking) {
            res.status(404).json({ message: "Booking not found" })
            return
        }

        if (booking.status === "cancelled") {
            res.status(400).json({ message: "Booking already cancelled" })
            return
        }

        const movie = data.movies.find(m => m.id === booking.movieId)
        const show = movie?.shows.find(s => s.showId === booking.showId)

        if (show) {
            // Restore seats to available pool
            show.availableSeats += booking.seats
        }

        booking.status = "cancelled"
        booking.cancelledAt = new Date().toISOString()

        res.status(200).json({
            message: "Booking cancelled successfully",
            refundAmount: booking.totalAmount
        })
    } catch (error) {
        console.error('Cancel booking error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// GET /summary - Get booking summary for authenticated user
app.get("/summary", authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user!.userId

        const user = data.users.find(u => u.userId === userId)
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        const totalBookings = user.bookings.length
        const confirmedBookings = user.bookings.filter(b => b.status === "confirmed")
        const cancelledBookings = user.bookings.filter(b => b.status === "cancelled")

        const totalAmountSpent = confirmedBookings.reduce(
            (sum, b) => sum + b.totalAmount, 0
        )

        const totalSeatsBooked = confirmedBookings.reduce(
            (sum, b) => sum + b.seats, 0
        )

        res.status(200).json({
            userId: user.userId,
            username: user.username,
            totalBookings,
            totalAmountSpent,
            confirmedBookings: confirmedBookings.length,
            cancelledBookings: cancelledBookings.length,
            totalSeatsBooked
        })
    } catch (error) {
        console.error('Get summary error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Endpoint not found" })
})

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ message: "Internal server error" })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})