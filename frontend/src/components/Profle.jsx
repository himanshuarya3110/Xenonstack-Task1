import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa"; // Importing icon
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import "./Profile.css"; // Importing custom CSS

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    about: "",
    gender: "male",
    contact: "",
    city: "",
    avatar: "https://avatar.iran.liara.run/public/boy",
  });
  
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/v1/user/profile");
        setUserData({
          ...response.data,
          avatar:
            response.data.gender === "male"
              ? "https://avatar.iran.liara.run/public/boy"
              : "https://avatar.iran.liara.run/public/girl",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
      avatar:
        name === "gender"
          ? value === "male"
            ? "https://avatar.iran.liara.run/public/boy"
            : "https://avatar.iran.liara.run/public/girl"
          : prevData.avatar,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      const response = await axios.put("/api/user", userData);
      console.log("User data updated:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-center">Profile</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row md:p-10">
        <img
          src={userData.avatar}
          alt="Profile"
          className="rounded-full w-32 h-32 md:w-40 md:h-40 md:mr-10 mb-4 md:mb-0"
        />
        <div className="flex flex-col w-full">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded mb-4 text-lg"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded mb-4 text-lg"
                placeholder="Email"
              />
              <input
                type="text"
                name="contact"
                value={userData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded mb-4 text-lg"
                placeholder="Contact"
              />
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded mb-4 text-lg"
                placeholder="City"
              />
              <textarea
                name="about"
                value={userData.about}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded mb-4 text-lg"
                rows="4"
                placeholder="About Me"
              />
              <div className="mb-4">
                <label className="block mb-1 text-lg">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded text-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-lg"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h3 className="text-2xl font-semibold">{userData.name}</h3>
              <p className="text-gray-600 text-lg">{userData.email}</p>
              <p className="text-gray-700 mb-4 text-lg">{userData.about}</p>
              <p className="text-gray-700 mb-4 text-lg">
                Gender: {userData.gender}
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                Contact: {userData.contact}
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                City: {userData.city}
              </p>
              <div className="flex flex-row gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-lg"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-lg"
              >
                Back To Home
              </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
