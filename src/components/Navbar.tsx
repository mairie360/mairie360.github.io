type NavbarProps = {
  name: string;
};

export default function Navbar({ name }: NavbarProps) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <a className="btn btn-ghost text-xl">{name}</a>
    </div>
  );
}
