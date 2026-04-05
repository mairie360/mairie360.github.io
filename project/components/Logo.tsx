export default function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <img
      src="/logo/logo.png"
      alt="MAIRIE360"
      className={className}
      role="img"
    />
  );
}
