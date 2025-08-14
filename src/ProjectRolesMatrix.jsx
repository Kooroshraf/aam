import React from "react";

const PROJECT_COLS = [
  { id: "1", label: "Project 1" },
  { id: "2", label: "Project 2" },
  { id: "3", label: "Project 3" },
  { id: "4", label: "Project 4" },
];

// Map: memberId -> { [projectId]: "Lead" | "Co-Lead" | "Member" }
const PROJECT_ROLES = {
  "abdollah-homaifar": { "3": "Lead" },
  "ali-karimoddini": { "1": "Lead" },
  "shoaib-samandar": { "1": "Co-Lead" },
  "farhan-gandhi": { "3": "Co-Lead" },
  "evan-arnold": { "2": "Lead" },
  "kuldeep-rawat": { "2": "Co-Lead", "4": "Co-Lead" },
  "daniel-findley": { "4": "Lead" },
  "rongfang-rachel-liu": { "4": "Member" },
  "christopher-cunningham": { "1": "Member" },
  "steve-bert": { "4": "Member" },
  "george-list": { "1": "Member", "4": "Member" },
  "kevin-kupietz": { "3": "Member" },
  "scott-bradshaw": { "3": "Member" },
  "chandra-bhushan-asthana": { "4": "Member" },
  "elton-stone": { "4": "Member" },
  "parham-kebria": { "3": "Member" },
  "vahid-hemmati": { "3": "Member" },
  "reza-ahmari": { "3": "Member" }
};

function RolePill({ role }) {
  if (!role) return null;
  const styles =
    role === "Lead"
      ? "bg-red-500/90 text-white"
      : role === "Co-Lead"
      ? "bg-sky-500/90 text-white"
      : "bg-green-500/90 text-white";
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${styles}`}>
      {role}
    </span>
  );
}

/**
 * (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
 * Props:
 * - members: MEMBERS array 
 * - onMemberClick(member): called when a name is clicked (use setActive(member))
 */
export default function ProjectRolesMatrix({ members, onMemberClick }) {
  const rows = members.filter((m) => PROJECT_ROLES[m.id]);

  return (
    <section id="roles-matrix" className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-teal-700">
          Project Roles Matrix
        </h3>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded bg-red-500" /> Lead
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded bg-sky-500" /> Co-Lead
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded bg-green-500" /> Member
          </span>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="sticky left-0 z-10 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                  Name
                </th>
                {PROJECT_COLS.map((col) => (
                  <th key={col.id} className="px-4 py-3 text-left font-semibold text-slate-700">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((m, idx) => (
                <tr key={m.id} className={idx % 2 ? "bg-white" : "bg-slate-50/40"}>
                  {/* Name cell: button opens existing MemberModal */}
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-3">
                    <button
                      type="button"
                      className="text-teal-700 hover:underline font-medium"
                      onClick={() => onMemberClick?.(m)}
                      onAuxClick={(e) => {
                        // middle-click opens members page (optional)
                        if (e.button === 1) window.location.hash = "#/members";
                      }}
                      onKeyDown={(e) => {
                        // Ctrl/Cmd+Enter to jump to members page (optional)
                        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                          window.location.hash = "#/members";
                        }
                      }}
                      title="Click to view bio"
                    >
                      {m.name}
                    </button>
                  </td>

                  {PROJECT_COLS.map((col) => (
                    <td key={col.id} className="px-4 py-3">
                      <RolePill role={PROJECT_ROLES[m.id]?.[col.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Tip: Middle-click a name to open the Members page; normal click opens the bio modal.
        </p>
      </div>
    </section>
  );
}
