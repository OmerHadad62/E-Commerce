import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the app element for accessibility

const ProductPage = () => {
    const location = useLocation();
    const { id } = location.state || {};  // Use 'id' from location state

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decreaseQuantity = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/products/getProduct/${id}`);
                setProduct(res.data.product);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching the product.');
                console.error(error);
            }
        };

        if (id) {
            getProduct();
        }
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 relative group">
                            <img className="w-full h-full object-cover" src={product.product_pic} alt="Product" />
                            <button
                                onClick={openModal}
                                className="absolute bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-full font-bold opacity-0 group-hover:opacity-75 hover:opacity-100 transition-opacity"
                            >
                                Enlarge Image
                            </button>
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-700">Add to Cart</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{product.product_name}</h2>
                        <div className="mt-8">
                            <div className="flex justify-between mb-4">
                                <div className="text-right">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                    <span className="text-2xl text-blue-600 dark:text-blue-400 font-bold ml-2">${product.product_price}</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                    <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                                </div>
                            </div>

                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{product.product_discription}</p>
                            </div>

                            <div className="mt-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Rating:</span>
                                <div className="flex items-center mt-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <svg key={i} className={`h-6 w-6 ${i < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Quantity:</span>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-l"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{quantity}</span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Enlarged Image"
                className="fixed inset-0 flex items-center justify-center p-4 z-50 transition-opacity duration-500"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40 transition-opacity duration-500"
            >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-4xl mx-auto relative animate-modal-open">
                    <button onClick={closeModal} className="absolute top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-700 z-50">
                        Close
                    </button>
                    <img className="w-full h-auto rounded-lg transition-transform duration-500 animate-image-open" src={product.product_pic} alt="Enlarged Product" />
                </div>
            </Modal>

            <style jsx>{`
                @keyframes openAnimation {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-modal-open {
                    animation: openAnimation 0.3s forwards;
                }
                .animate-image-open {
                    animation: openAnimation 0.3s forwards;
                }
            `}</style>
        </div>
    );
}

export default ProductPage;
