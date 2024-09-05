import IMask from 'imask';


class FormField {
    constructor(type, name, correct="_correct", error="_error", containerSelector=null, clearFunction=null, required=false, min=1, max=Infinity) {
        this.type = type;
        this.name = name;
        this.required = required;
        this.min = min;
        this.max = max;
        this.errorName = error;
        this.correctName = correct;
        this.containerSelector = containerSelector;
        this.clearFunction = clearFunction;
        this._error = null;
    }
    set error(value) {
        if (typeof value === "boolean") {
            this._error = value;
        } else {
            console.error(`Setted property "error" must be boolean.`);
        }
    }
    get error() {
        return this._error;
    }
}
class Form {
    constructor(selector, config) {
        this.form = document.querySelector(selector);
        this.config = {
            inputContainerCorrect: config.inputContainerCorrect || "_correct",
            inputContainerError: config.inputContainerError || "_error",
            fields: config.fields || [],
            submitButtonSelector: config.submitButtonSelector || "button",
            onlyOnSubmitError: config.onlyOnSubmitError || false,
            successFormClassElement: config.successFormClassElement || this.form,
            successFormClass: config.successFormClass || "_success",
        };
        this.errors = 0;
        this._firstValidation = true,
        this.submitButton = this.form.querySelector(this.config.submitButtonSelector);
    }
    validateField(form, field, fieldConfig) {
        if (["text", "textarea", "name"].includes(fieldConfig.type)) {
            if (fieldConfig.min <= field.value.length && fieldConfig.max > field.value.length) {
                this.makeFieldCorrect(form, field, fieldConfig);
            } else {
                if (fieldConfig.required) {
                    this.makeFieldError(form, field, fieldConfig);
                }
                field.classList.remove(fieldConfig.correctName);
                this.removeContainerCorrect(form, field, fieldConfig);
            }
        } else if ("checkbox" === fieldConfig.type) {
            if (field.checked) {
                this.makeFieldCorrect(form, field, fieldConfig);
            } else {
                if (fieldConfig.required) {
                    this.makeFieldError(form, field, fieldConfig);
                }
                field.classList.remove(fieldConfig.correctName);
                this.removeContainerCorrect(form, field, fieldConfig);
            }
        } else if ("contacts" === fieldConfig.type) {
            let reEmail = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{2,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i);
            let rePhone = new RegExp(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/);
            if (reEmail.test(field.value)) {
                field.setAttribute("maxLength", "");
                this.makeFieldCorrect(form, field, fieldConfig);
            } else if (rePhone.test(field.value)) {
                field.setAttribute("maxLength", "16");
                this.makeFieldCorrect(form, field, fieldConfig);
            } else {
                if (fieldConfig.required) {
                    this.makeFieldError(form, field, fieldConfig);
                }
                field.setAttribute("maxLength", "");
                field.classList.remove(fieldConfig.correctName);
                this.removeContainerCorrect(form, field, fieldConfig);
            }
        } else if (["radio", "rating"].includes(fieldConfig.type)) {
            if (form._firstValidation && fieldConfig.required) {
                let error = true;
                for (let input of field) {
                    if (input.checked) {
                        error = false;
                        break;
                    }
                }
                if (error) {
                    this.makeFieldError(form, field, fieldConfig);
                } else {
                    this.makeFieldCorrect(form, field, fieldConfig);
                }
                
            } else {
                this.makeFieldCorrect(form, field, fieldConfig);
            }
        } else if ("select" === fieldConfig.type) {
            if (field.getAttribute("data-default-value") === field.getAttribute("value")) {
                if (fieldConfig.required) {
                    this.makeFieldError(form, field, fieldConfig);
                }
                field.classList.remove(fieldConfig.correctName);
                this.removeContainerCorrect(form, field, fieldConfig);
            } else {
                this.makeFieldCorrect(form, field, fieldConfig);
            }
        } else if ("date" === fieldConfig.type) {
            if (field.mask.unmaskedValue.length === 8) {
                this.makeFieldCorrect(form, field, fieldConfig);
            } else {
                if (fieldConfig.required) {
                    this.makeFieldError(form, field, fieldConfig);
                }
                field.classList.remove(fieldConfig.correctName);
                this.removeContainerCorrect(form, field, fieldConfig);
            }
        }
    }
    makeContainerCorrect(form, field, fieldConfig) {
        if (fieldConfig.containerSelector) {
            if (field.length) {
                field[0].closest(fieldConfig.containerSelector).classList.add(form.config.inputContainerCorrect);
            } else {
                field.closest(fieldConfig.containerSelector).classList.add(form.config.inputContainerCorrect);
            }
        }
    }
    removeContainerCorrect(form, field, fieldConfig) {
        if (fieldConfig.containerSelector) {
            if (field.length) {
                field[0].closest(fieldConfig.containerSelector).classList.remove(form.config.inputContainerCorrect);
            } else {
                field.closest(fieldConfig.containerSelector).classList.remove(form.config.inputContainerCorrect);
            }
        }
    }
    makeFieldCorrect(form, field, fieldConfig) {
        if (fieldConfig.error) {
            form.errors -= 1;
            fieldConfig.error = false;
            if (field.length) {
                if (fieldConfig.containerSelector) {
                    field[0].closest(fieldConfig.containerSelector).classList.remove(form.config.inputContainerError);
                }
                field.forEach(x => {
                    x.classList.remove(fieldConfig.errorName);
                });
            } else {
                field.classList.remove(fieldConfig.errorName);
                if (fieldConfig.containerSelector) {
                    field.closest(fieldConfig.containerSelector).classList.remove(form.config.inputContainerError);
                }
            }
        }
        if (field.length) {
            field.forEach(x => {
                x.classList.add(fieldConfig.correctName);
            });
        } else {
            field.classList.add(fieldConfig.correctName);
        }
        this.makeContainerCorrect(form, field, fieldConfig);
    }
    makeFieldError(form, field, fieldConfig) {
        if (!fieldConfig.error) {
            form.errors += 1;
            fieldConfig.error = true;
        }
        if (!form.config.onlyOnSubmitError && !form._firstValidation) {
            if (field.length) {
                if (fieldConfig.containerSelector) {
                    field[0].closest(fieldConfig.containerSelector).classList.add(form.config.inputContainerError);
                }
                field.forEach(x => {
                    x.classList.add(fieldConfig.errorName);
                });
            } else {
                field.classList.add(fieldConfig.errorName);
                if (fieldConfig.containerSelector) {
                    field.closest(fieldConfig.containerSelector).classList.add(form.config.inputContainerError);
                }
            }
        }
    }
    resetForm() {
        this.form.reset();
        this.config.fields.forEach(field => {
            field.error = false;
            this.errors = 0;
            let input = this._getInputElement(field);
            if (field.clearFunction) {
                field.clearFunction(this, field, input);
            } else {
                input.classList.remove(field.errorName);
                input.classList.remove(field.correctName);
                if (field.containerSelector) {
                    input.closest(field.containerSelector).classList.remove(this.config.inputContainerCorrect);
                    input.closest(field.containerSelector).classList.remove(this.config.inputContainerError);
                }
            }
            if (input.mask) {
                input.mask.updateValue();
            }
        });
        this.form.removeEventListener("submit", this.submitForm);
        this._firstValidation = true;
        this.startValidating();
    }
    submitForm(formEl, event, formObj) {
        event.preventDefault();
        if (formObj.errors === 0) {
            const data = {};
            new FormData(formEl).forEach((value, key) => {
                data[key] = value;
            });
            console.log(data);
            if (!formObj.config.successFormClassElement.classList.contains(formObj.config.successFormClass)) {
                formObj.config.successFormClassElement.classList.add(formObj.config.successFormClass);
            }
            this.resetForm();
        } else {
            formObj.config.fields.forEach(field => {
                if (field.error) {
                    let input = this._getInputElement(field);
                    if (input.length) {
                        input.forEach(x => {
                            x.classList.add(field.errorName);
                            if (field.containerSelector) {
                                x.closest(field.containerSelector).classList.add(formObj.config.inputContainerError);
                            }
                        });
                    } else {
                        input.classList.add(field.errorName);
                        if (field.containerSelector) {
                            input.closest(field.containerSelector).classList.add(formObj.config.inputContainerError);
                        }
                    }
                }
            });
        }
    }
    _getInputElement(field) {
        if (field.type === "textarea") {
            return this.form.querySelector(`textarea[name=${field.name}]`);
        } else if (["radio", "rating"].includes(field.type)) {
            return this.form.querySelectorAll(`input[name=${field.name}]`);
        }
        else {
            return this.form.querySelector(`input[name=${field.name}]`);
        }
    }
    initValidation() {
        for (let field of this.config.fields) {
            let input = this._getInputElement(field);
            if (["text", "textarea", "name"].includes(field.type)) {
                if (field.type === "name") {
                    input.mask = new IMask(input, {
                        mask: /^[а-яa-z]*$/i,
                        skipInvalid: true,
                    });
                }
                if (field.max) {
                    input.setAttribute("maxLength", field.max)
                }
                if (field.required) {
                    this.validateField(this, input, field);
                }
                if (!input.listened) {
                    input.addEventListener("input", () => this.validateField(this, input, field));
                    input.listened = true;
                }
            } else if (field.type === "checkbox") {
                if (field.required) {
                    this.validateField(this, input, field);
                }
                if (!input.listened) {
                    input.addEventListener("change", () => {this.validateField(this, input, field)});
                    input.listened = true;
                }
            } else if (field.type === "contacts") {
                input.mask = new IMask(input, {
                    mask: [
                        {
                            mask: '+{7}(000)000-00-00',
                        },
                        {
                            mask: /^.+$/i,
                        }
                    ]
                });
                if (field.required) {
                    this.validateField(this, input, field);
                }
                if (!input.listened) {
                    input.addEventListener("input", () => this.validateField(this, input, field));
                    input.listened = true;
                }
            } else if (["radio", "rating"].includes(field.type)) {
                if (field.required) {
                    input.forEach(() => {
                        this.validateField(this, input, field);
                    });
                }
                input.forEach(x => {
                    if (!x.listened) {
                        x.addEventListener("change", () => {
                            this.validateField(this, input, field)
                        });
                        x.listened = true;
                    }
                });
            } else if (field.type === "select") {
                if (field.required) {
                    this.validateField(this, input, field);
                }
                if (!input.listened) {
                    input.addEventListener("change", () => {this.validateField(this, input, field)});
                    input.listened = true;
                }
            } else if (field.type === "date") {
                input.mask = new IMask(input, {
                    mask: Date,
                    pattern: 'd-`m-`Y',
                    autofix: true,
                    blocks: {
                        d: {
                            mask: IMask.MaskedRange,
                            from: 1,
                            to: 31,
                            maxLength: 2,
                        },
                        m: {
                            mask: IMask.MaskedRange,
                            from: 1,
                            to: 12,
                            maxLength: 2,
                        },
                        Y: {
                            mask: IMask.MaskedRange,
                            from: typeof field.min.getFullYear === "function" ? field.min.getFullYear() : 1900,
                            to: typeof field.max.getFullYear === "function" ? field.max.getFullYear() : 9999,
                        }
                    },
                    format: date => {
                        let day = date.getDate();
                        let month = date.getMonth() + 1;
                        const year = date.getFullYear();
                    
                        if (day < 10) day = "0" + day;
                        if (month < 10) month = "0" + month;
                    
                        return [day, month, year].join('-');
                    },
                    parse: str => {
                        const yearMonthDay = str.split('-');
                        return new Date(yearMonthDay[2], yearMonthDay[1] - 1, yearMonthDay[0]);
                    },
                    min: typeof field.min.getMonth === 'function' ? field.min : new Date(1900, 0, 1),
                    max: typeof field.max.getMonth === 'function' ? field.max : new Date(9999, 0, 1),
                });
                if (field.required) {
                    this.validateField(this, input, field);
                }
                if (!input.listened) {
                    input.addEventListener("input", () => {this.validateField(this, input, field)});
                    input.listened = true;
                }
            }
        }
    }
    startValidating() {
        this.initValidation();
        this._firstValidation = false;
        if (!this.form.listened) {
            this.form.addEventListener("submit",(event) => this.submitForm(this.form, event, this));
            this.form.listened = true;
        }
    }
}
function clearRadio(form, field, input) {
    if (field.containerSelector) {
        input[0].closest(field.containerSelector).classList.remove(form.config.inputContainerError);
        input[0].closest(field.containerSelector).classList.remove(form.config.inputContainerCorrect);
    }
    input.forEach(x => {
        x.classList.remove(field.correctName);
        x.classList.remove(field.errorName);
        if (x.getAttribute("checked") !== null) {
            x.classList.add(field.correctName);
        }
    });
}
function clearSelect(form, field, input) {
    let selectContainer = input.closest(".select");
    let defaultValue = null;
    selectContainer.querySelectorAll(".select__item").forEach(x => x.classList.remove("select__item--selected"));
    if (field.containerSelector) {
        input.closest(field.containerSelector).classList.remove(form.config.inputContainerCorrect);
        input.closest(field.containerSelector).classList.remove(form.config.inputContainerError);
    }
    input.classList.remove(field.errorName);
    if (!input.getAttribute("data-default-id") || input.getAttribute("data-default-id") === "null") {
        selectContainer.querySelector("label").textContent = "Выберите значение:";
        selectContainer.querySelector(".select__output").classList.add("select__output--default");
        selectContainer.querySelectorAll(".select__item[data-value=\"none\"]").forEach(x => x.classList.add("select__item--selected"));
    } else {
        defaultValue = selectContainer.querySelectorAll(".select__item:not([data-value=\"none\"])")[Number(input.getAttribute("data-default-id"))];
    }
    if (!defaultValue) {
        input.value = input.getAttribute("data-default-value");
    } else {
        defaultValue.classList.add("select__item--selected");
        selectContainer.querySelector("label").textContent = defaultValue.getAttribute("data-name");
        input.value = defaultValue.getAttribute("data-value");
    }
}
let feedbackFormConfig = {
    fields: [
        new FormField("name", "name", "input-text__input--correct", "input-text__input--error", ".form__item", null, true, 2),
        new FormField("contacts", "contacts", "input-text__input--correct", "input-text__input--error", ".form__item", null, true),
        new FormField("textarea", "message","textarea__textarea--correct", "textarea__textarea--error", ".form__item", null, true, 5),
        new FormField("radio", "radio", "radio-button__input--correct", "radio-button__input--error", ".form__item", clearRadio, true),
        new FormField("select", "select", "select__input--correct", "select__input--error", ".form__item", clearSelect, true),
        new FormField("date", "date", "input-text__input--correct", "input-text__input--error", ".form__item", null, true, "", new Date()),
        new FormField("rating", "medRating", "rating__input--correct", "rating__input--error", ".form__item", clearRadio, true),
        new FormField("checkbox", "aggreement", "checkbox__input--correct", "checkbox__input--error", ".form__item", null, true),
    ],
    submitButtonSelector: ".form__button",
    onlyOnSubmitError: true,
    inputContainerCorrect: "form__item--correct",
    inputContainerError: "form__item--error",
    successFormClass: "feedback-modal--success",
    successFormClassElement: document.querySelector(".feedback-modal"),
}
function resetForm(event) {
    if (event.target.classList.contains("modal--visible") || event.target.closest(".modal__close-button")) {
        feedbackForm.resetForm();
    }
}
let feedbackForm = null;
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".feedback-modal__form .form")) {
        feedbackForm = new Form(".feedback-modal__form .form", feedbackFormConfig);
        feedbackForm.startValidating();
        document.querySelector(".feedback-modal-form").addEventListener("click", resetForm);
    }
});