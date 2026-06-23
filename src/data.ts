import { Treatment, Therapist, SkinQuizQuestion, Testimonial } from "./types";

export const TREATMENTS: Treatment[] = [
  {
    id: "kobido-lift",
    name: "Japanese Kobi-Do Imperial Sculpt",
    category: "facials",
    duration: 75,
    price: 160,
    shortDescription: "An ancient ritualistic facial sculpting therapy that stimulates collagen production, improves tone, and lifts sagging contours.",
    fullDescription: "Kobi-Do is the oldest and most revered facial custom in Japan. Combining rapid, rhythmic percussion techniques with precise deep-tissue acupressure, this service reorganizes facial fibers. Perfect for anti-aging, lymphatic drainage, and lifting facial muscles without artificial treatments.",
    benefits: [
      "Visibly lifts and defines cheeks, jawlines, and brow arches",
      "Boosts lymphatic flow, flushing toxins and reducing puffiness",
      "Increases oxygen and blood circulation to the top skin layers",
      "Calms deep-seated facial tension and aligns nervous energy"
    ],
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop&q=80",
    specialtyTag: "Signature Treatment"
  },
  {
    id: "oxygen-detox",
    name: "Pure Cellular Oxygen & Hyaluronic Infusion",
    category: "facials",
    duration: 60,
    price: 145,
    shortDescription: "A highly hydrating, oxygenating facial that floods fatigued epidermal cells with high-purity O2 and custom nano-hyaluronic complexes.",
    fullDescription: "For hyper-stressed, dehydrated, or polluted skin. This state-of-the-art procedure cleanses and gently exfoliates, then uses specialized hyperbaric hyper-mist probes to push concentrated moisture, skin repairing vitamins, and pure oxygen deep into the dermis level for instant plumpness.",
    benefits: [
      "Instantly diminishes fine lines and dehydration creases",
      "Clarifies skin tone and supports hyper-active acne recovery",
      "Creates a supple, dewy, glass-like texture immediately",
      "Soothes sensitive skin, sunburns, or post-travel fatigue"
    ],
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&auto=format&fit=crop&q=80",
    specialtyTag: "Best for Glo-Up"
  },
  {
    id: "vit-c-led",
    name: "Radiance Vitamin C & Advanced LED Ritual",
    category: "facials",
    duration: 90,
    price: 180,
    shortDescription: "An antioxidant powerhouse session combining micro-peeling, cold-pressed Vitamin C esters, and custom spectrum light therapy.",
    fullDescription: "Designed to counteract dark spots, UV hyperpigmentation, and environmental skin fatigue. This intensive treatment blends gentle molecular resurfacing with advanced clinical-grade cold LED waves (Red for wrinkle collagen synthesis, Blue for clarifying breakout paths, or Amber for lymph stimulation).",
    benefits: [
      "Evens skin tone, fading dark blemishes and acne scarring",
      "Neutralizes radical environmental damage and solar stressors",
      "Tightens dilated pores and improves micro-surface elasticity",
      "Provides a long-lasting, inner-lit healthy skin glow"
    ],
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bamboo-shiatsu",
    name: "Deep Bamboo Shiatsu Fusion",
    category: "massages",
    duration: 80,
    price: 170,
    shortDescription: "Combining traditional Japanese meridian massage with warm, oil-infused solid bamboo rods that release deep structural tension.",
    fullDescription: "An intense yet mesmerizing full-body muscle relief session. Under steady pressure, the therapist utilizes warm solid bamboo rods of various sizes to roll, knead, and press key muscle fiber knots, punctuated by Japanese Zen Shiatsu thumbs-and-palms trigger point releases.",
    benefits: [
      "Melts long-standing neck, shoulder, and lower back tightness",
      "Supports myofascial unwinding and improves joint flexibility",
      "Deeply sedates active overthinking and mental stress loops",
      "Aids athletic, postural recovery and flushes lactic fluid"
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    specialtyTag: "Deep Therapeutic Pressure"
  },
  {
    id: "lymphatic-sculpt",
    name: "Savor Camellia Lymphatic Detox Massage",
    category: "massages",
    duration: 60,
    price: 130,
    shortDescription: "A gentle but highly precise whole-body drainage therapy utilizing wild cold-pressed organic Camellia Japonica oils.",
    fullDescription: "Fusing French lymphatic drainage with modern circulatory pumping methods. This highly relaxing, rhythmic experience uses soft-glide strokes to open lymphatic nodes, aiding safe fluid evacuation, removing water weight, and smoothing puffy tissue profiles. Ideal for detox wellness plans.",
    benefits: [
      "Visibly reduces under-skin fluid water retention",
      "Aids in general body de-bloating and metabolic acceleration",
      "Exceptionally gentle, perfect for recovery or sensitive biologies",
      "Aromatically enriched with organic hinoki wood and camellia"
    ],
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "botanical-nurture",
    name: "Aromatherapy Botanical Neuro-Calm",
    category: "massages",
    duration: 75,
    price: 140,
    shortDescription: "A sensory-immersive botanical journey combining custom-blended nervous-system sedating oils with long lomi-lomi flow strokes.",
    fullDescription: "Before the treatment begins, you will select from four signature botanical herbal infusions. The therapist uses warm basalt palm-stones to warm key energy sites, then executes slow, sweeping waves of pressure down of your limbs and spine, bringing total harmony to the mind-body axis.",
    benefits: [
      "Intensifies sleep cycle depth and relieves severe anxiety levels",
      "Relaxes full skeletal frameworks through continuous wave rhythm",
      "Replenishes dry dermis layers with nourishing botanical lipids",
      "Re-centers scattered awareness and centers personal grounding"
    ],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80",
    specialtyTag: "High Calm Vibe"
  },
  {
    id: "matcha-scrub",
    name: "Detoxifying Matcha Green Tea Body Purifier",
    category: "rituals",
    duration: 90,
    price: 195,
    shortDescription: "An anti-oxidant rich experience featuring stone-ground matcha exfoliation, volcanic white clay wrap, and warm oil finish.",
    fullDescription: "Revitalize full-body vitality starting with a gentle body exfoliation using crushed bamboo, Himalayan minerals, and fresh-milled green tea leaves. Your body is then enveloped in a warm, detoxifying thermal marine clay cocoon to extract deep pore impurities, followed by a scalp massage and lightweight oil hydration.",
    benefits: [
      "Sloughs dead surface cells to unveil velvety, bright body skin",
      "Supplies trace marine minerals and rich polyphenolic green tea antioxidants",
      "Purifies pores on back, shoulders, arms, and thighs",
      "Supports circulatory health and eases full muscular posture"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    specialtyTag: "Complete Detox"
  },
  {
    id: "hydro-thermal",
    name: "Hydro-Refining Marine Thermal Cocoon",
    category: "rituals",
    duration: 75,
    price: 165,
    shortDescription: "A premium texturizing body treatment combining thermal oceanic salt polish with high-potency mineral body sealing.",
    fullDescription: "This advanced body rejuvenation focuses on profound hydration and contour smoothing. Following a refreshing oceanic mineral scrub, we apply a warm gel compiled of blue sea algae, seaweed extracts, and moisturizing essential matrices. Cocooned in gentle warmth, toxins are drawn away, raising skin luminosity and silkiness.",
    benefits: [
      "Nourishes depleted tissue with deep moisture barriers",
      "Improves natural body firming and visual skin density",
      "Refines cell textures to prevent seasonal dry skin crusting",
      "Warm therapeutic insulation relaxes core skeletal joints"
    ],
    image: "https://images.unsplash.com/photo-1519735000581-360e2dac293a?w=600&auto=format&fit=crop&q=80"
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: "mika",
    name: "Mika Tanaka",
    role: "Kobi-Do & Facial Master",
    rating: 4.9,
    specialties: ["Facial Sculpting", "Lifting Massage", "Acupressure Science", "Kobi-Do Imperial Custom"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    bio: "Hailing from Kyoto, Mika has over 14 years of facial contouring practice. She approaches skincare as an ancient kinetic dance, lifting muscles back to their native youthfulness through detailed percussion movements.",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: "elena",
    name: "Elena Petrova",
    role: "Senior Myofascial Deep-Tissue Specialist",
    rating: 5.0,
    specialties: ["Deep Muscle Relief", "Bamboo Shiatsu Fusion", "Sports Trigger Recovery", "Neuromuscular Calm"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    bio: "Elena specializes in resolving stubborn chronic muscle constraints, combining focused structural realignment with warm bamboo rollers interface for a satisfyingly deep and lasting physical release.",
    availableDays: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: "david",
    name: "David Vance",
    role: "Aromatherapy & Holistic Guide",
    rating: 4.8,
    specialties: ["Botanical Aromatherapy", "Lymphatic Detox Massage", "Neuro-Calm Stress Release", "Algae Thermal Rituals"],
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    bio: "David integrates customized organic essential oils with soothing rhythmic waves of pressure, focusing on aligning high-stress nervous loops to prompt physiological renewal and pure quietness.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Saturday", "Sunday"]
  }
];

export const SKIN_QUIZ_QUESTIONS: SkinQuizQuestion[] = [
  {
    id: "skin-type",
    question: "How would you describe your skin's daily natural balance?",
    options: [
      { value: "oily", label: "Prone to shine / Visible pores", description: "Oily sheen throughout the face, periodically struggle with breakouts or congestion." },
      { value: "dry", label: "Feels tight / Flaky patches", description: "Lacks moisture, easily irritated by cold wind, fine dry creases around the eyes or mouth." },
      { value: "combination", label: "Oily T-zone but dry cheeks", description: "Cheeks lack moisture but the forehead, nose, and chin produce higher natural oils." },
      { value: "sensitive", label: "Redness prone / Reacts quickly", description: "Frequently flushes, burns or stings when applying active products; feels very delicate." }
    ]
  },
  {
    id: "primary-concern",
    question: "What is your absolute highest priority wellness or skincare goal?",
    options: [
      { value: "anti-aging", label: "Firming, lifting, & tone loss", description: "Reduce deep expression lines, plump drooping contour paths, and boost structural density." },
      { value: "hydration", label: "Deep moisture & radiant glow", description: "Extinguish severe dullness, replenish water reserves, and restore a fluid glass finish." },
      { value: "detox", label: "Clearing impurities & metabolic flush", description: "Eradicate pore congestion, flush fluid retention or swelling, and purify toxins." },
      { value: "stress", label: "Nervous-system decompression", description: "Calm high-stress adrenaline loops, release deep muscular aches, and find mental rest." }
    ]
  },
  {
    id: "lifestyle",
    question: "Which environmental stressor affects your skin or body the most?",
    options: [
      { value: "urban", label: "City pollution / Dry office AC", description: "Spend hours in air-conditioned rooms or urban environments with dust, congestion, or artificial light." },
      { value: "travel", label: "Frequent traveler / Sleep changes", description: "Regular cabin air exposure, jet lag, disrupted sleep patterns, or shifting climates." },
      { value: "work", label: "Physical tension / High screen-time", description: "Prolonged desk sitting, slouching shoulders, repetitive posture fatigue, and heavy screen blue light." },
      { value: "climate", label: "Arid dry or highly humid weather", description: "Extreme climate fluctuation, heavy sun contact, or severe winter skin peeling cycles." }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sienna Miller",
    role: "Beauty Editor, Mode-Luxe",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    text: "The Japanese Kobi-Do sculpt was nothing short of miraculous. My jawline and cheek paths looked visibly raised, and the deep aesthetic peace I felt lingered for days. Lily Spa is a literal oasis of purity.",
    source: "Verified Editorial Review"
  },
  {
    id: "test-2",
    name: "Marcus Aurel",
    role: "Senior Consultant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Years of poor desk habits left my shoulders locked. Elena's Deep Bamboo Shiatsu therapy literally dissolved the physical steel knots. I have completely restored my complete torso mobility.",
    source: "Verified Guest"
  },
  {
    id: "test-3",
    name: "Aisha Yusuf",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    text: "I booked the Algae ocean wrap followed by Vitamin C facial. Truly masterclass skincare execution. The botanical aromatherapy transport was ethereal. Outstanding service attitude.",
    source: "Verified Guest"
  }
];

export const FAQS = [
  {
    question: "How early should I arrive before my scheduled reservation?",
    answer: "We recommend arriving 15 to 20 minutes prior to your treatment. This allows you plenty of relaxed time to transition, fill out your medical or lifestyle advisor chart, enjoy our hand-whisked botanical cold matcha tea, and decompress in our silent garden waiting room."
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer: "Because our therapists craft bespoke preparations before you arrive, we require at least 24 hours' notice for cancellations or modifications. Appointments cancelled within 24 hours incur a 50% reservation service fee, while no-shows are billed at 100%."
  },
  {
    question: "Which treatment should I choose if I am pregnant?",
    answer: "Congratulations! Our gentle 'Savor Camellia Lymphatic Detox Massage' is highly beneficial for expecting mothers. However, our deep-pressure bamboo Shiatsu or heated marine cocoons are contraindicated. Please denote your status in the reservation notes so we customize the treatment."
  },
  {
    question: "Should men shave prior to receiving a Signature Facial?",
    answer: "Shaving is not strictly mandatory, but if you choose to do so, we advise doing it at least 4 hours before your facial session to avoid potential product sting or micro-abrasion skin irritation."
  }
];
