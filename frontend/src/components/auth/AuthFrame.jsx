import Wordmark from '../layout/Wordmark.jsx';

const highlights = [
  'One secure Login for your school workspace',
  'Private records with role-based access',
  'A clear view of the work that matters',
];

const AuthFrame = ({ title, description, children, footer }) => (
  <main className="grid min-h-[calc(100vh-4rem)] bg-[#f7f8fc] lg:grid-cols-2">
    <section className="relative hidden min-h-[720px] overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 animate-pulse motion-reduce:animate-none rounded-full bg-indigo-400/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="relative animate-fade-up"><Wordmark dark /></div>
      <div className="relative max-w-xl animate-fade-up">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[.2em] text-indigo-200">Scholaris · School Management</span>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">A thoughtful workspace for every school day.</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">Stay connected to the people, records and updates that help your school thrive.</p>
        <ul className="mt-8 space-y-3">
          {highlights.map((item, index) => <li key={item} className="flex items-center gap-3 text-sm text-slate-200" style={{ animationDelay: `${index * 100}ms` }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-xs text-emerald-300">✓</span>{item}
          </li>)}
        </ul>
      </div>
      <p className="relative text-xs text-slate-400">Secure access · School records · Community</p>
    </section>

    <section className="flex min-w-0 items-center justify-center px-4 py-10 sm:px-8 lg:px-10 xl:px-16">
      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-7 lg:hidden"><Wordmark /></div>
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-600">Scholaris account</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_24px_80px_-36px_rgba(30,41,89,.3)] sm:p-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
      </div>
    </section>
  </main>
);

export default AuthFrame;
