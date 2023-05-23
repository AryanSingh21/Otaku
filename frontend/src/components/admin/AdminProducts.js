import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getallAdminProduct,
} from "../../actions/prodcutActions";

const AdminProducts = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);
  const { isDeleted } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isDeleted) {
      alert.success("Product is successfully deleted");
      navigate("/admin/products");
    }
    dispatch(getallAdminProduct());
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products &&
      products.forEach((product) => {
        data.rows.push({
          id: product._id,
          name: product.name,
          price: `$${product.price}`,
          stock: product.Stock,
          actions: (
            <>
              <Link
                to={`/admin/products/${product._id}`}
                className="btn btn-primary"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger ml-2"
                onClick={() => deleteHandler(product._id)}
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
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
