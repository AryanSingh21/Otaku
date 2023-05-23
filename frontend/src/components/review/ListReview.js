import React from "react";

const ListReview = (params) => {
  return (
    <>
      <h3>Other's Reviews:</h3>
      {params.reviews &&
        params.reviews.map((rev) => (
          <div className="container container-fluid ">
            <div className="reviews w-75">
              <hr />
              <div className="review-card my-3">
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(rev.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="review_user">by {rev.name}</p>
                <p className="review_comment">{rev.comment}</p>

                <hr />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListReview;
