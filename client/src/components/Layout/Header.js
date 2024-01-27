import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to={"/"} className="navbar-brand" id="brand">
            City<span id="brand2">Mart</span>🛒
          </Link>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c.id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to={"/login"}
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </div>
                </li>
              </>
            )}
            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <NavLink to={"/cart"} className="nav-link">
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
