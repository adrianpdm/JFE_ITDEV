import { assert, expect, should as _should } from 'chai'
import { mount } from '@vue/test-utils'
import Helper from "../helper"

import XDateInput from "../../src/components/XDateInput.vue"

const mProps = Object.freeze({
    label: 'props_label',
    date: 1,
    month: 1,
    year: 2020,
    placeholders: {
        date: '01',
        month: '01',
        year: '2020'
    }
})

const mAttrs = Object.freeze({
    autofocus: true
})

const wrapper = mount(XDateInput, {
    propsData: mProps,
    attrs: mAttrs
})

describe('XDateInput', () => {
    describe('#options', () => {
        it('has required props', () => {
            Helper.hasRequiredProps(wrapper, mProps);
        })
    })

    describe('#mounted', () => {
        const inputs = {
            "date-input": {
                type: "number",
                min: 1,
                max: 1
            },
            "month-input": {
                type: "number",
                min: 1,
                max: 12
            },
            "year-input": {
                type: "text",
                min: 4,
                max: 4
            }
        }
        const inputRoles = Object.keys(inputs)
        it(`has three input elements, with followings [role] attribute: ${inputRoles.join(', ')}`, () => {
            const arr = wrapper.findAll('input')
            expect(arr.length).to.be.gte(inputRoles.length);
            inputRoles.forEach(role => {
                assert.exists(
                    arr.find(w => w.attributes().role === role),
                    `XDateInput must have input of role ${role}`
                )
            })
        })
        it('has proper attributes for each input elements', () => {
            for (let role in inputs) {
                const selector = `input[role*="${role}"]`
                const el = wrapper.find(selector);
                expect(el.exists()).to.be.true;
                Object.keys(inputs[role]).forEach(attrName => {
                    const attrVal = inputs[role][attrName]
                    assert.equal(
                        el.attributes()[attrName],
                        attrVal,
                        `${selector} must have attribute ${attrName}=${attrVal}`
                    )
                })
            }
        })
    })
})