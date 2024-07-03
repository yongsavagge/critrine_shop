// Importe de librerias y componentes a utilizar
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cards from "./cards/Cards";
import CartSummary from "./summary/CartSummary";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLightMode, setIsLightMode] = useState(true);

  // Funcion para traer la informacion desde la API utilizando axios para realizar el request
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const translatedProducts = response.data.map((product) => ({
          ...product,
          title: translateProductName(product.title),
          price: formatPrice(product.price),
          category: translateCategory(product.category),
        }));
        setProducts(translatedProducts);
      } catch (error) {
        console.error("Error al encontrar productos: ", error);
      }
    };
    fetchProducts();
  }, []);

  // Guarda el carrito en el localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funcion para añadir items al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Funcion para actualizar el carrito de compras
  const updateCart = (productId, action) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  // Traduccion de cada uno de los items de la tienda debido a que la API tiene los items en ingles
  // Y el requerimiento es que la pagina fuese en español
  const translateProductName = (name) => {
    const translations = {
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops":
        "Mochila Fjallraven, para notebooks de 15 pulgadas",
      "Mens Casual Premium Slim Fit T-Shirts ":
        "Polera manga larga de hombre, cuello con botones",
      "Mens Cotton Jacket": "Chaqueta de algodón para hombres",
      "Mens Casual Slim Fit": "Polera casual y delgada para hombres",
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet":
        "Pulsera de cadena de oro y plata John Hardy para mujeres",
      "Solid Gold Petite Micropave ": "Anillo pequeño de oro sólido",
      "White Gold Plated Princess": "Anillo chapado en oro blanco",
      "Pierced Owl Rose Gold Plated Stainless Steel Double":
        "Anillos chapados en oro rosa con doble acero inoxidable",
      "WD 2TB Elements Portable External Hard Drive - USB 3.0 ":
        "Disco duro externo portátil WD 2TB Elements - USB 3.0",
      "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s":
        "SanDisk SSD PLUS 1TB SSD interno - SATA III 6 Gb/s",
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5":
        "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive":
        "Disco WD 4TB Gaming Drive compatible con Playstation 4 Disco duro externo portátil",
      "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin":
        "Monitor Acer SB220Q bi 21.5 pulgadas Full HD (1920 x 1080) IPS ultradelgado",
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ":
        "Monitor curvo para juegos Samsung de 49 pulgadas CHG90 144Hz",
      "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats":
        "Chaquetas de invierno para mujeres BIYLACLESEN 3 en 1",
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket":
        "Chaqueta de moto cuero sintético con capucha desmontable para mujeres Lock and Love",
      "Rain Jacket Women Windbreaker Striped Climbing Raincoats":
        "Impermeable de mujeres para escalar",
      "MBJ Women's Solid Short Sleeve Boat Neck V ":
        "Polera manga corta para mujeres MBJ",
      "Opna Women's Short Sleeve Moisture": "Manga corta Opna para mujeres",
      "DANVOUY Womens T Shirt Casual Cotton Short":
        "Camiseta DANVOUY para mujeres de manga corta",
    };
    return translations[name] || name;
  };

  // Funcion para traducir cada una de las categorias traidas desde la API, debido a que estaban en ingles
  const translateCategory = (category) => {
    const translations = {
      electronics: "Electrónica",
      jewelery: "Joyería",
      "men's clothing": "Ropa de Hombre",
      "women's clothing": "Ropa de Mujer",
    };
    return translations[category] || category;
  };

  // Funcion para redondear los precios, debido a que en la API los precios estan en dolares
  // Con decimales, por lo que se redondea al numero entero proximo
  const formatPrice = (price) => {
    return Math.round(price);
  };

  // Funcion para remover item del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Funcion para alternar la visibilidad del carrito
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Funcion para manejar la busqueda y filtrado de productos
  const handleSearch = (event) => {
    const { name, value } = event.target;
    if (name === "search") {
      setSearchTerm(value);
    } else if (name === "category") {
      setSelectedCategory(value);
    }
  };

  // Filtra los productos según el termino de búsqueda y la categoria seleccionada
  const filteredProducts = products.filter(
    (product) =>
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (product.category.toLowerCase() === selectedCategory.toLowerCase() ||
        selectedCategory === "")
  );

  // Funcion para cambiar el tema de la pagina (debido a que tiene modo claro y modo oscuro)
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  // Creacion del formato de la pagina utilizando los componentes creados
  return (
    <div className={`app-container ${isLightMode ? "light-mode" : "dark-mode"}`}>
      <Header
        cart={cart}
        toggleCart={toggleCart}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        isLightMode={isLightMode}
      />
      <div className="container mt-5">
        {showCart ? (
          <CartSummary
            cart={cart}
            updateCart={updateCart}
            removeFromCart={removeFromCart}
          />
        ) : (
          <div className="cards-container mt-5">
            <Cards products={filteredProducts} addToCart={addToCart} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
