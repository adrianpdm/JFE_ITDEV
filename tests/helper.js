import { assert, expect } from 'chai'

export function isVueWrapper(wrapper) {
    assert.isTrue(
        typeof wrapper.isVueInstance === 'function',
        'wrapper must be a created using mount() or shallowMount()'
    )
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

export function hasRequiredState(Component, requiredState) {
    const $data = typeof Component.data === 'function'
        ? Component.data()
        : Component.data

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