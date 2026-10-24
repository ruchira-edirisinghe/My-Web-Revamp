// JSON for a <script type="application/ld+json">, with every `<` written as its
// JSON escape (backslash, u003c) so no string in the data can close the script
// tag early. The escape is built from the char code to keep it unambiguous here.
const LT = `${String.fromCharCode(92)}u003c`;
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, LT);
