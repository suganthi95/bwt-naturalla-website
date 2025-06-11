import { Component, type  ReactNode, type ErrorInfo } from "react";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error captured by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
          <div className="max-w-md space-y-4">
            {/* <img
              src={errorIllustarte}
              alt="Error Illustration"
              className="w-40 mx-auto"
            /> */}
            <h1 className="text-2xl font-bold text-red-600">
              Oops! Something went wrong.
            </h1>
            <p className="text-gray-600">
              We{'’'}re sorry for the inconvenience. Please try refreshing the page.
              If the problem persists, contact our support team.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
