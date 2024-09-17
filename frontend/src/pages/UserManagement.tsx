import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userService';

// HUMAN ASSISTANCE NEEDED
// The following component may need additional refinement for production readiness.
// Please review and enhance error handling, loading states, and pagination implementation.

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetchUsers(currentPage);
      setUsers(response.users);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: UserFormData) => {
    try {
      await createUser(userData);
      loadUsers();
    } catch (err) {
      setError('Failed to create user. Please try again.');
    }
  };

  const handleUpdateUser = async (userId: string, userData: UserFormData) => {
    try {
      await updateUser(userId, userData);
      loadUsers();
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        loadUsers();
      } catch (err) {
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <UserForm
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        initialData={selectedUser}
      />
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserManagement;