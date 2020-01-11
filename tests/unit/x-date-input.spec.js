import { assert, expect, should as _should } from 'chai'
import { mount } from '@vue/test-utils'
import Helper from "../helper"

import XDateInput from "../../src/components/XDateInput.vue"

const mProps = Object.freeze({
    date: 1,
    month: 1,
    year: 2020
})

const mAttrs = Object.freeze({
    autofocus: true
})

const mState = Object.freeze({
    errorMsg: '',
    isFocused: {
        date: false,
        month: false,
        year: false,
    },
    mDate: null,
    mMonth: null,
    mYear: null
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
        it('correctly setup data as function', () => {
            Helper.isDataSetupAsFunction(wrapper)
        })
        it('has required initial state values', () => {
            Helper.hasRequiredState(XDateInput, mState)
        })
    })

    describe('#mounted', () => {
        it('has a <label>', () => {
            const label = wrapper.find('label')
            expect(label.is('label'))
                .to.be.true
        })

        const inputs = {
            "date-input": {
                type: "number",
                min: 1,
                max: 31
            },
            "month-input": {
                type: "number",
                min: 1,
                max: 12
            },
            "year-input": {
                type: "number",
                min: 1900,
                max: new Date().getFullYear()
            }
        }
        const inputRoles = Object.keys(inputs)
        it(`has three input elements, with followings [role] attribute: ${inputRoles.join(', ')}`, () => {
            const arr = wrapper.findAll('input')
            expect(arr.length).to.be.gte(inputRoles.length);
            inputRoles.forEach(role => {
                assert.exists(
                    arr.filter(w => w.attributes().role === role),
                    `XDateInput must have input of role ${role}`
                )
            })
        })
        it('each input should have preceded by a label', () => {
            const arr = wrapper.findAll('input')
            expect(arr.length).to.be.gte(inputRoles.length);
            for (let i = 0; i < arr.length; i++) {
                const w = arr.at(i)
                expect(w.element.previousSibling).to.exist;
                expect(w.element.previousSibling.tagName).to.equal('LABEL');
            }
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
        it('has a <p> element', () => {
            const p = wrapper.find('p')
            expect(p.is('p'))
                .to.be.true
        })
    })
})