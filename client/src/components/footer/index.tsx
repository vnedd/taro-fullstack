import { Link } from "react-router-dom";
import Container from "../container";
import Logo from "../logo";
import { ImFacebook } from "react-icons/im";
import { FaPinterestP } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-secondary py-10 mt-32">
      <Container className="w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 ">
          <div className="flex flex-col md:items-start items-center">
            <Logo type="full" theme="light" />
            <div className="flex flex-col md:items-start items-center</div> space-y-1 text-sm">
              <p>
                Address:{" "}
                <strong>
                  1234 Fashion Street, Suite 567, New York, NY 10001
                </strong>
              </p>
              <p>
                Email: <strong>info@fashionshop.com</strong>
              </p>
              <p>
                Phone: <strong>(212) 555-1234</strong>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold md:text-start text-center">Help</h3>
            <div className="flex flex-col md:items-start items-center space-y-2 text-sm font-light mt-6">
              <Link to="" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="" className="hover:underline">
                Returns + Exchanges
              </Link>
              <Link to="" className="hover:underline">
                Shipping
              </Link>
              <Link to="" className="hover:underline">
                Terms & Conditions
              </Link>
              <Link to="" className="hover:underline">
                FAQs
              </Link>
              <Link to="" className="hover:underline">
                My Wishlist
              </Link>
              <Link to="" className="hover:underline"></Link>
              <Link to="" className="hover:underline">
                Compare
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold md:text-start text-center">
              About us
            </h3>
            <div className="flex flex-col  md:items-start items-center space-y-2 text-sm font-light mt-6">
              <Link to="" className="hover:underline">
                Our Story
              </Link>
              <Link to="" className="hover:underline">
                Visit Our Store
              </Link>
              <Link to="" className="hover:underline">
                Contact Us
              </Link>
              <Link to="" className="hover:underline">
                Account
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold md:text-start text-center">
              Follow Us
            </h3>
            <div className="flex flex-col  md:items-start items-center space-y-2 text-sm font-light mt-6">
              <Link to="" className="flex space-x-3 items-center text-primary">
                <ImFacebook size={15} />
                <p className="font-semibold">Facebook</p>
              </Link>
              <Link to="" className="flex space-x-3 items-center text-primary">
                <FaPinterestP size={15} />
                <p className="font-semibold">Pinterest</p>
              </Link>
              <Link to="" className="flex space-x-3 items-center text-primary">
                <IoLogoYoutube size={15} />
                <p className="font-semibold">Youtube</p>
              </Link>
              <Link to="" className="flex space-x-3 items-center text-primary">
                <FaLinkedinIn size={15} />
                <p className="font-semibold">Linkedin</p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
