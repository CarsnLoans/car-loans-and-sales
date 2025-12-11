import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/CLS-Logo-F.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  // const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="container-fluid">
      <div className="row text-white bg-dark py-2 px-2">
        <div className="col-9">
          New Car Loan | Used Car Loan | Refinance | Loan Transfer
        </div>
        <div className="col-3">Give a missed call +91 86605 16762</div>
      </div>

      {/* Navbar */}

      <div className="row">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img className="logo" src={logo} alt="Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto fw-semibold">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/benefits_for_you"
                  >
                    Benefits for you
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/eligibility"
                  >
                    Eligibility
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/interestRate"
                  >
                    Interest Rates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/EMI">
                    EMI Calculator
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="https://www.facebook.com/carloansandsales/" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="https://www.instagram.com/carloansandsales/?hl=en" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </Link>
                </li>
                {/* {isAuthenticated && (
                  <li className="nav-item">
                    <p className="nav-link active my-0">{user.name}</p>
                  </li>
                )} */}

                {/* {isAuthenticated ? (
                  <li className="nav-item">
                    <button
                      className=" btn btn-outline-danger ms-2"
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      Log out
                    </button>
                  </li>
                ) : (
                  <li className="nav-item">
                    <button
                      className=" btn btn-outline-danger ms-2"
                      onClick={() => loginWithRedirect()}
                    >
                      Log In
                    </button>
                  </li>
                )} */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
