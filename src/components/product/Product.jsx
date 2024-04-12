import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './product.module.css'


const Product = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/product`
                );
                setProducts(response?.data?.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, []);

    const firstMapProducts = products.slice(0, products.length - 1);

    return (
        <div>
            {firstMapProducts.map((product, index) => (
                <div key={index}>
                    <div className={`${style.maindiv}`}>
                        <div
                            className={`${style.imgsection}`}>
                            <div className={style.imagegradient}></div>
                            <img
                                className={style.singleproimg}
                                src={`${process.env.REACT_APP_BASE_URL}/${product?.productImage}`}
                                alt='product'
                            />
                            <div className={style.contentbox}>
                                <h1 className={style.imgheadingfont}>{product?.productTitle}</h1>
                                <h1 className={style.imgcontent}>View Project</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Product
