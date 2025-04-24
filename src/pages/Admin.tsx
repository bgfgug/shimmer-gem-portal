
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/components/AdminDashboard';

const Admin: React.FC = () => {
  return (
    <AdminLayout title="Dashboard">
      <AdminDashboard />
    </AdminLayout>
  );
};

export default Admin;
