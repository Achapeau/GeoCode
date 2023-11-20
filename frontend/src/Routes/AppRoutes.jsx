import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import StationList from "../pages/StationList";
import ProfilPage from "../pages/ProfilPage";
import ProfilDetailsPage from "../pages/ProfilDetailsPage";
import FavoriteStationList from "../pages/FavoriteStationList";
import ContacUsPage from "../pages/ContacUsPage";
import AdminPage from "../pages/AdminPage";
import ManageStations from "../pages/ManageStations";
import ManageUsers from "../pages/ManageUsers";
import ManageVehicule from "../pages/ManageVehicule";
import ProtectedRoute from "../components/ProtectedRoute";
import ReservationPage from "../pages/ReservationPage";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import NavBarAdminTop from "../components/adminSide/NavBarAdminTop";

function AppRoutes() {
  const { user } = useCurrentUserContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<StationList />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/favourites" element={<FavoriteStationList />} />
      <Route path="/profil" element={<ProfilPage />} />
      <Route path="/profil/details" element={<ProfilDetailsPage />} />
      <Route path="/contact-us" element={<ContacUsPage />} />

      <Route
        element={
          <ProtectedRoute
            isAllowed={user?.roles?.includes("admin")}
            redirectPath="/"
          />
        }
      >
        <Route
          path="/admin"
          element={
            <>
              <NavBarAdminTop />
              <AdminPage />
            </>
          }
        />
        <Route
          path="/admin/bornes"
          element={
            <>
              <NavBarAdminTop />
              <ManageStations />{" "}
            </>
          }
        />
        <Route
          path="/admin/users"
          element={
            <>
              <NavBarAdminTop />
              <ManageUsers />{" "}
            </>
          }
        />
        <Route
          path="/admin/vehicule"
          element={
            <>
              <NavBarAdminTop />
              <ManageVehicule />{" "}
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
