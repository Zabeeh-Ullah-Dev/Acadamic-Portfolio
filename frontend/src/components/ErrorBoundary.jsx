import { Component } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error in section:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="mx-auto my-12 max-w-4xl rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-center text-slate-300">
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/40 bg-red-900/30 text-red-400">
              <AlertCircle className="h-6 w-6" />
            </span>
            <h3 className="text-base font-semibold text-white">
              {this.props.sectionName ? `${this.props.sectionName} encountered a display issue` : 'Something went wrong rendering this section'}
            </h3>
            <p className="max-w-md text-xs text-slate-400">
              {this.state.error?.message || 'A data parsing error occurred.'}
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-2 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Section</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
