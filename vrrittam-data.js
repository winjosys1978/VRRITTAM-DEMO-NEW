/* =========================================================
   VRRITTAM SMART SCHOOL
   CENTRAL DATA ENGINE 2.0
   ---------------------------------------------------------
   One shared data source for:

   Student
   Parent
   Teacher
   School Admin
   Super Admin
   AI Copilot
   Courses
   Classes
   Sections
   Attendance
   Fees
   Curriculum
   Homework
   Marks
   Sports
   Festivals
   Holidays
   Leave
   Extra Curricular
   Notifications
   Reports
========================================================= */


/* =========================================================
   DEFAULT DATA
========================================================= */

const VRRITTAM_DATA = {

    /* =====================================================
       SYSTEM
    ===================================================== */

    system: {

        appName: "VRRITTAM",

        productName:
            "VRRITTAM Smart School",

        tagline:
            "கற்க கசடற, வளர்க அதற்குத் தக.",

        version: "2.0",

        poweredBy:
            "WinjoSys Technologies Private Limited",

        academicYear:
            "2026 - 2027"

    },


    /* =====================================================
       SCHOOL
    ===================================================== */

    school: {

        id: "SCH-001",

        name:
            "VRRITTAM Demo School",

        code:
            "VRRITTAM-DEMO",

        academicYear:
            "2026 - 2027",

        board:
            "State Board",

        medium:
            "English",

        address:
            "Chennai, Tamil Nadu, India",

        phone:
            "044-00000000",

        email:
            "school@vrrittam.com",

        principal:
            "School Principal",

        statistics: {

            students: 0,

            teachers: 0,

            parents: 0,

            admins: 0,

            classes: 0,

            sections: 0

        }

    },


    /* =====================================================
       USERS
    ===================================================== */

    users: [

        {
            id: "USR-001",
            username: "student",
            role: "student",
            name: "Arun Kumar",
            status: "Active"
        },

        {
            id: "USR-002",
            username: "parent",
            role: "parent",
            name: "Kumar",
            status: "Active"
        },

        {
            id: "USR-003",
            username: "teacher",
            role: "teacher",
            name: "Teacher Demo",
            status: "Active"
        },

        {
            id: "USR-004",
            username: "schooladmin",
            role: "schooladmin",
            name: "School Administrator",
            status: "Active"
        },

        {
            id: "USR-005",
            username: "superadmin",
            role: "superadmin",
            name: "CR. Sathish Kumar",
            status: "Active"
        }

    ],


    /* =====================================================
       STUDENTS
    ===================================================== */

    students: [

        {
            id: "STU-001",

            admissionNumber:
                "VRR-1001",

            name:
                "Arun Kumar",

            gender:
                "Male",

            dateOfBirth:
                "2011-06-15",

            classId:
                "CLS-10",

            className:
                "10",

            sectionId:
                "SEC-A",

            section:
                "A",

            rollNumber:
                "01",

            parentIds:
                ["PAR-001"],

            teacherIds:
                ["TCH-001"],

            status:
                "Active",

            admissionYear:
                "2026",

            academicYear:
                "2026 - 2027"

        },

        {
            id: "STU-002",

            admissionNumber:
                "VRR-1002",

            name:
                "Priya Sharma",

            gender:
                "Female",

            dateOfBirth:
                "2012-04-10",

            classId:
                "CLS-8",

            className:
                "8",

            sectionId:
                "SEC-A",

            section:
                "A",

            rollNumber:
                "02",

            parentIds:
                ["PAR-002"],

            teacherIds:
                ["TCH-001"],

            status:
                "Active",

            admissionYear:
                "2026",

            academicYear:
                "2026 - 2027"

        },

        {
            id: "STU-003",

            admissionNumber:
                "VRR-1003",

            name:
                "Rahul Kumar",

            gender:
                "Male",

            dateOfBirth:
                "2012-08-21",

            classId:
                "CLS-7",

            className:
                "7",

            sectionId:
                "SEC-B",

            section:
                "B",

            rollNumber:
                "03",

            parentIds:
                ["PAR-001"],

            teacherIds:
                ["TCH-002"],

            status:
                "Active",

            admissionYear:
                "2026",

            academicYear:
                "2026 - 2027"

        },

        {
            id: "STU-004",

            admissionNumber:
                "VRR-1004",

            name:
                "Ananya Devi",

            gender:
                "Female",

            dateOfBirth:
                "2010-11-05",

            classId:
                "CLS-9",

            className:
                "9",

            sectionId:
                "SEC-A",

            section:
                "A",

            rollNumber:
                "04",

            parentIds:
                ["PAR-003"],

            teacherIds:
                ["TCH-002"],

            status:
                "Active",

            admissionYear:
                "2026",

            academicYear:
                "2026 - 2027"

        }

    ],


    /* =====================================================
       PARENTS
       One parent can have multiple children
    ===================================================== */

    parents: [

        {
            id: "PAR-001",

            name:
                "Kumar",

            phone:
                "9876543210",

            email:
                "kumar@example.com",

            studentIds: [

                "STU-001",
                "STU-003"

            ],

            status:
                "Active"

        },

        {
            id: "PAR-002",

            name:
                "Rajesh Sharma",

            phone:
                "9876543211",

            email:
                "rajesh@example.com",

            studentIds: [

                "STU-002"

            ],

            status:
                "Active"

        },

        {
            id: "PAR-003",

            name:
                "Mohan Devi",

            phone:
                "9876543213",

            email:
                "mohan@example.com",

            studentIds: [

                "STU-004"

            ],

            status:
                "Active"

        }

    ],


    /* =====================================================
       TEACHERS
    ===================================================== */

    teachers: [

        {
            id: "TCH-001",

            name:
                "Teacher Demo",

            employeeId:
                "EMP-001",

            phone:
                "9000000001",

            email:
                "teacher1@vrrittam.com",

            subjects: [

                "Mathematics",
                "Science"

            ],

            classIds: [

                "CLS-10",
                "CLS-8"

            ],

            status:
                "Active"

        },

        {
            id: "TCH-002",

            name:
                "Senior Teacher",

            employeeId:
                "EMP-002",

            phone:
                "9000000002",

            email:
                "teacher2@vrrittam.com",

            subjects: [

                "English",
                "Tamil",
                "Social Science"

            ],

            classIds: [

                "CLS-7",
                "CLS-9"

            ],

            status:
                "Active"

        }

    ],


    /* =====================================================
       SCHOOL ADMINS
    ===================================================== */

    admins: [

        {
            id: "ADM-001",

            name:
                "School Administrator",

            role:
                "School Admin",

            username:
                "schooladmin",

            phone:
                "9000000010",

            status:
                "Active"

        },

        {
            id: "ADM-002",

            name:
                "Assistant Administrator",

            role:
                "Assistant Admin",

            username:
                "assistantadmin",

            phone:
                "9000000011",

            status:
                "Active"

        }

    ],


    /* =====================================================
       SUPER ADMIN
    ===================================================== */

    superAdmin: {

        id:
            "SUPER-001",

        name:
            "CR. Sathish Kumar",

        role:
            "Super Admin",

        username:
            "superadmin",

        status:
            "Active"

    },


    /* =====================================================
       CLASSES
    ===================================================== */

    classes: [

        {
            id: "CLS-6",
            name: "6",
            sections: ["SEC-A", "SEC-B"]
        },

        {
            id: "CLS-7",
            name: "7",
            sections: ["SEC-A", "SEC-B"]
        },

        {
            id: "CLS-8",
            name: "8",
            sections: ["SEC-A", "SEC-B"]
        },

        {
            id: "CLS-9",
            name: "9",
            sections: ["SEC-A", "SEC-B"]
        },

        {
            id: "CLS-10",
            name: "10",
            sections: ["SEC-A", "SEC-B"]
        }

    ],


    /* =====================================================
       SECTIONS
    ===================================================== */

    sections: [

        {
            id: "SEC-A",
            name: "A"
        },

        {
            id: "SEC-B",
            name: "B"
        }

    ],


    /* =====================================================
       COURSES
    ===================================================== */

    courses: [

        {
            id: "COURSE-001",
            name: "Mathematics",
            code: "MAT",
            teacherId: "TCH-001",
            classIds: ["CLS-8", "CLS-10"],
            status: "Active"
        },

        {
            id: "COURSE-002",
            name: "Science",
            code: "SCI",
            teacherId: "TCH-001",
            classIds: ["CLS-8", "CLS-10"],
            status: "Active"
        },

        {
            id: "COURSE-003",
            name: "English",
            code: "ENG",
            teacherId: "TCH-002",
            classIds: ["CLS-7", "CLS-9"],
            status: "Active"
        },

        {
            id: "COURSE-004",
            name: "Tamil",
            code: "TAM",
            teacherId: "TCH-002",
            classIds: ["CLS-7", "CLS-9"],
            status: "Active"
        }

    ],


    /* =====================================================
       CURRICULUM
    ===================================================== */

    curriculum: [

        {
            id: "CUR-001",

            subject:
                "Mathematics",

            classId:
                "CLS-10",

            term:
                "Term 1",

            units: [

                "Algebra",
                "Geometry",
                "Statistics"

            ],

            status:
                "Active"

        },

        {
            id: "CUR-002",

            subject:
                "Science",

            classId:
                "CLS-10",

            term:
                "Term 1",

            units: [

                "Physics",
                "Chemistry",
                "Biology"

            ],

            status:
                "Active"

        }

    ],


    /* =====================================================
       ATTENDANCE
    ===================================================== */

    attendance: [

        {
            id:
                "ATT-001",

            studentId:
                "STU-001",

            present:
                22,

            absent:
                2,

            late:
                1,

            percentage:
                92

        },

        {
            id:
                "ATT-002",

            studentId:
                "STU-002",

            present:
                23,

            absent:
                1,

            late:
                0,

            percentage:
                96

        },

        {
            id:
                "ATT-003",

            studentId:
                "STU-003",

            present:
                18,

            absent:
                6,

            late:
                1,

            percentage:
                72

        },

        {
            id:
                "ATT-004",

            studentId:
                "STU-004",

            present:
                24,

            absent:
                1,

            late:
                0,

            percentage:
                96

        }

    ],


    /* =====================================================
       MARKS
    ===================================================== */

    marks: [

        {
            studentId:
                "STU-001",

            subjects: {

                Mathematics: 85,
                Science: 78,
                English: 72,
                Tamil: 80,
                "Social Science": 75

            }

        },

        {
            studentId:
                "STU-002",

            subjects: {

                Mathematics: 88,
                Science: 82,
                English: 91,
                Tamil: 86

            }

        },

        {
            studentId:
                "STU-003",

            subjects: {

                Mathematics: 68,
                Science: 70,
                English: 72,
                Tamil: 65

            }

        },

        {
            studentId:
                "STU-004",

            subjects: {

                Mathematics: 91,
                Science: 93,
                English: 89,
                Tamil: 94

            }

        }

    ],


    /* =====================================================
       HOMEWORK
    ===================================================== */

    homework: [

        {
            id: "HW-001",

            studentId:
                "STU-001",

            subject:
                "Mathematics",

            title:
                "Algebra Practice",

            description:
                "Complete the assigned algebra exercises.",

            dueDate:
                "2026-08-15",

            status:
                "Pending"

        },

        {
            id: "HW-002",

            studentId:
                "STU-001",

            subject:
                "Science",

            title:
                "Science Assignment",

            description:
                "Complete the science questions.",

            dueDate:
                "2026-08-16",

            status:
                "Pending"

        },

        {
            id: "HW-003",

            studentId:
                "STU-002",

            subject:
                "English",

            title:
                "Grammar Exercise",

            description:
                "Complete the grammar worksheet.",

            dueDate:
                "2026-08-14",

            status:
                "Completed"

        }

    ],


    /* =====================================================
       FEES
    ===================================================== */

    fees: [

        {
            id:
                "FEE-001",

            studentId:
                "STU-001",

            total:
                60000,

            paid:
                45000,

            pending:
                15000,

            dueDate:
                "2026-08-20",

            status:
                "Partially Paid"

        },

        {
            id:
                "FEE-002",

            studentId:
                "STU-002",

            total:
                60000,

            paid:
                60000,

            pending:
                0,

            dueDate:
                "2026-08-20",

            status:
                "Paid"

        },

        {
            id:
                "FEE-003",

            studentId:
                "STU-003",

            total:
                60000,

            paid:
                30000,

            pending:
                30000,

            dueDate:
                "2026-08-20",

            status:
                "Pending"

        }

    ],


    /* =====================================================
       SPORTS
    ===================================================== */

    sports: [

        {
            id:
                "SPORT-001",

            name:
                "Football",

            coach:
                "Sports Coach",

            students:
                ["STU-001", "STU-003"],

            status:
                "Active"

        },

        {
            id:
                "SPORT-002",

            name:
                "Cricket",

            coach:
                "Sports Coach",

            students:
                ["STU-002", "STU-004"],

            status:
                "Active"

        },

        {
            id:
                "SPORT-003",

            name:
                "Athletics",

            coach:
                "Sports Coach",

            students:
                ["STU-001", "STU-004"],

            status:
                "Active"

        }

    ],


    /* =====================================================
       FESTIVALS
    ===================================================== */

    festivals: [

        {
            id:
                "FEST-001",

            name:
                "Independence Day Celebration",

            date:
                "2026-08-15",

            venue:
                "School Auditorium",

            status:
                "Upcoming"

        },

        {
            id:
                "FEST-002",

            name:
                "Annual Day",

            date:
                "2026-12-20",

            venue:
                "School Ground",

            status:
                "Planned"

        }

    ],


    /* =====================================================
       HOLIDAYS
    ===================================================== */

    holidays: [

        {
            id:
                "HOL-001",

            name:
                "Independence Day",

            date:
                "2026-08-15",

            type:
                "National Holiday"

        },

        {
            id:
                "HOL-002",

            name:
                "Gandhi Jayanti",

            date:
                "2026-10-02",

            type:
                "National Holiday"

        }

    ],


    /* =====================================================
       LEAVE /