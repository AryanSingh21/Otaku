import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadAllUser } from "../../actions/userActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const AllUsers = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error: AdminUserError,
    users,
  } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUser
  );

  useEffect(() => {
    if (AdminUserError) {
      alert.error(AdminUserError);
    }
    if (deleteError) {
      alert.error(deleteError);
    }
    if (isDeleted) {
      alert.success("User is successfully deleted");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(loadAllUser());
  }, [dispatch, alert, AdminUserError, deleteError, isDeleted]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
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
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: `${user.email}`,
          role: user.role,
          actions: (
            <>
              <Link
                to={`/admin/products/${user._id}`}
                className="btn btn-primary"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger ml-2"
                onClick={() => deleteHandler(user._id)}
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
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mt-5">
          <>
            <h1 className="mb-3">All Users</h1>
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

export default AllUsers;
