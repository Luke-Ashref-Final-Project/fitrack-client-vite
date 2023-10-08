import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import authMethods from "../services/auth.service";
import Nav from "../components/Nav";
import CoachDashboard from "../components/CoachDashboard";

const SubscribePage = () => {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const [fetchedUsers, setFetchedUsers] = useState(null);
  const [theme, setTheme] = useState("cmyk");

  useEffect(() => {
    if (user && user.userType === "coach") {
      setTheme("night");
      authMethods
        .getAllSubscribers()
        .then((data) => {
          setFetchedUsers(data);
        })
        .catch((err) => {
          console.error("Error fetching subscribers:", err);
        });
    } else {
      setTheme("cmyk");
    }
  }, [user]);

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-error">Loading...</span>
    );
  }

  return (
    isLoggedIn && (
      <div data-theme={theme} className="pb-8">
        <Nav />
        {user?.userType === "coach" && <CoachDashboard coachId={user._id} />}

        <div className="flex flex-col mt-4 space-y-4 items-center md:flex-row md:space-x-6 md:items-center md:px-24">
          <h1 className="text-3xl self-center md:mt-3 md:ml-4">
            My subscribers
          </h1>
        </div>
        <div className="flex flex-wrap px-6 md:px-24">
          {fetchedUsers &&
            fetchedUsers.subscribersIds.map((item) => {
              return (
                <div
                  key={item._id}
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-full"
                >
                  <div className="card bg-base-100 shadow-xl card-bordered h-full">
                    <figure className="w-full overflow-hidden">
                      {item?.image ? (
                        <img
                          className="w-full object-cover"
                          src={item.image}
                          alt="profile"
                        />
                      ) : (
                        <p className="text-center">No image available</p>
                      )}
                    </figure>
                    <div className="card-body">
                      <h1 className="card-title text-1xl">{item.username}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default SubscribePage;
