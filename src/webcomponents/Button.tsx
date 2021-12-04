import { Component, Listen, State, h } from '@stencil/core'

@Component({
    tag: 'mc-button',
    shadow: true,
})
export class McButton {
    @State() open = false

    @Listen('click')
    handleClick() {
        this.open = !this.open
    }

    render() {
        return <div>test {this.open.toString()}</div>
    }
}
