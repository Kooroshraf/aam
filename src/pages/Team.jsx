import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { members as baseMembers } from "../members";

function MemberCard({ m, onOpen }) {
  return (
    <article className="rounded-3xl border border-slate-200 p-6 bg-white/80">
      {m.photo ? <img src={m.photo} alt={`${m.name} headshot`} className="h-44 w-full object-cover rounded-2xl" /> : <div className="h-44 w-full rounded-2xl bg-slate-200" />}
      <button onClick={onOpen} className="mt-4 text-left text-xl font-semibold text-teal-700 hover:underline">
        {m.name}
      </button>
      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{m.role}</p>
    </article>
  );
}
// (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))

function Modal({ member, onClose }) {
  if (!member) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-[101] w-full max-w-3xl rounded-3xl bg-white shadow-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-6">
          {member.photo ? <img src={member.photo} alt="headshot" className="h-28 w-28 object-cover rounded-2xl" /> : <div className="h-28 w-28 rounded-2xl bg-slate-200" />}
          <div className="grow">
            <h3 className="text-2xl font-semibold text-teal-800">{member.name}</h3>
            <p className="mt-1 text-sm text-slate-700">{member.role}</p>
            {member.email && <p className="mt-1 text-sm text-slate-600">{member.email}</p>}
            {member.affiliation && <p className="mt-1 text-sm text-slate-600">{member.affiliation}</p>}
          </div>
          <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50" onClick={onClose}>Close</button>
        </div>
        <hr className="my-4" />
        <p className="whitespace-pre-line leading-7 text-slate-800">{member.bio}</p>
        {member.links?.length ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {member.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full border px-3 py-1 text-sm hover:bg-slate-50">{l.label}</a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Team() {
  const topIds = ["abdollah-homaifar","ali-karimoddini","daniel-findley","evan-arnold","rongfang-rachel-liu"];
  const members = useMemo(() => {
    const top = topIds.map(id => baseMembers.find(m => m.id === id)).filter(Boolean);
    const rest = baseMembers.filter(m => !topIds.includes(m.id)).sort((a,b)=> a.name.localeCompare(b.name));
    return [...top, ...rest];
  }, []);
  const [active, setActive] = useState(null);
// (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
  return (
    <div className="min-h-screen w-full bg-[#F8F3EA] text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 grid place-items-center rounded-lg bg-teal-700 text-white font-bold">N</div>
            <div className="leading-tight">
              <p className="text-xs tracking-wide text-slate-600">NCDOT</p>
              <p className="text-sm font-semibold">Center of Excellence</p>
              <p className="text-xs -mt-0.5">Advanced Air Mobility (AAM)</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/" className="hover:text-teal-700">Home</Link>
          </nav>
          <a href="mailto:Rahmari@aggies.ncat.edu" className="hidden md:inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-slate-50">contact us</a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <h1 className="text-5xl font-semibold text-teal-700">Members</h1>
        <p className="mt-3 text-slate-700">Click a name to view full bio and details.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {members.map((m) => (
            <MemberCard key={m.id} m={m} onOpen={() => setActive(m)} />
          ))}
        </div>
      </main>
      {/* (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) */}

      <Modal member={active} onClose={() => setActive(null)} />
      <footer className="bg-[#0B1E26] text-white py-6 text-center text-sm">© {new Date().getFullYear()} NCDOT Center of Excellence – Advanced Air Mobility (AAM)</footer>
    </div>
  );
}
