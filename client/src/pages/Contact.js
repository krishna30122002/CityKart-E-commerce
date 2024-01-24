import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us | CityKart"}>
      <div className="row contact-us">
        <div className="col-md-6">
          <img
            className="image-contact"
            src="/images/image.jpg"
            alt="contact-us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            If you have any query then feel free to ask us by contacting us.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.supportcitykart.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 812-9785894
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
