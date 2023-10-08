import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";
// import authMethods from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/images/logo.svg";
import { FiHome, FiUser, FiUsers, FiSearch, FiUserPlus } from "react-icons/fi";

const Nav = () => {
  const [theme, setTheme] = useState("cmyk");
  const { user, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (user && user.userType === "coach") {
      setTheme("night");
    } else {
      setTheme("cmyk");
    }
  }, [user]);

  return (
    isLoggedIn && (
      <div data-theme={theme} className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <div className="flex-none md:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <Link to={"/overview"}>
              <img
                className="w-10 md:w-12 pl-2 md:pl-4"
                src={logo}
                alt="logo"
              />
              <div className="flex-1 px-2 mx-2 text-3xl">Fi𝓣rack</div>
            </Link>
            <div className="flex-none hidden md:block">
              <ul className="menu menu-horizontal">
                {user ? (
                  user.userType === "coach" ? (
                    <>
                      <li>
                        <Link className="text-xl" to="/overview">
                          <FiHome /> Overview
                        </Link>
                      </li>
                      <li>
                        <Link className="text-xl" to="/searchexercises">
                          <FiSearch /> Search exercises
                        </Link>
                      </li>
                      <li>
                        <Link className="text-xl" to="/subscribers">
                          <FiUsers /> Subscribers
                        </Link>
                      </li>
                      <li>
                        <Link className="text-xl" to="/profile">
                          <FiUser />
                          Account
                        </Link>
                      </li>
                    </>
                  ) : user.userType === "client" ? (
                    <>
                      <li>
                        <Link className="text-xl" to="/overview">
                          <FiHome /> Overview
                        </Link>
                      </li>
                      <li>
                        <Link className="text-xl" to="/coaches">
                          <FiUsers /> Coaches
                        </Link>
                      </li>
                      <li>
                        <Link className="text-xl" to="/profile">
                          <FiUser /> Account
                        </Link>
                      </li>
                    </>
                  ) : null
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar menu here */}
            {user ? (
              user.userType === "coach" ? (
                <div className="space-y-2 pt-10">
                  <li>
                    <Link className="text-xl" to="/overview">
                      <FiHome /> Overview
                    </Link>
                  </li>
                  <li>
                    <Link className="text-xl" to="/subscribers">
                      <FiUsers /> Subscribers
                    </Link>
                  </li>
                  <li>
                    <Link className="text-xl" to="/searchexercises">
                      <FiSearch /> Search exercises
                    </Link>
                  </li>
                  <li>
                    <Link className="text-xl" to="/profile">
                      <FiUser /> Account
                    </Link>
                  </li>
                </div>
              ) : user.userType === "client" ? (
                <div className="space-y-2 pt-8">
                  <li>
                    <Link className="text-xl" to="/overview">
                      <FiHome /> Overview
                    </Link>
                  </li>
                  <li>
                    <Link className="text-xl" to="/coaches">
                      <FiUserPlus /> Coaches page
                    </Link>
                  </li>
                  <li>
                    <Link className="text-xl" to="/profile">
                      <FiUser /> Account
                    </Link>
                  </li>
                </div>
              ) : null
            ) : null}
          </ul>
        </div>
      </div>
    )
  );
};

export default Nav;
