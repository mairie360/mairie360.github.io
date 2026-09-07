import Image from "next/image";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h16m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand${compact ? " brand-compact" : ""}`}>
      {!compact && (
        <Image
          src="/web-app-manifest-192x192.png"
          width={72}
          height={72}
          alt=""
        />
      )}
      <span>
        mairie<span className="brand-number">360</span>
      </span>
    </span>
  );
}

export type IconName = "dashboard" | "projects" | "calendar" | "messages" | "learning";
export function ModuleIcon({ name }: { name: IconName }) {
  const paths = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="10" rx="1.5" />
        <rect x="14" y="3" width="7" height="6" rx="1.5" />
        <rect x="3" y="17" width="7" height="4" rx="1.5" />
        <rect x="14" y="13" width="7" height="8" rx="1.5" />
      </>
    ),
    projects: (
      <path d="M3 8V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0 2h18" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v5m10-5v5M3 11h18" />
      </>
    ),
    messages: <path d="m21 3-6 18-4-8-8-4 18-6Zm0 0L11 13" />,
    learning: (
      <>
        <path d="m2 9 10-5 10 5-10 5-10-5Zm4 2v7c4 3 8 3 12 0v-7m4-2v8" />
      </>
    ),
  };
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Check() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}
