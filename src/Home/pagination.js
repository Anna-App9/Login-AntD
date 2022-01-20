import React from "react";

const Paging = ({ perPage, totalNews }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.map((number) => {
        return(
          <Pagination
        <li key={number} className="page-item">
          <a href="!#" className="page-link">
            {number}
          </a>
        </li>
        )
}
      )}
    </nav>
  );
};

export default Paging;
