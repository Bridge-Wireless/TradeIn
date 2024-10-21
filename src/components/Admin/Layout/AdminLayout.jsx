
import { Outlet } from "react-router-dom";
import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
const AdminLayout = ({ children }) => {
  return (
    <div>
      
      <AdminHeader />
      <Outlet />
      
      {/* <AdminFooter /> */}

    </div>
  );
}

export default AdminLayout;
