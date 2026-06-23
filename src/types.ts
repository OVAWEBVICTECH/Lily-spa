export interface Treatment {
  id: string;
  name: string;
  category: "facials" | "massages" | "rituals" | "body";
  duration: number; // in minutes
  price: number; // in USD
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  image: string;
  specialtyTag?: string;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  rating: number;
  specialties: string[];
  avatar: string;
  bio: string;
  availableDays: string[]; // e.g. "Monday", "Wednesday", etc.
}

export interface Booking {
  id: string;
  treatments: Treatment[];
  therapist: Therapist;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled";
}

export interface SkinQuizQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

export interface AdvisorRecommendation {
  treatmentId: string;
  reason: string;
  suitabilityScore: number; // out of 100
  lifestyleTips: string[];
}

export interface AdvisorResponse {
  recommendations: AdvisorRecommendation[];
  generalAnalysis: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  source: string;
}
