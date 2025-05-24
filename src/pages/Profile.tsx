import React, { useState } from "react";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profileData = {
    name: "John Doe",
    email: "abhcnkkksj@.com",
    phone: "+91 9876543210",
    role: "User",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      alert("New and Confirm Password must match");
      return;
    }
    // Implement password change logic here
    alert("Password changed successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        <div className="mb-2">
          <strong>Name:</strong> {profileData.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {profileData.email}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {profileData.phone}
        </div>
        <div className="mb-4">
          <strong>Role:</strong> {profileData.role}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Change Password
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Change Password
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  required
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
