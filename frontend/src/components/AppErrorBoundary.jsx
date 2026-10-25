import { Component } from 'react';

class AppErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
          <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl" role="alert">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl text-rose-700" aria-hidden="true">!</span>
            <h1 className="mt-4 font-display text-xl font-semibold text-slate-900">This page hit a snag</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Your information is still protected. Refresh the page to try again. If this keeps happening, contact your school administrator.</p>
            <button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Refresh page</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
