const SortSelecrotor = ({ sortBy, onSortChange }) => {
  return (
    <div className="controls">
      <label htmlFor="sort-select">Sort By:</label>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="market_cap_desc">Market Cap (max to min)</option>
        <option value="market_cap_asc">Market Cap (min to max)</option>
        <option value="volume_desc">Volume (max to min)</option>
        <option value="volume_asc">Volume (min to max)</option>
        <option value="price_desc">Price(max to min)</option>
        <option value="price_asc">Price (min to max)</option>
      </select>
    </div>
  );
};

export default SortSelecrotor;