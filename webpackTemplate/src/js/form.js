import IMask from 'imask';


class FormField {
    constructor(type, name, correct="_correct", error="_error", containerSelector=null, required=false, min=0, max=Infinity) {
        this.type = type,
        this.name = name,
        this.required = required,
        this.min = min,
        this.max = max,
        this.errorName = error,
        this.correctName = correct,
        this.containerSelector = containerSelector,
        this._error = null
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
            onlyOnSubmitError: config.onlyOnSubmitError || false
        };
        this.errors = 0;
        this._firstValidation = true,
        this.submitButton = this.form.querySelector(this.config.submitButtonSelector);
    }
    validateField(form, field, config) {
        if (["text", "textarea"].includes(config.type)) {
            if (config.min < field.value.length && config.max > field.value.length) {
                this.makeFieldCorrect(form, field, config);
            } else {
                if (config.required) {
                    this.makeFieldError(form, field, config);
                }
                field.classList.remove(config.correctName);
                this.removeContainerCorrect(form, field, config);
            }
        } else if ("checkbox" === config.type) {
            if (field.checked) {
                this.makeFieldCorrect(form, field, config);
            } else {
                if (config.required) {
                    this.makeFieldError(form, field, config);
                }
                field.classList.remove(config.correctName);
                this.removeContainerCorrect(form, field, config);
            }
        } else if ("contacts" === config.type) {
            let reEmail = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
            let rePhone = new RegExp(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/);
            if (reEmail.test(field.value)) {
                this.makeFieldCorrect(form, field, config);
            } else if (rePhone.test(field.value)) {
                this.makeFieldCorrect(form, field, config);
            } else {
                if (config.required) {
                    this.makeFieldError(form, field, config);
                }
                field.classList.remove(config.correctName);
                this.removeContainerCorrect(form, field, config);
            }
        }
    }
    makeContainerCorrect(form, field, config) {
        if (config.containerSelector) {
            field.closest(config.containerSelector).classList.add(form.config.inputContainerCorrect);
        }
    }
    removeContainerCorrect(form, field, config) {
        if (config.containerSelector) {
            field.closest(config.containerSelector).classList.remove(form.config.inputContainerCorrect);
        }
    }
    makeFieldCorrect(form, field, config) {
        if (config.error) {
            form.errors -= 1;
            config.error = false;
            field.classList.remove(config.errorName);
            if (config.containerSelector) {
                field.closest(config.containerSelector).classList.remove(form.config.inputContainerError);
            }
        }
        this.makeContainerCorrect(form, field, config);
        field.classList.add(config.correctName);
    }
    makeFieldError(form, field, config) {
        if (!config.error) {
            form.errors += 1;
            config.error = true;
        }
        if (!form.config.onlyOnSubmitError && !form._firstValidation) {
            field.classList.add(config.errorName);
            if (config.containerSelector) {
                field.closest(config.containerSelector).classList.add(form.config.inputContainerError);
            }
        }
    }
    submitForm(formEl, event, form) {
        event.preventDefault();
        if (form.errors === 0) {
            const data = {};
            new FormData(formEl).forEach((value, key) => {
                data[key] = value;
            });
            console.log(data);
        } else {
            form.config.fields.forEach(field => {
                if (field.error) {
                    let input = this._getInputElement(field);
                    input.classList.add(field.errorName);
                    if (field.containerSelector) {
                        input.closest(field.containerSelector).classList.add(form.config.inputContainerError);
                    }
                }
            });
        }
    }
    _getInputElement(field) {
        if (field.type === "textarea") {
            return this.form.querySelector(`textarea[name=${field.name}]`);
        } else {
            return this.form.querySelector(`input[name=${field.name}]`);
        }
    }
    initValidation() {
        for (let field of this.config.fields) {
            let input = this._getInputElement(field);
            if (["text", "textarea"].includes(field.type)) {
                if (field.max) {
                    input.setAttribute("maxLength", field.max)
                }
                if (field.required) {
                    this.validateField(this, input, field);
                }
                input.addEventListener("input", () => this.validateField(this, input, field));
            } else if (field.type === "checkbox") {
                if (field.required) {
                    this.validateField(this, input, field);
                }
                input.addEventListener("change", () => {this.validateField(this, input, field)});
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
                input.addEventListener("input", () => this.validateField(this, input, field));
            }
        }
    }
    startValidating() {
        this.initValidation();
        this._firstValidation = false;
        this.form.addEventListener("submit",(event) => this.submitForm(this.form, event, this));
    }
}
let feedbackFormConfig = {
    fields: [
        new FormField("text", "name", "input-text__input--correct", "input-text__input--error", ".form__item", true),
        new FormField("contacts", "contacts", "input-text__input--correct", "input-text__input--error", ".form__item", true),
        new FormField("textarea", "message", "textarea__textarea--correct", "textarea__textarea--error", ".form__item", true),
        new FormField("checkbox", "aggreement", "checkbox__input--correct", "checkbox__input--error", ".form__item", true),
    ],
    submitButtonSelector: ".form__button",
    onlyOnSubmitError: true,
    inputContainerCorrect: "form__item--correct",
    inputContainerError: "form__item--error",
}
let feedbackForm = new Form(".feedback-modal__form form", feedbackFormConfig).startValidating();