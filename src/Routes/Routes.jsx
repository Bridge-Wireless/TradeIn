
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Customers/Pages/Home';
import Contact from '../components/Customers/Pages/Contact';
import NoPage from '../components/Customers/Pages/NoPage';
import CustomersLayout from '../components/Customers/Layout/CustomersLayout';
import Dashboard from '../components/Admin/Pages/Dashboard';
import AdminLayout from '../components/Admin/Layout/AdminLayout';
import Users from '../components/Admin/Pages/Users';
import Customers from '../components/Admin/Pages/Customers';
import Devices from '../components/Admin/Pages/Devices';
import Trade from '../components/Admin/Pages/Trade';
import Reports from '../components/Admin/Pages/Reports';
import AdminLogin from '../components/Admin/Pages/AdminLogin';
import ProtectedRoute from '../components/Admin/Pages/ProtectedRoute'; // Import ProtectedRoute
import TradeLanding from '../components/Customers/Pages/TradeLanding';
import About from '../components/Customers/Pages/About';
import TermsConditions from '../components/Customers/Pages/TermsConditions';
import TradeinForm from '../components/Customers/Pages/TradeinForm';
import CustomerInfoForm from '../components/Customers/Pages/CustomerInfoForm';
import Signup from '../components/Customers/Pages/signup';
import Login from '../components/Customers/Pages/Login';
import Incentive from '../components/Admin/Pages/Incentive';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Customer Routes */}
      <Route path="/" element={<CustomersLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="tradein" element={<TradeLanding />} />
        <Route path="terms-conditions" element={<TermsConditions />} />
        <Route path="trade-quote" element={<TradeinForm />} />
        <Route path="/customer-info" element={<CustomerInfoForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="users" element={<Users />} />
          <Route path="trade" element={<Trade />} />
          <Route path="reports" element={<Reports />} />
          <Route path="customers" element={<Customers />} />
          <Route path="incentive" element={<Incentive />} />
          
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}
