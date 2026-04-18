"use client";

import { useState } from "react";
import RecipeForm from "@/components/recipe/RecipeForm";
import {
  Recipe,
  RECIPE_PRESETS,
  generateFoodPrompt,
  FOOD_PHOTOGRAPHY_TIPS,
} from "@/lib/recipe-flux2-guidelines";
import { useGeneration } from "@/hooks/useGeneration";
import GenerationPreview from "@/components/preview/GenerationPreview";

export default function RecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const { state, generate } = useGeneration();

  function handleRecipeSubmit(recipe: Recipe) {
    // Finde das passende Preset
    const preset = RECIPE_PRESETS.find((p) => p.name === recipe.presetType);
    if (!preset) {
      alert("Preset nicht gefunden");
      return;
    }

    // Generiere den Prompt
    const prompt = generateFoodPrompt(
      recipe.name,
      recipe.ingredients,
      preset,
      recipe.customNotes
    );

    recipe.generatedImagePrompt = prompt;
    setRecipes([recipe, ...recipes]);
    setSelectedRecipe(recipe);
    setGeneratedPrompt(prompt);
    setShowPromptPreview(true);
  }

  function handleGenerateImage() {
    if (!selectedRecipe || !generatedPrompt) return;

    const preset = RECIPE_PRESETS.find((p) => p.name === selectedRecipe.presetType);
    if (!preset) return;

    generate({
      prompt: generatedPrompt,
      negativePrompt: preset.negativePrompt,
      settings: {
        model: "flux-2-klein-9b.safetensors",
        steps: preset.settings.steps,
        cfg: preset.settings.cfg,
        sampler: preset.settings.sampler,
        scheduler: "discrete",
        width: 1024,
        height: 1024,
        seed: -1,
      },
    });
  }

  const isGenerating = state.status === "queued" || state.status === "running";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">🍳 Recipe Studio</h1>
            <p className="text-sm text-gray-400 mt-1">Erstelle Rezepte & generiere professionelle Lebensmittel-Fotos mit FLUX.2</p>
          </div>
          <a href="/" className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
            ← Zurück zu Studio
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Linke Spalte: Rezept-Form */}
          <div className="col-span-1 space-y-6">
            <RecipeForm onRecipeSubmit={handleRecipeSubmit} />

            {/* Food Photography Tips */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 space-y-3">
              <h3 className="text-sm font-semibold text-violet-300">💡 Food Photography Tipps</h3>
              <div className="text-xs text-gray-400 space-y-2">
                <div>
                  <p className="font-semibold text-gray-300 mb-1">🔆 Beleuchtung:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {FOOD_PHOTOGRAPHY_TIPS.lighting.slice(0, 2).map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-300 mb-1">🎨 Anrichten:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {FOOD_PHOTOGRAPHY_TIPS.plating.slice(0, 2).map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mitte: Prompt-Editor & Vorschau */}
          <div className="col-span-2 space-y-6">
            {selectedRecipe && (
              <>
                {/* Rezept-Übersicht */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h2 className="text-lg font-semibold text-white mb-3">{selectedRecipe.name}</h2>
                  <div className="grid grid-cols-4 gap-3 text-xs text-gray-400 mb-4">
                    <div>
                      <p className="text-gray-500">Portionen</p>
                      <p className="text-white font-semibold">{selectedRecipe.servings}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Vorbereitung</p>
                      <p className="text-white font-semibold">{selectedRecipe.prepTime}min</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Kochzeit</p>
                      <p className="text-white font-semibold">{selectedRecipe.cookTime}min</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Schwierigkeit</p>
                      <p className="text-white font-semibold capitalize">{selectedRecipe.difficulty}</p>
                    </div>
                  </div>

                  {/* Zutaten */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-semibold mb-2">ZUTATEN</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <li key={i}>• {ing}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Stil-Preset */}
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 font-semibold mb-1">📸 FOTOGRAFIE-STIL</p>
                    <p className="text-sm text-violet-400">{selectedRecipe.presetType}</p>
                  </div>
                </div>

                {/* Generierter Prompt */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-300">AI-generierter Prompt</h3>
                    <button
                      onClick={() => setShowPromptPreview(!showPromptPreview)}
                      className="text-xs text-violet-400 hover:text-violet-300"
                    >
                      {showPromptPreview ? "▼" : "▶"} Details
                    </button>
                  </div>

                  {showPromptPreview && (
                    <div className="bg-gray-800 rounded p-3">
                      <p className="text-xs text-gray-300 leading-relaxed">{generatedPrompt}</p>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateImage}
                    disabled={isGenerating}
                    className="w-full py-3 rounded-lg font-semibold text-sm bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? "Generiere Lebensmittel-Foto..." : "🎨 Professionelles Foto generieren"}
                  </button>
                </div>
              </>
            )}

            {/* Generierungs-Vorschau */}
            {selectedRecipe && (
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 flex items-center justify-center min-h-96">
                <GenerationPreview state={state} />
              </div>
            )}

            {!selectedRecipe && (
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 border-dashed text-center text-gray-400">
                <p className="text-lg mb-2">👈 Erstelle oben ein Rezept</p>
                <p className="text-sm">Der KI-Prompt und die Vorschau erscheinen hier</p>
              </div>
            )}
          </div>
        </div>

        {/* Rezept-Verlauf */}
        {recipes.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Rezept-Verlauf ({recipes.length})</h3>
            <div className="grid grid-cols-4 gap-4">
              {recipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    if (recipe.generatedImagePrompt) {
                      setGeneratedPrompt(recipe.generatedImagePrompt);
                    }
                  }}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    selectedRecipe?.id === recipe.id
                      ? "bg-violet-600 border-violet-500"
                      : "bg-gray-800 border-gray-700 hover:border-violet-600"
                  }`}
                >
                  <p className="font-semibold text-sm">{recipe.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{recipe.presetType}</p>
                  <p className="text-xs text-gray-500 mt-1">{recipe.cuisine}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
