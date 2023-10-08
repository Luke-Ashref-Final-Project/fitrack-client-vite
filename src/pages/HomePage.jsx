import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import cta1 from "../assets/images/cta-1.png";

const HomePage = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <span className="loading loading-spinner text-error">Loading...</span>
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex flex-row justify-center gap-x-4 items-center">
            <Link to="/">
              <img src={Logo} alt="" className="h-max" />
            </Link>
            <h1 className="text-6xl font-bold">Fi𝓣rack</h1>
          </div>

          <p className="py-6 text-lg">
            The best way to track your fitness progress! For the coach and
            for clients!
          </p>
          <img src={cta1} alt="" />

          {isLoggedIn ? (
            <Link to="/overview">
              <button className="btn btn-wide btn-primarybtn-outline mt-4">
                Overview page
              </button>
            </Link>
          ) : (
            <div className="flex flex-col mt-4 space-y-4">
              <Link to="/signup">
                <button className="btn btn-wide btn-outline">
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-info btn-wide">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
