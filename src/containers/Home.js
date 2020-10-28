import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ListingForm from "../components/ListingForm";
import Listings from "../components/Listings";
import Pagination from "../components/Pagination";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(3);
  const [activePage, setActivePage] = useState(1);
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const visitPage = (page) => {
    setCurrentPage(page);
    setActivePage(page);
  };

  const previousNumber = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActivePage(currentPage - 1);
    }
  };
  const nextNumber = () => {
    if (currentPage !== Math.ceil(listings.length / 3)) {
      setCurrentPage(currentPage + 1);
      setActivePage(currentPage + 1);
    }
  };
  return (
    <main className="home">
      <Helmet>
        <title>Realest Estate - Home</title>
        <meta name="description" content="Realsest Estate Home Page"></meta>
      </Helmet>
      <section className="home__form">
        <ListingForm setListings={setListings}></ListingForm>
      </section>
      <section className="home__listing">
        <Listings listings={currentListings}></Listings>
      </section>
      <section className="home__pagination">
        <div className="row">
          {listings.length !== 0 ? (
            <Pagination
              itemsPerPage={listingsPerPage}
              count={listings.length}
              visitPage={visitPage}
              previous={previousNumber}
              next={nextNumber}
              active={activePage}
              setActive={setActivePage}
            ></Pagination>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Home;
