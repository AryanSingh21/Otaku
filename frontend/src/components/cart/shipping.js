import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const countryList = Object.keys(countries);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Error, setError] = useState("");

  const validate = () => {
    if (address === "" || city === "" || phoneNo === "") {
      setError("Please fill the form");
      return false;
    } else {
      return true;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      dispatch(
        saveShippingInfo({ address, city, postalCode, phoneNo, country })
      );
      console.log(shippingInfo.address);
      navigate("/ConfirmOrder");
    }
  };

  return (
    <>
      <CheckoutSteps step="shipping" />
      <div className="row wrapper">
        <div
          className="col-10 col-lg-5"
          style={{ backgroundColor: "white", opacity: "80%" }}
        >
          <div style={{ color: "red" }}>{Error}</div>
          <form className="">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
              onClick={submitHandler}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
