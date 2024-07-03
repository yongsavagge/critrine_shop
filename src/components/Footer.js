import React from "react";
import { BsTwitterX, BsInstagram, BsFacebook } from "react-icons/bs";

// Componente Footer para mostrar el pie de página
const Footer = () => {
  return (
    <div className="container">
      {/* Pie de pagina con información de contacto y enlaces a redes sociales */}
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        {/* Informacion de copyright y logo */}
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © Citrine Shop 2024
          </span>
        </div>
        {/* Enlaces a redes sociales */}
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX size={24} />
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram size={24} />
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook size={24} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
