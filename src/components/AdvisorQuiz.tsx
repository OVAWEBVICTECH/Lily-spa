import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, RefreshCw, Check, CheckCircle } from "lucide-react";
import { SKIN_QUIZ_QUESTIONS, TREATMENTS } from "../data";
import { AdvisorResponse, Treatment } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AdvisorQuizProps {
  onClose: () => void;
  cart: Treatment[];
  onToggleCart: (treatment: Treatment) => void;
}

export default function AdvisorQuiz({ onClose, cart, onToggleCart }: AdvisorQuizProps) {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [result, setResult] = useState<AdvisorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = SKIN_QUIZ_QUESTIONS.length;
  const currentQuestion = SKIN_QUIZ_QUESTIONS[step];

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      buildRecommendation();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const buildRecommendation = async () => {
    setLoading(true);
    setError(null);
    
    // Calm animated loading sequences
    const messages = [
      "Analyzing micro-surface balance vectors...",
      "Correlating skin types with atmospheric factors...",
      "Summoning botanical treatment matches from Lily Spa archives...",
      "Formulating custom daily lifestyle wellness paths..."
    ];

    let msgIdx = 0;
    setLoadingMessage(messages[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % messages.length;
      setLoadingMessage(messages[msgIdx]);
    }, 1800);

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skinType: answers["skin-type"],
          primaryConcern: answers["primary-concern"],
          lifestyle: answers["lifestyle"]
        })
      });

      if (!response.ok) {
        throw new Error("Unable to load spa recommendations. Please reload and try again.");
      }

      const data: AdvisorResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during diagnostics.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  const getFullTreatmentData = (id: string): Treatment | undefined => {
    return TREATMENTS.find(t => t.id === id);
  };

  const isSelected = (id: string) => cart.some(item => item.id === id);

  return (
    <div id="quiz-block" className="py-24 bg-stone-950 text-white relative">
      <div className="absolute inset-0 bg-radial-gradient from-gold-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-3 text-gold-300 text-[9px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Skin Pathology Lab</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            Smart Skincare & Treatment Advisor
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-6" />
          <p className="max-w-lg mx-auto text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
            By answering three short diagnostic questions, our server-side skin modeling system recommends the optimal treatment recipes to restore perfect harmony.
          </p>
        </div>

        {/* Diagnostic Wizard Box */}
        <div className="bg-stone-900/60 backdrop-blur-md border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          <AnimatePresence mode="wait">
            {loading ? (
              /* Loading State */
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="py-16 text-center flex flex-col items-center justify-center"
              >
                <Loader2 className="w-12 h-12 text-gold-400 animate-spin mb-6" />
                <h3 className="font-serif text-xl font-medium mb-2 text-stone-200">
                  Crafting Your Custom Diagnosis
                </h3>
                <p className="text-gold-300 text-xs font-mono tracking-wider animate-pulse max-w-sm">
                  {loadingMessage}
                </p>
              </motion.div>
            ) : error ? (
              /* Error State */
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center max-w-md mx-auto"
              >
                <p className="text-rose-400 font-medium mb-4 text-sm">{error}</p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Diagnostic Quiz</span>
                </button>
              </motion.div>
            ) : result ? (
              /* Recommendations Results State */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="border-b border-stone-800 pb-6">
                  <span className="text-gold-400 text-[10px] font-bold tracking-widest block mb-2 uppercase">
                    AESTHETIC DIRECTOR REPORT
                  </span>
                  <p className="text-stone-300 text-sm leading-relaxed font-light italic">
                    "{result.generalAnalysis}"
                  </p>
                </div>

                {/* Recommended Treatments List mapped back to UI cards */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-4 flex items-center gap-2">
                    <span>Suggested Spa Prescriptions</span>
                    <span className="h-px bg-stone-800 flex-grow" />
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.recommendations.map((rec, rIdx) => {
                      const treatmentDetail = getFullTreatmentData(rec.treatmentId);
                      if (!treatmentDetail) return null;

                      return (
                        <motion.div
                          key={rIdx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: rIdx * 0.15 }}
                          whileHover={{ y: -4, borderColor: "rgba(212, 175, 55, 0.3)" }}
                          className="bg-stone-950/80 rounded-2xl p-5 border border-stone-800/65 flex flex-col justify-between transition-all"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-mono tracking-wider text-gold-400/90 bg-gold-400/5 border border-gold-400/10 px-2 py-0.5 rounded">
                                Match Score: {rec.suitabilityScore}%
                              </span>
                              <span className="text-stone-500 text-xs font-medium">
                                {treatmentDetail.duration} Min
                              </span>
                            </div>

                            <h4 className="font-serif text-base font-semibold text-white mb-2">
                              {treatmentDetail.name}
                            </h4>
                            
                            <p className="text-stone-400 text-xs font-light tracking-wide leading-relaxed mb-4">
                              {rec.reason}
                            </p>
                          </div>

                          {/* Custom action to add recommended treatment straight to cart */}
                          <div className="pt-4 border-t border-stone-900 flex items-center justify-between">
                            <span className="font-bold text-sm text-gold-300">
                              ${treatmentDetail.price}
                            </span>

                            <button
                              onClick={() => onToggleCart(treatmentDetail)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                isSelected(treatmentDetail.id)
                                  ? "bg-stone-800 text-gold-300 border border-stone-700"
                                  : "bg-gold-500 text-stone-950 hover:bg-gold-400"
                              }`}
                            >
                              {isSelected(treatmentDetail.id) ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Selected</span>
                                </>
                              ) : (
                                <span>Add to Reservation</span>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Unique Lifestyle Advice from Gemini */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gold-500/5 rounded-2xl p-6 border border-gold-500/10"
                >
                  <h4 className="text-gold-300 text-xs font-bold tracking-widest uppercase mb-3">
                    Aesthetic Director's Daily Advice
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.flatMap(rec => rec.lifestyleTips).slice(0, 3).map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-stone-300 text-xs">
                        <span className="text-gold-400 font-bold">•</span>
                        <span className="font-light">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Action feet */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-800">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-stone-400 hover:text-white transition-colors py-2 text-xs uppercase font-semibold tracking-wider cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Start Diagnostics Over</span>
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto bg-gold-600 hover:bg-gold-500 text-white font-semibold text-xs uppercase tracking-wider px-8 py-3 rounded-full text-center transition-colors cursor-pointer"
                  >
                    Confirm & View Booking Panel
                  </button>
                </div>

              </motion.div>
            ) : (
              /* Quiz Active Step State */
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-8"
              >
                
                {/* Question Progress bar */}
                <div className="flex items-center justify-between gap-4 text-xs font-medium text-stone-400">
                  <span>ANALYSIS PROTOCOL {step + 1} OF {totalSteps}</span>
                  <div className="flex-grow h-1 bg-stone-800 rounded-full overflow-hidden mx-4">
                    <motion.div
                      className="h-full bg-gold-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
                </div>

                {/* Question Headline */}
                <div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-stone-200">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Vertical Selection Options */}
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, oIdx) => {
                    const isChecked = answers[currentQuestion.id] === option.value;
                    return (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: oIdx * 0.08 }}
                        onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                        className={`group p-4 rounded-xl cursor-pointer border transition-all ${
                          isChecked
                            ? "bg-gold-500/10 border-gold-400 text-stone-100"
                            : "bg-stone-950/40 border-stone-800 text-stone-400 hover:bg-stone-950/60 hover:border-stone-700 hover:text-stone-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm text-stone-200">{option.label}</p>
                            {option.description && (
                              <p className="text-xs font-light text-stone-400 mt-1">
                                {option.description}
                              </p>
                            )}
                          </div>
                          
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isChecked ? "bg-gold-400 border-gold-400 text-stone-950" : "border-stone-700"
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom Nav indicators */}
                <div className="flex items-center justify-between pt-6 border-t border-stone-800">
                  <button
                    onClick={handlePrev}
                    disabled={step === 0}
                    className={`text-xs uppercase font-semibold tracking-wider cursor-pointer ${
                      step === 0 ? "text-stone-700 cursor-not-allowed" : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer ${
                      answers[currentQuestion.id]
                        ? "bg-gold-600 hover:bg-gold-500 text-white"
                        : "bg-stone-800 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    <span>{step === totalSteps - 1 ? "Submit Profile" : "Next Question"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
