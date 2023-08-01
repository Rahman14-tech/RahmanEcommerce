import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import {
  addCartItem,
  Checkout,
  DecrementCart,
  IncrementCart,
  RemoveFromCart,
} from "./user";
import { WidthContext } from "../../App";
const DisplayCart = () => {
  const [cartCount, cartHandler] = useState(0);
  const [OpenSummary, SummaryHandler] = useState(false);
  const [showAlert, showAlertHandler] = useState(false);
  const [AppliedPromo, AppliedPromoHandler] = useState(false);
  const [TotalPrice, TotalPriceHandler] = useState(0);
  const [TotalNDelivery, TotalNDeliveryHandler] = useState(15);
  const [PromoInput, PromoInputHandler] = useState("");
  const dispatch = useDispatch();
  const { windowWidth } = useContext(WidthContext);
  const { cart, currentUser } = useSelector((store) => store.user);
  const CalculateTotal = () => {
    let tempTotal = 0;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        if (currentUser.email === cart[i].User.email) {
          tempTotal += cart[i].Sub;
        }
      }
      if (tempTotal === 0) {
        TotalNDeliveryHandler((tempTotal + 0).toFixed(2));
      } else {
        TotalNDeliveryHandler((tempTotal + 15).toFixed(2));
      }
    } else if (cartCount === 0 || cart.length === 0) {
      TotalNDeliveryHandler(0);
    }
    return tempTotal;
  };
  const CalculateCartItems = () => {
    let tempCalculation = 0;
    for (let i = 0; i < cart.length; i++) {
      if (currentUser.email === cart[i].User.email) {
        tempCalculation += 1;
      }
    }
    return tempCalculation;
  };
  const ApplyPromo = () => {
    if (PromoInput === "RAHMANGG" && cartCount !== 0) {
      AppliedPromoHandler(true);
    }
  };
  const CartCheckout = () => {
    dispatch(Checkout());
    showAlertHandler(true);
    AppliedPromoHandler(false);
  };
  useEffect(() => {
    cartHandler(CalculateCartItems());
    TotalPriceHandler(CalculateTotal().toFixed(2));
  }, [cart, currentUser]);
  if (windowWidth <= 989) {
    return (
      <>
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
              <p className="font-bold">(Test Only) Successfully Purchased</p>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div id="summary" className="w-[100%] px-8">
            <button onClick={() => SummaryHandler(!OpenSummary)}>
              <div>
                <h1
                  className="font-semibold text-2xl border-b pb-8"
                  style={{ display: "inline-block" }}
                >
                  Order Summary
                </h1>
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  style={{ display: "inline-block" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </button>
            {OpenSummary && (
              <div>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Total Items Price
                  </span>
                  <span className="font-semibold text-sm">${TotalPrice}</span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - $15.00</option>
                  </select>
                </div>
                <div className="py-10">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code (TestCode:RahmanGG)
                  </label>
                  <input
                    onChange={(e) => PromoInputHandler(e.target.value)}
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm w-full"
                    value={PromoInput}
                  />
                </div>
                <button
                  className="bg-sky-950 hover:bg-sky-800 px-5 py-2 text-sm text-white uppercase"
                  onClick={ApplyPromo}
                >
                  Apply
                </button>
                <div className="border-t mt-8 mb-4">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    {AppliedPromo ? (
                      <>
                        <span>
                          <s>${TotalNDelivery}</s>
                        </span>
                        <span>${TotalNDelivery - 7.5}</span>
                      </>
                    ) : (
                      <span>${TotalNDelivery}</span>
                    )}
                  </div>
                  <button
                    className="bg-sky-400 font-semibold hover:bg-sky-500 py-3 text-sm text-white uppercase w-full"
                    onClick={() => (cartCount > 0 ? CartCheckout() : "")}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="w-[100%] bg-white px-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                {cartCount <= 1 ? (
                  <h2 className="font-semibold text-2xl">{cartCount} Item</h2>
                ) : (
                  <h2 className="font-semibold text-2xl">{cartCount} Items</h2>
                )}
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cart.map((c) => {
                return (
                  c.User.email === currentUser.email && (
                    <div
                      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                      key={c.ItemID}
                    >
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <img className="h-24" src={c.Item.image} alt="" />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {c.Item.title}
                          </span>
                          <span>
                            <button
                              className="font-semibold hover:text-red-500 text-gray-500 text-xs ml-3"
                              onClick={() => dispatch(RemoveFromCart(c.ItemID))}
                            >
                              Remove
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <button
                          type="button"
                          onClick={() => dispatch(DecrementCart(c.ItemID))}
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                        <input
                          className="mx-2 border text-center w-8"
                          type="text"
                          value={c.Quantity}
                          disabled
                        />
                        <button
                          type="button"
                          onClick={() => dispatch(IncrementCart(c.ItemID))}
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ${c.Item.price}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ${c.Sub.toFixed(2)}
                      </span>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
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
            <p className="font-bold">(Test Only) Successfully Purchased</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-3/4 bg-white px-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              {cartCount <= 1 ? (
                <h2 className="font-semibold text-2xl">{cartCount} Item</h2>
              ) : (
                <h2 className="font-semibold text-2xl">{cartCount} Items</h2>
              )}
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cart.map((c) => {
              return (
                c.User.email === currentUser.email && (
                  <div
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    key={c.ItemID}
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img className="h-24" src={c.Item.image} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {c.Item.title}
                        </span>
                        <span>
                          <button
                            className="font-semibold hover:text-red-500 text-gray-500 text-xs ml-3"
                            onClick={() => dispatch(RemoveFromCart(c.ItemID))}
                          >
                            Remove
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button
                        type="button"
                        onClick={() => dispatch(DecrementCart(c.ItemID))}
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={c.Quantity}
                        disabled
                      />
                      <button
                        type="button"
                        onClick={() => dispatch(IncrementCart(c.ItemID))}
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${c.Item.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${c.Sub.toFixed(2)}
                    </span>
                  </div>
                )
              );
            })}
          </div>

          <div id="summary" className="w-1/4 px-8">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Total Items Price
              </span>
              <span className="font-semibold text-sm">${TotalPrice}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $15.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code (TestCode:RahmanGG)
              </label>
              <input
                onChange={(e) => PromoInputHandler(e.target.value)}
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
                value={PromoInput}
              />
            </div>
            <button
              className="bg-sky-950 hover:bg-sky-800 px-5 py-2 text-sm text-white uppercase"
              onClick={ApplyPromo}
            >
              Apply
            </button>
            <div className="border-t mt-8 mb-4">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                {AppliedPromo ? (
                  <>
                    <span>
                      <s>${TotalNDelivery}</s>
                    </span>
                    <span>${TotalNDelivery - 7.5}</span>
                  </>
                ) : (
                  <span>${TotalNDelivery}</span>
                )}
              </div>
              <button
                className="bg-sky-400 font-semibold hover:bg-sky-500 py-3 text-sm text-white uppercase w-full"
                onClick={() => (cartCount > 0 ? CartCheckout() : "")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayCart;
