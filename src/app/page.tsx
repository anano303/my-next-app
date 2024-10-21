"use client";

import React, { useState } from "react";
import "./styles/Home.css";

type Product = {
  id: number;
  name: string;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<string>("");

  const handleAddProduct = () => {
    if (newProduct.trim()) {
      setProducts([...products, { id: Date.now(), name: newProduct }]);
      setNewProduct("");
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="home-container">
      <h1>პროდუქტების მართვა</h1>

      <div className="product-add-section">
        <input
          type="text"
          placeholder="პროდუქტის დასახელება"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>დამატება</button>
      </div>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            {product.name}
            <button onClick={() => handleDeleteProduct(product.id)}>
              წაშლა
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
