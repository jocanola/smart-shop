import React, { useState, useEffect } from "react";
import "./Personaldata.css";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";

const Personaldata = () => {
  const [{ user }] = useStateValue();
  //All user info
  const [displayname, setDisplayname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [currentpassword, setCurrentpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [biodata, setBiodata] = useState([]);

  const dbpath = db.collection("users").doc(user?.uid).collection("biodata");
  useEffect(() => {
    dbpath.onSnapshot((snapshot) => {
      setBiodata(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  }, []);

  const updateBio = (event) => {
    event.preventDefault();
    dbpath.add({
      displayName: displayname,
      firstName: firstname,
      lastName: lastname,
      phoneNo: phoneno,
      address: address,
      email: email,
      currentPassword: currentpassword,
      newPassword: newpassword,
    });
  };

  //Initialize biodata
  const bioinfo = biodata[0]?.data;

  return (
    <form className="personal">
      <div className="personal_heading">
        <h2>Profile</h2>
      </div>
      <div className="personal_data">
        {console.log(bioinfo?.displayName)}
        <div className="personal_data1">
          <span>Display</span>
          <input
            type="text"
            placeholder={bioinfo?.displayName}
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
          />
        </div>
        <h2>Name & Address</h2>
        <div className="personal_data1">
          <span>First Name</span>
          <input
            type="text"
            placeholder={bioinfo?.firstName}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="personal_data1">
          <span>Last and Other Name</span>
          <input
            type="text"
            placeholder={bioinfo?.lastName}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="personal_data1">
          <span>Phone No.</span>
          <input
            type="number"
            placeholder={bioinfo?.phoneNo}
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
        </div>

        <div className="personal_data1">
          <span>Street address</span>
          <input
            type="text"
            placeholder={bioinfo?.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <h2>Login detail</h2>
        <div className="personal_data1">
          <span>Email</span>
          <input
            type="text"
            placeholder={bioinfo?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="personal_data1">
          <span>Current Password</span>
          <input
            type="password"
            placeholder="************"
            value={currentpassword}
            onChange={(e) => setCurrentpassword(e.target.value)}
          />
        </div>

        <div className="personal_data1">
          <span>New Password</span>
          <input
            type="text"
            placeholder="**********"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
          />
        </div>
        {console.log(displayname)}
        <button onClick={updateBio}> Update </button>
      </div>
    </form>
  );
};

export default Personaldata;
