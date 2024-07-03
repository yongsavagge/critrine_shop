import React from "react";

const Cards = ({ products, addToCart }) => {
  // Si no hay productos, no se muestra nada
  if (!products) return null;

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div key={product.id} className="col mb-4">
            {/* Cada tarjeta de producto */}
            <div
              className="card h-100 d-flex flex-column"
              style={{ border: "1px solid var(--bs-secondary)" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <p className="fs-4 fw-bold">{product.title}</p>
                  <p className="fs-5 fw-medium">
                    Categoria: {product.category}
                  </p>
                  <p className="fs-3 fw-semibold">Precio: ${product.price} USD</p>
                </div>
                {/* Boton para añadir al carrito */}
                <div className="d-flex align-items-center justify-content-center mt-3">
                  <button
                    className="btn btn-dark fs-5"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
