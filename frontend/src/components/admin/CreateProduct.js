import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newProduct } from "../../actions/prodcutActions";

const CreateProduct = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [seller, setSeller] = useState("");

  const categories = [
    // "Electronics",
    // "Cameras",
    // "Laptops",
    // "Accessories",
    // "Headphones",
    // "Food",
    // "Books",
    // "Clothes",
    // "Beauty",
    // "Sports",
    // "Outdoor",
    // "Home",
    "Kodomo",
    "Josei",
    "Seijin/Ero",
    "Action",
    "Rom-Com",
    "Thriller",
    "Adventure",
    "Comics adaptations",
    "Historical / Historical Fiction / Alternative Histories",
    "Horror",
    "Romance",
    "Shōnen-ai",
    "Shōjo-ai",
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    // formData.set("Stock", stock);
    formData.set("seller", seller);
    // formData.set("images", images);
    dispatch(newProduct(formData));
  };

  const { loading, error, product, success } = useSelector(
    (state) => state.createProduct
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (success) {
      alert.success("New Product successfully added");
      // navigate("/admin/products");
    }
  }, [alert, error, success, navigate]);

  return (
    <>
      <MetaData title={"Admin Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mt-5">
          <>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                encType="multipart/form-data"
                // onSubmit={submitHandler}
              >
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  onClick={submitHandler}
                >
                  CREATE
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
