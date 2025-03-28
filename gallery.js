const visionBoards = [
    {
        img: "https://i.pinimg.com/736x/36/4c/0c/364c0c38c06e35e8795530bf6d49db55.jpg",
        title: "Dream life",
        description: "The art of dreeaming and making it true one-day.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=alizey",
        profileName: "Alizey Malik"
    },
    {
        img: "https://i.pinimg.com/736x/75/d2/7b/75d27ba26ff271bafe99043c0167bcca.jpg",
        title: "Dream Car Collection",
        description: "Own a collection of luxury and exotic cars I've always admired.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
        profileName: "Zainab Sharif"
    },
    {
        img: "https://i.pinimg.com/736x/1a/db/c4/1adbc4008905a869218beb51ea44bdc0.jpg",
        title: "Travel Adventure",
        description: "Travel to breathtaking destinations and experience new cultures.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Areeba",
        profileName: "Areeba Najam"
    },
    {
        img: "https://i.pinimg.com/736x/2c/36/bb/2c36bb87e375aad19acec9d8db064a39.jpg",
        title: "Dream Job",
        description: "Leading in a role that fuels my passion.",
        profileImg: "https://api.dicebear.com/7.x/micah/svg?seed=saad",
        profileName: "Saad Malik"
    },
    {
        img: "https://i.pinimg.com/736x/77/31/5f/77315fd0dc656adaeba3d657db927bc6.jpg",
        title: "Academic Excellence",
        description: "Strive for high grades, continuous learning, and self-improvement.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rania",
        profileName: "Rania Waseem"
    },
    {
        img: "https://i.pinimg.com/736x/e6/0c/24/e60c24284d127f2245788383685c80e8.jpg",
        title: "Fitness Transformation",
        description: "Stay active, eat healthy, and achieve the body of my dreams.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha",
        profileName: "Ayesha Khan",
    },
    {
        img: "https://i.pinimg.com/736x/de/05/b9/de05b95bed7ce053d270c864f7ac28f9.jpg",
        title: "Career Success",
        description: "Climb the corporate ladder and become a leader in my field.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
        profileName: "Ghulam Fatima"
    },
    {
        img: "https://i.pinimg.com/736x/60/a3/bc/60a3bc71cfb7a82a1f9b1e4bcfda8eb4.jpg",
        title: "Financial Independence",
        description: "Save, invest, and build long-term wealth for a stress-free future.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
        profileName: "Zainab Sharif"
    },
    {
        img: "https://i.pinimg.com/736x/9c/07/85/9c0785e5c6e7b7bb3683f3964f3e0c0a.jpg",
        title: "Relationship Goals",
        description: "Strengthen bonds with family and friends, and cherish every moment.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farwa",
        profileName: "Farwa Abbas"
    },
    {
        img: "https://i.pinimg.com/736x/25/95/5d/25955de011f92be10e6c64fe76902c3a.jpg",
        title: "Lifelong Learner",
        description: "Master different languages and take a coding bootcamp.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
        profileName: "Abdullah"
    },
    {
        img: "https://i.pinimg.com/736x/cd/2a/a0/cd2aa0095662bd5f9eaf304ba8c5c05e.jpg",
        title: "Cottage Dream",
        description: "Own a sustainable, beautiful home by the lake.",
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=zoya",
        profileName: "Zoya Khan"
    },
    {
        img: "https://i.pinimg.com/736x/bb/84/ed/bb84ed34cc2b481b3670c54f7b9c4804.jpg",
        title: "Spiritual Health",
        description: "Daily meditation leads to inner peace.",
        profileImg: "https://api.dicebear.com/7.x/personas/svg?seed=Arooj",
        profileName: "Arooj Abbas"
    }
];

//sidebar
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".toggle");
    const home = document.querySelector("main");
    const header = document.querySelector(".h");
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);

    toggle.addEventListener("click", (e) => {
        e.stopPropagation(); 
        sidebar.classList.toggle("close");
        home.classList.toggle("close");
        header.classList.toggle("close");
        if (window.innerWidth <= 768) {
            overlay.style.display = sidebar.classList.contains("close") ? 'none' : 'block';
        }
        document.body.style.overflow = sidebar.classList.contains("close") ? "auto" : "hidden";
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.add("close");
        home.classList.add("close");
        header.classList.add("close");
        overlay.style.display = 'none';
        document.body.style.overflow = "auto";
    });

    // Vision Boards 
    const gallery = document.getElementById("gallery");
    if (gallery) {
        visionBoards.forEach((board, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img class="vision-image" src="${board.img}" alt="${board.title}">
                <div class="profile-container">
                    <img class="profile-img" src="${board.profileImg}" alt="${board.profileName}">
                    <span class="profile-name">${board.profileName}</span>
                </div>
                <h3>${board.title}</h3>
            `;
            card.addEventListener("click", () => openModal(index));
            gallery.appendChild(card);
        });
    }

    // Search 
    const searchBox = document.getElementById("searchBox");
    const searchButton = document.querySelector(".search-container button");
    if (searchBox && searchButton) {
        searchButton.addEventListener("click", filterBoards);
        searchBox.addEventListener("keypress", (e) => {
            if (e.key === "Enter") filterBoards();
        });
    }
});

function filterBoards() {
    const searchValue = document.getElementById("searchBox").value.toLowerCase().trim();
    const cards = document.getElementsByClassName("card");
    Array.from(cards).forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(searchValue) ? "block" : "none";
    });
}

// Modal
function openModal(index) {
    if (!visionBoards[index]) return;

    const modal = document.getElementById("modal");
    const sidebar = document.querySelector(".sidebar");
    const header = document.querySelector(".h");
    modal.querySelector("#modal-image").src = visionBoards[index].img;
    modal.querySelector("#modal-title").textContent = visionBoards[index].title;
    modal.querySelector("#modal-description").textContent = visionBoards[index].description;
    
    document.documentElement.dataset.scrollPosition = window.scrollY;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    header.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("modal");
    const header = document.querySelector(".h");
    modal.style.display = "none";
    const scrollPosition = document.documentElement.dataset.scrollPosition || 0;
    window.scrollTo(0, parseInt(scrollPosition));
    document.body.style.overflow = "auto";
    header.style.display = "flex";
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});

// Responsive 
window.addEventListener("resize", function() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".mobile-menu-overlay");
    if (window.innerWidth > 768) {
        overlay.style.display = 'none';
        if (!sidebar.classList.contains("close")) {
            document.body.style.overflow = "auto";
        }
    }
});