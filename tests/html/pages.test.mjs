// Rules every exported page must follow: document metadata, heading outline, links, images and
// ARIA references. Runs on out/ after `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  accessibleName, ancestors, attr, exported, hasAttr, indexable, outDir, page, pages, siteUrl, text, visibleText,
} from "./helpers.mjs";

const all = Object.keys(pages);

for (const publicPath of all) {
  test(`${publicPath}: French document with charset, viewport, title and description`, () => {
    const doc = page(publicPath);
    assert.equal(attr(doc.tags("html")[0], "lang"), "fr");
    assert.ok(doc.one(element => element.tagName === "meta" && attr(element, "charset")?.toLowerCase() === "utf-8"));
    const viewport = doc.one(element => element.tagName === "meta" && attr(element, "name") === "viewport");
    assert.match(attr(viewport, "content"), /width=device-width/);
    assert.doesNotMatch(attr(viewport, "content"), /user-scalable=no|maximum-scale=1(\D|$)/, "zoom must stay allowed");
    const titles = doc.tags("title");
    assert.equal(titles.length, 1);
    assert.match(text(titles[0]), /Mairie360/);
    const description = doc.one(element => element.tagName === "meta" && attr(element, "name") === "description");
    assert.ok(attr(description, "content")?.length >= 50, "meta description is too short");
  });

  test(`${publicPath}: exactly one h1 and no skipped heading level`, () => {
    const doc = page(publicPath);
    const levels = doc.all(element => /^h[1-6]$/.test(element.tagName)).map(element => Number(element.tagName[1]));
    assert.equal(levels.filter(level => level === 1).length, 1);
    assert.equal(levels[0], 1, "the first heading must be the h1");
    levels.forEach((level, index) => {
      if (index) assert.ok(level <= levels[index - 1] + 1, `h${levels[index - 1]} followed by h${level}`);
    });
    for (const heading of doc.all(element => /^h[1-6]$/.test(element.tagName))) {
      assert.ok(text(heading), `empty <${heading.tagName}>`);
    }
  });

  test(`${publicPath}: ids are unique and every ARIA or label reference exists`, () => {
    const doc = page(publicPath);
    const ids = doc.all(element => hasAttr(element, "id")).map(element => attr(element, "id"));
    assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), []);
    const known = new Set(ids);
    for (const name of ["aria-labelledby", "aria-describedby", "aria-controls"]) {
      for (const element of doc.all(item => hasAttr(item, name))) {
        for (const id of attr(element, name).split(/\s+/)) assert.ok(known.has(id), `${name}="${id}" points nowhere`);
      }
    }
    for (const label of doc.tags("label").filter(item => hasAttr(item, "for"))) {
      assert.ok(known.has(attr(label, "for")), `label for="${attr(label, "for")}" points nowhere`);
    }
    for (const control of doc.all(item => ["button", "input"].includes(item.tagName) && hasAttr(item, "form"))) {
      assert.equal(doc.byId(attr(control, "form"))?.tagName, "form");
    }
  });

  test(`${publicPath}: images have an alt text and their files are exported`, () => {
    const doc = page(publicPath);
    for (const image of doc.tags("img")) {
      assert.ok(hasAttr(image, "alt"), `<img src="${attr(image, "src")}"> has no alt`);
      assert.ok(exported(attr(image, "src")), `${attr(image, "src")} is not exported`);
      for (const candidate of (attr(image, "srcset") ?? "").split(",").map(item => item.trim().split(/\s+/)[0]).filter(Boolean)) {
        assert.ok(exported(candidate), `${candidate} (srcset) is not exported`);
      }
      if (attr(image, "alt") === "") {
        // A decorative image alone in a link would leave the link without a name.
        const link = ancestors(image).find(item => item.tagName === "a" || item.tagName === "button");
        if (link) assert.ok(accessibleName(link, doc), "a link holding only a decorative image needs a label");
      }
    }
  });

  test(`${publicPath}: links and buttons have a name, internal links resolve with a trailing slash`, () => {
    const doc = page(publicPath);
    const home = page("/");
    for (const link of doc.tags("a")) {
      const href = attr(link, "href");
      assert.ok(href, "<a> without href");
      assert.ok(accessibleName(link, doc), `link to ${href} has no accessible name`);
      if (href.startsWith("#")) {
        assert.ok(doc.byId(href.slice(1)), `${href} has no target on ${publicPath}`);
      } else if (href.startsWith("/")) {
        const [pathname, hash] = href.split("#");
        assert.ok(pathname.endsWith("/"), `${href} must end with "/" (trailingSlash export)`);
        assert.ok(exported(pathname), `${pathname} is not exported`);
        if (hash) assert.equal(pathname, "/", "anchors are only used on the home page");
        if (hash) assert.ok(home.byId(hash), `/#${hash} has no target`);
      } else if (attr(link, "target") === "_blank") {
        assert.match(attr(link, "rel") ?? "", /noopener/, `${href} opens a tab without rel="noopener"`);
      }
    }
    for (const button of doc.tags("button")) {
      assert.ok(accessibleName(button, doc), "button without accessible name");
      assert.ok(["button", "submit"].includes(attr(button, "type")), "buttons declare their type");
    }
  });

  test(`${publicPath}: no final commercial price is published`, () => {
    // The offer is a free invitation-only beta (CLAUDE.md › Gotchas).
    const body = visibleText(page(publicPath).tags("body")[0]);
    assert.doesNotMatch(body, /\d\s?€|€\s?\d|\bHT\b|par mois|\/mois/);
  });
}

for (const publicPath of indexable) {
  test(`${publicPath}: canonical and Open Graph URLs point to mairie360.fr`, () => {
    const doc = page(publicPath);
    const canonical = doc.one(element => element.tagName === "link" && attr(element, "rel") === "canonical");
    assert.equal(attr(canonical, "href"), `${siteUrl}${publicPath}`);
    const ogUrl = doc.one(element => element.tagName === "meta" && attr(element, "property") === "og:url");
    assert.equal(attr(ogUrl, "content"), `${siteUrl}${publicPath}`);
    const ogImage = doc.one(element => element.tagName === "meta" && attr(element, "property") === "og:image");
    assert.ok(attr(ogImage, "content")?.startsWith(`${siteUrl}/`));
    assert.ok(exported(new URL(attr(ogImage, "content")).pathname), "og:image is not exported");
    assert.ok(!doc.one(element => element.tagName === "meta" && attr(element, "name") === "robots" &&
      /noindex/.test(attr(element, "content"))), `${publicPath} must stay indexable`);
  });

  test(`${publicPath}: skip link, header, main and footer landmarks`, () => {
    const doc = page(publicPath);
    const skip = doc.tags("a")[0];
    assert.equal(attr(skip, "href"), "#contenu", "the first link skips to the content");
    assert.equal(doc.byId("contenu")?.tagName, "main");
    assert.equal(doc.tags("main").length, 1);
    assert.ok(doc.tags("header").length >= 1);
    assert.ok(doc.tags("footer").length >= 1);
    for (const nav of doc.tags("nav")) assert.ok(attr(nav, "aria-label"), "each <nav> is labelled");
  });
}

for (const publicPath of ["/merci/", "/404"]) {
  test(`${publicPath}: kept out of search results`, () => {
    const robots = page(publicPath).all(element => element.tagName === "meta" && attr(element, "name") === "robots");
    assert.ok(robots.some(element => /noindex/.test(attr(element, "content"))));
  });
}

test("sitemap.xml lists exactly the indexable pages, robots.txt points to it, CNAME is exported", () => {
  const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locations.sort(), indexable.map(item => `${siteUrl}${item}`).sort());
  const robots = fs.readFileSync(path.join(outDir, "robots.txt"), "utf8");
  assert.match(robots, new RegExp(`Sitemap: ${siteUrl}/sitemap.xml`));
  assert.doesNotMatch(robots, /Disallow: \/\s*$/m);
  assert.equal(fs.readFileSync(path.join(outDir, "CNAME"), "utf8").trim(), "mairie360.fr");
});
