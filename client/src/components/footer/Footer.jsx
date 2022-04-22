import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import Logo from "../headers/icon/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          {/* <IMG SRC="" ALT="" WIDTH=150 HEIGHT=100> */}
          <img
            src={Logo}
            alt=""
            width="150"
            height="100"
            style={{ background: "white", borderRadius: "20px" }}
          />

          <p className="footer-links">
            <Link to="/">Home</Link> ·<a href="#">About</a>
          </p>

          <p className="footer-company-name">BooksDeal &copy; 2022</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Shantilal shah engineering college,</span> Bhavnagar, Gujrat
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+91 8980626669</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@company.com">
                bhavikmagatarapara@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>Psudo-coder</span> Nikunj Ladva (190430116064)
            <br /> Bhavik Magtarpara (190430116067) <br /> Kartik Mordiya
            (190430116077)
          </p>

          <div className="footer-icons">
            <a
              href="https://www.linkedin.com/in/ladva-nikunj-126132216/"
              target="_blank"
            >
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>

            <a href="https://github.com/nik-245" target="_blank">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
      <hr/>
      <p className="cp-text">© Copyright 2019-2023 BooksDeal. All rights reserved.</p>
    </>
  );
};

export default Footer;
