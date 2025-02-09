import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/get-user-info",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchProfile();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const submitAddress = async () => {
    try {
      await axios.put("http://localhost:4000/api/v1/update-address", value, {
        headers,
      });
      toast.success("Updated Address Successfully");
      const updatedResponse = await axios.get(
        "http://localhost:4000/api/v1/get-user-info",
        { headers }
      );
      setProfileData(updatedResponse.data);
      setValue({ address: updatedResponse.data.address });
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error updating address");
    }
  };

  return (
    <>
      {!ProfileData ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 md:p-8">
          <div className="w-full max-w-md md:max-w-lg bg-white shadow-2xl rounded-xl p-6 md:p-8">
            <div className="flex flex-col items-center">
              <div className="avatar mb-6">
                <div className="w-20 md:w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={ProfileData.avatar} alt="User Avatar" />
                </div>
              </div>
              <div className="w-full space-y-3">
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <p className="text-lg font-medium bg-gray-200 p-3 rounded-md">
                    {ProfileData.username}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <p className="text-lg bg-gray-200 p-3 rounded-md">
                    {ProfileData.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    className="input input-bordered w-full text-lg p-3"
                    placeholder="Address"
                    name="address"
                    value={value.address}
                    onChange={change}
                  />
                </div>
                <button
                  className="btn btn-primary w-full mt-3"
                  onClick={submitAddress}
                >
                  Update Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
