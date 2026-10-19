let display_number = document.querySelector("#current-operand");
let previousInput = "";
let currentInput = "";
let operation = null;

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(`${e.target.textContent} was pressed`);

    if (button.classList.contains("number")) {
      if (display_number.textContent === "0") {
        display_number.textContent = "";
      }
      display_number.textContent += e.target.textContent;
    } else if (button.classList.contains("equals")) {
      {
        currentInput = display_number.textContent;
        // console.log(
        //   `previous=${previousInput},current=${currentInput},inputbox=${display_number.textContent}`,
        // );
        let result = 0;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operation) {
          case "+":
            result = prev + curr;
            break;
          case "-":
            result = prev - curr;
            break;
          case "x":
            result = prev * curr;
            break;
          case "÷":
            result = prev / curr;
            break;
        }
        display_number.textContent = result;
        operation = "";
        previousInput = "";
        currentInput = "";
        console.log(
          `previous=${previousInput},current=${currentInput},inputbox=${display_number.textContent}`,
        );
      }
    } else if (button.classList.contains("operator")) {
      if (previousInput !== "" && operation !== null) {
        currentInput = display_number.textContent;
        let result = 0;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operation) {
          case "+":
            result = prev + curr;
            break;
          case "-":
            result = prev - curr;
            break;
          case "x":
            result = prev * curr;
            break;
          case "÷":
            result = prev / curr;
            break;
        }

        display_number.textContent = result;
        previousInput = result; // Store the running total as the new previous input!
      } else {
        // Otherwise, this is the first operator click, just save the screen value
        previousInput = display_number.textContent;
      }
      display_number.textContent = "";
      operation = e.target.textContent;
    } else if (button.classList.contains("action-clear")) {
      display_number.textContent = "0";
      currentInput = "";
      previousInput = "";
      operation = null;
      console.log(
        `previous=${previousInput},current=${currentInput},inputbox=${display_number.textContent}`,
      );
    }
  });
});
