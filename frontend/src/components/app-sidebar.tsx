import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Briefcase, Settings, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const linkClass =
  "flex items-center gap-3 px-4 py-2 rounded-lg text-slate-700 transition-colors hover:bg-gradient-to-r hover:from-violet-100 hover:to-sky-100 hover:text-violet-700";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-violet-50 via-white to-sky-50 min-h-screen shadow-xl border-r border-violet-200/60">
      <div className="p-6 flex flex-col h-full justify-between">
        <SidebarHeader className="text-center border-b border-violet-200/60 pb-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">VoiceHire</h1>
          <p className="text-xs text-slate-500">AI-Powered Recruiting Automation</p>
        </SidebarHeader>

        <SidebarContent className="mt-8 flex-1">
          <SidebarGroup className="space-y-2">
            <Link href="/" className={linkClass}>
              <Home className="w-5 h-5 text-violet-500" /> Home
            </Link>
            <Link href="/create/jobs" className={linkClass}>
              <Briefcase className="w-5 h-5 text-sky-500" /> Job Postings
            </Link>
            <Link href="/create/jobs/1/candidate" className={linkClass}>
              <Users className="w-5 h-5 text-emerald-500" /> Candidates
            </Link>
            <Link href="/create/schedule" className={linkClass}>
              <Calendar className="w-5 h-5 text-amber-500" /> Schedule
            </Link>
            <Link href="/create/settings" className={linkClass}>
              <Settings className="w-5 h-5 text-rose-500" /> Settings
            </Link>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-violet-200/60 pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} VoiceHire</p>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
