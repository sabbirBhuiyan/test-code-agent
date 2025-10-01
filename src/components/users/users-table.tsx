
'use client';

import * as React from 'react';
import { useState, useRef } from 'react';
import { User } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { EditUserModal } from './edit-user-modal';

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const handleEdit = (user: User, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    editButtonRef.current = event.currentTarget; // Store the clicked button for focus management
  };

  return (
    <div className="overflow-x-auto" aria-label="Users Table">
      <table className="min-w-full bg-white border border-gray-200">
        <caption className="sr-only">List of users in the system</caption>
        <thead>
          <tr>
            <th scope="col" className="py-2 px-4 border-b">Username</th>
            <th scope="col" className="py-2 px-4 border-b">Phone</th>
            <th scope="col" className="py-2 px-4 border-b">Email</th>
            <th scope="col" className="py-2 px-4 border-b">Address</th>
            <th scope="col" className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-gray-500" aria-live="polite">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.address}</td>
                <td className="py-2 px-4 border-b">
                  <Button
                    onClick={(e) => handleEdit(user, e)}
                    aria-label={`Edit ${user.username}`}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedUser && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          triggerRef={editButtonRef}
        />
      )}
    </div>
  );
}
