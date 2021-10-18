import React from 'react'

interface ComponentProps {}

export default class ErrorBoundary extends React.Component<
    {},
    { hasError: boolean }
> {
    state = {
        hasError: false,
    }

    componentDidCatch(...args) {
        console.error(args)
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <h1>App Crashed!</h1>
        }

        return this.props.children
    }
}
