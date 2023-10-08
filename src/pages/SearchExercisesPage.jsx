import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Nav from "../components/Nav";
import apiMethods from "../services/api.service";
import { Link } from "react-router-dom";
import CoachDashboard from "../components/CoachDashboard";

const SearchExercisesPage = () => {
  //theme changing
  const [theme, setTheme] = useState("cmyk");
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const [resultsLoading, setResultsLoading] = useState(false);

  const { fetchExercises, specifiedOptions } = apiMethods;
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleSearch = async () => {
    if (searchTerm) {
      setResultsLoading(true);
      const exercises = await fetchExercises(specifiedOptions);
      if (exercises) {
        const searchedResults = exercises.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchTerm) ||
            exercise.bodyPart.toLowerCase().includes(searchTerm) ||
            exercise.target.toLowerCase().includes(searchTerm)
        );
        const results = searchedResults.slice(0, 30);
        setSearchTerm("");
        setResultsLoading(false);
        setExercises(results);
      }
    }
  };

  useEffect(() => {
    if (user && user.userType === "coach") {
      setTheme("night");
    } else {
      setTheme("cmyk");
    }
  }, [user]);

  // idk why it's not showing
  if (isLoading) {
    <span className="loading loading-spinner text-error">Spinner....</span>;
  }

  return (
    isLoggedIn && (
      <div data-theme={theme} className="pb-8">
        <Nav />
        
        {user?.userType === "coach" && <CoachDashboard coachId={user._id} />}

        <div className="flex flex-col mt-4 space-y-4 items-center md:flex-row md:space-x-6 md:items-center md:px-24">
          <h1 className="text-3xl whitespace-nowrap md:mt-3 md:ml-4 md:w-max">Search exercises</h1>
          <div className="flex flex-col items-center space-y-4 w-full md:space-y-0 md:space-x-4 md:flex-row">
            <input
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              value={searchTerm}
              type="text"
              className="input input-bordered w-full max-w-xs md:w-auto md:mr-2"
              placeholder="Type to search"
            />
            {searchTerm ? (
              <button
                className="btn btn-primary w-full max-w-xs md:w-auto"
                onClick={handleSearch}
              >
                Search
              </button>
            ) : (
              <button
                disabled
                className="btn btn-primary w-full max-w-xs md:w-auto"
                onClick={handleSearch}
              >
                Search
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap px-6 md:px-24">
          {resultsLoading && <p className="w-full text-center">Loading...</p>}
          {exercises && exercises.length !== 0 ? (
            exercises.map((eachExercise) => {
              return (
                <div
                  key={eachExercise.id}
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-full"
                >
                  <div className="card bg-base-100 shadow-xl card-bordered h-full">
                    <figure className="w-full overflow-hidden">
                      <img
                        src={eachExercise.gifUrl}
                        alt="exercise"
                        id="gifImage"
                        className="w-full object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h1 className="card-title text-1xl" id="exerciseName">
                        {eachExercise.name}
                      </h1>
                      <div className="card-actions justify-between items-center">
                        <div className="badge badge-secondary" id="bodyPart">
                          {eachExercise.bodyPart}
                        </div>
                        <Link
                          to="/new-exercise"
                          state={{
                            name: eachExercise.name,
                            bodyPart: eachExercise.bodyPart,
                            gifUrl: eachExercise.gifUrl,
                            id: user._id,
                          }}
                          className="btn btn-primary btn-md"
                        >
                          {/* <button>
                      Add to program

                      </button> */}
                          Add to program
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="w-full text-center py-10">No exercise found</p>
          )}
        </div>
      </div>
    )
  );
};

export default SearchExercisesPage;
