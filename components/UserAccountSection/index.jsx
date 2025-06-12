import React, { useState } from "react";

export default function UserAccountSection({ initialData = {} }) {
  const {
    name: initialName = "",
    email: initialEmail = "",
    phone: initialPhone = "",
    address: initialAddress = "",
    avatarUrl = "",
  } = initialData;

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
    address: initialAddress,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(avatarUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      // Reset form on cancel
      setFormData({
        name: initialName,
        email: initialEmail,
        phone: initialPhone,
        address: initialAddress,
      });
      setAvatarPreview(avatarUrl);
    }
  };

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
    // Typically you would call an API to save the data here
  };

  const handlePasswordSave = () => {
    // Implement password change logic here
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    // Typically you would call an API to change the password here
  };

  return (
    <div className="max-w-6xl font-archivo mx-auto my-12 md:my-28 bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header section */}
      <div className="bg-gray-50 px-6 py-4 border-b border-neutral-300">
        <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
        <p className="text-sm text-gray-500">Manage your personal information</p>
      </div>

      {/* Tabs */}
      <div className="">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-brand text-brand"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "password"
                ? "border-brand text-brand"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Change Password
          </button>
        </nav>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "profile" ? (
          <>
            {/* Avatar and basic info */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={avatarPreview || "/images/user.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-brand hover:bg-brand-dark text-white rounded-full p-2 cursor-pointer shadow-md transition-all duration-200 transform hover:scale-105">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800">
                  {formData.name}
                </h3>
                <p className="text-gray-500">{formData.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {isEditing ? "Editing profile" : "Member since 2023"}
                </p>
              </div>

              <button
                onClick={handleEditToggle}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isEditing
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-brand text-white hover:bg-brand-dark"
                } shadow-sm`}
              >
                {isEditing ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline mr-1.5 -mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline mr-1.5 -mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Form fields */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                    {isEditing && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                      isEditing
                        ? "border-gray-300 focus:border-brand focus:ring-brand/30 bg-white text-gray-800"
                        : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                    {isEditing && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                      isEditing
                        ? "border-gray-300 focus:border-brand focus:ring-brand/30 bg-white text-gray-800"
                        : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                    } transition`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                      isEditing
                        ? "border-gray-300 focus:border-brand focus:ring-brand/30 bg-white text-gray-800"
                        : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                      isEditing
                        ? "border-gray-300 focus:border-brand focus:ring-brand/30 bg-white text-gray-800"
                        : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                    } transition`}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  onClick={handleEditToggle}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition shadow-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-lg mx-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-6">
              Change Password
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Current Password
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-brand focus:ring-brand/30 bg-white text-gray-800 transition"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  New Password
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-brand focus:ring-brand/30 bg-white text-gray-800 transition"
                  placeholder="Enter your new password"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm New Password
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-brand focus:ring-brand/30 bg-white text-gray-800 transition"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handlePasswordSave}
                  disabled={
                    !passwordData.currentPassword ||
                    !passwordData.newPassword ||
                    passwordData.newPassword !== passwordData.confirmPassword
                  }
                  className={`px-6 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center ${
                    !passwordData.currentPassword ||
                    !passwordData.newPassword ||
                    passwordData.newPassword !== passwordData.confirmPassword
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-brand text-white hover:bg-brand-dark"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}