import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authMethods from "../services/auth.service";

import Nav from "../components/Nav";
import ClientDashboard from "../components/ClientDashboard";

const CoachesPage = () => {
  const [theme, setTheme] = useState("cmyk");
  const [coachesList, setCoachesList] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userType === "client") {
      const getCoaches = async () => {
        try {
          const response = await authMethods.getCoaches();
          setCoachesList(response);
        } catch (error) {
          console.log(error);
        }
      };
      getCoaches();
    } else if (user && user.userType !== "client") {
      console.log("you're not a client");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.userType === "client") {
      setTheme("cmyk");
    }
  }, [user]);

  // if (isLoading) {
  //   return <span className="loading loading-spinner text-error"></span>;
  // }

  return (
    isLoggedIn && (
      <div data-theme={theme} className="pb-8">
        <Nav />
        {user?.userType === "client" && <ClientDashboard clientId={user._id} />}

        <div className="flex flex-col mt-4 space-y-4 items-center md:flex-row md:space-x-6 md:items-center md:px-24">
          <h1 className="text-3xl self-center md:mt-3 md:ml-4">Coaches</h1>
        </div>

        <div className="flex flex-wrap px-6 md:px-24">
          {coachesList?.length > 0 ? (
            coachesList.map((coach) => (
              <div
                key={coach._id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-full"
              >
                <div
                  id={coach.id}
                  className="bg-base-100 shadow-xl card-bordered h-full"
                >
                  <figure className="w-full overflow-hidden">
                    <img
                      src={coach.image}
                      alt="coach"
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-1xl">{coach.username}</h2>
                    <div className="card-actions justify-between items-center">
                      <Link to={`/coaches/${coach._id}`}>
                        <button className="btn btn-primary">View coach</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-screen flex flex-col justify-center">
              <span className="text-error">
              No coaches avaialble
              </span>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default CoachesPage;
