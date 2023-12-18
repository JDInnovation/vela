document.addEventListener("DOMContentLoaded", function () {
    function makeCarouselDraggable(carousel) {
        const carouselContent = carousel.querySelector(".carousel");
        const arrowIcons = carousel.querySelectorAll(".arrow-icons i");

        let isDragStart = false;
        let prevpageX, prevScrollLeft;
        let firstCard = carouselContent.querySelectorAll(".of_card")[0];
        let cardWidth = firstCard.clientWidth + 20; // Adjust this value as needed

        let scrollWidth = carouselContent.scrollWidth - carouselContent.clientWidth;

        const showHideIcons = () => {
            arrowIcons[0].style.display = carouselContent.scrollLeft === 0 ? "none" : "block";
            arrowIcons[1].style.display = carouselContent.scrollLeft === scrollWidth ? "none" : "block";
        };

        arrowIcons.forEach((icon) => {
            icon.addEventListener("click", () => {
                carouselContent.scrollLeft += icon.classList.contains("carousel-prev") ? -cardWidth : cardWidth;
                setTimeout(() => showHideIcons(), 60);
            });
        });

        const dragStart = (e) => {
            isDragStart = true;
            prevpageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carouselContent.scrollLeft;
        };

        const dragging = (e) => {
            if (!isDragStart) return;
            e.preventDefault();
            carouselContent.classList.add("dragging");
            let positionDiff = (e.pageX || e.touches[0].pageX) - prevpageX;
            carouselContent.scrollLeft = prevScrollLeft - positionDiff;
        };

        const dragStop = () => {
            isDragStart = false;
            carouselContent.classList.remove("dragging");
        };

        carouselContent.addEventListener("mousedown", dragStart);
        carouselContent.addEventListener("touchstart", dragStart);

        carouselContent.addEventListener("mousemove", dragging);
        carouselContent.addEventListener("touchmove", dragging);

        carouselContent.addEventListener("mouseup", dragStop);
        carouselContent.addEventListener("touchend", dragStop);

        // Ensure arrow icons are initially hidden for each carousel
        showHideIcons();
    }

    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((carousel) => {
        makeCarouselDraggable(carousel);
    });
});