import { getUserProfile } from "@/lib/queries"
import RightSidebarContent from "./right-sidebar-content"

async function RightSidebar({ userId }: { userId: string }) {
  const user = await getUserProfile(userId)

  if (!user) {
    return null
  }

  return <RightSidebarContent user={user} />
}

export default RightSidebar

