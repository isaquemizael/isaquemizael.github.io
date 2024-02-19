let index = 0;
const formActiveClassName = ' active';

const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");

const steps = document.getElementById("form")
    .getElementsByClassName("step");

function next() {
    if(validateGroup(document.getElementById("form"), steps[index])) {
        moveIndex(1);
    }
}

function previous() {
    moveIndex(-1);
}

function moveIndex(n) {
    index += n;
    index = index < 0 ? 0 : index;
    index = index > steps.length - 1 ? steps.length - 1 : index;

    setupButtons();

    hide(steps[index - n]);
    show(steps[index]);
}

function setupButtons() {
    if (index === 0) {
        show(nextBtn);
        hide(previousBtn);
        hide(submitBtn);
    } else if (index < steps.length - 1) {
        show(previousBtn);
        show(nextBtn);
        hide(submitBtn);
    } else {
        show(previousBtn);
        hide(nextBtn);
        show(submitBtn);
    }
}

function hide(element) {
    element.className = element.className.replace(formActiveClassName, '');
}

function show(element) {
    if (!element.className.includes(formActiveClassName)) {
        element.className = `${element.className}${formActiveClassName}`;
    }
}

nextBtn.onclick = next;
previousBtn.onclick = previous;

const NOT_EMPTY_REGEX = /[\S\s]+[\S]+/;

let rules = {
    'entry.1688533993': NOT_EMPTY_REGEX
}

function validateGroup(formElement, formSetElement) {
    let processedInputs = [];
    let formData = new FormData(formElement);
    let pass = true;

    for (let input of formSetElement.getElementsByTagName("input")) {
        if(processedInputs.indexOf(input.name) > -1) {
            continue;
        }

        let value = formData.get(input.name);
        let regex = new RegExp(rules[input.name] == null ? NOT_EMPTY_REGEX : rules[input.name]);

        console.log(value);
        if(!regex.test(value)) {
            input.parentElement.className = `${input.parentElement.className} wrong`;
            pass = false;
        } else {
            input.parentElement.className = input.parentElement.className.replace(" wrong", '');
        }

        processedInputs.push(input.name);
    }

    return pass;
}