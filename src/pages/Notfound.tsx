import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <section className="flex items-center min-h-screen bg-slate-100/80 dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center">
            <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl dark:text-white">
              Kechirasiz, ushbu sahifa topilmadi.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Kechirasiz, biz bu sahifani topa olmadik.{" "}
            </p>
            <NavLink
              to="/"
              className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-base px-5 py-2.5 text-center my-4"
            >
              Bosh sahifaga qaytish
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
