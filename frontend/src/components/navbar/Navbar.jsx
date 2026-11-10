import { useState } from "react";

import {
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false);

  // TEMP LOGIN STATE
  const isLoggedIn = false;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="CA Factory home">
            <img
              src="/logo.png"
              alt="CA Factory logo"
              className="h-14 w-auto object-contain drop-shadow-sm"
            />
          </Link>

          {/* DESKTOP MENU */}

          <div className="hidden lg:flex items-center gap-10">

            <a href="#home">

            Home

           </a>

            {/* DROPDOWN */}

           <div className="relative group">

  <button className="font-medium">

    Categories

  </button>

  <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-xl mt-3 w-56">

    <ul className="p-4 space-y-3">

      <li className="hover:text-blue-700 cursor-pointer">
        Web Development
      </li>

      <li className="hover:text-blue-700 cursor-pointer">
        Data Science
      </li>

      <li className="hover:text-blue-700 cursor-pointer">
        Graphic Designing
      </li>

      <li className="hover:text-blue-700 cursor-pointer">
        Digital Marketing
      </li>

    </ul>

  </div>

</div>
<Link
  to="/courses"
  className="font-medium text-slate-700 hover:text-blue-900"
>
  Courses
</Link>

<Link
  to="/blogs"
  className="font-medium text-slate-700 hover:text-blue-900"
>
  Blogs
</Link>

            <Link
            to="/about"
           className="font-medium text-slate-700 hover:text-blue-900"
           >

            About

           </Link>

          <a
           href="#contact"
           className="font-medium text-slate-700 hover:text-blue-900"
           >

            Contact

           </a>
          </div>

          {/* RIGHT SIDE */}

          <div className="hidden lg:flex items-center gap-5">

            {/* SEARCH */}

            <div className="flex items-center border rounded-xl overflow-hidden">

              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-3 outline-none"
              />

              <button className="bg-blue-900 text-white px-5 py-4">

                <FaSearch />

              </button>

            </div>

            {/* LOGIN STATE */}

            {isLoggedIn ? (

              <div className="flex items-center gap-3">

                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-11 h-11 rounded-full"
                />

                <div>

                  <h2 className="font-semibold">
                    Divyansh
                  </h2>

                  <p className="text-sm text-gray-500">
                    Student
                  </p>

                </div>

              </div>

            ) : (

              <div className="flex gap-4">

                <Link
                  to="/login"
                  className="px-6 py-3 border border-blue-900 rounded-xl font-semibold text-blue-900 hover:bg-blue-900 hover:text-white transition"
                >
                  Login
                </Link>

               

              </div>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-2xl"
          >

            {mobileMenu ? <FaTimes /> : <FaBars />}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="lg:hidden bg-white border-t">

          <div className="flex flex-col p-6 gap-5">

            <Link to="/">
              <a href="#home">Home</a>
            </Link>

            <Link to="/courses" className="text-slate-700 hover:text-blue-900">
              Courses
            </Link>

            <Link to="/blogs" className="text-slate-700 hover:text-blue-900 font-bold">
              Blogs
            </Link>

            <Link to="/about" className="text-slate-700 hover:text-blue-900">
              About
            </Link>

            <a href="#">
            <a href="#contact">Contact</a>
            </a>

            <Link
              to="/login"
              className="bg-blue-900 text-white text-center py-3 rounded-xl"
            >
              Login
            </Link>

            

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;