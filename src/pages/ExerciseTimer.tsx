import React, { useState, useEffect, useRef } from 'react';
import DashboardCard from '../components/DashboardCard';

const PRESETS = [
  { label: 'Work Set', seconds: 45 },
  { label: 'Rest', seconds: 60 },
  { label: 'HIIT Interval', seconds: 30 },
  { label: '2-Min Rest', seconds: 120 },
  { label: 'Custom', seconds: 0 },
];

const pad = (n: number) => String(n).padStart(2, '0');

const ExerciseTimer: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('1');
  const [customSeconds, setCustomSeconds] = useState('0');
  const [selectedPreset, setSelectedPreset] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const applyPreset = (index: number) => {
    setSelectedPreset(index);
    if (PRESETS[index].seconds > 0) {
      setRunning(false);
      setTotalSeconds(PRESETS[index].seconds);
      setRemaining(PRESETS[index].seconds);
    }
  };

  const applyCustom = () => {
    const mins = Math.max(0, parseInt(customMinutes) || 0);
    const secs = Math.max(0, Math.min(59, parseInt(customSeconds) || 0));
    const total = mins * 60 + secs;
    if (total > 0) {
      setRunning(false);
      setTotalSeconds(total);
      setRemaining(total);
    }
  };

  const reset = () => {
    setRunning(false);
    setRemaining(totalSeconds);
  };

  const progress = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isFinished = remaining === 0;

  const circumference = 2 * Math.PI * 90;
  const strokeDash = (progress / 100) * circumference;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exercise Timer</h1>

      <DashboardCard title="Timer">
        <div className="flex justify-center mb-6">
          <div className="relative w-52 h-52">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={isFinished ? '#22c55e' : '#8b5cf6'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${circumference}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-mono font-bold tabular-nums">
                {pad(minutes)}:{pad(seconds)}
              </span>
              {isFinished && <span className="text-green-500 font-semibold mt-1">Done!</span>}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setRunning((v) => !v)}
            disabled={isFinished}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors w-32"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors w-32"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => applyPreset(i)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedPreset === i
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {p.label}
              {p.seconds > 0 && <span className="ml-1 opacity-70">{p.seconds}s</span>}
            </button>
          ))}
        </div>

        {selectedPreset === PRESETS.length - 1 && (
          <div className="flex items-center gap-2 justify-center">
            <input
              type="number"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              min="0"
              max="99"
              className="w-20 p-2 text-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="min"
            />
            <span className="text-lg font-bold">:</span>
            <input
              type="number"
              value={customSeconds}
              onChange={(e) => setCustomSeconds(e.target.value)}
              min="0"
              max="59"
              className="w-20 p-2 text-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="sec"
            />
            <button
              onClick={applyCustom}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Set
            </button>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default ExerciseTimer;
