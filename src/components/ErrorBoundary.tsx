import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[error-boundary${this.props.label ? `: ${this.props.label}` : ""}]`, error, info.componentStack);
  }
  handleReset = () => {
    this.setState({ error: null });
  };
  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (!error) return children;
    if (fallback) return fallback;
    return (
      <div
        role="alert"
        className="relative z-10 max-w-xl mx-auto my-16 p-8 rounded-3xl border text-center"
        style={{
          borderColor: "rgba(var(--surface),0.15)",
          background: "rgba(var(--surface),0.03)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 mb-3">
          // Something broke
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
          This section failed to load.
        </h2>
        <p className="text-sm text-muted-foreground font-light mb-6">
          The rest of the site is unaffected. Try again, or reload the page.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={this.handleReset}
            className="px-5 py-2 rounded-full border border-white/20 text-sm font-mono uppercase tracking-widest text-foreground hover:border-white/40 transition-colors"
          >
            Retry
          </button>
          <a
            href="/"
            className="px-5 py-2 rounded-full border border-white/10 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    );
  }
}
export default ErrorBoundary;
