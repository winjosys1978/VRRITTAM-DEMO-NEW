/* ============================================================
   VRRITTAM SUPER ADMIN DASHBOARD V4
   DYNAMIC CENTRAL CONTROLLER + MANAGEMENT + AI
   ============================================================ */

"use strict";

/* =========================================================
   FIREBASE INITIALIZATION
   ========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyD42wAshGRCofV6-WJvI5gNr9m3zlsMhFQ",
    authDomain: "vrrittam-c9878.firebaseapp.com",
    projectId: "vrrittam-c9878",
    storageBucket: "vrrittam-c9878.firebasestorage.app",
    messagingSenderId: "725733451228",
    appId: "1:725733451228:web:ddb67e015ac35d012e5b19",
    measurementId: "G-8WLP9R7XG2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database reference
const db = firebase.firestore();

// Firebase Authentication reference
const auth = firebase.auth();

console.log(
    "VRRITTAM Firebase Auth initialized:",
    !!auth
);

console.log("VRRITTAM Firebase initialized:", firebase.apps.length > 0);
console.log("VRRITTAM Firestore initialized:", !!db);
console.log("VRRITTAM Firebase Project:", firebase.app().options.projectId);

/* =========================================================
   FIRESTORE CONTROLLED WRITE TEST
   ========================================================= */

async function testFirestoreWrite() {

    try {

        const testRef = db
            .collection("vrrittam_test")
            .doc("firebase_test");

        await testRef.set({
            test: true,
            message: "VRRITTAM Firestore Write Test",
            projectId: firebase.app().options.projectId,
            testedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log(
            "✅ VRRITTAM FIRESTORE WRITE TEST SUCCESS"
        );

    } catch (error) {

        console.error(
            "❌ VRRITTAM FIRESTORE WRITE TEST FAILED:",
            error
        );

    }

}

/* =========================================================
   FIRESTORE CONTROLLED READ TEST
   ========================================================= */

async function testFirestoreRead() {

    try {

        const testRef = db
            .collection("vrrittam_test")
            .doc("firebase_test");

        const doc = await testRef.get();

        if (doc.exists) {

            console.log(
                "✅ VRRITTAM FIRESTORE READ TEST SUCCESS:",
                doc.data()
            );

        } else {

            console.log(
                "❌ VRRITTAM FIRESTORE READ TEST: DOCUMENT NOT FOUND"
            );

        }

    } catch (error) {

        console.error(
            "❌ VRRITTAM FIRESTORE READ TEST FAILED:",
            error
        );

    }

}

/* =========================================================
   EXPOSE FIRESTORE TEST FUNCTIONS
   ========================================================= */

window.testFirestoreRead = testFirestoreRead;
window.testFirestoreWrite = testFirestoreWrite;




/* ============================================================
   STORAGE
   ============================================================ */

const VRRITTAM_V4_STORAGE = {

    schools: "VRRITTAM_SCHOOLS",
    users: "VRRITTAM_USERS",
    activities: "VRRITTAM_ACTIVITIES",
    notifications: "VRRITTAM_NOTIFICATIONS",
    settings: "VRRITTAM_SETTINGS"

};


/* ============================================================
   GLOBAL DATA
   ============================================================ */

let schools = [];

let users = {
    students: [],
    teachers: [],
    parents: [],
    schoolAdmins: []
};

let activities = [];

let notifications = [];

let settings = {
    communicationMode: "SCHOOL_MEDIATED",
    allowDirectStudentContact: false,
    allowDirectParentContact: false,
    allowDirectTeacherContact: false
};


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSystemData();

        setupSidebar();

        setupQuickActions();

        setupSchoolRegistration();

        setupSchoolSearch();

        injectV4Styles();

        renderEverything();

        startLiveRefresh();

        console.log(
            "VRRITTAM SUPER ADMIN V4 ACTIVE"
        );

    }
);

async function loadDashboardCountsFromFirestore() {

    try {

        const schoolsSnap = await db.collection("schools").get();
        const studentsSnap = await db.collection("students").get();
        const teachersSnap = await db.collection("teachers").get();

        schools = schoolsSnap.docs.map(function(doc) {
            return { id: doc.id, ...doc.data() };
        });

        users.students = studentsSnap.docs.map(function(doc) {
            return { id: doc.id, ...doc.data() };
        });

        users.teachers = teachersSnap.docs.map(function(doc) {
            return { id: doc.id, ...doc.data() };
        });

        console.log(
            "VRRITTAM SUPER ADMIN FIRESTORE COUNTS:",
            "Schools:", schools.length,
            "Students:", users.students.length,
            "Teachers:", users.teachers.length
        );

        renderEverything();

    }
    catch (error) {
        console.error("VRRITTAM SUPER ADMIN FIRESTORE LOAD ERROR:", error.code, error.message);
    }

}

auth.onAuthStateChanged(function(user) {
    if (user) {
        loadDashboardCountsFromFirestore();
    } else {
        console.error("No logged-in user - dashboard counts not loaded");
    }
});


/* ============================================================
   STORAGE
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
            "Storage read error:",
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
            "Storage write error:",
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
            VRRITTAM_V4_STORAGE.schools,
            []
        );

    users =
        readStorage(
            VRRITTAM_V4_STORAGE.users,
            {
                students: [],
                teachers: [],
                parents: [],
                schoolAdmins: []
            }
        );

    activities =
        readStorage(
            VRRITTAM_V4_STORAGE.activities,
            []
        );

    notifications =
        readStorage(
            VRRITTAM_V4_STORAGE.notifications,
            []
        );

    settings =
        readStorage(
            VRRITTAM_V4_STORAGE.settings,
            settings
        );


    if (!Array.isArray(schools)) {

        schools = [];

    }


    if (!users || typeof users !== "object") {

        users = {};

    }


    [
        "students",
        "teachers",
        "parents",
        "schoolAdmins"
    ]
    .forEach(
        function (role) {

            if (!Array.isArray(users[role])) {

                users[role] = [];

            }

        }
    );


    if (!Array.isArray(activities)) {

        activities = [];

    }


    if (!Array.isArray(notifications)) {

        notifications = [];

    }

}


/* ============================================================
   SAVE
   ============================================================ */

function saveSystemData() {

    writeStorage(
        VRRITTAM_V4_STORAGE.schools,
        schools
    );

    writeStorage(
        VRRITTAM_V4_STORAGE.users,
        users
    );

    writeStorage(
        VRRITTAM_V4_STORAGE.activities,
        activities
    );

    writeStorage(
        VRRITTAM_V4_STORAGE.notifications,
        notifications
    );

    writeStorage(
        VRRITTAM_V4_STORAGE.settings,
        settings
    );

}


/* ============================================================
   COUNTERS
   ============================================================ */

function updateCounters() {

    setText(
        "schoolCount",
        schools.length
    );

    setText(
        "studentCount",
        users.students.length
    );

    setText(
        "teacherCount",
        users.teachers.length
    );

    setText(
        "parentCount",
        users.parents.length
    );


    const allUsers = [

        ...users.students,
        ...users.teachers,
        ...users.parents,
        ...users.schoolAdmins

    ];


    setText(
        "activeCount",
        allUsers.filter(
            user =>
                user &&
                user.active !== false
        ).length
    );


    setText(
        "aiCount",
        allUsers.length
    );


    /* Compatibility with older dashboard IDs */

    setText(
        "totalStudents",
        users.students.length
    );


    setText(
        "activeStudents",
        users.students.filter(
            student =>
                student.active !== false
        ).length
    );


    setText(
        "attentionStudents",

        users.students.filter(
            student =>
                Number(student.attendance) < 75
        ).length

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


    if (!table) return;


    const keyword =
        String(
            searchKeyword
        )
        .toLowerCase()
        .trim();


    const filtered =
        schools.filter(
            function (school) {

                const text = [

                    school.id,
                    school.name,
                    school.principal,
                    school.state,
                    school.district,
                    school.taluk,
                    school.email

                ]
                .join(" ")
                .toLowerCase();


                return text.includes(
                    keyword
                );

            }
        );


    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    style="
                        padding:25px;
                        text-align:center;
                        color:#64748b;
                    "
                >

                    No Schools Found

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered.map(
            function (school) {

                const index =
                    schools.indexOf(
                        school
                    );


                return `

                    <tr>

                        <td>
                            ${escapeHTML(
                                school.name ||
                                "-"
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
                                school.status ||
                                "Pending"
                            )}
                        </td>

                        <td>

                            <button
                                type="button"
                                onclick="
                                    VRRITTAM_V4.viewSchool(
                                        ${index}
                                    )
                                "
                            >
                                👁 View
                            </button>


                            ${
                                school.status !==
                                "Approved"

                                ?

                                `
                                <button
                                    type="button"
                                    onclick="
                                        VRRITTAM_V4.approveSchool(
                                            ${index}
                                        )
                                    "
                                >
                                    Approve
                                </button>
                                `

                                :

                                `✅`
                            }

                        </td>

                    </tr>

                `;

            }
        )
        .join("");

}


/* ============================================================
   SCHOOL APPROVAL
   ============================================================ */

function approveSchool(index) {

    const school =
        schools[index];


    if (!school) return;


    school.status =
        "Approved";


    school.approvedAt =
        new Date().toISOString();


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

    showToast(
        "School approved successfully"
    );

}


/* ============================================================
   SCHOOL REGISTRATION
   ============================================================ */

   async function registerSchool() {

    const name = getValue("schoolName");
    const adminEmail = getValue("schoolAdminEmail");
    const adminPassword = getValue("schoolAdminPassword");

    if (!name) {
        alert("Please enter School Name.");
        return;
    }

    if (!adminEmail || !adminPassword) {
        alert("Please enter School Admin Email and Password.");
        return;
    }

    if (adminPassword.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const saveBtn = document.getElementById("saveSchool");
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = "Registering...";
    }

    // Secondary Firebase App — Super Admin logout ஆகாம School Admin account create பண்ண
    const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary" + Date.now());
  const secondaryAuth = secondaryApp.auth();
await secondaryAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);

    try {

        const schoolId = createID("SCH");

        // Step 1: Firebase Auth-ல School Admin Account Create பண்றது
        const userCredential = await secondaryAuth.createUserWithEmailAndPassword(adminEmail, adminPassword);
        const newUid = userCredential.user.uid;

        const school = {
            id: schoolId,
            name: name,
            principal: getValue("principalName"),
            email: getValue("schoolEmail"),
            phone: getValue("schoolPhone"),
            address: getValue("schoolAddress"),
            schoolType: getValue("schoolType") || "Private",
            country: "India",
            state: getValue("schoolState"),
            district: getValue("schoolDistrict"),
            taluk: getValue("schoolTaluk"),
            pincode: getValue("schoolPincode"),
            status: "Pending",
            createdAt: new Date().toISOString(),
            adminEmail: adminEmail,
            adminUid: newUid,
            students: 0,
            teachers: 0,
            parents: 0,
            schoolAdmins: 1
        };

        // Step 2: Firestore-ல School Data Save பண்றது (Database-ல real-ஆ save ஆகும்)
        await db.collection("schools").doc(schoolId).set(school);

        // Step 3: Firestore-ல Admin Document Create பண்றது (Login-க்கு தேவை)
        await db.collection("admins").doc(newUid).set({
            email: adminEmail,
            role: "school-admin",
            schoolID: schoolId,
            schoolName: name,
            active: true,
            createdAt: new Date().toISOString()
        });

        // Secondary App-ஐ Logout & Cleanup பண்றது
        await secondaryAuth.signOut();
        await secondaryApp.delete();

        // Local array-லயும் சேர்த்து UI-ல Immediate-ஆ காட்டறது
        schools.push(school);

        addActivity("🏫 " + name + " registered.");
        addNotification("New school registration: " + name);

        saveSystemData();
        renderEverything();
        closeSchoolPopup();

        alert(
            "School registered successfully!\n\n" +
            "School Admin Login Details:\n" +
            "Email: " + adminEmail + "\n" +
            "Password: " + adminPassword + "\n\n" +
            "Status: Pending Approval"
        );

    }
    catch (error) {

        console.error("VRRITTAM School Registration Error:", error.code, error.message);

        try { await secondaryApp.delete(); } catch(e) {}

        if (error.code === "auth/email-already-in-use") {
            alert("This email is already used by another admin. Please use a different email.");
        } else if (error.code === "auth/invalid-email") {
            alert("Please enter a valid email address.");
        } else if (error.code === "auth/weak-password") {
            alert("Password is too weak. Use at least 6 characters.");
        } else {
            alert("Registration failed: " + error.message);
        }

    }
    finally {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = "🏫 Register School";
        }
    }

}

/* ============================================================
   VIEW ONLY MANAGEMENT
   ============================================================ */

let currentManagementType =
    "users";


function openUserManagement() {

    openManagement(
        "users"
    );

}


function openStudentManagement() {

    openManagement(
        "students"
    );

}


function openTeacherManagement() {

    openManagement(
        "teachers"
    );

}


function openParentManagement() {

    openManagement(
        "parents"
    );

}


function openSchoolAdminManagement() {

    openManagement(
        "schoolAdmins"
    );

}


/* ============================================================
   MANAGEMENT MODAL
   ============================================================ */

function openManagement(type) {

    currentManagementType =
        type;


    createManagementModal();


    const titles = {

        users:
            "👤 User Management",

        students:
            "🎓 Student Management",

        teachers:
            "👨‍🏫 Teacher Management",

        parents:
            "👨‍👩‍👧 Parent Management",

        schoolAdmins:
            "🏢 School Admin Management"

    };


    const subtitles = {

        users:
            "Centralized user directory — View Only",

        students:
            "Centralized Student Information — View Only",

        teachers:
            "Centralized Teacher Information — View Only",

        parents:
            "Centralized Parent Information — View Only",

        schoolAdmins:
            "Registered School Admins — View Only"

    };


    setText(
        "v4ManagementTitle",
        titles[type]
    );


    setText(
        "v4ManagementSubtitle",
        subtitles[type]
    );


    populateManagementFilters();


    document.getElementById(
        "v4ManagementModal"
    ).style.display =
        "flex";


    document.body.style.overflow =
        "hidden";


    renderManagementTable();

}


function createManagementModal() {

    if (
        document.getElementById(
            "v4ManagementModal"
        )
    ) {

        return;

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "v4ManagementModal";


    modal.innerHTML = `

        <div
            class="v4-overlay"
            onclick="
                closeManagement()
            "
        ></div>


        <div
            class="v4-management-card"
        >

            <div
                class="v4-header"
            >

                <div>

                    <span
                        class="v4-badge"
                    >
                        VIEW ONLY
                    </span>

                    <h2
                        id="v4ManagementTitle"
                    >
                        Management
                    </h2>

                    <p
                        id="v4ManagementSubtitle"
                    >
                    </p>

                </div>


                <button
                    type="button"
                    class="v4-close"
                    onclick="
                        closeManagement()
                    "
                >

                    ✕ Close

                </button>

            </div>


            <div
                class="v4-filters"
            >

                <input
                    id="v4Search"
                    placeholder="
                        🔍 Search Name / ID / School
                    "
                >


                <select
                    id="v4StateFilter"
                >

                    <option value="">
                        All States
                    </option>

                </select>


                <select
                    id="v4DistrictFilter"
                >

                    <option value="">
                        All Districts
                    </option>

                </select>


                <select
                    id="v4TalukFilter"
                >

                    <option value="">
                        All Taluks
                    </option>

                </select>


                <input
                    id="v4SchoolFilter"
                    placeholder="🏫 Search School"
                >

            </div>


            <div
                class="v4-notice"
            >

                🔒
                <strong>
                    View Only Mode
                </strong>

                —
                Super Admin can view centralized
                information. Creation, editing and
                deletion remain under the appropriate
                School Admin scope.

            </div>


            <div
                class="v4-table-wrapper"
            >

                <table
                    class="v4-table"
                >

                    <thead
                        id="v4TableHead"
                    ></thead>

                    <tbody
                        id="v4TableBody"
                    ></tbody>

                </table>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document.getElementById(
        "v4Search"
    )
    .addEventListener(
        "input",
        renderManagementTable
    );


    document.getElementById(
        "v4SchoolFilter"
    )
    .addEventListener(
        "input",
        renderManagementTable
    );


    document.getElementById(
        "v4StateFilter"
    )
    .addEventListener(
        "change",
        function () {

            populateDistricts();

            renderManagementTable();

        }
    );


    document.getElementById(
        "v4DistrictFilter"
    )
    .addEventListener(
        "change",
        function () {

            populateTaluks();

            renderManagementTable();

        }
    );


    document.getElementById(
        "v4TalukFilter"
    )
    .addEventListener(
        "change",
        renderManagementTable
    );

}


/* ============================================================
   CLOSE MANAGEMENT
   ============================================================ */

function closeManagement() {

    const modal =
        document.getElementById(
            "v4ManagementModal"
        );


    if (modal) {

        modal.remove();

    }


    document.body.style.overflow =
        "";

}


/* ============================================================
   GET MANAGEMENT DATA
   ============================================================ */

function getManagementData() {

    if (
        currentManagementType ===
        "students"
    ) {

        return users.students;

    }


    if (
        currentManagementType ===
        "teachers"
    ) {

        return users.teachers;

    }


    if (
        currentManagementType ===
        "parents"
    ) {

        return users.parents;

    }


    if (
        currentManagementType ===
        "schoolAdmins"
    ) {

        return users.schoolAdmins;

    }


    return [

        ...users.students,
        ...users.teachers,
        ...users.parents,
        ...users.schoolAdmins

    ];

}


/* ============================================================
   FILTERS
   ============================================================ */

function populateManagementFilters() {

    const state =
        document.getElementById(
            "v4StateFilter"
        );


    if (!state) return;


    const data =
        getManagementData();


    const states =
        [
            ...new Set(
                data
                    .map(
                        x =>
                            x.state ||
                            ""
                    )
                    .filter(Boolean)
            )
        ];


    state.innerHTML =
        `<option value="">
            All States
        </option>` +

        states
            .sort()
            .map(
                x =>
                    `
                    <option value="${escapeHTML(x)}">
                        ${escapeHTML(x)}
                    </option>
                    `
            )
            .join("");


    populateDistricts();

}


function populateDistricts() {

    const state =
        getValue(
            "v4StateFilter"
        );


    const select =
        document.getElementById(
            "v4DistrictFilter"
        );


    if (!select) return;


    const data =
        getManagementData();


    const districts =
        [
            ...new Set(

                data
                    .filter(
                        x =>
                            !state ||
                            x.state === state
                    )
                    .map(
                        x =>
                            x.district ||
                            ""
                    )
                    .filter(Boolean)

            )
        ];


    select.innerHTML =
        `<option value="">
            All Districts
        </option>` +

        districts
            .sort()
            .map(
                x =>
                    `
                    <option value="${escapeHTML(x)}">
                        ${escapeHTML(x)}
                    </option>
                    `
            )
            .join("");


    populateTaluks();

}


function populateTaluks() {

    const state =
        getValue(
            "v4StateFilter"
        );


    const district =
        getValue(
            "v4DistrictFilter"
        );


    const select =
        document.getElementById(
            "v4TalukFilter"
        );


    if (!select) return;


    const data =
        getManagementData();


    const taluks =
        [
            ...new Set(

                data
                    .filter(
                        x =>
                            (!state ||
                                x.state === state)

                            &&

                            (!district ||
                                x.district === district)
                    )
                    .map(
                        x =>
                            x.taluk ||
                            ""
                    )
                    .filter(Boolean)

            )
        ];


    select.innerHTML =
        `<option value="">
            All Taluks
        </option>` +

        taluks
            .sort()
            .map(
                x =>
                    `
                    <option value="${escapeHTML(x)}">
                        ${escapeHTML(x)}
                    </option>
                    `
            )
            .join("");

}


/* ============================================================
   MANAGEMENT TABLE
   ============================================================ */

function renderManagementTable() {

    const body =
        document.getElementById(
            "v4TableBody"
        );


    const head =
        document.getElementById(
            "v4TableHead"
        );


    if (!body || !head) return;


    const keyword =
        getValue(
            "v4Search"
        )
        .toLowerCase();


    const schoolKeyword =
        getValue(
            "v4SchoolFilter"
        )
        .toLowerCase();


    const state =
        getValue(
            "v4StateFilter"
        );


    const district =
        getValue(
            "v4DistrictFilter"
        );


    const taluk =
        getValue(
            "v4TalukFilter"
        );


    let data =
        getManagementData();


    data =
        data.filter(
            function (item) {

                const name =
                    String(
                        item.name ||
                        item.studentName ||
                        item.teacherName ||
                        item.parentName ||
                        "-"
                    );


                const id =
                    String(
                        item.id ||
                        item.studentId ||
                        item.teacherId ||
                        item.parentId ||
                        item.userId ||
                        "-"
                    );


                const school =
                    String(
                        item.schoolName ||
                        item.school ||
                        ""
                    );


                return (

                    (
                        !keyword ||

                        name.toLowerCase()
                            .includes(keyword) ||

                        id.toLowerCase()
                            .includes(keyword)

                    )

                    &&

                    (
                        !schoolKeyword ||

                        school.toLowerCase()
                            .includes(
                                schoolKeyword
                            )

                    )

                    &&

                    (
                        !state ||
                        item.state === state
                    )

                    &&

                    (
                        !district ||
                        item.district === district
                    )

                    &&

                    (
                        !taluk ||
                        item.taluk === taluk
                    )

                );

            }
        );


    /* -----------------------------
       HEADERS
    ----------------------------- */

    let headers;


    if (
        currentManagementType ===
        "students"
    ) {

        headers = [

            "Student",
            "Student ID",
            "School",
            "Class",
            "Section",
            "State",
            "District",
            "Status",
            "Action"

        ];

    }


    else if (
        currentManagementType ===
        "teachers"
    ) {

        headers = [

            "Teacher",
            "Teacher ID",
            "School",
            "Subject",
            "State",
            "District",
            "Status",
            "Action"

        ];

    }


    else if (
        currentManagementType ===
        "parents"
    ) {

        headers = [

            "Parent",
            "Parent ID",
            "School",
            "Child",
            "State",
            "District",
            "Status",
            "Action"

        ];

    }


    else {

        headers = [

            "Name",
            "User ID",
            "Role",
            "School",
            "State",
            "District",
            "Status",
            "Action"

        ];

    }


    head.innerHTML =
        `
        <tr>
            ${
                headers
                    .map(
                        x =>
                            `<th>${x}</th>`
                    )
                    .join("")
            }
        </tr>
        `;


    if (!data.length) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="${headers.length}"
                    style="
                        padding:30px;
                        text-align:center;
                        color:#64748b;
                    "
                >

                    No Records Found

                </td>

            </tr>

        `;

        return;

    }


    body.innerHTML =
        data.map(
            function (item) {

                const originalIndex =
                    getManagementData()
                        .indexOf(item);


                const name =
                    item.name ||
                    item.studentName ||
                    item.teacherName ||
                    item.parentName ||
                    "-";


                const id =
                    item.id ||
                    item.studentId ||
                    item.teacherId ||
                    item.parentId ||
                    item.userId ||
                    "-";


                const school =
                    item.schoolName ||
                    item.school ||
                    "-";


                const status =
                    item.status ||
                    (
                        item.active === false
                            ? "Inactive"
                            : "Active"
                    );


                const badge =
                    `
                    <span
                        class="
                            v4-status
                            ${
                                status === "Active"
                                ? "active"
                                : "inactive"
                            }
                        "
                    >
                        ${escapeHTML(status)}
                    </span>
                    `;


                let cells;


                if (
                    currentManagementType ===
                    "students"
                ) {

                    cells = `

                        <td>
                            ${escapeHTML(name)}
                        </td>

                        <td>
                            ${escapeHTML(id)}
                        </td>

                        <td>
                            ${escapeHTML(school)}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.className ||
                                item.class ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.section ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.state ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.district ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${badge}
                        </td>

                    `;

                }


                else if (
                    currentManagementType ===
                    "teachers"
                ) {

                    cells = `

                        <td>
                            ${escapeHTML(name)}
                        </td>

                        <td>
                            ${escapeHTML(id)}
                        </td>

                        <td>
                            ${escapeHTML(school)}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.subject ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.state ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.district ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${badge}
                        </td>

                    `;

                }


                else if (
                    currentManagementType ===
                    "parents"
                ) {

                    cells = `

                        <td>
                            ${escapeHTML(name)}
                        </td>

                        <td>
                            ${escapeHTML(id)}
                        </td>

                        <td>
                            ${escapeHTML(school)}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.studentName ||
                                item.childName ||
                                item.studentId ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.state ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.district ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${badge}
                        </td>

                    `;

                }


                else {

                    cells = `

                        <td>
                            ${escapeHTML(name)}
                        </td>

                        <td>
                            ${escapeHTML(id)}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.role ||
                                "User"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(school)}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.state ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.district ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${badge}
                        </td>

                    `;

                }


                return `

                    <tr>

                        ${cells}

                        <td>

                            <button
                                class="v4-view"
                                type="button"
                                onclick="
                                    viewManagementRecord(
                                        '${currentManagementType}',
                                        ${originalIndex}
                                    )
                                "
                            >

                                👁 View

                            </button>

                        </td>

                    </tr>

                `;

            }
        )
        .join("");

}


/* ============================================================
   VIEW RECORD
   ============================================================ */

function viewManagementRecord(
    type,
    index
) {

    const data =
        getManagementData();


    const item =
        data[index];


    if (!item) return;


    const details = [

        [
            "Name",
            item.name ||
            item.studentName ||
            item.teacherName ||
            item.parentName ||
            "-"
        ],

        [
            "ID",
            item.id ||
            item.studentId ||
            item.teacherId ||
            item.parentId ||
            item.userId ||
            "-"
        ],

        [
            "School",
            item.schoolName ||
            item.school ||
            "-"
        ],

        [
            "State",
            item.state ||
            "-"
        ],

        [
            "District",
            item.district ||
            "-"
        ],

        [
            "Taluk",
            item.taluk ||
            "-"
        ],

        [
            "Status",
            item.status ||
            (
                item.active === false
                    ? "Inactive"
                    : "Active"
            )
        ]

    ];


    if (type === "students") {

        details.push(

            [
                "Class",
                item.className ||
                item.class ||
                "-"
            ],

            [
                "Section",
                item.section ||
                "-"
            ],

            [
                "Attendance",
                item.attendance != null
                    ? item.attendance + "%"
                    : "-"
            ],

            [
                "Performance",
                item.performance != null
                    ? item.performance + "%"
                    : "-"
            ],

            [
                "Fees",
                item.fees ||
                "-"
            ]

        );

    }


    if (type === "teachers") {

        details.push(

            [
                "Subject",
                item.subject ||
                "-"
            ],

            [
                "Phone",
                item.phone ||
                "-"
            ],

            [
                "Email",
                item.email ||
                "-"
            ]

        );

    }


    if (type === "parents") {

        details.push(

            [
                "Child",
                item.studentName ||
                item.childName ||
                item.studentId ||
                "-"
            ],

            [
                "Phone",
                item.phone ||
                "-"
            ],

            [
                "Email",
                item.email ||
                "-"
            ]

        );

    }


    showDetailsModal(
        "View Details",
        details
    );

}


/* ============================================================
   AI COPILOT
   ============================================================ */

function openAICopilot() {

    createAIModal();


    const modal =
        document.getElementById(
            "v4AIModal"
        );


    modal.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";


    renderAIInsights();

}


/* ============================================================
   AI LIVE ANALYSIS
   ============================================================ */

function generateAIInsights() {

    const students =
        users.students;


    const attendance =
        students
            .map(
                x =>
                    Number(
                        x.attendance
                    )
            )
            .filter(
                Number.isFinite
            );


    const performance =
        students
            .map(
                x =>
                    Number(
                        x.performance
                    )
            )
            .filter(
                Number.isFinite
            );


    const avgAttendance =
        attendance.length

            ?

            Math.round(
                attendance.reduce(
                    (a,b) =>
                        a + b,
                    0
                )
                /
                attendance.length
            )

            :

            null;


    const avgPerformance =
        performance.length

            ?

            Math.round(
                performance.reduce(
                    (a,b) =>
                        a + b,
                    0
                )
                /
                performance.length
            )

            :

            null;


    const lowAttendance =
        students.filter(
            x =>
                Number(x.attendance) < 75
        ).length;


    const lowPerformance =
        students.filter(
            x =>
                Number(x.performance) < 60
        ).length;


    const pendingFees =
        students.filter(
            x =>
                /pending|partial/i.test(
                    String(
                        x.fees ||
                        ""
                    )
                )
        ).length;


    const pendingSchools =
        schools.filter(
            x =>
                x.status ===
                "Pending"
        ).length;


    return [

        `🏫 ${schools.length} school(s) are currently in the central data layer.`,

        `🎓 ${students.length} student record(s) are available.`,

        avgAttendance !== null
            ?
            `📊 Average recorded attendance is ${avgAttendance}%.`
            :
            `📊 Attendance data is not available yet.`,

        `⚠️ ${lowAttendance} student(s) are below 75% attendance.`,

        avgPerformance !== null
            ?
            `📈 Average recorded performance is ${avgPerformance}%.`
            :
            `📈 Performance data is not available yet.`,

        `🎯 ${lowPerformance} student(s) are below 60% performance.`,

        `💰 ${pendingFees} student record(s) have Pending/Partial fees.`,

        `🟡 ${pendingSchools} school registration(s) are pending approval.`,

        `👥 Active users: ${
            users.students.filter(
                x => x.active !== false
            ).length

            +

            users.teachers.filter(
                x => x.active !== false
            ).length

            +

            users.parents.filter(
                x => x.active !== false
            ).length

            +

            users.schoolAdmins.filter(
                x => x.active !== false
            ).length
        }.`,

        `🔐 Communication policy: SCHOOL_MEDIATED.`

    ];

}


/* ============================================================
   AI QUESTION ANSWER
   ============================================================ */

function askV4AI() {

    const input =
        document.getElementById(
            "v4AIQuestion"
        );


    const chat =
        document.getElementById(
            "v4AIChat"
        );


    if (!input || !chat) return;


    const question =
        input.value
            .trim()
            .toLowerCase();


    if (!question) return;


    let answer;


    if (
        question.includes(
            "school"
        )
    ) {

        answer =
            `VRRITTAM currently has ${
                schools.length
            } school record(s). ${
                schools.filter(
                    x =>
                        x.status ===
                        "Pending"
                ).length
            } are pending approval.`;

    }


    else if (
        question.includes(
            "student"
        )
    ) {

        answer =
            `There are ${
                users.students.length
            } student record(s).`;

    }


    else if (
        question.includes(
            "teacher"
        )
    ) {

        answer =
            `There are ${
                users.teachers.length
            } teacher record(s).`;

    }


    else if (
        question.includes(
            "parent"
        )
    ) {

        answer =
            `There are ${
                users.parents.length
            } parent record(s).`;

    }


    else if (
        question.includes(
            "attendance"
        )
    ) {

        const values =
            users.students
                .map(
                    x =>
                        Number(
                            x.attendance
                        )
                )
                .filter(
                    Number.isFinite
                );


        if (!values.length) {

            answer =
                "Attendance data is not available yet.";

        }

        else {

            const average =
                Math.round(
                    values.reduce(
                        (a,b) =>
                            a + b,
                        0
                    )
                    /
                    values.length
                );


            answer =
                `Average recorded attendance is ${
                    average
                }%. ${
                    users.students.filter(
                        x =>
                            Number(
                                x.attendance
                            ) < 75
                    ).length
                } student(s) are below 75%.`;

        }

    }


    else if (
        question.includes(
            "performance"
        )
        ||
        question.includes(
            "marks"
        )
    ) {

        const values =
            users.students
                .map(
                    x =>
                        Number(
                            x.performance
                        )
                )
                .filter(
                    Number.isFinite
                );


        if (!values.length) {

            answer =
                "Performance data is not available yet.";

        }

        else {

            const average =
                Math.round(
                    values.reduce(
                        (a,b) =>
                            a + b,
                        0
                    )
                    /
                    values.length
                );


            answer =
                `Average recorded performance is ${
                    average
                }%.`;

        }

    }


    else if (
        question.includes(
            "fee"
        )
    ) {

        answer =
            `${
                users.students.filter(
                    x =>
                        /pending|partial/i.test(
                            String(
                                x.fees ||
                                ""
                            )
                        )
                ).length
            } student record(s) have Pending/Partial fees.`;

    }


    else {

        answer =
            "I can analyse Schools, Students, Teachers, Parents, "
            +
            "Attendance, Performance, Fees and Pending Approvals.";

    }


    chat.innerHTML += `

        <div class="v4-ai-user">
            ${escapeHTML(question)}
        </div>

        <div class="v4-ai-bot">
            ${escapeHTML(answer)}
        </div>

    `;


    input.value = "";

    chat.scrollTop =
        chat.scrollHeight;

}


/* ============================================================
   AI MODAL
   ============================================================ */

function createAIModal() {

    if (
        document.getElementById(
            "v4AIModal"
        )
    ) {

        return;

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "v4AIModal";


    modal.innerHTML = `

        <div
            class="v4-overlay"
            onclick="
                closeAICopilot()
            "
        ></div>


        <div
            class="v4-ai-card"
        >

            <div
                class="v4-header"
            >

                <div>

                    <span
                        class="v4-ai-badge"
                    >
                        🤖 AI COPILOT
                    </span>

                    <h2>
                        VRRITTAM Super Admin AI
                    </h2>

                    <p>
                        Live Central Dashboard Analysis
                    </p>

                </div>


                <button
                    class="v4-close"
                    onclick="
                        closeAICopilot()
                    "
                >
                    ✕ Close
                </button>

            </div>


            <div
                id="v4AIInsights"
                class="v4-ai-insights"
            ></div>


            <div
                id="v4AIChat"
                class="v4-ai-chat"
            >

                <div
                    class="v4-ai-bot"
                >

                    Hello! I am VRRITTAM
                    Super Admin Copilot.

                    Ask me about schools,
                    students, teachers,
                    parents, attendance,
                    performance or fees.

                </div>

            </div>


            <div
                class="v4-ai-input"
            >

                <input
                    id="v4AIQuestion"
                    placeholder="
                        Ask VRRITTAM AI...
                    "
                >


                <button
                    onclick="
                        askV4AI()
                    "
                >

                    Ask AI

                </button>

            </div>


            <div
                class="v4-ai-note"
            >

                Demo AI is analysing current
                VRRITTAM local dashboard data.
                Production AI backend can be
                connected later through a secure API.

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document.getElementById(
        "v4AIQuestion"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                askV4AI();

            }

        }
    );

}


function renderAIInsights() {

    const box =
        document.getElementById(
            "v4AIInsights"
        );


    if (!box) return;


    box.innerHTML =
        generateAIInsights()
            .map(
                text =>
                    `
                    <div
                        class="v4-ai-insight"
                    >
                        ${escapeHTML(text)}
                    </div>
                    `
            )
            .join("");

}


function closeAICopilot() {

    const modal =
        document.getElementById(
            "v4AIModal"
        );


    if (modal) {

        modal.remove();

    }


    document.body.style.overflow =
        "";

}


/* ============================================================
   ACTIVITIES
   ============================================================ */

function addActivity(text) {

    activities.unshift({

        id:
            createID("ACT"),

        text:
            text,

        createdAt:
            new Date().toISOString()

    });


    activities =
        activities.slice(
            0,
            100
        );


    writeStorage(
        VRRITTAM_V4_STORAGE.activities,
        activities
    );

}


function addNotification(message) {

    notifications.unshift({

        id:
            createID("NOT"),

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


    writeStorage(
        VRRITTAM_V4_STORAGE.notifications,
        notifications
    );

}


function renderActivities() {

    const list =
        document.getElementById(
            "activityList"
        );


    if (!list) return;


    if (!activities.length) {

        list.innerHTML =
            "<li>🚀 VRRITTAM Super Admin V4 initialized</li>";

        return;

    }


    list.innerHTML =
        activities
            .slice(0,10)
            .map(
                x =>
                    `
                    <li>
                        ${escapeHTML(
                            x.text
                        )}
                    </li>
                    `
            )
            .join("");

}


/* ============================================================
   DETAILS
   ============================================================ */

function showDetailsModal(
    title,
    fields
) {

    const existing =
        document.getElementById(
            "v4DetailsModal"
        );


    if (existing) {

        existing.remove();

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "v4DetailsModal";


    modal.innerHTML = `

        <div
            class="v4-overlay"
            onclick="
                this.parentElement.remove()
            "
        ></div>


        <div
            class="v4-details-card"
        >

            <div
                class="v4-header"
            >

                <div>

                    <span
                        class="v4-badge"
                    >
                        VIEW ONLY
                    </span>

                    <h2>
                        ${escapeHTML(title)}
                    </h2>

                </div>


                <button
                    class="v4-close"
                    onclick="
                        document
                        .getElementById(
                            'v4DetailsModal'
                        )
                        .remove()
                    "
                >

                    ✕

                </button>

            </div>


            <div
                class="v4-details-grid"
            >

                ${
                    fields
                        .map(
                            field =>
                                `
                                <div
                                    class="v4-detail"
                                >

                                    <small>
                                        ${escapeHTML(
                                            field[0]
                                        )}
                                    </small>

                                    <strong>
                                        ${escapeHTML(
                                            field[1]
                                        )}
                                    </strong>

                                </div>
                                `
                        )
                        .join("")
                }

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );

}


function viewSchool(index) {

    const school =
        schools[index];


    if (!school) return;


    showDetailsModal(
        "🏫 School Details",
        [

            [
                "School ID",
                school.id
            ],

            [
                "School Name",
                school.name
            ],

            [
                "Principal",
                school.principal
            ],

            [
                "School Type",
                school.schoolType
            ],

            [
                "Email",
                school.email
            ],

            [
                "Phone",
                school.phone
            ],

            [
                "State",
                school.state
            ],

            [
                "District",
                school.district
            ],

            [
                "Taluk",
                school.taluk
            ],

            [
                "Pincode",
                school.pincode
            ],

            [
                "Status",
                school.status
            ],

            [
                "Students",
                school.students
            ],

            [
                "Teachers",
                school.teachers
            ],

            [
                "Parents",
                school.parents
            ]

        ]
    );

}


/* ============================================================
   EVERYTHING
   ============================================================ */

function renderEverything() {

    loadSystemData();

    updateCounters();

    renderSchoolTable();

    renderPendingSchools();

    renderActivities();

}


/* ============================================================
   PENDING SCHOOL
   ============================================================ */

function renderPendingSchools() {

    const area =
        document.getElementById(
            "pendingSchoolArea"
        );


    if (!area) return;


    const pending =
        schools.filter(
            x =>
                x.status ===
                "Pending"
        );


    if (!pending.length) {

        area.innerHTML =
            "No Pending Schools";

        return;

    }


    area.innerHTML =
        pending
            .map(
                school => {

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
                                ${escapeHTML(
                                    school.principal ||
                                    "-"
                                )}
                            </small>

                            <br><br>

                            <button
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
   LIVE REFRESH
   ============================================================ */

function startLiveRefresh() {

    window.addEventListener(
        "storage",
        function(event) {

            if (
                Object.values(
                    VRRITTAM_V4_STORAGE
                )
                .includes(
                    event.key
                )
            ) {

                renderEverything();

            }

        }
    );


    document.addEventListener(
        "visibilitychange",
        function() {

            if (
                !document.hidden
            ) {

                renderEverything();

            }

        }
    );


    setInterval(
        function() {

            renderEverything();

        },
        2000
    );

}


/* ============================================================
   SIDEBAR
   ============================================================ */

function setupSidebar() {

    document
        .querySelectorAll(
            ".menu-item"
        )
        .forEach(
            function(item) {

                item.addEventListener(
                    "click",
                    function() {

                        document
                            .querySelectorAll(
                                ".menu-item"
                            )
                            .forEach(
                                x =>
                                    x.classList
                                        .remove(
                                            "active"
                                        )
                            );


                        this.classList.add(
                            "active"
                        );


                        const module =
                            this.dataset.module;


                        switch(module) {

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

                            case "schoolAdmins":
                                openSchoolAdminManagement();
                                break;

                            case "ai":
                                openAICopilot();
                                break;

                            case "settings":
                                openSettings();
                                break;

                            case "logout":
                                logoutSuperAdmin();
                                break;

                            default:
                                break;

                        }

                    }
                );

            }
        );

}


/* ============================================================
   QUICK ACTIONS
   ============================================================ */

function setupQuickActions() {

    const actions = {

        btnNewSchool:
            openSchoolPopup,

        registerSchoolBtn:
            openSchoolPopup,

        btnAICopilot:
            openAICopilot,

        btnSchoolAdmin:
            openSchoolAdminManagement,

        btnNewTeacher:
            openTeacherManagement,

        btnNewStudent:
            openStudentManagement,

        btnNewParent:
            openParentManagement

    };


    Object.keys(actions)
        .forEach(
            function(id) {

                const element =
                    document.getElementById(
                        id
                    );


                if (element) {

                    element.onclick =
                        actions[id];

                }

            }
        );

}


/* ============================================================
   SCHOOL FORM
   ============================================================ */

function setupSchoolRegistration() {

    const save =
        document.getElementById(
            "saveSchool"
        );


    const cancel =
        document.getElementById(
            "cancelSchool"
        );


    if (save) {

        save.onclick =
            registerSchool;

    }


    if (cancel) {

        cancel.onclick =
            closeSchoolPopup;

    }

}


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
   SEARCH
   ============================================================ */

function setupSchoolSearch() {

    const search =
        document.getElementById(
            "searchSchool"
        );


    if (!search) return;


    search.addEventListener(
        "input",
        function() {

            renderSchoolTable(
                this.value
            );

        }
    );

}


/* ============================================================
   SETTINGS
   ============================================================ */

function openSettings() {

    showDetailsModal(
        "⚙️ VRRITTAM Communication Policy",
        [

            [
                "Communication Mode",
                "SCHOOL_MEDIATED"
            ],

            [
                "Direct Student Contact",
                "Disabled"
            ],

            [
                "Direct Parent Contact",
                "Disabled"
            ],

            [
                "Direct Teacher Contact",
                "Disabled"
            ],

            [
                "School Admin Contact",
                "Enabled"
            ]

        ]
    );

}


/* ============================================================
   LOGOUT
   ============================================================ */

function logoutSuperAdmin() {

    if (
        !confirm(
            "Are you sure you want to logout?"
        )
    ) {

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
   UTILITIES
   ============================================================ */

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    return element
        ? element.value.trim()
        : "";

}


function setText(
    id,
    value
) {

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
            .substring(2,8)

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


function showToast(message) {

    let toast =
        document.getElementById(
            "v4Toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "v4Toast";

        document.body.appendChild(
            toast
        );

    }


    toast.innerText =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2000
    );

}


/* ============================================================
   V4 CSS
   ============================================================ */

function injectV4Styles() {

    if (
        document.getElementById(
            "vrrittamV4Styles"
        )
    ) return;


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "vrrittamV4Styles";


    style.innerHTML = `

        #v4ManagementModal,
        #v4DetailsModal,
        #v4AIModal {

            position:fixed;
            inset:0;
            z-index:9999;

            display:flex;
            align-items:center;
            justify-content:center;

        }


        .v4-overlay {

            position:absolute;
            inset:0;

            background:
                rgba(15,23,42,.62);

            backdrop-filter:
                blur(2px);

        }


        .v4-management-card,
        .v4-details-card,
        .v4-ai-card {

            position:relative;
            z-index:2;

            width:
                calc(100% - 30px);

            max-width:1250px;

            max-height:92vh;

            overflow:hidden;

            background:white;

            border-radius:16px;

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.28);

            display:flex;
            flex-direction:column;

        }


        .v4-details-card {
            max-width:850px;
        }


        .v4-ai-card {
            max-width:1050px;
        }


        .v4-header {

            display:flex;
            justify-content:space-between;
            align-items:center;

            gap:20px;

            padding:20px 24px;

            border-bottom:
                1px solid #e5e7eb;

        }


        .v4-header h2 {

            margin:6px 0 0;

            color:#172554;

        }


        .v4-header p {

            margin:5px 0 0;

            color:#64748b;

            font-size:13px;

        }


        .v4-badge {

            background:#e7f1ff;

            color:#1769c2;

            padding:5px 9px;

            border-radius:20px;

            font-size:10px;

            font-weight:bold;

        }


        .v4-ai-badge {

            background:#ede9fe;

            color:#6d28d9;

            padding:5px 9px;

            border-radius:20px;

            font-size:10px;

            font-weight:bold;

        }


        .v4-close {

            border:none;

            background:#dc2626;

            color:white;

            padding:10px 15px;

            border-radius:8px;

            cursor:pointer;

            font-weight:bold;

        }


        .v4-filters {

            display:grid;

            grid-template-columns:
                1.5fr 1fr 1fr 1fr 1.2fr;

            gap:10px;

            padding:16px 20px;

            background:#f8fafc;

        }


        .v4-filters input,
        .v4-filters select {

            width:100%;

            padding:10px;

            border:
                1px solid #d1d5db;

            border-radius:8px;

        }


        .v4-notice {

            margin:0 20px 14px;

            padding:11px 14px;

            background:#eff6ff;

            border:
                1px solid #bfdbfe;

            color:#1e3a8a;

            border-radius:8px;

            font-size:13px;

        }


        .v4-table-wrapper {

            overflow:auto;

            margin:
                0 20px 20px;

            border:
                1px solid #e5e7eb;

            border-radius:8px;

        }


        .v4-table {

            width:100%;

            min-width:1000px;

            border-collapse:collapse;

        }


        .v4-table thead {

            background:#eff6ff;

        }


        .v4-table th {

            padding:12px;

            text-align:left;

            color:#1e3a8a;

        }


        .v4-table td {

            padding:12px;

            border-top:
                1px solid #e5e7eb;

        }


        .v4-status {

            padding:4px 9px;

            border-radius:20px;

            font-size:11px;

            font-weight:bold;

        }


        .v4-status.active {

            background:#dcfce7;

            color:#166534;

        }


        .v4-status.inactive {

            background:#fee2e2;

            color:#991b1b;

        }


        .v4-view {

            border:none;

            background:#1e3a8a;

            color:white;

            padding:7px 12px;

            border-radius:6px;

            cursor:pointer;

        }


        .v4-details-grid {

            padding:20px;

            display:grid;

            grid-template-columns:
                repeat(2,1fr);

            gap:12px;

            overflow:auto;

        }


        .v4-detail {

            padding:13px;

            background:#f8fafc;

            border:
                1px solid #e5e7eb;

            border-radius:8px;

        }


        .v4-detail small {

            display:block;

            color:#64748b;

            margin-bottom:5px;

        }


        .v4-detail strong {

            color:#172554;

        }


        .v4-ai-insights {

            padding:16px 20px;

            display:grid;

            grid-template-columns:
                repeat(2,1fr);

            gap:10px;

            max-height:250px;

            overflow:auto;

        }


        .v4-ai-insight {

            padding:12px;

            background:#f5f3ff;

            border:
                1px solid #ddd6fe;

            color:#4c1d95;

            border-radius:8px;

            font-size:13px;

        }


        .v4-ai-chat {

            padding:15px 20px;

            min-height:150px;

            max-height:250px;

            overflow:auto;

            background:#f8fafc;

            border-top:
                1px solid #e5e7eb;

            border-bottom:
                1px solid #e5e7eb;

        }


        .v4-ai-user,
        .v4-ai-bot {

            padding:10px 13px;

            margin:7px 0;

            border-radius:9px;

            font-size:13px;

            line-height:1.5;

        }


        .v4-ai-user {

            margin-left:auto;

            max-width:80%;

            background:#dbeafe;

            color:#1e3a8a;

        }


        .v4-ai-bot {

            max-width:85%;

            background:white;

            border:
                1px solid #e5e7eb;

        }


        .v4-ai-input {

            display:flex;

            gap:10px;

            padding:15px 20px;

        }


        .v4-ai-input input {

            flex:1;

            padding:11px;

            border:
                1px solid #cbd5e1;

            border-radius:8px;

        }


        .v4-ai-input button {

            border:none;

            background:#6d28d9;

            color:white;

            padding:11px 18px;

            border-radius:8px;

            font-weight:bold;

        }


        .v4-ai-note {

            padding:
                0 20px 16px;

            color:#94a3b8;

            font-size:11px;

        }


        #v4Toast {

            position:fixed;

            right:20px;

            bottom:20px;

            z-index:10000;

            background:#172554;

            color:white;

            padding:12px 16px;

            border-radius:8px;

            font-weight:bold;

            opacity:0;

        }


        #v4Toast.show {

            opacity:1;

        }


        @media(max-width:900px) {

            .v4-filters {

                grid-template-columns:
                    repeat(2,1fr);

            }

        }


        @media(max-width:600px) {

            .v4-filters {

                grid-template-columns:1fr;

            }

            .v4-details-grid {

                grid-template-columns:1fr;

            }

            .v4-ai-insights {

                grid-template-columns:1fr;

            }

            .v4-ai-input {

                flex-direction:column;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* ============================================================
   PUBLIC API
   ============================================================ */

window.VRRITTAM_V4 = {

    getSchools:
        () => schools,

    getUsers:
        () => users,

    getActivities:
        () => activities,

    getNotifications:
        () => notifications,

    refresh:
        renderEverything,

    save:
        saveSystemData,

    approveSchool:
        approveSchool,

    viewSchool:
        viewSchool,

    openUsers:
        openUserManagement,

    openStudents:
        openStudentManagement,

    openTeachers:
        openTeacherManagement,

    openParents:
        openParentManagement,

    openSchoolAdmins:
        openSchoolAdminManagement,

    openAI:
        openAICopilot,

    aiInsights:
        generateAIInsights

};


/* ============================================================
   END V4
   ============================================================ */