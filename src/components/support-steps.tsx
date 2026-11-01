import { supportSteps } from "@/lib/showcase-data";

export function SupportSteps() {
  return (
    <section className="home-section support" id="accompagnement" aria-labelledby="support-title">
      <div className="container">
        <p className="eyebrow">Accompagnement</p>
        <h2 id="support-title">On avance à votre rythme, avec vos équipes.</h2>
        <p className="section-lead support-lead">
          Changer d’outil, c’est d’abord une affaire de personnes. Nous restons à vos côtés de l’installation à la prise
          en main.
        </p>
        <ol className="steps-grid">
          {supportSteps.map((step, index) => (
            <li key={step.title} className={index < 2 ? "step-night" : "step-teal"}>
              <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
