const FilterInput = ({ limit, onLimitTextChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filtered by name or symbols"
        value={limit}
        onChange={(e) => onLimitTextChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
