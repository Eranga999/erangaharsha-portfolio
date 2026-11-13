# Eranga Harsha Portfolio

A React and TypeScript portfolio, built with Vite. The original responsive design,
WebGL sculpture, scroll animations, project links, and contact endpoint are retained.

## Development

Requires Node.js 20.14 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The source HTML is now an application entry point;
use the development server instead of opening it directly from the filesystem.

## Production

```sh
npm run build
npm run preview
```

Deploy the contents of `dist` to your static host. For GitHub Pages without Actions,
copy the build output into `docs/`, push it, and select **main / docs** in the
repository's Pages settings. Relative asset URLs support hosting under a repository
subpath.

## Source

- [App.tsx](src/App.tsx): React page sections and project filtering state.
- [data.ts](src/data.ts): Projects and skills.
- [styles.css](src/styles.css): Original responsive design.
- [effects.js](src/effects.js): Preserved JavaScript animation, WebGL, and contact
  behavior, with cleanup for listeners, observers, timers, and animation frames.
- [public/assets](public/assets): Portfolio images served by Vite.

The contact form uses the existing FormSubmit service and requires verification of
the recipient email with that service. Its external delivery is not part of the build check.
