import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authMethods from "../services/auth.service";

import Nav from "../components/Nav";
import ClientDashboard from "../components/ClientDashboard";

const CoachOverviewPage = () => {
  const [theme, setTheme] = useState("cmyk");
  const [coach, setCoach] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { coachId } = useParams();

  const handleSubscribe = async () => {
    try {
      const response = await authMethods.subscribe(coachId);
      console.log("Subscribed successfully!", response);
      setSubscribed(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await authMethods.unSubscribe(coachId);
      console.log("Unsubscribed successfully", response);
      setSubscribed(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.userType === "client") {
      setTheme("cmyk");
    }

    const coachDetails = async () => {
      try {
        const response = await authMethods.coachOverview(coachId);
        const coach = response.coach;

        if (user && coach.subscribersIds.includes(user._id)) {
          setSubscribed(true);
        }
        setCoach(coach);
      } catch (error) {
        console.log(error);
      }
    };

    coachDetails();
  }, [user, coachId]);

  return (
    isLoggedIn && (
      <div data-theme={theme} className="pb-8">
        <Nav />
        {user?.userType === "client" && <ClientDashboard clientId={user._id} />}


        <div className="flex flex-col mt-4 space-y-4 items-center md:flex-row md:space-x-6 md:items-center md:px-24">
          <h1 className="text-3xl self-center md:mt-3 md:ml-4">
            Subcribe or unsubscribe coach
          </h1>
        </div>
        <div className="flex flex-wrap px-6 md:px-24">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-full">
            {coach ? (
              <div
                id={coach.id}
                className="card bg-base-100 shadow-xl card-bordered h-full"
              >
                <figure>
                  <img src={coach.image} alt="coach" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{coach.username}</h2>
                  <p>{coach.description}</p>
                  {subscribed ? (
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-error"
                        onClick={() => handleUnsubscribe(coach._id)}
                      >
                        Unsubscribe
                      </button>
                    </div>
                  ) : (
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSubscribe(coach._id)}
                      >
                        Subscribe
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <span className="loading loading-spinner text-error">
                Loading...
              </span>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CoachOverviewPage;
