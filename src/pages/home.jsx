import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelecrotor from "../components/SortSelector";

const HomePage = ({
  coins,
  error,
  limit,
  filter,
  sortBy,
  setFilter,
  setLimit,
  setSortBy,
  loading,
}) => {
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "volume_asc":
          return a.total_volume - b.total_volume;
        case "volume_desc":
          return b.total_volume - a.total_volume;
        case "price_asc":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        default:
          return 0;
      }
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1 className="">🚀Crypto Dashboard</h1>
      <div className="top-controls">
        <FilterInput limit={filter} onLimitTextChange={setFilter} />
      </div>

      <LimitSelector limit={limit} onLimitChange={setLimit} />
      <SortSelecrotor sortBy={sortBy} onSortChange={setSortBy} />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No coins match your filter.</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
