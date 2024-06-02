import React, { useContext } from 'react';
import { ProductsContext } from '../context/CartContextProduct.jsx';
import ProductCard from './ProductCard.jsx';

const ProductGrid = () => {
    const { products, error } = useContext(ProductsContext);
    console.log(products);
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <section
                id="Projects"
                className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        imageUrl={product.product_pic}
                        brand={product.product_brand}
                        productName={product.product_name}
                        price={product.product_price}
                        originalPrice={product.product_Price}
                    />
                ))}
            </section>
            <script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            kofiWidgetOverlay.draw('mohamedghulam', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text': 'Support me',
              'floating-chat.donateButton.background-color': '#323842',
              'floating-chat.donateButton.text-color': '#fff'
            });
          `,
                }}
            />
        </div>
    );
};

export default ProductGrid;
