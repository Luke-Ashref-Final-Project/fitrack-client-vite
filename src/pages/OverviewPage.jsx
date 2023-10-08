import { useState, useEffect, useContext } from "react";
import apiMethods from "../services/api.service";
import { AuthContext } from "../context/auth.context";
import { Link, useLocation } from "react-router-dom";
import authMethods from "../services/auth.service";

import Nav from "../components/Nav";
import CoachDashboard from "../components/CoachDashboard";
import ClientDashboard from "../components/ClientDashboard";

const OverviewPage = () => {
  //theme changing
  const [theme, setTheme] = useState("cmyk");
  const { user, isLoading } = useContext(AuthContext);
  const [allExercises, setAllExercises] = useState(null);
  const [allClients, setAllClients] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState(null);

  const handleFiltering = (value) => {
    if (value !== "all") {
      const newAllExercises = allExercises.filter((item) => {
        return item.clientid === value;
      });
      setFilteredExercises(newAllExercises);
    } else {
      setFilteredExercises(allExercises);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const getdata = async () => {
      try {
        if (user && user.userType === "coach") {
          const response = await apiMethods.getAllExercisesForCoach(user._id);
          const fetchedSubs = await authMethods.getAllSubscribers();
          if (fetchedSubs) {
            setAllClients(fetchedSubs);
          }
          if (response) {
            setAllExercises(response);
            setFilteredExercises(response);
          }
        } else if (user && user.userType === "client") {
          const response = await apiMethods.getAllExercisesForClient(user._id);
          if (response) {
            setAllExercises(response);
            setFilteredExercises(response);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getdata();
  }, [user, location.state?.newExerciseAdded]);

  useEffect(() => {
    //setting themes
    if (user && user.userType === "coach") {
      setTheme("night");
    } else {
      setTheme("cmyk");
    }
  }, [user]);
  
  if (isLoading) {
    return <span className="loading loading-spinner text-error">Loading...</span>
  }
  return (
    <div data-theme={theme} className="pb-8">
      <Nav />
      {user?.userType === "coach" && <CoachDashboard coachId={user._id} />}
      {user?.userType === "client" && <ClientDashboard clientId={user._id} />}


      <div className="flex flex-col mt-4 space-y-4 items-center md:flex-row md:space-x-6 md:items-center md:px-24">
        <h1 className="text-3xl self-center md:mt-3 md:ml-4">Overview</h1>

        {user?.userType === "coach" && (
          <>
            <h5 className="text-1xl self-center md:mt-3 md:ml-4">
              Filter client
            </h5>
            <select
              className="select select-bordered w-full max-w-xs md:w-auto md:mt-0"
              onChange={(e) => handleFiltering(e.target.value)}
            >
              <option value="all">All</option>
              {allClients &&
                allClients.subscribersIds.map((client) => {
                  return (
                    <option key={client._id} value={client._id}>
                      {client.username}
                    </option>
                  );
                })}
            </select>
          </>
        )}
      </div>

      <div className="flex flex-wrap px-6 md:px-24">
        {filteredExercises &&
          filteredExercises.map((eachExercise) => {
            return (
              <div
                key={eachExercise._id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-full" // Adjusted width for tablet and desktop, and added padding
              >
                <div
                  className="card bg-base-100 shadow-xl card-bordered h-full" // Added h-full to grow vertically
                >
                  <figure className="w-full overflow-hidden">
                    <img
                      src={eachExercise.image}
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
                        {eachExercise.bodypart}
                      </div>
                      <Link to={`/overview/${eachExercise._id}`}>
                        <button className="btn btn-primary">View detail</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {(!filteredExercises || filteredExercises.length === 0) && (
          <p className="w-full text-center py-10">No exercise found</p>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
