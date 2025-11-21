"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { Editor } from "@/components/editor/Editor";
import { Input } from "@/components/ui/input";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import {
  FileText,
  LucidePencilLine,
  Share,
  Home,
  FolderOpen,
  Settings,
  Loader2,
} from "lucide-react";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { updateDocument } from "@/lib/actions/room.actions";
import { toast } from "sonner";

export interface RoomMetadata {
  title?: string;
  email?: string;
  creatorId?: string;
}

interface CollaborationRoomProps {
  roomId: string;
  roomMetadata?: RoomMetadata;
}

const CollaborationRoom: React.FC<CollaborationRoomProps> = ({
  roomId,
  roomMetadata,
}) => {
  const [title, setTitle] = useState(
    roomMetadata?.title || "Untitled Document"
  );
  const [isEdit, setIsEdit] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const prevTitle = useRef(title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const titleBoxRef = useRef<HTMLDivElement | null>(null);

  // Auto focus
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEdit]);

  // SAVE FUNCTION (Sonner)
  const saveTitle = async () => {
    if (title.trim() === "" || title === prevTitle.current) return;

    try {
      setLoadingSave(true);
      const update = await updateDocument(roomId, title);

      if (update) {
        prevTitle.current = title;

        toast.success("Document title saved!", {
          description: "Your title has been updated.",
        });
      }
    } catch (error) {
      toast.error("Failed to save title.");
      console.log(error);
    } finally {
      setLoadingSave(false);
    }
  };

  // CLICK OUTSIDE → AUTO SAVE
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isEdit &&
        titleBoxRef.current &&
        !titleBoxRef.current.contains(e.target as Node)
      ) {
        setIsEdit(false);
        saveTitle();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEdit, title]);

  // ENTER SAVE
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEdit(false);
      saveTitle();
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 backdrop-blur-xl bg-neutral-950/60 px-6">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FileText className="w-7 h-7 text-indigo-500" />
              <h1 className="text-xl font-semibold tracking-wide">LiveDocs</h1>
            </div>

            <div className="hidden sm:flex items-center gap-5 text-gray-400 text-sm">
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer">
                <Home className="w-4 h-4" /> Dashboard
              </div>
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer">
                <FolderOpen className="w-4 h-4" /> Documents
              </div>
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer">
                <Settings className="w-4 h-4" /> Settings
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div
            ref={titleBoxRef}
            className="flex-1 flex justify-center items-center gap-2">
            {isEdit ? (
              <Input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                  max-w-xs text-center text-neutral-200 bg-neutral-800/40 
                  border border-neutral-700 rounded-lg py-1
                  focus:outline-none focus:ring-2 focus:ring-indigo-600
                "
              />
            ) : (
              <>
                <p className="max-w-xs text-center text-neutral-300 font-medium">
                  {title}
                </p>

                <button
                  onClick={() => setIsEdit(true)}
                  className="p-2 rounded-xl transition hover:bg-neutral-800 hover:scale-105">
                  {loadingSave ? (
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  ) : (
                    <LucidePencilLine className="w-4 h-4 text-indigo-500" />
                  )}
                </button>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <Button className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-500 transition">
              <Share className="w-4 h-4" /> Share
            </Button>

            <SignedOut>
              <SignInButton>
                <button className="text-gray-300 hover:text-white text-sm">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm h-10 px-4 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* EDITOR */}
      <RoomProvider id={roomId}>
        <ClientSideSuspense
          fallback={<div className="text-center p-10">Loading…</div>}>
          <div className="collaboration-room max-w-6xl mx-auto mt-10 px-6">
            <Editor />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
    </>
  );
};

export default CollaborationRoom;
