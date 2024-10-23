import axios from "axios";

// Exporting the Product interface
export interface Product {
  _id: string;
  name: string;
  price: number;
  model: string;
  description: string;
}

// Function to get products from the server
export async function getProducts(): Promise<Product[]> {
  const response = await axios.get("http://localhost:3003/products");
  return response.data;
}
