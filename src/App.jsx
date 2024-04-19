import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
// import Spinner from "./components/Spinner";
// import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Formm from "./components/Form";
import MyContext from "./context/MyContext";
import { Logincontext } from "./context/Logincontext";
import CheckLogin from "./components/CheckLogin";

function App() {
  return (
    <MyContext>
      <Logincontext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route
              path="app"
              element={
                <CheckLogin>
                  <AppLayout />
                </CheckLogin>
              }
            >
              <Route index element={<Navigate replace to={"cities"} />}></Route>
              <Route path="cities" element={<CityList />}></Route>
              <Route path="countries" element={<CountryList />}></Route>
              <Route path="cities/:id" element={<City />}></Route>
              <Route path="form" element={<Formm />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Logincontext>
    </MyContext>
  );
}

export default App;
