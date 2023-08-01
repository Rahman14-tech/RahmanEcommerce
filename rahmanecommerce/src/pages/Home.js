import upperImage from "../assets/shopping.svg";
import { WidthContext } from "../App";
import { useContext, useEffect } from "react";
import { topThree } from "../features/products/products";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
const Home = () => {
  const { windowWidth } = useContext(WidthContext);
  const dispatch = useDispatch();
  const { filteredItems, productItems } = useSelector(
    (store) => store.products
  );
  useEffect(() => {
    dispatch(topThree());
  }, []);
  if (windowWidth > 989) {
    return (
      <>
        <section className="grid grid-cols-2 gap-5 container mx-auto homeSection">
          <HomeContent />
        </section>
        <FeaturedProduct
          filteredItems={filteredItems}
          windowWidth={windowWidth}
        />
      </>
    );
  }
  return (
    <section className="gap-5">
      <SmallerContent />
      <FeaturedProduct
        filteredItems={filteredItems}
        windowWidth={windowWidth}
      />
    </section>
  );
};

const SmallerContent = () => {
  return (
    <>
      <div className="ml-10 pb-10">
        <h1>Rahman</h1>
        <h1 className="blueBased">E-Commerce</h1>
        <p>
          Rahman E-Commerce is a top-notch digital marketplace that offers a
          wide range of quality products at affordable prices. With its
          easy-to-use interface, secure payment gateway, and exceptional
          customer service, Rahman E-Commerce provides a hassle-free and
          enjoyable shopping experience for customers worldwide.
        </p>
        <Link to="/products">
          <button type="button" className="shopButton">
            <span>SHOP NOW</span>
          </button>
        </Link>
      </div>
    </>
  );
};
const HomeContent = () => {
  return (
    <>
      <div className="ml-20">
        <h1>Rahman</h1>
        <h1 className="blueBased">E-Commerce</h1>
        <p>
          Rahman E-Commerce is a top-notch digital marketplace that offers a
          wide range of quality products at affordable prices. With its
          easy-to-use interface, secure payment gateway, and exceptional
          customer service, Rahman E-Commerce provides a hassle-free and
          enjoyable shopping experience for customers worldwide.
        </p>
        <Link to="/products">
          <button type="button" className="shopButton">
            <span>SHOP NOW</span>
          </button>
        </Link>
      </div>
      <img src={upperImage} id="upperSectionImage" className="ml-20" />
    </>
  );
};
const FeaturedProduct = ({ filteredItems, windowWidth }) => {
  return (
    <section
      className={
        windowWidth > 989
          ? "sectionPadding grayish featuredProductsSection"
          : "sectionPadding grayish featuredProductsSection"
      }
    >
      <div className="textalignCenter">
        <h2>Popular Products</h2>
        <div className="underline"></div>
      </div>
      <div
        className={
          windowWidth > 989
            ? "flex justify-evenly productContent pl-[7%]"
            : "productContent grid grid-cols-1 gap-4 ml-[27%] w-[70%] mt-5"
        }
      >
        {filteredItems.slice(0, 3).map((product) => {
          return (
            <Link to={`/Product/${product.id}`} key={product.id}>
              <div>
                <div className="w-2/3 max-w-sm bg-white border border-white-200 rounded-lg shadow">
                  <img
                    className="p-10 rounded-t-lg top popularItems"
                    src={product.image}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-md font-semibold text-gray-900 dark:text-dark">
                      {product.title}
                    </h5>
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
                        <span className="text-sm font-medium dark:text-dark">
                          {product.rating.count} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/products">
        <div className="flex justify-center productContent">
          <button type="button" className="allProductsButton">
            <span>All Products</span>
          </button>
        </div>
      </Link>
    </section>
  );
};

export default Home;
