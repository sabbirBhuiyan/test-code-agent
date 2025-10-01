'use client';

import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/app/users/actions';
import { userSchema, UserSchema } from '@/lib/schemas';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUserUpdated: () => void;
}

export function EditUserModal({ user, onClose, onUserUpdated }: EditUserModalProps) {
  const [formData, setFormData] = useState<UserSchema>({
    id: user.id,
    username: user.username || '',
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserSchema, string[]>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      id: user.id,
      username: user.username || '',
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
    });
    setErrors({});
    setSubmitError(null);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field being edited
    if (errors[name as keyof UserSchema]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof UserSchema];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setErrors({});

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setIsSubmitting(false);
      return;
    }

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const updateResult = await updateUser(user.id, data);

    if (updateResult.success) {
      onUserUpdated();
    } else {
      if (updateResult.errors) {
        setErrors(updateResult.errors);
      } else {
        setSubmitError(updateResult.error || 'Failed to update user.');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
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
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username[0]}</p>}
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
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
          </div>
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}