
// Function to show/hide arrow icons based on scroll position
function showHideIcons(carousel, arrowIcons) {
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth ? "none" : "block";
}

// Function to handle dragging on the carousel
function handleDragStart(carousel, e) {
    carousel.isDragStart = true;
    carousel.prevpageX = e.pageX || e.touches[0].pageX;
    carousel.prevScrollLeft = carousel.scrollLeft;
}

function handleDragging(carousel, e) {
    if (!carousel.isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    const positionDiff = (e.pageX || e.touches[0].pageX) - carousel.prevpageX;
    carousel.scrollLeft = carousel.prevScrollLeft - positionDiff;
}

function handleDragStop(carousel) {
    carousel.isDragStart = false;
    carousel.classList.remove("dragging");
}

// Initialize carousels
const carousel1 = document.querySelector(".carousel");
const arrowIcons1 = document.querySelectorAll(".wrapper i");
carousel1.isDragStart = false;

const carousel2 = document.querySelector(".carousel_offers");
const arrowIcons2 = document.querySelectorAll(".wrapper_offers i");
carousel2.isDragStart = false;

// Add event listeners for both carousels
carousel1.addEventListener("mousedown", (e) => handleDragStart(carousel1, e));
carousel1.addEventListener("touchstart", (e) => handleDragStart(carousel1, e));

carousel1.addEventListener("mousemove", (e) => handleDragging(carousel1, e));
carousel1.addEventListener("touchmove", (e) => handleDragging(carousel1, e));

carousel1.addEventListener("mouseup", () => handleDragStop(carousel1));
carousel1.addEventListener("touchend", () => handleDragStop(carousel1));

showHideIcons(carousel1, arrowIcons1);

arrowIcons1.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel1.scrollLeft += icon.id === "left" ? -carousel1.clientWidth : carousel1.clientWidth;
        showHideIcons(carousel1, arrowIcons1);
    });
});

carousel2.addEventListener("mousedown", (e) => handleDragStart(carousel2, e));
carousel2.addEventListener("touchstart", (e) => handleDragStart(carousel2, e));

carousel2.addEventListener("mousemove", (e) => handleDragging(carousel2, e));
carousel2.addEventListener("touchmove", (e) => handleDragging(carousel2, e));

carousel2.addEventListener("mouseup", () => handleDragStop(carousel2));
carousel2.addEventListener("touchend", () => handleDragStop(carousel2));

showHideIcons(carousel2, arrowIcons2);

arrowIcons2.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel2.scrollLeft += icon.id === "left" ? -carousel2.clientWidth : carousel2.clientWidth;
        showHideIcons(carousel2, arrowIcons2);
    });
});