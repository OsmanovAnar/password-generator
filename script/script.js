//конфигурация по умолчанию
const config = {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
};

//Наборы символов
const charSets = {
    uppercase: "QWERTYUIOPASDFGHJKLZXCVBNM",
    lowercase: "qwertyuiopasdfghjklzxcvbnm",
    numbers: "0123456789",
    symbols: '~!@#$%^&*()_+`-=|[]{};":./<,>?',
};

//Элементы DOM
let elements = {
    lengthSlider: document.querySelector("#range-slider"),
    lengthValue: document.querySelector("#length-value"),
    resultBox: document.querySelector("#password-output"),
    copyBtn: document.querySelector("#copy-button"),
    generatorBtn: document.querySelector("#generate-button"),
    strenghValue: document.querySelector("#strength-level"),
    strenghIcon: document.querySelector("#strength-icon"),
    checkboxes: {
        uppercase: document.querySelector("#uppercase"),
        lowercase: document.querySelector("#lowercase"),
        numbers: document.querySelector("#numbers"),
        symbols: document.querySelector("#symbols"),
    },
};

function initEvents() {
    //Изменение длины пароля
    elements.lengthSlider.addEventListener("input", () => {
        const length = elements.lengthSlider.value;
        config.length = length;
        elements.lengthValue.textContent = length;
    });

    //Обработка чекбоксов
    Object.keys(elements.checkboxes).forEach((type) => {
        console.log(type);
        elements.checkboxes[type].addEventListener("change", () => {
            config[type] = elements.checkboxes[type].checked;
        });
    });

    //Кнопка генерации пароля
    elements.generatorBtn.addEventListener("click", generatePassword);

    //кнопка копиррвания
    elements.copyBtn.addEventListener("click", copyClipboard);
}

//генерация пароля
function generatePassword() {

    const atLeanstOneSelected = Object.values(config).some(
        (value) => typeof value === "boolean" && value === true
    );

    if (!atLeanstOneSelected) {
        elements.resultBox.textContent = "Выберите хотя бы один тип символов";
        updateStrength(0);
        return;
    }

    let allChars = "";

    Object.keys(charSets).forEach((type) => {
        if (config[type]) {
            allChars += charSets[type];
        }
    });

    let password = "";
    const selectedTypes = Object.keys(charSets).filter((type) => config[type]);

    selectedTypes.forEach((type) => {
        const charSet = charSets[type];
        const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
        password += randomChar;
    });

    for (let i = selectedTypes.length; i < config.length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }

    password = shuffleString(password);
    elements.resultBox.textContent = password;
    updateStrength(calculateStrength(password));
}

function shuffleString(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

initEvents()