import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const res = await axios.get("http://206.81.13.94/api/listings/?page=1");
        console.log("these are the results======", res.data.results);
        setListings(res.data.results);
        setCount(res.data.count);
        setPrevious(res.data.previous);
        setNext(res.data.next);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const displayListings = () => {
    const display = [];
    const result = [];

    listings.map((listing) =>
      display.push(
        <Card
          title={listing.title}
          address={listing.address}
          city={listing.city}
          state={listing.state}
          price={listing.price}
          sale_type={listing.sale_type}
          home_type={listing.home_type}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          sqft={listing.sqft}
          photo_main={listing.photo_main}
          slug={listing.slug}
          key={listing.slug}
        ></Card>
      )
    );
    for (let i = 0; i < listings.length; i += 3) {
      result.push(
        <div key={i} className="row">
          <div className="col-1-of-3">{display[i]}</div>
          <div className="col-1-of-3">
            {display[i + 1] ? display[i + 1] : null}
          </div>
          <div className="col-1-of-3">
            {display[i + 2] ? display[i + 2] : null}
          </div>
        </div>
      );
    }
    return result;
  };
  const visitPage = (page) => {
    axios
      .get(`http://206.81.13.94/api/listings/?page=${page}`)
      .then((res) => {
        setListings(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        setActive(page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousNumber = () => {
    axios
      .get(previous)
      .then((res) => {
        setListings(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        if (previous) {
          setActive(active - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextNumber = () => {
    axios
      .get(next)
      .then((res) => {
        setListings(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        if (next) {
          setActive(active + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="listings">
      <Helmet>
        <title>Realest Estate - Listings</title>
        <meta name="description" content="Listings Page"></meta>
      </Helmet>
      <section className="listings__listings">{displayListings()}</section>
      <section className="listings__pagination">
        <div className="row">
          <Pagination
            itemsPerPage={3}
            count={count}
            visitPage={visitPage}
            previous={previousNumber}
            next={nextNumber}
            active={active}
            setActive={setActive}
          ></Pagination>
        </div>
      </section>
    </main>
  );
};

export default Listings;
