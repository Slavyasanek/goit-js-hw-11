import throttle from "lodash.throttle";

const btnScroll = document.querySelector('.icon-top');
btnScroll.style.display = "none";

const showTopBtn = () => {
    const windowHeight = window.innerHeight;
    const scrolled = window.pageYOffset;
    
    if (windowHeight < scrolled) {
        btnScroll.style.display = "block";
    } else {
        btnScroll.style.display = "none";
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}

window.addEventListener("scroll", throttle(showTopBtn, 300));
btnScroll.addEventListener("click", scrollToTop);