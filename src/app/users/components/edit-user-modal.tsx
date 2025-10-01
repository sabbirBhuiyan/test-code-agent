"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { userSchema } from "../schema"
import { updateUser } from "../actions"
import { type User } from "@prisma/client"

type EditUserModalProps = {
  user: User
  isOpen: boolean
  onClose: () => void
  onUserUpdated: (user: User) => void
}

export function EditUserModal({
  user,
  isOpen,
  onClose,
  onUserUpdated,
}: EditUserModalProps) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      username: user.username || "",
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const result = await updateUser(values)
    if (result.user) {
      onUserUpdated(result.user)
    } else if (result.error) {
      // Handle errors, e.g., display a toast or set form errors
      console.error("Failed to update user:", result.error)
      if (typeof result.error === "object") {
        for (const [key, value] of Object.entries(result.error)) {
          form.setError(key as keyof z.infer<typeof userSchema>, {
            type: "server",
            message: value?.[0] || "Error",
          })
        }
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <Input
              id="username"
              {...form.register("username")}
              className="col-span-3"
            />
            {form.formState.errors.username && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <Input
              id="email"
              {...form.register("email")}
              className="col-span-3"
            />
            {form.formState.errors.email && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right">
              Phone
            </label>
            <Input
              id="phone"
              {...form.register("phone")}
              className="col-span-3"
            />
            {form.formState.errors.phone && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="address" className="text-right">
              Address
            </label>
            <Input
              id="address"
              {...form.register("address")}
              className="col-span-3"
            />
            {form.formState.errors.address && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}