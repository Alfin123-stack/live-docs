import AddDocButton from "@/components/AddDocButton";
import { getDocuments } from "@/lib/actions/room.actions";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FileText, Home, FolderOpen, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const user = await currentUser();

  const documents = await getDocuments(
    user?.emailAddresses.at(0)?.emailAddress || "null"
  );

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 backdrop-blur-lg bg-neutral-950/60 px-6">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FileText className="w-7 h-7 text-indigo-500" />
              <h1 className="text-xl font-semibold tracking-wide">LiveDocs</h1>
            </div>

            <div className="hidden sm:flex items-center gap-5 text-gray-400 text-sm">
              <div className="flex items-center gap-1 hover:text-white cursor-pointer transition">
                <Home className="w-4 h-4" />
                Dashboard
              </div>
              <div className="flex items-center gap-1 hover:text-white cursor-pointer transition">
                <FolderOpen className="w-4 h-4" />
                Documents
              </div>
              <div className="flex items-center gap-1 hover:text-white cursor-pointer transition">
                <Settings className="w-4 h-4" />
                Settings
              </div>
            </div>
          </div>

          {/* Right: Search + Auth */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-1.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-gray-300"
              />
            </div>

            {/* Auth Section */}
            <SignedOut>
              <SignInButton>
                <button className="text-gray-300 hover:text-white text-sm">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium text-sm h-10 px-5 transition">
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

      {/* MAIN CONTENT */}
      <main className="w-full max-w-7xl mx-auto p-6 mt-16 flex flex-col gap-10">
        {/* HEADER BOX */}
        <div className="bg-neutral-900/80 border border-neutral-800 w-full p-8 rounded-2xl shadow-lg backdrop-blur">
          <div className="flex items-center justify-between border-b border-neutral-700 pb-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/doc.svg"
                alt="Logo"
                width={45}
                height={45}
              />
              <h2 className="text-xl font-semibold tracking-wide">
                Your Documents
              </h2>
            </div>

            <AddDocButton
              userId={user?.id}
              email={user?.emailAddresses.at(0)?.emailAddress}
            />
          </div>
        </div>

        {/* DOCUMENT CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
          {documents?.data?.map((doc: any) => (
            <div
              key={doc.id}
              className="group bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 shadow-md backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-indigo-500 hover:shadow-indigo-500/20 cursor-pointer relative">
              {/* Icon */}
              <div className="absolute -top-4 right-4 bg-indigo-600 text-white p-2 rounded-xl shadow-md">
                <FileText className="w-5 h-5" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 group-hover:text-indigo-400 transition">
                {doc.metadata.title || "Untitled Document"}
              </h3>

              {/* Info */}
              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  <span className="text-gray-500">By:</span>{" "}
                  {doc.metadata.email}
                </p>
                <p>
                  <span className="text-gray-500">Type:</span> {doc.type}
                </p>
                <p>
                  <span className="text-gray-500">Created:</span>{" "}
                  {new Date(doc.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Button */}
              <button className="mt-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-medium transition shadow">
                <Link href={`/documents/${doc.id}`}>Buka Dokumen</Link>
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default page;
