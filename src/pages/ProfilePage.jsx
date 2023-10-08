import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import Nav from "../components/Nav";
import CoachDashboard from "../components/CoachDashboard";
import ClientDashboard from "../components/ClientDashboard";
import authMethods from "../services/auth.service";

const ProfilePage = () => {
  const { user, 
          setUser, 
          isLoggedIn, 
          logOutUser, 
          isLoading
        } = useContext(AuthContext);

  const [theme, setTheme] = useState("cmyk");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [description, setDescription] = useState(user?.description);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      await authMethods.passwordUpdate({
        currentPassword,
        newPassword,
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setError(null);

      window.my_modal_1.close();
    } catch (error) {
      setError("Failed to change password.", error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("image", e.target.files[0]);

      const response = await authMethods.uploadPhoto(uploadData);

      setUser(response.user);
      localStorage.setItem("authToken", response.token);
    } catch (error) {
      console.log("Error while uploading the file: ", error);
      setError(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      await authMethods.deleteUser()
      localStorage.removeItem("authToken");
      navigate("/")
      window.location.reload();
    } catch (error) {
      setError("Failed to upload your photo.", error)
      console.log(error)
    }
  }

  const handleDescription = async (e) => {
    try {
      const response = await authMethods.updateDescription({ description });
      localStorage.setItem("authToken", response.token);

      setUser(response.user)
    } catch (error) {
      console.log(error);
      setError("Failed to update the description.", error)
    }
  };

  useEffect(() => {
    if (user) {
      setDescription(user.description || "");
      if (user && user.userType === "coach") {
        setTheme("night");
      } else {
        setTheme("cmyk");
      }
    }
  }, [user]);

  useEffect(()=> {
    if (!isLoggedIn && !isLoading && !user) {
      return navigate("/")
    }
    
  }, [isLoggedIn, isLoading, user, navigate])

  if (isLoading) {
    return <span className="loading loading-spinner text-error">Loading...</span>
  }
  

  return (
    isLoggedIn && (
      <div data-theme={theme} className="pd-8">
        <Nav />
        {user?.userType === "coach" && <CoachDashboard coachId={user._id} />}
        {user?.userType === "client" && <ClientDashboard clientId={user._id} />}


        <div className="flex-grow p-6 flex flex-col items-center justify-center">
          <div
            className={`w-full max-w-md p-6 ${
              user?.userType === "client" ? "bg-white" : "bg-slate-900"
            } rounded-lg shadow-lg`}
          >

          {/* profile image */}  
            
            <h1 className="text-3xl mb-2">Profile page</h1>
            <div className="mb-4">
              {user?.image ? (
                <img
                  src={user?.image}
                  alt="Profile"
                  width="200"
                  className="mx-auto block rounded-full"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>

          {/* upload photo */}

            <input
              type="file"
              className="file-input file-input-bordered file-input-info w-full max-w-xs mx-auto"
              onChange={(e) => handleFileUpload(e)}
            />

          {/* user details */}

            <div className="mb-4">
              <h4 className="font-bold text-lg">Username:</h4>
              <p>{user?.username}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-bold text-lg">You are a:</h4>
              <p>{user?.userType}</p>
            </div>

          {/*description modal*/}

            <button
              className="btn mb-2"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              Update your description
            </button>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Description:</h3>
                <textarea
                  placeholder="Bio"
                  className="textarea textarea-bordered textarea-md w-full max-w-xs"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn mr-2" onClick={handleDescription}>
                      Update
                    </button>
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>


            {/*password modal*/}

            <button
              className="btn mb-4"
              onClick={() => window.my_modal_1.showModal()}
            >
              Change Password
            </button>
            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Change Password</h3>
                <div className="py-4">
                  <label
                    htmlFor="currentPassword"
                    className="block font-medium"
                  >
                    Current Password:
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="input input-bordered w-full"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="py-2">
                  <label htmlFor="newPassword" className="block font-medium">
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="input input-bordered w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}

                <div className="modal-action">
                  <button className="btn" onClick={handleChangePassword}>
                    Change Password
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setError(null); // Reset the error state
                      setCurrentPassword("")
                      setNewPassword("")
                      window.my_modal_1.close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </dialog>

            {/* delete account modal */}

            <button className="btn btn-outline btn-error mb-4" onClick={()=>document.getElementById('my_modal_5').showModal()}>Delete account</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete your account?</h3>
                <div className="modal-action">
                  <form method="dialog">
                    <button 
                      onClick={() => {
                        handleDelete();
                      }}
                      className="btn btn-outline btn-error mb-4 mr-4">Yes
                    </button>
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* logout button */}

            <button
              onClick={() => {
                logOutUser();
                navigate("/");
              }}
              className="btn btn-wide btn-error mb-4"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      )
  );
};

export default ProfilePage;

