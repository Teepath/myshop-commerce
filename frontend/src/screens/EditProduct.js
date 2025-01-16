
import './AdminDash.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch,} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {updateProductAction, getProductDetails} from '../redux/actions/productAction'

function EditProduct() {
    const [file, setFile] = useState(null);

    const [message, setMessage] = useState('');
    const params = useParams().id
    const getProducts = useSelector((state) => state.getProducts);
    // const product = getProducts.find(p => p._id === params);
    const { loading, error, product } = getProducts;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({ name: '', price: 0, imageUrl: '', category:'', description: '', countInStock: 0, currency: '' });


  console.log(newProduct, 'pr')
  console.log(params)
    useEffect(() =>{
      dispatch(getProductDetails(params))
      if(product){
        setNewProduct(product);
      }
      
    
    },[dispatch])
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
          console.log('File uploaded:', response.data.url);
          setMessage('File uploaded successfully!');
          setNewProduct({ ...newProduct, imageUrl: response.data.url }); // Use the URL from the backend
        } catch (error) {
          console.error('Error uploading file:', error);
          setMessage('Failed to upload file.');
        }
      };

      const updateProductHandler = async (e) => {
        e.preventDefault();
    
        // if (!newProduct.imageUrl && product.imageUrl) {
        //   setMessage('Please upload an image before adding the product.');
        //   return;
        // }
    
        try {
          // const response = await axios.post('http://localhost:5000/api/products', newProduct, {
          //   headers: { 'Content-Type': 'application/json' },
          // });

          const toSend = {
            name: newProduct.name?newProduct.name:product?.name,
            _id:params,
            price: newProduct.price?newProduct.price:product.price,
            imageUrl: newProduct.imageUrl?newProduct.imageUrl:product.imageUrl,
            category: newProduct.category?newProduct.category:product.category,
            description: newProduct.description?newProduct.description:product.description,
            countInStock: newProduct.countInStock?newProduct.countInStock:product.countInStock,
            currency: newProduct.currency?newProduct.currency:product.currency,
          }

          console.log(toSend, 'tosend')
          dispatch(updateProductAction(toSend));
          setMessage('Product added successfully!');
        //   setNewProduct({ name: '', price: 0, imageUrl: '', category: '', description: '', countInStock: 0, currency: '' });
        //   dispatch(listProducts());
        } catch (error) {
          console.error('Error adding product:', error);
          setMessage('Failed to add product.');
        }
      };


      
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

    const handleCurrencySelect = (e) => {
        setNewProduct({ ...newProduct, currency: e.target.value });
      };

      const handleCategorySelect = (e) => {
        setNewProduct({ ...newProduct, category: e.target.value });
      };


  
  return (
    <form>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add Product</h2>
      <div className="flex space-x-4">
        <select value={newProduct.category?newProduct.category:product?.category} onChange={handleCategorySelect}>
          <option value={newProduct?.category?newProduct.category:""}>Select a Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name?newProduct.name:product?.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity in Stock"
          value={newProduct.countInStock?newProduct.countInStock:product?.countInStock}
          onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description?newProduct.description:product?.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <select value={newProduct.currency?newProduct.currency:product?.currency} onChange={handleCurrencySelect}>
          <option value="">Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="NGN">NGN</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price?newProduct.price:product?.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={ updateProductHandler}>{loading?"Loading...":"Update"}</button>
      </div>
    </div>
  </form>
  )
}

export default EditProduct