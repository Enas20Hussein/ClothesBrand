export interface Course {
  id: number;          // Unique identifier for the course
  title: string;       // Title of the course
  description: string; // Description of the course
  price: number;       // Price of the course (use number for currency representation)
  duration: string;    // Duration of the course (e.g., "4 weeks" or "10 hours")
}
