import React, { useState } from 'react';
import { Apple, Search, Plus, Trash2, Target, TrendingUp } from 'lucide-react';

interface Food {
  id: string;
  name: string;
  category: string;
  caloriesPerServing: number;
  servingSize: string;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface FoodEntry {
  food: Food;
  quantity: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

const FOOD_DATABASE: Food[] = [
  // Fruits
  { id: 'apple', name: 'Apple', category: 'Fruits', caloriesPerServing: 95, servingSize: '1 medium (182g)', protein: 0.5, carbs: 25, fat: 0.3, fiber: 4 },
  { id: 'banana', name: 'Banana', category: 'Fruits', caloriesPerServing: 105, servingSize: '1 medium (118g)', protein: 1.3, carbs: 27, fat: 0.4, fiber: 3 },
  { id: 'orange', name: 'Orange', category: 'Fruits', caloriesPerServing: 62, servingSize: '1 medium (154g)', protein: 1.2, carbs: 15, fat: 0.2, fiber: 3 },
  
  // Vegetables
  { id: 'broccoli', name: 'Broccoli', category: 'Vegetables', caloriesPerServing: 25, servingSize: '1 cup chopped (91g)', protein: 3, carbs: 5, fat: 0.3, fiber: 2 },
  { id: 'spinach', name: 'Spinach', category: 'Vegetables', caloriesPerServing: 7, servingSize: '1 cup raw (30g)', protein: 0.9, carbs: 1, fat: 0.1, fiber: 0.7 },
  { id: 'carrot', name: 'Carrot', category: 'Vegetables', caloriesPerServing: 25, servingSize: '1 medium (61g)', protein: 0.5, carbs: 6, fat: 0.1, fiber: 2 },
  
  // Proteins
  { id: 'chicken_breast', name: 'Chicken Breast', category: 'Proteins', caloriesPerServing: 165, servingSize: '3.5 oz (100g)', protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  { id: 'salmon', name: 'Salmon', category: 'Proteins', caloriesPerServing: 208, servingSize: '3.5 oz (100g)', protein: 22, carbs: 0, fat: 13, fiber: 0 },
  { id: 'eggs', name: 'Eggs', category: 'Proteins', caloriesPerServing: 155, servingSize: '2 large eggs (100g)', protein: 13, carbs: 1, fat: 11, fiber: 0 },
  
  // Grains
  { id: 'brown_rice', name: 'Brown Rice', category: 'Grains', caloriesPerServing: 216, servingSize: '1 cup cooked (195g)', protein: 5, carbs: 45, fat: 1.8, fiber: 4 },
  { id: 'oatmeal', name: 'Oatmeal', category: 'Grains', caloriesPerServing: 147, servingSize: '1 cup cooked (234g)', protein: 6, carbs: 25, fat: 3, fiber: 4 },
  { id: 'whole_wheat_bread', name: 'Whole Wheat Bread', category: 'Grains', caloriesPerServing: 81, servingSize: '1 slice (28g)', protein: 4, carbs: 14, fat: 1.1, fiber: 2 },
  
  // Dairy
  { id: 'greek_yogurt', name: 'Greek Yogurt', category: 'Dairy', caloriesPerServing: 100, servingSize: '6 oz (170g)', protein: 17, carbs: 6, fat: 0.7, fiber: 0 },
  { id: 'milk', name: 'Milk (2%)', category: 'Dairy', caloriesPerServing: 122, servingSize: '1 cup (244g)', protein: 8, carbs: 12, fat: 4.8, fiber: 0 },
  { id: 'cheese', name: 'Cheddar Cheese', category: 'Dairy', caloriesPerServing: 113, servingSize: '1 oz (28g)', protein: 7, carbs: 1, fat: 9, fiber: 0 },
  
  // Nuts & Seeds
  { id: 'almonds', name: 'Almonds', category: 'Nuts & Seeds', caloriesPerServing: 164, servingSize: '1 oz (28g)', protein: 6, carbs: 6, fat: 14, fiber: 4 },
  { id: 'peanut_butter', name: 'Peanut Butter', category: 'Nuts & Seeds', caloriesPerServing: 188, servingSize: '2 tbsp (32g)', protein: 8, carbs: 8, fat: 16, fiber: 3 },
];

export const CalorieCounter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [customFood, setCustomFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  const [showCustomForm, setShowCustomForm] = useState(false);

  const categories = ['All', ...Array.from(new Set(FOOD_DATABASE.map(food => food.category)))];

  const filteredFoods = FOOD_DATABASE.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addFoodEntry = (food: Food, quantity: number = 1) => {
    const entry: FoodEntry = {
      food,
      quantity,
      totalCalories: food.caloriesPerServing * quantity,
      totalProtein: food.protein * quantity,
      totalCarbs: food.carbs * quantity,
      totalFat: food.fat * quantity
    };
    setFoodEntries([...foodEntries, entry]);
  };

  const addCustomFood = () => {
    if (customFood.name && customFood.calories) {
      const food: Food = {
        id: `custom_${Date.now()}`,
        name: customFood.name,
        category: 'Custom',
        caloriesPerServing: parseFloat(customFood.calories),
        servingSize: '1 serving',
        protein: parseFloat(customFood.protein) || 0,
        carbs: parseFloat(customFood.carbs) || 0,
        fat: parseFloat(customFood.fat) || 0,
        fiber: 0
      };
      addFoodEntry(food);
      setCustomFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
      setShowCustomForm(false);
    }
  };

  const removeFoodEntry = (index: number) => {
    setFoodEntries(foodEntries.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    const updatedEntries = [...foodEntries];
    const entry = updatedEntries[index];
    entry.quantity = newQuantity;
    entry.totalCalories = entry.food.caloriesPerServing * newQuantity;
    entry.totalProtein = entry.food.protein * newQuantity;
    entry.totalCarbs = entry.food.carbs * newQuantity;
    entry.totalFat = entry.food.fat * newQuantity;
    setFoodEntries(updatedEntries);
  };

  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.totalCalories, 0);
  const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.totalProtein, 0);
  const totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.totalCarbs, 0);
  const totalFat = foodEntries.reduce((sum, entry) => sum + entry.totalFat, 0);

  const calorieProgress = (totalCalories / dailyGoal) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
          <Apple size={24} className="text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calorie Counter</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your daily food intake and nutrition</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Food Search & Add */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Calorie Goal
            </label>
            <input
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(parseInt(e.target.value) || 2000)}
              className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Search & Filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search foods (e.g., apple, chicken, rice)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Food Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredFoods.map(food => (
              <div
                key={food.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{food.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {food.caloriesPerServing} cal per {food.servingSize}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                  </p>
                </div>
                <button
                  onClick={() => addFoodEntry(food)}
                  className="ml-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Custom Food */}
          <div>
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              + Add Custom Food
            </button>

            {showCustomForm && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                <input
                  type="text"
                  placeholder="Food name"
                  value={customFood.name}
                  onChange={(e) => setCustomFood({...customFood, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <input
                    type="number"
                    placeholder="Calories"
                    value={customFood.calories}
                    onChange={(e) => setCustomFood({...customFood, calories: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Protein (g)"
                    value={customFood.protein}
                    onChange={(e) => setCustomFood({...customFood, protein: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={customFood.carbs}
                    onChange={(e) => setCustomFood({...customFood, carbs: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Fat (g)"
                    value={customFood.fat}
                    onChange={(e) => setCustomFood({...customFood, fat: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addCustomFood}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Food
                  </button>
                  <button
                    onClick={() => setShowCustomForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Daily Summary */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-green-600" size={20} />
              <h3 className="font-bold text-green-900 dark:text-green-200">Daily Progress</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-700 dark:text-green-300">Calories</span>
                  <span className="text-green-700 dark:text-green-300">{Math.round(totalCalories)}/{dailyGoal}</span>
                </div>
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{Math.round(totalProtein)}g</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Protein</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">{Math.round(totalCarbs)}g</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Carbs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{Math.round(totalFat)}g</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Fat</div>
                </div>
              </div>
            </div>
          </div>

          {/* Food Log */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <TrendingUp size={20} />
              Today's Food Log
            </h3>
            
            {foodEntries.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No foods added yet
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {foodEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {entry.food.name}
                      </h4>
                      <button
                        onClick={() => removeFoodEntry(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="number"
                        value={entry.quantity}
                        onChange={(e) => updateQuantity(index, parseFloat(e.target.value) || 1)}
                        min="0.1"
                        step="0.1"
                        className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">servings</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {Math.round(entry.totalCalories)} cal | 
                      P: {Math.round(entry.totalProtein)}g | 
                      C: {Math.round(entry.totalCarbs)}g | 
                      F: {Math.round(entry.totalFat)}g
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};