const ready = () => {
    getQuestionsFromServer();
};

if (document.readyState !== "loading") {
    ready();
} else {
    document.addEventListener("DOMContentLoaded", ready);
}
