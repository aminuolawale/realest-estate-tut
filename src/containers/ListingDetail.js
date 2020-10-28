import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";

const ListingDetail = (props) => {
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});
  const [price, setPrice] = useState(0);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const slug = props.match.params.id;
    const config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };
    const url = `http://206.81.13.94/api/listings/${slug}/`;
    axios
      .get(url, config)
      .then((res) => {
        setListing(res.data);
        setPrice(numberWithCommas(res.data.price));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.id]);

  useEffect(() => {
    const id = listing.realtor;
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (id) {
      axios
        .get("http://206.81.13.94/api/realtors/" + id + "/", config)
        .then((res) => {
          setRealtor(res.data);
        });
    }
  }, [listing.realtor]);

  const displayInteriorImages = () => {
    const images = [];
    images.push(
      <div className="row" key={1}>
        <div className="col-1-of-3">
          {listing.photo_1 ? (
            <div className="listingdetail__display">
              <img
                className="listingdetail__display__image"
                src={listing.photo_1}
                alt="look at this image"
              ></img>
            </div>
          ) : null}
        </div>
      </div>
    );
    return images;
  };

  return (
    <div className="listingdetail">
      <Helmet>
        <title>Realest Estate - Listing | {`${listing.title}`}</title>
        <meta name="description" content="listing detail"></meta>
      </Helmet>
      <div className="listingdetail__header">
        <h1 className="listingmodel__title">{listing.title}</h1>
        <p className="listingdetail__location">
          {listing.city}, {listing.state}, {listing.zipcode}
        </p>
      </div>
      <div className="row">
        <div className="listingdetail__breadcrumb">
          <Link className="listingdetail__breadcrumb__link" to="/">
            Home
          </Link>{" "}
          / {listing.title}
        </div>
      </div>
      <div className="row">
        <div className="col-3-of-4">
          <div className="listingdetail__display">
            <img
              className="listingdetail__display__image"
              src={listing.photo_main}
              alt="this is the alt"
            ></img>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="listingdetail__display">
            <img
              className="listingdetail__display__image"
              src={realtor.photo}
              alt="this is the alt"
            ></img>
          </div>
          <h3 className="listingdetail__realtor">{realtor.name}</h3>
          <p className="listingdetail__contact">{realtor.phone}</p>
          <p className="listingdetail__contact">{realtor.email}</p>
          <p className="listingdetail__about">{realtor.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <ul className="listingdetail__list">
            <li className="listingdetail__list__item">
              Home Type: {listing.home_type}
            </li>
            <li className="listingdetail__list__item">Price: ${price}</li>
            <li className="listingdetail__list__item">
              Bedrooms: {listing.bedrooms}
            </li>
            <li className="listingdetail__list__item">
              Bathrooms: {listing.bathrooms}
            </li>
            <li className="listingdetail__list__item">
              Square Feet: {listing.sqft}
            </li>
          </ul>
        </div>
        <div className="col-1-of-2">
          <ul className="listingdetail__list">
            <li className="listingdetail__list__item">
              Sale Type: {listing.sale_type}
            </li>
            <li className="listingdetail__list__item">
              Address: ${listing.address}
            </li>
            <li className="listingdetail__list__item">City: {listing.city}</li>
            <li className="listingdetail__list__item">
              State: {listing.state}
            </li>
            <li className="listingdetail__list__item">
              Zip Code: {listing.zipcode}
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p className="listingdetail__description">{listing.description}</p>
      </div>
      {displayInteriorImages()}
    </div>
  );
};

export default ListingDetail;
