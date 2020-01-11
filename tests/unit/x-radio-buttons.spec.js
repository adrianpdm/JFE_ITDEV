import { assert, expect } from "chai"
import { mount } from "@vue/test-utils"

import Helper from "../helper"

import XRadioButtons from "../../src/components/XRadioButtons.vue"

const mProps = Object.freeze({
    label: 'props_label',
    name: 'props_name',
    value: 'radio_value',
    options: [
        'A',
        'B',
        'C'
    ]
})

const mAttrs = Object.freeze({

})

const mState = Object.freeze({
    mValue: null,
    errorMsg: null,
    isFocused: false
})

const wrapper = mount(XRadioButtons, {
    propsData: mProps
})

describe('XRadioButtons', () => {
    describe('#options', () => {
        it('has required props', () => {
            Helper.hasRequiredProps(wrapper, mProps)
        })
        it('correctly setup data as function', () => {
            Helper.isDataSetupAsFunction(wrapper)
        })
        it('has required initial state', () => {
            Helper.hasRequiredState(XRadioButtons, mState)
        })
    })

    describe('#mounted', () => {
        it(`count of radio input elements should meet a minimum of ${mProps.options.length}`, () => {
            const radios = wrapper.findAll('input[type*="radio"]')
            expect(radios.length).to.equal(mProps.options.length)
        })
        it('each radio input should be superceded by a label', () => {
            const radios = wrapper.findAll('input[type*="radio"]')
            for (let i = 0; i < radios.length; i++) {
                const w = radios.at(i)
                assert.exists(
                    w.element.nextSibling,
                    'radio must be superceded by label'
                )
                assert.equal(
                    w.element.nextSibling.tagName,
                    'LABEL',
                    'radio must be superceded by label'
                )
            }
        })
    })
})