
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdCampaignForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    impressions: 0,
    clicks: 0,
    conversions: 0,
    spend: 0,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error when the user edits the input
    setValidationErrors({ ...validationErrors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://lopifybackend.onrender.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 400) {
      // Handle validation errors
      const errorData = await response.json();
      setValidationErrors(errorData);
    } else if (response.ok) {
      toast.success('Campaign data added successfully', {
        position: 'top-center',
      });
      setFormData({
        name: '',
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
      });
      setValidationErrors({});
    } else {
      toast.error('Failed to add campaign data', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ad Campaign Input</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Campaign Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              validationErrors.name ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm">
              {validationErrors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Impressions:</label>
          <input
            type="number"
            name="impressions"
            value={formData.impressions}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              validationErrors.impressions ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {validationErrors.impressions && (
            <p className="text-red-500 text-sm">
              {validationErrors.impressions}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Clicks:</label>
          <input
            type="number"
            name="clicks"
            value={formData.clicks}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              validationErrors.clicks ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {validationErrors.clicks && (
            <p className="text-red-500 text-sm">
              {validationErrors.clicks}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Conversions:</label>
          <input
            type="number"
            name="conversions"
            value={formData.conversions}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              validationErrors.conversions ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {validationErrors.conversions && (
            <p className="text-red-500 text-sm">
              {validationErrors.conversions}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Spend:</label>
          <input
            type="number"
            name="spend"
            value={formData.spend}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              validationErrors.spend ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {validationErrors.spend && (
            <p className="text-red-500 text-sm">
              {validationErrors.spend}
            </p>
          )}
        </div>

        {Object.keys(validationErrors).map((fieldName) => (
          <p key={fieldName} className="text-red-500 text-sm mb-2">
            {validationErrors[fieldName]}
          </p>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover-bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdCampaignForm;






