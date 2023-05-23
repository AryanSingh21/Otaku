import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allReview, deleteReview } from "../../actions/prodcutActions";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstants";

const AllReviews = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, reviews } = useSelector((state) => state.allReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(allReview(productId));
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    // }
    if (deleteError) {
      alert.error(deleteError);
    }
    if (isDeleted) {
      alert.success("Review successfully deleted");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    if (productId !== "") {
      dispatch(allReview(productId));
    }
  }, [dispatch, alert, error, productId, deleteError, isDeleted]);

  const deleteHandler = (productId, id) => {
    dispatch(deleteReview(productId, id));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: `${review.comment}`,
          user: review.name,
          actions: (
            <>
              <button
                className="btn btn-danger ml-2"
                onClick={() => deleteHandler(productId, review._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <MetaData title={"Admin Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mt-5">
          <>
            <h1 className="mb-3">All Products</h1>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                    onSubmit={submitHandler}
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <>
                <p className="mt-5 text-center">No reviews</p>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default AllReviews;
