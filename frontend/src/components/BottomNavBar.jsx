import { NavLink } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import Map from "../assets/images/Map.png";
import List from "../assets/images/List.png";
import cart from "../assets/images/cart.png";
import admin from "../assets/images/Admin.png";

function BottomNavBar() {
  const { user } = useCurrentUserContext();
  return (
    <div className="btm-nav bg-blue z-50 inset-x-0 bottom-0 h-[10vh] lg:hidden ">
      <NavLink to="/" className="bg-inherit">
        {({ isActive }) => (
          <button type="button" className={isActive ? "border-t-2 pt-1 " : ""}>
            <img src={Map} alt="map-icon" />
          </button>
        )}
      </NavLink>
      <NavLink to="/list" className="bg-inherit">
        {({ isActive }) => (
          <button type="button" className={isActive ? "border-t-2 pt-1 " : ""}>
            <img src={List} alt="list-icon" />
          </button>
        )}
      </NavLink>
      {user && (
        <NavLink to="/favourites" className="bg-inherit">
          {({ isActive }) => (
            <button type="button" className={isActive ? "border-t-2 pt-2" : ""}>
              <svg
                width="35px"
                height="35px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                color="#E5E9E7"
                fill="none"
              >
                <path
                  d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
                  stroke="#E5E9E7"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </NavLink>
      )}
      {user && (
        <NavLink to="/reservation" className="bg-inherit">
          {({ isActive }) => (
            <button
              type="button"
              className={isActive ? "border-t-2 pt-1 " : ""}
            >
              <img src={cart} alt="cart-icon" />
            </button>
          )}
        </NavLink>
      )}
      {user && user.roles === "admin" && (
        <NavLink to="/admin" className="bg-inherit">
          {({ isActive }) => (
            <button
              type="button"
              className={isActive ? "border-t-2 pt-1 " : ""}
            >
              <img src={admin} alt="admin-icon" />
            </button>
          )}
        </NavLink>
      )}
    </div>
  );
}

export default BottomNavBar;
