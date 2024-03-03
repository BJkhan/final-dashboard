import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Product from "./Product";

const MainProducts = () => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All category");
  const [sortBy, setSortBy] = useState("Latest added");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items to display per page

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Filtered and sorted products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter(
      (product) =>
        categoryFilter === "All category" || product.category === categoryFilter
    )
    .sort((a, b) => {
      if (sortBy === "Latest added") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "Cheap first") {
        return a.price - b.price;
      } else if (sortBy === "Most Sold") {
        return b.sold - a.sold;
      } else if (sortBy === "Most Reviewed") {
        return b.numReviews - a.numReviews;
      }
      return 0;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            {/* Search input */}
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            {/* Category filter */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All category">All category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Sort by */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most Sold</option>
                <option>Most Reviewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <div className="row">
                {/* Display current items */}
                {currentItems.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
              {/* Pagination */}
              <nav>
                <ul className="pagination justify-content-center">
                  {[...Array(Math.ceil(filteredProducts.length / itemsPerPage)).keys()].map((number) => (
                    <li key={number} className="page-item">
                      <button onClick={() => paginate(number + 1)} className="page-link">
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
