"use client";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

function AddDocButton({ userId, email }: { userId: string; email: string }) {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="bg-blue-600 text-white hover:bg-blue-500 ease-in-out duration-300">
      <Plus className="mr-2 h-4 w-4" />
      <span>Add New Document</span>
    </Button>
  );
}

export default AddDocButton;
