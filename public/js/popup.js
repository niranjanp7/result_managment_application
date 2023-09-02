/**
 * 
 * @param {String} title 
 * @param {String} content 
 * @param {String} submitStr 
 * @param {String} cancelStr 
 * @param {Function} submit 
 * @param {Function} cancel
 */
const cratePopUp = (title, content, submitStr, cancelStr, submit, cancel) => {
    const body = document.querySelector("body");
    const popUp = document.createElement("div");
    popUp.classList.add("popup");
    popUp.id = "popup";
    popUp.innerHTML += `<div class="popup-body">
        <div class="popup-header">
            <div class="popup-title">${title}</div>
        </div>
        <span class="popup-separator"></span>
        <div class="popup-content">${content}</div>
        <span class="popup-separator"></span>
        <div class="popup-footer">
            <button class="btn btn-info" id="submitBtn">${submitStr}</button>
            <button class="btn btn-secondary" id="cancelBtn">${cancelStr}</button>
        </div>
    </div>`;

    body.appendChild(popUp);
    popUp.querySelector("#submitBtn").addEventListener("click", () => {onSubmit(submit)});
    popUp.querySelector("#cancelBtn").addEventListener("click", () => {onCancel(cancel)});
};

const onSubmit = (fun) => {
    if (fun !== undefined) {
        fun();
    }
    document.querySelector("#popup").remove();
};

const onCancel = (fun) => {
    if (fun !== undefined) {
        fun();
    }
    document.querySelector("#popup").remove();
};
