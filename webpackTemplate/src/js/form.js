import IMask from 'imask';


class FormField {
    constructor(type, name, correct="_correct", error="_error", containerSelector=null, required=false, min=0, max=Infinity) {
        this.type = type;
        this.name = name;
        this.required = required;
        this.min = min;
        this.max = max;
        this.errorName = error;
        this.correctName = correct;
        this.containerSelector = containerSelector;
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
            onlyOnSubmitError: config.onlyOnSubmitError || false
        };
        this.errors = 0;
        this._firstValidation = true,
        this.submitButton = this.form.querySelector(this.config.submitButtonSelector);
    }
    validateField(form, field, fieldConfig) {
        if (["text", "textarea"].includes(fieldConfig.type)) {
            if (fieldConfig.min < field.value.length && fieldConfig.max > field.value.length) {
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
            let reEmail = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
            let rePhone = new RegExp(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/);
            if (reEmail.test(field.value)) {
                this.makeFieldCorrect(form, field, fieldConfig);
            } else if (rePhone.test(field.value)) {
                this.makeFieldCorrect(form, field, fieldConfig);
            } else {
                if (fieldConfig.required) {
                    this.makeFieldError(form, field, fieldConfig);
                }
                field.classList.remove(fieldConfig.correctName);
                this.removeContainerCorrect(form, field, fieldConfig);
            }
        } else if ("radio" === fieldConfig.type) {
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
            console.log(field);
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
    submitForm(formEl, event, formObj) {
        event.preventDefault();
        if (formObj.errors === 0) {
            const data = {};
            new FormData(formEl).forEach((value, key) => {
                data[key] = value;
            });
            console.log(data);
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
        } else if (field.type === "radio") {
            return this.form.querySelectorAll(`input[name=${field.name}]`);
        }
        else {
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
            } else if (field.type === "radio") {
                input.forEach(x => x.addEventListener("change", () => {
                    this.validateField(this, input, field)
                }));
                if (field.required) {
                    input.forEach(() => {
                        this.validateField(this, input, field);
                    });
                }
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
        new FormField("radio", "choice", "radio-button__input--correct", "radio-button__input--error", ".form__item", true),
        new FormField("checkbox", "aggreement", "checkbox__input--correct", "checkbox__input--error", ".form__item", true),
    ],
    submitButtonSelector: ".form__button",
    onlyOnSubmitError: true,
    inputContainerCorrect: "form__item--correct",
    inputContainerError: "form__item--error",
}
let feedbackForm = new Form(".feedback-modal__form .form", feedbackFormConfig).startValidating();