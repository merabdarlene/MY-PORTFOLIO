// ==========================================
// WORK / STORY SWITCH
// ==========================================

const workPage = document.getElementById("workPage");
const storyPage = document.getElementById("storyPage");

const workButton = document.getElementById("workButton");
const storyButton = document.getElementById("storyButton");
const switchTrack = document.getElementById("switch");

let currentPage = "work";


function showWork() {

    if (currentPage === "work") return;

    currentPage = "work";

    storyPage.classList.remove("active-page");

    setTimeout(() => {

        storyPage.style.display = "none";
        workPage.style.display = "block";

        setTimeout(() => {
            workPage.classList.add("active-page");
        }, 20);

    }, 300);

    workButton.classList.add("active");
    storyButton.classList.remove("active");

    switchTrack.classList.remove("story-active");

    document.body.classList.remove("story-mode");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showStory() {

    if (currentPage === "story") return;

    currentPage = "story";

    workPage.classList.remove("active-page");

    setTimeout(() => {

        workPage.style.display = "none";
        storyPage.style.display = "block";

        setTimeout(() => {
            storyPage.classList.add("active-page");
        }, 20);

    }, 300);

    storyButton.classList.add("active");
    workButton.classList.remove("active");

    switchTrack.classList.add("story-active");

    document.body.classList.add("story-mode");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


workButton.addEventListener("click", showWork);

storyButton.addEventListener("click", showStory);

switchTrack.addEventListener("click", () => {

    if (currentPage === "work") {
        showStory();
    } else {
        showWork();
    }

});


// ==========================================
// COPY EMAIL
// ==========================================

const emailButton = document.getElementById("emailButton");
const copyMessage = document.getElementById("copyMessage");

const myEmail = "merabdarlene@gmail.com";


if (emailButton) {

    emailButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(myEmail);

            copyMessage.style.display = "inline";

            emailButton.textContent = "EMAIL COPIED ✓";

            setTimeout(() => {

                copyMessage.style.display = "none";

                emailButton.textContent = "COPY MY EMAIL";

            }, 2500);

        } catch (error) {

            alert("Email: " + myEmail);

        }

    });

}


// ==========================================
// STORY MEMORY STACK
// ==========================================

const memoryStack = document.querySelector(".memory-stack");

if (memoryStack) {

    const cards = Array.from(
        memoryStack.querySelectorAll(".memory-card")
    );

    let currentCard = 0;

    let startX = 0;
    let startY = 0;

    let dragging = false;


    function updateMemoryStack() {

        cards.forEach((card, index) => {

            const position =
                (index - currentCard + cards.length)
                % cards.length;


            card.style.zIndex =
                cards.length - position;


            if (position === 0) {

                card.style.pointerEvents = "auto";

                card.style.transform =
                    "translate(0, 0) rotate(-2deg)";

                card.style.opacity = "1";

            } else {

                card.style.pointerEvents = "none";

                const rotation =
                    position % 2 === 0 ? 3 : -3;

                card.style.transform = `
                    translate(${position * 4}px,
                    ${position * 3}px)
                    rotate(${rotation}deg)
                `;

                card.style.opacity = "1";
            }

        });

    }


    memoryStack.addEventListener(
        "pointerdown",
        function (event) {

            const topCard = cards[currentCard];

            if (!event.target.closest(".memory-card")) {
                return;
            }

            if (event.target.closest(".memory-card")
                !== topCard) {
                return;
            }

            dragging = true;

            startX = event.clientX;
            startY = event.clientY;

            topCard.style.transition = "none";

            topCard.setPointerCapture(
                event.pointerId
            );

        }
    );


    memoryStack.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging) return;

            const topCard = cards[currentCard];

            const x =
                event.clientX - startX;

            const y =
                event.clientY - startY;


            topCard.style.transform = `
                translate(${x}px, ${y}px)
                rotate(${x * 0.08}deg)
            `;

        }
    );


    memoryStack.addEventListener(
        "pointerup",
        function (event) {

            if (!dragging) return;

            dragging = false;

            const topCard = cards[currentCard];

            const x =
                event.clientX - startX;

            const y =
                event.clientY - startY;


            topCard.style.transition =
                "transform 0.4s ease, opacity 0.4s ease";


            const distance =
                Math.sqrt(
                    x * x + y * y
                );


            if (distance > 100) {

                topCard.style.transform = `
                    translate(${x * 3}px, ${y * 3}px)
                    rotate(${x * 0.15}deg)
                `;

                topCard.style.opacity = "0";


                setTimeout(() => {

                    currentCard =
                        (currentCard + 1)
                        % cards.length;

                    topCard.style.transition =
                        "none";

                    topCard.style.opacity = "1";

                    updateMemoryStack();

                }, 400);


            } else {

                topCard.style.transform =
                    "translate(0, 0) rotate(-2deg)";

            }

        }
    );


    memoryStack.addEventListener(
        "pointercancel",
        function () {

            dragging = false;

            if (cards[currentCard]) {

                cards[currentCard].style.transform =
                    "translate(0, 0) rotate(-2deg)";

            }

        }
    );


    updateMemoryStack();

}
