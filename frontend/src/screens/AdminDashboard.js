import './AdminDash.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getproducts as listProducts, deleteProductAction, addProduct } from '../redux/actions/productAction';

const AdminDashboard = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    imageUrl: '',
    category: '',
    description: '',
    countInStock: 0,
    currency: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 10; // Number of items per page

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      setNewProduct({ ...newProduct, imageUrl: response.data.url }); // Use the URL from the backend
    } catch (error) {
      setMessage('Failed to upload file.');
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();

    if (!newProduct.imageUrl) {
      setMessage('Please upload an image before adding the product.');
      return;
    }

    try {
      dispatch(addProduct(newProduct));
      setMessage('Product added successfully!');
      setNewProduct({
        name: '',
        price: 0,
        imageUrl: '',
        category: '',
        description: '',
        countInStock: 0,
        currency: '',
      });
      dispatch(listProducts(currentPage, itemsPerPage));
    } catch (error) {
      setMessage('Failed to add product.');
    }
  };

  const deleteProductHandler = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) {
      setMessage('Product deletion cancelled.');
      return;
    }

    try {
      await dispatch(deleteProductAction(id));
      setMessage('Product deleted successfully!');
      dispatch(listProducts(currentPage, itemsPerPage));
    } catch (error) {
      setMessage('Failed to delete product.');
    }
  };

  const handleCategorySelect = (e) => {
    setNewProduct({ ...newProduct, category: e.target.value });
  };

  const handleCurrencySelect = (e) => {
    setNewProduct({ ...newProduct, currency: e.target.value });
  };

  useEffect(() => {
    dispatch(listProducts(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

  const totalPages = Math.ceil((products?.total || 0) / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="homescreen">
      <h1 className="text-center">Admin Dashboard</h1>

      <form>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add Product</h2>
          <div className="flex space-x-4">
            <select value={newProduct.category} onChange={handleCategorySelect}>
              <option value="">Select a Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity in Stock"
              value={newProduct.countInStock || ''}
              onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
            />
            <input type="file" onChange={handleFileChange} />
            <button type="button" onClick={handleUpload}>
              Upload
            </button>
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description || ''}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <select value={newProduct.currency} onChange={handleCurrencySelect}>
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NGN">NGN</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button onClick={addProductHandler}>Add</button>
          </div>
        </div>
      </form>

      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>CountInStock</th>
            <th>Price</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.products?.map((product) => (
            <tr key={product._id}>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>{product.countInStock}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => deleteProductHandler(product._id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => navigate(`/admin/edit/${product._id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
