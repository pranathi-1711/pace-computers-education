
"use strict";
const SUPABASE_URL = "https://auorbiuxztgpuasfqzlw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY ="sb_publishable_InQQGNuZArb3c11_xEa_Ag_Sr_yJPGB";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
// Institute details
// Replace the empty values with the institute's real details.
const institute = {
    phone: "",
    location: "",
    email: ""
};

// Public course information
const courses = [
    {
        name: "C Language",
        symbol: "C",
        description: "Learn programming fundamentals, variables, loops and functions.",
        timing: "Contact us for batch timings",
        startDate: "Contact us for upcoming dates"
    },
    {
        name: "Python",
        symbol: "PY",
        description: "Learn Python syntax, conditions, loops, functions and more.",
        timing: "Contact us for batch timings",
        startDate: "Contact us for upcoming dates"
    },
    {
        name: "SQL",
        symbol: "SQL",
        description: "Learn databases, queries, filtering, joins and data management.",
        timing: "Contact us for batch timings",
        startDate: "Contact us for upcoming dates"
    },
    {
        name: "DCA",
        symbol: "DCA",
        description: "Explore computer applications and essential digital skills.",
        timing: "Contact us for batch timings",
        startDate: "Contact us for upcoming dates"
    },
    {
        name: "Advanced Python",
        symbol: "AP",
        description: "Build on Python fundamentals with more advanced programming concepts.",
        timing: "Contact us for batch timings",
        startDate: "Contact us for upcoming dates"
    },
    {
        name: "Tally",
        symbol: "T",
        description: "Explore accounting software and practical business accounting concepts.",
        timing: "Contact us for batch timings",
        startDate: "Contact us for upcoming dates"
    }
];

// Display course cards
async function displayCourses() {
    const courseGrid = document.getElementById("courseGrid");

    if (!courseGrid) return;

    courseGrid.textContent = "Loading courses...";

    const { data: courses, error } = await supabaseClient
        .from("pace_courses")
        .select("name, symbol, description, timing, start_date")
        .eq("is_active", true)
        .order("id");

    if (error) {
        console.error("Course loading error:", error);
        courseGrid.textContent =
            "Unable to load courses. Please try again later.";
        return;
    }

    courseGrid.replaceChildren();

    courses.forEach(function (course) {
        const card = document.createElement("article");
        card.className = "course-card";

        const symbol = document.createElement("div");
        symbol.className = "course-symbol";
        symbol.textContent = course.symbol;

        const title = document.createElement("h3");
        title.textContent = course.name;

        const description = document.createElement("p");
        description.textContent = course.description;

        const timing = document.createElement("div");
        timing.className = "course-meta";
        timing.textContent = course.timing;

        const startDate = document.createElement("p");
        startDate.textContent = course.start_date;

        const link = document.createElement("a");
        link.className = "course-link";
        link.href = "#contact";
        link.textContent = "Enquire about this course →";
        link.setAttribute(
            "aria-label",
            "Enquire about " + course.name
        );

        card.append(
            symbol,
            title,
            description,
            timing,
            startDate,
            link
        );

        courseGrid.appendChild(card);
    });
}

// Configure institute contact information
function setupContactDetails() {
    const phoneLink = document.getElementById("phoneLink");
    const locationLink = document.getElementById("locationLink");
    const emailLink = document.getElementById("emailLink");

    if (institute.phone.trim()) {
        const phone = institute.phone.replace(/[^\d+]/g, "");
        phoneLink.href = "tel:" + phone;
        phoneLink.textContent = institute.phone;
    }

    if (institute.location.trim()) {
        const mapUrl =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(institute.location);

        locationLink.href = mapUrl;
        locationLink.target = "_blank";
        locationLink.rel = "noopener noreferrer";
        locationLink.textContent = "View institute location";
    }

    if (institute.email.trim()) {
        emailLink.href =
            "mailto:" + encodeURIComponent(institute.email);

        emailLink.textContent = institute.email;
    }
}

// Mobile navigation
function setupNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}

// Update the copyright year automatically
function setupFooter() {
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Start the website
function initializeWebsite() {
    displayCourses();
    setupContactDetails();
    setupNavigation();
    setupFooter();
}

initializeWebsite();
