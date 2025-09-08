import { Link } from "react-router-dom";
import classNames from "classnames"
import { themeColors } from "../constants/classes";

function PageNotFound() {

  return (
    <div className={`flex flex-col h-full flex-grow items-center justify-center`}>
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-center px-4">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-indigo-600 rounded-2xl shadow-md hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;