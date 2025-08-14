
// (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
// ###################################### WITH PROJECTS ######################################
import { useEffect, useMemo, useState } from "react";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const push = (to) => {
    if (!to.startsWith("#/")) to = "#/" + to.replace(/^#?\/?/, "");
    window.location.hash = to;
  };
  return { hash, push, path: hash.replace(/^#/, "") };
}

// --- Small helper to render images with a safe fallback ---
function ImageWithFallback({ src, alt, className }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    // (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
    return (
      <div
        className={className}
        style={{ backgroundColor: "#e5e7eb", borderRadius: "1rem" }}
        aria-label="No photo available"
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
    />
  );
}

// --- Data model for members ((Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))) ---
const MEMBERS = [
  {
    id: "abdollah-homaifar",
    name: "Abdollah (Ebbie) Homaifar",
    role: "Professor — North Carolina A&T State University",
    email: "homaifar@ncat.edu",
    affiliation: "North Carolina A&T State University",
    bio:
      "NASA Langley Distinguished Chair Professor; Duke Energy Eminent Professor; Director, ACIT Institute; and Director, TECHLAV Center for testing, evaluation, and control of heterogeneous large-scale autonomous vehicle systems. Dr. Homaifar leads research in autonomous systems, control, and AI-driven test and evaluation.",
    links: [{ label: "TECHLAV", href: "https://techlav.ncat.edu/" },
      { label: "S2A2 NASA ULI", href: "https://s2a2.ncat.edu/" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=f2Bj8pMAAAAJ" }
    ],
    photo: "members/abdollah-ebbie.jpg"
  },
  {
    id: "ali-karimoddini",
    name: "Ali Karimoddini",
    role:
      "Professor; Director, CR2C2 Regional University Transportation Center — North Carolina A&T State University",
    email: "akarimod@ncat.edu",
    affiliation: "North Carolina A&T State University",
    bio:
      "Dr. Karimoddini directs the CR2C2 Regional University Transportation Center, the NC-CAV Center of Excellence in Advanced Transportation Technology, and the Autonomous Cooperative Control of Emergent Systems of Systems (ACCESS) Laboratory.",
    links: [{ label: "ACCESS Lab", href: "https://www.accesslab.net/people/ali-karimoddini" }],
    photo: "members/ali.jpg"
  },
  {
    id: "daniel-findley",
    name: "Daniel Findley",
    role: "Associate Director — ITRE, NC State University",
    email: "daniel_findley@ncsu.edu",
    affiliation: "Institute for Transportation Research and Education (ITRE)",
    bio:
      "Dr. Daniel Findley, P.E., is an Associate Director with ITRE at NC State University. He specializes in economic impact analysis, multimodal transportation, human behavior research, and transportation engineering studies. He holds a Ph.D. in Civil Engineering from NC State and is a licensed Professional Engineer. He also serves as an Adjunct Associate Professor in CCEE at NC State.",
    links: [{ label: "Website", href: "https://sites.google.com/ncsu.edu/daniel-findley" }],
    photo: "members/daniel.jpg"
  },
  {
    id: "evan-arnold",
    name: "Evan Arnold",
    role: "Program Manager — ITRE, NC State University",
    email: "eparnold@ncsu.edu",
    affiliation: "Institute for Transportation Research and Education (ITRE)",
    bio:
      "Evan Arnold is a Program Manager with ITRE in Raleigh, NC. He has been part of ITRE’s UAS program since 2015, including ASSURE Center of Excellence work such as A6 Surveillance Criticality (ADS-B & TCAS readiness for DAA). His research includes NCDOT Division of Aviation support, disaster response during Hurricane Florence, and studies on drone-delivered AEDs with UNC and Duke medical schools.",
    links: [
      { label: "ORCID", href: "https://orcid.org/0000-0002-7725-9067" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=ytv1RcQAAAAJ" },
    ],
    photo: "members/evan.jpg"
  },
  {
    id: "vahid-hemmati",
    name: "Vahid Hemmati",
    role: "Post Doc Research Associate",
    email: "vhemmati@ncat.edu",
    affiliation: "North Carolina A&T State University",
    bio: "Dr. Hemmati is a Postdoctoral Researcher at the Autonomous Control and Information Technology (ACIT) Institute, North Carolina A&T State University, working on NASA’s University Leadership Initiative to advance autonomous aerial and ground vehicles through sensor fusion, AI, and control systems.",
    links: [{ label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=AVL4A30AAAAJ" }],
    photo: "members/vahid.jpg"
  },
  {
    id: "parham-kebria",
    name: "Parham Kebria",
    role: "Post Doc Research Associate",
    email: "pmkebria@ncat.edu",
    affiliation: "North Carolina A&T State University",
    bio:"Dr. Kebria is a Postdoctoral Researcher at the Autonomous Control and Information Technology (ACIT) Institute, North Carolina A&T State University, working on NASA’s University Leadership Initiative to advance autonomous aerial and ground vehicles through sensor fusion, AI, and control systems.",
    links: [{ label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=J18BkakAAAAJ" }],
    photo: "members/parham.png"
  },
  {
    id: "rongfang-rachel-liu",
    name: "Rongfang (Rachel) Liu",
    role: "UPS Endowed Professor; Director of Transportation Institute — NC A&T",
    email: "rrliu@ncat.edu",
    affiliation: "Transportation Institute, NC A&T State University",
    bio:
      "Dr. Liu brings expertise in intermodal transportation planning/engineering, automated transportation, and supply chain management, with leadership across consulting, academia, and government, and extensive TRB service. She will co-lead community outreach and workforce development for the AAM CoE.",
    links: [],
    photo: "members/rongfang.jpg"
  },
  {
    id: "scott-bradshaw",
    name: "Scott D. Bradshaw",
    role: "Professor of Psychology — Elizabeth City State University",
    email: "sdbradshaw@ecsu.edu",
    affiliation: "Elizabeth City State University",
    bio:
      "Dr. Bradshaw provides project evaluation and behavioral science expertise. He has conducted program evaluations with on- and off-campus partners, with funders including NIH (MARC and U-RISE), NASA (MUREP), SAS, and NCDOT. He was Co-PI of the HBCU Health Equity Data Consortium’s COVID-19 impact project at ECSU funded by NC DHHS. His current research examines climate change and human behavior, with emphasis on environmental effects on health.",
    links: [
      { label: "ORCID", href: "https://orcid.org/0000-0002-7368-3637" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/scott-bradshaw-88250113" },
    ],
    photo: "members/Bradshaw.png"
  },
  {
    id: "christopher-cunningham",
    name: "Christopher Michael Cunningham",
    role:
      "Director, Highway Systems Group; Associate Director for Research — ITRE, NC State University",
    email: "cmcunnin@ncsu.edu",
    affiliation:
      "Institute for Transportation Research and Education (ITRE), NC State University",
    bio:
      "Chris Cunningham directs the Highway Systems Group at ITRE and has been with the institute for over 22 years. His expertise includes traffic signals and multimodal safety/operations. He has overseen the Traffic Systems Innovation Program (TSIP), deploying specialized data collection applications and systems — including UAS. Sponsors include NCHRP, FHWA, FMCSA, NCDOT, ITE, NIH, NCGHSP, and 3M; he has assisted or led 60+ projects.",
    photo: "members/christopher-michael.jpg"
  },
  {
    id: "elton-stone",
    name: "Mr. Elton Lee Stone",
    role: "Aviation/UAS Lecturer — Elizabeth City State University",
    email: "elstone@ecsu.edu",
    affiliation: "Elizabeth City State University (ECSU)",
    bio:
      "Elton Stone is the Aviation/UAS Lecturer at ECSU. His career includes 26 years of Naval active duty as Chief Aviation Structural Mechanic, Director of Aviation at College of the Albemarle, and Aerospace Coach for the Northeast Academy for Aerospace and Advanced Manufacturing. Certifications include FAA A&P mechanic, FAA Part 107 Remote Pilot, composite repair trainer, and OSHA 10/30. He teaches UAS intro, certification, operations, mapping/surveying, and design on various quadcopters, and has trained with the ALTI Reach fixed-wing platform.",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/elton-stone-1b679b46" }],
    photo: "members/elton.jpg"
  },
  {
    id: "george-list",
    name: "George List",
    role:
      "Professor — Civil, Construction, and Environmental Engineering, NC State University",
    email: "gflist@ncsu.edu",
    affiliation:
      "Department of Civil, Construction, and Environmental Engineering, NC State University",
    bio:
      "Dr. George List, PhD, PE, is a Professor in CCEE at NC State with nearly 50 years in academia and consulting. A nationally recognized scholar in network operations modeling and control, freight network planning, and asset management, he will focus on observability, controllability, and reachability as they relate to UAVs.",
    links: [{ label: "Profile", href: "https://ccee.ncsu.edu/people/gflist/" }],
    photo: "members/george.jpg"
  },
  {
    id: "kevin-kupietz",
    name: "Kevin Kupietz",
    role:
      "Chair, Dept. of Aviation & Emergency Management; Associate Professor — Elizabeth City State University",
    email: "kdkupietz@ECSU.edu",
    affiliation: "Elizabeth City State University",
    bio:
      "Dr. Kevin Kupietz is Chair of the ECSU Department of Aviation and Emergency Management and a NC-certified Firefighter/Paramedic with over 30 years of emergency response experience. His teaching certifications span numerous emergency service topics. Academic interests include responder safety, functional needs in disasters, preparedness education, business resiliency, drones, and leadership.",
    links: [
      { label: "ORCID", href: "https://orcid.org/0000-0002-7940-3384" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kevin-kupietz-ph-d-efo-1059746b/" },
    ],
    photo: "members/kevin.jpg"
  },
  {
    id: "farhan-gandhi",
    name: "Farhan Gandhi",
    role:
      "Dr. Hassan A Hassan Distinguished Professor of Aerospace Engineering — NC State University",
    email: "fsgandhi@ncsu.edu",
    affiliation: "Mechanical and Aerospace Engineering, NC State University",
    bio:
      "Prof. Gandhi is a Fellow of AIAA, RAeS, and VFS, and a leading expert on VTOL aeromechanics and eVTOL platforms. He held a Joint Faculty Appointment with the US Army Research Lab (2018–2021). Over 30 years he has published 370+ papers, advised 31 PhD students, delivered numerous keynotes, and led research spanning interactional aerodynamics, aeroacoustics, controls and flying qualities, fault identification/tolerance, vibration reduction, configuration design, multi-fidelity modeling/digital twins, and flight testing for multi-rotor eVTOLs.",
    photo: "members/farhan.jpg"
  },
  {
    id: "chandra-bhushan-asthana",
    name: "Chandra Bhushan Asthana",
    role: "Associate Professor — ECSU (Program Coordinator, Unmanned Aircraft Systems)",
    email: "cbasthana@ecsu.edu",
    affiliation: "Elizabeth City State University",
    bio:
      "Dr. Asthana has industry and academic experience with Air India, DRDO (Hyderabad), CAE (Canada), Lockheed Martin (Netherlands), and teaching at McGill and Concordia. Research interests include aviation, aerodynamics, control system design, modeling, simulation, and UAVs.",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=W-72tBcAAAAJ" },
      { label: "ORCID", href: "https://orcid.org/0000-0001-5090-230X" },
    ],
    photo: "members/chandra-bhushan.jpg"
  },
  {
    id: "kuldeep-rawat",
    name: "Kuldeep S. Rawat",
    role: "Thorpe Endowed Professor & Dean — ECSU; Director, Aviation Science",
    email: "ksrawat@ecsu.edu",
    affiliation: "Elizabeth City State University",
    bio:
      "Dr. Rawat leads ECSU’s flagship Aviation Science program, managing aircraft/facilities acquisition and strategic growth. Interests: data science, ML, UAS applications, AI/ML in higher education, workforce development, and educational technologies. Co-PI on Project 2 and 4; institutional liaison.",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/kuldeeprawat3010239" }],
    photo: "members/rawat.jpg"
  },
  {
    id: "shoaib-samandar",
    name: "Shoaib Samandar",
    role: "Senior Research Scholar & Adjunct Assistant Professor — ITRE/CCEE, NC State",
    email: "smsamand@ncsu.edu",
    affiliation: "ITRE and Department of CCEE, NC State University",
    bio:
      "Dr. Samandar specializes in connected/automated vehicles, traffic operations, ITS, and simulation-based analysis. He holds a Ph.D. in Civil Engineering from NC State and serves as Adjunct Assistant Professor in CCEE.",
    links: [],
    photo: "members/shoaib.jpg"
  },
  {
    id: "steve-bert",
    name: "Steve Bert",
    role: "Program Manager, Economics & Policy Assessment Group — ITRE",
    email: "stevebert@ncsu.edu",
    affiliation: "Institute for Transportation Research and Education (ITRE)",
    bio:
      "Mr. Bert manages the Economics & Policy Assessment Group at ITRE. Expertise in benefit–cost and economic impact analysis, development, data analysis/visualization, and transportation planning. Projects with FAA, FHWA, NCHRP, ACRP, NCDOT, NAS, and NCGHSP. AICP-licensed planner.",
    links: [{ label: "Website", href: "https://sites.google.com/ncsu.edu/stevenbert/home" }],
    photo: "members/steve.jpg"
  },
  {
    id: "reza-ahmari",
    name: "Reza Ahmari",
    role: "Software Developer | Website Owner",
    email: "Rahmari@aggies.ncat.edu",
    affiliation: "North Carolina A&T State University",
    bio: "Mr. Ahmari is a Ph.D. student in Computer Science at North Carolina A&T State University, recently graduated with an M.S. in the same field. He conducts his research at the Autonomous Control and Information Technology (ACIT) Institute, specializing in AI-driven navigation and perception for autonomous aerial and ground vehicles.",
    links: [{ label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=b_gFFUcAAAAJ" }],
    photo: "members/reza.jpg"
  },
];

// ===================== PROJECTS DATA (for routes & modal) =====================
// <<< added
// ===================== PROJECTS DATA (for routes & modal) =====================
const PROJECTS = [
  {
    id: "1",
    title: "Project 1: Integrated Urban Surface and Air Mobility",
    text:
      "Digital twin & simulation to evaluate how AAM/UAS integrate with existing surface transportation — connectivity, infrastructure impact, traveler behavior, and economics.",
    bullets: [
      "City-scale scenarios; route optimization and communications",
      "Policy/planning insights for multimodal operations in NC",
    ],
    leads: ["Ali Karimoddini (NCAT)", "Shoaib Samandar (NCSU)"],
    teamMembers: ["Christopher Cunningham", "George List"],
    tasks: [
      "Survey existing standards, CONOPS, and simulation platforms for UAM & AV integration",
      "Develop a simulation environment for surface transportation",
      "Develop a simulation environment for Urban Air Mobility",
      "Develop an integrated simulation environment for surface + air mobility",
      "Identify use cases and run simulations",
      "Final report",
    ],
    deliverables: [
      "Evaluation of integrating AAM/UAS into NC surface transportation modes",
      "Comprehensive review of standards, simulation platforms, and concepts of operations for integrated surface & air operations",
      "Report on the integrated simulation framework for air and surface transportation",
      "Simulation results for use cases (e.g., AAM + road transport, cargo/package delivery with ground systems, emergency medical delivery, and infrastructure impacts such as vertiports, PSUs, charging stations)",
    ],
  },
  {
    id: "2",
    title: "Project 2: UAS/AAM for Emergency Response in Rural Areas",
    text:
      "Scenario-based demonstrations and stakeholder engagement to enhance disaster recovery, medical delivery, and rapid response, integrated with existing infrastructure.",
    bullets: [
      "Assess deployments, identify gaps and opportunities",
      "Recommendations for statewide resilience strategies",
    ],
    leads: ["Evan Arnold (NCSU)", "Kuldeep S. Rawat (ECSU)"],
    teamMembers: ["Kevin Kupietz", "Scott D. Bradshaw"],
    tasks: [
      "Comprehensive assessment of UAS & AAM deployment in rural emergency response",
      "Explore impacts of UAS emergency response on transportation modes",
    ],
    deliverables: [
      "Methods to enhance rural emergency response using UAS/AAM",
      "Task 1: Qualitative & quantitative comparison of traditional vs. UAS/AAM emergency response techniques",
      "Task 2: Report on transportation management impacts of existing emergency response use cases and scoping for expanded operations",
    ],
  },
  {
    id: "3",
    title: "Project 3: Safe & Reliable eVTOL Operations for Regional Mobility",
    text:
      "Validated framework for navigation safety, energy demands, operational risk, and performance under failures for regional passenger transport.",
    bullets: ["Use cases, simulation, and risk models", "Inputs to regulatory and operational standards"],
    leads: ["Abdollah Homaifar (NCAT)", "Farhan Gandhi (NCSU)"],
    teamMembers: ["Vahid Hemmati (NCAT)", "Parham Kebria"],
    tasks: [
      "Kickoff meeting",
      "Literature review",
      "Investigate safe & efficient navigation strategies for regional eVTOL use cases",
      "Develop evaluation & assessment framework for energy demand and hazard assessment",
      "Analyze safe & reliable operations of eVTOLs post-failure (NC context)",
      "Scaled mixed-reality operation of multiple routes",
      "Final report",
    ],
    deliverables: [
      "Approach for safe & reliable integration of eVTOLs in regional operations",
      "Example simulation flight data & safe navigation trajectories for different eVTOL vehicles",
      "Simulation framework for eVTOL energy-demand evaluation & hazard assessment",
      "Models, simulation results, and analysis of eVTOL aircraft with propulsion faults/failures",
    ],
  },
  {
    id: "4",
    title: "Project 4: AAM Infrastructure & Workforce Development",
    text:
      "Analysis of infrastructure, workforce, policy, economics, environmental considerations, and certification needs; forecasts through 2045.",
    bullets: [
      "Dashboards and recommendations for NCDOT and stakeholders",
      "Emphasis on inclusive, sustainable implementation",
    ],
    leads: ["Daniel Findley (NCSU)", "Kuldeep S. Rawat (ECSU)"],
    teamMembers: ["Rongfang R. Liu", "Steve Bert", "George List", "Chandra B. Asthana", "Elton L. Stone"],
    tasks: [
      "Investigate existing aviation infrastructure",
      "AAM cargo & passenger mobility economic impact",
      "Workforce & operator certification",
      "Community impact, public acceptance, and labor force development",
    ],
    deliverables: [
      "Support guidance for infrastructure & workforce needed for AAM deployment",
      "List of AAM use cases supported by NC general-aviation airports",
      "Site-suitability criteria for each AAM use case",
      "NC general-aviation airports with suitability scores by use case",
      "Write-ups of literature, data, and methods for Tasks 1 & 2",
      "Direct/indirect/induced jobs, earnings, output, and tax revenue from AAM economic impact",
      "Curriculum for AAM pilot training",
      "Training programs for autonomous AAM operators",
      "Evaluation of BVLOS rule",
      "Guidance for community engagement and buy-in",
      "Review of aviation job market and AAM interactions",
    ],
  },
];


// ==== UI: Team card & modal use (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) ====
function TeamCard({ name, role, photo, onClick }) {
  return (
    <article className="rounded-3xl border border-slate-200 p-6 bg-white/80">
      <ImageWithFallback
        src={photo}
        alt={name}
        className="w-full aspect-[4/3] object-contain rounded-2xl bg-white"
      />
      <button onClick={onClick} className="mt-4 text-left text-xl font-semibold text-teal-700 hover:underline">
        {name}
      </button>
      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{role}</p>
    </article>
  );
}

function MemberModal({ member, onClose }) {
  if (!member) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-[201] w-full max-w-3xl rounded-3xl bg-white shadow-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-6">
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            className="h-28 w-28 object-cover rounded-2xl"
          />
          <div className="grow">
            <h3 className="text-2xl font-semibold text-teal-800">{member.name}</h3>
            <p className="mt-1 text-sm text-slate-700">{member.role}</p>
            {member.email && <p className="mt-1 text-sm text-slate-600">{member.email}</p>}
            {member.affiliation && <p className="mt-1 text-sm text-slate-600">{member.affiliation}</p>}
          </div>
          <button
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <hr className="my-4" />
        <p className="whitespace-pre-line leading-7 text-slate-800">{member.bio}</p>
        {member.links?.length ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {member.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full border px-3 py-1 text-sm hover:bg-slate-50">
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MembersPage({ push }) {
  const [active, setActive] = useState(null);
  return (
    <div className="min-h-screen bg-[#F8F3EA] pb-16">
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-semibold text-teal-700">Members</h2>
          <button onClick={() => push("/")} className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50">← Back</button>
        </div>
        <p className="mt-4 text-slate-700 max-w-3xl">Click a member’s name to view their full bio and details.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {MEMBERS.map((m) => (
            <TeamCard
              key={m.id}
              name={m.name}
              role={m.role}
              photo={m.photo}
              onClick={() => setActive(m)}
            />
          ))}
        </div>
      </div>
      <MemberModal member={active} onClose={() => setActive(null)} />
    </div>
  );
}

// ===================== PROJECTS UI (grid + modal + route (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))) =====================
function ProjectCard({ project, onOpen }) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/20 p-6">
      <h3 className="text-2xl font-semibold text-teal-200">{project.title}</h3>
      <p className="mt-3 text-slate-200">{project.text}</p>
      <ul className="mt-4 space-y-2 list-disc pl-5 text-slate-200">
        {project.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <button
        className="mt-5 inline-flex rounded-full border-2 border-teal-400 px-4 py-2 text-sm text-teal-200 hover:bg-white hover:text-teal-700 transition"
        onClick={() => onOpen(project)}
      >
        View details
      </button>
    </div>
  );
}

// simple modal (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-[101] w-full max-w-3xl rounded-3xl bg-white shadow-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-6">
          <div className="grow">
            <h3 className="text-2xl font-semibold text-teal-800">{project.title}</h3>
          </div>
          <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50 text-slate-900" onClick={onClose}>
            Close
          </button>
        </div>

        <hr className="my-4" />

        {/* Intro text */}
        {project.text && <p className="leading-7 text-slate-800">{project.text}</p>}

        {/* Leads */}
        {project.leads?.length ? (
          <>
            <h4 className="mt-6 text-lg font-semibold text-teal-700">Leads & Co-Leads</h4>
            <ul className="mt-2 list-disc pl-5 text-slate-800">
              {project.leads.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </>
        ) : null}

        {/* Team */}
        {project.teamMembers?.length ? (
          <>
            <h4 className="mt-6 text-lg font-semibold text-teal-700">Team Members</h4>
            <ul className="mt-2 list-disc pl-5 text-slate-800">
              {project.teamMembers.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </>
        ) : null}

        {/* Tasks */}
        {project.tasks?.length ? (
          <>
            <h4 className="mt-6 text-lg font-semibold text-teal-700">Tasks</h4>
            <ul className="mt-2 list-disc pl-5 text-slate-800">
              {project.tasks.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </>
        ) : null}

        {/* Deliverables */}
        {project.deliverables?.length ? (
          <>
            <h4 className="mt-6 text-lg font-semibold text-teal-700">Deliverables</h4>
            <ul className="mt-2 list-disc pl-5 text-slate-800">
              {project.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

// ---------- Roles Matrix (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) ----------
function ProjectRolesMatrix({ onMemberClick }) {
  // Use FIRST + LAST name key; ignore titles, initials, and parentheticals
  const norm = (s) => {
    if (!s) return "";
    // lower, remove things in parentheses, and common titles (dr, mr, prof)
    s = s
      .toLowerCase()
      .replace(/\(.*?\)/g, " ")
      .replace(/\b(dr|mr|mrs|ms|prof|professor)\.?/g, " ");
    // keep only letters, split to tokens
    const tokens = s.replace(/[^a-z]+/g, " ").trim().split(/\s+/);
    if (!tokens.length) return "";
    const first = tokens[0];
    const last = tokens[tokens.length - 1];
    return `${first} ${last}`;
  };


  const nameIndex = new Map(MEMBERS.map((m) => [norm(m.name), m])); 

  const roleByProjAndName = PROJECTS.reduce((acc, proj) => {
    const pid = proj.id;
    acc[pid] = acc[pid] || {};

    // First item in "leads" treated as Lead; others as Co-Lead
    (proj.leads || []).forEach((full, i) => {
      const n = norm(full);
      acc[pid][n] = i === 0 ? "Lead" : "Co-Lead";
    });

    // Team members
    (proj.teamMembers || []).forEach((full) => {
      const n = norm(full);
      if (!acc[pid][n]) acc[pid][n] = "Member";
    });

    return acc;
  }, {});

  // Role badge
  const Badge = ({ role }) => {
    const cls =
      role === "Lead"
        ? "bg-red-500 text-white"
        : role === "Co-Lead"
        ? "bg-sky-400 text-white"
        : "bg-green-400 text-black";
    return (
      <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${cls}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="overflow-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white border-b p-3 text-left">Name</th>
            {PROJECTS.map((p) => (
              <th key={p.id} className="border-b p-3 text-left">{`Project ${p.id}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEMBERS.map((m, idx) => {
            const nm = norm(m.name);
            return (
              <tr key={m.id} className={idx % 2 ? "bg-slate-50" : ""}>
                {/* Name cell clickable to open the member modal (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) */}
                <td className="sticky left-0 z-10 bg-inherit border-b p-3">
                  <button
                    className="text-teal-700 hover:underline font-medium"
                    onClick={() => onMemberClick?.(m)}
                    type="button"
                  >
                    {m.name}
                  </button>
                </td>

                {/* Project role cells */}
                {PROJECTS.map((p) => {
                  const role = roleByProjAndName[p.id]?.[nm];
                  return (
                    <td key={p.id} className="border-b p-3 align-top">
                      {role ? <Badge role={role} /> : <span className="text-slate-400">—</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Modal wrapper that shows the matrix (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) ----------
function RolesModal({ open, onClose, onMemberClick }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-[106] w-full max-w-6xl rounded-3xl bg-white shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-2xl font-semibold text-teal-800">
            Team Roles Across Projects
          </h3>
          <button
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            Close
          </button>
        </div>
        <hr className="my-4" />
        <ProjectRolesMatrix onMemberClick={onMemberClick} />
      </div>
    </div>
  );
}

function ProjectsPage({ push, initialId }) {
  const [active, setActive] = useState(() => PROJECTS.find(p => p.id === initialId) || null);

  const open = (p) => {
    setActive(p);
    push(`/projects/${p.id}`);
  };
  const close = () => {
    setActive(null);
    push(`/projects`);
  };

  useEffect(() => {
    if (!initialId) return;
    const fromUrl = PROJECTS.find(p => p.id === initialId) || null;
    setActive(fromUrl);
  }, [initialId]);

  return (
    <div className="min-h-screen bg-[#0E2A36] text-white pb-16">
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-semibold text-teal-300">Projects</h2>
          <button onClick={() => push("/")} className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white/10">← Back</button>
        </div>
        <p className="mt-4 text-slate-200 max-w-3xl">Explore our four thrusts. Click a project to view its full details.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={open} />
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={close} />
    </div>
  );
}

export default function App() {
  const { path, push } = useHashRoute();

  // ===== Core team subset for the home page (first 5) (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) =====
  const core = useMemo(() => MEMBERS.slice(0, 4), []);
  const [showAllInline, setShowAllInline] = useState(false);
  const [active, setActive] = useState(null);
  const [openProjMenu, setOpenProjMenu] = useState(false); // <-- moved ABOVE route returns
  const [activeProjectHome, setActiveProjectHome] = useState(null); // <-- NEW
  const [showRoles, setShowRoles] = useState(false); // <-- add this

  // ===================== ROUTES for Projects & Members (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) =====================
  if (path.startsWith("/projects")) {
    const parts = path.split("/");
    const initialId = parts[2]; 
    return <ProjectsPage push={push} initialId={initialId} />;
  }
  if (path.startsWith("/members")) {
    return <MembersPage push={push} />;
  }

const handleNavClick = (e, targetId) => {
  e.preventDefault();

  // If we're already on home page
  if (window.location.pathname === "/" || window.location.hash === "#/") {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // If we're on a different route, go home first, then scroll
    window.location.href = `#/${targetId ? "" : ""}`;
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // delay to allow page load
  }
};

  return (
    <div className="min-h-screen w-full scroll-smooth text-slate-900">
      {/* NAV */}
      
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="logo-navbar.png" 
              alt="NCDOT Center of Excellence – Advanced Air Mobility"
              className="h-16 w-auto object-contain"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {/*(Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))*/}
            <a
              href="#/"
              className="hover:text-teal-700"
              onClick={(e) => {
                e.preventDefault();
                push("/"); 
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>

            <a href="#partners" className="hover:text-teal-700" onClick={(e) => handleNavClick(e, "partners")}>Partners</a>
            <a href="#team" className="hover:text-teal-700" onClick={(e) => handleNavClick(e, "team")}>Team</a>

            {/* Projects with hover dropdown (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) */}
            {/* added block */}
            <div
              className="relative"
              onMouseEnter={() => setOpenProjMenu(true)}
              onMouseLeave={() => setOpenProjMenu(false)}
            >
              <a
                href="#/projects"
                className="hover:text-teal-700"
                onClick={() => setOpenProjMenu(false)}
              >
                Projects
              </a>
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full min-w-[240px] rounded-2xl border bg-white shadow-lg p-2 pt-2 transition ${
                    openProjMenu ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  onMouseEnter={() => setOpenProjMenu(true)}   
                  onMouseLeave={() => setOpenProjMenu(false)}  
                >
                  {[
                    { id: "1", label: "Project 1" },
                    { id: "2", label: "Project 2" },
                    { id: "3", label: "Project 3" },
                    { id: "4", label: "Project 4" },
                  ].map((p) => (
                    <a
                      key={p.id}
                      href={`#/projects/${p.id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setOpenProjMenu(false)}
                    >
                      {p.label}
                    </a>
                  ))}
                </div>

            </div>

            <a href="#vision" className="hover:text-teal-700" onClick={(e) => handleNavClick(e, "vision")}>Vision</a>
            <a href="#contact" className="hover:text-teal-700" onClick={(e) => handleNavClick(e, "contact")}>Contact</a>
            <a href="#/members" className="hover:text-teal-700">Members</a>
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-slate-50" onClick={(e) => handleNavClick(e, "contact")}>contact us</a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="pt-28 pb-20 bg-[#F8F3EA]">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-teal-700">Advanced Air<br /> Mobility & UAS</h1>
            <p className="mt-8 text-lg leading-8 text-slate-700">North Carolina is advancing a statewide initiative to integrate Advanced Air Mobility (AAM) and Unmanned Aircraft Systems (UAS) into its transportation systems. The UTCoE–AAM & UAS unites researchers from NC A&T, NC State, ECSU, NCDOT, and industry to address mobility, safety, infrastructure, and workforce development statewide.</p>
            <div className="mt-10"><button
              type="button"
              onClick={() => setShowRoles(true)}
              className="inline-flex rounded-full border-2 border-teal-600 px-6 py-3 text-teal-700 font-medium hover:bg-teal-600 hover:text-white transition"
            >
              Mission Overview
            </button>
            </div>
          </div>
          <div className="relative">
            <img src="logo.png" onError={(e)=>e.currentTarget.src='logo.png'} alt="NCDOT AAM Logo" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>


{/* PARTNERS */}
<section
  id="partners"
  className="relative py-20 bg-cover bg-center text-white"
  style={{
    backgroundImage: `url('evtols.png')`, backgroundSize: '100%',      
    backgroundPosition: 'left -1200px',
    backgroundRepeat: 'no-repeat',
  }}
>
  {/* Overlay to adjust transparency (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) */}
  <div className="absolute inset-0 bg-[#0E2A36]/80"></div>

  <div className="relative mx-auto max-w-7xl px-6">
    <h2 className="text-5xl font-semibold text-teal-300">Partners</h2>
    <p className="mt-6 max-w-4xl text-lg text-slate-200">
      The Center aligns with NCDOT strategies and national OSTP priorities and is
      structured around four interrelated thrusts: (1) integrated urban surface & air
      mobility; (2) UAS/AAM for rural emergency response; (3) safe & reliable eVTOL
      operations; (4) infrastructure & workforce.
    </p>
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {[
        {
          title: 'North Carolina A&T State University',
          bullets: [
            'Autonomous Control and Information Technology (ACIT) Institute',
            'NASA University Leadership Initiative – Safe & Secure Assured Autonomy (S2A2)',
            'Center for Regional and Rural Connected Communities (CR2C2)',
          ],
        },
        {
          title: 'North Carolina State University',
          bullets: ['Institute for Transportation Research and Education (ITRE)'],
        },
        {
          title: 'Elizabeth City State University',
          bullets: ['Department of Aviation and Emergency Management'],
        },
      ].map((card) => (
        <div
          key={card.title}
          className="relative rounded-3xl bg-white/10 p-6 backdrop-blur border border-white/20"
        >
          <h3 className="text-2xl font-semibold text-teal-200">{card.title}</h3>
          <ul className="mt-4 space-y-3 text-slate-200 list-disc pl-5">
            {card.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* TEAM (show core; link to full members page) */}
      <section id="team" className="py-20 bg-[#F8F3EA]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-5xl font-semibold text-teal-700">Our Team</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {core.map((m) => (
              <TeamCard
                key={m.id}
                name={m.name}
                role={m.role}
                photo={m.photo}
                onClick={() => setActive(m)}
              />
            ))}
          </div>
          {showAllInline && (
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {MEMBERS.slice(5, 9).map((m) => (
                <TeamCard
                  key={m.id}
                  name={m.name}
                  role={m.role}
                  photo={m.photo}
                  onClick={() => setActive(m)}
                />
              ))}
            </div>
          )}
          <div className="mt-8 text-center flex items-center justify-center gap-3 flex-wrap">
            <button onClick={() => push('/members')}
            className="inline-flex rounded-full border-2 border-teal-600 px-6 py-3 text-teal-700 font-medium hover:bg-teal-600 hover:text-white transition">
            More Team Members
            </button>

          </div>
        </div>
        <MemberModal member={active} onClose={() => setActive(null)} />
        <RolesModal open={showRoles} onClose={() => setShowRoles(false)} onMemberClick={(m) => setActive(m)} />

      </section>

      {/* VISION
      ... (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
      */}
 
      {/* PROJECTS */}
      <section id="projects" className="py-20 bg-[#0E2A36] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-5xl font-semibold text-teal-300">Projects</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProjectHome(p)}
                className="text-left rounded-3xl bg-white/10 border border-white/20 p-6 hover:bg-white/15 transition w-full"
              >
                <h3 className="text-2xl font-semibold text-teal-200">{p.title}</h3>
                <p className="mt-3 text-slate-200">{p.text}</p>
                <ul className="mt-4 space-y-2 list-disc pl-5 text-slate-200">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </button>
            ))}

          </div>
        </div>
      </section>
      <ProjectModal
  project={activeProjectHome}
  onClose={() => setActiveProjectHome(null)}
/>

     {/* VISION */}
      <section id="vision" className="relative py-20 bg-[#F8F3EA] overflow-hidden">
        {/* translucent background image */}
        <div
          className="pointer-events-none absolute inset-0 bg-center bg-cover opacity-60"
          style={{ backgroundImage: "url('vision.jpg')", backgroundPosition: "-70px -90px" }}
          aria-hidden
        />
        {/* optional soft overlay to keep text readable*/}
        <div className="pointer-events-none absolute inset-0 bg-[#F8F3EA]/60" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6">
    <h2 className="text-center text-5xl font-semibold text-teal-700">Our Vision</h2>
    <div className="mt-10 grid gap-8 md:grid-cols-2">
      
      {/* Transparent Box */}
      <div className="rounded-3xl bg-[#0E2A36]/80 text-white p-8 border border-white/20">
        <h3 className="text-3xl font-semibold mb-6">Vision</h3>
        <ul className="space-y-4 list-disc pl-5 text-slate-200 text-lg">
          <li>Extend emergency response using drones and eVTOLs</li>
          <li>Advance real-time simulation and planning for multimodal integration</li>
          <li>Ensure energy-efficient, noise-aware operations in dynamic environments</li>
          <li>Cultivate a skilled and diverse AAM/UAS workforce</li>
        </ul>
      </div>

      {/* Transparent Box */}
      <div className="rounded-3xl bg-[#0E2A36]/80 text-white p-8 border border-white/20">
        <h3 className="text-3xl font-semibold mb-6">Location & Scope</h3>
        <p className="text-lg text-slate-200 leading-8">
          North Carolina, USA — statewide urban & rural integration of AAM and UAS.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2">
          <span className="i-lucide-map-pin" />
          <span>North Carolina</span>
        </div>
      </div>
    </div>
  </div>
      </section>
      {/* CONTACT */}
      <section id="contact" className="py-20 bg-[#0E2A36] text-white relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block" aria-hidden>
          <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
              
              <image
                href="contact2.png"     
                x="-50"
                y="0"
                width="600"
                height="600"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>
        </div>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-5xl font-semibold text-teal-300">Let's work together!</h2>
            <p className="mt-4 text-slate-200">Send us your questions!</p>
            <a href="mailto:Rahmari@aggies.ncat.edu" className="mt-6 inline-flex rounded-full border-2 border-teal-400 px-6 py-3 text-teal-200 font-medium hover:bg-white hover:text-teal-700 transition">contact us</a>
            <div className="mt-10 space-y-6">
              <div><h4 className="text-sm tracking-widest text-teal-300">PHONE</h4><p className="text-lg mt-1">336-493-5421</p></div>
              <div><h4 className="text-sm tracking-widest text-teal-300">EMAIL</h4><p className="text-lg mt-1">Rahmari@aggies.ncat.edu</p></div>
            <div>
              <h4 className="text-sm tracking-widest text-teal-300">REACH US AT</h4>
              <a
                href="https://www.google.com/maps/dir//NC+A%26T+Residence+Hall+Association,+Second+Floor+Office,+Richmond+Hall,+1601+E+Market+St,+Greensboro,+NC+27411/@36.0736185,-79.7734095,16z/data=!3m1!5s0x885318dabef3e749:0x73e9fcbdffa5c92d!4m9!4m8!1m0!1m5!1m1!1s0x8853197d65da5df1:0xd7e99605e76b8235!2m2!1d-79.7749008!2d36.0733195!3e0?entry=ttu&g_ep=EgoyMDI1MDgxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg mt-1 hover:underline"
              >
                1004 Alma Morrow Circle, IRC Building, Room 222, Greensboro, NC 27411 - North Carolina Agricultural and Technical State University

              </a>
            </div>
              </div>
          </div>
        </div>
      </section>

      {/* FOOTER (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421)) */}
      <footer className="bg-[#0B1E26] text-white py-6 text-center text-sm">© {new Date().getFullYear()} - By <a href="mailto:Rahmari@aggies.ncat.edu">Reza Ahmari</a> (Ph.D Student) - NCDOT Center of Excellence – Advanced Air Mobility (AAM)</footer>
    </div>
  );
}
