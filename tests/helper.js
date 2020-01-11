import { assert, expect } from 'chai'

export function isVueWrapper(wrapper) {
    expect(wrapper.isVueInstance()).to.be.true
}

export function hasRequiredProps(wrapper, requiredProps) {
    isVueWrapper(wrapper)
    Object.keys(requiredProps).forEach(key => {
        let actual = wrapper.props(key)
        let expected = requiredProps[key]
        assert.equal(actual, expected, `has props '${key}'`)
    })
}

export function isDataSetupAsFunction(wrapper) {
    expect(typeof wrapper.vm.$options.data === 'function')
        .to.be.true
}

export default {
    hasRequiredProps,
    isDataSetupAsFunction
}