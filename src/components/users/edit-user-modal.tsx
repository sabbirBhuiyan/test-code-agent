'use client';

import { useState, useEffect } from 'react';
import { UserSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateUser } from '@/app/actions';


interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserSchema;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const [formData, setFormData] = useState<UserSchema>(user);
  const [errors, setErrors] = useState<Partial<UserSchema> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(user);
    setErrors(null);
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(null);

    const result = await updateUser(formData);

    if (result.error) {
      if (typeof result.error === 'object' && result.error !== null) {
        setErrors(result.error as Partial<UserSchema>);
      } else {
        // Handle general error message
        console.error("Server action error:", result.error);
        alert(result.error);
      }
    } else if (result.user) {
      alert("User updated successfully!");
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.username && <p className="text-red-500 text-xs mt-1">{errors.username[0]}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone || ''}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address || ''}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
