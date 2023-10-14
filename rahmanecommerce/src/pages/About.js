import buildingImage from "../assets/building.svg";
import { WidthContext } from "../App";
import { useContext, useEffect } from "react";
const About = () => {
  const { windowWidth } = useContext(WidthContext);
  if (windowWidth > 989) {
    return (
      <>
        <section className="grid grid-cols-2 gap-5 container mx-auto aboutSection">
          <AboutContent />
        </section>
      </>
    );
  }
  return (
    <section className="md:container md:mx-auto px-4">
      <SmallerABoutContent />
    </section>
  );
};
const SmallerABoutContent = () => {
  return (
    <>
      <div className="ml-10">
        <h1>Rahman</h1>
        <h1 className="blueBased">E-Commerce</h1>
        <p>
          Rahman E-Commerce is created by Muhammmad Akbar Rahman to showcase his
          skill using react application. This is his first project in building
          react app, which he uses react router, redux, and other react library.
        </p>
        <a href="https://www.linkedin.com/in/muhammad-akbar-rahman-8951a9127/">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            LinkedIn
          </button>
        </a>
        <a href="https://github.com/Rahman14-tech">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            GitHub
          </button>
        </a>
      </div>
    </>
  );
};
const AboutContent = () => {
  return (
    <>
      <img src={buildingImage} id="upperSectionImage" className="ml-20" />
      <div className="ml-20">
        <h1>Rahman</h1>
        <h1 className="blueBased">E-Commerce</h1>
        <p>
          Rahman E-Commerce is created by Muhammmad Akbar Rahman to showcase his
          skill using react application combine with tailwind css. This is his
          first project in building react app, which he uses react router,
          redux, and other react library. He taught himself react via youtube
          and build this app immediately after learning it. Also, this is his
          first time using tailwind CSS by reading docummentation available at
          the tailwind CSS website and other website.
        </p>
        <a href="https://www.linkedin.com/in/muhammad-akbar-rahman-8951a9127/">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            LinkedIn
          </button>
        </a>
        <a href="https://github.com/Rahman14-tech">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            GitHub
          </button>
        </a>
      </div>
    </>
  );
};

export default About;
