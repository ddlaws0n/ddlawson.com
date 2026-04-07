# Plan

## Revisit: Cloudflare Proxying for Email Obfuscation

Once the site is behind Cloudflare (CF proxying enabled), revisit email obfuscation. CF offers a one-click email address obfuscation feature that auto-encodes emails in HTML and decodes them client-side — zero maintenance.

Currently using JS-assembled `mailto:` links (data attributes hydrated client-side) as an interim measure. The CF approach would replace this and cover any email addresses added outside the footer.
