import { React, useEffect } from "react";
import { getProducts } from "../actions/prodcutActions";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  // const categories = [
  //   "Electronics",
  //   "Cameras",
  //   "Laptops",
  //   "Accessories",
  //   "Headphones",
  //   "Food",
  //   "Books",
  //   "Clothes",
  //   "Beauty",
  //   "Sports",
  //   "Outdoor",
  //   "Home",
  // ];
  const categories = [
    // "Electronics",
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

  const alert = useAlert();

  let { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const params = useParams();
  const keyword = params.keyword;
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage, keyword, category));
  }, [dispatch, alert, error, currentPage, keyword, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Otaku"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    {categories.map((category) => (
                      <ul key={category} className="pl-0">
                        <li
                          style={{ listStyleType: "none", cursor: "pointer" }}
                          onClick={() => setCategory({ category })}
                        >
                          {category}
                        </li>
                      </ul>
                    ))}
                  </div>
                  <div className="col-6 col-md-9 ">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product key={product._id} product={product} />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </>
              )}
            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
