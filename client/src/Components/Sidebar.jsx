import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 flex flex-col fixed top-0 left-0">
      <div className="text-2xl font-bold p-6">Admin Panel</div>
      <ul className="text-lg flex-1 overflow-y-auto">
        <li className="p-4 hover:bg-gray-700">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/users">Users</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/products">Products</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
      <div className="p-4 text-sm">© 2023 Company Name</div>
    </div>
  );
};

export default Sidebar;