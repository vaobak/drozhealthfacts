import React, { useState } from 'react';
import { Dumbbell, Clock, Target, Plus, Play, CheckCircle } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caloriesPerMinute: number;
  instructions: string[];
}

interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  duration: number; // in minutes
  rest: number; // in seconds
}

interface Workout {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  totalDuration: number;
  estimatedCalories: number;
  difficulty: string;
}

const EXERCISES_DATABASE: Exercise[] = [
  {
    id: 'push_ups',
    name: 'Push-ups',
    category: 'Strength',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'None',
    difficulty: 'beginner',
    caloriesPerMinute: 7,
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ]
  },
  {
    id: 'squats',
    name: 'Squats',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: 'None',
    difficulty: 'beginner',
    caloriesPerMinute: 8,
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees behind toes',
      'Return to standing position'
    ]
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    category: 'Cardio',
    muscleGroups: ['Full Body'],
    equipment: 'None',
    difficulty: 'beginner',
    caloriesPerMinute: 10,
    instructions: [
      'Start standing with feet together, arms at sides',
      'Jump while spreading legs shoulder-width apart',
      'Simultaneously raise arms overhead',
      'Jump back to starting position'
    ]
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders'],
    equipment: 'None',
    difficulty: 'beginner',
    caloriesPerMinute: 5,
    instructions: [
      'Start in push-up position',
      'Lower to forearms, keeping body straight',
      'Hold position, engaging core muscles',
      'Breathe normally throughout'
    ]
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'HIIT',
    muscleGroups: ['Full Body'],
    equipment: 'None',
    difficulty: 'intermediate',
    caloriesPerMinute: 15,
    instructions: [
      'Start standing, then squat down',
      'Place hands on floor and jump feet back to plank',
      'Do a push-up, then jump feet back to squat',
      'Jump up with arms overhead'
    ]
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: 'None',
    difficulty: 'beginner',
    caloriesPerMinute: 6,
    instructions: [
      'Step forward with one leg',
      'Lower hips until both knees are at 90 degrees',
      'Keep front knee over ankle',
      'Push back to starting position'
    ]
  }
];

const WORKOUT_TEMPLATES = [
  {
    name: 'Beginner Full Body',
    exercises: [
      { exerciseId: 'push_ups', sets: 2, reps: 10, duration: 2, rest: 60 },
      { exerciseId: 'squats', sets: 2, reps: 15, duration: 3, rest: 60 },
      { exerciseId: 'plank', sets: 2, reps: 1, duration: 1, rest: 60 },
      { exerciseId: 'lunges', sets: 2, reps: 10, duration: 3, rest: 60 }
    ]
  },
  {
    name: 'HIIT Cardio Blast',
    exercises: [
      { exerciseId: 'jumping_jacks', sets: 3, reps: 30, duration: 2, rest: 30 },
      { exerciseId: 'burpees', sets: 3, reps: 10, duration: 2, rest: 45 },
      { exerciseId: 'squats', sets: 3, reps: 20, duration: 2, rest: 30 }
    ]
  }
];

export const WorkoutPlanner: React.FC = () => {
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutInProgress, setWorkoutInProgress] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);

  const categories = ['All', ...Array.from(new Set(EXERCISES_DATABASE.map(ex => ex.category)))];

  const filteredExercises = EXERCISES_DATABASE.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      exercise,
      sets: 3,
      reps: 12,
      duration: 3,
      rest: 60
    };
    setSelectedExercises([...selectedExercises, workoutExercise]);
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: keyof WorkoutExercise, value: number) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedExercises(updated);
  };

  const loadTemplate = (template: any) => {
    const exercises = template.exercises.map((ex: any) => {
      const exercise = EXERCISES_DATABASE.find(e => e.id === ex.exerciseId);
      if (exercise) {
        return {
          exercise,
          sets: ex.sets,
          reps: ex.reps,
          duration: ex.duration,
          rest: ex.rest
        };
      }
      return null;
    }).filter(Boolean);
    
    setSelectedExercises(exercises);
    setWorkoutName(template.name);
  };

  const createWorkout = () => {
    if (selectedExercises.length === 0) return;

    const totalDuration = selectedExercises.reduce((total, ex) => 
      total + (ex.duration * ex.sets) + ((ex.rest * (ex.sets - 1)) / 60), 0
    );

    const estimatedCalories = selectedExercises.reduce((total, ex) => 
      total + (ex.exercise.caloriesPerMinute * ex.duration * ex.sets), 0
    );

    const workout: Workout = {
      id: Date.now().toString(),
      name: workoutName || 'Custom Workout',
      exercises: selectedExercises,
      totalDuration: Math.round(totalDuration),
      estimatedCalories: Math.round(estimatedCalories),
      difficulty: 'custom'
    };

    setCurrentWorkout(workout);
  };

  const startWorkout = () => {
    setWorkoutInProgress(true);
    setCurrentExerciseIndex(0);
    setTimer(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
          <Dumbbell size={24} className="text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Workout Planner</h2>
          <p className="text-gray-600 dark:text-gray-400">Create and track your custom workouts</p>
        </div>
      </div>

      {!workoutInProgress ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercise Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workout Templates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quick Start Templates
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {WORKOUT_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => loadTemplate(template)}
                    className="p-4 text-left bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <h4 className="font-medium text-purple-900 dark:text-purple-200">{template.name}</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      {template.exercises.length} exercises
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Search */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search exercises..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.muscleGroups.join(', ')} • {exercise.equipment}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      ~{exercise.caloriesPerMinute} cal/min
                    </p>
                  </div>
                  <button
                    onClick={() => addExercise(exercise)}
                    className="ml-4 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Workout Builder */}
          <div className="space-y-6">
            {/* Workout Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Workout Name
              </label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="My Custom Workout"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Selected Exercises */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Workout Exercises ({selectedExercises.length})
              </h3>
              
              {selectedExercises.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Add exercises to build your workout
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedExercises.map((workoutEx, index) => (
                    <div
                      key={index}
                      className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-purple-900 dark:text-purple-200 text-sm">
                          {workoutEx.exercise.name}
                        </h4>
                        <button
                          onClick={() => removeExercise(index)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-gray-600 dark:text-gray-400">Sets</label>
                          <input
                            type="number"
                            value={workoutEx.sets}
                            onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 1)}
                            min="1"
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs dark:bg-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 dark:text-gray-400">Reps</label>
                          <input
                            type="number"
                            value={workoutEx.reps}
                            onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 1)}
                            min="1"
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs dark:bg-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 dark:text-gray-400">Duration (min)</label>
                          <input
                            type="number"
                            value={workoutEx.duration}
                            onChange={(e) => updateExercise(index, 'duration', parseInt(e.target.value) || 1)}
                            min="1"
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs dark:bg-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 dark:text-gray-400">Rest (sec)</label>
                          <input
                            type="number"
                            value={workoutEx.rest}
                            onChange={(e) => updateExercise(index, 'rest', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs dark:bg-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Create Workout */}
            <button
              onClick={createWorkout}
              disabled={selectedExercises.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Target size={20} />
              Create Workout
            </button>

            {/* Workout Summary */}
            {currentWorkout && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-3">
                  {currentWorkout.name}
                </h3>
                <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{currentWorkout.totalDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Calories:</span>
                    <span>{currentWorkout.estimatedCalories} cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exercises:</span>
                    <span>{currentWorkout.exercises.length}</span>
                  </div>
                </div>
                <button
                  onClick={startWorkout}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start Workout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Workout In Progress */
        <div className="text-center space-y-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8 border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-200 mb-4">
              Workout in Progress
            </h3>
            
            {currentWorkout && currentExerciseIndex < currentWorkout.exercises.length && (
              <div className="space-y-4">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Exercise {currentExerciseIndex + 1} of {currentWorkout.exercises.length}
                </div>
                
                <div className="text-3xl font-bold text-purple-600">
                  {currentWorkout.exercises[currentExerciseIndex].exercise.name}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {currentWorkout.exercises[currentExerciseIndex].sets}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sets</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {currentWorkout.exercises[currentExerciseIndex].reps}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reps</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentWorkout.exercises[currentExerciseIndex].rest}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rest</div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <ul className="text-sm text-left space-y-1">
                    {currentWorkout.exercises[currentExerciseIndex].exercise.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setCurrentExerciseIndex(currentExerciseIndex + 1)}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Complete Exercise
                  </button>
                  <button
                    onClick={() => setWorkoutInProgress(false)}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
                  >
                    End Workout
                  </button>
                </div>
              </div>
            )}

            {currentWorkout && currentExerciseIndex >= currentWorkout.exercises.length && (
              <div className="space-y-4">
                <div className="text-3xl font-bold text-green-600 mb-4">
                  🎉 Workout Complete!
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Great job! You've completed your workout.
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {currentWorkout.totalDuration}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentWorkout.estimatedCalories}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Calories Burned</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setWorkoutInProgress(false);
                    setCurrentExerciseIndex(0);
                  }}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                >
                  Plan Another Workout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};