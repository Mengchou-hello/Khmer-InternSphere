// home ===========================================
document.addEventListener("DOMContentLoaded", () => {
    // --- Logo slider ---
    const track = document.getElementById("logoTrack");
    if (track) {
        const items = Array.from(track.children);
        items.forEach(item => track.appendChild(item.cloneNode(true)));

        let position = 0;
        const speed = 0.4;
        const resetPoint = track.scrollWidth / 2;

        const animateSlider = () => {
            position -= speed;
            if (position <= -resetPoint) position = 0;
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateSlider);
        };
        animateSlider();
    }

    // --- Scroll reveal ---
    const sections = document.querySelectorAll("section");

    const revealSections = () => {
        const triggerPoint = window.innerHeight - 100;
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < triggerPoint) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    };

    revealSections(); // run once on load
    window.addEventListener("scroll", revealSections);
});

//internship========================================================
// ----- INTERNSHIP DATA with real Cambodia pictures / locations & companies -----
const internshipsData = [
    {
        id: 1,
        title: "Junior Web Developer Intern",
        company: "ABA Bank (Phnom Penh)",
        category: "IT & Tech",
        location: "Phnom Penh, Cambodia",
        duration: "3 months",
        stipend: "$180/month",
        description: "Build and maintain internal web apps. Work with React & Node.js team. Mentorship provided.",
        image: "https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=600&auto=format",   // cambodian tech vibe (phnom penh city)
        badge: "KH Tech Hub"
    },
    {
        id: 2,
        title: "Digital Marketing Trainee",
        company: "Sabay Digital",
        category: "Marketing",
        location: "Phnom Penh",
        duration: "4 months",
        stipend: "$150/month",
        description: "Create content, social media campaigns, and analytics for one of Cambodia's leading media.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format",
        badge: " Top Media"
    },
    {
        id: 3,
        title: "Software Engineering Intern",
        company: "Smart Axiata",
        category: "IT & Tech",
        location: "Phnom Penh",
        duration: "6 months",
        stipend: "$220/month",
        description: "Assist in mobile app development and backend APIs. Great learning in telecom sector.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format",
        badge: "5G Innovation"
    },
    {
        id: 4,
        title: "Finance & Accounting Intern",
        company: "Prince Bank",
        category: "Finance",
        location: "Siem Reap",
        duration: "3 months",
        stipend: "$170/month",
        description: "Support finance team with reconciliations, reporting, and Khmer accounting practices.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format",
        badge: " Banking"
    },
    {
        id: 5,
        title: "Hospitality Management Trainee",
        company: "Raffles Hotel Le Royal",
        category: "Hospitality",
        location: "Phnom Penh",
        duration: "4 months",
        stipend: "$200/month + meals",
        description: "Guest relations, events, and operations. Gain luxury hospitality experience.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format",
        badge: " Luxury"
    },
    {
        id: 6,
        title: "Data Analyst Intern",
        company: "WorldBridge Group",
        category: "IT & Tech",
        location: "Phnom Penh",
        duration: "3 months",
        stipend: "$210/month",
        description: "Work with large datasets, Power BI, and assist data-driven decisions across industries.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format",
        badge: " Data Driven"
    },
    {
        id: 7,
        title: "Graphic Design Intern",
        company: "NagaCorp",
        category: "Marketing",
        location: "Phnom Penh",
        duration: "3 months",
        stipend: "$160/month",
        description: "Design marketing collaterals, social media assets, and branding for events.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format",
        badge: " Creative"
    },
    {
        id: 8,
        title: "E-commerce & Sales Intern",
        company: "Little Fashion (Cambodia)",
        category: "Marketing",
        location: "Battambang",
        duration: "2 months",
        stipend: "$130/month",
        description: "Help manage online store, product listings, and digital sales strategy.",
        image: "https://i.pinimg.com/1200x/d5/37/64/d5376407470fd46711c158aef978df08.jpg",
        badge: " E-com"
    },
    {
        id: 9,
        title: "IT Support & Network Intern",
        company: "CIA First International School",
        category: "IT & Tech",
        location: "Siem Reap",
        duration: "3 months",
        stipend: "$140/month",
        description: "Provide IT support, manage networks and assist students & staff with tech issues.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format",
        badge: " Tech support"
    },
    {
        id: 10,
        title: "Accounting & Tax Intern",
        company: "KPMG Cambodia",
        category: "Finance",
        location: "Phnom Penh",
        duration: "4 months",
        stipend: "$250/month",
        description: "Assist audit and tax team, learn compliance and financial reporting standards.",
        image: "https://i.pinimg.com/1200x/a0/2d/d4/a02dd4dab98356b84edd2a32b6905d3f.jpg",
        badge: " Big4"
    }
];


let currentFilter = "all";
let currentSearchTerm = "";

// Helper to filter internships based on category and search
function filterInternships() {
    let filtered = [...internshipsData];

    // filter by category
    if (currentFilter !== "all") {
        filtered = filtered.filter(intern => intern.category === currentFilter);
    }

    // search by title, company, location
    if (currentSearchTerm.trim() !== "") {
        const term = currentSearchTerm.trim().toLowerCase();
        filtered = filtered.filter(intern =>
            intern.title.toLowerCase().includes(term) ||
            intern.company.toLowerCase().includes(term) ||
            intern.location.toLowerCase().includes(term) ||
            intern.category.toLowerCase().includes(term)
        );
    }
    return filtered;
}

// Render internship cards
function renderInternships() {
    const filteredList = filterInternships();
    const grid = document.getElementById("internshipGrid");

    if (!grid) return;

    if (filteredList.length === 0) {
        grid.innerHTML = `<div class="no-results"><span> No matching internships found in Cambodia. Try adjusting filters or search! KH</span></div>`;
        return;
    }

    grid.innerHTML = filteredList.map(intern => `
            <div class="intern-card" data-id="${intern.id}">
                <div class="card-img" style="background-image: url('${intern.image}'); background-size: cover;">
                    <div class="card-badge">${intern.badge}</div>
                </div>
                <div class="card-content">
                    <div class="card-title">${intern.title}</div>
                    <div class="company"> ${intern.company}</div>
                    <div class="details">
                        <span> ${intern.duration}</span>
                        <span> ${intern.stipend}</span>
                    </div>
                    <div class="desc">${intern.description}</div>
                    <div class="card-footer">
                        <div class="location"> ${intern.location}</div>
                        <button class="btn-apply" data-intern-title="${intern.title}" data-company="${intern.company}">Apply now </button>
                    </div>
                </div>
            </div>
        `).join('');

    // Attach event listeners to all "Apply now" buttons
    document.querySelectorAll('.btn-apply').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = btn.getAttribute('data-intern-title') || "this position";
            const company = btn.getAttribute('data-company') || "company";
            alert(` Application initiated for "${title}" at ${company}!\n Our team will contact you soon by email. KH Build your portfolio with Khmer InternSphere.`);
        });
    });
}

// update active filter UI and re-render
function setActiveFilter(filterValue) {
    currentFilter = filterValue;
    // update active class on chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        const chipFilter = chip.getAttribute('data-filter');
        if ((filterValue === 'all' && chipFilter === 'all') || chipFilter === filterValue) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
    renderInternships();
}

// set search term from input
function updateSearch() {
    const inputElem = document.getElementById('searchInput');
    if (inputElem) currentSearchTerm = inputElem.value;
    renderInternships();
}

// quick mini search from navbar (optional)
function setupNavSearch() {
    const miniInput = document.getElementById('miniSearchInput');
    if (miniInput) {
        miniInput.addEventListener('keyup', (e) => {
            const mainSearch = document.getElementById('searchInput');
            if (mainSearch) {
                mainSearch.value = miniInput.value;
                currentSearchTerm = miniInput.value;
                renderInternships();
            }
        });
    }
}

// event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderInternships();

    // filter chip click
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            const filterValue = chip.getAttribute('data-filter');
            setActiveFilter(filterValue);
        });
    });

    // search button and search input
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            updateSearch();
        });
    }
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                updateSearch();
            }
        });
    }

    setupNavSearch();

    // small reset: if navbar home/internship links just simulate (optional)
    const navInternLink = document.querySelector('.nav-links a.active');
    // just to keep consistency, but fine

    // add extra touch: also include a friendly console message
    console.log("Khmer InternSphere ready - connecting Cambodian students to local internships KH");
});

// company========================================================

// ---- Full company profile data (JobNet-style) ----
const companyProfiles = {
    "ABA Bank": {
        logo: "https://i.pinimg.com/1200x/e2/33/f5/e233f5b0c5a358449398f202b03f063a.jpg",
        bannerColor: "linear-gradient(135deg, #0a2e6e 0%, #1565c0 100%)",
        featured: "Featured",
        industry: "Banking & Finance",
        tagline: "ABA Bank — The Bank for Every Cambodian, revolutionising digital banking nationwide.",
        social: [
            { icon: "f", label: "Facebook", url: "#" },
            { icon: "in", label: "LinkedIn", url: "#" }
        ],
        employerDetails: [
            { label: "Type", value: "Direct Employer" },
            { label: "Industry", value: "Banking / Insurance / Microfinance, Retail/Wholesale" },
            { label: "No. Employees", value: "5001 to 10000" }
        ],
        address: "No. 148, Preah Sihanouk Blvd, Phnom Penh, Cambodia",
        vision: "ABA Bank's vision is to be the most trusted bank in Cambodia, empowering individuals, businesses, and communities through accessible digital financial services. Founded in 1996, ABA has grown to become the largest bank by assets in the country, operating 80+ branches and 500+ ATMs nationwide.",
        whatWeDo: "ABA Bank provides a comprehensive range of financial services — savings and current accounts, loans, credit cards, online banking, payroll, and merchant services. Their award-winning ABA Mobile app has over 3 million users, making everyday banking simple and fast for all Cambodians.",
        gallery: [
            "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400",
            "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400",
            "https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=400",
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400",
            "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400",
            "https://images.unsplash.com/photo-1531498860502-7c67cf519b9e?w=400"
        ],
        awards: [
            { icon: "🏆", title: "Best Retail Bank Cambodia 2024", body: "Asian Banking & Finance Magazine" },
            { icon: "⭐", title: "Best Digital Bank of the Year", body: "Global Finance Awards, 2023" },
            { icon: "🌟", title: "Best Mobile Banking App", body: "Asiamoney Banking Awards, 2022" }
        ],
        internshipIds: [1]
    },
    "Wing Bank": {
        logo: "https://media.licdn.com/dms/image/v2/D560BAQGB_l2edJkTDQ/company-logo_200_200/B56Zhfj_ArHkAI-/0/1753949932004/wing_bank_logo?e=2147483647&v=beta&t=9KLk2shYP9mKal80XI6uAfy39QWQW4zXUt9P6Hiijts",
        bannerColor: "linear-gradient(135deg, #006633 0%, #00a651 100%)",
        featured: "Top Employer",
        industry: "Digital Finance / Mobile Banking",
        tagline: "Wing Bank — The Bank for Every Cambodian, has revolutionised the way Cambodians access finance.",
        social: [
            { icon: "f", label: "Facebook", url: "#" },
            { icon: "in", label: "LinkedIn", url: "#" },
            { icon: "tw", label: "Twitter", url: "#" }
        ],
        employerDetails: [
            { label: "Type", value: "Direct Employer" },
            { label: "Industry", value: "Banking / Insurance / Microfinance, Retail/Wholesale" },
            { label: "No. Employees", value: "1001 to 5000" }
        ],
        address: "No. 721, Preah Monivong Blvd, Phum Phsar Thmei 1, Khan Daun Penh, Phnom Penh, Cambodia",
        vision: "Wing Bank has become one of the fastest-growing commercial banks and one of the most trusted financial institutions in Cambodia. With a clear vision of using digital solutions to improve the daily lives of every Cambodian, Wing Bank has achieved remarkable growth and now boasts the largest ecosystem in the country. It operates 32 branch offices, has over 9,000 agents, supports more than 150,000 SME merchants, and offers over 100 use-cases through its user-friendly Wing Bank Mobile App.",
        whatWeDo: "Wing Bank is committed to digital innovation evident in its diverse portfolio of financial and non-financial services. From loans, deposits, and money transfers to insurance products, utility and bill payments, supply chain payments, payroll services, international money transfers, book fund transfers, digital bank, and even phone top-ups, Wing Bank caters to the entire spectrum of financial and non-financial needs.",
        gallery: [
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
            "https://images.unsplash.com/photo-1531498860502-7c67cf519b9e?w=400",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
            "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400"
        ],
        awards: [
            { icon: "🏆", title: "Best Digital Bank Cambodia 2024", body: "Global Finance Magazine" },
            { icon: "⭐", title: "Best Fintech Innovation Award", body: "ASEAN Fintech Summit, 2023" },
            { icon: "🎖️", title: "Financial Inclusion Champion", body: "ADB Recognition, 2022" }
        ],
        internshipIds: []
    },
    "Smart Axiata": {
        logo: "https://i.pinimg.com/736x/1c/bb/61/1cbb61fe82c8dc011ab109fb18b7e399.jpg",
        bannerColor: "linear-gradient(135deg, #cc0000 0%, #ff4444 100%)",
        featured: "",
        industry: "Telecommunications",
        tagline: "Smart Axiata — Cambodia's #1 mobile network, connecting millions with 5G innovation.",
        social: [
            { icon: "f", label: "Facebook", url: "#" },
            { icon: "in", label: "LinkedIn", url: "#" }
        ],
        employerDetails: [
            { label: "Type", value: "Direct Employer" },
            { label: "Industry", value: "Telecoms / IT / Software" },
            { label: "No. Employees", value: "1001 to 5000" }
        ],
        address: "No. 464, Monivong Blvd, Phnom Penh, Cambodia",
        vision: "Smart Axiata aspires to be the digital champion connecting and empowering every Cambodian. As a member of Axiata Group, one of the largest telecom groups in Asia, Smart has consistently pushed the boundaries of digital connectivity in Cambodia.",
        whatWeDo: "Smart Axiata provides mobile voice, data, and digital services to over 8 million subscribers. From its award-winning 5G network to enterprise solutions, IoT platforms, and digital payment services via its SmartPay platform, Smart Axiata sits at the center of Cambodia's digital economy.",
        gallery: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400"
        ],
        awards: [
            { icon: "🏆", title: "Best Telecom Operator Cambodia 2024", body: "Telecoms World Asia" },
            { icon: "📡", title: "Fastest 5G Network Award", body: "Opensignal Mobile Network Report 2023" }
        ],
        internshipIds: [3]
    },
    "Prudential": {
        logo: "https://www.prudential.com.kh/content/dam/prudential-aem-lbu/pcla/website-image/AboutUs%201.jpg",
        bannerColor: "linear-gradient(135deg, #cc0000 0%, #8b0000 100%)",
        featured: "",
        industry: "Life Insurance",
        tagline: "Prudential Cambodia — We do it all for you. Protecting what matters most.",
        social: [
            { icon: "f", label: "Facebook", url: "#" },
            { icon: "in", label: "LinkedIn", url: "#" }
        ],
        employerDetails: [
            { label: "Type", value: "Direct Employer" },
            { label: "Industry", value: "Banking / Insurance / Finance" },
            { label: "No. Employees", value: "501 to 1000" }
        ],
        address: "No. 333, Preah Sisowath Quay, Phnom Penh, Cambodia",
        vision: "Prudential Cambodia is part of Prudential plc, a leading international financial services group. Our purpose is to be the most trusted partner and protector for this generation and generations to come, by providing simple, accessible financial and health solutions.",
        whatWeDo: "We offer a comprehensive range of life insurance products including term life, whole life, endowment, education plans, health, and critical illness coverage. Our dedicated team of over 5,000 licensed agents serves customers across Cambodia.",
        gallery: [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
            "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400"
        ],
        awards: [
            { icon: "🏆", title: "Best Life Insurance Company 2024", body: "Insurance Asia Awards" },
            { icon: "⭐", title: "Top Employer Cambodia", body: "HR Asia, 2023" }
        ],
        internshipIds: []
    },
    "KPMG": {
        logo: "https://i.pinimg.com/1200x/fc/78/eb/fc78eb150f9c3c9e599de827bd30f764.jpg",
        bannerColor: "linear-gradient(135deg, #00338d 0%, #005eb8 100%)",
        featured: "Big 4",
        industry: "Audit, Tax & Advisory",
        tagline: "KPMG Cambodia — Inspiring confidence. Empowering change. Part of the Big 4.",
        social: [
            { icon: "in", label: "LinkedIn", url: "#" },
            { icon: "f", label: "Facebook", url: "#" }
        ],
        employerDetails: [
            { label: "Type", value: "Direct Employer" },
            { label: "Industry", value: "Accounting / Audit / Tax / Advisory" },
            { label: "No. Employees", value: "101 to 500" }
        ],
        address: "No. 2, Street 208, Phnom Penh 12211, Cambodia",
        vision: "KPMG Cambodia is a member firm of KPMG International, one of the world's Big Four audit and advisory firms. We aim to be the clear choice for clients in Cambodia by providing superior professional services and maintaining the highest standards of quality and integrity.",
        whatWeDo: "We provide Audit & Assurance, Tax & Legal, and Advisory services to multinational corporations, government entities, and local businesses. Our team of over 300 professionals brings deep local knowledge combined with global KPMG expertise to help clients navigate complex business challenges.",
        gallery: [
            "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400"
        ],
        awards: [
            { icon: "🏆", title: "Best Audit Firm Cambodia 2024", body: "International Tax Review" },
            { icon: "🎓", title: "Best Graduate Employer", body: "Cambodia Graduate Employer Survey 2023" }
        ],
        internshipIds: [10]
    },
    "Chip Mong": {
        logo: "https://media.licdn.com/dms/image/v2/C560BAQGl7pN8X2swnQ/company-logo_200_200/company-logo_200_200/0/1650944223129/chip_mong_group_limited_logo?e=2147483647&v=beta&t=bXu61vwTbXmXD9hp9Ny8coX0i09OMV2LDjygcteGdZg",
        bannerColor: "linear-gradient(135deg, #1a237e 0%, #3949ab 100%)",
        featured: "",
        industry: "Real Estate & Construction",
        tagline: "Chip Mong Group — Building Cambodia's future with world-class real estate and retail.",
        social: [
            { icon: "f", label: "Facebook", url: "#" },
            { icon: "in", label: "LinkedIn", url: "#" }
        ],
        employerDetails: [
            { label: "Type", value: "Direct Employer" },
            { label: "Industry", value: "Real Estate / Construction / Manufacturing" },
            { label: "No. Employees", value: "5001 to 10000" }
        ],
        address: "Chip Mong Tower, No. 468-476, Monivong Blvd, Phnom Penh, Cambodia",
        vision: "Chip Mong Group is one of Cambodia's most respected and diversified conglomerates. Our vision is to drive sustainable economic growth and improve living standards for Cambodians through world-class real estate, retail, and industrial solutions.",
        whatWeDo: "From premium residential and commercial real estate (Chip Mong Land), mega mall retail (Chip Mong Retail), industrial manufacturing (Chip Mong Insee Cement), to banking services (Chip Mong Bank), the Group spans across 7 core business verticals employing over 10,000 people nationwide.",
        gallery: [
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
            "https://images.unsplash.com/photo-1628744448839-f36d6116cafc?w=400"
        ],
        awards: [
            { icon: "🏆", title: "Best Real Estate Developer 2024", body: "PropertyGuru Cambodia Awards" },
            { icon: "🌟", title: "Top Employer of the Year", body: "Cambodia Business Forum, 2023" },
            { icon: "🏗️", title: "Best Mixed-Use Development", body: "FIABCI Cambodia, 2022" }
        ],
        internshipIds: []
    }
};

// ---- Init modal events on DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('jobModal');
    if (!modal) return;

    document.querySelectorAll('.company-btn').forEach(btn => {
        btn.addEventListener('click', () => openCompanyModal(btn.getAttribute('data-company')));
    });

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Tab switching
    modal.addEventListener('click', (e) => {
        const tab = e.target.closest('.cp-tab');
        if (!tab) return;
        modal.querySelectorAll('.cp-tab').forEach(t => t.classList.remove('active'));
        modal.querySelectorAll('.cp-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

function openCompanyModal(companyKey) {
    const modal = document.getElementById('jobModal');
    const p = companyProfiles[companyKey];
    if (!p || !modal) return;

    // Reset tabs to About
    modal.querySelectorAll('.cp-tab').forEach(t => t.classList.remove('active'));
    modal.querySelectorAll('.cp-panel').forEach(pan => pan.classList.remove('active'));
    modal.querySelector('[data-tab="about"]').classList.add('active');
    document.getElementById('tab-about').classList.add('active');

    // Banner
    document.getElementById('cpBanner').style.background = p.bannerColor;

    // Logo + header
    document.getElementById('modalLogo').src = p.logo;
    document.getElementById('modalLogo').alt = companyKey;
    document.getElementById('modalCompanyName').textContent = companyKey;
    document.getElementById('cpTagline').textContent = p.tagline;
    const featuredEl = document.getElementById('cpFeaturedBadge');
    featuredEl.textContent = p.featured;
    featuredEl.style.display = p.featured ? 'inline-block' : 'none';

    // Social
    document.getElementById('cpSocial').innerHTML = p.social.map(s =>
        `<a href="${s.url}" title="${s.label}">${s.icon}</a>`
    ).join('');

    // Jobs count badge
    const matched = internshipsData.filter(i => p.internshipIds.includes(i.id));
    document.getElementById('cpJobsCount').textContent = matched.length;

    // ── About tab ──
    // See All Jobs button
    document.getElementById('cpSeeAllJobs').onclick = () => {
        modal.querySelectorAll('.cp-tab').forEach(t => t.classList.remove('active'));
        modal.querySelectorAll('.cp-panel').forEach(pan => pan.classList.remove('active'));
        modal.querySelector('[data-tab="jobs"]').classList.add('active');
        document.getElementById('tab-jobs').classList.add('active');
    };

    // Recent jobs (show up to 3)
    const recentJobsEl = document.getElementById('cpRecentJobs');
    if (matched.length === 0) {
        recentJobsEl.innerHTML = `<div class="modal-no-internships" style="grid-column:1/-1">🔔 No open internships right now. Check back soon!</div>`;
    } else {
        recentJobsEl.innerHTML = matched.slice(0,3).map(intern => `
            <div class="cp-recent-job-card">
                <div class="cp-recent-job-title">${intern.title}</div>
                <div class="cp-recent-job-company">${companyKey}</div>
                <div class="cp-recent-job-tags">
                    <span>📍 ${intern.location}</span>
                    <span>${intern.category}</span>
                    <span>💵 ${intern.stipend}</span>
                </div>
            </div>
        `).join('');
    }

    // About section heading
    document.getElementById('cpAboutHeading').textContent = `About ${companyKey}`;

    // Employer details
    document.getElementById('cpEmployerDetails').innerHTML = p.employerDetails.map(d =>
        `<li><strong>${d.label}:</strong> ${d.value}</li>`
    ).join('');

    // Address
    document.getElementById('cpAddress').textContent = p.address;

    // Vision + What we do
    document.getElementById('cpVision').textContent = p.vision;
    document.getElementById('cpWhat').textContent = p.whatWeDo;

    // ── Jobs tab ──
    const listEl = document.getElementById('modalInternshipList');
    if (matched.length === 0) {
        listEl.innerHTML = `<div class="modal-no-internships"><p>🔔 No open internships right now.</p><p style="margin-top:6px;font-size:0.8rem;">Check back soon or contact us to be notified.</p></div>`;
    } else {
        listEl.innerHTML = matched.map(intern => `
            <div class="modal-job-card">
                <div class="modal-job-title">${intern.title}</div>
                <div class="modal-job-tags">
                    <span>⏱ ${intern.duration}</span>
                    <span>💵 ${intern.stipend}</span>
                    <span>🏷 ${intern.category}</span>
                </div>
                <div class="modal-job-desc">${intern.description}</div>
                <div class="modal-job-footer">
                    <div class="modal-job-location">📍 ${intern.location}</div>
                    <button class="modal-job-apply-btn"
                        onclick="alert('🎉 Application submitted for \\\"${intern.title}\\\"!\\nWe will contact you soon. — Khmer InternSphere')">
                        Apply Now →
                    </button>
                </div>
            </div>
        `).join('');
    }

    // ── Gallery tab ──
    document.getElementById('cpGallery').innerHTML = (p.gallery || []).map(url =>
        `<img src="${url}" alt="Gallery" loading="lazy">`
    ).join('');

    // ── Awards tab ──
    document.getElementById('cpAwards').innerHTML = (p.awards || []).map(a => `
        <div class="cp-award-item">
            <div class="cp-award-icon">${a.icon}</div>
            <div class="cp-award-text">
                <strong>${a.title}</strong>
                <span>${a.body}</span>
            </div>
        </div>
    `).join('');

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('jobModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}



// about us========================================================



// ===================== BURGER / RESPONSIVE NAV (runs on every page) =====================
(function () {
    const burger   = document.getElementById('burgerBtn');
    const nav      = document.getElementById('mainNav');
    const backdrop = document.getElementById('navBackdrop');
    if (!burger || !nav) return;

    function openNav() {
        nav.classList.add('nav-open');
        burger.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        nav.classList.remove('nav-open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
        nav.classList.contains('nav-open') ? closeNav() : openNav();
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    if (backdrop) backdrop.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeNav();
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();

// contact========================================================

// ===================== 3. CONTACT FORM =====================
const form = document.getElementById("contact-form");
const overlay = document.getElementById("thankyou-overlay");
const backBtn = document.getElementById("back-btn");

if (form && overlay && backBtn) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("student-name").value.trim();
        const email = document.getElementById("student-email").value.trim();
        const message = document.getElementById("student-message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all required fields (Name, Email, and Message).");
            return;
        }

        overlay.classList.add("visible");
        document.body.style.overflow = "hidden";
        overlay.focus();
    });

    backBtn.addEventListener("click", function () {
        overlay.classList.remove("visible");
        document.body.style.overflow = "";
        form.reset();
    });

    // Also close overlay by clicking outside the card
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.classList.remove("visible");
            document.body.style.overflow = "";
            form.reset();
        }
    });
}
