import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register | CityKart">
      <div className="form-container">
        <form
          className="register-data"
          style={{ lineHeight: "0px" }}
          onSubmit={handleSubmit}
        >
          <h1 className="title">Registration</h1>
          <div className="form-group">
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="input-name"
              placeholder="Enter your name"
              required
            />
            {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="input-email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="input-password"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="input-name"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="input-address"
              placeholder="Enter your Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="input-answer"
              placeholder="What is your Favourite Food Dish ?"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
