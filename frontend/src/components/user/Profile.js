import React from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const Profile = () => {
  const { loading, user } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container container-fluid">
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                  <img
                    className="rounded-circle img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkkVsRNVJ7O7xNGK7IXtRwchi4NsKzUUdPMMcmIdbDKH_x6DKXR2EQGWrBiM8KKga7Ey0&usqp=CAU"
                    alt=""
                  />
                </figure>
                <a
                  href="g"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  Edit Profile
                </a>
              </div>

              <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                <a href="r" className="btn btn-danger btn-block mt-5">
                  My Orders
                </a>

                <a href="r" className="btn btn-primary btn-block mt-3">
                  Change Password
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
