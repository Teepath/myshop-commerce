import './ProductScreen.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

//Actions
import { getProductDetails } from '../redux/actions/productAction';
import { addToCart } from '../redux/actions/cartAction';

const ProductScreen = ({ match, history }) => {
    const params = useParams()
    const navigate = useNavigate()
    console.log(params.id)
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.getProductDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        if (product && params.id !== product?.data?._id) {
            dispatch(getProductDetails(params.id))
        }
    }, [dispatch])

    const handleCurrencySelect = (e) => {
        setQty(parseInt(e.target.value))
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product?._id, qty))
        navigate('cart')
    }

    console.log(product, 'imageurl')

    return (
        <div className="productscreen">

                {
                    loading ? (
                        <h2>Loading....</h2>
                    ) : 
                            error ?( <h2> { error}</h2>
                    ):(
                            <>
                                         <div className="productscreen__left">
                <div className="left__image" >
                                        <img src={product?.imageUrl} alt={ product?.name}/>
                </div>
                <div className="left__info">
                    <p className="left__name"> {product?.name}</p>
                    <p className="left__name"> Price:{product?.price}</p>
                                        <p> Description:{ product?.description}</p>
            </div>
            </div>

            <div className="productscreen__right">
                <div className="right__info">
                    <p>
                                            Price:<span> { product?.price}</span>
                    </p>
                    <p>
                                            Status: <span> {product?.countInStock > 0? "In Stock": "Out of Stock"}</span>
                    </p>
                    <p>
                        Qty   <select onChange={handleCurrencySelect} >
                                                {[...Array(product?.countInStock).keys()].map((x) => (
                           <option key={x+1} value={x+1}> {x +1} </option>
                                                ))}
                        </select>
                      
                    </p>
                    <p>  <button onClick={addToCartHandler}> Add to the Cart</button></p>
                  

                   
            </div>
            </div>
                    
                    </>
                    )
                }
               
      
        </div>
    )
}

export default ProductScreen