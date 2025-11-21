import CollaborationRoom from "@/components/CollaborationRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ⬅ WAJIB DI-AWAIT

  const clerk = await currentUser();

  const room = await getDocument({
    roomId: id,
    userId: clerk?.emailAddresses.at(0)?.emailAddress || "null",
  });

  console.log(room);

  console.log("🔍 ROOM USERS ACCESSES:", room.usersAccesses);
  console.log("🔍 CURRENT USER ID:", clerk?.emailAddresses.at(0)?.emailAddress);

  if (!room) redirect("/");

  return <CollaborationRoom roomId={id} roomMetadata={room.metadata} />;
}
