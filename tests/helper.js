import { assert, expect } from 'chai'

export function isVueWrapper(wrapper) {
    expect(wrapper.isVueInstance()).to.be.true
}

export function hasRequiredProps(wrapper, requiredProps) {
    isVueWrapper(wrapper)
    Object.keys(requiredProps).forEach(key => {
        let actual = wrapper.props(key)
        let expected = requiredProps[key]
        assert.strictEqual(actual, expected, `has props '${key}'`)
    })
}

export function hasRequiredState(wrapper, requiredState) {
    isVueWrapper(wrapper)
    const $data = typeof wrapper.vm.$data === 'function'
        ? wrapper.vm.$data()
        : wrapper.vm.$data

    const check = (actual, expected, rootKey = '') => {
        Object.keys(expected).forEach(key => {
            if (!!expected[key] && typeof expected[key] === 'object') {
                check(actual[key], expected[key], key)
            } else {
                assert.strictEqual(actual[key], expected[key])
            }
        })
    }

    check($data, requiredState);
}

export function isDataSetupAsFunction(wrapper) {
    isVueWrapper(wrapper)
    expect(typeof wrapper.vm.$options.data === 'function')
        .to.be.true
}

export default {
    hasRequiredProps,
    isDataSetupAsFunction,
    hasRequiredState
}