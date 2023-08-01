import { useDispatch, useSelector } from "react-redux";
import { WidthContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { filterItems } from "./products";
import { Link } from "react-router-dom";
import { addCartItem } from "../cart/user";

const DisplayProducts = ({ ChoosenOption }) => {
  const { windowWidth } = useContext(WidthContext);
  const { filteredItems, productItems } = useSelector(
    (store) => store.products
  );
  const [AlertVisibility, AVHandler] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, cart } = useSelector((store) => store.user);
  const PutToCart = (Product) => {
    const ItemtoCart = {
      ItemID: cart.length,
      User: currentUser,
      Item: Product,
      Quantity: 1,
      Sub: parseFloat(Product.price) * 1,
    };
    dispatch(addCartItem(ItemtoCart));
  };
  useEffect(() => {
    dispatch(filterItems(ChoosenOption));
  }, []);
  if (ChoosenOption === "AllPosts") {
    return (
      <section className="productsSection">
        {AlertVisibility && (
          <div
            className="bg-sky-100 border border-sky-400 text-sky-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Successfully,</strong>
            <span className="block sm:inline">add an item into the cart</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-sky-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <div
          className={
            windowWidth < 800
              ? "grid-cols-1 grid gap-4 allProducts"
              : windowWidth < 1100
              ? "grid-cols-2 grid gap-4 allProducts"
              : "grid-cols-3 grid gap-4 allProducts"
          }
        >
          {productItems.map((product) => {
            return (
              <div key={product.id}>
                <div className="w-2/3 max-w-sm bg-white border border-white-200 rounded-lg shadow">
                  <Link to={`/Product/${product.id}`}>
                    <img
                      className="p-10 rounded-t-lg listofItems"
                      src={product.image}
                      alt="product image"
                    />
                  </Link>
                  <div className="px-5 pb-5">
                    <Link to={`/Product/${product.id}`}>
                      <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-dark">
                        {product.title}
                      </h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                      <div className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Rating star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-2 text-sm font-bold text-gray-900 dark:text-dark straightIt">
                          {product.rating.rate}
                        </span>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-dark-400"></span>
                        <a className="text-sm font-medium dark:text-dark">
                          {product.rating.count} reviews
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-dark">
                        ${product.price}
                      </span>
                      {windowWidth > 989 &&
                        Object.keys(currentUser).length !== 0 && (
                          <button
                            onClick={() => PutToCart(product)}
                            type="button"
                            className="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-500 dark:focus:ring-sky-500"
                          >
                            Add to Cart
                          </button>
                        )}
                    </div>
                    {windowWidth <= 989 &&
                      Object.keys(currentUser).length !== 0 && (
                        <button
                          onClick={() => PutToCart(product)}
                          type="button"
                          className="mt-3 text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-500 dark:focus:ring-sky-500"
                        >
                          Add to Cart
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  return (
    <section className="productsSection">
      <div
        className={
          windowWidth < 800
            ? "grid-cols-1 grid gap-4 allProducts"
            : windowWidth < 1100
            ? "grid-cols-2 grid gap-4 allProducts"
            : "grid-cols-3 grid gap-4 allProducts"
        }
      >
        {filteredItems.map((product) => {
          return (
            <div key={product.id}>
              <div className="w-2/3 max-w-sm bg-white border border-white-200 rounded-lg shadow">
                <Link to={`/Product/${product.id}`}>
                  <img
                    class="p-10 rounded-t-lg listofItems"
                    src={product.image}
                    alt="product image"
                  />
                </Link>
                <div className="px-5 pb-5">
                  <Link to={`/Product/${product.id}`}>
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-dark">
                      {product.title}
                    </h5>
                  </Link>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Rating star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="ml-2 text-sm font-bold text-gray-900 dark:text-dark straightIt">
                        {product.rating.rate}
                      </span>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-dark-400"></span>
                      <a className="text-sm font-medium dark:text-dark">
                        {product.rating.count} reviews
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-dark">
                      ${product.price}
                    </span>
                    {Object.keys(currentUser).length !== 0 && (
                      <button
                        type="button"
                        className="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-500 dark:focus:ring-sky-500"
                        onClick={() => PutToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DisplayProducts;
