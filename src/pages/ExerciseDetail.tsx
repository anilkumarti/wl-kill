import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';

interface ExerciseInfo {
  name: string;
  category: string;
  muscles: string;
  description: string;
  steps: string[];
  tips: string[];
}

const exerciseData: Record<string, ExerciseInfo> = {
  '1': {
    name: 'Push-ups',
    category: 'Strength',
    muscles: 'Chest, Triceps, Shoulders, Core',
    description: 'A fundamental bodyweight exercise that builds upper-body strength and endurance.',
    steps: [
      'Start in a high plank position with hands shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Keep your elbows at roughly a 45-degree angle from your torso.',
      'Push back up to the starting position with fully extended arms.',
      'Keep your core tight and body in a straight line throughout.',
    ],
    tips: ['Avoid letting your hips sag', 'Breathe out as you push up', 'Start with knee push-ups if needed'],
  },
  '2': {
    name: 'Running',
    category: 'Cardio',
    muscles: 'Legs, Core, Full Body',
    description: 'One of the most effective cardiovascular exercises for burning calories and improving endurance.',
    steps: [
      'Warm up with a 5-minute brisk walk.',
      'Maintain an upright posture with a slight forward lean.',
      'Land midfoot and roll through to your toes.',
      'Keep your arms bent at 90 degrees, swinging forward and back.',
      'Cool down with a 5-minute slow walk and stretching.',
    ],
    tips: ['Invest in proper running shoes', 'Hydrate before and after', 'Increase mileage gradually (10% per week)'],
  },
  '3': {
    name: 'Pull-ups',
    category: 'Strength',
    muscles: 'Back, Biceps, Core',
    description: 'A challenging upper-body compound movement that builds a strong back and arms.',
    steps: [
      'Grip the bar with hands slightly wider than shoulder-width, palms facing away.',
      'Hang with arms fully extended.',
      'Pull your chest up toward the bar by driving elbows down and back.',
      'Pause briefly at the top, then lower yourself with control.',
      'Avoid swinging or using momentum.',
    ],
    tips: ['Use a band for assistance if needed', 'Focus on squeezing your back muscles', 'Full range of motion is key'],
  },
  '4': {
    name: 'Squats',
    category: 'Strength',
    muscles: 'Quads, Glutes, Hamstrings, Core',
    description: 'The king of leg exercises — builds lower body strength and overall power.',
    steps: [
      'Stand with feet shoulder-width apart, toes slightly turned out.',
      'Keep your chest up and core braced.',
      'Push your hips back and bend your knees to lower down.',
      'Descend until thighs are parallel to the floor or lower.',
      'Drive through your heels to return to standing.',
    ],
    tips: ['Keep knees tracking over toes', 'Don\'t let your back round', 'Add weight as you get stronger'],
  },
  '5': {
    name: 'Plank',
    category: 'Core',
    muscles: 'Core, Shoulders, Glutes',
    description: 'An isometric hold that builds core stability and endurance.',
    steps: [
      'Place forearms on the floor with elbows under shoulders.',
      'Extend legs behind you and rise onto toes.',
      'Form a straight line from head to heels.',
      'Brace your core as if bracing for a punch.',
      'Hold the position while breathing steadily.',
    ],
    tips: ['Don\'t hold your breath', 'Squeeze your glutes', 'Work up to 60-second holds gradually'],
  },
  '6': {
    name: 'Cycling',
    category: 'Cardio',
    muscles: 'Legs, Core',
    description: 'Low-impact cardio that\'s excellent for cardiovascular health and leg strength.',
    steps: [
      'Adjust seat height so leg is almost fully extended at bottom of pedal stroke.',
      'Start at a comfortable resistance and warm up for 5 minutes.',
      'Maintain a steady cadence of 70–90 RPM.',
      'Keep your back straight and core engaged.',
      'Cool down with 5 minutes at low resistance.',
    ],
    tips: ['Use padded shorts for longer rides', 'Stay hydrated', 'Mix steady-state and interval sessions'],
  },
  '7': {
    name: 'Deadlift',
    category: 'Strength',
    muscles: 'Back, Legs, Core, Glutes',
    description: 'A compound lift that builds full-body strength with a focus on the posterior chain.',
    steps: [
      'Stand with feet hip-width apart, bar over mid-foot.',
      'Hinge at the hips and grip the bar just outside your legs.',
      'Take a deep breath, brace your core, and keep your back flat.',
      'Push through the floor as you lift the bar, keeping it close to your body.',
      'Lock out hips and knees at the top, then lower under control.',
    ],
    tips: ['Never round your lower back', 'Start light to learn proper form', 'Engage your lats to protect your spine'],
  },
  '8': {
    name: 'Jump Rope',
    category: 'Cardio',
    muscles: 'Full Body, Calves, Shoulders',
    description: 'High-intensity cardio that improves coordination, agility, and burns lots of calories.',
    steps: [
      'Hold handles lightly at hip height with elbows slightly bent.',
      'Use wrist rotation (not arm swinging) to turn the rope.',
      'Jump on the balls of your feet, just high enough to clear the rope.',
      'Land softly with knees slightly bent.',
      'Start with 30-second intervals and build up.',
    ],
    tips: ['Use a timer to track intervals', 'Keep jumps small and efficient', 'Choose a smooth, flat surface'],
  },
  '9': {
    name: 'Lunges',
    category: 'Strength',
    muscles: 'Quads, Glutes, Hamstrings',
    description: 'A unilateral leg exercise that improves balance and addresses muscle imbalances.',
    steps: [
      'Stand tall with feet hip-width apart.',
      'Step one foot forward about 2–3 feet.',
      'Lower your back knee toward the floor, keeping front knee over ankle.',
      'Push through your front heel to return to standing.',
      'Alternate legs for each repetition.',
    ],
    tips: ['Keep your torso upright', 'Don\'t let front knee cave inward', 'Add dumbbells to increase difficulty'],
  },
  '10': {
    name: 'Yoga Flow',
    category: 'Flexibility',
    muscles: 'Full Body',
    description: 'A sequence of linked poses that builds flexibility, balance, and mindfulness.',
    steps: [
      'Begin in Mountain Pose, breathing deeply.',
      'Flow into Forward Fold, then to Plank.',
      'Lower to Low Cobra or Upward Dog.',
      'Push back to Downward Dog and hold for 5 breaths.',
      'Return to standing and repeat the sequence.',
    ],
    tips: ['Focus on breath synchronization', 'Never force a stretch', 'Use a non-slip mat for safety'],
  },
  '11': {
    name: 'Burpees',
    category: 'Cardio',
    muscles: 'Full Body',
    description: 'An explosive full-body movement combining strength and cardio in one exercise.',
    steps: [
      'Stand with feet shoulder-width apart.',
      'Drop hands to floor and jump feet back into plank.',
      'Perform a push-up (optional).',
      'Jump feet back to hands.',
      'Explosively jump up with arms overhead.',
    ],
    tips: ['Scale by stepping instead of jumping', 'Maintain core tension throughout', 'Quality over speed'],
  },
  '12': {
    name: 'Bench Press',
    category: 'Strength',
    muscles: 'Chest, Triceps, Front Deltoids',
    description: 'The classic upper-body pressing movement for building chest strength and mass.',
    steps: [
      'Lie on a flat bench with feet flat on the floor.',
      'Grip the bar slightly wider than shoulder-width.',
      'Unrack the bar and position it over your mid-chest.',
      'Lower the bar to your chest under control.',
      'Press the bar back up to full arm extension.',
    ],
    tips: ['Always use a spotter when lifting heavy', 'Keep shoulder blades retracted', 'Avoid bouncing the bar off your chest'],
  },
};

const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exercise = id ? exerciseData[id] : null;

  if (!exercise) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Exercise not found</h2>
        <Link to="/exercises" className="text-purple-600 hover:text-purple-700 font-medium">
          ← Back to Exercises
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/exercises" className="text-purple-600 hover:text-purple-700 font-medium mb-6 inline-block">
        ← Back to Exercises
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title={exercise.name}>
            <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">{exercise.category}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Muscles: {exercise.muscles}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{exercise.description}</p>
            <h3 className="font-semibold text-lg mb-3">How to Perform</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {exercise.steps.map((step, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">
                  {step}
                </li>
              ))}
            </ol>
          </DashboardCard>
        </div>
        <div>
          <DashboardCard title="Tips">
            <ul className="space-y-3">
              {exercise.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-purple-500 font-bold mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
