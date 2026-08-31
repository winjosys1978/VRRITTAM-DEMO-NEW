
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
                    <td>${escapeHTML(school.name)}</td>
                    <td>${escapeHTML(school.principal || "-")}</td>
                    <td><span class="vrrittam-status ${status.toLowerCase()}">${escapeHTML(status)}</span></td>
                    <td>${button}</td>
                </tr>`;
        }).join("");
    };

    /* Filter changes need cascading behaviour. */
    document.addEventListener("DOMContentLoaded", function () {
        ensureManagementModal();
        ensureDetailsModal();
        addViewOnlyStyles();

        const state = document.getElementById("viewStateFilter");
        const district = document.getElementById("viewDistrictFilter");
        const taluk = document.getElementById("viewTalukFilter");

        if (state) state.addEventListener("change", populateFilterDistricts);
        if (district) district.addEventListener("change", populateFilterTaluks);
        if (taluk) taluk.addEventListener("change", populateFilterSchools);
    });

    window.VRRITTAM_SUPER_ADMIN_VIEW = {
        openSchoolDetails,
        closeSchoolDetails,
        openViewOnlyModal,
        closeViewOnlyModal,
        viewRecord
    };
})();
