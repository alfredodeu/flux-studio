"use client";

import { useState } from "react";
import { Recipe } from "@/lib/recipe-flux2-guidelines";

interface Props {
  onRecipeSubmit: (recipe: Recipe) => void;
}

export default function RecipeForm({ onRecipeSubmit }: Props) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("Deutsch");
  const [servings, setServings] = useState(4);
  const [prepTime, setPrepTime] = useState(30);
  const [cookTime, setCookTime] = useState(30);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [ingredients, setIngredients] = useState<string[]>(["", "", ""]);
  const [customNotes, setCustomNotes] = useState("");
  const [presetType, setPresetType] = useState("Restaurant Quality");

  function handleAddIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function handleRemoveIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function handleIngredientChange(index: number, value: string) {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      alert("Bitte Rezeptname eingeben");
      return;
    }

    const recipe: Recipe = {
      id: Date.now().toString(),
      name,
      cuisine,
      servings,
      prepTime,
      cookTime,
      difficulty,
      ingredients: ingredients.filter((i) => i.trim()),
      customNotes,
      presetType,
      createdAt: new Date().toISOString(),
    };

    onRecipeSubmit(recipe);

    // Form zurücksetzen
    setName("");
    setCuisine("Deutsch");
    setServings(4);
    setPrepTime(30);
    setCookTime(30);
    setDifficulty("medium");
    setIngredients(["", "", ""]);
    setCustomNotes("");
    setPresetType("Restaurant Quality");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
      <h3 className="text-sm font-semibold text-gray-300 uppercase">Rezept-Details</h3>

      {/* Rezeptname */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">Rezeptname *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z.B. Spaghetti Carbonara"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        />
      </div>

      {/* 2-spaltig: Küche, Schwierigkeitsgrad */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Küche</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            <option>Deutsch</option>
            <option>Italienisch</option>
            <option>Französisch</option>
            <option>Asiatisch</option>
            <option>Mexikanisch</option>
            <option>Vegan</option>
            <option>Sonstiges</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Schwierigkeit</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            <option value="easy">Einfach ⭐</option>
            <option value="medium">Mittel ⭐⭐</option>
            <option value="hard">Schwer ⭐⭐⭐</option>
          </select>
        </div>
      </div>

      {/* Zeit & Portionen */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Portionen <span className="text-violet-400">{servings}</span>
          </label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            min={1}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Vorbereitung <span className="text-violet-400">{prepTime}m</span>
          </label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            min={0}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Kochzeit <span className="text-violet-400">{cookTime}m</span>
          </label>
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(Number(e.target.value))}
            min={0}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Food Photography Preset */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">📸 Food Photography Stil</label>
        <select
          value={presetType}
          onChange={(e) => setPresetType(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        >
          <option>Restaurant Quality</option>
          <option>Home Style (Gemütlich)</option>
          <option>Gourmet Plating</option>
          <option>Rustic & Authentic</option>
          <option>Flat Lay (Top Down)</option>
          <option>Video Still (Motion Feel)</option>
          <option>Sweet & Pastries</option>
          <option>Beverage Focus</option>
        </select>
      </div>

      {/* Zutaten */}
      <div>
        <label className="text-xs text-gray-400 block mb-2">🥘 Zutaten</label>
        <div className="space-y-2">
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                placeholder={`Zutat ${idx + 1}`}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="px-2 py-1 text-xs bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-2 text-xs px-3 py-1 bg-violet-900/30 text-violet-400 rounded hover:bg-violet-900/50 transition"
        >
          + Zutat hinzufügen
        </button>
      </div>

      {/* Custom Notes */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">📝 Besondere Details (optional)</label>
        <textarea
          value={customNotes}
          onChange={(e) => setCustomNotes(e.target.value)}
          placeholder="z.B. 'Mit frischem Basilikum garniert', 'Noch dampfend servieren'..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg font-semibold text-sm bg-violet-600 hover:bg-violet-500 transition-colors"
      >
        ✨ Rezept erstellen & Bild generieren
      </button>
    </form>
  );
}
