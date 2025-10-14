// src/components/Footer.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Minimal site footer with copyright text.
// -----------------------------------------------------------

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 py-4 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
      © {year} <span className="font-medium text-slate-600 dark:text-slate-300">Murad Hasil</span>. All rights reserved.
    </footer>
  );
}
