import React from "react";
import {
  BsCartPlusFill,
  BsCartDashFill,
  BsFillTrashFill,
} from "react-icons/bs";

const CartSummary = ({ cart, updateCart, removeFromCart }) => {
  // Maneja el incremento de cantidad del producto en el carrito
  const handleIncrease = (productId) => {
    updateCart(productId, "increase");
  };

  // Maneja el decremento de cantidad del producto en el carrito
  const handleDecrease = (productId) => {
    updateCart(productId, "decrease");
  };

  // Maneja la eliminación del producto del carrito
  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  // Calcula el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mt-4">
      <h1>Resumen del Carrito</h1>
      {/* Muestra mensaje si el carrito esta vacio */}
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="mb-3 d-flex align-items-center">
            {/* Imagen del producto */}
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: "100px",
                border: "1px solid black",
                marginRight: "20px",
              }}
            />
            <div>
              <h2>{item.title}</h2>
              <p>{item.price}$ USD</p>
              <p>Cantidad: {item.quantity}</p>
              <div className="d-flex">
                {/* Boton para incrementar la cantidad */}
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleIncrease(item.id)}
                >
                  <BsCartPlusFill />
                </button>
                {/* Boton para decrementar la cantidad */}
                <button
                  className="btn btn-dark me-2"
                  onClick={() => handleDecrease(item.id)}
                >
                  <BsCartDashFill />
                </button>
                {/* Boton para eliminar el producto */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Muestra el boton "Ir a pagar" si hay productos en el carrito */}
      {cart.length > 0 && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-dark fs-7" onClick={() => console.log("Ir a pagar")}>
            Ir a pagar
          </button>
        </div>
      )}
      {/* Muestra el total del carrito */}
      <h2>Total: {getTotal()}$ USD</h2>
    </div>
  );
};

export default CartSummary;
