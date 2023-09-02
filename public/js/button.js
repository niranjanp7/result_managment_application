/**
 * 
 * @param {HTMLButtonElement} btn 
 */
const btnRippleEffect = (btn) => {
    btn.addEventListener("click", (e) => {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement("span");
        ripple.classList.add("btn-ripple-effect")
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        btn.appendChild(ripple);
        setTimeout(() => {ripple.remove()}, 500);
    });
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => btnRippleEffect(btn));