/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
(function () {
  window.onload = () => {
    const jumbotrons = document.querySelectorAll(".wp-block-blaze-jumbotron");
    ;

    for (const jumbotron of jumbotrons) {
      const backButton = jumbotron.querySelector(".jumbotron__back-button");
      const sections = jumbotron.querySelectorAll(".section__container");

      for (const section of sections) {
        section.querySelector(".section__background").addEventListener("click", () => handleSectionClick(section));
      }

      jumbotron.addEventListener("sectionOpened", () => jumbotron.classList.add("is-section-opened"));
      jumbotron.addEventListener("sectionClosed", () => jumbotron.classList.remove("is-section-opened"));
      backButton.addEventListener("click", handleBackButtonClick);

      async function handleSectionClick(section) {
        jumbotron.dispatchEvent(new Event("sectionOpened"));
        section.classList.add("is-opened");
        const contentElement = section.querySelector(".section__content");

        if (contentElement.innerHTML != "") {
          contentElement.classList.add("is-content-visible");
          return;
        }

        const contentSourceSlug = contentElement.getAttribute("data-source");
        const fetchedContent = await fetchContent(contentSourceSlug);
        contentElement.innerHTML = fetchedContent;
        contentElement.classList.add("is-content-visible");
      }

      function handleBackButtonClick() {
        jumbotron.dispatchEvent(new Event("sectionClosed"));
        const section = Array.from(sections).filter(section => section.classList.contains("is-opened"))[0];
        section.classList.remove("is-opened");
        section.querySelector(".section__content").classList.remove("is-content-visible");
      }

      async function fetchContent(slug) {
        const response = await fetch(`/wp-json/wp/v2/pages?slug=${slug}&_fields=content`);
        return (await response.json())[0].content.rendered;
      }
    }
  };
})();
/******/ })()
;
//# sourceMappingURL=view.js.map