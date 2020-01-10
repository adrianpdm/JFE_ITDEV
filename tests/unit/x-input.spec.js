import { assert, expect, should as _should } from 'chai'
import { mount } from '@vue/test-utils'

import XInput from "../../src/components/XInput.vue"

const mProps = Object.freeze({
    label: 'props_label',
    value: 'props_value',
    inputElement: 'input'
})
const mAttrs = Object.freeze({
    type: 'attr_type',
    placeholder: 'attr_placeholder',
    autofocus: true
}
)
const wrapper = mount(XInput, {
    propsData: mProps,
    attrs: mAttrs
})
const should = _should()

describe("XInput", () => {
    describe("#options", () => {
        it(`has v-model directive of prop 'value' and event 'input'`, () => {
            expect(wrapper.vm.$options.model)
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
            expect(typeof wrapper.vm.$options.data === 'function')
                .to.be.true
        })
        it(`manages its own state of props 'value' as 'mValue'`, () => {
            expect(wrapper.vm.mValue)
                .to.equal(mProps.value)
        })
    })
    describe("#mounted", () => {
        it('has a <label>', () => {
            const label = wrapper.find('label')
            expect(label.is('label'))
                .to.be.true
        })
        it(`input element matches props 'inputElement'`, () => {
            const input = wrapper.find(mProps.inputElement)
            expect(input.is(mProps.inputElement))
                .to.be.true
        })
        it('has an input element that inherits attributes', () => {
            const input = wrapper.find(mProps.inputElement)
            expect(input.is(mProps.inputElement))
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
        const input = wrapper.find(mProps.inputElement)
        it(`emit 'input' event on inputElement 'input' event`, () => {
            input.trigger('input')
            expect(wrapper.emitted().input).to.exist;
        })
        it(`correctly updates 'mValue' on 'input' event`, () => {
            wrapper.setProps({
                value: 'inputValue'
            })
            return wrapper.vm.$nextTick()
                .then(() => {
                    expect(wrapper.vm.mValue)
                        .to.equal('inputValue')
                })
        })
        it(`correctly update textarea textContent on props 'value' changed`, () => {
            wrapper.setProps({
                inputElement: 'textarea',
                value: 'XYZ'
            })
            return wrapper.vm.$nextTick()
                .then(() => {
                    const textarea = wrapper.find('textarea')
                    expect(textarea.is('textarea')).to.be.true;
                    expect(textarea.element.value).to.equal('XYZ');
                })
        })

    })
})