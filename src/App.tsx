import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Foods from './pages/Foods';
import Exercises from './pages/Exercises';
import ExerciseDetail from './pages/ExerciseDetail';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Features from './pages/Features';
import BMICalculator from './pages/BMICalculator';
import FavoriteMeals from './pages/FavoriteMeals';
import ExerciseTimer from './pages/ExerciseTimer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="foods" element={<Foods />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="exercises/:id" element={<ExerciseDetail />} />
          <Route path="progress" element={<Progress />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="features" element={<Features />} />
          <Route path="bmi-calculator" element={<BMICalculator />} />
          <Route path="favorites" element={<FavoriteMeals />} />
          <Route path="exercise-timer" element={<ExerciseTimer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;