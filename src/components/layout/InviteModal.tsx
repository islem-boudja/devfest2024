"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { IoMdClose } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import toast from "react-hot-toast";

const InviteModal = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const validateEmail = (email: string) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );
  };

  const handleInvite = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    // Handle invite logic here
    console.log("Inviting", email, "as", role);
    toast.success(`Invite sent to ${email}`);
    setOpen(false);
  };

  const handleCopyLink = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    // Handle copy link logic here
    console.log("Copying invite link");
    toast.success("Invite link copied to clipboard");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#071139]">
            Create an invite link
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <IoMdClose className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-4">
          <Label className="text-lg font-semibold text-[#071139]">
            Choose a role :
          </Label>
          <RadioGroup
            defaultValue="employee"
            className="mt-2 flex gap-4"
            onValueChange={setRole}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employee" id="employee" />
              <Label htmlFor="employee">Employee</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="financial-manager"
                id="financial-manager"
              />
              <Label htmlFor="financial-manager">Financial Manager</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mt-4">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={handleInvite}
            className="bg-[#071139] text-white hover:bg-[#071139]/90"
          >
            Invite
          </Button>
          <Button
            variant="outline"
            className="text-[#00A651]"
            onClick={handleCopyLink}
          >
            <FiLink className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteModal;
