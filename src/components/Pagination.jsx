
import './Pagination.css'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

 const getPaginationItems = () => {
 
  if (totalPages <= 7) {
    return pageNumbers; 
  }

  if(currentPage == 1){
     return [1, 2, '...', totalPages];
  }

  
  if (currentPage < 3) {
    return [1, 2, 3, '...', totalPages];
  }
  if(currentPage==3){
    return [1,  currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }
  
  if (currentPage > totalPages - 4) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
  const paginationItems = getPaginationItems();

    return (
    <nav>
      <ul className='pagination'>
        
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage - 1)} className='page-link'>
            <FaAngleLeft/>

          </button>
        </li>

       
        {paginationItems.map((number, index) => {
          if (number === '...') {
            return <li key={index} className='page-item disabled'><span className='page-link'>...</span></li>;
          }
          return (
            <li key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
            </li>
          );
        })}

       
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage + 1)} className='page-link'>
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;