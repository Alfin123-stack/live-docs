import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { FileText, Share } from "lucide-react";

const CollaborationRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaboration-room">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-neutral-800 backdrop-blur-md bg-neutral-900/60 px-14">
            <nav className="flex justify-between items-center px-8 py-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-500" />
                <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
                  LiveDocs
                </h1>
              </div>

              {/* Title placeholder */}
              <p className="hidden sm:block text-neutral-300">
                Untitled Document
              </p>

              {/* Auth Section */}
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-indigo-500 text-white hover:bg-indigo-400 ease-in-out">
                  <Share className="w-4 h-4" /> <span>Share</span>
                </Button>
                <SignedOut>
                  <SignInButton>
                    <button className="bg-transparent text-neutral-300 hover:text-white text-sm sm:text-base">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-4 sm:px-5 transition-all duration-200">
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

          {/* Main Editor */}
          <main className="px-14  py-6">
            <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl backdrop-blur-md p-4 sm:p-6">
              <Editor />
            </div>
          </main>
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborationRoom;
