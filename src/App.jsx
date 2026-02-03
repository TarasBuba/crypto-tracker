import { useState, useEffect } from "react";
// import CoinCard from "./components/CoinCard";
// import LimitSelector from "./components/LimitSelector";
// import FilterInput from "./components/FilterInput";
// import SortSelecrotor from "./components/SortSelector";
import HomePage from "./pages/home";
import {Route, Routes} from "react-router-dom";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFundPage from "./pages/not-found";
import CoinDetails from "./pages/coin-details";

const API_URL = import.meta.env.VITE_COINS_API;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [limit]);

  return (
<>
      <Header />
      <Routes>
        <Route path="/" element={
          <HomePage
            coins={coins}
            error={error}
            limit={limit}
            filter={filter}
            sortBy={sortBy}
            setFilter={setFilter}
            setLimit={setLimit}
            setError={setError}
            setSortBy={setSortBy}
            loading={loading}
          />
        } />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFundPage />} />
      </Routes>
    </>
  );
}

export default App;
