import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Get initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white font-sans">
      {/* Navbar */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none">
            <circle cx="512" cy="512" r="512" fill="#0052FF" />
            <path
              d="M512.147 692C412.697 692 332.147 611.45 332.147 512C332.147 412.55 412.697 332 512.147 332C601.247 332 675.547 396.95 690.047 481H854.047C838.347 311.1 694.497 180 512.147 180C328.897 180 180.147 328.75 180.147 512C180.147 695.25 328.897 844 512.147 844C694.497 844 838.347 712.9 854.047 543H690.047C675.547 627.05 601.247 692 512.147 692Z"
              fill="white"
            />
          </svg>
          <span className="text-white font-semibold text-lg">Coinbase</span>
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded-full transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Profile Content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Avatar & Name */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-400 mt-1">Coinbase Member</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Account Details
            </h2>
            <div className="space-y-4">
              <InfoRow label="Full Name" value={user?.name} />
              <InfoRow label="Email Address" value={user?.email} />
              <InfoRow
                label="Member Since"
                value={user?.createdAt ? formatDate(user.createdAt) : "—"}
              />
              <InfoRow
                label="Last Updated"
                value={user?.updatedAt ? formatDate(user.updatedAt) : "—"}
              />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cryptocurrencies"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Browse Cryptocurrencies
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white text-sm font-semibold rounded-full transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-white">{value || "—"}</span>
    </div>
  );
}
