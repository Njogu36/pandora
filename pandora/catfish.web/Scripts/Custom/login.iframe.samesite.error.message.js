function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var errorMessage;

if (inIframe()) {
    const article = document.createElement("article");
    article.classList.add("message");
    article.classList.add("is-danger");

    const msg = document.createElement("div");
    msg.classList.add("message-body");
    msg.classList.add("center");
    msg.style.cssText += 'text-align:center'
    msg.innerText = errorMessage;
    article.appendChild(msg);

    document.getElementsByClassName("login__wrapper")[0].replaceWith(article)
}