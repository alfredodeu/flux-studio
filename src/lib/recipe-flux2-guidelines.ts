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
shallow depth of field mit scharfem Fokus auf [MAIN_ITEM],
weiße Keramik-Platte, rustikaler Holztisch im Hintergrund,
scharfe Texturen, appetitlich angerichtet, fine dining presentation,
hochdetailliert, 8K UHD, Museum-Qualität Fotografie`,
    negativePrompt: "blurry, low quality, plastic plate, artificial, processed, oversaturated",
    settings: { steps: 40, cfg: 3.5, sampler: "ipndm_v" },
  },
  {
    name: "Home Style (Gemütlich)",
    emoji: "🏡",
    description: "Warme, einladende Hausküchen-Atmosphäre",
    promptTemplate: `Cozy home kitchen food photography von [DISH],
warm natural window light, vintage wooden table, rustic plating,
scattered ingredients around plate, soft shadows, inviting atmosphere,
homemade style but professional quality, natural colors,
soft bokeh background, high detail, mouth-watering appeal`,
    negativePrompt: "sterile, cold lighting, plastic, overstyled, artificial",
    settings: { steps: 28, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Gourmet Plating",
    emoji: "👨‍🍳",
    description: "Haute Cuisine mit artistischem Plating",
    promptTemplate: `Haute cuisine food photography von [DISH],
artistic gourmet plating, minimalist white porcelain plate,
drizzled sauce, microgreens garnish, fine dining presentation,
dramatic side lighting, sharp focus, professional food photographer,
sophisticated composition, elegant arrangement, 8K detail`,
    negativePrompt: "casual, home cooking, messy, sloppy plating, amateur",
    settings: { steps: 40, cfg: 3.0, sampler: "ipndm_v" },
  },
  {
    name: "Rustic & Authentic",
    emoji: "🌾",
    description: "Authentisch rustikale, ungezwungene Präsentation",
    promptTemplate: `Authentic rustic food photography von [DISH],
natural lighting, wooden rustic table, handmade ceramic bowl or plate,
scattered fresh ingredients, traditional preparation visible,
warm earthy tones, genuine homemade style, folk cooking aesthetic,
detailed textures, appetizing, cultural food presentation`,
    negativePrompt: "overly polished, sterile, modern, artificial styling",
    settings: { steps: 28, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Flat Lay (Top Down)",
    emoji: "📸",
    description: "Overhead flat lay Komposition mit Zutaten",
    promptTemplate: `Flat lay food photography von [DISH] from above,
overhead perspective, styled composition, fresh ingredients arranged,
cutting board with food prep, utensils, herbs and spices scattered,
natural daylight, clean white or wooden background,
professional food styling, instagram food photography style, high detail`,
    negativePrompt: "cluttered, messy, dark lighting, blurry",
    settings: { steps: 32, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Video Still (Motion Feel)",
    emoji: "🎬",
    description: "Dynamischer Shot mit Bewegungsenergie",
    promptTemplate: `Action food photography von [DISH],
captured mid-motion, pouring sauce, steam rising, dynamic composition,
cinematic food photography, dramatic lighting, motion blur elements,
freshly prepared moment captured, appetizing and lively,
professional video frame quality, dynamic angles, 8K detail`,
    negativePrompt: "static, staged, boring, still life, no motion",
    settings: { steps: 40, cfg: 3.5, sampler: "ipndm_v" },
  },
  {
    name: "Sweet & Pastries",
    emoji: "🍰",
    description: "Optimiert für Süßspeisen, Kuchen, Gebäck",
    promptTemplate: `Professional pastry and dessert photography von [DESSERT],
soft warm golden lighting, delicate details of layers and texture,
fine pastry work visible, garnished with fresh berries or chocolate,
elegant presentation on fine china or cake stand,
shallow depth of field with bokeh background,
studio lighting, mouthwatering, fine art food photography, 8K`,
    negativePrompt: "blurry, artificial, plastic, cheap looking, oversaturated",
    settings: { steps: 40, cfg: 3.0, sampler: "ipndm_v" },
  },
  {
    name: "Beverage Focus",
    emoji: "☕",
    description: "Getränke-Fotografie mit Atmosphere",
    promptTemplate: `Professional beverage photography von [DRINK],
detailed view of drink in elegant glass, ice cubes with condensation,
stirrer or garnish visible, ambient lighting, mood lighting,
café or bar atmosphere background with bokeh,
rich color of drink highlighted, refreshing appearance,
professional bar photography, cinematic, high detail, 8K`,
    negativePrompt: "flat, dull, artificial, plastic cup, boring",
    settings: { steps: 32, cfg: 3.5, sampler: "euler" },
  },
  {
    name: "Pasta Perfetto",
    emoji: "🍝",
    description: "Spezialisiert für Pasta und Nudel-Gerichte",
    promptTemplate: `Professional pasta food photography von [DISH],
creamy sauce with glossy, rich finish coating perfectly cooked al dente noodles,
steam rising from hot fresh pasta, sauce texture visible,
gourmet plating on white porcelain plate, fresh herbs garnish,
warm golden studio lighting, shallow depth of field,
mouth-watering appeal, fine dining presentation, high detail, 8K UHD,
appetizing, professional food photographer`,
    negativePrompt: "mushy pasta, dry sauce, dull finish, clumpy, overcooked, blurry, plastic",
    settings: { steps: 40, cfg: 3.5, sampler: "ipndm_v" },
  },
  {
    name: "Pizza Croccante",
    emoji: "🍕",
    description: "Spezialisiert für Pizza mit perfekter Kruste",
    promptTemplate: `Professional pizza food photography von [DISH],
authentische italienische Pizza mit knuspriger goldbraun gebackener Kruste mit Brandblasen,
geschmolzener cremiger Mozzarella Käse, frisches grünes Basilikum Blätter,
rote Tomaten Sauce visible, olivenöl drizzle, nur klassische Toppings,
KEINE Wurst KEINE Pepperoni KEINE Fleisch-Toppings,
warm appetizing colors, shallow depth of field, soft bokeh background,
professional food photography, studio lighting, cinematic, 8K detail,
mouth-watering, award-winning food photography, luxurious presentation`,
    negativePrompt: "burned crust, plastic cheese, soggy base, undercooked, blurry, dull colors, pepperoni, salami, wurst, ham, bacon, chorizo, fleisch, meat, sausage, artificial, fake looking, processed meats",
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

  // Ersetze Platzhalter
  prompt = prompt.replace("[DISH]", dishName);
  prompt = prompt.replace("[MAIN_ITEM]", ingredients[0] || dishName);
  prompt = prompt.replace("[DESSERT]", dishName);
  prompt = prompt.replace("[DRINK]", dishName);

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
