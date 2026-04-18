/**
 * FLUX.2-Guidelines und Best Practices
 * Basierend auf offiziellen Empfehlungen für FLUX.2-dev
 */

export interface Flux2Preset {
  name: string;
  description: string;
  model: string;
  sampler: string;
  scheduler: string;
  steps: number;
  cfg: number;
  resolution: { width: number; height: number };
  negativePrompt: string;
  guidance: string;
}

/**
 * 1. GRUNDPRINZIPIEN FÜR FLUX.2-PROMPTS
 * - Verwende längere, natürlich formulierte Sätze (1-3 Sätze)
 * - Beschreibe konkret: Alter, Material, Stimmung, Licht, Perspektive
 * - Statt "4k, 8k, ultra detailed" verwende reale Begriffe wie "feine Hautporen, strukturierte Stoffe"
 * - Schreibe in einer Sprache (Deutsch ODER Englisch), nicht mischen
 */
export const FLUX2_PROMPT_GUIDELINES = `
FLUX.2-Modelle verstehen längere, natürlich formulierte Sätze besser als Stichwort-Spam.

EMPFOHLENER AUFBAU (1-3 Sätze):

Satz 1: Hauptmotiv + Szene
"Ein hyperrealistisches Foto eines alten Fischerbootes am Ufer eines Bergsees bei Sonnenaufgang,
ruhiges Wasser und Nebel über der Oberfläche."

Satz 2: Kamera / Stil / Licht
"Aufgenommen mit einer 50mm-Linse, weiche goldene Morgenbeleuchtung, detaillierte Texturen,
feine Spiegelungen im Wasser."

Satz 3: Look / Qualität
"Kinoartige Farbkorrektur, hohe Detailtreue, ultra-realistische Darstellung."

WICHTIGE TIPPS:
✓ Beschreibe konkret: Alter, Material, Stimmung, Licht, Perspektive
✓ Statt "4k, 8k, ultra detailed": verwende reale Begriffe wie "feine Hautporen, strukturierte Stoffe, scharfe Schattenkanten"
✓ Schreibe in EINER Sprache (Deutsch ODER Englisch), nicht mischen
`;

/**
 * 2. NEGATIVE PROMPTS BEI FLUX.2
 * - CFG (Guidance) stark mit dem Einfluss des Negativ-Prompts gekoppelt
 * - Mit CFG=1 (wie FLUX.1): sehr minimaler oder leerer Negativ-Prompt
 * - Mit CFG=3-4 (empfohlen für FLUX.2): kurze, gezielt negative Begriffe
 */
export const NEGATIVE_PROMPT_GUIDELINES = `
Der Einfluss des Negativ-Prompts ist an den CFG/Guidance-Scale gekoppelt.

FÜR CFG=1 (wie FLUX.1-dev):
- Kaum oder kein Negativ-Prompt
- Das distilled Modell generiert bereits sehr sauber

FÜR CFG=3-4 (EMPFOHLEN FÜR FLUX.2):
- Negativ-Prompt kurz halten
- Nur harte "No-Gos" eintragen
- Typischer Negativ-Prompt:
  "verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, Schriftzug, Wasserzeichen, Rahmen, Logos"

WANN NEGATIV-PROMPT ERWEITERN:
- Wenn du wiederholt denselben Fehler bekommst (z.B. Texte im Bild, zu viel Noise)
- Füge GENAU das hinzu
- Vermeide lange Listen mit 50 Begriffen → FLUX reagiert besser auf 5-10 gezielte Ausschlüsse
`;

/**
 * 3. SAMPLER & SCHEDULER FÜR FLUX.2
 * FLUX nutzt "rectified flow", deshalb andere Sampler/Scheduler-Kombinationen als SD v1/v1.5/XL
 */
export const SAMPLER_SCHEDULER_GUIDELINES = `
EMPFOHLENE SAMPLER:
- euler: oft stabil und schnell
- ipndm_v: speziell mit Flow-Scheduler empfohlen
- andere "ipndm"-Varianten

EMPFOHLENE SCHEDULER:
- discrete: generelle Empfehlung für moderne Image-Modelle
- flux2-scheduler: dynamischer Shift-Scheduler, explizit für FLUX.2 optimiert
  → arbeitet über die Auflösung hinweg besser als einfache "simple"-Scheduler

TYPISCHE SETTINGS FLUX.2-dev:
- Sampler: ipndm_v oder euler
- Scheduler: flux2-scheduler ODER discrete
- Steps: 28-50 (Untergrenze 20, Sweet Spot 30-40)
- Guidance/CFG: ca. 3-4 (höher → "overcooked" Artefakte)

TROUBLESHOOTING (schlechte Ergebnisse: Matsch, Artefakte):
1. Sampler wechseln: von euler auf ipndm_v oder umgekehrt
2. Scheduler wechseln: von simple/linear auf discrete oder flux2-scheduler
3. Steps leicht erhöhen: z.B. von 24 auf 32
`;

/**
 * PRESETS für FLUX.2
 */
export const FLUX2_PRESETS: Flux2Preset[] = [
  {
    name: "Schnell & Gut",
    description: "Schnelle Generierung mit guter Qualität",
    model: "flux-2-klein-9b.safetensors",
    sampler: "euler",
    scheduler: "discrete",
    steps: 28,
    cfg: 3.5,
    resolution: { width: 1024, height: 1024 },
    negativePrompt: "verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, Schriftzug, Wasserzeichen, Rahmen, Logos",
    guidance: "CFG 3.5 - Balance zwischen Prompttreue und Qualität",
  },
  {
    name: "Max Qualität",
    description: "Höhere Qualität (dauert länger)",
    model: "flux-2-klein-9b.safetensors",
    sampler: "ipndm_v",
    scheduler: "discrete",
    steps: 40,
    cfg: 3.0,
    resolution: { width: 1216, height: 832 },
    negativePrompt: "verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, Schriftzug, Wasserzeichen, Rahmen, Logos, extra Arme, extra Beine",
    guidance: "CFG 3.0 - Subtilere Qualität ohne Übersteuerung",
  },
  {
    name: "Ultra Qualität (HD)",
    description: "Maximale Qualität und Details (längste Generierungszeit)",
    model: "flux-2-klein-9b.safetensors",
    sampler: "ipndm_v",
    scheduler: "discrete",
    steps: 50,
    cfg: 3.0,
    resolution: { width: 1344, height: 768 },
    negativePrompt: "verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, Schriftzug, Wasserzeichen, Rahmen, Logos",
    guidance: "CFG 3.0 - Beste Details, breites Format vermeidet manche High-Res-Artefakte",
  },
  {
    name: "Experimentell (Low CFG)",
    description: "CFG=1 wie FLUX.1 (minimaler Negativ-Prompt)",
    model: "flux-2-klein-9b.safetensors",
    sampler: "euler",
    scheduler: "discrete",
    steps: 28,
    cfg: 1.0,
    resolution: { width: 1024, height: 1024 },
    negativePrompt: "",
    guidance: "CFG 1.0 - Wie FLUX.1, kaum Negativ-Prompt nötig",
  },
];

/**
 * PROMPT-VORLAGEN für FLUX.2
 * Wiederverwendbar als Template
 */
export const PROMPT_TEMPLATES = {
  photorealistic: `[Motiv] in/auf/an [Umgebung], [Tageszeit], [Stimmung], [Kamera/Optik], [Licht], [Detailgrad], [Stil].

Beispiel: "Porträt eines älteren Mannes mit Bart, sitzt in einem gemütlichen Café bei Abendlicht,
warme Orange- und Brauntöne, fotografiert mit 85mm-Linse, weiche Hintergrundunschärfe,
sehr detaillierte Hautstruktur, realistischer moderner Fotostil."`,

  pixar: `[Charakter/Objekt], Pixar animated style, 3D render, [Umgebung], [Beleuchtung], [Stimmung].

Beispiel: "A brave firefighter boy, wearing a yellow helmet and red jacket, Pixar animated character,
stylized Pixar-like figure, big expressive eyes, full body, soft rounded shapes, smooth plastic material,
studio lighting, high resolution, rendered as modern 3D animated movie still, vibrant colors."`,

  disneystyle: `[Charakter/Szene], Disney animation style, hand-drawn aesthetic, [Umgebung], magical atmosphere, [Detailgrad].

Beispiel: "A young girl with golden hair, Disney animation style, classic character design, soft colors,
magical kingdom castle background, whimsical mood, detailed animation, vintage Disney aesthetic."`,

  studioghibli: `[Szene], Studio Ghibli style, hand-drawn animation, [Umgebung], [Stimmung], watercolor aesthetic, detailed.

Beispiel: "A peaceful rural Japanese village, Studio Ghibli style, hand-drawn animation, green rice fields,
old wooden houses, mountain background, dreamy atmosphere, watercolor painting aesthetic, whimsical details."`,

  cyberpunk: `[Szene/Charakter], Cyberpunk aesthetic, neon lights, futuristic [Umgebung], [Beleuchtung], [Stimmung].

Beispiel: "A female hacker, cyberpunk aesthetic, neon-lit futuristic city street, rain reflections,
holographic displays, neon glow pink and cyan, blade runner style, dramatic lighting, high tech atmosphere."`,

  food: `Photorealistisches Lebensmittel-Foto: [Gericht], [Präsentation], [Beleuchtung], [Umgebung],
[Kamera-Details], [Stil], [Qualität].

Beispiel: "Photorealistisches DSLR Lebensmittel-Foto einer ganzen gebratenen Ente auf rotierendem
Spieß, goldbraun knusprige Haut glänzend von Fett, dramatische warme Studio-Beleuchtung,
flache Tiefenschärfe, ländliche Bistro-Atmosphäre, reiche warme Töne von Gold und Braun,
scharfer Fokus, hochdetailliert."`,

  filmnoir: `[Szene/Charakter], Film noir style, black and white, high contrast, 1940s aesthetic, [Umgebung], [Stimmung].

Beispiel: "A detective in a dark alley, film noir style, black and white photography, dramatic shadows,
rain on pavement, mysterious mood, 1940s urban aesthetic, strong contrast, cinematic composition."`,

  scifi: `[Szene/Charakter], Science fiction aesthetic, futuristic technology, [Umgebung], alien/advanced civilization, [Beleuchtung].

Beispiel: "A spaceship interior, science fiction aesthetic, advanced alien technology, glowing panels,
cosmic atmosphere through windows, futuristic design, dramatic lighting, concept art quality."`,
};

/**
 * HÄUFIGE FEHLER und LÖSUNGEN
 */
export const COMMON_ISSUES = {
  "Zu viele Hände/Finger": {
    problem: "Extra Hände oder falsche Fingeranzahl",
    solution: "Negativ-Prompt: 'extra fingers, too many hands, deformed hands'",
  },
  "Doppelgesichter": {
    problem: "Mehrere oder verzerrte Gesichter",
    solution: "Negativ-Prompt: 'double face, duplicate face, two faces'",
  },
  "Text im Bild": {
    problem: "Unerwünschter Text oder Schriftzüge",
    solution: "Negativ-Prompt: 'text, lettering, watermark, signature, words'",
  },
  "Übersteuerung": {
    problem: "Zu 'gekochte' Ergebnisse, artifizielle Artefakte",
    solution: "CFG von 3.5 auf 2.5-3.0 reduzieren, Steps erhöhen",
  },
  "Matschig/Unscharf": {
    problem: "Verschwommene oder mushy Qualität",
    solution: "Steps erhöhen (von 24 zu 32-40), Sampler zu ipndm_v wechseln, Scheduler zu discrete",
  },
  "Falsche Anatomie": {
    problem: "Asymmetrische oder fehlerhafte Körperteile",
    solution: "Prompt detaillierter schreiben: 'anatomically correct, both arms visible, proper proportions'",
  },
};

/**
 * RESOLUTION-EMPFEHLUNGEN
 */
export const RESOLUTION_GUIDE = `
Standard:
- 1024×1024: Universell gut, schnell
- 1216×832: Leicht breites Format, vermeidet manche High-Res-Artefakte
- 1344×768: Noch breiter, für sehr detaillierte Landschaften

Zu beachten:
- Höhere Auflösungen erfordern mehr VRAM
- Ungewöhnliche Aspekt-Verhältnisse können Artefakte verursachen
- FLUX.2 funktioniert gut mit verschiedenen Auflösungen
`;

/**
 * BEST PRACTICES ZUSAMMENFASSUNG
 */
export const BEST_PRACTICES = {
  prompts: [
    "Schreibe 1-3 Sätze in natürlicher Sprache",
    "Beschreibe konkrete Details: Alter, Material, Stimmung, Licht, Perspektive",
    "Verwende reale Kamera-Begriffe statt 'ultra detailed'",
    "Bleibe bei einer Sprache (Deutsch ODER Englisch)",
  ],
  negativePrompts: [
    "Kurz halten (5-10 gezielt negative Begriffe)",
    "Nur bei CFG 3+ notwendig",
    "Bei CFG 1 fast leer lassen",
    "Spezifische Fehler hinzufügen, wenn sie wiederholt vorkommen",
  ],
  settings: [
    "Sampler: euler oder ipndm_v",
    "Scheduler: discrete oder flux2-scheduler",
    "Steps: 28-50 (Sweet Spot 30-40)",
    "CFG: 3-4 (max Qualität ohne Übersteuerung)",
  ],
  troubleshooting: [
    "Schlechte Qualität? → Steps erhöhen",
    "Artefakte? → CFG reduzieren, Sampler/Scheduler wechseln",
    "Spezifische Fehler? → Negativ-Prompt erweitern",
    "Immer noch Probleme? → Prompt umformulieren oder detaillierter schreiben",
  ],
};
