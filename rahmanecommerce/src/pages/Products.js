import { useContext } from "react";
import { WidthContext } from "../App";
import DisplayProducts from "../features/products/displayProducts";
import FilterComponent from "../components/FilterComponent";
const Products = () => {
  const { windowWidth } = useContext(WidthContext);
  return (
    <>
      <FilterComponent />
    </>
  );
};

export default Products;
