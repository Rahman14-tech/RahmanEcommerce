import { useState, useEffect } from "react";
import DisplayProducts from "../features/products/displayProducts";
import { useDispatch, useSelector } from "react-redux";
import { uniqueCategories, filterItems } from "../features/products/products";

const FilterComponent = () => {
  const [OptionVisibility, OptionHandler] = useState(false);
  const [ChoosenOption, ChooseHandler] = useState("AllPosts");
  const dispatch = useDispatch();
  const { distinctCategories } = useSelector((store) => store.products);
  const { currentUser } = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(uniqueCategories());
  }, []);
  return (
    <>
      <section>
        {Object.keys(currentUser).length === 0 && (
          <p className="mb-[0.4rem] text-red-500 text-xs pl-20">
            NOTE: Login first before buying
          </p>
        )}

        <h3 id="findDesire">Find your desire faster</h3>
        <div id="paddingUF">
          <div className="underlineFilter"></div>
        </div>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 leftMarginFilter"
          onClick={() => OptionHandler(!OptionVisibility)}
        >
          <i className="fa fa-filter"></i> Filter
        </button>

        <div className={OptionVisibility || "hideOption"}>
          <div className="mb-1.5 block min-h-[1.5rem] pl-[1.5rem] leftMarginFilter">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="flexRadioDefault"
              id="AllPosts"
              onChange={(e) => {
                ChooseHandler("AllPosts");
              }}
              checked={ChoosenOption === "AllPosts"}
            />
            <label
              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="AllPosts"
            >
              All Posts
            </label>
          </div>
          {distinctCategories.map((cat) => {
            return (
              <div
                className="mb-1.5 block min-h-[1.5rem] pl-[1.5rem] leftMarginFilter"
                key={cat}
              >
                <input
                  className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="flexRadioDefault"
                  id={cat}
                  onChange={(e) => {
                    ChooseHandler(cat);
                    dispatch(filterItems(cat));
                  }}
                  checked={ChoosenOption === cat}
                />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor={cat}
                >
                  {cat}
                </label>
              </div>
            );
          })}
        </div>
      </section>
      <DisplayProducts ChoosenOption={ChoosenOption} />
    </>
  );
};

export default FilterComponent;
