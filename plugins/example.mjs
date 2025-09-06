// example.mjs

/* Custom "example" admonition */
const example = {
  name: "example",
  doc: "A custom admonition that uses a specific color.",
  arg: { type: String, doc: "The title of the admonition." },
  options: { collapsed: { type: Boolean, doc: "Whether to collapse the admonition." } },
  body: { type: String, doc: "The body of the directive." },
  run(data, vfile, ctx) {
    const title = (data.arg || "").trim();
    const body = (data.body || "").trim();

    return [{
      type: "admonition",
      // keep "kind" generic; PDF styling is LaTeX-side, not CSS
      kind: "admonition",
      // IMPORTANT: class used by the transform below
      class: "admonition-example",
      icon: false,
      children: [
        {
          type: "admonitionTitle",
          // class here likely won’t round-trip, but harmless to leave
          class: "admonition-title-example",
          children: ctx.parseMyst(`${title}`)?.children?.[0]?.children ?? [{ type: "text", value: title }]
        },
        {
          type: "paragraph",
          children: ctx.parseMyst(body)?.children ?? [{ type: "text", value: body }]
        }
      ]
    }];
  }
};

/* Transform that rewrites the custom admonition for PDF builds */
const exampleTransform = {
  name: "conditional-example",
  doc: "Normalize custom example admonitions in PDF builds.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    const isPDF = process.argv.some(arg => arg.includes("pdf"));
    if (!isPDF) return;

    const getText = (node) => {
      if (!node) return "";
      if (node.type === "text" && typeof node.value === "string") return node.value;
      const kids = Array.isArray(node.children) ? node.children : [];
      return kids.map(getText).join("");
    };

    const rootChildren = tree.children?.[0]?.children || [];
    rootChildren.forEach((node) => {
      if (node?.type !== "admonition") return;

      const classes = node.classes || node.class || node.className || null;
      const hasExampleClass =
        (typeof classes === "string" && classes.includes("admonition-example")) ||
        (Array.isArray(classes) && classes.includes("admonition-example"));

      if (!hasExampleClass) return;

      // Rewrite title to "Example: <title>"
      const idx = (node.children || []).findIndex(c => c.type === "admonitionTitle");
      const titleNode = idx >= 0 ? node.children[idx] : null;
      const originalTitle = (getText(titleNode) || "").trim();

      if (titleNode) {
        titleNode.children = [{ type: "text", value: `Example: ${originalTitle}` }];
      } else {
        node.children = [
          { type: "admonitionTitle", children: [{ type: "text", value: `Example: ${originalTitle}` }] },
          ...(node.children || [])
        ];
      }

      // Normalize kind so LaTeX/PDF uses a known style (CSS doesn’t apply in PDFs)
      node.kind = "note";

      // Optionally drop the custom class in PDFs
      if (Array.isArray(node.classes)) {
        node.classes = node.classes.filter(c => c !== "admonition-example");
      } else if (typeof node.class === "string") {
        node.class = node.class.split(/\s+/).filter(c => c && c !== "admonition-example").join(" ");
      }
    });
  },
};

// ✅ Export BOTH directive and transform in one plugin
const plugin = {
  name: "example-plugin",
  directives: [example],
  transforms: [exampleTransform],
};

export default plugin;
