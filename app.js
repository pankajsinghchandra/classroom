let currentSchool = localStorage.getItem("currentSchool") || "";
let currentRole = "";
const adminCredentials = { username: "admin", password: "admin123" };
let lastSyllabusState = null;
let syllabusChart;
let analyticsChart;
let currentSubject;
let currentClass;

const classData = {
    1: {
        subjects: {
            math: ["1. Numbers 1-10", "2. Basic Addition", "3. Basic Subtraction"],
            hindi: ["1. Swar Gyaan", "2. Vyanjan Gyaan", "3. Shabd Padna"],
            english: ["1. Alphabet Recognition", "2. Simple Words", "3. Basic Sentences"]
        }
    },
    2: {
        subjects: {
            math: ["1. Numbers 1-100", "2. Multiplication Basics", "3. Division Basics"],
            hindi: ["1. Shabd Rachna", "2. Chhote Vakya", "3. Kavita"],
            english: ["1. Word Reading", "2. Sentence Formation", "3. Story Reading"]
        }
    },
    3: {
        subjects: {
            math: ["1. Numbers 1-100", "2. Addition", "3. Subtraction", "4. Multiplication", "5. Division"],
            "math workbook": groupWorksheets(86),
            hindi: ["1. Swar Gyaan", "2. Vyanjan Gyaan", "3. Shabd Padna", "4. Vakya Rachna", "5. Kavita"],
            "hindi workbook": groupWorksheets(86),
            english: ["1. Alphabet Fun", "2. Simple Words", "3. Basic Sentences", "4. Story Reading", "5. Grammar Basics"],
            "english workbook": groupWorksheets(85),
            evs: ["1. Our Environment", "2. Plants Around Us", "3. Animals Around Us", "4. Water and Air", "5. Our Home"]
        }
    },
    4: {
        subjects: {
            math: [
                "1. संख्याओं का मेला", "2. जोड़", "3. घटाव", "4. गुणा", "5. भाग", "6. मुद्रा", "7. भिन्नात्मक संख्याएँ",
                "8. पुनरावृत्ति एवं अर्द्धवार्षिक", "9. सममिति", "10. लम्बाई की माप", "11. भार", "12. धारिता",
                "13. समय", "14. टाइलीकरण", "15. परिमाप एवं क्षेत्रफल", "16. आँकड़ों का खेल", "17. आकृतियों का खेल", "18. पैटर्न"
            ],
            "math workbook": groupWorksheets(152),
            hindi: [
                "1. याद तुम्हारी आती है", "2. चार मित्र", "3. घर प्यारा", "4. बिल्ली का पंजा", "5. घाघ भड्डरी",
                "6. सेर को सवा सेर", "7. सीखो", "8. सुनीता की पहिया", "9. हमारा आहार", "10. तीन बुद्धिमान",
                "11. टेसू राजा", "12. ऐसे थे बापू", "13. चाचा का पत्र", "14. शुभमणि", "15. बिजूका",
                "16. साहसी ऋचा", "17. बल्ब", "18. बौना हुआ पहाड़", "19. सुबह", "20. विज्ञान का चिकित्सक",
                "21. बरगद का पेड़"
            ],
            "hindi workbook": [
                "1. याद तुम्हारी आती है (Workbook)", "2. चार मित्र (Workbook)", "3. घर प्यारा (Workbook)", 
                "4. बिल्ली का पंजा (Workbook)", "5. घाघ भड्डरी (Workbook)", "6. सेर को सवा सेर (Workbook)", 
                "7. सीखो (Workbook)", "8. सुनीता की पहिया (Workbook)", "9. हमारा आहार (Workbook)", 
                "10. तीन बुद्धिमान (Workbook)", "11. टेसू राजा (Workbook)", "12. ऐसे थे बापू (Workbook)", 
                "13. चाचा का पत्र (Workbook)", "14. शुभमणि (Workbook)", "15. बिजूका (Workbook)", 
                "16. साहसी ऋचा (Workbook)", "17. बल्ब (Workbook)", "18. बौना हुआ पहाड़ (Workbook)", 
                "19. सुबह (Workbook)", "20. विज्ञान का चिकित्सक (Workbook)", "21. बरगद का पेड़ (Workbook)"
            ],
            english: [
                "1. I LOVE GRANDMA", "2. OUR HOME", "3. VIKRAM, THE WISE KING", "4. LET ME DIAL",
                "5. HEERA AND MOTI", "6. THE BOY WHO CRIED WOLF", "7. THE QUARREL", "8. OUR NATIONAL FLAG",
                "9. OUR FESTIVALS", "10. WORK WILL BRING ITS OWN REWARDS", "11. ASSERTING VOICE",
                "12. FROM AN ILLITERATE VILLAGE GIRL TO A TEACHER", "13. THE LITTLE RED HEN",
                "14. HE LEAVES THE NEST", "15. COMPUTER", "16. DIRT AND FLIES",
                "17. READ & ENJOY (1. THE MILKMAN'S COW, 2. OPEN HOUSE)"
            ],
            "english workbook": [
                "1. I LOVE GRANDMA (Workbook)", "2. OUR HOME (Workbook)", "3. VIKRAM, THE WISE KING (Workbook)", 
                "4. LET ME DIAL (Workbook)", "5. HEERA AND MOTI (Workbook)", "6. THE BOY WHO CRIED WOLF (Workbook)", 
                "7. THE QUARREL (Workbook)", "8. OUR NATIONAL FLAG (Workbook)", "9. OUR FESTIVALS (Workbook)", 
                "10. WORK WILL BRING ITS OWN REWARDS (Workbook)", "11. ASSERTING VOICE (Workbook)", 
                "12. FROM AN ILLITERATE VILLAGE GIRL TO A TEACHER (Workbook)", "13. THE LITTLE RED HEN (Workbook)", 
                "14. HE LEAVES THE NEST (Workbook)", "15. COMPUTER (Workbook)", "16. DIRT AND FLIES (Workbook)", 
                "17. READ & ENJOY (1. THE MILKMAN'S COW, 2. OPEN HOUSE) (Workbook)"
            ],
            evs: [
                "1. रंग-बिरंगे खिलते फूल", "2. कोई देता अंडे, कोई देता बच्चे", "3. हड़बड़ में गड़बड़",
                "4. त्योहार और भोजन", "5. स्वाद अलग-अलग", "6. हरियाली और हम", "7. जड़ों की पकड़",
                "8. देख तमाशा", "9. जब मामाजी घर आए", "10. एक पर्व और बच्चे", "11. आओ बनाएँ नक्शा",
                "12. अपना प्यारा घर", "13. खेल से घर तक", "14. बालमेला और खेल", "15. आत्म-शक्ति की पहचान",
                "16. मीठा-मीठा शहद", "17. तरह-तरह के पक्षी", "18. जीवन में नियमिता",
                "19. ककोलत से कन्याकुमारी", "20. हमारे मददगार-कामगार", "21. तरह-तरह के घर",
                "22. अजय जब गाँव लौटे", "23. आस-पास की खोज खबर", "24. चिड़ियाघर की सैर", "25. बंटी का सफर"
            ],
            "evs workbook": [
                "1. रंग-बिरंगे खिलते फूल (Workbook)", "2. कोई देता अंडे, कोई देता बच्चे (Workbook)", 
                "3. हड़बड़ में गड़बड़ (Workbook)", "4. त्योहार और भोजन (Workbook)", "5. स्वाद अलग-अलग (Workbook)", 
                "6. हरियाली और हम (Workbook)", "7. जड़ों की पकड़ (Workbook)", "8. देख तमाशा (Workbook)", 
                "9. जब मामाजी घर आए (Workbook)", "10. एक पर्व और बच्चे (Workbook)", 
                "11. आओ बनाएँ नक्शा (Workbook)", "12. अपना प्यारा घर (Workbook)", 
                "13. खेल से घर तक (Workbook)", "14. बालमेला और खेल (Workbook)", 
                "15. आत्म-शक्ति की पहचान (Workbook)", "16. मीठा-मीठा शहद (Workbook)", 
                "17. तरह-तरह के पक्षी (Workbook)", "18. जीवन में नियमिता (Workbook)", 
                "19. ककोलत से कन्याकुमारी (Workbook)", "20. हमारे मददगार-कामगार (Workbook)", 
                "21. तरह-तरह के घर (Workbook)", "22. अजय जब गाँव लौटे (Workbook)", 
                "23. आस-पास की खोज खबर (Workbook)", "24. चिड़ियाघर की सैर (Workbook)", 
                "25. बंटी का सफर (Workbook)"
            ]
        }
    },
    5: {
        subjects: {
            math: [
                "1. संख्याओं का मेला", "2. जोड़-घटाव", "3. गुणा-भाग", "4. गुणज तथा गुणनखण्ड",
                "5. भिन्न एवं दशमलव भिन्न", "6. मुद्रा एवं बैंकिंग", "7. कोण", "8. सममिति",
                "9. आकृतियाँ", "10. मापन की इकाइयाँ", "11. परिमाप एवं क्षेत्रफल", "12. आयतन",
                "13. समय", "14. आँकड़ों का खेल", "15. पैटर्न"
            ],
            "math workbook": groupWorksheets(144),
            hindi: [
                "1. हिंद देश के निवासी", "2. टिपटिपवा", "3. हुआ यूँ कि …..", "4. चाँद का कुरता",
                "5. म्यान का रंग", "6. उपकार का बदला", "7. चतुर चित्रकार", "8. ननकू",
                "9. ममता की मूर्ति", "10. आया बादल", "11. एक पत्र की आत्मकथा", "12. कविता का कमाल",
                "13. दोहे", "14. चिट्ठी आई है", "15. मरती क्यों न करती", "16. बिना जड़ का पेड़",
                "17. आज़ादी में जीवन", "18. अँधेर नगरी", "19. क्यों", "20. ईद",
                "21. परीक्षा", "22. मिथिला चित्रकला"
            ],
            "hindi workbook": [
                "1. हिंद देश के निवासी (Workbook)", "2. टिपटिपवा (Workbook)", "3. हुआ यूँ कि ….. (Workbook)", 
                "4. चाँद का कुरता (Workbook)", "5. म्यान का रंग (Workbook)", "6. उपकार का बदला (Workbook)", 
                "7. चतुर चित्रकार (Workbook)", "8. ननकू (Workbook)", "9. ममता की मूर्ति (Workbook)", 
                "10. आया बादल (Workbook)", "11. एक पत्र की आत्मकथा (Workbook)", 
                "12. कविता का कमाल (Workbook)", "13. दोहे (Workbook)", "14. चिट्ठी आई है (Workbook)", 
                "15. मरती क्यों न करती (Workbook)", "16. बिना जड़ का पेड़ (Workbook)", 
                "17. आज़ादी में जीवन (Workbook)", "18. अँधेर नगरी (Workbook)", "19. क्यों (Workbook)", 
                "20. ईद (Workbook)", "21. परीक्षा (Workbook)", "22. मिथिला चित्रकला (Workbook)"
            ],
            english: [
                "1. Nobody's Friend", "2. The Smell of Bread and the Sound of Money", "3. The House Sparrow",
                "4. Day by Day I Float My Paper Boats", "5. An Act of Bravery", "6. The Old Man and His Grandson",
                "7. Lovely Moon", "8. The Arab and His Camel", "9. Birbal's Wit", "10. The Ant and the Grasshopper",
                "11. My Miracle Mother", "12. Jesus to Supper", "13. Day Dream", "14. Three Little Pigs",
                "15. The Blind Beggar", "16. The Crow", "17. The Crocodile's Advice", "18. Sengai Blesses a Family",
                "19. Wonderful Waste", "20. The Wonder Cot"
            ],
            "english workbook": [
                "1. Nobody's Friend (Workbook)", "2. The Smell of Bread and the Sound of Money (Workbook)", 
                "3. The House Sparrow (Workbook)", "4. Day by Day I Float My Paper Boats (Workbook)", 
                "5. An Act of Bravery (Workbook)", "6. The Old Man and His Grandson (Workbook)", 
                "7. Lovely Moon (Workbook)", "8. The Arab and His Camel (Workbook)", 
                "9. Birbal's Wit (Workbook)", "10. The Ant and the Grasshopper (Workbook)", 
                "11. My Miracle Mother (Workbook)", "12. Jesus to Supper (Workbook)", 
                "13. Day Dream (Workbook)", "14. Three Little Pigs (Workbook)", 
                "15. The Blind Beggar (Workbook)", "16. The Crow (Workbook)", 
                "17. The Crocodile's Advice (Workbook)", "18. Sengai Blesses a Family (Workbook)", 
                "19. Wonderful Waste (Workbook)", "20. The Wonder Cot (Workbook)"
            ],
            evs: [
                "1. पटना से नाशुला की यात्रा", "2. खेल", "3. बीजों का बिखरना", "4. मेरा बगीचा",
                "5. ऐतिहासिक स्मारक", "6. सिंचाई के साधन", "7. जितना खाओ उतना पकाओ",
                "8. रॉस की जंग : मच्छरों के संग", "9. मैंने नक्शा बनाया", "10. हमारी फसलें : हमारा खान-पान",
                "11. जंतु जगत : सुरक्षा और संरक्षण", "12. मान गए लोहा", "13. प्राणी और हम",
                "14. सूरज एक काम अनेक", "15. हमारा जंगल", "16. चलो सर्वे करें", "17. रामू काका की दुकान",
                "18. आवास", "19. तरह-तरह के व्यवसाय", "20. रायपुर वाले चाचा की शादी", "21. लकी जब बीमार पड़ा"
            ],
            "evs workbook": [
                "1. पटना से नाशुला की यात्रा (Workbook)", "2. खेल (Workbook)", 
                "3. बीजों का बिखरना (Workbook)", "4. मेरा बगीचा (Workbook)", 
                "5. ऐतिहासिक स्मारक (Workbook)", "6. सिंचाई के साधन (Workbook)", 
                "7. जितना खाओ उतना पकाओ (Workbook)", "8. रॉस की जंग : मच्छरों के संग (Workbook)", 
                "9. मैंने नक्शा बनाया (Workbook)", "10. हमारी फसलें : हमारा खान-पान (Workbook)", 
                "11. जंतु जगत : सुरक्षा और संरक्षण (Workbook)", "12. मान गए लोहा (Workbook)", 
                "13. प्राणी और हम (Workbook)", "14. सूरज एक काम अनेक (Workbook)", 
                "15. हमारा जंगल (Workbook)", "16. चलो सर्वे करें (Workbook)", 
                "17. रामू काका की दुकान (Workbook)", "18. आवास (Workbook)", 
                "19. तरह-तरह के व्यवसाय (Workbook)", "20. रायपुर वाले चाचा की शादी (Workbook)", 
                "21. लकी जब बीमार पड़ा (Workbook)"
            ]
        }
    }
};

function groupWorksheets(total) {
    const groups = [];
    for (let i = 1; i <= total; i += 10) {
        const end = Math.min(i + 9, total);
        groups.push(`Worksheet ${i} to ${end}`);
    }
    return groups;
}

if (!localStorage.getItem("schoolAccessList")) {
    localStorage.setItem("schoolAccessList", JSON.stringify({}));
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function validateSchoolName(name) {
    const regex = /^[a-zA-Z0-9\s-]+$/;
    return regex.test(name);
}

function initializeSchoolData(schoolName) {
    if (!localStorage.getItem(`${schoolName}_teachers`)) {
        localStorage.setItem(`${schoolName}_teachers`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`${schoolName}_syllabusProgress`)) {
        localStorage.setItem(`${schoolName}_syllabusProgress`, JSON.stringify({}));
    }
}

function populateSchoolDropdown(elementId) {
    const schoolAccessList = JSON.parse(localStorage.getItem("schoolAccessList")) || {};
    const selectElement = document.getElementById(elementId);
    selectElement.innerHTML = '<option value="" disabled selected>Select School</option>';
    Object.keys(schoolAccessList).forEach(school => {
        const option = document.createElement("option");
        option.value = school;
        option.textContent = school;
        selectElement.appendChild(option);
    });
}

const loginPage = document.getElementById("login-page");
const dashboard = document.getElementById("dashboard");
const adminSchoolManagement = document.getElementById("admin-school-management");
const adminTeacherManagement = document.getElementById("admin-teacher-management");
const teacherDashboard = document.getElementById("teacher-dashboard");
const loginBtn = document.getElementById("login-btn");
const loginBtnText = document.getElementById("login-btn-text");
const loginSpinner = document.getElementById("login-spinner");
const logoutBtn = document.getElementById("logout-btn");
const loginError = document.getElementById("login-error");
const schoolNameSelect = document.getElementById("school-name");
const schoolNameError = document.getElementById("school-name-error");
const switchSchoolBtn = document.getElementById("switch-school-btn");
const exportDataBtn = document.getElementById("export-data-btn");
const exportPdfBtn = document.getElementById("export-pdf-btn");
const importDataBtn = document.getElementById("import-data-btn");
const importDataInput = document.getElementById("import-data-input");
const classSelect = document.getElementById("class-select");
const subjectList = document.getElementById("subject-list");
const progressSummary = document.getElementById("progress-summary");
const summaryText = document.getElementById("summary-text");
const addTeacherBtn = document.getElementById("add-teacher-btn");
const teacherList = document.getElementById("teacher-list");
const teacherSchoolSelect = document.getElementById("teacher-school-select");
const addSchoolBtn = document.getElementById("add-school-btn");
const schoolList = document.getElementById("school-list");
const welcomeMessage = document.getElementById("welcome-message");
const modal = document.getElementById("subject-details-modal");
const modalLessonsContainer = document.getElementById("modal-lessons-container");
const updateSyllabusBtn = document.getElementById("update-syllabus-btn");
const updateBtnText = document.getElementById("update-btn-text");
const updateSpinner = document.getElementById("update-spinner");
const undoBtn = document.getElementById("undo-btn");
const markAllCompletedBtn = document.getElementById("mark-all-completed-btn");
const updateHistory = document.getElementById("update-history");
const closeModal = document.querySelector(".close-modal");
const schoolManagementNav = document.getElementById("school-management-nav");
const teacherManagementNav = document.getElementById("teacher-management-nav");
const lessonFilter = document.getElementById("lesson-filter");
const lessonSearch = document.getElementById("lesson-search");
const dateFilter = document.getElementById("date-filter");
const notificationsDiv = document.getElementById("notifications");

populateSchoolDropdown("school-name");
populateSchoolDropdown("teacher-school-select");

loginBtn.addEventListener("click", () => {
    loginBtn.disabled = true;
    loginBtnText.textContent = "Logging in...";
    loginSpinner.style.display = "block";

    setTimeout(() => {
        const schoolName = schoolNameSelect.value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const schoolAccessList = JSON.parse(localStorage.getItem("schoolAccessList")) || {};
        const isAdmin = username === adminCredentials.username && password === adminCredentials.password;

        if (isAdmin) {
            currentRole = "admin";
            if (!schoolName || !schoolAccessList[schoolName]) {
                const defaultSchool = "Default School";
                if (!schoolAccessList[defaultSchool]) {
                    schoolAccessList[defaultSchool] = {};
                    localStorage.setItem("schoolAccessList", JSON.stringify(schoolAccessList));
                    populateSchoolDropdown("school-name");
                    populateSchoolDropdown("teacher-school-select");
                }
                currentSchool = defaultSchool;
            } else {
                currentSchool = schoolName;
            }
            localStorage.setItem("currentSchool", currentSchool);
            initializeSchoolData(currentSchool);

            loginPage.classList.add("hidden");
            dashboard.classList.remove("hidden");
            document.querySelector("body").classList.remove("min-h-screen");
            topNav.classList.remove("hidden");
            if (Object.keys(schoolAccessList).length === 1 && schoolAccessList["Default School"]) {
                welcomeMessage.classList.remove("hidden");
                adminSchoolManagement.classList.remove("hidden");
                teacherDashboard.classList.add("hidden");
                adminTeacherManagement.classList.add("hidden");
            } else {
                welcomeMessage.classList.add("hidden");
                adminSchoolManagement.classList.remove("hidden");
                adminTeacherManagement.classList.add("hidden");
                teacherDashboard.classList.add("hidden");
                loadSchoolManagement();
            }
            exportDataBtn.classList.remove("hidden");
            exportPdfBtn.classList.remove("hidden");
            importDataBtn.classList.remove("hidden");
            showToast("Logged in successfully!");
        } else {
            if (!schoolName || !schoolAccessList[schoolName]) {
                schoolNameError.textContent = "Please select a school.";
                schoolNameError.classList.remove("hidden");
                loginBtn.disabled = false;
                loginBtnText.textContent = "Login";
                loginSpinner.style.display = "none";
                return;
            }
            schoolNameError.classList.add("hidden");

            currentSchool = schoolName;
            localStorage.setItem("currentSchool", currentSchool);
            initializeSchoolData(currentSchool);

            const teachers = JSON.parse(localStorage.getItem(`${currentSchool}_teachers`)) || [];
            const teacher = teachers.find(t => t.username === username && t.password === password);
            if (teacher) {
                currentRole = "teacher";
                loginPage.classList.add("hidden");
                dashboard.classList.remove("hidden");
                document.querySelector("body").classList.remove("min-h-screen");
                topNav.classList.add("hidden");
                teacherDashboard.classList.remove("hidden");
                loadAnalytics();
                loadSubjects();
                exportDataBtn.classList.add("hidden");
                exportPdfBtn.classList.add("hidden");
                importDataBtn.classList.add("hidden");
                showToast("Logged in successfully!");
            } else {
                loginError.textContent = "Invalid credentials for this school.";
                loginError.classList.remove("hidden");
            }
        }
        loginBtn.disabled = false;
        loginBtnText.textContent = "Login";
        loginSpinner.style.display = "none";
    }, 500);
});

logoutBtn.addEventListener("click", () => {
    loginPage.classList.remove("hidden");
    dashboard.classList.add("hidden");
    document.querySelector("body").classList.add("min-h-screen");
    adminSchoolManagement.classList.add("hidden");
    adminTeacherManagement.classList.add("hidden");
    teacherDashboard.classList.add("hidden");
    loginError.classList.add("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    schoolNameSelect.value = "";
    currentRole = "";
    currentSchool = "";
    localStorage.removeItem("currentSchool");
    showToast("Logged out successfully!");
});

switchSchoolBtn.addEventListener("click", () => {
    loginPage.classList.remove("hidden");
    dashboard.classList.add("hidden");
    document.querySelector("body").classList.add("min-h-screen");
    adminSchoolManagement.classList.add("hidden");
    adminTeacherManagement.classList.add("hidden");
    teacherDashboard.classList.add("hidden");
    schoolNameSelect.value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    currentRole = "";
    currentSchool = "";
    localStorage.removeItem("currentSchool");
    showToast("Switched school successfully!");
});

exportDataBtn.addEventListener("click", () => {
    const schoolData = {
        teachers: JSON.parse(localStorage.getItem(`${currentSchool}_teachers`)) || [],
        syllabusProgress: JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {}
    };
    const dataStr = JSON.stringify(schoolData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentSchool}_syllabus_data.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Data exported successfully!");
});

exportPdfBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Syllabus Tracker Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`School: ${currentSchool}`, 20, 30);

    let yPos = 40;
    const syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};
    Object.keys(classData).forEach(classId => {
        doc.text(`Class ${classId}`, 20, yPos);
        yPos += 10;
        const subjects = Object.keys(classData[classId].subjects);
        subjects.forEach(subject => {
            const progress = syllabusProgress[classId]?.[subject]?.percentage || 0;
            doc.text(`${subject.charAt(0).toUpperCase() + subject.slice(1)}: ${Math.round(progress)}% Completed`, 30, yPos);
            yPos += 10;
        });
        yPos += 10;
    });

    doc.save(`${currentSchool}_syllabus_report.pdf`);
    showToast("PDF exported successfully!");
});

importDataInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.teachers && importedData.syllabusProgress) {
                    localStorage.setItem(`${currentSchool}_teachers`, JSON.stringify(importedData.teachers));
                    localStorage.setItem(`${currentSchool}_syllabusProgress`, JSON.stringify(importedData.syllabusProgress));
                    showToast("Data imported successfully!");
                    loadTeachers();
                    loadSubjects();
                    loadAnalytics();
                } else {
                    showToast("Invalid data format. Please ensure the file contains teachers and syllabusProgress.");
                }
            } catch (err) {
                showToast("Error importing data. Please ensure the file is a valid JSON.");
            }
        };
        reader.readAsText(file);
    }
});

schoolManagementNav.addEventListener("click", () => {
    adminSchoolManagement.classList.remove("hidden");
    adminTeacherManagement.classList.add("hidden");
    teacherDashboard.classList.add("hidden");
    welcomeMessage.classList.add("hidden");
    loadSchoolManagement();
});

teacherManagementNav.addEventListener("click", () => {
    adminSchoolManagement.classList.add("hidden");
    adminTeacherManagement.classList.remove("hidden");
    teacherDashboard.classList.add("hidden");
    welcomeMessage.classList.add("hidden");
    loadTeachers();
});

function loadSchoolManagement() {
    schoolList.innerHTML = "";
    const schoolAccessList = JSON.parse(localStorage.getItem("schoolAccessList")) || {};

    for (const schoolName of Object.keys(schoolAccessList)) {
        const schoolCard = document.createElement("div");
        schoolCard.className = "bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-2";
        schoolCard.innerHTML = `
            <span>${schoolName}</span>
            <button class="remove-school-btn bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600" data-school="${schoolName}" tabindex="0" aria-label="Remove school ${schoolName}">Remove</button>
        `;
        schoolList.appendChild(schoolCard);
    }

    document.querySelectorAll(".remove-school-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const schoolName = btn.dataset.school;
            if (confirm(`Are you sure you want to remove ${schoolName}? This will delete all associated data.`)) {
                const schoolAccessList = JSON.parse(localStorage.getItem("schoolAccessList")) || {};
                delete schoolAccessList[schoolName];
                localStorage.setItem("schoolAccessList", JSON.stringify(schoolAccessList));
                localStorage.removeItem(`${schoolName}_teachers`);
                localStorage.removeItem(`${schoolName}_syllabusProgress`);
                loadSchoolManagement();
                populateSchoolDropdown("school-name");
                populateSchoolDropdown("teacher-school-select");
                showToast(`School ${schoolName} removed successfully!`);
            }
        });
    });
}

addSchoolBtn.addEventListener("click", () => {
    const schoolName = document.getElementById("new-school-name").value.trim();
    const schoolAccessList = JSON.parse(localStorage.getItem("schoolAccessList")) || {};

    if (schoolName && validateSchoolName(schoolName)) {
        if (schoolAccessList[schoolName]) {
            showToast("School already exists!");
            return;
        }
        schoolAccessList[schoolName] = {};
        localStorage.setItem("schoolAccessList", JSON.stringify(schoolAccessList));
        document.getElementById("new-school-name").value = "";
        loadSchoolManagement();
        populateSchoolDropdown("school-name");
        populateSchoolDropdown("teacher-school-select");
        showToast(`School ${schoolName} added successfully!`);
    } else {
        showToast("Please enter a valid school name (letters, numbers, spaces, and hyphens only).");
    }
});

function loadTeachers() {
    teacherList.innerHTML = "";
    const schoolAccessList = JSON.parse(localStorage.getItem("schoolAccessList")) || {};
    const selectedSchool = teacherSchoolSelect.value || Object.keys(schoolAccessList)[0];
    if (!selectedSchool) return;

    const teachers = JSON.parse(localStorage.getItem(`${selectedSchool}_teachers`)) || [];
    teachers.forEach(teacher => {
        const teacherCard = document.createElement("div");
        teacherCard.className = "bg-gray-50 p-4 rounded-lg flex justify-between items-center";
        teacherCard.innerHTML = `
            <span>${teacher.username} (School: ${selectedSchool})</span>
            <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 remove-teacher-btn" data-username="${teacher.username}" data-school="${selectedSchool}" tabindex="0" aria-label="Remove teacher ${teacher.username}">Remove</button>
        `;
        teacherList.appendChild(teacherCard);
    });

    document.querySelectorAll(".remove-teacher-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const username = btn.dataset.username;
            const school = btn.dataset.school;
            let teachers = JSON.parse(localStorage.getItem(`${school}_teachers`)) || [];
            teachers = teachers.filter(t => t.username !== username);
            localStorage.setItem(`${school}_teachers`, JSON.stringify(teachers));
            loadTeachers();
            showToast(`Teacher ${username} removed successfully!`);
        });
    });
}

addTeacherBtn.addEventListener("click", () => {
    const selectedSchool = teacherSchoolSelect.value;
    const username = document.getElementById("teacher-username").value;
    const password = document.getElementById("teacher-password").value;

    if (!selectedSchool) {
        showToast("Please select a school.");
        return;
    }
    if (username && password) {
        let teachers = JSON.parse(localStorage.getItem(`${selectedSchool}_teachers`)) || [];
        if (!teachers.find(t => t.username === username)) {
            teachers.push({ username, password });
            localStorage.setItem(`${selectedSchool}_teachers`, JSON.stringify(teachers));
            loadTeachers();
            document.getElementById("teacher-username").value = "";
            document.getElementById("teacher-password").value = "";
            showToast(`Teacher ${username} added successfully!`);
        } else {
            showToast("Teacher username already exists in this school!");
        }
    } else {
        showToast("Please enter both username and password.");
    }
});

teacherSchoolSelect.addEventListener("change", () => {
    loadTeachers();
});

function loadAnalytics() {
    const chartCanvas = document.getElementById("analyticsChartCanvas");
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};
            const classes = Object.keys(classData);
            const datasets = classes.map(classId => {
                const subjects = Object.keys(classData[classId].subjects);
                const totalLessons = subjects.reduce((sum, subject) => {
                    return sum + classData[classId].subjects[subject].length;
                }, 0);
                const completedLessons = subjects.reduce((sum, subject) => {
                    const progress = syllabusProgress[classId]?.[subject]?.lessons || [];
                    return sum + progress.filter(l => l.completed).length;
                }, 0);
                const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
                return percentage;
            });

            if (analyticsChart) {
                analyticsChart.destroy();
            }

            analyticsChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: classes.map(c => `Class ${c}`),
                    datasets: [{
                        label: 'Overall Completion (%)',
                        data: datasets,
                        backgroundColor: '#4f46e5',
                        borderColor: '#4338ca',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: { display: true, text: 'Completion (%)' },
                            ticks: { color: '#1a202c' }
                        },
                        x: { 
                            title: { display: true, text: 'Class' },
                            ticks: { color: '#1a202c' }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: '#1a202c' } }
                    }
                }
            });
            observer.disconnect();
        }
    });
    observer.observe(chartCanvas);
}

function loadSubjects() {
    subjectList.innerHTML = "";
    notificationsDiv.innerHTML = "";
    progressSummary.classList.add("hidden");
    const selectedClass = classSelect.value;
    if (!selectedClass) {
        subjectList.innerHTML = "<p class='text-gray-600'>Please select a class to view subjects.</p>";
        return;
    }
    currentClass = selectedClass;
    const subjects = classData[selectedClass].subjects;
    const syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};

    let totalLessons = 0;
    let completedLessons = 0;

    for (const [subject, lessons] of Object.entries(subjects)) {
        const subjectCard = createSubjectCard(subject, lessons, syllabusProgress[selectedClass]?.[subject]);
        subjectList.appendChild(subjectCard);

        totalLessons += lessons.length;
        const subjectProgress = syllabusProgress[selectedClass]?.[subject]?.lessons || [];
        completedLessons += subjectProgress.filter(l => l.completed).length;
    }

    const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    summaryText.textContent = `Total Lessons: ${totalLessons} | Completed: ${completedLessons} | Overall Completion: ${Math.round(percentage)}%`;
    progressSummary.classList.remove("hidden");

    const lowCompletionSubjects = Object.entries(syllabusProgress[selectedClass] || {}).filter(([subject, data]) => {
        const percentage = data.percentage || 0;
        return percentage < 20;
    });
    if (lowCompletionSubjects.length > 0) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = `Warning: The following subjects have less than 20% completion - ${lowCompletionSubjects.map(([subject]) => subject.charAt(0).toUpperCase() + subject.slice(1)).join(", ")}.`;
        notificationsDiv.appendChild(notification);
    }

    updateSyllabusChart();
}

function createSubjectCard(subject, lessons, savedProgress) {
    const subjectCard = document.createElement("div");
    subjectCard.className = `bg-white p-6 rounded-lg shadow-md subject-card cursor-pointer ${subject.toLowerCase().replace(/\s/g, '-')}`;
    subjectCard.dataset.subject = subject;
    subjectCard.tabIndex = 0;
    subjectCard.setAttribute("aria-label", `View ${subject} syllabus`);

    const subjectTitle = document.createElement("h2");
    subjectTitle.className = "text-2xl font-semibold mb-4 flex items-center";
    const icon = document.createElement("i");
    const iconClass = subject.includes("math") ? "fa-calculator" : 
                     subject.includes("hindi") ? "fa-language" : 
                     subject.includes("english") ? "fa-book" : "fa-leaf";
    icon.className = `fas ${iconClass} mr-2`;
    subjectTitle.appendChild(icon);
    subjectTitle.appendChild(document.createTextNode(subject.charAt(0).toUpperCase() + subject.slice(1)));
    subjectCard.appendChild(subjectTitle);

    const badgeDiv = document.createElement("div");
    badgeDiv.className = "mb-4";
    const badge = document.createElement("span");
    badge.className = "badge badge-pending";
    badge.textContent = "0% Completed";
    badgeDiv.appendChild(badge);
    subjectCard.appendChild(badgeDiv);

    const progressDiv = document.createElement("div");
    progressDiv.className = "progress-circle mb-4";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "60");
    svg.setAttribute("height", "60");
    const circleBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleBg.className = "circle-bg";
    circleBg.setAttribute("cx", "30");
    circleBg.setAttribute("cy", "30");
    circleBg.setAttribute("r", "25");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.className = "circle";
    circle.setAttribute("cx", "30");
    circle.setAttribute("cy", "30");
    circle.setAttribute("r", "25");
    circle.setAttribute("stroke-dasharray", "157");
    circle.setAttribute("stroke-dashoffset", "157");
    svg.appendChild(circleBg);
    svg.appendChild(circle);
    const percentageDiv = document.createElement("div");
    percentageDiv.className = "percentage";
    percentageDiv.textContent = "0%";
    progressDiv.appendChild(svg);
    progressDiv.appendChild(percentageDiv);
    subjectCard.appendChild(progressDiv);

    const lastUpdated = savedProgress?.lastUpdated || "Never";
    const lastUpdatedDiv = document.createElement("p");
    lastUpdatedDiv.className = "text-sm";
    lastUpdatedDiv.textContent = `Last Updated: ${lastUpdated}`;
    subjectCard.appendChild(lastUpdatedDiv);

    subjectCard.addEventListener("click", () => showSubjectDetails(subject, lessons, savedProgress));

    updateSubjectCardProgress(subjectCard, lessons, savedProgress);

    return subjectCard;
}

function updateSubjectCardProgress(subjectCard, lessons, savedProgress) {
    const completedLessons = savedProgress?.lessons?.filter(l => l.completed).length || 0;
    const totalLessons = lessons.length;
    const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    const circle = subjectCard.querySelector(".circle");
    if (circle) {
        const circumference = 157;
        const offset = circumference - (percentage / 100) * circumference;
        circle.setAttribute("stroke-dashoffset", offset);
    }

    const percentageText = subjectCard.querySelector(".percentage");
    if (percentageText) {
        percentageText.textContent = `${Math.round(percentage)}%`;
    }

    const badge = subjectCard.querySelector(".badge");
    if (badge) {
        badge.textContent = `${Math.round(percentage)}% Completed`;
        badge.className = `badge ${percentage === 100 ? "badge-completed" : percentage < 20 ? "badge-low" : "badge-pending"}`;
    }
}

function showSubjectDetails(subject, lessons, savedProgress) {
    currentSubject = subject;
    document.getElementById("modal-subject-name").textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} Syllabus`;
    modal.style.display = "block";
    updateLessonsList(lessons, savedProgress);
    updateHistoryDisplay();
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function updateLessonsList(lessons, savedProgress) {
    modalLessonsContainer.innerHTML = "";
    const lessonsList = document.createElement("ul");
    lessonsList.className = "space-y-2";

    lessons.forEach((lesson, index) => {
        const filter = lessonFilter.value;
        const searchQuery = lessonSearch.value.toLowerCase();
        const dateFilterValue = dateFilter.value;
        const isCompleted = savedProgress?.lessons?.find(l => l.lesson === lesson)?.completed || false;
        const completionDate = savedProgress?.lessons?.find(l => l.lesson === lesson)?.completionDate;
        const notes = savedProgress?.lessons?.find(l => l.lesson === lesson)?.notes || "";

        if (isCompleted && completionDate && dateFilterValue !== "all") {
            const today = new Date();
            const completedDate = new Date(completionDate);
            const diffTime = today - completedDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (dateFilterValue === "last7" && diffDays > 7) return;
            if (dateFilterValue === "last30" && diffDays > 30) return;
        }

        if ((filter === "completed" && !isCompleted) || (filter === "pending" && isCompleted)) return;
        if (searchQuery && !lesson.toLowerCase().includes(searchQuery)) return;

        const li = document.createElement("li");
        li.className = "flex items-center justify-between space-x-2";
        const checkboxDiv = document.createElement("div");
        checkboxDiv.className = "flex items-center";
        checkboxDiv.innerHTML = `
            <input type="checkbox" class="lesson-checkbox" data-lesson="${lesson}" ${isCompleted ? "checked" : ""} aria-label="Mark ${lesson} as completed">
            <span class="ml-2">${lesson}</span>
        `;
        li.appendChild(checkboxDiv);

        const notesDiv = document.createElement("div");
        notesDiv.className = "flex items-center";
        notesDiv.innerHTML = `
            <textarea id="notes-${index}" class="notes-input border rounded-lg" placeholder="Notes..." aria-label="Notes for ${lesson}">${notes}</textarea>
        `;
        li.appendChild(notesDiv);

        lessonsList.appendChild(li);
    });

    modalLessonsContainer.appendChild(lessonsList);
}

lessonFilter.addEventListener("change", () => {
    const lessons = classData[currentClass].subjects[currentSubject];
    const savedProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`))?.[currentClass]?.[currentSubject];
    updateLessonsList(lessons, savedProgress);
});

dateFilter.addEventListener("change", () => {
    const lessons = classData[currentClass].subjects[currentSubject];
    const savedProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`))?.[currentClass]?.[currentSubject];
    updateLessonsList(lessons, savedProgress);
});

lessonSearch.addEventListener("input", debounce(() => {
    const lessons = classData[currentClass].subjects[currentSubject];
    const savedProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`))?.[currentClass]?.[currentSubject];
    updateLessonsList(lessons, savedProgress);
}, 300));

updateSyllabusBtn.addEventListener("click", () => {
    updateSyllabusBtn.disabled = true;
    updateBtnText.textContent = "Updating...";
    updateSpinner.style.display = "block";

    setTimeout(() => {
        const classId = currentClass;
        const subject = currentSubject;
        const lessons = classData[classId].subjects[subject];
        const checkboxes = modalLessonsContainer.querySelectorAll(".lesson-checkbox");
        let syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};
        if (!syllabusProgress[classId]) {
            syllabusProgress[classId] = {};
        }
        if (!syllabusProgress[classId][subject]) {
            syllabusProgress[classId][subject] = {};
        }

        lastSyllabusState = JSON.parse(JSON.stringify(syllabusProgress[classId][subject]));
        undoBtn.classList.remove("hidden");

        const updatedLessons = lessons.map(lesson => {
            const checkbox = Array.from(checkboxes).find(cb => cb.dataset.lesson === lesson);
            const isCompleted = checkbox ? checkbox.checked : syllabusProgress[classId][subject]?.lessons?.find(l => l.lesson === lesson)?.completed || false;
            const notes = document.querySelector(`textarea[aria-label="Notes for ${lesson}"]`)?.value || "";
            return {
                lesson,
                completed: isCompleted,
                completionDate: isCompleted ? (syllabusProgress[classId][subject]?.lessons?.find(l => l.lesson === lesson)?.completionDate || new Date().toISOString().split("T")[0]) : null,
                notes
            };
        });

        const completedLessons = updatedLessons.filter(l => l.completed).length;
        const percentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

        syllabusProgress[classId][subject] = {
            lessons: updatedLessons,
            percentage,
            lastUpdated: new Date().toLocaleString()
        };
        localStorage.setItem(`${currentSchool}_syllabusProgress`, JSON.stringify(syllabusProgress));
        loadSubjects();

        const subjectCard = document.querySelector(`.subject-card[data-subject="${subject}"]`);
        if (subjectCard) {
            updateSubjectCardProgress(subjectCard, lessons, syllabusProgress[classId][subject]);
        }

        updateHistoryDisplay();
        updateSyllabusBtn.disabled = false;
        updateBtnText.textContent = "Update Syllabus";
        updateSpinner.style.display = "none";
        showToast("Syllabus updated successfully!");
    }, 500);
});

undoBtn.addEventListener("click", () => {
    if (!lastSyllabusState) return;
    let syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};
    syllabusProgress[currentClass][currentSubject] = lastSyllabusState;
    localStorage.setItem(`${currentSchool}_syllabusProgress`, JSON.stringify(syllabusProgress));
    loadSubjects();
    const lessons = classData[currentClass].subjects[currentSubject];
    updateLessonsList(lessons, lastSyllabusState);
    updateHistoryDisplay();
    undoBtn.classList.add("hidden");
    showToast("Last update undone!");
});

markAllCompletedBtn.addEventListener("click", () => {
    const checkboxes = modalLessonsContainer.querySelectorAll(".lesson-checkbox");
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
});

function updateHistoryDisplay() {
    const syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};
    const history = syllabusProgress[currentClass]?.[currentSubject]?.lastUpdated || "Never";
    updateHistory.innerHTML = `<p class="text-sm text-gray-500">Last Updated: ${history}</p>`;
}

function updateSyllabusChart() {
    const selectedClass = classSelect.value;
    if (!selectedClass) return;

    const subjects = Object.keys(classData[selectedClass].subjects);
    const syllabusProgress = JSON.parse(localStorage.getItem(`${currentSchool}_syllabusProgress`)) || {};

    const chartCanvas = document.getElementById("syllabusChartCanvas");
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (syllabusChart) {
                syllabusChart.destroy();
            }

            syllabusChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: subjects.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
                    datasets: [{
                        label: 'Completion (%)',
                        data: subjects.map(subject => syllabusProgress[selectedClass]?.[subject]?.percentage || 0),
                        backgroundColor: '#4f46e5',
                        borderColor: '#4338ca',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: { display: true, text: 'Completion (%)' },
                            ticks: { color: '#1a202c' }
                        },
                        x: { 
                            title: { display: true, text: 'Subjects' },
                            ticks: { color: '#1a202c' }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: '#1a202c' } }
                    }
                }
            });
            observer.disconnect();
        }
    });
    observer.observe(chartCanvas);
}

classSelect.addEventListener("change", () => {
    loadSubjects();
});