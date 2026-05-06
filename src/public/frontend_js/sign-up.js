// Client-side validation
console.log("hello")

const email = document.getElementById("email");

email.addEventListener("input", (event) => {
    email.setCustomValidity("");
    if (!email.validity.valid) {
        return;
    }
    if (!email.value.endsWith("@example.com")) {
        email.setCustomValidity("Please enter a fake email address ending with '@example.com'!");
    }
});
