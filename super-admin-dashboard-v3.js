
/* ============================================================
   VRRITTAM SUPER ADMIN V3 — VIEW ONLY MANAGEMENT ADD-ON
   Adds:
   1. Full school details view
   2. Pending/Approved/All school filtering
   3. School Admin View Only
   4. User / Student / Teacher / Parent View Only
   5. State / District / Taluk / School filtering
   ============================================================ */

(function () {
    "use strict";

    const roleLabels = {
        schoolAdmin: "School Admin",
        student: "Student",
        teacher: "Teacher",
        parent: "Parent",
        user: "User"
    };

    function ensureManagementModal() {
        if (document.getElementById("viewOnlyModal")) return;

        const modal = document.createElement("div");
        modal.id = "viewOnlyModal";
        modal.className = "vrrittam-view-modal";
        modal.innerHTML = `
            <div class="vrrittam-view-overlay" data-close-view-modal></div>
            <div class="vrrittam-view-card" role="dialog" aria-modal="true">
                <div class="vrrittam-view-header">
                    <div>
                        <div class="vrrittam-view-badge" id="viewOnlyBadge">VIEW ONLY</div>
                        <h2 id="viewOnlyTitle">Management</h2>
                        <p id="viewOnlySubtitle">Super Admin centralized view</p>
                    </div>
                    <button type="button" class="vrrittam-close" data-close-view-modal>✕</button>
                </div>

                <div class="vrrittam-filter-grid">
                    <select id="viewStateFilter">
                        <option value="">All States</option>
                    </select>
                    <select id="viewDistrictFilter" disabled>
                        <option value="">All Districts</option>
                    </select>
                    <select id="viewTalukFilter" disabled>
                        <option value="">All Taluks</option>
                    </select>
                    <select id="viewSchoolFilter">
                        <option value="">All Schools</option>
                    </select>
                    <input id="viewKeywordFilter" type="search"
                           placeholder="🔍 Search name, ID, school...">
                </div>

                <div id="viewOnlySummary" class="vrrittam-view-summary"></div>

                <div class="vrrittam-view-table-wrap">
                    <table class="vrrittam-view-table">
                        <thead id="viewOnlyHead"></thead>
                        <tbody id="viewOnlyBody"></tbody>
                    </table>
                </div>

                <div class="vrrittam-view-footer">
                    <span>🔒 Super Admin — View Only</span>
                    <button type="button" class="vrrittam-secondary" data-close-view-modal>Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelectorAll("[data-close-view-modal]").forEach(btn => {
            btn.addEventListener("click", closeViewOnlyModal);
        });

        ["viewStateFilter", "viewDistrictFilter", "viewTalukFilter",
         "viewSchoolFilter", "viewKeywordFilter"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener("input", renderCurrentView);
            if (el && el.tagName === "SELECT") el.addEventListener("change", renderCurrentView);
        });
    }

    function ensureDetailsModal() {
        if (document.getElementById("schoolDetailsModal")) return;

        const modal = document.createElement("div");
        modal.id = "schoolDetailsModal";
        modal.className = "vrrittam-view-modal";
        modal.innerHTML = `
            <div class="vrrittam-view-overlay" data-close-school-details></div>
            <div class="vrrittam-view-card school-details-card" role="dialog" aria-modal="true">
                <div class="vrrittam-view-header">
                    <div>
                        <div class="vrrittam-view-badge">SCHOOL DETAILS</div>
                        <h2 id="schoolDetailsTitle">School</h2>
                        <p id="schoolDetailsStatus"></p>
                    </div>
                    <button type="button" class="vrrittam-close" data-close-school-details>✕</button>
                </div>
                <div id="schoolDetailsBody" class="school-details-grid"></div>
                <div class="vrrittam-view-footer">
                    <span>🔒 Super Admin — Full View</span>
                    <button type="button" class="vrrittam-secondary" data-close-school-details>Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelectorAll("[data-close-school-details]").forEach(btn => {
            btn.addEventListener("click", closeSchoolDetails);
        });
    }

    function addViewOnlyStyles() {
        if (document.getElementById("vrrittamViewOnlyStyles")) return;
        const style = document.createElement("style");
        style.id = "vrrittamViewOnlyStyles";
        style.textContent = `
            .vrrittam-view-modal{
                display:none; position:fixed; inset:0; z-index:5000;
                align-items:center; justify-content:center; padding:20px;
            }
            .vrrittam-view-overlay{
                position:absolute; inset:0; background:rgba(15,23,42,.62);
            }
            .vrrittam-view-card{
                position:relative; width:min(1100px,100%); max-height:92vh;
                overflow:auto; background:#fff; border-radius:16px;
                box-shadow:0 20px 60px rgba(0,0,0,.25); padding:24px;
            }
            .school-details-card{ width:min(900px,100%); }
            .vrrittam-view-header{
                display:flex; justify-content:space-between; gap:20px;
                align-items:flex-start; border-bottom:1px solid #e5e7eb;
                padding-bottom:16px; margin-bottom:18px;
            }
            .vrrittam-view-header h2{ margin:8px 0 4px; color:#1e3a8a; }
            .vrrittam-view-header p{ margin:0; color:#64748b; }
            .vrrittam-view-badge{
                display:inline-block; padding:5px 9px; border-radius:999px;
                background:#eff6ff; color:#1e3a8a; font-size:11px;
                font-weight:700; letter-spacing:.4px;
            }
            .vrrittam-close{
                border:0; background:#f1f5f9; width:38px; height:38px;
                border-radius:8px; cursor:pointer; font-size:18px;
            }
            .vrrittam-filter-grid{
                display:grid; grid-template-columns:repeat(5,minmax(130px,1fr));
                gap:10px; margin-bottom:16px;
            }
            .vrrittam-filter-grid input,.vrrittam-filter-grid select{
                width:100%; padding:10px 12px; border:1px solid #d1d5db;
                border-radius:8px; background:#fff; outline:none;
            }
            .vrrittam-view-summary{
                padding:10px 12px; background:#f8fafc; border-radius:8px;
                margin-bottom:12px; color:#475569; font-size:13px;
            }
            .vrrittam-view-table-wrap{ overflow:auto; border:1px solid #e5e7eb; border-radius:8px; }
            .vrrittam-view-table{ width:100%; min-width:760px; border-collapse:collapse; }
            .vrrittam-view-table th{
                background:#eff6ff; color:#1e3a8a; padding:11px; text-align:left;
                font-size:13px; white-space:nowrap;
            }
            .vrrittam-view-table td{
                padding:11px; border-top:1px solid #e5e7eb; font-size:13px;
            }
            .vrrittam-view-footer{
                display:flex; justify-content:space-between; align-items:center;
                gap:12px; margin-top:16px; color:#64748b; font-size:13px;
            }
            .vrrittam-secondary,.vrrittam-view-action{
                border:0; background:#1e3a8a; color:#fff; padding:9px 13px;
                border-radius:7px; cursor:pointer; font-weight:700;
            }
            .vrrittam-secondary{ background:#64748b; }
            .vrrittam-status{
                display:inline-block; padding:4px 8px; border-radius:999px;
                font-size:11px; font-weight:700;
            }
            .vrrittam-status.pending{ background:#fff7ed; color:#c2410c; }
            .vrrittam-status.approved{ background:#ecfdf5; color:#047857; }
            .vrrittam-status.active{ background:#ecfdf5; color:#047857; }
            .vrrittam-status.inactive{ background:#f1f5f9; color:#64748b; }
            .school-details-grid{
                display:grid; grid-template-columns:repeat(2,minmax(0,1fr));
                gap:12px;
            }
            .school-detail-item{
                border:1px solid #e5e7eb; border-radius:9px; padding:12px;
                background:#f8fafc;
            }
            .school-detail-item.full{ grid-column:1/-1; }
            .school-detail-item small{
                display:block; color:#64748b; font-size:11px; margin-bottom:5px;
            }
            .school-detail-item strong{ color:#1f2937; word-break:break-word; }
            .school-table-actions{ display:flex; gap:7px; flex-wrap:wrap; }
            @media(max-width:850px){
                .vrrittam-filter-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
                .school-details-grid{grid-template-columns:1fr;}
                .school-detail-item.full{grid-column:auto;}
            }
            @media(max-width:500px){
                .vrrittam-filter-grid{grid-template-columns:1fr;}
                .vrrittam-view-card{padding:16px;}
            }
        `;
        document.head.appendChild(style);
    }

    function populateFilterStates() {
        const state = document.getElementById("viewStateFilter");
        if (!state) return;
        const states = Object.keys(DISTRICT_DATA || {});
        state.innerHTML = `<option value="">All States</option>` +
            states.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join("");
    }

    function populateFilterDistricts() {
        const state = document.getElementById("viewStateFilter")?.value || "";
        const district = document.getElementById("viewDistrictFilter");
        const taluk = document.getElementById("viewTalukFilter");
        if (!district || !taluk) return;

        const list = state ? (DISTRICT_DATA[state] || []) : [];
        district.disabled = !state;
        district.innerHTML = `<option value="">All Districts</option>` +
            list.map(d => `<option value="${escapeHTML(d)}">${escapeHTML(d)}</option>`).join("");

        taluk.disabled = true;
        taluk.innerHTML = `<option value="">All Taluks</option>`;
        populateFilterSchools();
    }

    function populateFilterTaluks() {
        const districtName = document.getElementById("viewDistrictFilter")?.value || "";
        const taluk = document.getElementById("viewTalukFilter");
        if (!taluk) return;
        const list = districtName ? (TALUK_DATA[districtName] || []) : [];
        taluk.disabled = !districtName;
        taluk.innerHTML = `<option value="">All Taluks</option>` +
            list.map(t => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join("");
        populateFilterSchools();
    }

    function populateFilterSchools() {
        const state = document.getElementById("viewStateFilter")?.value || "";
        const district = document.getElementById("viewDistrictFilter")?.value || "";
        const taluk = document.getElementById("viewTalukFilter")?.value || "";
        const school = document.getElementById("viewSchoolFilter");
        if (!school) return;

        const list = (schools || []).filter(s =>
            (!state || s.state === state) &&
            (!district || s.district === district) &&
            (!taluk || s.taluk === taluk)
        );

        school.innerHTML = `<option value="">All Schools</option>` +
            list.map(s => `<option value="${escapeHTML(s.id)}">${escapeHTML(s.name)}</option>`).join("");
    }

    function currentViewType() {
        return document.getElementById("viewOnlyModal")?.dataset.type || "users";
    }

    function openViewOnlyModal(type) {
        ensureManagementModal();
        const modal = document.getElementById("viewOnlyModal");
        modal.dataset.type = type;

        const titles = {
            schoolAdmins: ["School Admin Management", "Registered School Admins — centralized view"],
            users: ["User Management", "Centralized user directory — view only"],
            students: ["Student Management", "Centralized student directory — view only"],
            teachers: ["Teacher Management", "Centralized teacher directory — view only"],
            parents: ["Parent Management", "Centralized parent directory — view only"]
        };

        document.getElementById("viewOnlyTitle").textContent = titles[type][0];
        document.getElementById("viewOnlySubtitle").textContent = titles[type][1];

        document.getElementById("viewStateFilter").value = "";
        document.getElementById("viewDistrictFilter").innerHTML = `<option value="">All Districts</option>`;
        document.getElementById("viewDistrictFilter").disabled = true;
        document.getElementById("viewTalukFilter").innerHTML = `<option value="">All Taluks</option>`;
        document.getElementById("viewTalukFilter").disabled = true;
        document.getElementById("viewKeywordFilter").value = "";

        populateFilterStates();
        populateFilterSchools();

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        renderCurrentView();
    }

    function closeViewOnlyModal() {
        const modal = document.getElementById("viewOnlyModal");
        if (modal) modal.style.display = "none";
        document.body.style.overflow = "";
    }

    function openSchoolDetails(index) {
        const school = schools?.[index];
        if (!school) return;

        ensureDetailsModal();

        document.getElementById("schoolDetailsTitle").textContent =
            school.name || "School Details";

        const status = school.status || "Pending";
        document.getElementById("schoolDetailsStatus").innerHTML =
            `<span class="vrrittam-status ${status.toLowerCase()}">${escapeHTML(status)}</span>`;

        const fields = [
            ["School ID", school.id],
            ["School Name", school.name],
            ["Principal Name", school.principal],
            ["School Type", school.schoolType],
            ["Official Website", school.website],
            ["Official Email", school.email],
            ["Official Phone", school.phone],
            ["Landline", school.landline],
            ["Country", school.country],
            ["State", school.state],
            ["District", school.district],
            ["Taluk", school.taluk || "Not specified"],
            ["Pincode", school.pincode],
            ["Registration Date", school.createdAt ? new Date(school.createdAt).toLocaleString() : "-"],
            ["Students", school.students ?? 0],
            ["Teachers", school.teachers ?? 0],
            ["Parents", school.parents ?? 0],
            ["School Admins", school.schoolAdmins ?? 0],
            ["Status", status],
            ["School Address", school.address]
        ];

        document.getElementById("schoolDetailsBody").innerHTML = fields.map(([label, value]) => `
            <div class="school-detail-item ${label === "School Address" ? "full" : ""}">
                <small>${escapeHTML(label)}</small>
                <strong>${escapeHTML(value ?? "-")}</strong>
            </div>
        `).join("");

        const modal = document.getElementById("schoolDetailsModal");
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeSchoolDetails() {
        const modal = document.getElementById("schoolDetailsModal");
        if (modal) modal.style.display = "none";
        document.body.style.overflow = "";
    }

    function schoolMatches(s, state, district, taluk, schoolId, keyword) {
        const text = [
            s.name, s.id, s.principal, s.schoolType, s.state,
            s.district, s.taluk, s.pincode, s.status
        ].join(" ").toLowerCase();
        return (!state || s.state === state) &&
               (!district || s.district === district) &&
               (!taluk || s.taluk === taluk) &&
               (!schoolId || s.id === schoolId) &&
               (!keyword || text.includes(keyword.toLowerCase()));
    }

    function getRecords(type) {
        if (type === "schoolAdmins") return users?.schoolAdmins || [];
        if (type === "students") return users?.students || [];
        if (type === "teachers") return users?.teachers || [];
        if (type === "parents") return users?.parents || [];
        return [
            ...(users?.students || []),
            ...(users?.teachers || []),
            ...(users?.parents || []),
            ...(users?.schoolAdmins || [])
        ];
    }

    function recordSchool(record) {
        const schoolId = record.schoolId || record.schoolID;
        if (schoolId) return (schools || []).find(s => s.id === schoolId);
        const name = record.schoolName || record.school;
        if (name) return (schools || []).find(s => s.name === name);
        return null;
    }

    function renderCurrentView() {
        const type = currentViewType();
        const head = document.getElementById("viewOnlyHead");
        const body = document.getElementById("viewOnlyBody");
        const summary = document.getElementById("viewOnlySummary");
        if (!head || !body) return;

        const state = document.getElementById("viewStateFilter")?.value || "";
        const district = document.getElementById("viewDistrictFilter")?.value || "";
        const taluk = document.getElementById("viewTalukFilter")?.value || "";
        const schoolId = document.getElementById("viewSchoolFilter")?.value || "";
        const keyword = document.getElementById("viewKeywordFilter")?.value.trim() || "";

        const records = getRecords(type);

        const filtered = records.filter(record => {
            const school = recordSchool(record);
            const s = school || {
                state: record.state || "",
                district: record.district || "",
                taluk: record.taluk || "",
                id: record.schoolId || "",
                name: record.schoolName || record.school || ""
            };

            const recordText = [
                record.id, record.userId, record.name, record.fullName,
                record.username, record.email, record.phone, record.mobile,
                record.role, record.subject, record.className, record.section,
                record.studentName, record.schoolName, record.school
            ].join(" ").toLowerCase();

            return (!state || s.state === state) &&
                   (!district || s.district === district) &&
                   (!taluk || s.taluk === taluk) &&
                   (!schoolId || s.id === schoolId) &&
                   (!keyword || recordText.includes(keyword.toLowerCase()) ||
                    [
                        s.name, s.state, s.district, s.taluk
                    ].join(" ").toLowerCase().includes(keyword.toLowerCase()));
        });

        const columns = {
            schoolAdmins: ["Name", "School", "State", "District", "Taluk", "Status", "Action"],
            students: ["Name", "Student ID", "School", "Class", "Section", "Status", "Action"],
            teachers: ["Name", "Teacher ID", "School", "Subject", "State", "Status", "Action"],
            parents: ["Name", "Parent ID", "Student", "School", "District", "Status", "Action"],
            users: ["Name", "Role", "User ID", "School", "State", "Status", "Action"]
        };

        head.innerHTML = `<tr>${columns[type].map(c => `<th>${escapeHTML(c)}</th>`).join("")}</tr>`;

        summary.textContent =
            `${filtered.length} record(s) found • View Only • Super Admin cannot create, edit or delete from this screen.`;

        if (!filtered.length) {
            body.innerHTML = `
                <tr><td colspan="${columns[type].length}" style="text-align:center;padding:30px;color:#64748b;">
                    No records found for the selected filters.
                    ${records.length === 0 ? "<br><small>Records will appear here when School Admin data is created.</small>" : ""}
                </td></tr>`;
            return;
        }

        body.innerHTML = filtered.map(record => {
            const school = recordSchool(record);
            const status = record.status || (record.active === false ? "Inactive" : "Active");
            const statusClass = String(status).toLowerCase().includes("inactive") ? "inactive" : "active";
            const name = record.name || record.fullName || record.username || record.studentName || "-";
            const id = record.id || record.userId || "-";
            const schoolName = school?.name || record.schoolName || record.school || "-";
            const stateName = school?.state || record.state || "-";
            const districtName = school?.district || record.district || "-";
            const talukName = school?.taluk || record.taluk || "-";

            let cells = [];
            if (type === "schoolAdmins") {
                cells = [name, schoolName, stateName, districtName, talukName];
            } else if (type === "students") {
                cells = [name, id, schoolName, record.className || record.class || "-", record.section || "-", null];
            } else if (type === "teachers") {
                cells = [name, id, schoolName, record.subject || "-", stateName, null];
            } else if (type === "parents") {
                cells = [name, id, record.studentName || record.student || "-", schoolName, districtName, null];
            } else {
                cells = [name, roleLabels[record.role] || record.role || "-", id, schoolName, stateName, null];
            }

            const action = `<button type="button" class="vrrittam-view-action" onclick='window.VRRITTAM_SUPER_ADMIN_VIEW.viewRecord(${JSON.stringify(type)}, ${JSON.stringify(record.id || record.userId || "")})'>View</button>`;

            const html = cells.map((c, i) => {
                if (c === null) return `<td><span class="vrrittam-status ${statusClass}">${escapeHTML(status)}</span></td>`;
                return `<td>${escapeHTML(c)}</td>`;
            }).join("");

            return `<tr>${html}<td>${action}</td></tr>`;
        }).join("");
    }

    function viewRecord(type, id) {
        const records = getRecords(type);
        const record = records.find(r => String(r.id || r.userId || "") === String(id));
        if (!record) return;

        const school = recordSchool(record);
        const details = Object.entries(record)
            .filter(([k]) => !["password", "otp", "token"].includes(String(k).toLowerCase()))
            .map(([k,v]) => `
                <div class="school-detail-item">
                    <small>${escapeHTML(k)}</small>
                    <strong>${escapeHTML(typeof v === "object" ? JSON.stringify(v) : v)}</strong>
                </div>
            `).join("");

        ensureDetailsModal();
        document.getElementById("schoolDetailsTitle").textContent =
            record.name || record.fullName || record.username || "Record Details";
        document.getElementById("schoolDetailsStatus").textContent =
            school ? `School: ${school.name}` : "Centralized record — View Only";
        document.getElementById("schoolDetailsBody").innerHTML = details || `
            <div class="school-detail-item full"><strong>No additional details available.</strong></div>`;
        document.getElementById("schoolDetailsModal").style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    /* Override the existing Super Admin handlers. */
    window.openSchoolAdminManagement = function () {
        openViewOnlyModal("schoolAdmins");
    };

    window.openUserManagement = function () {
        openViewOnlyModal("users");
    };

    window.openStudentManagement = function () {
        openViewOnlyModal("students");
    };

    window.openTeacherManagement = function () {
        openViewOnlyModal("teachers");
    };

    window.openParentManagement = function () {
        openViewOnlyModal("parents");
    };

    /* Replace school table renderer with full-view actions. */
    window.renderSchoolTable = function (searchKeyword = "") {
        const table = document.getElementById("schoolTable");
        if (!table) return;

        const keyword = String(searchKeyword).toLowerCase().trim();
        const filtered = (schools || []).filter(s => schoolMatches(
            s,
            "",
            "",
            "",
            "",
            keyword
        ));

        if (!filtered.length) {
            table.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:25px;">No Schools Found</td></tr>`;
            return;
        }

        table.innerHTML = filtered.map(school => {
            const realIndex = schools.indexOf(school);
            const status = school.status || "Pending";
            const button = status === "Approved"
                ? `<button type="button" class="vrrittam-view-action" onclick="openSchoolDetails(${realIndex})">View Details</button>`
                : `<div class="school-table-actions">
                     <button type="button" onclick="approveSchool(${realIndex})">Approve</button>
                     <button type="button" class="vrrittam-view-action" onclick="openSchoolDetails(${realIndex})">View</button>
                   </div>`;

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
                                    school.status ||
                                    "Pending"
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


    if (
        school.status ===
        "Approved"
    ) {

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
                                Principal:
                                ${
                                    escapeHTML(
                                        school.principal ||
                                        "-"
                                    )
                                }
                            </small>

                            <br>

                            <small>
                                ${
                                    escapeHTML(
                                        school.district ||
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


    setText(
        "aiCount",
        calculateAICopilotUsers()
    );


    setText(
        "activeCount",
        calculateActiveUsers()
    );

}


/* ============================================================
   AI COPILOT USERS
   ============================================================ */

function calculateAICopilotUsers() {

    return (

        users.students.length +
        users.teachers.length +
        users.parents.length +
        users.schoolAdmins.length

    );

}


/* ============================================================
   ACTIVE USERS
   ============================================================ */

function calculateActiveUsers() {

    return (

        users.students.filter(
            user =>
                user.active !== false
        ).length

        +

        users.teachers.filter(
            user =>
                user.active !== false
        ).length

        +

        users.parents.filter(
            user =>
                user.active !== false
        ).length

        +

        users.schoolAdmins.filter(
            user =>
                user.active !== false
        ).length

    );

}


/* ============================================================
   USER MANAGEMENT
   ============================================================ */

function openUserManagement() {

    showSystemMessage(

        "User Management",

        "Super Admin view only. Student, Teacher and Parent creation remains under School Admin scope."

    );

}


/* ============================================================
   STUDENT MANAGEMENT
   ============================================================ */

function openStudentManagement() {

    const existing =
        document.getElementById("studentViewOnly");

    if (existing) {
        existing.remove();
    }

    const panel =
        document.createElement("div");

    panel.id = "studentViewOnly";

    panel.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(15,23,42,.60);
        z-index:3000;
        overflow-y:auto;
        padding:30px;
    `;

    panel.innerHTML = `

        <div style="
            max-width:1250px;
            margin:auto;
            background:white;
            border-radius:14px;
            padding:25px;
            box-shadow:0 15px 50px rgba(0,0,0,.25);
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                margin-bottom:20px;
            ">

                <div>
                    <h2 style="
                        margin:0;
                        color:#1e3a8a;
                    ">
                        🎓 Student Management
                    </h2>

                    <p style="
                        margin:6px 0 0;
                        color:#64748b;
                    ">
                        Centralized Student Information — View Only
                    </p>
                </div>

                <button
                    type="button"
                    onclick="closeStudentViewOnly()"
                    style="
                        border:none;
                        background:#dc2626;
                        color:white;
                        padding:10px 15px;
                        border-radius:8px;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    ✕ Close
                </button>

            </div>


            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(180px,1fr));
                gap:12px;
                margin-bottom:20px;
            ">

                <input
                    id="studentSearch"
                    type="text"
                    placeholder="🔍 Search Student Name / ID"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                <select
                    id="studentFilterState"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >
                    <option value="">All States</option>
                </select>

                <select
                    id="studentFilterDistrict"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >
                    <option value="">All Districts</option>
                </select>

                <select
                    id="studentFilterTaluk"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >
                    <option value="">All Taluks</option>
                </select>

                <input
                    id="studentFilterSchool"
                    type="text"
                    placeholder="🏫 Search School"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

            </div>


            <div style="
                background:#eff6ff;
                border:1px solid #bfdbfe;
                padding:12px;
                border-radius:8px;
                margin-bottom:18px;
                color:#1e3a8a;
                font-size:14px;
            ">
                🔒 View Only Mode — Student records cannot be
                created, edited or deleted by Super Admin.
            </div>


            <div style="
                overflow-x:auto;
                border:1px solid #e5e7eb;
                border-radius:8px;
            ">

                <table style="
                    width:100%;
                    min-width:1000px;
                    border-collapse:collapse;
                ">

                    <thead style="
                        background:#eff6ff;
                    ">

                        <tr>

                            <th style="padding:13px;text-align:left;">
                                Student
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Student ID
                            </th>

                            <th style="padding:13px;text-align:left;">
                                School
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Class
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Section
                            </th>

                            <th style="padding:13px;text-align:left;">
                                State
                            </th>

                            <th style="padding:13px;text-align:left;">
                                District
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Status
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody id="studentViewTable"></tbody>

                </table>

            </div>

        </div>
    `;

    document.body.appendChild(panel);

    populateStudentFilters();

    renderStudentViewTable();


    document
        .getElementById("studentSearch")
        .addEventListener(
            "input",
            renderStudentViewTable
        );


    document
        .getElementById("studentFilterSchool")
        .addEventListener(
            "input",
            renderStudentViewTable
        );


    document
        .getElementById("studentFilterState")
        .addEventListener(
            "change",
            function () {

                populateStudentDistrictFilter();

                renderStudentViewTable();

            }
        );


    document
        .getElementById("studentFilterDistrict")
        .addEventListener(
            "change",
            function () {

                populateStudentTalukFilter();

                renderStudentViewTable();

            }
        );


    document
        .getElementById("studentFilterTaluk")
        .addEventListener(
            "change",
            renderStudentViewTable
        );

}

function populateStudentFilters() {

    const state =
        document.getElementById(
            "studentFilterState"
        );

    if (!state) return;

    state.innerHTML =
        `<option value="">All States</option>`;

    Object.keys(DISTRICT_DATA)
        .forEach(function (stateName) {

            state.innerHTML += `
                <option value="${escapeHTML(stateName)}">
                    ${escapeHTML(stateName)}
                </option>
            `;

        });

}


function populateStudentDistrictFilter() {

    const state =
        getValue("studentFilterState");

    const district =
        document.getElementById(
            "studentFilterDistrict"
        );

    const taluk =
        document.getElementById(
            "studentFilterTaluk"
        );

    if (!district) return;

    district.innerHTML =
        `<option value="">All Districts</option>`;

    if (taluk) {

        taluk.innerHTML =
            `<option value="">All Taluks</option>`;

    }

    const districts =
        DISTRICT_DATA[state] || [];

    districts.forEach(function (districtName) {

        district.innerHTML += `
            <option value="${escapeHTML(districtName)}">
                ${escapeHTML(districtName)}
            </option>
        `;

    });

}


function populateStudentTalukFilter() {

    const district =
        getValue("studentFilterDistrict");

    const taluk =
        document.getElementById(
            "studentFilterTaluk"
        );

    if (!taluk) return;

    taluk.innerHTML =
        `<option value="">All Taluks</option>`;

    const taluks =
        TALUK_DATA[district] || [];

    taluks.forEach(function (talukName) {

        taluk.innerHTML += `
            <option value="${escapeHTML(talukName)}">
                ${escapeHTML(talukName)}
            </option>
        `;

    });

}


function renderStudentViewTable() {

    const table =
        document.getElementById(
            "studentViewTable"
        );

    if (!table) return;


    const keyword =
        getValue("studentSearch")
            .toLowerCase();

    const schoolKeyword =
        getValue("studentFilterSchool")
            .toLowerCase();

    const state =
        getValue("studentFilterState");

    const district =
        getValue("studentFilterDistrict");

    const taluk =
        getValue("studentFilterTaluk");


    const filtered =
        users.students.filter(
            function (student) {

                const name =
                    String(
                        student.name ||
                        student.studentName ||
                        ""
                    );

                const id =
                    String(
                        student.id ||
                        student.studentId ||
                        ""
                    );

                const school =
                    String(
                        student.schoolName ||
                        student.school ||
                        ""
                    );

                const studentState =
                    student.state || "";

                const studentDistrict =
                    student.district || "";

                const studentTaluk =
                    student.taluk || "";


                const searchMatch =
                    !keyword ||

                    name.toLowerCase()
                        .includes(keyword) ||

                    id.toLowerCase()
                        .includes(keyword);


                const schoolMatch =
                    !schoolKeyword ||

                    school.toLowerCase()
                        .includes(schoolKeyword);


                return (

                    searchMatch &&

                    schoolMatch &&

                    (!state ||
                        studentState === state) &&

                    (!district ||
                        studentDistrict === district) &&

                    (!taluk ||
                        studentTaluk === taluk)

                );

            }
        );


    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    style="
                        padding:30px;
                        text-align:center;
                        color:#64748b;
                    "
                >

                    No Student Records Found

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered.map(
            function (student) {

                const index =
                    users.students.indexOf(
                        student
                    );


                return `

                    <tr>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.name ||
                                student.studentName ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.id ||
                                student.studentId ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.schoolName ||
                                student.school ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.className ||
                                student.class ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.section ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.state ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.district ||
                                "-"
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                student.status ||
                                (student.active === false
                                    ? "Inactive"
                                    : "Active")
                            )}
                        </td>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">

                            <button
                                type="button"
                                onclick="
                                    viewStudentDetails(
                                        ${index}
                                    )
                                "
                                style="
                                    border:none;
                                    background:#1e3a8a;
                                    color:white;
                                    padding:8px 12px;
                                    border-radius:7px;
                                    cursor:pointer;
                                "
                            >
                                👁️ View
                            </button>

                        </td>

                    </tr>

                `;

            }
        ).join("");

}


function viewStudentDetails(index) {

    const student =
        users.students[index];

    if (!student) return;


    const details = [

        "STUDENT DETAILS",

        "",

        "Student Name: " +
            (student.name ||
             student.studentName ||
             "-"),

        "Student ID: " +
            (student.id ||
             student.studentId ||
             "-"),

        "School: " +
            (student.schoolName ||
             student.school ||
             "-"),

        "Class: " +
            (student.className ||
             student.class ||
             "-"),

        "Section: " +
            (student.section ||
             "-"),

        "State: " +
            (student.state ||
             "-"),

        "District: " +
            (student.district ||
             "-"),

        "Taluk: " +
            (student.taluk ||
             "-"),

        "Status: " +
            (
                student.status ||
                (
                    student.active === false
                        ? "Inactive"
                        : "Active"
                )
            )

    ];


    alert(
        details.join("\n")
    );

}


function closeStudentViewOnly() {

    const panel =
        document.getElementById(
            "studentViewOnly"
        );

    if (panel) {

        panel.remove();

    }

}

/* ============================================================
   TEACHER MANAGEMENT
   ============================================================ */

function openTeacherManagement() {

    const existing =
        document.getElementById("teacherViewOnly");

    if (existing) {
        existing.remove();
    }

    const panel =
        document.createElement("div");

    panel.id = "teacherViewOnly";

    panel.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(15,23,42,.60);
        z-index:3000;
        overflow-y:auto;
        padding:30px;
    `;

    panel.innerHTML = `

        <div style="
            max-width:1250px;
            margin:auto;
            background:white;
            border-radius:14px;
            padding:25px;
            box-shadow:0 15px 50px rgba(0,0,0,.25);
        ">

            <!-- HEADER -->

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                margin-bottom:20px;
            ">

                <div>

                    <h2 style="
                        margin:0;
                        color:#1e3a8a;
                    ">
                        👨‍🏫 Teacher Management
                    </h2>

                    <p style="
                        margin:6px 0 0;
                        color:#64748b;
                    ">
                        Centralized Teacher Information — View Only
                    </p>

                </div>

                <button
                    type="button"
                    onclick="closeTeacherViewOnly()"
                    style="
                        border:none;
                        background:#dc2626;
                        color:white;
                        padding:10px 15px;
                        border-radius:8px;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    ✕ Close
                </button>

            </div>


            <!-- SEARCH / FILTERS -->

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(180px,1fr));
                gap:12px;
                margin-bottom:20px;
            ">

                <input
                    id="teacherSearch"
                    type="text"
                    placeholder="🔍 Search Teacher Name / ID"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                <select
                    id="teacherFilterState"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All States
                    </option>

                </select>


                <select
                    id="teacherFilterDistrict"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All Districts
                    </option>

                </select>


                <select
                    id="teacherFilterTaluk"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All Taluks
                    </option>

                </select>


                <input
                    id="teacherFilterSchool"
                    type="text"
                    placeholder="🏫 Search School"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

            </div>


            <!-- VIEW ONLY NOTICE -->

            <div style="
                background:#eff6ff;
                border:1px solid #bfdbfe;
                padding:12px;
                border-radius:8px;
                margin-bottom:18px;
                color:#1e3a8a;
                font-size:14px;
            ">

                🔒 View Only Mode — Teacher records cannot be
                created, edited or deleted by Super Admin.

            </div>


            <!-- TABLE -->

            <div style="
                overflow-x:auto;
                border:1px solid #e5e7eb;
                border-radius:8px;
            ">

                <table style="
                    width:100%;
                    min-width:1000px;
                    border-collapse:collapse;
                ">

                    <thead style="
                        background:#eff6ff;
                    ">

                        <tr>

                            <th style="padding:13px;text-align:left;">
                                Teacher
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Teacher ID
                            </th>

                            <th style="padding:13px;text-align:left;">
                                School
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Subject
                            </th>

                            <th style="padding:13px;text-align:left;">
                                State
                            </th>

                            <th style="padding:13px;text-align:left;">
                                District
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Status
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody id="teacherViewTable"></tbody>

                </table>

            </div>

        </div>
    `;


    document.body.appendChild(panel);


    /* ========================================================
       LOAD FILTERS
    ======================================================== */

    populateTeacherFilters();

    renderTeacherViewTable();


    /* ========================================================
       SEARCH
    ======================================================== */

    document
        .getElementById("teacherSearch")
        .addEventListener(
            "input",
            renderTeacherViewTable
        );


    /* ========================================================
       SCHOOL SEARCH
    ======================================================== */

    document
        .getElementById("teacherFilterSchool")
        .addEventListener(
            "input",
            renderTeacherViewTable
        );


    /* ========================================================
       STATE
    ======================================================== */

    document
        .getElementById("teacherFilterState")
        .addEventListener(
            "change",
            function () {

                populateTeacherDistrictFilter();

                renderTeacherViewTable();

            }
        );


    /* ========================================================
       DISTRICT
    ======================================================== */

    document
        .getElementById("teacherFilterDistrict")
        .addEventListener(
            "change",
            function () {

                populateTeacherTalukFilter();

                renderTeacherViewTable();

            }
        );


    /* ========================================================
       TALUK
    ======================================================== */

    document
        .getElementById("teacherFilterTaluk")
        .addEventListener(
            "change",
            renderTeacherViewTable
        );

}


/* ============================================================
   TEACHER FILTER — STATE
   ============================================================ */

function populateTeacherFilters() {

    const state =
        document.getElementById(
            "teacherFilterState"
        );

    if (!state) return;


    state.innerHTML =
        `<option value="">All States</option>`;


    Object.keys(DISTRICT_DATA)
        .forEach(function (stateName) {

            state.innerHTML += `
                <option value="${escapeHTML(stateName)}">
                    ${escapeHTML(stateName)}
                </option>
            `;

        });

}


/* ============================================================
   TEACHER FILTER — DISTRICT
   ============================================================ */

function populateTeacherDistrictFilter() {

    const state =
        getValue("teacherFilterState");


    const district =
        document.getElementById(
            "teacherFilterDistrict"
        );


    const taluk =
        document.getElementById(
            "teacherFilterTaluk"
        );


    if (!district) return;


    district.innerHTML =
        `<option value="">All Districts</option>`;


    if (taluk) {

        taluk.innerHTML =
            `<option value="">All Taluks</option>`;

    }


    const districts =
        DISTRICT_DATA[state] || [];


    districts.forEach(function (districtName) {

        district.innerHTML += `
            <option value="${escapeHTML(districtName)}">
                ${escapeHTML(districtName)}
            </option>
        `;

    });

}


/* ============================================================
   TEACHER FILTER — TALUK
   ============================================================ */

function populateTeacherTalukFilter() {

    const district =
        getValue("teacherFilterDistrict");


    const taluk =
        document.getElementById(
            "teacherFilterTaluk"
        );


    if (!taluk) return;


    taluk.innerHTML =
        `<option value="">All Taluks</option>`;


    const taluks =
        TALUK_DATA[district] || [];


    taluks.forEach(function (talukName) {

        taluk.innerHTML += `
            <option value="${escapeHTML(talukName)}">
                ${escapeHTML(talukName)}
            </option>
        `;

    });

}


/* ============================================================
   RENDER TEACHER TABLE
   ============================================================ */

function renderTeacherViewTable() {

    const table =
        document.getElementById(
            "teacherViewTable"
        );


    if (!table) return;


    /* --------------------------------------------------------
       SEARCH VALUES
    -------------------------------------------------------- */

    const keyword =
        getValue("teacherSearch")
            .toLowerCase();


    const schoolKeyword =
        getValue("teacherFilterSchool")
            .toLowerCase();


    const state =
        getValue("teacherFilterState");


    const district =
        getValue("teacherFilterDistrict");


    const taluk =
        getValue("teacherFilterTaluk");


    /* --------------------------------------------------------
       TEACHER DATA
    -------------------------------------------------------- */

    const teacherList =
        (
            users &&
            Array.isArray(users.teachers)
        )
            ? users.teachers
            : [];


    /* --------------------------------------------------------
       FILTER
    -------------------------------------------------------- */

    const filtered =
        teacherList.filter(
            function (teacher) {


                const name =
                    String(
                        teacher.name ||
                        teacher.teacherName ||
                        ""
                    );


                const id =
                    String(
                        teacher.id ||
                        teacher.teacherId ||
                        ""
                    );


                const school =
                    String(
                        teacher.schoolName ||
                        teacher.school ||
                        ""
                    );


                const subject =
                    String(
                        teacher.subject ||
                        teacher.subjectName ||
                        ""
                    );


                const teacherState =
                    teacher.state || "";


                const teacherDistrict =
                    teacher.district || "";


                const teacherTaluk =
                    teacher.taluk || "";


                /* Search */

                const searchMatch =
                    !keyword ||

                    name
                        .toLowerCase()
                        .includes(keyword) ||

                    id
                        .toLowerCase()
                        .includes(keyword);


                /* School */

                const schoolMatch =
                    !schoolKeyword ||

                    school
                        .toLowerCase()
                        .includes(
                            schoolKeyword
                        );


                return (

                    searchMatch &&

                    schoolMatch &&

                    (!state ||
                        teacherState === state) &&

                    (!district ||
                        teacherDistrict === district) &&

                    (!taluk ||
                        teacherTaluk === taluk)

                );

            }
        );


    /* --------------------------------------------------------
       NO DATA
    -------------------------------------------------------- */

    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                        padding:30px;
                        text-align:center;
                        color:#64748b;
                    "
                >

                    No Teacher Records Found

                </td>

            </tr>

        `;

        return;

    }


    /* --------------------------------------------------------
       TABLE DATA
    -------------------------------------------------------- */

    table.innerHTML =
        filtered.map(
            function (teacher) {


                const index =
                    teacherList.indexOf(
                        teacher
                    );


                const status =
                    teacher.status ||
                    (
                        teacher.active === false
                            ? "Inactive"
                            : "Active"
                    );


                return `

                    <tr>

                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                teacher.name ||
                                teacher.teacherName ||
                                "-"
                            )}
                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                teacher.id ||
                                teacher.teacherId ||
                                "-"
                            )}
                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                teacher.schoolName ||
                                teacher.school ||
                                "-"
                            )}
                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                teacher.subject ||
                                teacher.subjectName ||
                                "-"
                            )}
                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                teacher.state ||
                                "-"
                            )}
                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">
                            ${escapeHTML(
                                teacher.district ||
                                "-"
                            )}
                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">

                            <span style="
                                display:inline-block;
                                padding:4px 9px;
                                border-radius:20px;
                                background:#dcfce7;
                                color:#166534;
                                font-size:12px;
                                font-weight:bold;
                            ">

                                ${escapeHTML(status)}

                            </span>

                        </td>


                        <td style="
                            padding:13px;
                            border-top:1px solid #e5e7eb;
                        ">

                            <button
                                type="button"
                                onclick="
                                    viewTeacherDetails(
                                        ${index}
                                    )
                                "
                                style="
                                    border:none;
                                    background:#1e3a8a;
                                    color:white;
                                    padding:8px 12px;
                                    border-radius:7px;
                                    cursor:pointer;
                                "
                            >

                                👁️ View

                            </button>

                        </td>

                    </tr>

                `;

            }
        ).join("");

}


/* ============================================================
   VIEW TEACHER DETAILS
   ============================================================ */

function viewTeacherDetails(index) {

    const teacherList =
        (
            users &&
            Array.isArray(users.teachers)
        )
            ? users.teachers
            : [];


    const teacher =
        teacherList[index];


    if (!teacher) return;


    const details = [

        "TEACHER DETAILS",

        "",

        "Teacher Name: " +
            (
                teacher.name ||
                teacher.teacherName ||
                "-"
            ),

        "Teacher ID: " +
            (
                teacher.id ||
                teacher.teacherId ||
                "-"
            ),

        "School: " +
            (
                teacher.schoolName ||
                teacher.school ||
                "-"
            ),

        "Subject: " +
            (
                teacher.subject ||
                teacher.subjectName ||
                "-"
            ),

        "State: " +
            (
                teacher.state ||
                "-"
            ),

        "District: " +
            (
                teacher.district ||
                "-"
            ),

        "Taluk: " +
            (
                teacher.taluk ||
                "-"
            ),

        "Phone: " +
            (
                teacher.phone ||
                teacher.mobile ||
                "-"
            ),

        "Status: " +
            (
                teacher.status ||
                (
                    teacher.active === false
                        ? "Inactive"
                        : "Active"
                )
            )

    ];


    alert(
        details.join("\n")
    );

}


/* ============================================================
   CLOSE TEACHER MANAGEMENT
   ============================================================ */

function closeTeacherViewOnly() {

    const panel =
        document.getElementById(
            "teacherViewOnly"
        );


    if (panel) {

        panel.remove();

    }

}

/* =========================================================
   PARENT MANAGEMENT - VIEW ONLY
   SUPER ADMIN
========================================================= */

function openParentManagement() {

    const oldPopup =
        document.getElementById("parentViewOnlyPopup");

    if (oldPopup) {
        oldPopup.remove();
    }

    const popup =
        document.createElement("div");

    popup.id = "parentViewOnlyPopup";

    popup.innerHTML = `

        <div class="parent-view-overlay"></div>

        <div class="parent-view-card">

            <!-- HEADER -->

            <div class="parent-view-header">

                <div>

                    <h2>
                        👨‍👩‍👧 Parent Management
                    </h2>

                    <p>
                        Centralized Parent Information — View Only
                    </p>

                </div>

                <button
                    type="button"
                    class="parent-close-btn"
                    onclick="closeParentViewOnly()">

                    ✕ Close

                </button>

            </div>


            <!-- SEARCH / FILTER -->

            <div class="parent-filter-bar">

                <input
                    type="text"
                    id="parentSearchInput"
                    placeholder="🔍 Search Parent Name / ID">


                <select id="parentStateFilter">

                    <option value="">
                        All States
                    </option>

                </select>


                <select id="parentDistrictFilter">

                    <option value="">
                        All Districts
                    </option>

                </select>


                <select id="parentTalukFilter">

                    <option value="">
                        All Taluks
                    </option>

                </select>


                <input
                    type="text"
                    id="parentSchoolSearch"
                    placeholder="🏫 Search School">

            </div>


            <!-- VIEW ONLY NOTICE -->

            <div class="parent-view-notice">

                🔒 View Only Mode —
                Parent records cannot be created,
                edited or deleted by Super Admin.

            </div>


            <!-- TABLE -->

            <div class="parent-table-wrapper">

                <table class="parent-view-table">

                    <thead>

                        <tr>

                            <th>
                                Parent
                            </th>

                            <th>
                                Parent ID
                            </th>

                            <th>
                                Student
                            </th>

                            <th>
                                School
                            </th>

                            <th>
                                State
                            </th>

                            <th>
                                District
                            </th>

                            <th>
                                Taluk
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody id="parentViewTableBody">
                    </tbody>

                </table>

            </div>

        </div>
    `;

    document.body.appendChild(popup);


    /* =====================================================
       CSS
    ===================================================== */

    if (!document.getElementById("parentViewOnlyStyles")) {

        const style =
            document.createElement("style");

        style.id =
            "parentViewOnlyStyles";

        style.innerHTML = `

            #parentViewOnlyPopup {

                position: fixed;

                inset: 0;

                z-index: 5000;

            }


            .parent-view-overlay {

                position: absolute;

                inset: 0;

                background:
                    rgba(15,23,42,.58);

                backdrop-filter:
                    blur(2px);

            }


            .parent-view-card {

                position: relative;

                width:
                    calc(100% - 40px);

                max-width: 1250px;

                max-height: 90vh;

                overflow: hidden;

                background: white;

                border-radius: 16px;

                box-shadow:
                    0 20px 60px
                    rgba(0,0,0,.25);

                margin:
                    5vh auto 0;

                display: flex;

                flex-direction: column;

            }


            .parent-view-header {

                display: flex;

                align-items: center;

                justify-content: space-between;

                gap: 20px;

                padding:
                    20px 24px;

                border-bottom:
                    1px solid #e5e7eb;

            }


            .parent-view-header h2 {

                margin: 0;

                color: #1e3a8a;

                font-size: 22px;

            }


            .parent-view-header p {

                margin:
                    5px 0 0;

                color: #64748b;

                font-size: 14px;

            }


            .parent-close-btn {

                border: none;

                background: #dc2626;

                color: white;

                padding:
                    10px 16px;

                border-radius: 8px;

                font-weight: bold;

                cursor: pointer;

                white-space: nowrap;

            }


            .parent-close-btn:hover {

                background: #b91c1c;

            }


            .parent-filter-bar {

                display: grid;

                grid-template-columns:
                    1.5fr
                    1fr
                    1fr
                    1fr
                    1.2fr;

                gap: 10px;

                padding:
                    16px 20px;

                background:
                    #f8fafc;

            }


            .parent-filter-bar input,
            .parent-filter-bar select {

                width: 100%;

                padding:
                    10px 12px;

                border:
                    1px solid #d1d5db;

                border-radius: 8px;

                background: white;

                outline: none;

                font-size: 13px;

            }


            .parent-filter-bar input:focus,
            .parent-filter-bar select:focus {

                border-color:
                    #2563eb;

            }


            .parent-view-notice {

                margin:
                    0 20px 14px;

                padding:
                    11px 14px;

                background:
                    #eff6ff;

                border:
                    1px solid #dbeafe;

                color:
                    #1e3a8a;

                border-radius: 8px;

                font-size: 13px;

            }


            .parent-table-wrapper {

                overflow: auto;

                margin:
                    0 20px 20px;

                border:
                    1px solid #e5e7eb;

                border-radius: 8px;

            }


            .parent-view-table {

                width: 100%;

                min-width: 1100px;

                border-collapse:
                    collapse;

            }


            .parent-view-table thead {

                background:
                    #eff6ff;

            }


            .parent-view-table th {

                padding: 12px;

                text-align: left;

                color:
                    #1e3a8a;

                font-size: 13px;

                white-space:
                    nowrap;

            }


            .parent-view-table td {

                padding: 12px;

                border-top:
                    1px solid #e5e7eb;

                font-size: 13px;

                color:
                    #475569;

            }


            .parent-view-table tbody tr:hover {

                background:
                    #f8fafc;

            }


            .parent-view-status {

                display:
                    inline-block;

                padding:
                    4px 9px;

                border-radius:
                    20px;

                background:
                    #dcfce7;

                color:
                    #166534;

                font-size: 12px;

                font-weight: bold;

            }


            .parent-view-btn {

                border: none;

                background:
                    #1e3a8a;

                color: white;

                padding:
                    7px 12px;

                border-radius: 6px;

                cursor: pointer;

                font-size: 12px;

                font-weight: bold;

            }


            .parent-view-btn:hover {

                background:
                    #1d4ed8;

            }


            @media(max-width:900px) {

                .parent-filter-bar {

                    grid-template-columns:
                        repeat(2, 1fr);

                }

            }


            @media(max-width:600px) {

                .parent-view-card {

                    width:
                        calc(100% - 20px);

                    max-height: 94vh;

                    margin-top: 3vh;

                }


                .parent-view-header {

                    padding: 16px;

                }


                .parent-view-header h2 {

                    font-size: 18px;

                }


                .parent-filter-bar {

                    grid-template-columns: 1fr;

                    padding: 12px;

                }


                .parent-view-notice {

                    margin:
                        0 12px 12px;

                }


                .parent-table-wrapper {

                    margin:
                        0 12px 12px;

                }

            }

        `;

        document.head.appendChild(style);

    }


    /* =====================================================
       PARENT DATA
    ===================================================== */

    let parents = [];

    if (
        typeof users !== "undefined" &&
        Array.isArray(users.parents)
    ) {

        parents = users.parents;

    }


    /* =====================================================
       LOAD FILTERS
    ===================================================== */

    populateParentFilters(parents);


    /* =====================================================
       INITIAL TABLE
    ===================================================== */

    renderParentViewOnly(parents);


    /* =====================================================
       SEARCH EVENTS
    ===================================================== */

    document
        .getElementById("parentSearchInput")
        .addEventListener(
            "input",
            filterParentRecords
        );


    document
        .getElementById("parentSchoolSearch")
        .addEventListener(
            "input",
            filterParentRecords
        );


    document
        .getElementById("parentStateFilter")
        .addEventListener(
            "change",
            function () {

                populateParentDistrictFilter(
                    parents
                );

                populateParentTalukFilter(
                    parents
                );

                filterParentRecords();

            }
        );


    document
        .getElementById("parentDistrictFilter")
        .addEventListener(
            "change",
            function () {

                populateParentTalukFilter(
                    parents
                );

                filterParentRecords();

            }
        );


    document
        .getElementById("parentTalukFilter")
        .addEventListener(
            "change",
            filterParentRecords
        );


    /* =====================================================
       FILTER FUNCTION
    ===================================================== */

    function filterParentRecords() {

        const search =
            document
                .getElementById(
                    "parentSearchInput"
                )
                .value
                .toLowerCase();


        const school =
            document
                .getElementById(
                    "parentSchoolSearch"
                )
                .value
                .toLowerCase();


        const state =
            document
                .getElementById(
                    "parentStateFilter"
                )
                .value;


        const district =
            document
                .getElementById(
                    "parentDistrictFilter"
                )
                .value;


        const taluk =
            document
                .getElementById(
                    "parentTalukFilter"
                )
                .value;


        const filtered =
            parents.filter(function(parent) {

                const name =
                    String(
                        parent.name ||
                        parent.parentName ||
                        ""
                    );


                const id =
                    String(
                        parent.id ||
                        parent.parentId ||
                        ""
                    );


                const schoolName =
                    String(
                        parent.schoolName ||
                        parent.school ||
                        ""
                    );


                const parentState =
                    parent.state || "";


                const parentDistrict =
                    parent.district || "";


                const parentTaluk =
                    parent.taluk || "";


                const searchMatch =

                    !search ||

                    name
                        .toLowerCase()
                        .includes(search)

                    ||

                    id
                        .toLowerCase()
                        .includes(search);


                const schoolMatch =

                    !school ||

                    schoolName
                        .toLowerCase()
                        .includes(school);


                return (

                    searchMatch &&

                    schoolMatch &&

                    (!state ||
                        parentState === state) &&

                    (!district ||
                        parentDistrict === district) &&

                    (!taluk ||
                        parentTaluk === taluk)

                );

            });


        renderParentViewOnly(filtered);

    }


    /* =====================================================
       TABLE RENDER
    ===================================================== */

    function renderParentViewOnly(data) {

        const tbody =
            document.getElementById(
                "parentViewTableBody"
            );


        if (!tbody) return;


        if (!data.length) {

            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="9"
                        style="
                            text-align:center;
                            padding:30px;
                            color:#64748b;
                        "
                    >

                        No Parent Records Found

                    </td>

                </tr>

            `;

            return;

        }


        tbody.innerHTML =

            data.map(function(parent) {

                const name =
                    parent.name ||
                    parent.parentName ||
                    "-";


                const id =
                    parent.id ||
                    parent.parentId ||
                    "-";


                const student =
                    parent.studentName ||
                    parent.student ||
                    "-";


                const school =
                    parent.schoolName ||
                    parent.school ||
                    "-";


                const state =
                    parent.state ||
                    "-";


                const district =
                    parent.district ||
                    "-";


                const taluk =
                    parent.taluk ||
                    "-";


                const status =
                    parent.status ||
                    (
                        parent.active === false
                            ? "Inactive"
                            : "Active"
                    );


                return `

                    <tr>

                        <td>
                            <b>
                                ${escapeHTML(
                                    name
                                )}
                            </b>
                        </td>

                        <td>
                            ${escapeHTML(
                                id
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                student
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                school
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                state
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                district
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                taluk
                            )}
                        </td>

                        <td>

                            <span
                                class="
                                    parent-view-status
                                "
                            >

                                ${escapeHTML(
                                    status
                                )}

                            </span>

                        </td>

                        <td>

                            <button
                                type="button"
                                class="
                                    parent-view-btn
                                "
                                onclick='
                                    viewParentDetails(
                                        ${JSON.stringify(
                                            parent
                                        )}
                                    )
                                '
                            >

                                👁 View

                            </button>

                        </td>

                    </tr>

                `;

            }).join("");

    }

}


/* =========================================================
   PARENT FILTERS
========================================================= */

function populateParentFilters(parents) {

    const state =
        document.getElementById(
            "parentStateFilter"
        );


    if (!state) return;


    const states = [];


    parents.forEach(function(parent) {

        const value =
            parent.state || "";

        if (
            value &&
            !states.includes(value)
        ) {

            states.push(value);

        }

    });


    state.innerHTML = `
        <option value="">
            All States
        </option>
    `;


    states.sort().forEach(function(value) {

        state.innerHTML += `

            <option value="${escapeHTML(value)}">

                ${escapeHTML(value)}

            </option>

        `;

    });

}


/* =========================================================
   PARENT DISTRICT FILTER
========================================================= */

function populateParentDistrictFilter(parents) {

    const state =
        document.getElementById(
            "parentStateFilter"
        ).value;


    const district =
        document.getElementById(
            "parentDistrictFilter"
        );


    if (!district) return;


    const districts = [];


    parents.forEach(function(parent) {

        if (
            (!state ||
                parent.state === state) &&

            parent.district &&

            !districts.includes(
                parent.district
            )
        ) {

            districts.push(
                parent.district
            );

        }

    });


    district.innerHTML = `
        <option value="">
            All Districts
        </option>
    `;


    districts.sort().forEach(function(value) {

        district.innerHTML += `

            <option value="${escapeHTML(value)}">

                ${escapeHTML(value)}

            </option>

        `;

    });

}


/* =========================================================
   PARENT TALUK FILTER
========================================================= */

function populateParentTalukFilter(parents) {

    const state =
        document.getElementById(
            "parentStateFilter"
        ).value;


    const district =
        document.getElementById(
            "parentDistrictFilter"
        ).value;


    const taluk =
        document.getElementById(
            "parentTalukFilter"
        );


    if (!taluk) return;


    const taluks = [];


    parents.forEach(function(parent) {

        if (

            (!state ||
                parent.state === state) &&

            (!district ||
                parent.district === district) &&

            parent.taluk &&

            !taluks.includes(
                parent.taluk
            )

        ) {

            taluks.push(
                parent.taluk
            );

        }

    });


    taluk.innerHTML = `
        <option value="">
            All Taluks
        </option>
    `;


    taluks.sort().forEach(function(value) {

        taluk.innerHTML += `

            <option value="${escapeHTML(value)}">

                ${escapeHTML(value)}

            </option>

        `;

    });

}


/* =========================================================
   CLOSE PARENT VIEW
========================================================= */

function closeParentViewOnly() {

    const popup =
        document.getElementById(
            "parentViewOnlyPopup"
        );


    if (popup) {

        popup.remove();

    }

}


/* =========================================================
   PARENT DETAILS
========================================================= */

function viewParentDetails(parent) {

    alert(

        "Parent Details\n\n" +

        "Parent Name: " +
        (
            parent.name ||
            parent.parentName ||
            "-"
        ) +

        "\n\nParent ID: " +
        (
            parent.id ||
            parent.parentId ||
            "-"
        ) +

        "\n\nStudent: " +
        (
            parent.studentName ||
            parent.student ||
            "-"
        ) +

        "\n\nSchool: " +
        (
            parent.schoolName ||
            parent.school ||
            "-"
        ) +

        "\n\nState: " +
        (
            parent.state ||
            "-"
        ) +

        "\n\nDistrict: " +
        (
            parent.district ||
            "-"
        ) +

        "\n\nTaluk: " +
        (
            parent.taluk ||
            "-"
        ) +

        "\n\nPhone: " +
        (
            parent.phone ||
            parent.mobile ||
            "-"
        ) +

        "\n\nEmail: " +
        (
            parent.email ||
            "-"
        ) +

        "\n\nStatus: " +
        (
            parent.status ||
            (
                parent.active === false
                    ? "Inactive"
                    : "Active"
            )
        )

    );

}

/* ============================================================
   USER MANAGEMENT - VIEW ONLY
   SUPER ADMIN
   ============================================================ */

function openUserManagement() {

    const existing =
        document.getElementById("userViewOnly");

    if (existing) {
        existing.remove();
    }


    const panel =
        document.createElement("div");

    panel.id = "userViewOnly";


    panel.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(15,23,42,.60);
        z-index:5000;
        overflow-y:auto;
        padding:30px;
    `;


    panel.innerHTML = `

        <div style="
            max-width:1250px;
            margin:auto;
            background:white;
            border-radius:14px;
            padding:25px;
            box-shadow:0 15px 50px rgba(0,0,0,.25);
        ">


            <!-- HEADER -->

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                margin-bottom:20px;
            ">

                <div>

                    <h2 style="
                        margin:0;
                        color:#1e3a8a;
                    ">
                        👥 User Management
                    </h2>

                    <p style="
                        margin:6px 0 0;
                        color:#64748b;
                    ">
                        Centralized User Information — View Only
                    </p>

                </div>


                <button
                    type="button"
                    onclick="closeUserViewOnly()"
                    style="
                        border:none;
                        background:#dc2626;
                        color:white;
                        padding:10px 15px;
                        border-radius:8px;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    ✕ Close
                </button>

            </div>


            <!-- SEARCH / FILTERS -->

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(180px,1fr));
                gap:12px;
                margin-bottom:20px;
            ">


                <input
                    id="userSearch"
                    type="text"
                    placeholder="🔍 Search User Name / ID"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >


                <select
                    id="userTypeFilter"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All User Types
                    </option>

                    <option value="Super Admin">
                        Super Admin
                    </option>

                    <option value="School Admin">
                        School Admin
                    </option>

                    <option value="Teacher">
                        Teacher
                    </option>

                    <option value="Parent">
                        Parent
                    </option>

                    <option value="Student">
                        Student
                    </option>

                </select>


                <select
                    id="userStateFilter"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All States
                    </option>

                </select>


                <select
                    id="userDistrictFilter"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All Districts
                    </option>

                </select>


                <select
                    id="userTalukFilter"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All Taluks
                    </option>

                </select>


                <input
                    id="userSchoolSearch"
                    type="text"
                    placeholder="🏫 Search School"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >


                <select
                    id="userStatusFilter"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            <!-- VIEW ONLY NOTICE -->

            <div style="
                background:#eff6ff;
                border:1px solid #bfdbfe;
                padding:12px;
                border-radius:8px;
                margin-bottom:18px;
                color:#1e3a8a;
                font-size:14px;
            ">

                🔒 View Only Mode —
                User records cannot be created,
                edited or deleted by Super Admin.

            </div>


            <!-- TABLE -->

            <div style="
                overflow-x:auto;
                border:1px solid #e5e7eb;
                border-radius:8px;
            ">

                <table style="
                    width:100%;
                    min-width:1100px;
                    border-collapse:collapse;
                ">


                    <thead style="
                        background:#eff6ff;
                    ">

                        <tr>

                            <th style="padding:13px;text-align:left;">
                                User
                            </th>

                            <th style="padding:13px;text-align:left;">
                                User ID
                            </th>

                            <th style="padding:13px;text-align:left;">
                                User Type
                            </th>

                            <th style="padding:13px;text-align:left;">
                                School
                            </th>

                            <th style="padding:13px;text-align:left;">
                                State
                            </th>

                            <th style="padding:13px;text-align:left;">
                                District
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Taluk
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Status
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody id="userViewTable"></tbody>


                </table>

            </div>

        </div>

    `;


    document.body.appendChild(panel);


    populateUserFilters();

    renderUserViewTable();


    /* SEARCH */

    document
        .getElementById("userSearch")
        .addEventListener(
            "input",
            renderUserViewTable
        );


    /* SCHOOL */

    document
        .getElementById("userSchoolSearch")
        .addEventListener(
            "input",
            renderUserViewTable
        );


    /* TYPE */

    document
        .getElementById("userTypeFilter")
        .addEventListener(
            "change",
            renderUserViewTable
        );


    /* STATE */

    document
        .getElementById("userStateFilter")
        .addEventListener(
            "change",
            function () {

                populateUserDistrictFilter();

                renderUserViewTable();

            }
        );


    /* DISTRICT */

    document
        .getElementById("userDistrictFilter")
        .addEventListener(
            "change",
            function () {

                populateUserTalukFilter();

                renderUserViewTable();

            }
        );


    /* TALUK */

    document
        .getElementById("userTalukFilter")
        .addEventListener(
            "change",
            renderUserViewTable
        );


    /* STATUS */

    document
        .getElementById("userStatusFilter")
        .addEventListener(
            "change",
            renderUserViewTable
        );

}


/* ============================================================
   USER FILTER DATA
   ============================================================ */

function populateUserFilters() {

    const state =
        document.getElementById(
            "userStateFilter"
        );


    if (!state) return;


    state.innerHTML =
        `<option value="">All States</option>`;


    if (
        typeof DISTRICT_DATA !== "undefined"
    ) {

        Object.keys(DISTRICT_DATA)
            .forEach(function(stateName) {

                state.innerHTML += `
                    <option value="${escapeHTML(stateName)}">
                        ${escapeHTML(stateName)}
                    </option>
                `;

            });

    }

}


/* ============================================================
   DISTRICT FILTER
   ============================================================ */

function populateUserDistrictFilter() {

    const state =
        getValue("userStateFilter");


    const district =
        document.getElementById(
            "userDistrictFilter"
        );


    const taluk =
        document.getElementById(
            "userTalukFilter"
        );


    if (!district) return;


    district.innerHTML =
        `<option value="">All Districts</option>`;


    if (taluk) {

        taluk.innerHTML =
            `<option value="">All Taluks</option>`;

    }


    const districts =
        typeof DISTRICT_DATA !== "undefined"
            ? DISTRICT_DATA[state] || []
            : [];


    districts.forEach(function(districtName) {

        district.innerHTML += `
            <option value="${escapeHTML(districtName)}">
                ${escapeHTML(districtName)}
            </option>
        `;

    });

}


/* ============================================================
   TALUK FILTER
   ============================================================ */

function populateUserTalukFilter() {

    const district =
        getValue("userDistrictFilter");


    const taluk =
        document.getElementById(
            "userTalukFilter"
        );


    if (!taluk) return;


    taluk.innerHTML =
        `<option value="">All Taluks</option>`;


    const taluks =
        typeof TALUK_DATA !== "undefined"
            ? TALUK_DATA[district] || []
            : [];


    taluks.forEach(function(talukName) {

        taluk.innerHTML += `
            <option value="${escapeHTML(talukName)}">
                ${escapeHTML(talukName)}
            </option>
        `;

    });

}


/* ============================================================
   RENDER USER TABLE
   ============================================================ */

function renderUserViewTable() {

    const table =
        document.getElementById(
            "userViewTable"
        );


    if (!table) return;


    const keyword =
        getValue("userSearch")
            .toLowerCase();


    const userType =
        getValue("userTypeFilter");


    const state =
        getValue("userStateFilter");


    const district =
        getValue("userDistrictFilter");


    const taluk =
        getValue("userTalukFilter");


    const schoolKeyword =
        getValue("userSchoolSearch")
            .toLowerCase();


    const statusFilter =
        getValue("userStatusFilter");


    /* ========================================================
       GET USER DATA
    ======================================================== */

    let allUsers = [];


    if (
        typeof users !== "undefined"
    ) {

        const collections = [
            {
                type: "Student",
                data: users.students || []
            },
            {
                type: "Teacher",
                data: users.teachers || []
            },
            {
                type: "Parent",
                data: users.parents || []
            },
            {
                type: "School Admin",
                data: users.schoolAdmins || []
            },
            {
                type: "Super Admin",
                data: users.superAdmins || []
            }
        ];


        collections.forEach(function(group) {

            group.data.forEach(function(user) {

                allUsers.push({

                    ...user,

                    userType:
                        user.userType ||
                        user.role ||
                        group.type

                });

            });

        });

    }


    /* ========================================================
       FILTER
    ======================================================== */

    const filtered =
        allUsers.filter(function(user) {


            const name =
                String(
                    user.name ||
                    user.userName ||
                    user.fullName ||
                    ""
                );


            const id =
                String(
                    user.id ||
                    user.userId ||
                    ""
                );


            const school =
                String(
                    user.schoolName ||
                    user.school ||
                    ""
                );


            const userState =
                user.state || "";


            const userDistrict =
                user.district || "";


            const userTaluk =
                user.taluk || "";


            const type =
                user.userType || "";


            const status =
                user.status ||
                (
                    user.active === false
                        ? "Inactive"
                        : "Active"
                );


            const searchMatch =
                !keyword ||

                name.toLowerCase()
                    .includes(keyword) ||

                id.toLowerCase()
                    .includes(keyword);


            const schoolMatch =
                !schoolKeyword ||

                school.toLowerCase()
                    .includes(schoolKeyword);


            return (

                searchMatch &&

                schoolMatch &&

                (!userType ||
                    type === userType) &&

                (!state ||
                    userState === state) &&

                (!district ||
                    userDistrict === district) &&

                (!taluk ||
                    userTaluk === taluk) &&

                (!statusFilter ||
                    status === statusFilter)

            );

        });


    /* ========================================================
       NO RECORDS
       ======================================================== */

    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    style="
                        padding:30px;
                        text-align:center;
                        color:#64748b;
                    "
                >

                    No User Records Found

                </td>

            </tr>

        `;

        return;

    }


    /* ========================================================
       TABLE ROWS
       ======================================================== */

    table.innerHTML =
        filtered.map(function(user) {


            const originalCollection =
                getUserOriginalIndex(user);


            return `

                <tr>

                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        <b>
                            ${escapeHTML(
                                user.name ||
                                user.userName ||
                                user.fullName ||
                                "-"
                            )}
                        </b>
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        ${escapeHTML(
                            user.id ||
                            user.userId ||
                            "-"
                        )}
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        ${escapeHTML(
                            user.userType ||
                            user.role ||
                            "-"
                        )}
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        ${escapeHTML(
                            user.schoolName ||
                            user.school ||
                            "-"
                        )}
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        ${escapeHTML(
                            user.state ||
                            "-"
                        )}
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        ${escapeHTML(
                            user.district ||
                            "-"
                        )}
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">
                        ${escapeHTML(
                            user.taluk ||
                            "-"
                        )}
                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">

                        <span style="
                            display:inline-block;
                            padding:5px 9px;
                            border-radius:20px;
                            background:
                                ${
                                    (
                                        user.status ===
                                        "Inactive" ||
                                        user.active === false
                                    )
                                    ? "#fee2e2"
                                    : "#dcfce7"
                                };
                            color:
                                ${
                                    (
                                        user.status ===
                                        "Inactive" ||
                                        user.active === false
                                    )
                                    ? "#991b1b"
                                    : "#166534"
                                };
                            font-size:12px;
                            font-weight:bold;
                        ">

                            ${
                                user.status ||
                                (
                                    user.active === false
                                        ? "Inactive"
                                        : "Active"
                                )
                            }

                        </span>

                    </td>


                    <td style="
                        padding:13px;
                        border-top:1px solid #e5e7eb;
                    ">

                        <button
                            type="button"
                            onclick='viewUserDetails(${JSON.stringify(user)})'
                            style="
                                border:none;
                                background:#1e3a8a;
                                color:white;
                                padding:8px 12px;
                                border-radius:7px;
                                cursor:pointer;
                                font-weight:bold;
                            "
                        >

                            👁 View

                        </button>

                    </td>

                </tr>

            `;

        }).join("");

}


/* ============================================================
   FIND ORIGINAL USER
   ============================================================ */

function getUserOriginalIndex(user) {

    return -1;

}


/* ============================================================
   USER DETAILS
   ============================================================ */

function viewUserDetails(user) {

    alert(

        "USER DETAILS\n\n" +

        "User Name: " +
        (
            user.name ||
            user.userName ||
            user.fullName ||
            "-"
        ) +

        "\n\nUser ID: " +
        (
            user.id ||
            user.userId ||
            "-"
        ) +

        "\n\nUser Type: " +
        (
            user.userType ||
            user.role ||
            "-"
        ) +

        "\n\nSchool: " +
        (
            user.schoolName ||
            user.school ||
            "-"
        ) +

        "\n\nState: " +
        (
            user.state ||
            "-"
        ) +

        "\n\nDistrict: " +
        (
            user.district ||
            "-"
        ) +

        "\n\nTaluk: " +
        (
            user.taluk ||
            "-"
        ) +

        "\n\nPhone: " +
        (
            user.phone ||
            user.mobile ||
            "-"
        ) +

        "\n\nEmail: " +
        (
            user.email ||
            "-"
        ) +

        "\n\nStatus: " +
        (
            user.status ||
            (
                user.active === false
                    ? "Inactive"
                    : "Active"
            )
        )

    );

}


/* ============================================================
   CLOSE USER MANAGEMENT
   ============================================================ */

function closeUserViewOnly() {

    const panel =
        document.getElementById(
            "userViewOnly"
        );


    if (panel) {

        panel.remove();

    }

}


/* ============================================================
   SCHOOL ADMIN MANAGEMENT
   ============================================================ */
function openSchoolAdminManagement() {

    const existing =
        document.getElementById("schoolAdminViewOnly");

    if (existing) {
        existing.remove();
    }

    const panel =
        document.createElement("div");

    panel.id =
        "schoolAdminViewOnly";

    panel.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(15,23,42,.60);
        z-index:3000;
        overflow-y:auto;
        padding:30px;
    `;

    panel.innerHTML = `

        <div style="
            max-width:1200px;
            margin:auto;
            background:white;
            border-radius:14px;
            padding:25px;
            box-shadow:0 15px 50px rgba(0,0,0,.25);
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                margin-bottom:20px;
            ">

                <div>
                    <h2 style="
                        margin:0;
                        color:#1e3a8a;
                    ">
                        👑 School Admin Management
                    </h2>

                    <p style="
                        margin:6px 0 0;
                        color:#64748b;
                    ">
                        View Only — Super Admin
                    </p>
                </div>

                <button
                    type="button"
                    onclick="closeSchoolAdminViewOnly()"
                    style="
                        border:none;
                        background:#dc2626;
                        color:white;
                        padding:10px 15px;
                        border-radius:8px;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    ✕ Close
                </button>

            </div>


            <!-- SEARCH / FILTER -->

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(200px,1fr));
                gap:12px;
                margin-bottom:20px;
            ">

                <input
                    id="adminSearchSchool"
                    type="text"
                    placeholder="🔍 Search School Name"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >

                <select
                    id="adminFilterState"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >
                    <option value="">
                        All States
                    </option>
                </select>

                <select
                    id="adminFilterDistrict"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >
                    <option value="">
                        All Districts
                    </option>
                </select>

                <select
                    id="adminFilterTaluk"
                    style="
                        padding:11px;
                        border:1px solid #d1d5db;
                        border-radius:8px;
                    "
                >
                    <option value="">
                        All Taluks
                    </option>
                </select>

            </div>


            <!-- VIEW ONLY NOTICE -->

            <div style="
                background:#eff6ff;
                border:1px solid #bfdbfe;
                padding:12px;
                border-radius:8px;
                margin-bottom:18px;
                color:#1e3a8a;
                font-size:14px;
            ">
                🔒 View Only Mode — No Create, Edit or Delete
                operations are available to Super Admin here.
            </div>


            <!-- TABLE -->

            <div style="
                overflow-x:auto;
                border:1px solid #e5e7eb;
                border-radius:8px;
            ">

                <table style="
                    width:100%;
                    min-width:850px;
                    border-collapse:collapse;
                ">

                    <thead style="
                        background:#eff6ff;
                    ">

                        <tr>

                            <th style="padding:13px;text-align:left;">
                                School
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Principal
                            </th>

                            <th style="padding:13px;text-align:left;">
                                State
                            </th>

                            <th style="padding:13px;text-align:left;">
                                District
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Taluk
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Status
                            </th>

                            <th style="padding:13px;text-align:left;">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody id="schoolAdminViewTable"></tbody>

                </table>

            </div>

        </div>
    `;


    document.body.appendChild(panel);

    populateSchoolAdminFilters();

    renderSchoolAdminViewTable();

    document
        .getElementById("adminSearchSchool")
        .addEventListener(
            "input",
            renderSchoolAdminViewTable
        );

    document
        .getElementById("adminFilterState")
        .addEventListener(
            "change",
            function () {

                populateAdminDistrictFilter();

                renderSchoolAdminViewTable();

            }
        );

    document
        .getElementById("adminFilterDistrict")
        .addEventListener(
            "change",
            function () {

                populateAdminTalukFilter();

                renderSchoolAdminViewTable();

            }
        );

    document
        .getElementById("adminFilterTaluk")
        .addEventListener(
            "change",
            renderSchoolAdminViewTable
        );

}

function populateSchoolAdminFilters() {

    const state =
        document.getElementById("adminFilterState");

    if (!state) return;

    const states =
        Object.keys(DISTRICT_DATA);

    state.innerHTML =
        `<option value="">All States</option>`;

    states.forEach(function (stateName) {

        state.innerHTML += `
            <option value="${escapeHTML(stateName)}">
                ${escapeHTML(stateName)}
            </option>
        `;

    });

}


function populateAdminDistrictFilter() {

    const state =
        getValue("adminFilterState");

    const district =
        document.getElementById(
            "adminFilterDistrict"
        );

    const taluk =
        document.getElementById(
            "adminFilterTaluk"
        );

    if (!district) return;

    district.innerHTML =
        `<option value="">All Districts</option>`;

    taluk.innerHTML =
        `<option value="">All Taluks</option>`;

    const districts =
        DISTRICT_DATA[state] || [];

    districts.forEach(function (districtName) {

        district.innerHTML += `
            <option value="${escapeHTML(districtName)}">
                ${escapeHTML(districtName)}
            </option>
        `;

    });

}


function populateAdminTalukFilter() {

    const district =
        getValue("adminFilterDistrict");

    const taluk =
        document.getElementById(
            "adminFilterTaluk"
        );

    if (!taluk) return;

    taluk.innerHTML =
        `<option value="">All Taluks</option>`;

    const taluks =
        TALUK_DATA[district] || [];

    taluks.forEach(function (talukName) {

        taluk.innerHTML += `
            <option value="${escapeHTML(talukName)}">
                ${escapeHTML(talukName)}
            </option>
        `;

    });

}


function renderSchoolAdminViewTable() {

    const table =
        document.getElementById(
            "schoolAdminViewTable"
        );

    if (!table) return;


    const keyword =
        getValue("adminSearchSchool")
            .toLowerCase();

    const state =
        getValue("adminFilterState");

    const district =
        getValue("adminFilterDistrict");

    const taluk =
        getValue("adminFilterTaluk");


    const filtered =
        schools.filter(function (school) {

            const schoolName =
                String(
                    school.name || ""
                ).toLowerCase();

            return (

                schoolName.includes(keyword)

                &&

                (!state ||
                    school.state === state)

                &&

                (!district ||
                    school.district === district)

                &&

                (!taluk ||
                    school.taluk === taluk)

            );

        });


    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        padding:30px;
                        text-align:center;
                        color:#64748b;
                    "
                >

                    No School Admin / School
                    records found.

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered.map(function (school) {

            const index =
                schools.indexOf(school);

            return `

                <tr>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">
                        ${escapeHTML(
                            school.name || "-"
                        )}
                    </td>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">
                        ${escapeHTML(
                            school.principal || "-"
                        )}
                    </td>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">
                        ${escapeHTML(
                            school.state || "-"
                        )}
                    </td>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">
                        ${escapeHTML(
                            school.district || "-"
                        )}
                    </td>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">
                        ${escapeHTML(
                            school.taluk || "-"
                        )}
                    </td>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">
                        ${escapeHTML(
                            school.status || "Pending"
                        )}
                    </td>

                    <td style="padding:13px;border-top:1px solid #e5e7eb;">

                        <button
                            type="button"
                            onclick="
                                viewSchoolAdminDetails(
                                    ${index}
                                )
                            "
                            style="
                                border:none;
                                background:#1e3a8a;
                                color:white;
                                padding:8px 12px;
                                border-radius:7px;
                                cursor:pointer;
                            "
                        >
                            👁️ View
                        </button>

                    </td>

                </tr>

            `;

        }).join("");

}


function viewSchoolAdminDetails(index) {

    const school =
        schools[index];

    if (!school) return;


    alert(

        "SCHOOL ADMIN / SCHOOL DETAILS\n\n" +

        "School Name: " +
        (school.name || "-") +

        "\nPrincipal: " +
        (school.principal || "-") +

        "\nSchool Type: " +
        (school.schoolType || "-") +

        "\nPhone: " +
        (school.phone || "-") +

        "\nEmail: " +
        (school.email || "-") +

        "\nWebsite: " +
        (school.website || "-") +

        "\nCountry: " +
        (school.country || "-") +

        "\nState: " +
        (school.state || "-") +

        "\nDistrict: " +
        (school.district || "-") +

        "\nTaluk: " +
        (school.taluk || "-") +

        "\nPincode: " +
        (school.pincode || "-") +

        "\nAddress: " +
        (school.address || "-") +

        "\nStatus: " +
        (school.status || "Pending")

    );

}


function closeSchoolAdminViewOnly() {

    const panel =
        document.getElementById(
            "schoolAdminViewOnly"
        );

    if (panel) {

        panel.remove();

    }

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

        "Super Admin reports use centralized school, user, attendance, fees, performance and activity data."

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
   ACTIVITY
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
            .slice(
                0,
                10
            )
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
        "schoolWebsite",
        "schoolEmail",
        "schoolPhone",
        "schoolLandline",
        "schoolAddress",
        "schoolType",
        "schoolState",
        "schoolDistrict",
        "schoolTaluk",
        "schoolPincode"

    ]
    .forEach(
        function (id) {

            const field =
                document.getElementById(
                    id
                );


            if (!field) {

                return;

            }


            if (
                field.tagName ===
                "SELECT"
            ) {

                field.selectedIndex =
                    0;

            } else {

                field.value =
                    "";

            }

        }
    );


    const country =
        document.getElementById(
            "schoolCountry"
        );


    if (country) {

        country.value =
            "India";

    }


    const district =
        document.getElementById(
            "schoolDistrict"
        );


    const taluk =
        document.getElementById(
            "schoolTaluk"
        );


    if (district) {

        district.disabled =
            true;

        district.innerHTML = `

            <option value="">
                Select State First
            </option>

        `;

    }


    if (taluk) {

        taluk.disabled =
            true;

        taluk.innerHTML = `

            <option value="">
                Select District First
            </option>

        `;

    }

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
   FOCUS FIELD
   ============================================================ */

function focusField(id) {

    const field =
        document.getElementById(
            id
        );


    if (field) {

        field.focus();

    }

}


/* ============================================================
   GET VALUE
   ============================================================ */

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return "";

    }


    return String(
        element.value || ""
    ).trim();

}


/* ============================================================
   SET TEXT
   ============================================================ */

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


/* ============================================================
   CREATE ID
   ============================================================ */

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


/* ============================================================
   ESCAPE HTML
   ============================================================ */

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
   END OF V3
   ============================================================ */