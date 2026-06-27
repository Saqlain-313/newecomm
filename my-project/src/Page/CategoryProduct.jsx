import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../redux/productSlice";

const CategoryProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { products = [], loading } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getProductByCategory(id));
    }, [dispatch, id]);

    console.log(products);

    return (
        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Category Products
            </h1>

            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {products?.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-60 object-cover rounded"
                            />

                            <h2 className="mt-2 font-semibold">
                                {product.name}
                            </h2>

                            <p className="text-green-600">
                                ₹{product.price}
                            </p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default CategoryProduct;