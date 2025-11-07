import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="px-14 py-2 bg-gray-600">
      <header className="p-4">
        <nav className=" flex justify-between items-center">
          <h1>live docs</h1>
          <p>title</p>
          <div className="flex justify-items-center items-center gap-4">
            <Button>Share</Button>
            <User />
          </div>
        </nav>
      </header>
      <Editor />
    </div>
  );
}

export default page;
