import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import IndividualsMenu from "../../Individuals/components/IndividualsMenu";
import BusinessesMenu from "../../Businesses/components/BusinessesMenu";

const navLinks = [
  { label: "Cryptocurrencies", to: "/cryptocurrencies" },
  { label: "Individuals", hasDropdown: "individuals" },
  { label: "Businesses", hasDropdown: "businesses" },
  { label: "Institutions", to: "#" },
  { label: "Developers", to: "#" },
  { label: "Company", to: "#" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [individualsHovered, setIndividualsHovered] = useState(false);
  const [businessesHovered, setBusinessesHovered] = useState(false);

  const closeAll = () => {
    setIndividualsHovered(false);
    setBusinessesHovered(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100" onMouseLeave={closeAll}>
      <nav className="max-w-9xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <svg width="32" height="32" viewBox="0 0 1024 1024" fill="none">
            <circle cx="512" cy="512" r="512" fill="#0052FF" />
            <path d="M512.147 692C412.697 692 332.147 611.45 332.147 512C332.147 412.55 412.697 332 512.147 332C601.247 332 675.547 396.95 690.047 481H854.047C838.347 311.1 694.497 180 512.147 180C328.897 180 180.147 328.75 180.147 512C180.147 695.25 328.897 844 512.147 844C694.497 844 838.347 712.9 854.047 543H690.047C675.547 627.05 601.247 692 512.147 692Z" fill="white" />
          </svg>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8 ml-8">
          {navLinks.map(({ label, to, hasDropdown }) => (
            <div key={label} className="flex items-center"
              onMouseEnter={() => {
                if (hasDropdown === "individuals") { setIndividualsHovered(true); setBusinessesHovered(false); }
                else if (hasDropdown === "businesses") { setBusinessesHovered(true); setIndividualsHovered(false); }
              }}>
              {hasDropdown ? (
                <div className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">{label}</div>
              ) : (
                <Link to={to} className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">{label}</Link>
              )}
            </div>
          ))}
        </div>

        {/* Right side — auth aware */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <span>{user.name?.split(" ")[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                Sign in
              </Link>
              <Link to="/register" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Dropdowns */}
      {individualsHovered && (
        <div onMouseLeave={closeAll}>
          <IndividualsMenu />
        </div>
      )}
      {businessesHovered && (
        <div onMouseLeave={closeAll}>
          <BusinessesMenu />
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map(({ label, to }) => to && to !== "#" ? (
            <Link key={label} to={to} className="block text-sm font-medium text-gray-800 py-2" onClick={() => setMobileOpen(false)}>{label}</Link>
          ) : (
            <div key={label} className="block text-sm font-medium text-gray-800 py-2">{label}</div>
          ))}
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/profile" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>My Profile</Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-sm font-medium text-gray-700 py-2 text-left">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Sign in</Link>
                <Link to="/register" className="text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-full text-center" onClick={() => setMobileOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
