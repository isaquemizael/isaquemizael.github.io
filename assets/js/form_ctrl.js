let index = 0;
const formActiveClassName = ' active';

const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");

const form = document.getElementById("form")
const steps = form.getElementsByClassName("step");

nextBtn.onclick = next;
previousBtn.onclick = previous;
submitBtn.onclick = submit;

const NOT_EMPTY_REGEX = /[\S\s]+[\S]+/;

let rules = {
    'entry.1640204730': /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    'entry.1368216769': /^(\+55)?( ?\(?[0-9]{2}\)?)? ?[0-9]{1}( ?[0-9]{4}-[0-9]{4}| ?[0-9]{8}| ?[0-9]{9})$/,
}

function next() {
    if (validateGroup(document.getElementById("form"), steps[index])) {
        moveIndex(1);
    }
}

function submit() {
    if (validateGroup(document.getElementById("form"), steps[index])) {
        gtag('event', 'conversion', {'send_to': 'AW-16476182513/cBC6CN-I_pYZEPGvurA9'});
        form.submit();
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

function validateGroup(formElement, formSetElement) {
    let processedInputs = [];
    let formData = new FormData(formElement);
    let pass = true;

    for (let input of formSetElement.getElementsByClassName("input-field")) {
        if (processedInputs.indexOf(input.name) > -1) {
            continue;
        }

        let value = formData.get(input.name);
        let regex = new RegExp(rules[input.name] == null ? NOT_EMPTY_REGEX : rules[input.name]);

        let itemElement = input;
        do {
            itemElement = itemElement.parentElement;
        } while (!itemElement.className.includes("item"));


        if (!regex.test(value) || value == null) {
            if(!itemElement.className.includes("wrong")) {
                itemElement.className = `${itemElement.className} wrong`;
            }
            pass = false;
        } else {
            itemElement.className = itemElement.className.replace(" wrong", '');
        }

        processedInputs.push(input.name);
    }

    return pass;
}