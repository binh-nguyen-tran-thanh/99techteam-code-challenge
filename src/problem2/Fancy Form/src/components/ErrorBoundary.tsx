import { captureOwnerStack, Component, type ReactNode } from 'react'
import ErrorMessage from './ErrorMessage'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: (errorMessage: string) => ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: {
    children: ReactNode
    fallback?: (errorMessage: string) => ReactNode
  }) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      'ErrorBoundary caught an error',
      error,
      errorInfo,
      captureOwnerStack(),
    )
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback)
        return this.props.fallback(this.state.errorMessage)
      return (
        <ErrorMessage
          message={this.state.errorMessage}
          onRetry={() => {
            location.reload()
          }}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
