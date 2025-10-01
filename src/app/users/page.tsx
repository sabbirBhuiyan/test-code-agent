'use client';

import { useEffect, useState } from 'react';
import { getUsers } from './actions';
import { User } from '@prisma/client';
import { UserTable } from '@/components/users/user-table';
import { EditUserModal } from '@/components/users/edit-user-modal';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const result = await getUsers();
    if (result.success) {
      setUsers(result.data);
    }
    else {
      setError(result.error || 'An unknown error occurred');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleUserUpdated = () => {
    fetchUsers();
    handleCloseModal();
  };

  if (loading) return <div className="container mx-auto p-4">Loading users...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserTable users={users} onEdit={handleEdit} />
      {isModalOpen && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={handleCloseModal}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
}