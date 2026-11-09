import { Component } from 'react'
import { company } from '../../data/company'

export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error('Faultlens UI error', error, info) }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div role="alert" className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p className="mt-3 text-muted">Please reload the page. If it keeps happening, email {company.email}.</p>
        <button onClick={() => window.location.reload()} className="focus-ring mt-6 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink">Reload</button>
      </div>
    )
  }
}
