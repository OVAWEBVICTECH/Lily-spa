import { useState, FormEvent } from "react";
import { Clock, User, Calendar as CalendarIcon, Check, CreditCard, ChevronRight, AlertCircle, ShoppingBag } from "lucide-react";
import { THERAPISTS, TREATMENTS } from "../data";
import { Treatment, Therapist, Booking } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface BookingPanelProps {
  cart: Treatment[];
  onRemoveItem: (treatment: Treatment) => void;
  onClearCart: () => void;
  onClose: () => void;
}

export default function BookingPanel({ cart, onRemoveItem, onClearCart, onClose }: BookingPanelProps) {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(THERAPISTS[0]);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timeSlots = {
    morning: ["09:00", "10:30", "11:45"],
    afternoon: ["13:00", "14:30", "15:45"],
    evening: ["17:00", "18:15", "19:30"]
  };

  const totalDuration = cart.reduce((acc, t) => acc + t.duration, 0);
  const totalAmount = cart.reduce((acc, t) => acc + t.price, 0);

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMessage("Please select at least one luxury treatment before reserving.");
      return;
    }
    if (!bookingDate) {
      setErrorMessage("Please select a valid date for your treatments.");
      return;
    }
    if (!selectedTimeSlot) {
      setErrorMessage("Please select an available timing slot.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatments: cart,
          therapist: selectedTherapist,
          date: bookingDate,
          time: selectedTimeSlot,
          clientName,
          clientEmail,
          clientPhone,
          notes
        })
      });

      if (!response.ok) {
        throw new Error("Unable to register your booking. Our booking database seems busy.");
      }

      const receipt = await response.json();
      setConfirmedBooking(receipt);
      onClearCart();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong registering your reservation slot.");
    } finally {
      loadingPlaceholderTimeout();
    }
  };

  const loadingPlaceholderTimeout = () => {
    // Artificial duration is already complete, setLoading immediately
    setLoading(false);
  };

  // Generate safe date ranges (today + 30 days) to prevent backlog
  const getMinDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDateString = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.toISOString().split("T")[0];
    return maxDate.toISOString().split("T")[0];
  };

  const isDayAvailable = (therapist: Therapist, dateStr: string): boolean => {
    if (!dateStr) return true;
    const dateObj = new Date(dateStr);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const selectedDayName = daysOfWeek[dateObj.getDay()];
    return therapist.availableDays.includes(selectedDayName);
  };

  return (
    <section id="booking-section" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-stone-50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[6px] uppercase font-semibold text-gold-600 block mb-3">
            RESERVATION SYSTEM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 animate-[fadeIn_0.6s_ease-out]">
            Secure Your Wellness Ceremony
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
        </div>

        <AnimatePresence mode="wait">
          {confirmedBooking ? (
            /* Confirmation Luxury Ticket View */
            <motion.div
              key="confirmation-ticket"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="max-w-xl mx-auto bg-stone-50 border border-gold-200/50 rounded-3xl p-6 sm:p-10 shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400" />
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-16 h-16 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-200"
              >
                <Check className="w-8 h-8" />
              </motion.div>

              <span className="text-[10px] tracking-[4px] uppercase text-gold-600 font-semibold mb-1 block">
                APPOINTMENT SECURED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-6">
                Receipt Reference: {confirmedBooking.id}
              </h3>

              <div className="space-y-4 text-left border-y border-stone-200/60 py-6 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400">Guest Name</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.summary.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Scheduled Date</span>
                  <span className="font-medium text-stone-800 font-mono">{confirmedBooking.summary.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Reservation Time</span>
                  <span className="font-medium text-stone-800 font-mono">{confirmedBooking.summary.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Eminent Practitioner</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.summary.therapist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Service Items</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.summary.treatmentsCount} Selected</span>
                </div>
                <div className="flex justify-between md:pt-2 border-t border-stone-100 font-semibold text-base">
                  <span className="text-stone-900">Calculated Security Deposit</span>
                  <span className="text-gold-700 font-mono">PAY AT SALON</span>
                </div>
              </div>

              <p className="text-stone-500 text-xs font-light leading-relaxed mb-8">
                A private reservation itinerary has been dispatched to <span className="font-medium text-stone-800">{confirmedBooking.summary.email}</span>. Kindly align your arrival times 15 minutes before the initial block so Mika and David prepare the botanical oil ratios.
              </p>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onClose();
                }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 font-semibold text-xs tracking-wider uppercase text-white rounded-full transition-colors cursor-pointer"
              >
                Return To Salon Home
              </button>
            </motion.div>
          ) : (
            /* Core Booking Scheduler System Form */
            <motion.div
              key="booking-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              
              {/* Left Column: Form Details Selection */}
              <form onSubmit={handleBookingSubmit} className="lg:col-span-7 space-y-10">
                
                {/* Step 1: Therapist Selector */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 flex items-center gap-2">
                    <span className="text-gold-500 font-mono text-base">01 /</span>
                    <span>Select Your Specialized Practitioner</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {THERAPISTS.map((therapist) => {
                      const isSelected = selectedTherapist?.id === therapist.id;
                      const isAvail = isDayAvailable(therapist, bookingDate);
                      return (
                        <motion.div
                          key={therapist.id}
                          onClick={() => setSelectedTherapist(therapist)}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`p-4 rounded-2xl cursor-pointer border transition-all text-center flex flex-col justify-between ${
                            isSelected
                              ? "bg-gold-50/40 border-gold-400 shadow-sm"
                              : "bg-white border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div>
                            <img
                              src={therapist.avatar}
                              alt={therapist.name}
                              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border border-stone-100"
                            />
                            <h4 className="font-medium text-stone-900 text-sm leading-tight">
                              {therapist.name}
                            </h4>
                            <p className="text-[10px] text-stone-400 mt-0.5 leading-tight">
                              {therapist.role}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-1">
                            <span className="text-gold-500 text-sm">★</span>
                            <span className="text-xs font-semibold text-stone-700">{therapist.rating}</span>
                          </div>

                          {!isAvail && (
                            <span className="text-[9px] text-amber-600 mt-2 font-medium">
                              Unavailable on selected day
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date Selector */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 flex items-center gap-2">
                    <span className="text-gold-500 font-mono text-base">02 /</span>
                    <span>Select Date of Attendance</span>
                  </h3>

                  <div className="max-w-md">
                    <div className="relative">
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={getMinDateString()}
                        max={getMaxDateString()}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-gold-400 focus:outline-none rounded-xl text-stone-800 text-sm font-light cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Time Slot Selector */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 flex items-center gap-2">
                    <span className="text-gold-500 font-mono text-base">03 /</span>
                    <span>Select Ceremony Hour Slot</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Morning slots */}
                    <div>
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-stone-400 mb-2 block">
                        Morning Sessions
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.morning.map((slot) => {
                          const isChosen = selectedTimeSlot === slot;
                          return (
                            <motion.button
                              type="button"
                              key={slot}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`px-4 py-2 border text-xs font-mono font-medium rounded-lg cursor-pointer transition-colors ${
                                isChosen
                                  ? "bg-stone-900 border-stone-900 text-gold-300 shadow-sm"
                                  : "bg-white border-stone-200 text-stone-600 hover:border-gold-300"
                              }`}
                            >
                              {slot}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon slots */}
                    <div>
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-stone-400 mb-2 block">
                        Afternoon Sessions
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.afternoon.map((slot) => {
                          const isChosen = selectedTimeSlot === slot;
                          return (
                            <motion.button
                              type="button"
                              key={slot}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`px-4 py-2 border text-xs font-mono font-medium rounded-lg cursor-pointer transition-colors ${
                                isChosen
                                  ? "bg-stone-900 border-stone-900 text-gold-300 shadow-sm"
                                  : "bg-white border-stone-200 text-stone-600 hover:border-gold-300"
                              }`}
                            >
                              {slot}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Evening slots */}
                    <div>
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-stone-400 mb-2 block">
                        Evening Sessions
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.evening.map((slot) => {
                          const isChosen = selectedTimeSlot === slot;
                          return (
                            <motion.button
                              type="button"
                              key={slot}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`px-4 py-2 border text-xs font-mono font-medium rounded-lg cursor-pointer transition-colors ${
                                isChosen
                                  ? "bg-stone-900 border-stone-900 text-gold-300 shadow-sm"
                                  : "bg-white border-stone-200 text-stone-600 hover:border-gold-300"
                              }`}
                            >
                              {slot}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Client Coordinates info */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 flex items-center gap-2">
                    <span className="text-gold-500 font-mono text-base">04 /</span>
                    <span>Contact Coordinates</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-stone-400 font-semibold tracking-wide uppercase">
                        Client Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Sienna Miller"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-gold-400 focus:outline-none rounded-xl text-stone-800 text-sm font-light"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-stone-400 font-semibold tracking-wide uppercase">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. sienna@modeluxe.com"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-gold-400 focus:outline-none rounded-xl text-stone-800 text-sm font-light"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] text-stone-400 font-semibold tracking-wide uppercase">
                        Telephone Call Code *
                      </label>
                      <input
                        required
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. +234 812 345 6789"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-gold-400 focus:outline-none rounded-xl text-stone-800 text-sm font-light"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] text-stone-400 font-semibold tracking-wide uppercase">
                        Medication or Specific Treatment Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Denote skincare allergies, pregnancy, or focus areas (shoulders, deep-scalp etc.)"
                        rows={3}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-gold-400 focus:outline-none rounded-xl text-stone-800 text-sm font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Status details / Feedback errors */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-3 border border-rose-100 rounded-xl text-xs"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <p>{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit trigger button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-center rounded-full bg-gold-600 hover:bg-gold-500 text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? "Registering coordinates..." : "Confirm & Send Reservation Request"}
                </button>

              </form>

              {/* Right Column: Treatment Cart Invoice Summary */}
              <div className="lg:col-span-5">
                <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 shadow-sm sticky top-28 space-y-6">
                  
                  <h3 className="font-serif text-lg font-semibold text-stone-900 pb-3 border-b border-stone-200">
                    Treatment Selected
                  </h3>

                  {cart.length === 0 ? (
                    <div className="text-center py-10">
                      <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                      <p className="text-stone-400 text-xs font-light">
                        No services currently chosen. Select treatments inside the menu above to build your slot.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence initial={false}>
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start justify-between gap-4 text-xs overflow-hidden"
                          >
                            <div className="py-1">
                              <p className="font-medium text-stone-800 leading-tight">
                                {item.name}
                              </p>
                              <div className="flex gap-2 text-[10px] text-stone-400 mt-1">
                                <span>{item.duration} Min</span>
                                <span>•</span>
                                <span>{item.category.toUpperCase()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 py-1">
                              <span className="font-medium text-stone-700">${item.price}</span>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item)}
                                className="text-stone-400 hover:text-stone-800 transition-colors bg-white hover:bg-stone-100 p-1.5 rounded-full shadow-sm cursor-pointer"
                              >
                                &times;
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Calculated sums */}
                      <div className="pt-6 border-t border-stone-200 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Practitioner</span>
                          <span className="font-medium text-stone-700">
                            {selectedTherapist ? selectedTherapist.name : "Unselected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Total Duration</span>
                          <span className="font-medium text-stone-700 font-mono">
                            {totalDuration} Mins ({Math.floor(totalDuration / 60)}h {totalDuration % 60}m)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Scheduled Date</span>
                          <span className="font-medium text-stone-700 font-mono">
                            {bookingDate ? bookingDate : "Unselected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Scheduled Hour</span>
                          <span className="font-medium text-stone-700 font-mono">
                            {selectedTimeSlot ? selectedTimeSlot : "Unselected"}
                          </span>
                        </div>
                        
                        <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-sm font-bold">
                          <span className="text-stone-900">Aggregate Price</span>
                          <span className="text-gold-700 text-base font-mono">${totalAmount} USD</span>
                        </div>
                      </div>

                      <div className="bg-gold-50/50 border border-gold-200/40 p-4 rounded-xl text-[10px] text-gold-800 leading-relaxed font-light">
                        <strong>Guaranteed Serenity Note:</strong> Our booking system operates with absolute security. Minimum reservation fees are processed onsite. Taxes are included.
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
