import React, { useState } from 'react';
import { useUsers, useUserStats } from '../../hooks/useUsers';
import { getStatusColor, getRoleColor } from '../../utils/helpers';
import Loading from '../ui/Loading';
import Button from '../ui/Button';

const UsersPage = () => {
  const [filters, setFilters] = useState({});
  const { data: users, isLoading, error, refetch } = useUsers(filters);
  const { data: stats } = useUserStats();

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (isLoading) {
    return <Loading text="Loading users..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">Error loading users</div>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Management</h1>
        
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
              <div className="text-sm text-gray-600">Admins</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-yellow-600">{stats.suspended}</div>
              <div className="text-sm text-gray-600">Suspended</div>
            </div>
          </div>
        )}
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filters.role || ''}
            onChange={(e) => handleFilterChange({ role: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange({ status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <Button onClick={() => setFilters({})}>Clear Filters</Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-800`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(user.status)}-100 text-${getStatusColor(user.status)}-800`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.postsCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="danger">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl mb-4">No users found</div>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
