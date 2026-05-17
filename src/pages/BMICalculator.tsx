import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';

type Unit = 'metric' | 'imperial';

const getBmiCategory = (bmi: number) => {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
  if (bmi < 25) return { label: 'Normal weight', color: 'text-green-500' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
  return { label: 'Obese', color: 'text-red-500' };
};

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<Unit>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    let h: number;

    if (unit === 'metric') {
      h = parseFloat(height) / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = (ft * 12 + inch) * 0.0254;
    }

    if (!w || !h || h <= 0 || w <= 0) return;
    setBmi(parseFloat((w / (h * h)).toFixed(1)));
  };

  const category = bmi !== null ? getBmiCategory(bmi) : null;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">BMI Calculator</h1>

      <DashboardCard title="Calculate Your BMI">
        <div className="flex gap-4 mb-6">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              onClick={() => { setUnit(u); setBmi(null); }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors capitalize ${
                unit === u
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {unit === 'metric' ? (
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Height</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="ft"
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="in"
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Calculate BMI
        </button>

        {bmi !== null && category && (
          <div className="mt-6 text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-5xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">{bmi}</p>
            <p className={`text-xl font-semibold ${category.color}`}>{category.label}</p>
          </div>
        )}
      </DashboardCard>

      <DashboardCard title="BMI Categories" className="mt-6">
        <div className="space-y-2">
          {[
            { range: '< 18.5', label: 'Underweight', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
            { range: '18.5 – 24.9', label: 'Normal weight', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
            { range: '25 – 29.9', label: 'Overweight', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
            { range: '≥ 30', label: 'Obese', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
          ].map((c) => (
            <div key={c.label} className={`flex justify-between items-center px-4 py-2 rounded-lg ${c.color}`}>
              <span className="font-medium">{c.label}</span>
              <span className="text-sm font-mono">{c.range}</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};

export default BMICalculator;
