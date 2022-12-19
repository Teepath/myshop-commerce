import './HomeScreen.css';
import Product from "../components/Product";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { getproducts as listProducts} from '../redux/actions/productAction';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProducts);

    useEffect(() => {
      dispatch(listProducts())
    }, [dispatch])

    const { products, loading, error } = getProducts;
    return (
        <div className="homescreen">
            <h2 className="homescreen__title"> Latest Products</h2>
            <div className="homescreen__products">
                {
                    loading ? (
                        <h2> Loading....</h2>
                    ) : error ? (
                            <h2> {error}</h2>
                        ) : (
                                products.map((product) => (
                                    <Product productId={product._id} key={product._id}
                                        imageUrl={product.imageUrl} price={product.price}
                                        description={product.description} name={ product.name}
                                    />
                                ))
                    )
               }
            </div>
        </div>
    )
}

export default HomeScreen
