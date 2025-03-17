import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { routers } from "@/router/links";

const Header = () => {
  const [nav, setNav] = useState(false);
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg">
          <Link to="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              <img className="max-w-[75px]" src="/logo.png" />
            </span>
          </Link>

          <div
            className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${
              nav
                ? "absolute top-[90px] left-0 w-full bg-white shadow-md p-0 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none"
                : "hidden md:flex gap-6"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:gap-5 gap-0 lg:py-5">
              {routers.map((v, k) => (
                <li key={k}>
                  <NavLink
                    to={v.url}
                    className={({ isActive }) =>
                      `block p-3 rounded-lg text-gray-700 border-b border-gray-100 hover:bg-[#000] hover:bg-[#000] md:border-0 md:hover:text-white ${
                        isActive ? "bg-[#000] text-white rounded-lg" : ""
                      }`
                    }
                  >
                    {v.title}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    `block p-3 rounded-lg text-gray-700 border-b border-gray-100 hover:bg-[#000] hover:bg-[#000] md:border-0 md:hover:text-white ${
                      isActive ? "bg-[#000] text-white rounded-lg" : ""
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </li>
              {/* Add more links here */}
            </ul>
            <button
              className="mt-4 md:mt-0 rounded-full bg-[#000] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
              type="button"
            >
              Sign Up Now
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center lg:order-1">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={nav}
              onClick={() => setNav(!nav)}
            >
              <span className="sr-only">Open main menu</span>
              {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
