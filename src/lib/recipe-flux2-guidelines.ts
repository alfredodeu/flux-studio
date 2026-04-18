/**
 * FLUX.2 Guidelines für Food Photography & Rezepte
 * Spezialisiert für hochwertige Lebensmittel-Fotos mit FLUX.2
 */

export interface RecipePreset {
  name: string;
  emoji: string;
  description: string;
  promptTemplate: string;
  negativePrompt: string;
  settings: {
    steps: number;
    cfg: number;
    sampler: string;
  };
}

/**
 * FOOD PHOTOGRAPHY PRESETS für FLUX.2
 */
export const RECIPE_PRESETS: RecipePreset[] = [
  {
    name: "Restaurant Quality",
    emoji: "⭐",
    description: "Professionelle Restaurantfotografie mit Studio-Beleuchtung",
    promptTemplate: `Photorealistisches DSLR Lebensmittel-Foto von [DISH],
professionelle Studio-Beleuchtung, warme goldene Lichter,
scharfer Fokus auf [MAIN_ITEM], shallow depth of field mit bokeh Hintergrund,
elegante weiße Keramik-Platte, perfekt angerichtete appetitliche Präsentation,
fine dining Restaurant-Qualität, lebendige reiche Farben, detaillierte Texturen,
luxuriöses Aussehen, hochdetailliert, 8K UHD, Museum-Qualität Fotografie`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 40, cfg: 3.5, sampler: "ipndm_v" },
  },
  {
    name: "Home Style (Gemütlich)",
    emoji: "🏡",
    description: "Warme, einladende Hausküchen-Atmosphäre",
    promptTemplate: `Cozy home kitchen food photography von [DISH],
warm natural window light streaming in, vintage weathered wooden table,
rustic authentic plating, genuine homemade style with professional quality,
natural warm colors, soft bokeh background, inviting cozy atmosphere,
scattered fresh ingredients around plate, soft warm shadows, high detail,
mouth-watering appeal, genuine authentic preparation visible`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 28, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Gourmet Plating",
    emoji: "👨‍🍳",
    description: "Haute Cuisine mit artistischem Plating",
    promptTemplate: `Haute cuisine fine dining food photography von [DISH],
artistic gourmet plating with precision placement, minimalist elegant white porcelain plate,
carefully drizzled sauce, vibrant microgreens garnish, refined fine dining presentation,
dramatic sophisticated side lighting, sharp focus on textures and details,
professional award-winning food photographer, sophisticated artistic composition,
elegant refined arrangement, luxurious upscale appearance, 8K detail`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 40, cfg: 3.0, sampler: "ipndm_v" },
  },
  {
    name: "Rustic & Authentic",
    emoji: "🌾",
    description: "Authentisch rustikale, ungezwungene Präsentation",
    promptTemplate: `Authentic rustic food photography von [DISH],
natural daylight window lighting, weathered wooden rustic table,
handmade rustic ceramic bowl or plate with character,
scattered fresh genuine ingredients around food, traditional preparation visible,
warm earthy natural tones, genuine authentic homemade style,
folk cooking aesthetic, detailed rich textures, appetizing appearance,
cultural authentic food presentation, warm natural colors`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 28, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Flat Lay (Top Down)",
    emoji: "📸",
    description: "Overhead flat lay Komposition mit Zutaten",
    promptTemplate: `Professional flat lay food photography von [DISH] from above,
overhead perspective with artistic composition, fresh vibrant ingredients artfully arranged,
cutting board with food prep visible, wooden utensils, fresh herbs and spices scattered,
natural bright daylight, clean white or wooden background,
professional food styling, Instagram-worthy aesthetic, high detail,
sharp focus, organized artistic arrangement, appetizing presentation`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 32, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Video Still (Motion Feel)",
    emoji: "🎬",
    description: "Dynamischer Shot mit Bewegungsenergie",
    promptTemplate: `Action dynamic food photography von [DISH],
captured mid-motion with energy, pouring glossy sauce, steam rising visibly,
dynamic cinematic composition, dramatic cinematic lighting, motion blur elements,
freshly prepared moment captured with action, appetizing and lively energy,
professional video frame quality, dynamic angular composition, 8K detail,
sharp focus on main subject, bokeh background adds depth`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 40, cfg: 3.5, sampler: "ipndm_v" },
  },
  {
    name: "Sweet & Pastries",
    emoji: "🍰",
    description: "Optimiert für Süßspeisen, Kuchen, Gebäck",
    promptTemplate: `Professional pastry and dessert photography von [DESSERT],
soft warm golden studio lighting highlighting layers and texture,
delicate fine details of pastry work and layers visible,
expertly garnished with vibrant fresh berries or rich chocolate,
elegant refined presentation on fine china or elegant cake stand,
shallow depth of field with soft bokeh background,
professional studio lighting, mouth-watering appeal, fine art food photography,
rich luxurious colors, 8K detail, upscale appearance`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 40, cfg: 3.0, sampler: "ipndm_v" },
  },
  {
    name: "Beverage Focus",
    emoji: "☕",
    description: "Getränke-Fotografie mit Atmosphere",
    promptTemplate: `Professional beverage photography von [DRINK],
detailed close-up view of drink in elegant glass, ice cubes with sparkling condensation,
elegant stirrer or fresh garnish visible, ambient mood lighting,
warm café or sophisticated bar atmosphere background with bokeh,
rich vibrant color of drink beautifully highlighted, refreshing appetizing appearance,
professional bar photography, cinematic lighting, high detail, 8K,
sharp focus on drink, luxurious upscale presentation`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 32, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Pasta Perfetto",
    emoji: "🍝",
    description: "Spezialisiert für Pasta und Nudel-Gerichte",
    promptTemplate: `Professional pasta food photography von [DISH],
perfectly cooked al dente noodles with glossy, creamy, rich sauce coating each strand,
steam rising from hot fresh pasta, visible sauce texture and shine,
gourmet plating on elegant white porcelain plate, vibrant fresh herb garnish,
warm golden studio lighting, shallow depth of field with bokeh background,
mouth-watering appeal, fine dining restaurant presentation, sharp focus,
8K UHD detail, professional food photographer quality, luxurious appearance`,
    negativePrompt: "blurry, low quality, distorted, artificial",
    settings: { steps: 40, cfg: 3.5, sampler: "ipndm_v" },
  },
  {
    name: "Pizza Croccante",
    emoji: "🍕",
    description: "Spezialisiert für Pizza mit perfekter Kruste",
    promptTemplate: `Professional pizza food photography von [DISH],
authentic Italian pizza mit knuspriger goldbraun gebackener Kruste mit Brandblasen,
geschmolzener cremiger frischer Mozzarella, vibrant grüne Basilikum Blätter,
lebendige rote Tomaten Sauce, hochwertiges Olivenöl drizzle,
minimal simple toppings only: tomato sauce mozzarella basil ONLY,
sharp focus on the three toppings, warm appetizing colors,
shallow depth of field, bokeh background, professional food photography,
studio lighting, cinematic, 8K detail, mouth-watering, award-winning food photography`,
    negativePrompt: "blurry, low quality, distorted",
    settings: { steps: 40, cfg: 4.0, sampler: "ipndm_v" },
  },
];

/**
 * SCHNELL-TIPPS FÜR FOOD PHOTOGRAPHY MIT FLUX.2
 */
export const FOOD_PHOTOGRAPHY_TIPS = {
  lighting: [
    "Golden hour light für warme Töne (Sonne früh morgens oder spätnachmittags)",
    "Seitenlicht erzeugt dramatische Schatten und 3D-Effekt",
    "Vermeidebigou hartes Licht von oben (macht Essen unappetitlich)",
    "Reflektoren/weiße Oberflächen zum Aufhellen von Schattenbereichen",
  ],
  plating: [
    "Negative space verwenden - Teller sollte nicht vollgestellt sein",
    "Ungerade Zahlen (3, 5) beim Anrichten nutzen",
    "Farbe-Kontraste: z.B. grüne Kräuter auf roten Tomaten",
    "Höhenunterschiede erzeugen visuelles Interesse",
  ],
  composition: [
    "Rule of thirds: Hauptgericht nicht in der Mitte platzieren",
    "Shallow depth of field: Fokus auf eine detail, Rest leicht unscharf",
    "Symmetrie oder Diagonale: nicht immer gerade Anordnungen",
    "Umgebung einbeziehen: Tisch, Besteck, Getränk für Kontext",
  ],
  colors: [
    "Warme Farben (Gold, Orange, Rot) wirken appetitlich",
    "Sättigung nutzen aber nicht übertreiben",
    "Komplementärfarben erzeugen spannung: rot/grün, blau/orange",
    "Natürliche Farben > künstliche Overbearbeitung",
  ],
};

/**
 * INTELLIGENTE KATEGORIE-ERKENNUNG für automatisches Preset
 */
export function detectFoodCategory(
  dishName: string,
  ingredients: string[]
): RecipePreset {
  const nameLower = dishName.toLowerCase();
  const ingredientLower = ingredients.map((i) => i.toLowerCase()).join(" ");

  // Pasta-Erkennung
  if (
    nameLower.includes("pasta") ||
    nameLower.includes("nudel") ||
    nameLower.includes("spaghetti") ||
    nameLower.includes("penne") ||
    nameLower.includes("ravioli") ||
    nameLower.includes("lasagne") ||
    ingredientLower.includes("pasta")
  ) {
    return RECIPE_PRESETS.find((p) => p.name === "Pasta Perfetto")!;
  }

  // Pizza-Erkennung
  if (
    nameLower.includes("pizza") ||
    nameLower.includes("focaccia") ||
    ingredientLower.includes("pizza dough")
  ) {
    return RECIPE_PRESETS.find((p) => p.name === "Pizza Croccante")!;
  }

  // Standard: Restaurant Quality
  return RECIPE_PRESETS.find((p) => p.name === "Restaurant Quality")!;
}

/**
 * PROMPT-GENERATOR für Rezepte mit intelligenten Zutaten-Ergänzungen
 */
export function generateFoodPrompt(
  dishName: string,
  ingredients: string[],
  preset: RecipePreset,
  customDetails?: string
): string {
  let prompt = preset.promptTemplate;
  const dishNameLower = dishName.toLowerCase();

  // Ersetze Platzhalter
  prompt = prompt.replace("[DISH]", dishName);
  prompt = prompt.replace("[MAIN_ITEM]", ingredients[0] || dishName);
  prompt = prompt.replace("[DESSERT]", dishName);
  prompt = prompt.replace("[DRINK]", dishName);

  // Hinweis: Pizza-Typ-Erkennung entfernt
  // FLUX.2 kann spezifische Pizza-Toppings nicht zuverlässig handhaben
  // Nutzer sollten für spezielle Varianten Custom Prompts verwenden

  // Intelligente Zutaten-basierte Ergänzung
  const ingredientLower = ingredients.map((i) => i.toLowerCase()).join(" ");

  // Sauce-Verbesserung
  if (
    ingredientLower.includes("cream") ||
    ingredientLower.includes("sahne") ||
    ingredientLower.includes("sauce")
  ) {
    prompt = prompt.replace(/sauce/gi, "creamy, glossy sauce");
  }

  // Käse-Verbesserung
  if (
    ingredientLower.includes("cheese") ||
    ingredientLower.includes("käse") ||
    ingredientLower.includes("mozzarella")
  ) {
    prompt = prompt.replace(/cheese/gi, "melted, gooey cheese");
  }

  // Kruste-Verbesserung
  if (
    ingredientLower.includes("crust") ||
    ingredientLower.includes("dough") ||
    ingredientLower.includes("teig")
  ) {
    prompt = prompt.replace(/crust/gi, "crispy golden crust");
  }

  // Füge Zutaten hinzu
  if (ingredients.length > 0) {
    const ingredientText = ingredients.slice(0, 3).join(", ");
    prompt = prompt.replace(
      /scattered ingredients|fresh ingredients|ingredients|scattered/gi,
      `fresh ingredients like ${ingredientText}`
    );
  }

  // Custom Details anhängen
  if (customDetails?.trim()) {
    prompt += `, ${customDetails}`;
  }

  return prompt;
}

/**
 * HÄUFIGE LEBENSMITTEL-FOTOGRAFIE FEHLER & LÖSUNGEN
 */
export const FOOD_COMMON_ISSUES = {
  "Essen sieht trocken aus": {
    tip: "Glanz/Nässe hinzufügen: 'glistening, fresh, moist surface'",
    prompt_addition: "glistening sauce, shiny glazed surface, fresh and appetizing",
  },
  "Falsche Farbe": {
    tip: "Spezifische Farbe angeben: 'golden brown, vibrant green'",
    prompt_addition: "golden brown, appetizing colors, rich vibrant tones",
  },
  "Zu künstlich aussehend": {
    tip: "Natürlichkeit betonen: 'natural, authentic, real food'",
    prompt_addition: "natural food photography, authentic preparation, real ingredients",
  },
  "Schlechte Tiefenschärfe": {
    tip: "Explizit angeben: 'shallow depth of field, sharp focus on...'",
    prompt_addition: "shallow depth of field, selective focus, soft bokeh background",
  },
  "Unprofessionelles Plating": {
    tip: "Präsentation beschreiben: 'fine dining presentation, artistic arrangement'",
    prompt_addition: "professional plating, artistic arrangement, fine dining presentation",
  },
};

/**
 * REZEPT-DATENSTRUKTUR
 */
export interface Recipe {
  id: string;
  name: string;
  description?: string;
  cuisine?: string; // z.B. "Italienisch", "Asiatisch", "Vegan"
  servings?: number;
  prepTime?: number; // Minuten
  cookTime?: number; // Minuten
  ingredients: string[];
  instructions?: string[];
  difficulty?: "easy" | "medium" | "hard";
  presetType: string; // Referenz zu RECIPE_PRESETS
  customNotes?: string;
  generatedImagePrompt?: string;
  imageUrl?: string;
  createdAt?: string;
}
