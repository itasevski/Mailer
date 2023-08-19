import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoSignIn, GoSignOut, GoSync } from "react-icons/go";
import PaymentForm from "./PaymentForm";

const Header = () => {
  const { user, isLoading, error } = useSelector((state: any) => state.auth);

  let authOption;
  if (isLoading)
    authOption = (
      <li key="sync">
        <button className="btn btn-danger">
          <GoSync className="animate-spin" />
        </button>
      </li>
    );
  else if (user)
    authOption = [
      <li key="credits" className="font-bold text-xs sm:text-base">
        Credits: {user.credits}
      </li>,
      <li
        key="paymentFormSmAbove"
        style={{ margin: "0 10px" }}
        className="hidden sm:block text-xs sm:text-base"
      >
        <PaymentForm smAbove={true} />
      </li>,
      <li
        key="paymentFormSmBelow"
        style={{ margin: "0 10px" }}
        className="block sm:hidden text-xs sm:text-base"
      >
        <PaymentForm />
      </li>,
      <a
        key="logoutSmAbove"
        href="/api/logout"
        className="hidden sm:block text-xs sm:text-base btn btn-danger"
      >
        Logout
      </a>,
      <a
        key="logoutSmBelow"
        href="/api/logout"
        className="block sm:hidden text-xs sm:text-base btn btn-danger"
      >
        <GoSignOut />
      </a>,
    ];
  else if (error)
    authOption = <li className="text-white text-base sm:text-2xl">{error}</li>;
  else
    authOption = [
      <li key="loginSmAbove">
        <a
          href="/auth/google"
          className="hidden sm:block btn btn-danger text-xs sm:text-base"
        >
          Login
        </a>
      </li>,
      <li key="loginSmBelow">
        <a
          href="/auth/google"
          className="block sm:hidden btn btn-danger text-xs sm:text-base"
        >
          <GoSignIn />
        </a>
      </li>,
    ];

  return (
    <nav className="bg-red-500">
      <div className="flex items-center justify-between mx-auto p-4">
        <Link
          to={`${!user ? "/" : "/dashboard"}`}
          className="text-3xl font-bold text-white"
        >
          Mailer
        </Link>
        <ul className="flex items-center justify-between">{authOption}</ul>
      </div>
    </nav>
  );
};

export default Header;
