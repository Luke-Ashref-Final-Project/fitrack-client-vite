import { AuthContext } from "../context/auth.context";
import authMethods from "../services/auth.service";
import apiMethods from "../services/api.service";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import CoachDashboard from "../components/CoachDashboard";

const NewExercisePage = () => {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const [theme, setTheme] = useState("cmyk");
  const navigate = useNavigate();
  const location = useLocation();
  // const { name, bodyPart, gifUrl, id } = location.state || {}; // Add default empty object
  const [name, setName] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [description, setDescription] = useState("");
  const [coachId, setCoachId] = useState("");
  const [clientId, setClientId] = useState("");

  const handleCreateNewExercise = async (e) => {
    e.preventDefault();
    try {
      const createdNewExercise = await apiMethods.createNewExercise({
        user: user,
        clientId: clientId,
        coachId: coachId,
        bodyPart: bodyPart,
        image: gifUrl,
        description: description,
        name: name,
      });
      if (createdNewExercise) {
        navigate("/overview", { state: { newExerciseAdded: true } });

      
      } else {
        return <h1>Cannot create new exercise</h1>;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //UPON LOADING, RECEIVING THE DATA PASSED THROUGHT THE ROUTE
  useEffect(() => {
    if (user && user.userType === "coach") {
      setTheme("night");
      authMethods
        .getAllSubscribers()
        .then((data) => {
          const subs = data.subscribersIds;
          setSubscribers(subs);
        })
        .catch((err) => {
          console.error("Error fetching subscribers:", err);
        });
    } else {
      setTheme("cmyk");
    }

    if (location.state) {
      setName(location.state.name);
      setBodyPart(location.state.bodyPart);
      setGifUrl(location.state.gifUrl);
      setCoachId(location.state.id);
    }
  }, [name, bodyPart, gifUrl, coachId, user, location.state]);

  if (isLoading) {
    return <span className="loading loading-spinner text-error">Loading...</span>
  }

  return (
    <div data-theme={theme}>
      <Nav />
      {user?.userType === "coach" && <CoachDashboard coachId={user._id} />}
      {isLoggedIn ? (
        <div>
          <h1 className="text-3xl mb-2 mt-4">Create new exercise</h1>
          <div className="pt-2 pb-4">
            <form onSubmit={handleCreateNewExercise}>
              <div className="card bg-base-100 shadow-xl card-bordered mx-6 mb-8">
                <figure>
                  <img src={gifUrl} alt="exercise" id="gifImage" />
                </figure>

                <div className="card-body">
                  <h1 className="card-title text-1xl" id="exerciseName">
                    {name}
                  </h1>

                  <div className="flex flex-col space-y-4">
                    <label
                      htmlFor="selectClient"
                      className="text-start text-1xl"
                    >
                      Select a client
                    </label>
                    <select
                      name="selectClient"
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) => {
                        setClientId(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        Pick one client
                      </option>
                      {subscribers.length !== 0 ? (
                        subscribers.map((client) => {
                          return (
                            <option key={client._id} value={client._id}>
                              {client.username}
                            </option>
                          );
                        })
                      ) : (
                        <option disabled>No options available</option>
                      )}
                    </select>
                    <label
                      htmlFor="description"
                      className="text-start text-1xl"
                    >
                      Description
                    </label>
                    <textarea
                      className="textarea textarea-bordered"
                      placeholder="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="card-actions justify-between items-center pt-4">
                    <div className="badge badge-secondary" id="bodyPart">
                      {bodyPart}
                    </div>
                    {clientId ? (
                      <button type="submit" className="btn btn-primary">
                        Create new exercise
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled="disabled"
                        className="btn btn-primary disabled"
                      >
                        Create new exercise
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Please log in to see this page</p>
      )}
    </div>
  );
};

export default NewExercisePage;
