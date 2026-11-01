import Image from "next/image";
import type { ReactNode, SVGProps } from "react";

/* Icons are copied from the Figma mockup "Mairie360 — Site vitrine" (Composants page)
   and drawn with currentColor so each section sets its own tone. */

function Svg({ size, viewBox, children, ...props }: { size: number; viewBox: string; children: ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <Svg size={20} viewBox="0 0 24 24" strokeWidth={1.8}>
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-7-7 7 7-7 7" />}
    </Svg>
  );
}

export function Logo({ width = 94 }: { width?: number }) {
  return (
    <Image className="logo" src="/images/mairie360-logo.png" width={width} height={Math.round((width * 240) / 313)} alt="" />
  );
}

export function Check({ size = 16 }: { size?: number }) {
  return (
    <Svg size={size} viewBox="0 0 16 16" strokeWidth={1.73}>
      <path d="M3.33 8.33l3 3 6.34-6.66" />
    </Svg>
  );
}

export function Tick() {
  return (
    <Svg size={14} viewBox="0 0 14 14" strokeWidth={1.63}>
      <path d="M2.92 7.29l2.62 2.63 5.54-5.84" />
    </Svg>
  );
}

export function Cross() {
  return (
    <Svg size={16} viewBox="0 0 16 16" strokeWidth={1.6}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </Svg>
  );
}

export type ModuleName = "dashboard" | "projects" | "calendar" | "messages" | "workflows" | "learning";

const modulePaths: Record<ModuleName, ReactNode> = {
  dashboard: (
    <>
      <rect x="1.86" y="1.86" width="4.96" height="4.96" rx="1.24" />
      <rect x="8.06" y="1.86" width="4.96" height="3.1" rx="1.24" />
      <rect x="8.06" y="6.2" width="4.96" height="6.82" rx="1.24" />
      <rect x="1.86" y="8.06" width="4.96" height="4.96" rx="1.24" />
    </>
  ),
  projects: (
    <>
      <rect x="1.86" y="2.48" width="11.16" height="2.48" rx="1.24" />
      <rect x="1.86" y="6.2" width="8.06" height="2.48" rx="1.24" />
      <rect x="1.86" y="9.92" width="4.96" height="2.48" rx="1.24" />
      <path d="M8.68 11.16l1.24 1.24 2.48-2.79" />
    </>
  ),
  calendar: (
    <>
      <rect x="1.86" y="3.1" width="11.16" height="9.92" rx="1.86" />
      <path d="M1.86 6.2h11.16M4.96 1.86v2.48M9.92 1.86v2.48" />
    </>
  ),
  messages: (
    <>
      <path d="M3.72 3.1H9.3a1.24 1.24 0 0 1 1.24 1.24v3.72A1.24 1.24 0 0 1 9.3 9.3H5.58l-3.1 2.48V4.34A1.24 1.24 0 0 1 3.72 3.1Z" />
      <path d="M11.78 5.58h.62a.62.62 0 0 1 .62.62v6.2l-1.86-1.55h-3.1" />
    </>
  ),
  workflows: (
    <>
      <circle cx="3.1" cy="7.44" r="1.55" />
      <circle cx="11.78" cy="3.72" r="1.55" />
      <circle cx="11.78" cy="11.16" r="1.55" />
      <path d="M4.65 7.44h2.79m0 0 2.79-3.1m-2.79 3.1 2.79 3.1" />
    </>
  ),
  learning: (
    <>
      <path d="M7.44 3.72C5.89 2.48 3.72 2.17 1.86 2.48v9.3c1.86-.31 4.03 0 5.58 1.24" />
      <path d="M7.44 3.72c1.55-1.24 3.72-1.55 5.58-1.24v9.3c-1.86-.31-4.03 0-5.58 1.24M7.44 3.72v9.3" />
    </>
  ),
};

export function ModuleIcon({ name, size = 15 }: { name: ModuleName; size?: number }) {
  return <Svg size={size} viewBox="0 0 14.88 14.88" strokeWidth={1.24}>{modulePaths[name]}</Svg>;
}

export type RoleName = "agents" | "managers" | "elected" | "administrators";

const rolePaths: Record<RoleName, ReactNode> = {
  agents: (
    <>
      <circle cx="12" cy="6.5" r="3" />
      <path d="M6.5 15.5c0-2.5 2.46-4.5 5.5-4.5s5.5 2 5.5 4.5" />
      <rect x="3" y="15.5" width="18" height="5.5" rx="1" />
    </>
  ),
  managers: (
    <>
      <rect x="4.5" y="4" width="15" height="17" rx="1.5" />
      <rect x="8.5" y="2" width="7" height="3.5" rx="1" />
      <path d="M7.5 10 9 11.5 11.5 9M13.5 10.5H17M7.5 16 9 17.5 11.5 15M13.5 16.5H17" />
    </>
  ),
  elected: <path d="M12 2v4m0-4h4v2.5h-4M3 10l9-4 9 4H3Zm2.5 1v7m4-7v7m5-7v7m4-7v7M3 20h18" />,
  administrators: (
    <>
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 10.5C7.5 19.5 4 16 4 11V5l8-3Z" />
      <circle cx="12" cy="10" r="2.25" />
      <path d="M12 12.25v4.25m0-2h2" />
    </>
  ),
};

export function RoleIcon({ name, size = 24 }: { name: RoleName; size?: number }) {
  return <Svg size={size} viewBox="0 0 24 24" strokeWidth={2}>{rolePaths[name]}</Svg>;
}

export type FieldIconName = "user" | "home" | "mail" | "need";

const fieldPaths: Record<FieldIconName, ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  home: <path d="M3 21h18M5 21V10l7-5 7 5v11m-9 0v-5h4v5" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  need: (
    <>
      <path d="M6 5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-5 4V7a2 2 0 0 1 2-2Z" />
      <path d="M19 9h1a1 1 0 0 1 1 1v10l-3-2.5h-5" />
    </>
  ),
};

export function FieldIcon({ name }: { name: FieldIconName }) {
  return <Svg size={20} viewBox="0 0 24 24" strokeWidth={2}>{fieldPaths[name]}</Svg>;
}

export function MailIcon() {
  return (
    <Svg size={22} viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </Svg>
  );
}

export function CodeIcon() {
  return (
    <Svg size={22} viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
      <path d="M13.5 4l-3 16" />
    </Svg>
  );
}

export function LinkedInIcon() {
  return (
    <Svg size={20} viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 0 0-4 0" />
    </Svg>
  );
}

export function InstagramIcon() {
  return (
    <Svg size={20} viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </Svg>
  );
}
