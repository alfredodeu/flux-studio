# 🍳 Recipe Studio – KI-generierte Lebensmittel-Fotografie

Erstelle professionelle Lebensmittel-Fotos mit FLUX.2-optimierten KI-Prompts direkt aus deinen Rezepten!

## 🎯 Funktionen

### 1. **Rezept-Management**
- Rezeptname, Küche, Schwierigkeitsgrad
- Zutaten-Liste (dynamisch erweiterbar)
- Vorbereitungs- & Kochzeiten
- Spezielle Details & Besonderheiten

### 2. **Automatische KI-Prompt-Generierung**
- Wähle einen Fotografie-Stil (8 spezialisierte Presets)
- FLUX.2 konvertiert dein Rezept zu einem perfekten Prompt
- Intelligente Zutatenliste-Integration
- Custom-Details können hinzugefügt werden

### 3. **FLUX.2-optimierte Food Photography Presets**
Jeder Stil ist speziell für Lebensmittel optimiert:

| Stil | Best For | Steps | CFG | Sampler |
|------|----------|-------|-----|---------|
| **Restaurant Quality** ⭐ | Professionelle Restaurants | 40 | 3.5 | ipndm_v |
| **Home Style** 🏡 | Gemütliche Hausküche | 28 | 3.5 | euler |
| **Gourmet Plating** 👨‍🍳 | Haute Cuisine | 40 | 3.0 | ipndm_v |
| **Rustic & Authentic** 🌾 | Echte, ungestylte Küche | 28 | 3.5 | euler |
| **Flat Lay** 📸 | Von oben, mit Zutaten | 32 | 3.5 | euler |
| **Video Still** 🎬 | Dynamische Action | 40 | 3.5 | ipndm_v |
| **Sweet & Pastries** 🍰 | Süßspeisen & Kuchen | 40 | 3.0 | ipndm_v |
| **Beverage Focus** ☕ | Getränke | 32 | 3.5 | euler |

---

## 🚀 Schnellstart

### Schritt 1: Rezept erstellen
```
1. Gib Rezeptname ein (z.B. "Spaghetti Carbonara")
2. Wähle Küche & Schwierigkeitsgrad
3. Gib Zeiten & Portionen ein
4. Füge Zutaten hinzu
```

### Schritt 2: Fotografie-Stil wählen
- Wähle aus 8 spezialisierten Presets
- Jedes ist für unterschiedliche Food Photography-Szenarien optimiert

### Schritt 3: KI-Prompt generieren
- Die App konvertiert automatisch dein Rezept zu einem perfekten FLUX.2-Prompt
- Details wie Zutaten, Kochzeiten, Special Notes werden integriert

### Schritt 4: Foto generieren
- Klick auf "Professionelles Foto generieren"
- FLUX.2 erstellt ein hochqualitatives Lebensmittel-Foto
- Das Bild wird automatisch in der Galerie gespeichert

---

## 📸 Food Photography Tips

### 🔆 **Beleuchtung** (laut FLUX.2-Guidelines)
- ✅ Golden Hour Light: Sonne früh morgens oder spätnachmittags für warme Töne
- ✅ Seitenlicht: Erzeugt dramatische Schatten und 3D-Effekt
- ❌ Vermeidebigou hartes Licht von oben (macht Essen unappetitlich)
- ✅ Reflektoren nutzen: Weiße Oberflächen zum Aufhellen

### 🎨 **Anrichten (Plating)**
- Negative Space: Teller nicht vollgestellt
- Ungerade Zahlen (3, 5) nutzen
- Farb-Kontraste: z.B. grüne Kräuter auf roten Tomaten
- Höhenunterschiede erzeugen visuelles Interesse

### 📐 **Komposition**
- Rule of Thirds: Hauptgericht nicht in der Mitte platzieren
- Shallow Depth of Field: Fokus auf Details, Rest leicht unscharf
- Symmetrie ODER Diagonale: Nicht immer gerade Anordnungen
- Umgebung einbeziehen: Tisch, Besteck, Getränk

### 🎨 **Farben**
- Warme Farben (Gold, Orange, Rot) wirken appetitlich
- Sättigung nutzen aber nicht übertreiben
- Komplementärfarben erzeugen Spannung (rot/grün, blau/orange)
- Natürliche Farben > Overbearbeitung

---

## 🤖 Wie die KI-Prompt-Generierung funktioniert

Die App konvertiert dein Rezept mit dieser Logik:

```
Basis-Template (aus Preset) +
Rezeptname (z.B. "Spaghetti Carbonara") +
Zutaten-Liste (z.B. "Fresh eggs, Guanciale, Parmesan") +
Custom Details (z.B. "Noch dampfend servieren") +
Preset-spezifische Ergänzungen
= 🎨 Perfekter FLUX.2-Prompt
```

### Beispiel: Restaurant Quality Preset

**Basis-Template:**
```
Photorealistisches DSLR Lebensmittel-Foto von [DISH],
professionelle Studio-Beleuchtung, warme goldene Lichter,
shallow depth of field mit scharfem Fokus auf [MAIN_ITEM],
...
```

**Mit deinem Rezept "Spaghetti Carbonara":**
```
Photorealistisches DSLR Lebensmittel-Foto von Spaghetti Carbonara,
professionelle Studio-Beleuchtung, warme goldene Lichter,
shallow depth of field mit scharfem Fokus auf frische Eier, Guanciale, Parmesan,
weiße Keramik-Platte, rustikaler Holztisch im Hintergrund,
scharfe Texturen, appetitlich angerichtet, fine dining presentation,
hochdetailliert, 8K UHD, Museum-Qualität Fotografie, 
noch dampfend servieren
```

---

## ⚙️ Erweiterte Einstellungen

### Negative Prompt
Jedes Preset hat einen vorgefertigten negativen Prompt:
- ❌ "blurry, low quality, plastic, artificial"

Diese werden automatisch verwendet, um schlechte Qualität zu vermeiden.

### FLUX.2-Einstellungen (automatisch optimiert)
- **Model**: flux-2-klein-9b (schnell & hochqualitativ)
- **Scheduler**: discrete (empfohlen für FLUX.2)
- **Steps & CFG**: Je nach Preset angepasst
  - Restaurant Quality: 40 Steps, CFG 3.5 (höchste Qualität)
  - Home Style: 28 Steps, CFG 3.5 (schneller, gut genug)

---

## 🎯 Best Practices

### ✅ Für beste Ergebnisse:

1. **Detaillierte Zutaten**
   - Statt "Fleisch" → "Zartes Rinderfilet mit Knoblauch"
   - Statt "Sauce" → "Cremige Pilzrahmsauce"

2. **Spezielle Details nutzen**
   - "Mit frischem Basilikum garniert"
   - "Noch dampfend servieren"
   - "Auf Schieferteller angerichtet"

3. **Richtigen Stil wählen**
   - Restaurant-Qualität für Rezepte ohne bestimmten Kontext
   - Home Style für rustikale Gerichte
   - Gourmet für fancy Speisen
   - Flat Lay für Zutatenlisten-Übersichten

4. **Konsistente Küche**
   - Italienisch für Pasta, Pizza
   - Französisch für Saucen, Pasteten
   - Asiatisch für Wok, Curry
   - Vegan für pflanzliche Gerichte

---

## 🔧 Häufige Fehler & Lösungen

| Problem | Lösung |
|---------|--------|
| Essen sieht trocken aus | Wähle Preset mit "glistening, fresh, moist surface" |
| Falsche Farbe | Spezifiziere in Custom-Details: "golden brown", "vibrant green" |
| Zu künstlich | Nutze "Rustic & Authentic" oder "Home Style" Preset |
| Schlechte Tiefenschärfe | Wähle Preset mit "shallow depth of field" |
| Unprofessionelles Plating | Nutze "Restaurant Quality" oder "Gourmet Plating" |

---

## 📱 UI-Übersicht

### Linke Spalte (1/3)
- 📝 Rezept-Form
- 💡 Food Photography Tipps

### Mittlere & Rechte Spalte (2/3)
- 📋 Rezept-Übersicht
- 📝 Generierter Prompt (erweiterbar)
- 🎨 Bild-Generierung & Vorschau
- 📜 Rezept-Verlauf (alle bisherigen Rezepte)

---

## 🎨 Workflow

```
Rezept eingeben
    ↓
Stil wählen (8 Presets)
    ↓
AI generiert Prompt automatisch
    ↓
Prompt anpassen (optional)
    ↓
"Bild generieren" klicken
    ↓
FLUX.2 erstellt Foto
    ↓
Auto-Speicherung in Galerie
    ↓
Rezept-Verlauf für später
```

---

## 🚀 Integration mit Flux Studio

Die Recipe-App nutzt die gleichen Komponenten wie das Haupt-Studio:
- `useGeneration` Hook für KI-Generierung
- `GenerationPreview` für Vorschau
- FLUX.2-Guidelines aus `src/lib/flux2-guidelines.ts`
- Gleiches ComfyUI-Backend auf localhost:8188

---

## 📚 Weitere Ressourcen

- **[FLUX2-GUIDELINES.md](./FLUX2-GUIDELINES.md)** – Vollständige FLUX.2-Dokumentation
- **[recipe-flux2-guidelines.ts](./src/lib/recipe-flux2-guidelines.ts)** – Technische Details & Presets
- **Studio** – Für allgemeine KI-Bildgenerierung
- **Galerie** – Zeigt alle generierten Bilder

---

**Viel Erfolg beim Erstellen von köstlichen Rezept-Fotos! 📸✨**
