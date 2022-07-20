import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemsCount, onPageChange, pageSize, currentPage } = this.props;
    const PageCount = Math.ceil(itemsCount / pageSize);
    if (PageCount === 1) return null;
    const pages = _.range(1, PageCount + 1);
    return (
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item "}
          >
            <span
              onClick={() => onPageChange(page)}
              className="page-link"
              href="#"
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
