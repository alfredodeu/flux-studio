# FLUX.2 - Vorgaben und Best Practices für Flux Studio

Dieses Dokument enthält alle wichtigen Richtlinien zur Verwendung von FLUX.2 Modellen in Flux Studio.

## 📋 Inhaltsverzeichnis

1. [Grundprinzipien für FLUX.2-Prompts](#grundprinzipien)
2. [Negativ-Prompts](#negativ-prompts)
3. [Sampler & Scheduler](#sampler--scheduler)
4. [Presets (Schnellstart)](#presets)
5. [Prompt-Muster](#prompt-muster)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## 1. Grundprinzipien für FLUX.2-Prompts {#grundprinzipien}

FLUX-Modelle **verstehen längere, natürlich formulierte Sätze** besser als Stichwort-Spam.

### Empfohlener Aufbau (1–3 Sätze)

**Satz 1: Hauptmotiv + Szene**
```
"Ein hyperrealistisches Foto eines alten Fischerbootes am Ufer eines Bergsees 
bei Sonnenaufgang, ruhiges Wasser und Nebel über der Oberfläche."
```

**Satz 2: Kamera / Stil / Licht**
```
"Aufgenommen mit einer 50mm-Linse, weiche goldene Morgenbeleuchtung, 
detaillierte Texturen, feine Spiegelungen im Wasser."
```

**Satz 3: Look / Qualität**
```
"Kinoartige Farbkorrektur, hohe Detailtreue, ultra-realistische Darstellung."
```

### Wichtige Tipps ✓

- ✓ **Beschreibe konkret**: Alter, Material, Stimmung, Licht, Perspektive
- ✓ **Statt "4k, 8k, ultra detailed"**: verwende reale Begriffe wie:
  - "feine Hautporen"
  - "strukturierte Stoffe"
  - "scharfe Schattenkanten"
- ✓ **Sprache konsistent halten**: Deutsch ODER Englisch, **nicht mischen**
- ✓ **Natürliche Sätze**: FLUX versteht gut strukturierte Texte
- ✓ **Kontext geben**: Umgebung, Tageszeit, Stimmung, Lichtsituation

---

## 2. Negativ-Prompts {#negativ-prompts}

Der Einfluss des Negativ-Prompts ist **direkt an den CFG/Guidance-Scale gekoppelt**.

### Bei CFG = 1 (wie FLUX.1-dev)
```
❌ Kaum oder kein Negativ-Prompt
   Das Modell ist "distilled" und generiert bereits sehr sauber.
   Zu viel Negativ-Prompt → Artefakte
```

### Bei CFG = 3–4 (EMPFOHLEN FÜR FLUX.2) ✅

**Typischer Negativ-Prompt:**
```
"verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, Schriftzug, 
Wasserzeichen, Rahmen, Logos"
```

### Wann Negativ-Prompt ERWEITERN

- ❓ Wenn du **wiederholt denselben Fehler** bekommst
- ✓ Füge GENAU diesen Fehler hinzu, z.B.:
  - Probleme mit Händen? → `"extra fingers, too many hands, deformed hands"`
  - Zu viel Noise? → `"noise, grain, blur, low quality"`
  - Falsche Anatomie? → `"extra arms, extra legs, mutated limbs"`

### Regel für Negativ-Prompts
```
⚠️ Vermeide lange Listen mit 50+ Begriffen
✅ FLUX reagiert besser auf 5–10 **gezielte** Ausschlüsse
```

---

## 3. Sampler & Scheduler {#sampler--scheduler}

FLUX-Modelle nutzen "rectified flow", deshalb andere Sampler/Scheduler als klassische Stable Diffusion.

### Empfohlene Sampler

| Sampler | Beschreibung |
|---------|-------------|
| **euler** | Oft stabil und schnell, gute Ausgangswahl |
| **ipndm_v** | Speziell mit Flow-Scheduler empfohlen |
| andere ipndm-Varianten | Alternative zu euler |

### Empfohlene Scheduler

| Scheduler | Beschreibung |
|-----------|-------------|
| **discrete** | Generelle Empfehlung für moderne Image-Modelle |
| **flux2-scheduler** | 🌟 Dynamischer Shift-Scheduler, explizit für FLUX.2 optimiert |

> **flux2-scheduler** arbeitet über die Auflösung hinweg besser als einfache "simple"-Scheduler

### Typische FLUX.2-Settings

```javascript
{
  sampler: "ipndm_v" oder "euler",
  scheduler: "flux2-scheduler" oder "discrete",
  steps: 28–50,              // Untergrenze 20, Sweet Spot 30–40
  cfg: 3–4,                  // Höher → "overcooked" Artefakte
}
```

---

## 4. Presets (Schnellstart) {#presets}

### Preset 1: "Schnell & Gut"

```javascript
{
  model: "flux-2-klein-9b.safetensors",
  sampler: "euler",
  scheduler: "discrete",
  steps: 28,
  cfg: 3.5,
  resolution: "1024×1024",
  negativePrompt: "verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, Wasserzeichen"
}
```

**Best für**: Schnelle Iterationen, gutes Balance-Verhältnis

---

### Preset 2: "Max Qualität (mehr Zeit)"

```javascript
{
  model: "flux-2-klein-9b.safetensors",
  sampler: "ipndm_v",
  scheduler: "discrete",
  steps: 40,
  cfg: 3.0,
  resolution: "1216×832",    // Leicht breites Format
  negativePrompt: "verzerrt, unscharf, Doppelgesicht, Extra-Finger, Text, 
                   Wasserzeichen, extra Arme, extra Beine"
}
```

**Best für**: Hohe Qualität, detaillierte Motive, Portrait

---

### Preset 3: "Ultra Qualität (HD)"

```javascript
{
  model: "flux-2-klein-9b.safetensors",
  sampler: "ipndm_v",
  scheduler: "discrete",
  steps: 50,
  cfg: 3.0,
  resolution: "1344×768",    // Breites Format vermeidet manche High-Res-Artefakte
}
```

**Best für**: Maximale Details, Landschaften, komplexe Szenen

---

### Preset 4: "Experimentell (CFG=1)"

```javascript
{
  model: "flux-2-klein-9b.safetensors",
  sampler: "euler",
  scheduler: "discrete",
  steps: 28,
  cfg: 1.0,
  negativePrompt: ""         // Leer lassen!
}
```

**Best für**: Experimentieren wie FLUX.1-dev

---

## 5. Prompt-Muster {#prompt-muster}

### Muster 1: Fotorealistisch

```
[Motiv] in/auf/an [Umgebung], [Tageszeit], [Stimmung], 
[Kamera/Optik], [Licht], [Detailgrad], [Stil].
```

**Beispiel:**
```
"Porträt eines älteren Mannes mit Bart, sitzt in einem gemütlichen Café 
bei Abendlicht, warme Orange- und Brauntöne, fotografiert mit 85mm-Linse, 
weiche Hintergrundunschärfe, sehr detaillierte Hautstruktur, 
realistischer moderner Fotostil."
```

### Muster 2: Illustration

```
Isometrische Illustration einer [Szene], [Beleuchtung], [Stil], [Detailgrad].
```

**Beispiel:**
```
"Isometrische Illustration einer futuristischen Stadt bei Nacht, 
neonbeleuchtete Hochhäuser, fliegende Autos, klare Linien und scharfe Kanten, 
inspiriert von moderner Sci-Fi-Konzeptkunst, hoher Detailgrad, kräftige Kontraste."
```

### Muster 3: Lebensmittel-Fotografie

```
Photorealistisches Lebensmittel-Foto: [Gericht], [Präsentation], 
[Beleuchtung], [Umgebung], [Kamera-Details], [Stil], [Qualität].
```

**Beispiel:**
```
"Photorealistisches DSLR Lebensmittel-Foto einer ganzen gebratenen Ente 
auf rotierendem Spieß, goldbraun knusprige Haut glänzend von Fett, 
dramatische warme Studio-Beleuchtung, flache Tiefenschärfe, 
ländliche Bistro-Atmosphäre, reiche warme Töne von Gold und Braun, 
scharfer Fokus, hochdetailliert."
```

---

## 6. Troubleshooting {#troubleshooting}

### Problem: Zu viele Hände / Falsche Fingeranzahl

**Lösung:**
```
Negativ-Prompt: "extra fingers, too many hands, deformed hands, hand with extra fingers"
```

---

### Problem: Doppelgesichter oder verzerrt

**Lösung:**
```
Negativ-Prompt: "double face, duplicate face, two faces, distorted face"
```

---

### Problem: Text / Wasserzeichen im Bild

**Lösung:**
```
Negativ-Prompt: "text, lettering, watermark, signature, words, letters"
```

---

### Problem: Übersteuerung (zu "gekocht")

**Symptome:** Artifizielle Artefakte, unnatürliche Farben

**Lösungen:**
1. CFG reduzieren: von 3.5 → 2.5–3.0
2. Steps **erhöhen**: von 24 → 32–40
3. Sampler/Scheduler wechseln

---

### Problem: Matschig / Unscharf

**Symptome:** Verschwommene oder "mushy" Qualität

**Lösungen (in dieser Reihenfolge):**
1. Steps **erhöhen**: von 24 → 32–40
2. Sampler wechseln: von `euler` → `ipndm_v`
3. Scheduler wechseln: von `simple` → `discrete` oder `flux2-scheduler`

---

### Problem: Falsche Anatomie

**Symptome:** Asymmetrische oder fehlerhafte Körperteile

**Lösungen:**
1. Prompt detaillierter schreiben:
   ```
   "anatomically correct, both arms visible, proper proportions, symmetrical"
   ```
2. Negativ-Prompt erweitern:
   ```
   "deformed anatomy, extra limbs, missing limbs, asymmetrical"
   ```

---

### Problem: Allgemein schlechte Qualität

**Schritt-für-Schritt Debugging:**
1. ✅ Steps erhöhen (→ bessere Qualität, längere Zeit)
2. ✅ CFG optimieren (3–4 ist das Sweet Spot)
3. ✅ Sampler/Scheduler wechseln (euler ↔ ipndm_v)
4. ✅ Prompt umformulieren (natürlicher, detaillierter)
5. ✅ Resolution anpassen (1024×1024 ist sicher, 1216×832 oder 1344×768 für Breite)

---

## 7. Best Practices {#best-practices}

### ✅ Für Prompts

- Schreibe **1–3 Sätze** in **natürlicher Sprache**
- Beschreibe **konkrete Details**: Alter, Material, Stimmung, Licht, Perspektive
- Verwende **reale Kamera-Begriffe** statt "ultra detailed":
  - ❌ "4k, 8k, ultra detailed"
  - ✅ "feine Hautporen, strukturierte Stoffe, scharfe Schattenkanten"
- Bleibe bei **einer Sprache** (Deutsch ODER Englisch)
- Gib **Kontext**: Umgebung, Tageszeit, Lichtsituation

### ✅ Für Negativ-Prompts

- Halte sie **kurz** (5–10 gezielte Begriffe)
- Nur nötig bei **CFG ≥ 3**
- Bei CFG=1: **fast leer lassen**
- Spezifische Fehler hinzufügen, wenn sie **wiederholt vorkommen**

### ✅ Für Einstellungen

- **Sampler**: `euler` oder `ipndm_v`
- **Scheduler**: `discrete` oder `flux2-scheduler`
- **Steps**: 28–50 (Sweet Spot: 30–40)
- **CFG**: 3–4 (höher = Übersteuerung, tiefer = weniger Prompttreue)

### ✅ Für Auflösungen

```
Standard:
- 1024×1024: Universell gut, schnell
- 1216×832:  Leicht breites Format, vermeidet High-Res-Artefakte
- 1344×768:  Noch breiter, für detaillierte Landschaften

Ungewöhnliche Aspekt-Verhältnisse → können Artefakte verursachen
```

### ✅ Für Iterationen

1. **Gib dein Bild eine Note**: "Zu dunkel", "Falsche Fingeranzahl", etc.
2. **Nutze Img2Img** (Denoise ~0.3–0.5) für Verbesserungen
3. **Variiere nur EINE Variable** auf einmal (Steps, CFG, Sampler)
4. **Merke dir erfolgreiche Settings**

---

## 🔗 Weitere Ressourcen

- [Flux Studio GitHub](https://github.com)
- [ComfyUI FLUX.2 Workflows](https://github.com/comfyanonymous/ComfyUI)
- [FLUX-Modelle auf Hugging Face](https://huggingface.co/black-forest-labs)

---

## 📝 Changelog

| Datum | Version | Änderungen |
|-------|---------|-----------|
| 2026-04-18 | 1.0 | Initiale FLUX.2-Guidelines dokumentiert |

---

**Viel Erfolg bei deinen Generierungen! 🎨**
