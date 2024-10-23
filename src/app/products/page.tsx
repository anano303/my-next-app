"use client"; // Make sure this component is a client component

import { useEffect, useState } from "react";
import { Product, getProducts } from "../services/api"; // Correct import
import axios, { AxiosError } from "axios";
import "./products.css";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    model: "",
    description: "",
  });
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // New state to manage form visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response;

      if (editProductId) {
        response = await axios.put(
          `http://localhost:3003/products/${editProductId}`,
          newProduct
        );
        setEditProductId(null); // Reset edit mode
      } else {
        response = await axios.post(
          "http://localhost:3003/products",
          newProduct
        );
      }

      setProducts((prev) => {
        if (editProductId) {
          return prev.map((product) =>
            product._id === editProductId ? response.data : product
          );
        }
        return [...prev, response.data];
      });

      setNewProduct({ name: "", price: 0, model: "", description: "" }); // Reset form
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setNewProduct(product);
    setEditProductId(product._id); // Set ID of the product to edit
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting product ID:", id);
    try {
      await axios.delete(`http://localhost:3003/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id)); // Remove deleted product from state
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Error deleting product:",
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev); // Toggle form visibility
    setNewProduct({ name: "", price: 0, model: "", description: "" }); // Reset form when toggled
    setEditProductId(null); // Reset edit mode
  };

  return (
    <div className="products-container">
      <button
        className="buttonProduct"
        onClick={toggleForm}
        style={{ zIndex: 20, background: "transparent" }}
      >
        {showForm ? "Hide Form" : "Add New Product"}
      </button>
      {showForm && (
        <>
          <div className="overlay" onClick={() => setShowForm(false)} />{" "}
          {/* Overlay */}
          <form className="add-product-form" onSubmit={handleSubmit}>
            <h3>{editProductId ? "Edit Product" : "Add New Product"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Product Model"
              value={newProduct.model}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleChange}
              required
            />
            <button className="buttonProduct" type="submit">
              {editProductId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </>
      )}
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Model: {product.model}</p>
          <p>Description: {product.description}</p>
          <button className="buttonProduct" onClick={() => handleEdit(product)}>
            Edit
          </button>
          <button
            className="buttonProduct"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
