type HeroProps = {
  title: string;
  description: string;
  buttonTitle: string;
};

export default function Hero({ title, description, buttonTitle }: HeroProps) {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary">{buttonTitle}</button>
        </div>
      </div>
    </div>
  );
}
