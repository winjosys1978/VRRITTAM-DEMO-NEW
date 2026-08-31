/* ============================================================
   VRRITTAM SUPER ADMIN DASHBOARD V3
   CENTRAL SYSTEM CONTROLLER
   ============================================================ */

"use strict";

/* ============================================================
   STORAGE KEYS
   ============================================================ */

const VRRITTAM_STORAGE = {
    schools: "VRRITTAM_SCHOOLS",
    users: "VRRITTAM_USERS",
    activities: "VRRITTAM_ACTIVITIES",
    notifications: "VRRITTAM_NOTIFICATIONS",
    settings: "VRRITTAM_SETTINGS"
};


/* ============================================================
   DEFAULT SYSTEM DATA
   ============================================================ */

const DEFAULT_DATA = {

    schools: [],

    users: {

        students: [],
        teachers: [],
        parents: [],
        schoolAdmins: []

    },

    activities: [],

    notifications: [],

    settings: {

        communicationMode:
            "SCHOOL_MEDIATED",

        allowDirectStudentContact:
            false,

        allowDirectParentContact:
            false,

        allowDirectTeacherContact:
            false

    }

};


/* ============================================================
   GLOBAL STATE
   ============================================================ */

let schools = [];
let activities = [];
let users = {
    students: [],
    teachers: [],
    parents: [],
    schoolAdmins: []
};

let notifications = [];

let settings = {
    communicationMode: "SCHOOL_MEDIATED",
    allowDirectStudentContact: false,
    allowDirectParentContact: false,
    allowDirectTeacherContact: false
};


/* ============================================================
   PAGE INITIALIZATION
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSystemData();

        setupSidebar();

        setupQuickActions();

        setupSchoolRegistration();

        setupSchoolSearch();

        renderEverything();

        console.log(
            "VRRITTAM Super Admin V3 initialized."
        );

    }
);


/* ============================================================
   SAFE LOCAL STORAGE
   ============================================================ */

function readStorage(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) {

            return fallback;

        }

        return JSON.parse(value);

    } catch (error) {

        console.warn(
            "VRRITTAM storage error:",
            key
        );

        return fallback;

    }

}


function writeStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            "VRRITTAM storage write error:",
            key
        );

    }

}


/* ============================================================
   LOAD SYSTEM DATA
   ============================================================ */

function loadSystemData() {

    schools =
        readStorage(
            VRRITTAM_STORAGE.schools,
            []
        );

    activities =
        readStorage(
            VRRITTAM_STORAGE.activities,
            []
        );

    notifications =
        readStorage(
            VRRITTAM_STORAGE.notifications,
            []
        );

    users =
        readStorage(
            VRRITTAM_STORAGE.users,
            DEFAULT_DATA.users
        );

    settings =
        readStorage(
            VRRITTAM_STORAGE.settings,
            DEFAULT_DATA.settings
        );


    if (!Array.isArray(schools)) {

        schools = [];

    }


    if (!Array.isArray(activities)) {

        activities = [];

    }


    if (!Array.isArray(notifications)) {

        notifications = [];

    }


    if (!users.students) {

        users.students = [];

    }

    if (!users.teachers) {

        users.teachers = [];

    }

    if (!users.parents) {

        users.parents = [];

    }

    if (!users.schoolAdmins) {

        users.schoolAdmins = [];

    }

}


/* ============================================================
   SAVE SYSTEM DATA
   ============================================================ */

function saveSystemData() {

    writeStorage(
        VRRITTAM_STORAGE.schools,
        schools
    );

    writeStorage(
        VRRITTAM_STORAGE.activities,
        activities
    );

    writeStorage(
        VRRITTAM_STORAGE.notifications,
        notifications
    );

    writeStorage(
        VRRITTAM_STORAGE.users,
        users
    );

    writeStorage(
        VRRITTAM_STORAGE.settings,
        settings
    );

}


/* ============================================================
   SIDEBAR
   ============================================================ */

function setupSidebar() {

    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    menuItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const module =
                        this.dataset.module;


                    menuItems.forEach(
                        function (menu) {

                            menu.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    handleModule(
                        module
                    );

                }
            );

        }
    );

}


/* ============================================================
   MODULE CONTROLLER
   ============================================================ */

function handleModule(module) {

    switch (module) {

        case "dashboard":

            scrollToTop();

            break;


        case "schools":

            scrollToSection(
                "school-management"
            );

            break;


        case "users":

            openUserManagement();

            break;


        case "students":

            openStudentManagement();

            break;


        case "teachers":

            openTeacherManagement();

            break;


        case "parents":

            openParentManagement();

            break;


        case "ai":

            openAICopilot();

            break;


        case "reports":

            openReports();

            break;


        case "settings":

            openSettings();

            break;


        case "logout":

            logoutSuperAdmin();

            break;


        default:

            console.warn(
                "Unknown module:",
                module
            );

    }

}


/* ============================================================
   SCROLL HELPERS
   ============================================================ */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function scrollToSection(className) {

    const section =
        document.querySelector(
            "." + className
        );


    if (section) {

        section.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


/* ============================================================
   QUICK ACTIONS
   ============================================================ */

function setupQuickActions() {

    const newSchool =
        document.getElementById(
            "btnNewSchool"
        );


    if (newSchool) {

        newSchool.onclick =
            openSchoolPopup;

    }


    const registerSchool =
        document.getElementById(
            "registerSchoolBtn"
        );


    if (registerSchool) {

        registerSchool.onclick =
            openSchoolPopup;

    }


    const ai =
        document.getElementById(
            "btnAICopilot"
        );


    if (ai) {

        ai.onclick =
            openAICopilot;

    }


    const schoolAdmin =
        document.getElementById(
            "btnSchoolAdmin"
        );


    if (schoolAdmin) {

        schoolAdmin.onclick =
            openSchoolAdminManagement;

    }


    const teacher =
        document.getElementById(
            "btnNewTeacher"
        );


    if (teacher) {

        teacher.onclick =
            openTeacherManagement;

    }


    const student =
        document.getElementById(
            "btnNewStudent"
        );


    if (student) {

        student.onclick =
            openStudentManagement;

    }


    const parent =
        document.getElementById(
            "btnNewParent"
        );


    if (parent) {

        parent.onclick =
            openParentManagement;

    }

}


/* ============================================================
   SCHOOL REGISTRATION
   ============================================================ */

function setupSchoolRegistration() {

    const cancel =
        document.getElementById(
            "cancelSchool"
        );


    const save =
        document.getElementById(
            "saveSchool"
        );


    if (cancel) {

        cancel.onclick =
            closeSchoolPopup;

    }


    if (save) {

        save.onclick =
            registerSchool;

    }

}


/* ============================================================
   OPEN SCHOOL POPUP
   ============================================================ */

function openSchoolPopup() {

    const popup =
        document.getElementById(
            "schoolPopup"
        );


    if (popup) {

        popup.style.display =
            "flex";

    }

}


/* ============================================================
   CLOSE SCHOOL POPUP
   ============================================================ */

function closeSchoolPopup() {

    const popup =
        document.getElementById(
            "schoolPopup"
        );


    if (popup) {

        popup.style.display =
            "none";

    }

}


/* ============================================================
   REGISTER SCHOOL
   ============================================================ */

function registerSchool() {

    const name =
        getValue(
            "schoolName"
        );


    const principal =
        getValue(
            "principalName"
        );


    const email =
        getValue(
            "schoolEmail"
        );


    const phone =
        getValue(
            "schoolPhone"
        );


    const address =
        getValue(
            "schoolAddress"
        );


    if (!name) {

        alert(
            "Please enter School Name."
        );

        return;

    }


    const school = {

        id:
            createID(
                "SCH"
            ),

        name:
            name,

        principal:
            principal,

        email:
            email,

        phone:
            phone,

        address:
            address,

        schoolType:
            "Private",

        country:
            "India",

        state:
            "",

        district:
            "",

        taluk:
            "",

        pincode:
            "",

        status:
            "Pending",

        createdAt:
            new Date().toISOString(),

        students:
            0,

        teachers:
            0,

        parents:
            0,

        schoolAdmins:
            0

    };


    schools.push(
        school
    );


    addActivity(

        "🏫 " +
        name +
        " registered."

    );


    addNotification(

        "New school registration: " +
        name

    );


    saveSystemData();

    renderEverything();

    clearSchoolForm();

    closeSchoolPopup();


    alert(

        "School registered successfully.\n\n" +
        "Status: Pending Approval"

    );

}


/* ============================================================
   SCHOOL SEARCH
   ============================================================ */

function setupSchoolSearch() {

    const search =
        document.getElementById(
            "searchSchool"
        );


    if (!search) {

        return;

    }


    search.addEventListener(
        "input",
        function () {

            renderSchoolTable(
                this.value
            );

        }
    );

}


/* ============================================================
   SCHOOL TABLE
   ============================================================ */

function renderSchoolTable(
    searchKeyword = ""
) {

    const table =
        document.getElementById(
            "schoolTable"
        );


    if (!table) {

        return;

    }


    const keyword =
        searchKeyword
            .toLowerCase()
            .trim();


    const filtered =
        schools.filter(
            function (school) {

                const searchable =

                    (
                        school.name +
                        " " +
                        school.principal +
                        " " +
                        school.schoolType +
                        " " +
                        school.state +
                        " " +
                        school.district +
                        " " +
                        school.taluk +
                        " " +
                        school.pincode
                    )
                    .toLowerCase();


                return searchable.includes(
                    keyword
                );

            }
        );


    if (
        filtered.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    style="
                        text-align:center;
                        padding:25px;
                    "
                >

                    No Schools Found

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered
            .map(
                function (school) {

                    const realIndex =
                        schools.indexOf(
                            school
                        );


                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    school.name
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    school.principal ||
                                    "-"
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    school.status
                                )}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    onclick="
                                        approveSchool(
                                            ${realIndex}
                                        )
                                    "
                                >

                                    ${
                                        school.status ===
                                        "Approved"
                                            ? "Approved"
                                            : "Approve"
                                    }

                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* ============================================================
   APPROVE SCHOOL
   ============================================================ */

function approveSchool(index) {

    const school =
        schools[index];


    if (!school) {

        return;

    }


    school.status =
        "Approved";


    addActivity(

        "✅ " +
        school.name +
        " approved."

    );


    addNotification(

        "School approved: " +
        school.name

    );


    saveSystemData();

    renderEverything();

}


/* ============================================================
   PENDING SCHOOL AREA
   ============================================================ */

function renderPendingSchools() {

    const area =
        document.getElementById(
            "pendingSchoolArea"
        );


    if (!area) {

        return;

    }


    const pending =
        schools.filter(
            function (school) {

                return school.status ===
                    "Pending";

            }
        );


    if (
        pending.length === 0
    ) {

        area.innerHTML =
            "No Pending Schools";

        return;

    }


    area.innerHTML =
        pending
            .map(
                function (school) {

                    const index =
                        schools.indexOf(
                            school
                        );


                    return `

                        <div
                            style="
                                padding:12px;
                                margin-bottom:8px;
                                background:#fff7ed;
                                border-radius:8px;
                            "
                        >

                            🟡
                            <strong>
                                ${escapeHTML(
                                    school.name
                                )}
                            </strong>

                            <br>

                            <small>
                                ${
                                    escapeHTML(
                                        school.principal ||
                                        "-"
                                    )
                                }
                            </small>

                            <br><br>

                            <button
                                type="button"
                                onclick="
                                    approveSchool(
                                        ${index}
                                    )
                                "
                            >
                                Approve
                            </button>

                        </div>

                    `;

                }
            )
            .join("");

}


/* ============================================================
   DYNAMIC DASHBOARD COUNTERS
   ============================================================ */

function updateCounters() {

    /* -----------------------------------------
       SAFETY
    ----------------------------------------- */

    if (!Array.isArray(schools)) {
        schools = [];
    }

    if (!users || typeof users !== "object") {
        users = {};
    }

    if (!Array.isArray(users.students)) {
        users.students = [];
    }

    if (!Array.isArray(users.teachers)) {
        users.teachers = [];
    }

    if (!Array.isArray(users.parents)) {
        users.parents = [];
    }

    if (!Array.isArray(users.schoolAdmins)) {
        users.schoolAdmins = [];
    }


    /* -----------------------------------------
       DASHBOARD COUNTS
    ----------------------------------------- */

    const schoolCount =
        schools.length;

    const studentCount =
        users.students.length;

    const teacherCount =
        users.teachers.length;

    const parentCount =
        users.parents.length;

    const aiCount =
        calculateAICopilotUsers();

    const activeCount =
        calculateActiveUsers();


    /* -----------------------------------------
       UPDATE DASHBOARD
    ----------------------------------------- */

    setText(
        "schoolCount",
        schoolCount
    );

    setText(
        "studentCount",
        studentCount
    );

    setText(
        "teacherCount",
        teacherCount
    );

    setText(
        "parentCount",
        parentCount
    );

    setText(
        "aiCount",
        aiCount
    );

    setText(
        "activeCount",
        activeCount
    );


    console.log(
        "VRRITTAM Dashboard Counters Updated:",
        {
            schools: schoolCount,
            students: studentCount,
            teachers: teacherCount,
            parents: parentCount,
            aiUsers: aiCount,
            activeUsers: activeCount
        }
    );

}


/* ============================================================
   AI COPILOT USER COUNT
   ============================================================ */

function calculateAICopilotUsers() {

    const students =
        Array.isArray(users.students)
            ? users.students
            : [];

    const teachers =
        Array.isArray(users.teachers)
            ? users.teachers
            : [];

    const parents =
        Array.isArray(users.parents)
            ? users.parents
            : [];

    const schoolAdmins =
        Array.isArray(users.schoolAdmins)
            ? users.schoolAdmins
            : [];


    return (
        students.length +
        teachers.length +
        parents.length +
        schoolAdmins.length
    );

}


/* ============================================================
   ACTIVE USER COUNT
   ============================================================ */

function calculateActiveUsers() {

    const allUsers = [

        ...(Array.isArray(users.students)
            ? users.students
            : []),

        ...(Array.isArray(users.teachers)
            ? users.teachers
            : []),

        ...(Array.isArray(users.parents)
            ? users.parents
            : []),

        ...(Array.isArray(users.schoolAdmins)
            ? users.schoolAdmins
            : [])

    ];


    return allUsers.filter(
        function (user) {

            return user &&
                   user.active !== false;

        }
    ).length;

}

/* ============================================================
   USER MANAGEMENT
   ============================================================ */

function openUserManagement() {

    showSystemMessage(

        "User Management",

        "Students, Teachers, Parents and School Admin accounts are controlled from this central Super Admin layer."

    );

}


/* ============================================================
   STUDENT MANAGEMENT
   ============================================================ */

function openStudentManagement() {

    showSystemMessage(

        "Student Management",

        "Student management module is connected to the central VRRITTAM user data layer."

    );

}


/* ============================================================
   TEACHER MANAGEMENT
   ============================================================ */

function openTeacherManagement() {

    showSystemMessage(

        "Teacher Management",

        "Teacher management module is connected to the central VRRITTAM user data layer."

    );

}


/* ============================================================
   PARENT MANAGEMENT
   ============================================================ */

function openParentManagement() {

    showSystemMessage(

        "Parent Management",

        "Parent communication must remain school-mediated."

    );

}


/* ============================================================
   SCHOOL ADMIN MANAGEMENT
   ============================================================ */

function openSchoolAdminManagement() {

    showSystemMessage(

        "School Admin Management",

        "School Admin accounts are controlled by Super Admin and linked to their registered schools."

    );

}


/* ============================================================
   AI COPILOT
   ============================================================ */

function openAICopilot() {

    window.location.href =
        "ai-copilot.html";

}


/* ============================================================
   REPORTS
   ============================================================ */

function openReports() {

    showSystemMessage(

        "Reports & Analytics",

        "Super Admin reports will use centralized school, user, attendance, fees, performance and activity data."

    );

}


/* ============================================================
   SETTINGS
   ============================================================ */

function openSettings() {

    showSystemMessage(

        "System Settings",

        "Communication policy: School-mediated. Direct Super Admin communication with Students, Parents and Teachers is disabled."

    );

}


/* ============================================================
   COMMUNICATION POLICY
   ============================================================ */

function canDirectContact(role) {

    if (
        role === "student" ||
        role === "parent" ||
        role === "teacher"
    ) {

        return false;

    }


    return true;

}


function getCommunicationPolicy() {

    return {

        mode:
            "SCHOOL_MEDIATED",

        student:
            false,

        parent:
            false,

        teacher:
            false,

        schoolAdmin:
            true

    };

}


/* ============================================================
   ACTIVITY LOG
   ============================================================ */

function addActivity(text) {

    activities.unshift({

        id:
            createID(
                "ACT"
            ),

        text:
            text,

        createdAt:
            new Date().toISOString()

    });


    if (
        activities.length > 100
    ) {

        activities =
            activities.slice(
                0,
                100
            );

    }


    saveSystemData();

    renderActivities();

}


/* ============================================================
   RENDER ACTIVITIES
   ============================================================ */

function renderActivities() {

    const list =
        document.getElementById(
            "activityList"
        );


    if (!list) {

        return;

    }


    if (
        activities.length === 0
    ) {

        list.innerHTML = `

            <li>
                🚀 VRRITTAM Super Admin initialized
            </li>

        `;

        return;

    }


    list.innerHTML =
        activities
            .slice(0, 10)
            .map(
                function (activity) {

                    return `

                        <li>
                            ${escapeHTML(
                                activity.text
                            )}
                        </li>

                    `;

                }
            )
            .join("");

}


/* ============================================================
   NOTIFICATIONS
   ============================================================ */

function addNotification(message) {

    notifications.unshift({

        id:
            createID(
                "NOT"
            ),

        message:
            message,

        read:
            false,

        createdAt:
            new Date().toISOString()

    });


    notifications =
        notifications.slice(
            0,
            100
        );


    saveSystemData();

}


/* ============================================================
   CLEAR SCHOOL FORM
   ============================================================ */

function clearSchoolForm() {

    [

        "schoolName",
        "principalName",
        "schoolEmail",
        "schoolPhone",
        "schoolAddress"

    ]
    .forEach(
        function (id) {

            const field =
                document.getElementById(
                    id
                );


            if (field) {

                field.value =
                    "";

            }

        }
    );

}


/* ============================================================
   FULL RENDER
   ============================================================ */

function renderEverything() {

    updateCounters();

    renderSchoolTable();

    renderPendingSchools();

    renderActivities();

}


/* ============================================================
   SYSTEM MESSAGE
   ============================================================ */

function showSystemMessage(
    title,
    message
) {

    alert(
        title +
        "\n\n" +
        message
    );

}


/* ============================================================
   UTILITIES
   ============================================================ */

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return "";

    }


    return element.value.trim();

}


function setText(id, value) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.innerText =
            value;

    }

}


function createID(prefix) {

    return (

        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)

    );

}


function escapeHTML(value) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* ============================================================
   LOGOUT
   ============================================================ */

function logoutSuperAdmin() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return;

    }


    sessionStorage.removeItem(
        "vrrittamLoggedIn"
    );

    sessionStorage.removeItem(
        "vrrittamRole"
    );

    sessionStorage.removeItem(
        "vrrittamRoleName"
    );

    sessionStorage.removeItem(
        "vrrittamUsername"
    );


    window.location.href =
        "login.html";

}


/* ============================================================
   GLOBAL ACCESS
   ============================================================ */

window.VRRITTAM_SUPER_ADMIN = {

    getSchools:
        function () {

            return schools;

        },

    getUsers:
        function () {

            return users;

        },

    getActivities:
        function () {

            return activities;

        },

    getNotifications:
        function () {

            return notifications;

        },

    getCommunicationPolicy:
        getCommunicationPolicy,

    canDirectContact:
        canDirectContact,

    save:
        saveSystemData

};


/* ============================================================
   END
   ============================================================ */