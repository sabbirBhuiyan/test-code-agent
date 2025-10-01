
'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { User, userSchema } from '@/lib/schemas';
import { updateUser } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  triggerRef: React.RefObject<HTMLElement | null>; // Ref to the element that opened the modal
  onUserUpdated: (updatedUser: User) => void;
}

export function EditUserModal({ isOpen, onClose, user, triggerRef, onUserUpdated }: EditUserModalProps) {
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData(user);
    setErrors({});

    if (isOpen) {
      const initialTriggerElement = triggerRef.current; // Capture the current value

      // Focus the modal when it opens
      modalRef.current?.focus();

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        // Return focus to the trigger element when the modal closes
        if (initialTriggerElement) {
          initialTriggerElement.focus();
        }
      };
    } else {
      // Clear errors when modal closes
      setErrors({});
    }
  }, [user, isOpen, onClose, triggerRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const validatedData = userSchema.parse(formData);
      const result = await updateUser(validatedData);

      if (result.success) {
        onUserUpdated(validatedData);
        onClose();
      } else {
        // Handle server-side errors
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message || "Failed to update user." });
        }
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-title"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 id="edit-user-title" className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full"
              disabled={loading}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full"
              disabled={loading}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full"
              disabled={loading}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          {errors.general && <p className="text-red-500 text-xs mt-1 mb-4">{errors.general}</p>}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
