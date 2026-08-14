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

const contentArea =
    document.querySelector("#content-area");


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

        sideNavigationList.appendChild(button);

    });

}

// ----------------------------------------
// Scroll Spy for Home Sections
// ----------------------------------------

function updateActiveSideNavigation() {

    const sections =
        document.querySelectorAll(".content-section");

    const sideNavItems =
        document.querySelectorAll(".side-nav-item");

    let activeIndex = 0;

    sections.forEach((section, index) => {

        const rect =
            section.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.5) {
            activeIndex = index;
        }

    });

    sideNavItems.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === activeIndex
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveSideNavigation
);

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

        console.log(
            "Selected page:",
            selectedPage
        );

    });

});
