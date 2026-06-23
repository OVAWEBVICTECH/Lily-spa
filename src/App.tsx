import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TreatmentMenu from "./components/TreatmentMenu";
import AdvisorQuiz from "./components/AdvisorQuiz";
import BookingPanel from "./components/BookingPanel";
import Atmosphere from "./components/Atmosphere";
import Footer from "./components/Footer";
import { Treatment } from "./types";
import { Clock, Sliders, Calendar as CalendarIcon, User, Sparkles } from "lucide-react";

export default function App() {
  const [selectedTreatments, setSelectedTreatments] = useState<Treatment[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const handleToggleTreatment = (treatment: Treatment) => {
    setSelectedTreatments((prev) => {
      const exists = prev.some((t) => t.id === treatment.id);
      if (exists) {
        return prev.filter((t) => t.id !== treatment.id);
      } else {
        return [...prev, treatment];
      }
    });
  };

  const handleRemoveTreatment = (treatment: Treatment) => {
    setSelectedTreatments((prev) => prev.filter((t) => t.id !== treatment.id));
  };

  const handleClearCart = () => {
    setSelectedTreatments([]);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-gold-100 selection:text-gold-900 overflow-x-hidden antialiased">
      {/* 1. Translucent Sticky Header */}
      <Header
        cart={selectedTreatments}
        onOpenBooking={() => handleScrollToSection("booking-section")}
        onOpenQuiz={() => {
          setShowQuiz(true);
          setTimeout(() => {
            handleScrollToSection("quiz-block");
          }, 100);
        }}
      />

      {/* 2. Stunning Hero Media Showcase */}
      <Hero
        onOpenBooking={() => handleScrollToSection("booking-section")}
        onOpenQuiz={() => {
          setShowQuiz(true);
          setTimeout(() => {
            handleScrollToSection("quiz-block");
          }, 100);
        }}
        onExploreMenu={() => handleScrollToSection("menu")}
      />

      {/* 3. Floating Promotional / Micro capabilities highlights bar */}
      <div className="bg-white border-y border-stone-200/50 py-10 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-3 bg-gold-50 text-gold-600 rounded-full">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">
                  Ancient Contouring Science
                </h4>
                <p className="text-stone-500 text-xs font-light mt-0.5">
                  Kyoto-certified Kobi-Do facial sculpting triggers native rejuvenation processes.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 border-y md:border-y-0 md:border-x border-stone-100 py-6 md:py-0 md:px-8">
              <div className="p-3 bg-gold-50 text-gold-600 rounded-full">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">
                  Personalized Botany Oils
                </h4>
                <p className="text-stone-500 text-xs font-light mt-0.5">
                  Bespoke hand-whisked oil blends based on diagnostic skin type metrics.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-3 bg-gold-50 text-gold-600 rounded-full">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">
                  Time-Locked Tranquil Guards
                </h4>
                <p className="text-stone-500 text-xs font-light mt-0.5">
                  Full 15 minutes preparation block allocated for your room before arrival.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Elegant Interactive Treatment Menu Selection */}
      <TreatmentMenu
        cart={selectedTreatments}
        onToggleCart={handleToggleTreatment}
        onOpenBooking={() => handleScrollToSection("booking-section")}
      />

      {/* 5. Optional Gemini Skincare Advisor block */}
      {showQuiz && (
        <AdvisorQuiz
          cart={selectedTreatments}
          onToggleCart={handleToggleTreatment}
          onClose={() => {
            setShowQuiz(false);
            handleScrollToSection("booking-section");
          }}
        />
      )}

      {/* 6. Dynamic Booking and Scheduling Center */}
      <BookingPanel
        cart={selectedTreatments}
        onRemoveItem={handleRemoveTreatment}
        onClearCart={handleClearCart}
        onClose={() => handleScrollToSection("menu")}
      />

      {/* 7. Atmosphere Bento-imagery Section */}
      <Atmosphere />

      {/* 8. FAQ & Complete Contact Footer coordinates */}
      <Footer />
    </div>
  );
}
