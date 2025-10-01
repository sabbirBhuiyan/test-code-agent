'use client';

import { useState } from 'react';
import { UserSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { EditUserModal } from './edit-user-modal';

interface UsersTableProps {
  users: UserSchema[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);

  const handleEdit = (user: UserSchema) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={() => handleEdit(user)} variant="ghost" className="text-indigo-600 hover:text-indigo-900">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}
    </div>
  );
}
