// ========================================
// STRYKON GLOBAL
// Website Navigation
// ========================================


// ----------------------------------------
// Page Navigation
// ----------------------------------------

const topNavigationItems = document.querySelectorAll(".top-nav-item");

const sideNavigationTitle =
    document.querySelector(".side-navigation-title");

const sideNavigationList =
    document.querySelector("#side-navigation-list");

const siteHeader =
    document.querySelector(".site-header");

const directorateSections =
    document.querySelectorAll(".content-section[data-directorate]");


// ----------------------------------------
// Left Navigation Content
// ----------------------------------------

const pageNavigation = {

    home: {
        title: "HOME",

        items: [
            "Mobility Systems",
            "Advanced Weapons",
            "Powered Systems",
            "Human Advancement",
            "Autonomous Systems",
            "Strategic Technologies"
        ]
    },

    products: {
        title: "PRODUCTS",

        items: [
            "Dragonfly",
            "Next-Generation Rifles",
            "Weapons Systems",
            "Mobility Systems",
            "Powered Systems",
            "Human Advancement",
            "Autonomous Systems",
            "Strategic Technologies"
        ]
    },

    about: {
        title: "ABOUT US",

        items: [
            "Mission",
            "Values",
            "Our History",
            "Corporate Timeline",
            "Leadership"
        ]
    },

    news: {
        title: "NEWS",

        items: [
            "Latest News",
            "Technology",
            "Government Relations"
        ]
    },

    careers: {
        title: "CAREERS",

        items: [
            "Why Strykon?",
            "Life at Strykon",
            "Benefits",
            "Open Positions"
        ]
    },

    employee: {
        title: "EMPLOYEE ACCESS",

        items: [
            "Personnel",
            "Departments",
            "Internal News",
            "Research",
            "Projects",
            "Security",
            "Restricted"
        ]
    }

};


// ----------------------------------------
// Home Directorate Navigation
// ----------------------------------------

const homeDirectorates = {
    "Mobility Systems": "mobility-systems",
    "Advanced Weapons": "advanced-weapons",
    "Powered Systems": "powered-systems",
    "Human Advancement": "human-advancement",
    "Autonomous Systems": "autonomous-systems",
    "Strategic Technologies": "strategic-technologies"
};


function isHomeActive() {

    return document.querySelector(".top-nav-item.active")?.dataset.page === "home";

}


function setActiveDirectorate(directorate) {

    if (!isHomeActive()) {
        return;
    }

    sideNavigationList
        .querySelectorAll(".side-nav-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.directorate === directorate
            );

        });

}


function getCurrentDirectorate() {

    const headerHeight = siteHeader.offsetHeight;

    return [...directorateSections]
        .reduce((closestSection, section) => {

            const currentDistance = Math.abs(
                section.getBoundingClientRect().top - headerHeight
            );

            const closestDistance = Math.abs(
                closestSection.getBoundingClientRect().top - headerHeight
            );

            return currentDistance < closestDistance
                ? section
                : closestSection;

        })
        .dataset.directorate;

}


function scrollToDirectorate(directorate) {

    const section = document.querySelector(`#${directorate}`);

    if (!section) {
        return;
    }

    setActiveDirectorate(directorate);

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ----------------------------------------
// Change Left Navigation
// ----------------------------------------

function updateSideNavigation(page) {

    const navigation = pageNavigation[page];

    sideNavigationTitle.textContent =
        navigation.title;

    sideNavigationList.innerHTML = "";

    navigation.items.forEach((item, index) => {

        const button =
            document.createElement("button");

        button.classList.add("side-nav-item");

        if (index === 0) {
            button.classList.add("active");
        }

        button.textContent = item;

        if (page === "home") {
            button.dataset.directorate = homeDirectorates[item];
        }

        sideNavigationList.appendChild(button);

    });

}

// ----------------------------------------
// Change Active Top Navigation
// ----------------------------------------

function setActiveTopNavigation(activeItem) {

    topNavigationItems.forEach(item => {

        item.classList.remove("active");

    });

    activeItem.classList.add("active");

}


// ----------------------------------------
// Top Navigation Click Events
// ----------------------------------------

topNavigationItems.forEach(item => {

    item.addEventListener("click", () => {

        const selectedPage =
            item.dataset.page;

        setActiveTopNavigation(item);

        updateSideNavigation(selectedPage);

        if (selectedPage === "home") {
            setActiveDirectorate(getCurrentDirectorate());
        }

        console.log(
            "Selected page:",
            selectedPage
        );

    });

});


// ----------------------------------------
// Home Side Navigation Click Events
// ----------------------------------------

sideNavigationList.addEventListener("click", event => {

    const item = event.target.closest(".side-nav-item");

    if (!item || !isHomeActive() || !item.dataset.directorate) {
        return;
    }

    scrollToDirectorate(item.dataset.directorate);

});


// ----------------------------------------
// Home Directorate Scroll Spy
// ----------------------------------------

let directorateObserver;

function observeDirectorates() {

    if (directorateObserver) {
        directorateObserver.disconnect();
    }

    const headerHeight = siteHeader.offsetHeight;

    directorateObserver = new IntersectionObserver(entries => {

        const mostVisibleSection = entries
            .filter(entry => entry.isIntersecting)
            .sort((first, second) =>
                second.intersectionRatio - first.intersectionRatio
            )[0];

        if (mostVisibleSection) {
            setActiveDirectorate(
                mostVisibleSection.target.dataset.directorate
            );
        }

    }, {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0.6]
    });

    directorateSections.forEach(section => {

        directorateObserver.observe(section);

    });

}


observeDirectorates();

window.addEventListener("resize", observeDirectorates);
