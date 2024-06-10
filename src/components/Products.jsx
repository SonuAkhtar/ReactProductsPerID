import { useState } from "react";
import "./products.css";
import { useEffect } from "react";

const Products = () => {
  const [cart, setCart] = useState();
  const [products, setProducts] = useState([]);

  const fetchCartData = async () => {
    let response = await fetch("https://fakestoreapi.com/carts/2");
    let data = await response.json();

    setCart(data);
    fetchProducts(data);
  };

  const fetchProducts = (data) => {
    data.products.forEach(async (val, index) => {
      let response = await fetch(
        `https://fakestoreapi.com/products/${val.productId}`
      );
      let data = await response.json();
      setProducts((prev) => [...prev, data]);
    });
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  console.log(products);

  return (
    <div className="products__container">
      <div className="cart__wrapper">
        {cart?.products?.map((prod, index) => (
          <div key={index}>
            Product ID: {prod.productId} - Quantity: {prod.quantity}
          </div>
        ))}
      </div>

      <div className="product_wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((val, index) => (
              <tr key={index}>
                <td>{val.id}</td>
                <td>{val.title}</td>
                <td>{val.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
