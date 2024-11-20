import { useState } from 'react';

const SignInForm = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onAuthSuccess(data.token); // Pass token to parent on success
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Server error');
      console.log(err);
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20  bg-black">
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-3xl font-bold text-white text-center mb-6">Sign In</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Enter your password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Sign In
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  </div>
</div>

  );
};

export default SignInForm;
