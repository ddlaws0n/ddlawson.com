// Wraps markdown-generated <p><img></p> in <figure><img><figcaption>alt</figcaption></figure>.
// Alt text doubles as the caption. Use an empty alt in markdown to opt out of a caption.
// Append `|wide` to the alt to escape the prose column out to the content width:
//   ![Tampermonkey options screen|wide](./screenshot.png)

type HastNode = {
	type: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
};

const isWhitespaceText = (node: HastNode) =>
	node.type === "text" &&
	typeof node.value === "string" &&
	/^\s*$/.test(node.value);

export function rehypeFigure() {
	return (tree: HastNode) => {
		const walk = (node: HastNode) => {
			if (!node.children) return;
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (
					child.type === "element" &&
					child.tagName === "p" &&
					child.children
				) {
					const meaningful = child.children.filter((c) => !isWhitespaceText(c));
					if (
						meaningful.length === 1 &&
						meaningful[0].type === "element" &&
						meaningful[0].tagName === "img"
					) {
						const img = meaningful[0];
						const rawAlt = img.properties?.alt;
						let altText = typeof rawAlt === "string" ? rawAlt : "";
						const className = ["m-figure"];
						const widthMatch = altText.match(/\s*\|\s*(wide|full)\s*$/);
						if (widthMatch) {
							className.push(`m-figure-${widthMatch[1]}`);
							altText = altText.slice(0, widthMatch.index).trimEnd();
							if (img.properties) img.properties.alt = altText;
						}
						const figure: HastNode = {
							type: "element",
							tagName: "figure",
							properties: { className },
							children: [img],
						};
						if (altText.trim()) {
							figure.children?.push({
								type: "element",
								tagName: "figcaption",
								properties: {},
								children: [{ type: "text", value: altText }],
							});
						}
						node.children[i] = figure;
						continue;
					}
				}
				walk(child);
			}
		};
		walk(tree);
	};
}
