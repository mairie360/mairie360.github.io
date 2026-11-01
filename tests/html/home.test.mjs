// The exported home page (MAIR-742, aligned with the Figma mockup and the prototype): what a
// visitor gets before any JavaScript runs, and the markup the interactions rely on.
import { test } from "node:test";
import assert from "node:assert/strict";
import { accessibleName, ancestors, attr, hasAttr, loadTs, page, text, visibleText } from "./helpers.mjs";

const home = page("/");
const { boardTools, moduleNames } = loadTs("src/lib/modules-board.ts");
const { modules, audiences, supportSteps, eras } = loadTs("src/lib/showcase-data.ts");
const { contactAddress } = loadTs("src/lib/contact.ts");
const body = visibleText(home.tags("body")[0]);
const section = (id) => home.byId(id);
const inside = (root, predicate) => home.all(element => predicate(element) && ancestors(element).includes(root));

test("MAIR-742: sections follow the mockup order and are each named by their heading", () => {
  const sections = home.tags("section");
  const ids = sections.map(element => attr(element, "id")).filter(Boolean);
  assert.deepEqual(ids, ["mairies", "modules", "plateforme", "accompagnement", "contact"]);
  const labelled = sections.map(element => attr(element, "aria-labelledby"));
  assert.deepEqual(labelled, ["hero-title", "timeline-title", "audiences-title", "board-title", "platform-title", "support-title", "contact-title"]);
  for (const id of labelled) assert.match(home.byId(id).tagName, /^h[12]$/);
  assert.equal(home.byId("hero-title").tagName, "h1");
});

test("MAIR-742: the header links to each section and its CTA leads to the contact form", () => {
  const header = home.tags("header")[0];
  const links = inside(header, element => element.tagName === "a");
  const hrefs = links.map(link => attr(link, "href"));
  for (const anchor of ["#mairies", "#plateforme", "#accompagnement", "#contact"]) assert.ok(hrefs.includes(anchor), anchor);
  const cta = links.find(link => attr(link, "href") === "#contact");
  assert.equal(attr(cta, "data-contact-origin"), "bandeau", "the CTA feeds the analytics funnel");
  assert.equal(accessibleName(links.find(link => attr(link, "href") === "/"), home), "Mairie360, accueil");
});

test("MAIR-742: the static header carries no visibility state, so phones never flash it before JS", () => {
  const header = home.tags("header")[0];
  assert.ok(!hasAttr(header, "data-visible"));
});

test("MAIR-742: the hero works without JavaScript or WebGL and has no pause button", () => {
  const hero = home.byId("hero-title");
  assert.equal(text(hero), "Votre mairie mérite un outil à sa mesure.");
  const figure = home.tags("figure")[0];
  const image = inside(figure, element => element.tagName === "img").find(element => attr(element, "alt"));
  assert.ok(image, "a described static image is in the HTML");
  assert.match(attr(image, "srcset") ?? "", /384w.*768w.*1152w/s, "pre-sized variants are offered");
  assert.ok(!home.tags("canvas").length, "the WebGL canvas is only added on the client");
  assert.deepEqual(inside(figure, element => element.tagName === "button"), [], "no pause/play control");
  assert.equal(text(inside(figure, element => element.tagName === "figcaption")[0]), "Le numérique au service du collectif.");
  const ctas = home.all(element => element.tagName === "a" && ["#contact", "#plateforme"].includes(attr(element, "href")) &&
    ancestors(element).some(parent => parent.tagName === "section" && attr(parent, "aria-labelledby") === "hero-title"));
  assert.deepEqual(ctas.map(link => text(link)), ["Prendre rendez-vous", "Découvrir la plateforme"]);
});

test("MAIR-742: the timeline tells the eras in chronological order up to 2026", () => {
  const timeline = home.one(element => element.tagName === "section" && attr(element, "aria-labelledby") === "timeline-title");
  const content = visibleText(timeline);
  const years = [...eras.map(era => String(era.year)), "2026"];
  let last = -1;
  for (const year of years) {
    const at = content.indexOf(year, last + 1);
    assert.ok(at > last, `${year} is missing or out of order`);
    last = at;
  }
  assert.match(content, /Minitel/);
});

test("MAIR-742: every audience is presented", () => {
  const audiencesSection = section("mairies");
  const titles = inside(audiencesSection, element => element.tagName === "h3").map(text);
  assert.deepEqual(titles, audiences.map(audience => audience.label));
});

test("MAIR-742: the board starts on « Sans Mairie360 » with its thirteen tools in the HTML", () => {
  const board = section("modules");
  assert.equal(text(home.byId("board-title")), "Une journée en mairie, c’est souvent treize outils.");
  const switches = inside(board, element => element.tagName === "button" && /Mairie360$/.test(text(element)));
  assert.deepEqual(switches.map(button => [text(button), attr(button, "aria-pressed")]),
    [["Sans Mairie360", "true"], ["Avec Mairie360", "false"]]);
  const boardText = visibleText(board);
  for (const tool of boardTools) {
    assert.ok(boardText.includes(tool.name), `tool « ${tool.name} » is missing`);
  }
  const tiles = inside(board, element => element.tagName === "button" && /^Voir le module /.test(attr(element, "aria-label") ?? ""));
  assert.deepEqual(tiles.map(tile => attr(tile, "aria-label")), moduleNames.map(name => `Voir le module ${name}`));
  for (const tile of tiles) {
    assert.equal(attr(tile, "aria-pressed"), "false");
    assert.equal(attr(tile, "tabindex"), "-1", "tiles are out of the tab order until « Avec » is chosen");
  }
  const hint = inside(board, element => attr(element, "aria-live") === "polite")[0];
  assert.equal(text(hint), "Survolez un outil pour voir quel module le remplace.");
  assert.ok(inside(board, element => element.tagName === "a" && attr(element, "href") === "#plateforme").length);
});

test("MAIR-742: platform tabs are wired to their panels and only the first one is shown", () => {
  const platform = section("plateforme");
  const tablist = inside(platform, element => attr(element, "role") === "tablist")[0];
  assert.ok(attr(tablist, "aria-label"));
  const tabs = inside(tablist, element => attr(element, "role") === "tab");
  assert.deepEqual(tabs.map(text), modules.map(module => module.label));
  tabs.forEach((tab, index) => {
    const selected = index === 0;
    assert.equal(attr(tab, "aria-selected"), String(selected));
    assert.equal(attr(tab, "tabindex"), selected ? "0" : "-1", "roving tabindex");
    const panel = home.byId(attr(tab, "aria-controls"));
    assert.equal(attr(panel, "role"), "tabpanel");
    assert.equal(attr(panel, "aria-labelledby"), attr(tab, "id"));
    assert.equal(hasAttr(panel, "hidden"), !selected);
  });
  const shown = home.byId(attr(tabs[0], "aria-controls"));
  assert.equal(text(inside(shown, element => element.tagName === "h3")[0]), modules[0].title);
  for (const benefit of modules[0].benefits) assert.ok(visibleText(shown).includes(benefit));
});

test("MAIR-742: support steps are listed in order", () => {
  const titles = inside(section("accompagnement"), element => element.tagName === "h3").map(text);
  assert.deepEqual(titles, supportSteps.map(step => step.title));
});

test("contact form: labelled fields, required ones, honeypot and external submit button", () => {
  const form = home.byId("contact-form");
  assert.equal(form.tagName, "form");
  assert.ok(hasAttr(form, "novalidate"), "validation messages are the French ones from contact.ts");
  const expected = {
    name: { type: "text", required: true, autocomplete: "name", label: "Nom et prénom" },
    town: { type: "text", required: true, autocomplete: "address-level2", label: "Commune" },
    email: { type: "email", required: true, autocomplete: "email", label: "E-mail professionnel" },
    need: { required: false, label: "Votre besoin (facultatif)" },
  };
  for (const [name, spec] of Object.entries(expected)) {
    const field = inside(form, element => ["input", "textarea"].includes(element.tagName) && attr(element, "name") === name)[0];
    assert.ok(field, `${name} field`);
    if (spec.type) assert.equal(attr(field, "type"), spec.type);
    if (spec.autocomplete) assert.equal(attr(field, "autocomplete"), spec.autocomplete);
    assert.equal(hasAttr(field, "required"), spec.required, `${name} required`);
    assert.ok(Number(attr(field, "maxlength")) > 0, `${name} has a maxlength`);
    const label = home.one(element => element.tagName === "label" && attr(element, "for") === attr(field, "id"));
    assert.equal(text(label), spec.label);
  }
  const honeypot = inside(form, element => attr(element, "name") === "_honey")[0];
  assert.equal(attr(honeypot, "tabindex"), "-1");
  assert.ok(ancestors(honeypot).some(parent => attr(parent, "aria-hidden") === "true"));
  const submit = home.one(element => element.tagName === "button" && attr(element, "type") === "submit");
  assert.equal(attr(submit, "form"), "contact-form");
  assert.equal(text(submit), "Prendre rendez-vous");
});

test("MAIR-742: contact cards copy the address and open the project, with a polite toast", () => {
  const contact = section("contact");
  const copy = inside(contact, element => element.tagName === "button" && /^Copier/.test(attr(element, "aria-label") ?? ""))[0];
  assert.equal(attr(copy, "aria-label"), `Copier l’adresse e-mail ${contactAddress}`);
  const github = inside(contact, element => element.tagName === "a" && attr(element, "href") === "https://github.com/mairie360")[0];
  assert.equal(attr(github, "target"), "_blank");
  assert.match(text(github), /nouvel onglet/, "screen readers are told about the new tab");
  const toast = inside(contact, element => attr(element, "aria-live") === "polite" && attr(element, "role") === "status");
  assert.ok(toast.length, "the copy toast is announced");
  assert.ok(inside(contact, element => element.tagName === "a" && attr(element, "href") === "/confidentialite/").length,
    "the privacy notice is linked next to the form");
});

test("footer links to the legal pages and the social accounts", () => {
  const footer = home.tags("footer")[0];
  const hrefs = inside(footer, element => element.tagName === "a").map(link => attr(link, "href"));
  for (const href of ["/confidentialite/", "/conditions-utilisation/", "https://www.linkedin.com/company/145224827/",
    "https://www.instagram.com/mairie360/"]) {
    assert.ok(hrefs.includes(href), href);
  }
});

test("visible home text stays in French (no leftover English placeholders)", () => {
  assert.doesNotMatch(body, /\b(Lorem|ipsum|TODO|Learn more|Click here|Submit|Loading)\b/);
});
