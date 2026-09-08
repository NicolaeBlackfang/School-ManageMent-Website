// src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/react.svg'; // Default avatar image for users without a profile picture

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-wider flex items-center gap-2">
              🎓 <span className="hidden sm:inline">Nurul Alam ChudirPo</span>
            </Link>
          </div>

          {/* Navigation Links inside frontend/src/components/Navbar.jsx */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="bg-blue-600 text-xs uppercase px-2.5 py-1 rounded-full font-semibold border border-blue-400">
                  {user.role}
                </span>

                <span className="text-sm hidden md:inline font-medium text-blue-100">
                  Welcome, {user.name}
                </span>

                <Link
                  to={`/${user.role}/dashboard`}
                  className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-md font-medium transition-colors"
                >
                  Dashboard
                </Link>

                {/* Profile Avatar Trigger Link */}
                <Link to="/profile" className="flex items-center">
                  {/* Updated image tag line inside Navbar.jsx */}
                  <img
                    src={user?.profileImage && user.profileImage !== "" ? user.profileImage : defaultAvatar}
                    alt="User Profile"
                    className="h-9 w-9 rounded-full object-cover border border-blue-400 shadow-sm"
                  />
                </Link>
              </>
            ) : (
              // Logout links remain here...

              <>
                {/* Links visible when logged out */}
                <Link
                  to="/login"
                  className="text-sm hover:text-blue-200 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-white text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-md font-bold transition-colors shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
