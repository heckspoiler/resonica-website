/**
 * Plain (non-module) stylesheets imported for their side effects,
 * e.g. `import './globals.css'` in app/layout.tsx. Next.js only ships a
 * declaration for `*.module.css`; this mirrors its shape so module files
 * keep the same typing whichever pattern TypeScript matches first.
 */
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
