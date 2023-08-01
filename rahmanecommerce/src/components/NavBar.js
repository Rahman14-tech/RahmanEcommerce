import { NavLink, Link } from "react-router-dom";
import RELogo from "../assets/rahmanEcommerceLogo.png";
import { useSelector } from "react-redux";
import { WidthContext } from "../App";
import { useEffect, useState, useContext } from "react";
const NavBar = () => {
  const { windowWidth } = useContext(WidthContext);
  const [HamExpand, HamExpandHandler] = useState(false);
  const [tempTotalCart, TotalCartHandler] = useState(0);
  const { currentUser, cart } = useSelector((store) => store.user);
  const CalculateCartItems = () => {
    let tempCalculation = 0;
    for (let i = 0; i < cart.length; i++) {
      if (currentUser.email === cart[i].User.email) {
        tempCalculation += 1;
      }
    }
    return tempCalculation;
  };
  useEffect(() => {
    TotalCartHandler(CalculateCartItems());
  }, [cart, currentUser]);
  if (windowWidth <= 989) {
    return (
      <nav className="border-white-200 bg-white-50 dark:bg-white-800 dark:border-white-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img
              src={RELogo}
              className="h-10"
              alt="Rahman E-Commerce Logo"
            ></img>
          </a>
          <button
            data-collapse-toggle="navbarHam"
            type="button"
            onClick={() => HamExpandHandler(!HamExpand)}
            className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:text-sky-400 dark:hover:bg-sky-700 dark:focus:ring-sky-600"
            aria-controls="navbarHam"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={HamExpand ? "w-full" : "hidden w-full"}
            id="navbarHam"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-white-50 dark:bg-white-800 dark:border-white-700">
              <NavLink to="/">
                <li className="block py-2 pl-3 pr-4 grayish rounded hover:bg-sky-100 dark:hover:bg-dark-700 mt-3">
                  Home
                </li>
              </NavLink>
              <NavLink to="/about">
                <li className="block py-2 pl-3 pr-4 rounded hover:bg-sky-100 dark:hover:bg-dark-700 mt-3 grayish">
                  About
                </li>
              </NavLink>
              <NavLink to="/products">
                <li className="block py-2 pl-3 pr-4 rounded hover:bg-sky-100 dark:hover:bg-dark-700 mt-3 grayish">
                  Products
                </li>
              </NavLink>
              <NavLink to="/cart">
                <li className="block py-2 pl-3 pr-4 rounded hover:bg-sky-100 dark:hover:bg-dark-700 grayish">
                  <div className="mt-3">
                    Cart
                    <i
                      style={{ fontSize: 20, paddingLeft: 2, paddingRight: 10 }}
                      className="fa"
                    >
                      &#xf07a;
                    </i>
                  </div>
                </li>
              </NavLink>
              <NavLink to="/User" className={"mb-3"}>
                <li className="block py-2 pl-3 pr-4 rounded hover:bg-sky-100 dark:hover:bg-dark-700 mt-3 grayish">
                  {Object.keys(currentUser).length === 0 ? (
                    <span>
                      {" "}
                      Login
                      <i
                        style={{
                          fontSize: 20,
                          paddingLeft: 4,
                          paddingRight: 10,
                        }}
                        className="fa"
                      >
                        &#xf007;
                      </i>
                    </span>
                  ) : (
                    <span>
                      {" "}
                      Logout
                      <i
                        style={{
                          fontSize: 20,
                          paddingLeft: 4,
                          paddingRight: 10,
                        }}
                        className="fa"
                      >
                        &#xf007;
                      </i>
                    </span>
                  )}
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar grid grid-cols-3 gap-4 place-content-evenly mt-6">
      <img src={RELogo} id="RELOGO" alt="Rahman E-Commerce Logo"></img>
      <div className="grid grid-cols-3 gap-4 place-content-around blueish">
        <NavLink to="/" className="bottomHover">
          Home
        </NavLink>
        <NavLink to="/about" className="bottomHover">
          About
        </NavLink>
        <NavLink to="/products" className="bottomHover">
          Products
        </NavLink>
      </div>
      <div className="grid grid-cols-2 blueish">
        <NavLink to="/cart">
          Cart
          <i
            style={{ fontSize: 20, paddingLeft: 2, paddingRight: 10 }}
            className="fa"
          >
            &#xf07a;
          </i>
          <span className="cart-value">{tempTotalCart}</span>
        </NavLink>
        <NavLink to="/User">
          {Object.keys(currentUser).length === 0 ? (
            <span>
              {" "}
              Login
              <i
                style={{ fontSize: 20, paddingLeft: 2, paddingRight: 10 }}
                className="fa"
              >
                &#xf007;
              </i>
            </span>
          ) : (
            <span>
              {" "}
              Logout
              <i
                style={{ fontSize: 20, paddingLeft: 4, paddingRight: 10 }}
                className="fa"
              >
                &#xf007;
              </i>
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
export default NavBar;
