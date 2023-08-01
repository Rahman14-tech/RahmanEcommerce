import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WidthContext } from "../App";
import { selectedItem } from "../features/products/products";
import { addCartItem } from "../features/cart/user";
const ProductDetail = () => {
  const { windowWidth } = useContext(WidthContext);
  const [quantity, quantityHandler] = useState(1);
  const [showAlert, AlertHandler] = useState(false);
  const { id } = useParams();
  const { filteredItems } = useSelector((store) => store.products);
  const { currentUser, cart } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const AddToCart = () => {
    AlertHandler(!showAlert);
    dispatch(
      addCartItem({
        ItemID: cart.length,
        User: currentUser,
        Item: filteredItems[0],
        Quantity: quantity,
        Sub: parseFloat(filteredItems[0].price) * quantity,
      })
    );
  };
  useEffect(() => {
    dispatch(selectedItem({ id }));
  }, []);
  return (
    <section className="md:container md:mx-auto">
      {windowWidth > 989
        ? filteredItems.map((item) => {
            return (
              <div className="grid grid-cols-2 gap-4 " key={item.id}>
                <div>
                  <img src={item.image} className="detailGambar ml-[30%]"></img>
                </div>
                <div>
                  <div
                    className={
                      showAlert
                        ? "bg-sky-100 border-t-4 border-sky-500 rounded-b text-teal-900 px-4 py-2 shadow-md mb-5 h-[7%]"
                        : "bg-sky-100 border-t-4 border-sky-500 rounded-b text-teal-900 px-4 py-2 shadow-md mb-5 h-[7%] hidden"
                    }
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-2">
                        <svg
                          className="fill-current h-5 w-5 text-sky-500 mr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">
                          Successfully added into the cart
                        </p>
                      </div>
                    </div>
                  </div>
                  <h3>${item.price}</h3>
                  <h3>{item.title}</h3>
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
                      <span className="ml-2 text-lg font-bold text-gray-900 dark:text-dark straightIt">
                        {item.rating.rate}
                      </span>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-dark-400"></span>
                      <span className="text-lg font-medium dark:text-dark">
                        {item.rating.count} reviews
                      </span>
                    </div>
                  </div>
                  <p>{item.description}</p>
                  {Object.keys(currentUser).length !== 0 && (
                    <div className="flex">
                      <button
                        onClick={() =>
                          quantity <= 1
                            ? quantityHandler(1)
                            : quantityHandler(quantity - 1)
                        }
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>

                      <input
                        className="mx-2 border text-center w-8 quantityArrow"
                        type="number"
                        value={quantity}
                        onChange={(e) => quantityHandler(e.target.value)}
                        min={1}
                        disabled
                      />
                      <button onClick={() => quantityHandler(quantity + 1)}>
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {Object.keys(currentUser).length !== 0 && (
                    <button
                      onClick={AddToCart}
                      type="submit"
                      className="text-white mt-6 ml-[77.5%] bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-500 dark:focus:ring-sky-500"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })
        : filteredItems.map((item) => {
            return (
              <div className="grid grid-cols-1 gap-4 "key={item.id}>
                <div
                  className={
                    showAlert
                      ? "bg-sky-100 border-t-4 border-sky-500 rounded-b text-teal-900 px-4 py-2 shadow-md mb-5 h-[7%]"
                      : "bg-sky-100 border-t-4 border-sky-500 rounded-b text-teal-900 px-4 py-2 shadow-md mb-5 h-[7%] hidden"
                  }
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-2">
                      <svg
                        className="fill-current h-5 w-5 text-sky-500 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">
                        Successfully added into the cart
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <img src={item.image} className="detailGambar"></img>
                  <h3 className="mt-[2rem]">${item.price}</h3>
                  <h3>{item.title}</h3>
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
                      <span className="ml-2 text-lg font-bold text-gray-900 dark:text-dark straightIt">
                        {item.rating.rate}
                      </span>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-dark-400"></span>
                      <span className="text-lg font-medium dark:text-dark">
                        {item.rating.count} reviews
                      </span>
                    </div>
                  </div>
                  <p>{item.description}</p>
                  {Object.keys(currentUser).length !== 0 && (
                    <div className="flex ml-[40%]">
                      <button
                        onClick={() =>
                          quantity <= 1
                            ? quantityHandler(1)
                            : quantityHandler(quantity - 1)
                        }
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>

                      <input
                        className="mx-2 border text-center w-8 quantityArrow"
                        type="number"
                        value={quantity}
                        onChange={(e) => quantityHandler(e.target.value)}
                        min={1}
                        disabled
                      />
                      <button onClick={() => quantityHandler(quantity + 1)}>
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {Object.keys(currentUser).length !== 0 && (
                    <button
                      onClick={AddToCart}
                      type="submit"
                      className="text-white mt-6 w-[100%] h-[3rem] bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-500 dark:focus:ring-sky-500"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
    </section>
  );
};

export default ProductDetail;
