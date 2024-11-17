import { useEffect, useState } from 'react';
import axios from 'axios';
import Statistics from '../Statistics';
import BarChartComponent from '../BarChart';
import './index.css';

const months = [
  { name: "January" },
  { name: "February" },
  { name: "March" },
  { name: "April" },
  { name: "May" },
  { name: "June" },
  { name: "July" },
  { name: "August" },
  { name: "September" },
  { name: "October" },
  { name: "November" },
  { name: "December" },
];

const Transactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(months[2].name);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // New state to track total pages

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(`https://vijay-roxiler-2024.onrender.com/transactions?month=${selectedMonth}&page=${page}&search=${searchInput}&perPage=10`);
        if (response.data) {
          setTransactionList(response.data.transactions);
          setTotalPages(response.data.totalPages); // Assuming the API returns the total number of pages
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    getTransactions();
  }, [page, searchInput, selectedMonth]);

  return (
    <>
      <div className='main-container'>
        <div className='first-container'>
          <h3>Transaction Dashboard</h3>
        </div>
        <div className='second-container'>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='input-element'
            type="search"
            placeholder='Search transaction'
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className='dropdown-list'
          >
            {months.map((o) => (
              <option className='selector-element' key={o.name} value={o.name}>{o.name}</option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((o) => {
              const { category, description, id, image, price, sold, title } = o;
              return (
                <tr key={o.id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{description}</td>
                  <td>{price}</td>
                  <td>{category}</td>
                  <td>{sold}</td>
                  <td><img height={'100px'} className='product-image' src={image} alt="Product" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='last-container'>
          <p>Page No: {page}</p>
          <div>
            <button
              onClick={() => setPage(prevValue => Math.max(prevValue - 1, 1))}
              disabled={page === 1} // Disable previous if on the first page
              className='previous-button'
            >
              Previous
            </button>
            <button
              onClick={() => setPage(prevValue => Math.min(prevValue + 1, totalPages))}
              disabled={page === totalPages} // Disable next if on the last page
              className='next-button'
            >
              Next
            </button>
          </div>
          <p>Per Page: 10</p>
        </div>
        <div className='statistics-container'>
          {/* Statistics component here */}
        </div>
        <div className='line'>
          <hr />
        </div>
      </div>
      <Statistics selectedMonth={selectedMonth} />
      <BarChartComponent selectedMonth={selectedMonth} />
    </>
  );
};

export default Transactions;
