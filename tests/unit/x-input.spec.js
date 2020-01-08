import { assert, expect, should as _should } from 'chai'
import { mount } from '@vue/test-utils'

import XInput from "../../src/components/XInput.vue"

const mProps = {
    label: 'props_label',
    value: 'props_value',
    name: 'props_name'
}
const mAttrs = {
    type: 'attr_type',
    placeholder: 'attr_placeholder',
    autofocus: true
}
const wrapper = mount(XInput, {
    propsData: mProps,
    attrs: mAttrs
})
const should = _should()

describe("XInput", () => {
    const el = wrapper.element
    const vm = wrapper.vm

    describe("#options", () => {
        it(`has v-model directive of prop 'value' and event 'input'`, () => {
            expect(vm.$options.model)
                .to.exist
                .and.to.deep.equal({
                    prop: 'value',
                    event: 'input'
                })
        })
        it('has required props', () => {
            Object.keys(mProps).forEach(key => {
                let actual = wrapper.props(key)
                let expected = mProps[key]
                assert.equal(actual, expected, `has props '${key}'`)
            })
        })
        it('correctly setup data as function', () => {
            expect(typeof vm.$options.data === 'function')
                .to.be.true
        })
        it(`manages its own state of props 'value' as 'mValue'`, () => {
            expect(vm.mValue)
                .to.equal(mProps.value)
        })
    })
    describe("#mounted", () => {
        it('has a <label>', () => {
            const label = wrapper.find('label')
            expect(label.is('label'))
                .to.be.true
        })
        it('has an <input> element that inherits attributes', () => {
            const input = wrapper.find('input')
            expect(input.is('input'))
                .to.be.true
            Object.keys(mAttrs).forEach(key => {
                expect(input.attributes()[key])
                    .to.be.oneOf([mAttrs[key], key])
            })
        })
        it('has a <p> element', () => {
            const p = wrapper.find('p')
            expect(p.is('p'))
                .to.be.true
        })
    })

    describe('#events', () => {
        const input = wrapper.find('input')
        const value = 'adrian'
        input.element.value = value
        it(`emit 'input' event on <input> 'input' event`, () => {
            vm.$nextTick(() => {
                input.trigger('input')
                expect(wrapper.emitted().input[0])
                    .to.deep.equal([value])
            })
        })
        it(`correctly updates 'mValue' on 'input' event`, () => {
            vm.$nextTick(() => {
                expect(wrapper.vm.mValue)
                    .to.equal(value)
            })
        })

    })
})