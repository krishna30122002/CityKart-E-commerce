import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(()=>{
    const {email,name,phone,address}=auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user=data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success('Profile Updated Successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={`Dashboard | ${auth?.user?.name}`}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form
                className="register-data"
                style={{ lineHeight: "0px" }}
                onSubmit={handleSubmit}
              >
                <h1 className="title">USER PROFILE</h1>
                <div className="form-group">
                  <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="input-name"
                    placeholder="Enter your name"
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
                    disabled
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
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
