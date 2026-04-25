import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Briefcase, Settings, Users, Calendar } from "lucide-react";
import Link from "next/link";

const linkClass =
  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-gray-900 to-black w-64 min-h-screen shadow-xl border-r border-gray-800">
      <div className="p-6 flex flex-col h-full justify-between">
        <SidebarHeader className="text-center border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-extrabold text-blue-400">VoiceHire</h1>
          <p className="text-xs text-gray-500">AI-Powered Recruiting Automation</p>
        </SidebarHeader>

        <SidebarContent className="mt-8 flex-1">
          <SidebarGroup className="space-y-2">
            <Link href="/" className={linkClass}>
              <Home className="w-5 h-5 text-blue-400" /> Home
            </Link>
            <Link href="/create/jobs" className={linkClass}>
              <Briefcase className="w-5 h-5 text-blue-400" /> Job Postings
            </Link>
            <Link href="/create/jobs/1/candidate" className={linkClass}>
              <Users className="w-5 h-5 text-blue-400" /> Candidates
            </Link>
            <Link href="/create/schedule" className={linkClass}>
              <Calendar className="w-5 h-5 text-blue-400" /> Schedule
            </Link>
            <Link href="/create/settings" className={linkClass}>
              <Settings className="w-5 h-5 text-blue-400" /> Settings
            </Link>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="text-center border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} VoiceHire</p>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
