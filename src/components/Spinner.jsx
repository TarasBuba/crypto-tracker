import { BarLoader } from "react-spinners";
const overRide = {
    display: 'block',
    marginInline: 'auto',

}
const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader 
        color={color}
        size={size}
        className="spinner"
        data-testid="loader"
        cssOverride={overRide}
      />
    </div>
  );
};

export default Spinner;
