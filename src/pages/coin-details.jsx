import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_COIN_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(`${API_COIN_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching coin details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coin) return <div>No coin details available</div>;

  return (
    // {id}
    <div className="coin-details-container">
      <Link to="/">Back to Coins List</Link>
      <h1 className="coin-details-title">
        {coin
          ? `${coin.name} (${coin.symbol.toUpperCase()}) Details`
          : "Coin Details"}
      </h1>
      {/* {loading && <div>Loading...</div>} */}
      {loading && <Spinner color="black" size="150"/>}
      {error && <div>Error: {error.message}</div>}

      <CoinChart coinId={id} />

      {!loading && !error && coin && (
        <>
          <div className="coin-details-info">
            <img
              src={coin.image.large}
              alt={coin.name}
              className="coin-details-image"
            />
            <p>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </p>
            <p>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </p>
            <p>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</p>
            <p>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</p>
            <p>
              Price Change 24h:{" "}
              <span
                className={
                  coin.market_data.price_change_percentage_24h >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
          </div>

          <div className="coins-details-links">
            {coin.links.homepage[0] && (
              <p>
                Homepage:{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {coin.links.homepage[0]}
                </a>
              </p>
            )}
          </div>
        </>
      )}

      {!loading && !error && !coin && <p>No coin details available.</p>}
    </div>
  );
};

export default CoinDetailsPage;
