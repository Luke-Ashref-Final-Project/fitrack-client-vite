import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SearchExercisesPage from "./pages/SearchExercisesPage";
import OverviewPage from "./pages/OverviewPage";
import SubscribersPage from "./pages/SubscribersPage";
import CoachesPage from "./pages/CoachesPage";
import NewExercisePage from "./pages/NewExercisePage";
import CoachOverviewPage from "./pages/CoachOverviewPage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/searchexercises" element={<SearchExercisesPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/overview/:exerciseId" element={<ExerciseDetailPage />} />
        <Route path="/subscribers" element={<SubscribersPage />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/new-exercise" element={<NewExercisePage />} />
        <Route path="/coaches/:coachId" element={<CoachOverviewPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
