import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllCrypto, fetchTopGainers, fetchNewListings } from "../../utils/api";

const filterOptions = ["All assets", "Top Gainers", "New Listings", "Tradable"];
const timeFrames = ["1H", "1D", "1W", "1M", "1Y"];
const currencies = ["USD", "EUR", "GBP", "GHS"];
const rowOptions = [10, 25, 50, 100];

const generateSparkline = (change) => {
  // Generate a simple sparkline path based on positive/negative trend
  const pts = Array.from({ length: 11 }, (_, i) => {
    const base = 15;
    const noise = (Math.random() - 0.5) * 6;
    const trend = change > 0 ? -i * 0.3 : i * 0.3;
    return `${i * 5},${Math.max(2, Math.min(28, base + noise + trend))}`;
  });
  return "M" + pts.join(" L");
};

export default function CryptoTable() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All assets");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1D");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedRows, setSelectedRows] = useState(10);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadCryptos();
  }, [selectedFilter]);

  const loadCryptos = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (selectedFilter === "Top Gainers") {
        data = await fetchTopGainers();
      } else if (selectedFilter === "New Listings") {
        data = await fetchNewListings();
      } else {
        data = await fetchAllCrypto();
      }

      let list = data.data || [];

      if (selectedFilter === "Tradable") {
        list = list.filter((c) => c.tradable);
      }

      setCryptos(list);
    } catch (err) {
      setError("Failed to load cryptocurrency data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const displayed = cryptos.slice(0, selectedRows);

  return (
    <section className="mb-10 pt-10">
      <div className="flex items-baseline gap-3 mb-3">
        <h2 className="text-[22px] font-bold tracking-[-0.02em]">Crypto market prices</h2>
        <span className="text-[13px] text-gray-400 font-normal">
          {loading ? "Loading..." : `${cryptos.length} assets`}
        </span>
      </div>

      <p className="text-[14px] leading-relaxed text-gray-600 mb-1">
        The overall crypto market is growing this week. As of today, the total
        crypto market capitalization is 2.26 trillion, representing a 4.67%
        increase from last week.
        {expanded && (
          <span>
            {" "}
            The 24-hour crypto market trading volume has also seen a 0.30%
            decrease over the past day.
          </span>
        )}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[14px] font-medium text-blue-600 hover:underline mb-7"
      >
        {expanded ? "Read less" : "Read more"}
      </button>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5 mb-7">
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="appearance-none pl-8 pr-8 py-2 border border-gray-200 rounded-full text-[13px] font-medium bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
          </svg>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {[
          { val: selectedTimeFrame, set: setSelectedTimeFrame, opts: timeFrames },
          { val: selectedCurrency, set: setSelectedCurrency, opts: currencies },
        ].map(({ val, set, opts }, i) => (
          <div key={i} className="relative">
            <select value={val} onChange={(e) => set(e.target.value)} className="appearance-none px-4 pr-8 py-2 border border-gray-200 rounded-full text-[13px] font-medium bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
              {opts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        ))}

        <div className="relative">
          <select value={selectedRows} onChange={(e) => setSelectedRows(Number(e.target.value))} className="appearance-none px-4 pr-8 py-2 border border-gray-200 rounded-full text-[13px] font-medium bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
            {rowOptions.map((r) => <option key={r} value={r}>{r} rows</option>)}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadCryptos} className="text-red-700 font-medium hover:underline ml-4">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-3 pr-2 w-10"></th>
              <th className="py-3 px-3 font-medium text-[13px]">Asset</th>
              <th className="py-3 px-3 font-medium text-[13px] hidden md:table-cell">Market price</th>
              <th className="py-3 px-3 font-medium text-[13px] hidden lg:table-cell">Chart</th>
              <th className="py-3 px-3 font-medium text-[13px]">Change (24h)</th>
              <th className="py-3 px-3 font-medium text-[13px] hidden md:table-cell text-blue-600">Mkt cap</th>
              <th className="py-3 px-3 font-medium text-[13px] hidden lg:table-cell">Volume</th>
              <th className="py-3 px-3 font-medium text-[13px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="py-5 px-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : displayed.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-400">
                  No cryptocurrencies found.
                </td>
              </tr>
            ) : (
              displayed.map((asset) => (
                <tr key={asset._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-5 pr-2 pl-1">
                    <button className="text-gray-300 hover:text-yellow-400 transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-5 px-3">
                    <div className="flex items-center gap-3">
                      <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full shrink-0 object-cover" onError={(e) => { e.target.src = `https://placehold.co/32x32/0052ff/white?text=${asset.symbol[0]}`; }} />
                      <div>
                        <div className="font-medium text-[14px] text-gray-900">{asset.name}</div>
                        <div className="text-[12px] text-gray-400 mt-0.5">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-3 font-medium text-[14px] hidden md:table-cell">{formatPrice(asset.price)}</td>
                  <td className="py-5 px-3 hidden lg:table-cell">
                    <svg viewBox="0 0 50 30" className="w-20 h-8" preserveAspectRatio="none">
                      <path d={generateSparkline(asset.change24h)} fill="none" stroke={asset.change24h < 0 ? "#ef4444" : asset.change24h > 0 ? "#22c55e" : "#9ca3af"} strokeWidth="1.5" />
                    </svg>
                  </td>
                  <td className="py-5 px-3">
                    <span className={`text-[14px] font-medium flex items-center gap-0.5 ${asset.change24h < 0 ? "text-red-500" : asset.change24h > 0 ? "text-green-500" : "text-gray-500"}`}>
                      {asset.change24h !== 0 && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          {asset.change24h < 0
                            ? <path d="M5 2v6M5 8L2 5M5 8l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            : <path d="M5 8V2M5 2L2 5M5 2l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          }
                        </svg>
                      )}
                      {Math.abs(asset.change24h).toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-5 px-3 hidden md:table-cell text-[14px] text-gray-600">{asset.mktCap}</td>
                  <td className="py-5 px-3 hidden lg:table-cell text-[14px] text-gray-600">{asset.volume}</td>
                  <td className="py-5 px-3 text-right">
                    {asset.tradable && (
                      <Link to="/login" className="inline-flex px-5 py-2 text-[13px] font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition">
                        Trade
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && displayed.length > 0 && (
        <div className="flex items-center justify-end mt-6">
          <span className="text-[12px] text-gray-400">
            Showing {displayed.length} of {cryptos.length} assets
          </span>
        </div>
      )}
    </section>
  );
}
