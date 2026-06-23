import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client strictly according to the skill instructions
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Using mock fallback mode for diagnostic analyzer.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getGeminiClient();

// Luxury services menu layout to ground the Gemini recommendations
const SPA_SERVICES_GROUNDING = [
  { id: "kobido-lift", name: "Japanese Kobi-Do Imperial Sculpt", benefits: "Lifting, anti-aging, firming, facial massage, facial muscle contouring." },
  { id: "oxygen-detox", name: "Pure Cellular Oxygen & Hyaluronic Infusion", benefits: "Dehydration, dryness, glass-skin moisture, travel jet-lag recovery, environmental distress." },
  { id: "vit-c-led", name: "Radiance Vitamin C & Advanced LED Ritual", benefits: "Hyperpigmentation, solar blemishes, dullness, fine lines, dark spots, revitalizing." },
  { id: "bamboo-shiatsu", name: "Deep Bamboo Shiatsu Fusion", benefits: "Deep muscle relief, body knots, tension, stressful workloads, postural alignment." },
  { id: "lymphatic-sculpt", name: "Savor Camellia Lymphatic Detox Massage", benefits: "De-bloating, anti- puffiness, lymphatic optimization, sensitive skins, delicate full body fluid drainage." },
  { id: "botanical-nurture", name: "Aromatherapy Botanical Neuro-Calm", benefits: "Severe anxiety, sleep disorders, nervous calm, sweeping relaxation strokes, thermal stone comfort." },
  { id: "matcha-scrub", name: "Detoxifying Matcha Green Tea Body Purifier", benefits: "Skin sloughing, whole body impurities, anti-oxidants, pore purification." },
  { id: "hydro-thermal", name: "Hydro-Refining Marine Thermal Cocoon", benefits: "Dry skin scaling, skeletal joint comfort, ultimate deep-cellular body moisture sealant." }
];

// POST /api/advisor: Smart wellness advisor powered by Gemini
app.post("/api/advisor", async (req: Request, res: Response): Promise<void> => {
  const { skinType, primaryConcern, lifestyle } = req.body;

  if (!skinType || !primaryConcern || !lifestyle) {
    res.status(400).json({ error: "Missing diagnostic parameters: 'skinType', 'primaryConcern', 'lifestyle' are required." });
    return;
  }

  const prompt = `
    You are the Elite Aesthetic & Skincare Resident Director at Lily Spa (a world-class Japanese organic and botanical wellness spa).
    Analyze the guest's profile:
    - Skin Type: ${skinType} (natural state balance)
    - Primary Concern: ${primaryConcern} (goal priority)
    - Influential Environmental/Lifestyle Factor: ${lifestyle}

    Recommend 2 to 3 treatment IDs exactly from this Lily Spa Services list:
    ${JSON.stringify(SPA_SERVICES_GROUNDING, null, 2)}

    Output a high-end personal skin analysis and beautiful diagnostic guidance. You must follow the exact JSON format specified in the schema.
  `;

  try {
    if (!ai) {
      // Elegant mock fallback response when key is unset
      console.log("Gemini API key is unset. Serving elegant spa fallback mock recommendation...");
      const mockAnalysis = `Our clinical-spa synthesis suggests that your ${skinType}-leaning skin under the influence of ${lifestyle} stressors is experiencing slight cellular hypoxia and moisture barrier fragility. By directly targeting ${primaryConcern} as your premier goal, we suggest prioritizing lymphatic pathways drainage to flush environmental stressors before launching active deep muscle work.`;
      
      const recommendations = [];
      if (primaryConcern === "anti-aging") {
        recommendations.push({
          treatmentId: "kobido-lift",
          reason: "Kobi-Do contouring works specifically along muscles weakened by environmental fatigue to lift and model facial shapes.",
          suitabilityScore: 96,
          lifestyleTips: ["Avoid ice-cold facial wash blocks; always use warm, misted water.", "Execute gentle upward-sweeping facial strokes before sleeping."]
        });
        recommendations.push({
          treatmentId: "vit-c-led",
          reason: "The advanced red light LED triggers natural cellular fibroblast energy, amplifying our lifting efforts.",
          suitabilityScore: 90,
          lifestyleTips: ["Minimize solar heat exposure during high-noon hours.", "Incorporate antioxidant foods like organic matcha tea."]
        });
      } else if (primaryConcern === "hydration") {
        recommendations.push({
          treatmentId: "oxygen-detox",
          reason: "Direct molecular O2 hyperbaric spraying will immediately fill cell dehydration creases caused by air conditioning.",
          suitabilityScore: 98,
          lifestyleTips: ["Apply natural hyaluronic serums while skin is damp.", "Sip lukewarm water with organic lemon daily."]
        });
        recommendations.push({
          treatmentId: "hydro-thermal",
          reason: "Warm thermal marine algae will seal moisture across dry limbs, counteracting dehydration cycles.",
          suitabilityScore: 91,
          lifestyleTips: ["Bathe in mildly warm water instead of steaming hot showers."]
        });
      } else {
        // Default healthy wellness package
        recommendations.push({
          treatmentId: "lymphatic-sculpt",
          reason: "Designed to drain heavy toxins under skin tissue and soothe high sensitivity markers.",
          suitabilityScore: 95,
          lifestyleTips: ["Massage cold jade rollers below eyes down the neck.", "Perform gentle manual skin tapping morning and night."]
        });
        recommendations.push({
          treatmentId: "botanical-nurture",
          reason: "Botanical hinoki wood oils help the nervous system reach a states of peaceful sleep restoration.",
          suitabilityScore: 92,
          lifestyleTips: ["Perform deep abdominal breathing exercises for 5 mins after sunset.", "Limit screens blue light exposure after 9:30 PM."]
        });
      }

      res.json({
        recommendations,
        generalAnalysis: mockAnalysis
      });
      return;
    }

    // Call actual Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the top-tier Lead Organic Skincare Pathologist at Lily Spa. Provide an extremely refined, luxurious, objective, and deeply encouraging skin wellness diagnosis. Match the tone of a high-end spa aesthetician. Never invent non-existent packages, always reference the provided treatment IDs exactly.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: "List of personalized treatment recommendations, precisely matching the treatmentIds given in the input list.",
              items: {
                type: Type.OBJECT,
                properties: {
                  treatmentId: { type: Type.STRING, description: "Must exactly be one of: kobido-lift, oxygen-detox, vit-c-led, bamboo-shiatsu, lymphatic-sculpt, botanical-nurture, matcha-scrub, hydro-thermal" },
                  reason: { type: Type.STRING, description: "Elegant, luxurious explanation of why this service perfectly benefits their specific skin types and lifestyle stressors." },
                  suitabilityScore: { type: Type.INTEGER, description: "Percentage calculated score of suitability from 80 to 100." },
                  lifestyleTips: {
                    type: Type.ARRAY,
                    description: "High-end bespoke botanical, dietary, or posture alignment tasks they can easily apply at home.",
                    items: { type: Type.STRING }
                  }
                },
                required: ["treatmentId", "reason", "suitabilityScore", "lifestyleTips"]
              }
            },
            generalAnalysis: {
              type: Type.STRING,
              description: "A highly sophisticated, customized paragraph analyzing how their skin type, core skin worry, and everyday environment correlate, written in an elite spa Director voice."
            }
          },
          required: ["recommendations", "generalAnalysis"]
        }
      }
    });

    const dataText = response.text;
    if (!dataText) {
      throw new Error("No response text yielded from Gemini.");
    }
    const resultJson = JSON.parse(dataText.trim());
    res.json(resultJson);

  } catch (error: any) {
    console.error("Gemini server error:", error);
    res.status(500).json({
      error: "We encountered an issue compiling your bespoke skincare recommendation. Please try again.",
      details: error.message
    });
  }
});

// POST /api/book: Simple validation route for reservation submits
app.post("/api/book", (req: Request, res: Response) => {
  const { treatments, therapist, date, time, clientName, clientEmail, clientPhone, notes } = req.body;

  if (!treatments || treatments.length === 0 || !therapist || !date || !time || !clientName || !clientEmail || !clientPhone) {
    res.status(400).json({ error: "Missing required booking details." });
    return;
  }

  // Generate luxury booking receipt code
  const code = `LS-${Date.now().toString().slice(-6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  res.json({
    id: code,
    status: "confirmed",
    message: "Thank you for reserving with Lily Spa. Your appointment is officially confirmed.",
    summary: {
      client: clientName,
      email: clientEmail,
      date,
      time,
      therapist: therapist.name,
      treatmentsCount: treatments.length,
      estimatedMinutes: treatments.reduce((acc: number, t: any) => acc + t.duration, 0)
    }
  });
});

// Setup Vite & Static Files handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite modern Dev Server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up Production Static File Server...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lily Spa server actively listening on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
