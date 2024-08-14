const display = document.querySelector("#display");
let input = "";

document.querySelectorAll(".operand").forEach((item) =>
  item.addEventListener("click", () => {
    let value = item.getAttribute("data-value");
    if (display.textContent === "Infinity") {
      clearAll();
    }
    display.textContent += value;
    input = display.textContent;
  })
);

document.querySelectorAll(".operator").forEach((item) =>
  item.addEventListener("click", () => {
    let operation = item.getAttribute("data-value");
    let lastChar = input.charAt(input.length - 1);
    if (display.textContent === "Infinity") {
      clearAll();
    }
    if (
      lastChar == "/" ||
      lastChar == "*" ||
      lastChar == "-" ||
      lastChar == "+" ||
      lastChar == "." ||
      input == ""
    ) {
      return;
    } else {
      if (brace == 1) {
        display.textContent += ")";
        brace = 0;
        neg = 0;
      }
      display.textContent += operation;
      input = display.textContent;
    }
  })
);

document.querySelector(".percent").addEventListener("click", () => {
  if (display.textContent === "Infinity") {
    clearAll();
  }
  let lastChar = input.charAt(input.length - 1);
  if (
    lastChar == "/" ||
    lastChar == "*" ||
    lastChar == "-" ||
    lastChar == "+" ||
    lastChar == "." ||
    input == ""
  ) {
    return;
  } else {
    let lastNum;
    let i = input.length - 1;
    for (i; i >= 0; i--) {
      if (
        input.charAt(i) == "/" ||
        input.charAt(i) == "*" ||
        input.charAt(i) == "+" ||
        input.charAt(i) == "-"
      ) {
        break;
      }
    }
    lastNum = input.substring(i + 1, input.length);
    lastNum = parseFloat(lastNum) / 100;
    input = input.slice(0, i + 1) + lastNum;
    display.textContent = input;
  }
});

document.querySelector(".decimal").addEventListener("click", () => {
  let lastChar = input.charAt(input.length - 1);
  if (lastChar == ".") {
    return;
  } else {
    let i = input.length - 1;
    for (i; i >= 0; i--) {
      if (
        input.charAt(i) == "/" ||
        input.charAt(i) == "*" ||
        input.charAt(i) == "+" ||
        input.charAt(i) == "-"
      ) {
        break;
      }
    }
    if (input.substring(i + 1, input.length - 1).includes(".")) {
      return;
    }
    display.textContent += ".";
    input = display.textContent;
  }
});

let neg = 0;
let brace = 0;

document.querySelector(".sign").addEventListener("click", () => {
  if (display.textContent == "") {
    display.textContent += "-";
    input = display.textContent;
    neg = 1;
    return;
  }
  let lastChar = input.charAt(input.length - 1);
  if ((lastChar == "/" || lastChar == "*") && brace == 0) {
    display.textContent += "(-";
    input = display.textContent;
    neg = 1;
    brace = 1;
  }
  if (lastChar == "-") {
    lastChar = "+";
    neg = 0;
    input = input.slice(0, input.length - 1) + lastChar;
    display.textContent = input;
  } else if (lastChar == "+") {
    lastChar = "-";
    neg = 1;
    input = input.slice(0, input.length - 1) + lastChar;
    display.textContent = input;
  }
});

document.querySelector(".delete").addEventListener("click", () => {
  let i = input.length - 1;
  input = input.slice(0, i);
  display.textContent = input;
  if (!input.includes("(")) {
    brace = 0;
  }
});

const clearAll = () => {
  display.textContent = "";
  input = display.textContent;
};

document.querySelector(".equal").addEventListener("click", () => {
  let lastChar = input.charAt(input.length - 1);
  if (
    lastChar == "/" ||
    lastChar == "*" ||
    lastChar == "-" ||
    lastChar == "+" ||
    lastChar == "." ||
    input == ""
  ) {
    return;
  }
  if (brace == 1) {
    display.textContent += ")";
    input = display.textContent;
    brace = 0;
    neg = 0;
  }
  let result = eval(input);
  if (result.toString().length > 10) {
    result = result.toPrecision(10);
  }
  display.textContent = result;
  if (display.textContent !== "Infinity") {
    input = display.textContent;
  }
});

document.querySelector(".all-clear").addEventListener("click", () => {
  clearAll();
});
