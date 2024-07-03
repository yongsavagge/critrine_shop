import React from "react";
import { BsCartDash, BsSun, BsMoon } from "react-icons/bs";
import logo from "../img/logo_pagina.png";

const Header = ({
  cart,
  toggleCart,
  handleSearch,
  toggleTheme,
  isLightMode,
}) => {
  // Calcula la cantidad total de items en el carrito
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="p-3 text-bg-dark fixed-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          {/* Logo y titulo de la tienda */}
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="me-2"
            />
            <span className="nav-link px-2 text-white">Citrine Shop</span>
          </a>

          {/* Barra de busqueda y filtro por categoría */}
          <div className="d-flex align-items-center flex-grow-1 justify-content-center mb-3 mb-lg-0">
            <form className="col-12 col-lg-auto w-75">
              <div className="input-group">
                <input
                  type="search"
                  name="search"
                  className="form-control form-control-dark"
                  placeholder="Busca tu producto aquí"
                  aria-label="Search"
                  style={{ backgroundColor: "#ECE6F0", color: "#49454F" }}
                  onChange={handleSearch}
                />
                <select
                  name="category"
                  className="form-select form-select-sm"
                  aria-label="Select category"
                  onChange={handleSearch}
                  style={{
                    backgroundColor: "#ECE6F0",
                    color: "#49454F",
                    border: "1px solid #CED4DA",
                    marginLeft: "10px",
                  }}
                >
                  <option value="">Todas las categorías</option>
                  <option value="Joyería">Joyería</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Ropa de Hombre">Ropa de hombres</option>
                  <option value="Ropa de Mujer">Ropa de mujeres</option>
                </select>
              </div>
            </form>
          </div>

          {/* Botones para cambiar tema y mostrar carrito */}
          <div className="d-flex align-items-center">
            <button
              onClick={toggleTheme}
              className="text-white me-3"
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {/* Cambia el ícono según el modo de tema */}
              {isLightMode ? <BsSun size={24} /> : <BsMoon size={24} />}
            </button>
            <button
              onClick={toggleCart}
              className="text-white"
              style={{
                cursor: "pointer",
                position: "relative",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <BsCartDash size={24} />
              {/* Muestra la cantidad de items en el carrito */}
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    background: "red",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
