import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
// import Cart from "../cart/cart";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../actions/userActions";
import logo from "../../images/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user, error } = useSelector(
    (state) => state.user
  );
  const { productState } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const clicked = () => {
    navigate("/");
  };
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand" onClick={clicked}>
            <img
              src={logo}
              alt="logo"
              height="60"
              width="120"
              style={{ cursor: "pointer" }}
            />
            {/* <h1 style={{ color: "whitesmoke", cursor: "pointer" }}>Otaku</h1> */}
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart">
            <span id="cart" className="ml-3">
              Cart
            </span>
          </Link>
          <span className="ml-1" id="cart_count">
            {isAuthenticated ? <>{productState.length}</> : <>0</>}
          </span>
          {user ? (
            <div className="ml-4 d-inline dropdown">
              <Link
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{user.name}</span>
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropDownButton">
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
                {user.role !== "admin" ? (
                  <Link className="dropdown-item " to="/order/me">
                    Orders
                  </Link>
                ) : (
                  <Link className="dropdown-item " to="/dashboard">
                    Dashboard
                  </Link>
                )}

                <Link className="dropdown-item " to="/me">
                  Profile
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to={"/login"} className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
