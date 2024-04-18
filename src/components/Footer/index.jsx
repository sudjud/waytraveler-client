import footer from "./footer.module.sass";
import logo from "./logo.svg";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
function Footer() {
  return (
    <>
      <div className={footer.footer}>
        <div className={footer.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={footer.about}>
          <ul>
            <h3>ABOUT</h3>
            <li>Home</li>
            <li>Destination</li>
            <li>Travel Story</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className={footer.company}>
          <ul>
            <h3>COMPANY</h3>
            <li>Offers</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
          </ul>
        </div>
        <div className={footer.bookings}>
          <ul>
            <h3>BOOKINGS</h3>
            <li>Flights</li>
            <li>Hotels</li>
            <li>Buses</li>
            <li>Trains</li>
          </ul>
        </div>
      </div>
      <div className={footer.contacts}>
        <ul>
          <li>
            <BsInstagram className={footer.icons} />
          </li>
          <li>
            <BsYoutube className={footer.icons} />
          </li>
          <li>
            <BsTwitter className={footer.icons} />
          </li>
          <li>
            <BsFacebook className={footer.icons} />
          </li>
        </ul>
        <div>Copyright 2022, All rights reserved.</div>
      </div>
    </>
  );
}
export default Footer;
