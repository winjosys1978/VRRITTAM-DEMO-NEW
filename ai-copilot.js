/* =========================================================
   VRRITTAM AI COPILOT V2.0
   CLEAN CONSOLIDATED JAVASCRIPT
   PHASE 1 + PHASE 2.1 + PHASE 2.2C

   Architecture:

   Data
      ↓
   Curriculum Lock
      ↓
   AI Insight
      ↓
   Learning Gap
      ↓
   Student Learning Passport
      ↓
   AI Guidance
      ↓
   Parent Support
      ↓
   Next Best Action
      ↓
   Outcome

   AI is the intelligence engine.
   VRRITTAM is the Learning Intelligence Layer.
========================================================= */


/* =========================================================
   1. STUDENT MASTER DATA
========================================================= */

const student = {

    name: "Arun Kumar",

    school: "Winjosys Public School",

    className: "Class 8 - A",

    classNumber: 8,

    board: "Tamil Nadu State Board",

    language: "Tamil",

    academicYear: "2026-2027"

};


/* =========================================================
   2. LOAD STUDENT PROFILE
========================================================= */

function loadStudentProfile(){

    const studentName =
        document.getElementById("studentName");

    const schoolName =
        document.getElementById("schoolName");

    const studentClass =
        document.getElementById("studentClass");

    const boardName =
        document.getElementById("boardName");

    const languageName =
        document.getElementById("languageName");

    const language =
        document.getElementById("language");

    const academicYear =
        document.getElementById("academicYear");


    if(studentName){
        studentName.textContent = student.name;
    }

    if(schoolName){
        schoolName.textContent = student.school;
    }

    if(studentClass){
        studentClass.textContent = student.className;
    }

    if(boardName){
        boardName.textContent = student.board;
    }

    if(languageName){
        languageName.textContent = student.language;
    }

    if(language){
        language.textContent = student.language;
    }

    if(academicYear){
        academicYear.textContent =
            student.academicYear;
    }

}

/* =========================================================
   3. NAVIGATION
   VRRITTAM AI COPILOT V2.0
========================================================= */

function goBack(){

    /*
       First try browser history.
       If there is no previous page,
       return safely to Student Dashboard.
    */

    if(window.history.length > 1){

        window.history.back();

    }
    else{

        window.location.href =
            "student-dashboard.html";

    }

}


function openDashboard(){

    window.location.href =
        "student-dashboard.html";

}


function logout(){

    const confirmLogout =
        window.confirm(
            "Do you want to Logout?"
        );


    if(confirmLogout){

        window.location.href =
            "login.html";

    }

}

/* =========================================================
   4. TODAY'S LEARNING STATE
========================================================= */

const learningState = {

    status: "🟢 On Track",

    attendance: "96%",

    todayFocus: "Mathematics",

    examReadiness: "82%"

};


function loadLearningState(){

    const box =
        document.getElementById("learningStateBox");

    if(!box){
        return;
    }


    box.innerHTML = `

        <div class="learning-state-content">

            <h3>
                ${learningState.status}
            </h3>

            <p>
                <b>Attendance:</b>
                ${learningState.attendance}
            </p>

            <p>
                <b>Today's Focus:</b>
                ${learningState.todayFocus}
            </p>

            <p>
                <b>Exam Readiness:</b>
                ${learningState.examReadiness}
            </p>

        </div>

    `;

}


/* =========================================================
   5. AI INSIGHT
========================================================= */

const aiInsight = {

    message:
        "Your Mathematics progress is developing well. A short Algebra practice session is recommended today."

};


function loadAIInsight(){

    const box =
        document.getElementById("aiInsightBox");

    if(!box){
        return;
    }


    box.innerHTML = `

        <div class="ai-insight-content">

            <p>
                ${aiInsight.message}
            </p>

        </div>

    `;

}


/* =========================================================
   6. NEXT BEST LEARNING ACTION
========================================================= */

const nextAction = {

    title: "Practice Algebra",

    duration: "15 Minutes",

    priority: "Recommended"

};


function loadNextAction(){

    const box =
        document.getElementById("nextActionBox");

    if(!box){
        return;
    }


    box.innerHTML = `

        <div class="next-action-content">

            <h3>
                ${nextAction.title}
            </h3>

            <p>
                <b>Duration:</b>
                ${nextAction.duration}
            </p>

            <p>
                <b>Priority:</b>
                ${nextAction.priority}
            </p>

            <button
                type="button"
                onclick="startPractice()">

                Start Practice

            </button>

        </div>

    `;

}


/* =========================================================
   7. REMINDERS
========================================================= */

const reminders = [

    "Complete Mathematics Homework",

    "Science Revision",

    "English Reading Practice",

    "Prepare for Friday Test"

];


function loadReminders(){

    const box =
        document.getElementById("reminderBox");

    if(!box){
        return;
    }


    let html = "<ul>";


    reminders.forEach(function(reminder){

        html += `
            <li>${reminder}</li>
        `;

    });


    html += "</ul>";


    box.innerHTML = html;

}


/* =========================================================
   8. LEARNING GAP
========================================================= */

const learningGap = {

    subject: "Mathematics",

    topic: "Fractions",

    mastery: 62,

    risk: "Medium"

};


function loadLearningGap(){

    const box =
        document.getElementById("learningGapBox");

    if(!box){
        return;
    }


    box.innerHTML = `

        <div class="learning-gap-content">

            <h3>
                ${learningGap.subject}
            </h3>

            <p>
                <b>Topic:</b>
                ${learningGap.topic}
            </p>

            <p>
                <b>Mastery:</b>
                ${learningGap.mastery}%
            </p>

            <p>
                <b>Support Level:</b>
                ${learningGap.risk}
            </p>

        </div>

    `;

}


/* =========================================================
   9. LEARNING PROGRESS
========================================================= */

const progress = {

    weekly: 78,

    monthly: 81,

    overall: 84

};


function loadProgress(){

    const box =
        document.getElementById("progressBox");

    if(!box){
        return;
    }


    box.innerHTML = `

        <div class="progress-content">

            <p>
                <b>Weekly Progress:</b>
                ${progress.weekly}%
            </p>

            <p>
                <b>Monthly Progress:</b>
                ${progress.monthly}%
            </p>

            <p>
                <b>Overall Learning:</b>
                ${progress.overall}%
            </p>

        </div>

    `;

}


/* =========================================================
   10. CURRICULUM PROFILE
========================================================= */

const curriculumProfile = {

    board: "Tamil Nadu State Board",

    class: 8,

    medium: "Tamil",

    allowedSubjects: [

        "Tamil",

        "English",

        "Mathematics",

        "Science",

        "Social Science"

    ]

};


/* =========================================================
   11. APPROVED CURRICULUM DATABASE
========================================================= */

const curriculumDatabase = {

    "Tamil Nadu State Board": {

        8: {

            "Tamil": [

                "Chapter 1",

                "Chapter 2",

                "Chapter 3"

            ],

            "English": [

                "Chapter 1",

                "Chapter 2",

                "Chapter 3"

            ],

            "Mathematics": [

                "Chapter 1",

                "Chapter 2",

                "Chapter 3",

                "Fractions",

                "Algebra"

            ],

            "Science": [

                "Chapter 1",

                "Chapter 2",

                "Chapter 3"

            ],

            "Social Science": [

                "Chapter 1",

                "Chapter 2",

                "Chapter 3"

            ]

        }

    }

};


/* =========================================================
   12. VERIFY SUBJECT
========================================================= */

function verifySubject(subject){

    return curriculumProfile
        .allowedSubjects
        .includes(subject);

}


/* =========================================================
   13. VERIFY CLASS
========================================================= */

function verifyClass(requestedClass){

    return requestedClass ===
        curriculumProfile.class;

}


/* =========================================================
   14. VERIFY BOARD
========================================================= */

function verifyBoard(board){

    return board ===
        curriculumProfile.board;

}


/* =========================================================
   15. VERIFY CHAPTER
========================================================= */

function verifyChapter(subject, chapter){

    try{

        const chapterList =
            curriculumDatabase
                [curriculumProfile.board]
                [curriculumProfile.class]
                [subject];


        if(!chapterList){
            return false;
        }


        return chapterList.includes(chapter);

    }

    catch(error){

        console.error(
            "Curriculum verification error:",
            error
        );

        return false;

    }

}


/* =========================================================
   16. COMPLETE CURRICULUM VALIDATION
========================================================= */

function verifyCurriculum(
    board,
    classNo,
    subject,
    chapter
){

    if(!verifyBoard(board)){

        return {

            status: false,

            message:
                "Access Denied: Unsupported Board."

        };

    }


    if(!verifyClass(classNo)){

        return {

            status: false,

            message:
                "Access Denied: Invalid Class."

        };

    }


    if(!verifySubject(subject)){

        return {

            status: false,

            message:
                "Access Denied: Subject Restricted."

        };

    }


    if(!verifyChapter(subject, chapter)){

        return {

            status: false,

            message:
                "Access Denied: Chapter Not Available."

        };

    }


    return {

        status: true,

        message:
            "Curriculum Verified Successfully."

    };

}


/* =========================================================
   17. AI SECURITY
========================================================= */

const blockedKeywords = [

    "youtube",

    "instagram",

    "facebook",

    "whatsapp",

    "movie",

    "cinema",

    "cricket",

    "ipl",

    "reels",

    "music",

    "game",

    "free fire",

    "pubg"

];


function containsBlockedContent(question){

    const text =
        question.toLowerCase();


    for(let i = 0;
        i < blockedKeywords.length;
        i++
    ){

        if(
            text.includes(
                blockedKeywords[i]
            )
        ){

            return true;

        }

    }


    return false;

}


/* =========================================================
   18. SECURITY CHECK
========================================================= */

function securityCheck(question){

    if(
        containsBlockedContent(question)
    ){

        return {

            status: false,

            message:
                "This content is outside the protected curriculum learning environment."

        };

    }


    return {

        status: true,

        message: "Content Check Passed."

    };

}


/* =========================================================
   19. SECURE AI CHAT
========================================================= */

function askAI(){

    const questionBox =
        document.getElementById("questionBox");

    const chatMessages =
        document.getElementById("chatMessages");


    if(!questionBox || !chatMessages){

        console.error(
            "AI Chat elements not found."
        );

        return;

    }


    const question =
        questionBox.value.trim();


    if(question === ""){

        alert(
            "Please enter your question."
        );

        return;

    }


    /* ---------- SECURITY CHECK ---------- */

    const security =
        securityCheck(question);


    if(!security.status){

        chatMessages.innerHTML = `

            <p class="ai-warning">

                ⚠️ ${security.message}

            </p>

        `;

        return;

    }


    /* ---------- DEMO CURRICULUM CHECK ---------- */

    const verification =
        verifyCurriculum(

            curriculumProfile.board,

            curriculumProfile.class,

            "Mathematics",

            "Algebra"

        );


    if(!verification.status){

        chatMessages.innerHTML = `

            <p class="ai-warning">

                ${verification.message}

            </p>

        `;

        return;

    }


    /* ---------- SAFE DEMO RESPONSE ---------- */

    chatMessages.innerHTML = `

        <div class="chat-user-message">

            <p>
                <b>You:</b>
                ${escapeHTML(question)}
            </p>

        </div>

        <hr>

        <div class="chat-ai-message">

            <p class="verified">

                ✅ Curriculum Verified

            </p>

            <p>

                <b>VRRITTAM AI:</b>

            </p>

            <p>

                Your question is within the
                approved learning environment.

            </p>

            <p>

                The production version will
                generate the explanation from
                the approved curriculum knowledge
                base.

            </p>

        </div>

    `;


    questionBox.value = "";

}


/* =========================================================
   20. BASIC HTML SAFETY
========================================================= */

function escapeHTML(text){

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

/* =========================================================
   21. START PRACTICE
========================================================= */

function startPractice(){

    const subject =
        "Mathematics";

    const topic =
        "Algebra";

    const duration =
        "15 Minutes";


    /*
       Store today's AI practice session
       for the demo flow.
    */

    const practiceSession = {

        subject: subject,

        topic: topic,

        duration: duration,

        status: "Ready",

        startedAt:
            new Date().toISOString()

    };


    try{

        localStorage.setItem(
            "vrrittamPracticeSession",
            JSON.stringify(
                practiceSession
            )
        );

    }
    catch(error){

        console.warn(
            "VRRITTAM: Practice session could not be saved.",
            error
        );

    }


    /*
       Open Guided Practice page
       if it exists.
    */

    window.location.href =
        "guided-practice.html";

}

/* =========================================================
   22. STUDENT LEARNING PASSPORT
========================================================= */

const learningPassport = {

    studentId: "ST1001",

    studentName: "Arun Kumar",

    school: "Winjosys Public School",

    currentClass: 8,

    board: "Tamil Nadu State Board",

    academicYear: "2026-2027",


    journey: [

        {

            class: 6,

            year: "2024-2025",

            attendance: 95,

            score: 74,

            strength: "Science",

            improvement: "Mathematics"

        },


        {

            class: 7,

            year: "2025-2026",

            attendance: 97,

            score: 81,

            strength: "Science",

            improvement: "English"

        },


        {

            class: 8,

            year: "2026-2027",

            attendance: 96,

            score: 84,

            strength: "Mathematics",

            improvement: "Social Science"

        }

    ]

};


/* =========================================================
   23. PASSPORT HELPERS
========================================================= */

function getCurrentPassport(){

    return learningPassport.journey[
        learningPassport.journey.length - 1
    ];

}


function getCurrentStrength(){

    return getCurrentPassport()
        .strength;

}


function getCurrentImprovement(){

    return getCurrentPassport()
        .improvement;

}


/* =========================================================
   24. PASSPORT ANALYTICS
========================================================= */

function calculateAverageScore(){

    let total = 0;


    learningPassport.journey
        .forEach(function(item){

            total += item.score;

        });


    return (
        total /
        learningPassport.journey.length
    ).toFixed(1);

}


function calculateAttendance(){

    let total = 0;


    learningPassport.journey
        .forEach(function(item){

            total += item.attendance;

        });


    return (
        total /
        learningPassport.journey.length
    ).toFixed(1);

}


function calculateGrowth(){

    const first =
        learningPassport.journey[0].score;


    const latest =
        learningPassport.journey[
            learningPassport.journey.length - 1
        ].score;


    return latest - first;

}


function getPerformanceLevel(){

    const average =
        parseFloat(
            calculateAverageScore()
        );


    if(average >= 90){

        return "Excellent";

    }


    if(average >= 75){

        return "Very Good";

    }


    if(average >= 60){

        return "Developing";

    }


    return "Needs Support";

}


/* =========================================================
   25. STUDENT AI GUIDANCE ENGINE — PHASE 2.2C
========================================================= */

const todayGoal = {

    title: "Today's Learning Goal",

    task: "Practice Algebra",

    duration: "15 Minutes"

};


/* =========================================================
   26. MOTIVATION
========================================================= */

function getMotivationMessage(){

    return (

        "🌟 Great progress! " +

        "Small daily practice builds " +

        "long-term learning confidence."

    );

}


/* =========================================================
   27. NEXT LEARNING STEP
========================================================= */

function getNextLearningStep(){

    return (

        "Complete today's Mathematics " +

        "practice when you are ready."

    );

}


/* =========================================================
   28. PARENT SUPPORT
========================================================= */

function getParentSupportMessage(){

    return (

        "Parent Support: Encourage the student " +

        "with a calm 15-minute study routine. " +

        "The goal is support, not pressure."

    );

}


/* =========================================================
   29. STUDENT GUIDANCE DISPLAY
========================================================= */

function showStudentGuidance(){

    const box =
        document.getElementById("aiInsightBox");


    if(!box){
        return;
    }


    box.innerHTML = `

        <div class="student-guidance">

            <h3>
                ${todayGoal.title}
            </h3>

            <p>
                📘 <b>Task:</b>
                ${todayGoal.task}
            </p>

            <p>
                ⏱ <b>Duration:</b>
                ${todayGoal.duration}
            </p>

            <hr>

            <p>
                ${getMotivationMessage()}
            </p>

            <p>
                <b>Next Step</b><br>
                ${getNextLearningStep()}
            </p>

            <p>
                ${getParentSupportMessage()}
            </p>

        </div>

    `;

}


/* =========================================================
   30. LEARNING ENGINE INITIALIZATION
========================================================= */

function initializeLearningEngine(){

    loadStudentProfile();

    loadLearningState();

    loadAIInsight();

    loadNextAction();

    loadReminders();

    loadLearningGap();

    loadProgress();

    showStudentGuidance();


    console.log(
        "VRRITTAM Intelligence Engine Ready"
    );

}


/* =========================================================
   31. SINGLE PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        initializeLearningEngine();


        console.log(
            "VRRITTAM AI Copilot V2.0 Ready"
        );

    }
);


/* =========================================================
   32. DEVELOPMENT STATUS
========================================================= */

console.log(
    "--------------------------------------"
);

console.log(
    "VRRITTAM AI COPILOT V2.0"
);

console.log(
    "Curriculum Lock: ACTIVE"
);

console.log(
    "AI Security: ACTIVE"
);

console.log(
    "Learning Passport: ACTIVE"
);

console.log(
    "Passport Analytics: ACTIVE"
);

console.log(
    "Student AI Guidance: ACTIVE"
);

console.log(
    "Parent Support: ACTIVE"
);

console.log(
    "--------------------------------------"
);

/* =========================================================
   PHASE 2.3
   LEARNING GAP → INTERVENTION ENGINE
========================================================= */


/* =========================================================
   1. CURRENT LEARNING GAP
========================================================= */

const interventionProfile = {

    subject: "Mathematics",

    topic: "Fractions",

    currentMastery: 62,

    targetMastery: 80,

    riskLevel: "Medium"

};


/* =========================================================
   2. INTERVENTION PLAN
========================================================= */

const interventionPlan = {

    duration: "15 Minutes",

    practiceQuestions: 5,

    mode: "Guided Practice",

    difficulty: "Adaptive",

    retryAllowed: true

};


/* =========================================================
   3. DETERMINE INTERVENTION LEVEL
========================================================= */

function getInterventionLevel(){

    const mastery =
        interventionProfile.currentMastery;


    if(mastery < 50){

        return "High Support";

    }


    if(mastery < 70){

        return "Targeted Support";

    }


    if(mastery < 85){

        return "Practice Support";

    }


    return "Maintenance";

}


/* =========================================================
   4. CREATE INTERVENTION RECOMMENDATION
========================================================= */

function generateIntervention(){

    const level =
        getInterventionLevel();


    return {

        subject:
            interventionProfile.subject,

        topic:
            interventionProfile.topic,

        level: level,

        duration:
            interventionPlan.duration,

        questions:
            interventionPlan.practiceQuestions,

        mode:
            interventionPlan.mode,

        difficulty:
            interventionPlan.difficulty

    };

}


/* =========================================================
   5. DISPLAY INTERVENTION
========================================================= */

function showIntervention(){

    const intervention =
        generateIntervention();


    const box =
        document.getElementById(
            "learningGapBox"
        );


    if(!box){

        console.log(
            "Learning Gap Box not found."
        );

        return;

    }


    box.innerHTML += `

        <div class="intervention-panel">

            <hr>

            <h3>
                🎯 Recommended Intervention
            </h3>

            <p>
                <b>Subject:</b>
                ${intervention.subject}
            </p>

            <p>
                <b>Focus Topic:</b>
                ${intervention.topic}
            </p>

            <p>
                <b>Support Level:</b>
                ${intervention.level}
            </p>

            <p>
                <b>Practice Duration:</b>
                ${intervention.duration}
            </p>

            <p>
                <b>Practice Questions:</b>
                ${intervention.questions}
            </p>

            <p>
                <b>Mode:</b>
                ${intervention.mode}
            </p>

            <p>
                <b>Difficulty:</b>
                ${intervention.difficulty}
            </p>

            <button
                type="button"
                onclick="startIntervention()">

                Start Intervention

            </button>

        </div>

    `;

}


/* =========================================================
   6. START INTERVENTION
========================================================= */

function startIntervention(){

    alert(

        "VRRITTAM Intervention Started.\n\n" +

        "Subject: " +
        interventionProfile.subject +

        "\nTopic: " +
        interventionProfile.topic +

        "\nDuration: " +
        interventionPlan.duration +

        "\nQuestions: " +
        interventionPlan.practiceQuestions

    );


    console.log(
        "Intervention started:",
        interventionProfile.topic
    );

}


/* =========================================================
   7. INTERVENTION OUTCOME
========================================================= */

const interventionOutcome = {

    beforeScore:
        interventionProfile.currentMastery,

    afterScore: null,

    status:
        "Pending Re-check"

};


/* =========================================================
   8. RECORD INTERVENTION RESULT
========================================================= */

function recordInterventionResult(newScore){

    interventionOutcome.afterScore =
        newScore;


    if(
        newScore >=
        interventionProfile.targetMastery
    ){

        interventionOutcome.status =
            "Gap Reduced";

    }

    else if(
        newScore >
        interventionOutcome.beforeScore
    ){

        interventionOutcome.status =
            "Improving";

    }

    else{

        interventionOutcome.status =
            "Needs Further Support";

    }


    console.log(
        "Intervention Outcome:",
        interventionOutcome
    );

}


/* =========================================================
   9. DISPLAY OUTCOME
========================================================= */

function showInterventionOutcome(){

    console.log(
        "========== INTERVENTION OUTCOME =========="
    );

    console.log(
        "Before:",
        interventionOutcome.beforeScore + "%"
    );

    console.log(
        "After:",
        interventionOutcome.afterScore === null
            ? "Pending"
            : interventionOutcome.afterScore + "%"
    );

    console.log(
        "Status:",
        interventionOutcome.status
    );

    console.log(
        "=========================================="
    );

}


/* =========================================================
   10. PHASE 2.3 ENGINE
========================================================= */

function initializeInterventionEngine(){

    showIntervention();

    showInterventionOutcome();


    console.log(
        "VRRITTAM Phase 2.3 Intervention Engine Ready"
    );

}


/* =========================================================
   11. START PHASE 2.3 AFTER PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        initializeInterventionEngine();

    }
);


/* =========================================================
   PHASE 2.3 STATUS
========================================================= */

console.log(
    "Phase 2.3: Learning Gap → Intervention Engine ACTIVE"
);

/* =========================================================
   PHASE 2.3B
   GUIDED INTERVENTION PRACTICE ENGINE
========================================================= */


/* =========================================================
   1. INTERVENTION QUESTIONS
========================================================= */

const interventionQuestions = [

    {
        question:
            "What is 1/2 + 1/4 ?",

        options: [
            "2/6",
            "3/4",
            "1/6",
            "2/4"
        ],

        answer: 1
    },


    {
        question:
            "What is 3/4 - 1/4 ?",

        options: [
            "1/2",
            "2/4",
            "3/8",
            "1/4"
        ],

        answer: 0
    },


    {
        question:
            "What is 2/3 + 1/3 ?",

        options: [
            "2/6",
            "1",
            "3/6",
            "2/3"
        ],

        answer: 1
    },


    {
        question:
            "Which fraction is greater?",

        options: [
            "1/4",
            "3/4",
            "1/2",
            "2/4"
        ],

        answer: 1
    },


    {
        question:
            "What is 5/6 - 2/6 ?",

        options: [
            "3/6",
            "2/6",
            "1/6",
            "7/6"
        ],

        answer: 0
    }

];


/* =========================================================
   2. PRACTICE STATE
========================================================= */

let interventionState = {

    currentQuestion: 0,

    score: 0,

    completed: false

};


/* =========================================================
   3. CREATE PRACTICE PANEL
========================================================= */

function createInterventionPanel(){

    const existing =
        document.getElementById(
            "interventionPracticePanel"
        );


    if(existing){

        existing.remove();

    }


    const panel =
        document.createElement("div");


    panel.id =
        "interventionPracticePanel";


    panel.innerHTML = `

        <div style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.65);
            z-index:9999;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:white;
                width:100%;
                max-width:720px;
                max-height:90vh;
                overflow-y:auto;
                border-radius:20px;
                padding:30px;
                box-sizing:border-box;
                box-shadow:0 15px 50px rgba(0,0,0,0.30);
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
                            color:#0B5ED7;
                        ">

                            🎯 VRRITTAM Guided Practice

                        </h2>

                        <p style="
                            margin:8px 0 0;
                            color:#666;
                        ">

                            Mathematics • Fractions

                        </p>

                    </div>


                    <button
                        type="button"
                        onclick="closeIntervention()"
                        style="
                            border:none;
                            background:#f1f3f5;
                            border-radius:50%;
                            width:40px;
                            height:40px;
                            cursor:pointer;
                            font-size:18px;
                        ">

                        ✕

                    </button>

                </div>


                <div id="interventionProgress"
                     style="
                        background:#EEF5FF;
                        padding:12px 15px;
                        border-radius:10px;
                        margin-bottom:20px;
                        font-weight:bold;
                        color:#0B5ED7;
                     ">

                </div>


                <div id="interventionQuestion">

                </div>


                <div id="interventionFeedback"
                     style="
                        margin-top:20px;
                     ">

                </div>


                <div id="interventionControls"
                     style="
                        margin-top:20px;
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                     ">

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(panel);


    renderInterventionQuestion();

}


/* =========================================================
   4. RENDER CURRENT QUESTION
========================================================= */

function renderInterventionQuestion(){

    const questionBox =
        document.getElementById(
            "interventionQuestion"
        );


    const progressBox =
        document.getElementById(
            "interventionProgress"
        );


    const feedbackBox =
        document.getElementById(
            "interventionFeedback"
        );


    const controlsBox =
        document.getElementById(
            "interventionControls"
        );


    if(!questionBox){

        return;

    }


    const index =
        interventionState.currentQuestion;


    const total =
        interventionQuestions.length;


    const current =
        interventionQuestions[index];


    progressBox.innerHTML =

        `Question ${index + 1} of ${total}
         &nbsp; • &nbsp;
         Score: ${interventionState.score}/${total}`;


    questionBox.innerHTML = `

        <div style="
            background:#ffffff;
            border:1px solid #e3e8ef;
            border-radius:15px;
            padding:25px;
        ">

            <div style="
                color:#666;
                font-size:14px;
                margin-bottom:10px;
            ">

                Guided Practice

            </div>


            <h3 style="
                font-size:22px;
                line-height:1.5;
                color:#222;
                margin-bottom:20px;
            ">

                ${current.question}

            </h3>


            <div id="interventionOptions">

            </div>

        </div>

    `;


    feedbackBox.innerHTML = "";


    controlsBox.innerHTML = "";


    const optionsBox =
        document.getElementById(
            "interventionOptions"
        );


    current.options.forEach(
        function(option, optionIndex){

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.textContent =
                option;


            button.style.cssText = `

                display:block;
                width:100%;
                text-align:left;
                padding:15px;
                margin-bottom:12px;
                border:2px solid #dce3ec;
                background:#fff;
                border-radius:10px;
                cursor:pointer;
                font-size:17px;
                transition:0.2s;

            `;


            button.onmouseover =
                function(){

                    button.style.borderColor =
                        "#0B5ED7";

                    button.style.background =
                        "#F3F8FF";

                };


            button.onmouseout =
                function(){

                    button.style.borderColor =
                        "#dce3ec";

                    button.style.background =
                        "#fff";

                };


            button.onclick =
                function(){

                    checkInterventionAnswer(
                        optionIndex
                    );

                };


            optionsBox.appendChild(button);

        }
    );

}


/* =========================================================
   5. CHECK ANSWER
========================================================= */

function checkInterventionAnswer(
    selectedAnswer
){

    const index =
        interventionState.currentQuestion;


    const current =
        interventionQuestions[index];


    const feedbackBox =
        document.getElementById(
            "interventionFeedback"
        );


    const controlsBox =
        document.getElementById(
            "interventionControls"
        );


    const optionButtons =
        document.querySelectorAll(
            "#interventionOptions button"
        );


    optionButtons.forEach(
        function(button){

            button.disabled =
                true;

            button.style.cursor =
                "default";

        }
    );


    const isCorrect =
        selectedAnswer === current.answer;


    if(isCorrect){

        interventionState.score++;


        feedbackBox.innerHTML = `

            <div style="
                background:#ECFFF2;
                border-left:5px solid #16A34A;
                padding:15px;
                border-radius:10px;
                color:#166534;
                font-weight:bold;
            ">

                ✅ Correct!

                <div style="
                    margin-top:6px;
                    font-weight:normal;
                ">

                    Good work. Keep going.

                </div>

            </div>

        `;

    }

    else{

        feedbackBox.innerHTML = `

            <div style="
                background:#FFF5F5;
                border-left:5px solid #DC2626;
                padding:15px;
                border-radius:10px;
                color:#991B1B;
            ">

                ❌ Not quite.

                <div style="
                    margin-top:6px;
                ">

                    Correct answer:
                    <b>
                        ${current.options[current.answer]}
                    </b>

                </div>

                <div style="
                    margin-top:6px;
                    color:#555;
                    font-weight:normal;
                ">

                    Don't worry. This is a learning opportunity.

                </div>

            </div>

        `;

    }


    if(
        index <
        interventionQuestions.length - 1
    ){

        controlsBox.innerHTML = `

            <button
                type="button"
                onclick="nextInterventionQuestion()"
                style="
                    width:100%;
                    padding:14px;
                    border:none;
                    border-radius:10px;
                    background:#0B5ED7;
                    color:white;
                    font-size:16px;
                    font-weight:bold;
                    cursor:pointer;
                ">

                Next Question →

            </button>

        `;

    }

    else{

        interventionState.completed =
            true;


        controlsBox.innerHTML = `

            <button
                type="button"
                onclick="showInterventionResult()"
                style="
                    width:100%;
                    padding:14px;
                    border:none;
                    border-radius:10px;
                    background:#0B5ED7;
                    color:white;
                    font-size:16px;
                    font-weight:bold;
                    cursor:pointer;
                ">

                View Practice Result

            </button>

        `;

    }

}


/* =========================================================
   6. NEXT QUESTION
========================================================= */

function nextInterventionQuestion(){

    interventionState.currentQuestion++;


    renderInterventionQuestion();

}


/* =========================================================
   7. SHOW RESULT
========================================================= */

function showInterventionResult(){

    const total =
        interventionQuestions.length;


    const score =
        interventionState.score;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    let resultMessage = "";


    if(percentage >= 80){

        resultMessage =
            "Excellent improvement!";

    }

    else if(percentage >= 60){

        resultMessage =
            "Good progress. A little more practice will help.";

    }

    else{

        resultMessage =
            "More guided practice is recommended.";

    }


    const questionBox =
        document.getElementById(
            "interventionQuestion"
        );


    const feedbackBox =
        document.getElementById(
            "interventionFeedback"
        );


    const controlsBox =
        document.getElementById(
            "interventionControls"
        );


    document.getElementById(
        "interventionProgress"
    ).innerHTML =

        "Practice Completed ✓";


    questionBox.innerHTML = `

        <div style="
            text-align:center;
            padding:25px;
        ">

            <div style="
                font-size:50px;
                margin-bottom:10px;
            ">

                🎓

            </div>


            <h2 style="
                color:#0B5ED7;
                margin-bottom:15px;
            ">

                Guided Practice Complete

            </h2>


            <div style="
                font-size:38px;
                font-weight:bold;
                color:#0B5ED7;
                margin:20px 0;
            ">

                ${score}/${total}

            </div>


            <p style="
                font-size:18px;
                font-weight:bold;
            ">

                ${percentage}%

            </p>


            <p style="
                margin-top:15px;
                color:#555;
            ">

                ${resultMessage}

            </p>

        </div>

    `;


    feedbackBox.innerHTML = `

        <div style="
            background:#EEF8FF;
            padding:15px;
            border-radius:10px;
            border-left:5px solid #0B5ED7;
        ">

            <b>VRRITTAM AI Guidance</b>

            <p style="
                margin-top:8px;
            ">

                Your practice result will be used
                to decide the next learning action.

            </p>

        </div>

    `;


    controlsBox.innerHTML = `

        <button
            type="button"
            onclick="completeIntervention(${percentage})"
            style="
                width:100%;
                padding:14px;
                border:none;
                border-radius:10px;
                background:#16A34A;
                color:white;
                font-size:16px;
                font-weight:bold;
                cursor:pointer;
            ">

            Complete Intervention

        </button>

    `;

}


/* =========================================================
   8. COMPLETE INTERVENTION
========================================================= */

function completeIntervention(
    percentage
){

    const beforeScore =
        interventionProfile.currentMastery;


    let estimatedNewScore =
        beforeScore;


    /*
       Demo rule only.

       Practice performance is used
       to demonstrate the intervention
       feedback flow.

       It is NOT a real academic prediction.
    */

    if(percentage >= 80){

        estimatedNewScore =
            Math.min(
                100,
                beforeScore + 12
            );

    }

    else if(percentage >= 60){

        estimatedNewScore =
            Math.min(
                100,
                beforeScore + 6
            );

    }


    recordInterventionResult(
        estimatedNewScore
    );


    const questionBox =
        document.getElementById(
            "interventionQuestion"
        );


    const feedbackBox =
        document.getElementById(
            "interventionFeedback"
        );


    const controlsBox =
        document.getElementById(
            "interventionControls"
        );


    document.getElementById(
        "interventionProgress"
    ).innerHTML =

        "Intervention Completed ✓";


    questionBox.innerHTML = `

        <div style="
            text-align:center;
            padding:25px;
        ">

            <div style="
                font-size:50px;
            ">

                🌟

            </div>


            <h2 style="
                color:#0B5ED7;
                margin:15px 0;
            ">

                Learning Action Completed

            </h2>


            <p>

                Before Practice:
                <b>${beforeScore}%</b>

            </p>


            <p style="
                margin-top:10px;
            ">

                Practice Score:
                <b>${percentage}%</b>

            </p>


            <p style="
                margin-top:10px;
            ">

                Demo Re-check:
                <b>${estimatedNewScore}%</b>

            </p>

        </div>

    `;


    feedbackBox.innerHTML = `

        <div style="
            background:#ECFFF2;
            border-left:5px solid #16A34A;
            padding:15px;
            border-radius:10px;
        ">

            <b>AI Intervention Result</b>

            <p style="
                margin-top:8px;
            ">

                ${interventionOutcome.status}

            </p>

        </div>

    `;


    controlsBox.innerHTML = `

        <button
            type="button"
            onclick="closeIntervention()"
            style="
                width:100%;
                padding:14px;
                border:none;
                border-radius:10px;
                background:#0B5ED7;
                color:white;
                font-size:16px;
                font-weight:bold;
                cursor:pointer;
            ">

            Return to AI Copilot

        </button>

    `;

}


/* =========================================================
   9. CLOSE INTERVENTION
========================================================= */

function closeIntervention(){

    const panel =
        document.getElementById(
            "interventionPracticePanel"
        );


    if(panel){

        panel.remove();

    }


    interventionState = {

        currentQuestion: 0,

        score: 0,

        completed: false

    };

}


/* =========================================================
   10. OVERRIDE OLD ALERT-BASED INTERVENTION
========================================================= */

function startIntervention(){

    interventionState = {

        currentQuestion: 0,

        score: 0,

        completed: false

    };


    createInterventionPanel();


    console.log(
        "VRRITTAM Guided Intervention Started"
    );

}


/* =========================================================
   PHASE 2.3B STATUS
========================================================= */

console.log(
    "Phase 2.3B: Guided Intervention Practice Engine ACTIVE"
);

/* =========================================================
   PHASE 2.3C
   PARENT AI GUIDANCE ENGINE
   VRRITTAM AI COPILOT V2.0
========================================================= */


/* =========================================================
   1. PARENT GUIDANCE DATA
========================================================= */

const parentGuidance = {

    studentName: student.name,

    focusSubject: "Mathematics",

    focusTopic: "Fractions",

    mastery: 62,

    supportLevel: "Additional Practice Recommended",

    recommendedDuration: "15 Minutes",

    guidance:
        "A short and calm revision session may help strengthen this topic.",

    homeActivity:
        "Ask the student to solve 5 simple fraction problems and discuss the answers together.",

    reminder:
        "Consider supporting today's Mathematics revision."

};


/* =========================================================
   2. SAFE PARENT GUIDANCE
========================================================= */

function getParentGuidance(){

    return {

        subject: parentGuidance.focusSubject,

        topic: parentGuidance.focusTopic,

        mastery: parentGuidance.mastery,

        supportLevel: parentGuidance.supportLevel,

        duration: parentGuidance.recommendedDuration,

        guidance: parentGuidance.guidance,

        activity: parentGuidance.homeActivity,

        reminder: parentGuidance.reminder

    };

}


/* =========================================================
   3. PARENT SAFETY CHECK
========================================================= */

function parentGuidanceSafetyCheck(){

    return {

        safe: true,

        message:
            "Guidance is academic-support oriented and does not provide psychological or medical diagnosis."

    };

}


/* =========================================================
   4. BUILD PARENT GUIDANCE
========================================================= */

function buildParentGuidance(){

    const safety =
        parentGuidanceSafetyCheck();


    if(!safety.safe){

        return {

            status: false,

            message:
                "Parent guidance is temporarily unavailable."

        };

    }


    const guidance =
        getParentGuidance();


    return {

        status: true,

        data: guidance

    };

}


/* =========================================================
   5. DISPLAY PARENT AI GUIDANCE
========================================================= */

function showParentAIGuidance(){

    const section =
        document.getElementById("parentAIGuidanceBox");


    if(!section){

        console.log(
            "Parent AI Guidance display area not found."
        );

        return;

    }


    const result =
        buildParentGuidance();


    if(!result.status){

        section.innerHTML = `

            <p style="color:#dc2626;font-weight:bold;">

                ${result.message}

            </p>

        `;

        return;

    }


    const data =
        result.data;


    section.innerHTML = `

        <div class="parent-guidance-card">

            <h3>
                👨‍👩‍👧 Parent AI Guidance
            </h3>


            <p>

                <b>Student:</b>
                ${parentGuidance.studentName}

            </p>


            <p>

                <b>Subject:</b>
                ${data.subject}

            </p>


            <p>

                <b>Focus Topic:</b>
                ${data.topic}

            </p>


            <p>

                <b>Current Mastery:</b>
                ${data.mastery}%

            </p>


            <p>

                <b>Support Level:</b>
                ${data.supportLevel}

            </p>


            <hr>


            <p>

                <b>Recommended Support:</b>

            </p>

            <p>

                ${data.guidance}

            </p>


            <p>

                <b>Suggested Duration:</b>
                ${data.duration}

            </p>


            <hr>


            <p>

                <b>🏠 Home Activity:</b>

            </p>

            <p>

                ${data.activity}

            </p>


            <hr>


            <p>

                <b>🔔 Parent Reminder:</b>

            </p>

            <p>

                ${data.reminder}

            </p>


            <p style="
                margin-top:15px;
                color:#15803d;
                font-weight:bold;
            ">

                ✅ Academic support guidance only

            </p>

        </div>

    `;

}


/* =========================================================
   6. PARENT SUPPORT ACTION
========================================================= */

function startParentSupport(){

    alert(

        "VRRITTAM Parent Support\n\n" +

        "Subject: " +
        parentGuidance.focusSubject +

        "\nTopic: " +
        parentGuidance.focusTopic +

        "\nDuration: " +
        parentGuidance.recommendedDuration

    );

}


/* =========================================================
   7. PARENT GUIDANCE INITIALIZATION
========================================================= */

function initializeParentGuidance(){

    showParentAIGuidance();

    console.log(
        "VRRITTAM Parent AI Guidance Engine Ready"
    );

}


/* =========================================================
   8. PHASE 2.3C STATUS
========================================================= */

console.log(
    "Phase 2.3C: Parent AI Guidance Engine ACTIVE"
);

/* =========================================================
   VRRITTAM AI COPILOT V2.0
   PHASE 2.4A
   STUDENT AI ANALYTICS FOUNDATION
========================================================= */


/* =========================================================
   1. STUDENT ANALYTICS DATA
========================================================= */

const studentAnalytics = {

    studentName: "Arun Kumar",

    className: "Class 8 - A",

    academicYear: "2026 - 2027",

    attendance: 96,

    subjects: {

        Tamil: 78,

        English: 82,

        Mathematics: 88,

        Science: 84,

        "Social Science": 76

    },

    learningProgress: {

        weekly: 78,

        monthly: 81,

        overall: 84

    },

    learningGap: {

        subject: "Mathematics",

        topic: "Fractions",

        mastery: 62

    }

};


/* =========================================================
   2. CALCULATE SUBJECT AVERAGE
========================================================= */

function calculateSubjectAverage(){

    const subjects =
        studentAnalytics.subjects;

    const values =
        Object.values(subjects);

    const total =
        values.reduce(
            function(sum,value){
                return sum + value;
            },
            0
        );

    return (
        total / values.length
    ).toFixed(1);

}


/* =========================================================
   3. FIND STRONGEST SUBJECT
========================================================= */

function getStrongestSubject(){

    const subjects =
        studentAnalytics.subjects;

    let strongestSubject = "";

    let highestScore = -1;

    for(
        const subject in subjects
    ){

        if(
            subjects[subject] >
            highestScore
        ){

            highestScore =
                subjects[subject];

            strongestSubject =
                subject;

        }

    }

    return {

        subject: strongestSubject,

        score: highestScore

    };

}


/* =========================================================
   4. FIND SUBJECT NEEDING SUPPORT
========================================================= */

function getSupportSubject(){

    const subjects =
        studentAnalytics.subjects;

    let supportSubject = "";

    let lowestScore = Infinity;

    for(
        const subject in subjects
    ){

        if(
            subjects[subject] <
            lowestScore
        ){

            lowestScore =
                subjects[subject];

            supportSubject =
                subject;

        }

    }

    return {

        subject: supportSubject,

        score: lowestScore

    };

}


/* =========================================================
   5. LEARNING PERFORMANCE LEVEL
========================================================= */

function getAnalyticsPerformanceLevel(){

    const average =
        parseFloat(
            calculateSubjectAverage()
        );


    if(average >= 90){

        return "Excellent";

    }


    if(average >= 80){

        return "Very Good";

    }


    if(average >= 70){

        return "Good";

    }


    if(average >= 60){

        return "Needs Support";

    }


    return "Requires Attention";

}


/* =========================================================
   6. AI ANALYTICS SUMMARY
========================================================= */

function generateAIAnalyticsSummary(){

    const average =
        calculateSubjectAverage();

    const strongest =
        getStrongestSubject();

    const support =
        getSupportSubject();

    const level =
        getAnalyticsPerformanceLevel();


    return {

        averageScore: average,

        strongestSubject:
            strongest.subject,

        strongestScore:
            strongest.score,

        supportSubject:
            support.subject,

        supportScore:
            support.score,

        performanceLevel:
            level,

        attendance:
            studentAnalytics.attendance

    };

}


/* =========================================================
   7. DISPLAY AI ANALYTICS
========================================================= */

function showStudentAIAnalytics(){

    const analytics =
        generateAIAnalyticsSummary();


    console.log(
        "======================================"
    );

    console.log(
        "VRRITTAM STUDENT AI ANALYTICS"
    );

    console.log(
        "======================================"
    );

    console.log(
        "Student : " +
        studentAnalytics.studentName
    );

    console.log(
        "Average Score : " +
        analytics.averageScore +
        "%"
    );

    console.log(
        "Attendance : " +
        analytics.attendance +
        "%"
    );

    console.log(
        "Strongest Subject : " +
        analytics.strongestSubject +
        " (" +
        analytics.strongestScore +
        "%)"
    );

    console.log(
        "Support Area : " +
        analytics.supportSubject +
        " (" +
        analytics.supportScore +
        "%)"
    );

    console.log(
        "Performance Level : " +
        analytics.performanceLevel
    );

    console.log(
        "Learning Gap : " +
        studentAnalytics.learningGap.subject +
        " - " +
        studentAnalytics.learningGap.topic +
        " (" +
        studentAnalytics.learningGap.mastery +
        "% mastery)"
    );

    console.log(
        "======================================"
    );

}


/* =========================================================
   8. SAFE AI INSIGHT
========================================================= */

function generateSafeAIAnalyticsInsight(){

    const analytics =
        generateAIAnalyticsSummary();


    if(
        analytics.supportScore < 70
    ){

        return (

            "VRRITTAM Insight: " +

            analytics.supportSubject +

            " may benefit from additional " +

            "practice and teacher guidance."

        );

    }


    if(
        analytics.averageScore >= 80
    ){

        return (

            "VRRITTAM Insight: " +

            "The student is showing steady " +

            "academic progress. Continue " +

            "regular practice and positive support."

        );

    }


    return (

        "VRRITTAM Insight: " +

        "The student is progressing. " +

        "Consistent practice and encouragement " +

        "can support further improvement."

    );

}


/* =========================================================
   9. STUDENT WELL-BEING SAFETY
========================================================= */

function getStudentWellbeingRule(){

    return (

        "VRRITTAM AI analytics are " +

        "supportive insights only. " +

        "They must not be used to diagnose, " +

        "label or pressure a student."

    );

}


/* =========================================================
   10. PARENT-SAFE ANALYTICS SUMMARY
========================================================= */

function generateParentSafeAnalytics(){

    const analytics =
        generateAIAnalyticsSummary();


    return {

        performance:
            analytics.performanceLevel,

        averageScore:
            analytics.averageScore,

        attendance:
            analytics.attendance,

        strength:
            analytics.strongestSubject,

        supportArea:
            analytics.supportSubject,

        message:
            "Encourage the student with positive " +
            "support and regular learning practice."

    };

}


/* =========================================================
   11. INITIALIZE PHASE 2.4A
========================================================= */

function initializeStudentAIAnalytics(){

    showStudentAIAnalytics();

    console.log(
        generateSafeAIAnalyticsInsight()
    );

    console.log(
        getStudentWellbeingRule()
    );

    console.log(
        "Parent Safe Analytics Ready"
    );

}


/* =========================================================
   12. PHASE STATUS
========================================================= */

initializeStudentAIAnalytics();


console.log(
    "Phase 2.4A: Student AI Analytics Foundation ACTIVE"
);

/* =========================================================
   VRRITTAM AI COPILOT V2.0
   PHASE 2.4B
   STUDENT AI ANALYTICS DASHBOARD DISPLAY
   CLEAN CONSOLIDATED VERSION
========================================================= */


/* =========================================================
   1. BUILD ANALYTICS DASHBOARD DATA
========================================================= */

function buildStudentAnalyticsDashboard(){

    const analytics =
        generateAIAnalyticsSummary();

    return {

        averageScore:
            analytics.averageScore,

        attendance:
            analytics.attendance,

        performanceLevel:
            analytics.performanceLevel,

        strongestSubject:
            analytics.strongestSubject,

        strongestScore:
            analytics.strongestScore,

        supportSubject:
            analytics.supportSubject,

        supportScore:
            analytics.supportScore,

        gapSubject:
            studentAnalytics.learningGap.subject,

        gapTopic:
            studentAnalytics.learningGap.topic,

        gapMastery:
            studentAnalytics.learningGap.mastery,

        insight:
            generateSafeAIAnalyticsInsight()

    };

}


/* =========================================================
   2. DISPLAY STUDENT AI ANALYTICS DASHBOARD
========================================================= */

function displayStudentAIAnalyticsDashboard(){

    const container =
        document.getElementById(
            "studentAIAnalyticsBox"
        );


    if(!container){

        console.warn(
            "VRRITTAM: studentAIAnalyticsBox not found."
        );

        return;

    }


    const dashboard =
        buildStudentAnalyticsDashboard();


    container.innerHTML = `


        <!-- =========================================
             ANALYTICS SUMMARY GRID
        ========================================== -->

        <div class="analytics-grid">


            <!-- ACADEMIC AVERAGE -->

            <div class="analytics-card">

                <div class="analytics-icon">
                    📊
                </div>

                <div class="analytics-label">
                    Academic Average
                </div>

                <div class="analytics-value">
                    ${dashboard.averageScore}%
                </div>

            </div>


            <!-- ATTENDANCE -->

            <div class="analytics-card">

                <div class="analytics-icon">
                    📅
                </div>

                <div class="analytics-label">
                    Attendance
                </div>

                <div class="analytics-value">
                    ${dashboard.attendance}%
                </div>

            </div>


            <!-- PERFORMANCE -->

            <div class="analytics-card">

                <div class="analytics-icon">
                    🧠
                </div>

                <div class="analytics-label">
                    Performance
                </div>

                <div class="analytics-value analytics-text">
                    ${dashboard.performanceLevel}
                </div>

            </div>


        </div>


        <!-- =========================================
             STRONGEST SUBJECT
        ========================================== -->

        <div class="analytics-detail-card analytics-strong">

            <h3>
                🏆 Strongest Subject
            </h3>

            <p>

                <strong>
                    ${dashboard.strongestSubject}
                </strong>

                — ${dashboard.strongestScore}%

            </p>

        </div>


        <!-- =========================================
             SUPPORT AREA
        ========================================== -->

        <div class="analytics-detail-card analytics-support">

            <h3>
                🎯 Support Area
            </h3>

            <p>

                <strong>
                    ${dashboard.supportSubject}
                </strong>

                — ${dashboard.supportScore}%

            </p>

        </div>


        <!-- =========================================
             LEARNING GAP
        ========================================== -->

        <div class="analytics-gap-card">

            <h3>
                📚 Learning Gap
            </h3>

            <p>

                <strong>
                    ${dashboard.gapSubject}
                </strong>

            </p>

            <p>

                Topic:

                <strong>
                    ${dashboard.gapTopic}
                </strong>

            </p>

            <p>

                Mastery:

                <strong>
                    ${dashboard.gapMastery}%
                </strong>

            </p>

            <div class="analytics-gap-status">

                Targeted learning support recommended

            </div>

        </div>


        <!-- =========================================
             AI INSIGHT
        ========================================== -->

        <div class="analytics-insight-card">

            <h3>
                💡 VRRITTAM AI Insight
            </h3>

            <p>

                ${dashboard.insight}

            </p>

            <div class="analytics-ai-status">

                🟢 AI Analytics Active

            </div>

        </div>


    `;


    console.log(
        "Phase 2.4B: Student AI Analytics Dashboard Display ACTIVE"
    );

}


/* =========================================================
   3. UPDATE EXISTING AI INSIGHT BOX
========================================================= */

function updateAIInsightFromAnalytics(){

    const insightBox =
        document.getElementById(
            "aiInsightBox"
        );


    if(!insightBox){

        return;

    }


    const analytics =
        buildStudentAnalyticsDashboard();


    insightBox.innerHTML = `

        <div class="analytics-ai-summary">

            <p>

                💡

                <strong>
                    VRRITTAM AI Insight
                </strong>

            </p>


            <p>

                ${analytics.insight}

            </p>


            <p>

                🎯 Learning Support Area:

                <strong>
                    ${analytics.gapSubject}
                </strong>

                —

                ${analytics.gapTopic}

            </p>


        </div>

    `;

}

/* =========================================================
   VRRITTAM AI COPILOT V2.0
   FINAL AI ENGINE INITIALIZATION
   PHASE 2.3C + PHASE 2.4A + PHASE 2.4B
   CORRECTED CONSOLIDATED VERSION
========================================================= */


/* =========================================================
   1. FINAL AI SYSTEM STATUS
========================================================= */

const vrrittamFinalAIStatus = {

    curriculumLock: true,

    aiSecurity: true,

    learningPassport: true,

    studentGuidance: true,

    interventionEngine: true,

    guidedPractice: true,

    parentGuidance: true,

    studentAnalytics: true,

    analyticsDashboard: true,

    finalIntegration: true

};


/* =========================================================
   2. FINAL AI INSIGHT DATA
========================================================= */

function generateFinalAIInsight(){

    /*
       Safety check
    */

    if(
        typeof studentAnalytics === "undefined"
    ){

        console.warn(
            "VRRITTAM: studentAnalytics not available."
        );

        return {

            averageScore: 0,

            strongestSubject: "N/A",

            strongestScore: 0,

            lowestSubject: "N/A",

            lowestScore: 0,

            learningGapSubject: "N/A",

            learningGapTopic: "N/A",

            learningGapMastery: 0,

            attendance: 0

        };

    }


    const average =
        typeof calculateSubjectAverage === "function"
            ? parseFloat(
                calculateSubjectAverage()
              )
            : 0;


    const strongest =
        typeof getStrongestSubject === "function"
            ? getStrongestSubject()
            : {
                subject: "N/A",
                score: 0
            };


    const support =
        typeof getSupportSubject === "function"
            ? getSupportSubject()
            : {
                subject: "N/A",
                score: 0
            };


    const gap =
        studentAnalytics.learningGap || {};


    return {

        averageScore:
            Number.isFinite(average)
                ? average
                : 0,

        strongestSubject:
            strongest.subject || "N/A",

        strongestScore:
            strongest.score || 0,

        lowestSubject:
            support.subject || "N/A",

        lowestScore:
            support.score || 0,

        learningGapSubject:
            gap.subject || "N/A",

        learningGapTopic:
            gap.topic || "N/A",

        learningGapMastery:
            gap.mastery || 0,

        attendance:
            studentAnalytics.attendance || 0

    };

}


/* =========================================================
   3. STUDENT-FACING AI MESSAGE
========================================================= */

function generateStudentFacingInsight(){

    const data =
        generateFinalAIInsight();


    return (

        "Your overall academic progress is " +

        data.averageScore +

        "%. Your strongest subject is " +

        data.strongestSubject +

        " at " +

        data.strongestScore +

        "%. " +

        "For targeted improvement, " +

        data.learningGapTopic +

        " in " +

        data.learningGapSubject +

        " currently has " +

        data.learningGapMastery +

        "% mastery. " +

        "A short guided practice session is recommended."

    );

}


/* =========================================================
   4. PARENT-FACING AI MESSAGE
========================================================= */

function generateParentFacingInsight(){

    const data =
        generateFinalAIInsight();


    return (

        "The student is maintaining an overall " +

        data.averageScore +

        "% academic average with " +

        data.attendance +

        "% attendance. " +

        "Additional academic support may be useful for " +

        data.learningGapTopic +

        " in " +

        data.learningGapSubject +

        ", where current topic mastery is " +

        data.learningGapMastery +

        "%. " +

        "Positive and consistent support is recommended."

    );

}


/* =========================================================
   5. FINAL AI SYSTEM STATUS
========================================================= */

function showVrrittamAIStatus(){

    console.log(
        "=========================================="
    );

    console.log(
        "VRRITTAM AI COPILOT V2.0"
    );

    console.log(
        "FINAL AI SYSTEM STATUS"
    );

    console.log(
        "=========================================="
    );


    Object.keys(
        vrrittamFinalAIStatus
    ).forEach(
        function(key){

            console.log(

                key +

                " : " +

                (
                    vrrittamFinalAIStatus[key]
                        ? "ACTIVE"
                        : "INACTIVE"
                )

            );

        }
    );


    console.log(
        "=========================================="
    );

}


/* =========================================================
   6. FINAL STUDENT AI INSIGHT
   SINGLE SOURCE OF TRUTH
========================================================= */

function updateFinalStudentAIInsight(){

    const box =
        document.getElementById(
            "aiInsightBox"
        );


    if(!box){

        console.warn(
            "VRRITTAM: aiInsightBox not found."
        );

        return;

    }


    const data =
        generateFinalAIInsight();


    box.innerHTML = `

        <div class="analytics-ai-summary">

            <h3>
                💡 VRRITTAM AI Insight
            </h3>


            <p>

                Your overall academic average is

                <strong>
                    ${data.averageScore}%
                </strong>.

            </p>


            <p>

                🏆 Strongest Subject:

                <strong>
                    ${data.strongestSubject}
                </strong>

                — ${data.strongestScore}%

            </p>


            <p>

                🎯 Learning Support:

                <strong>
                    ${data.learningGapSubject}
                </strong>

                —

                ${data.learningGapTopic}

                (${data.learningGapMastery}% mastery)

            </p>


            <p>

                📅 Attendance:

                <strong>
                    ${data.attendance}%
                </strong>

            </p>


            <div class="analytics-ai-status">

                🟢 AI Analytics Active

            </div>

        </div>

    `;

}


/* =========================================================
   7. FINAL PARENT GUIDANCE
   SINGLE SOURCE OF TRUTH
========================================================= */

function updateFinalParentGuidance(){

    const section =
        document.getElementById(
            "parentAIGuidanceBox"
        );


    if(!section){

        console.warn(
            "VRRITTAM: parentAIGuidanceBox not found."
        );

        return;

    }


    const data =
        generateFinalAIInsight();


    let studentName =
        "Student";


    if(
        typeof student !== "undefined" &&
        student &&
        student.name
    ){

        studentName =
            student.name;

    }


    section.innerHTML = `

        <div class="parent-guidance-card">

            <h3>
                👨‍👩‍👧 Parent AI Guidance
            </h3>


            <p>

                <b>Student:</b>

                ${studentName}

            </p>


            <p>

                <b>Academic Average:</b>

                ${data.averageScore}%

            </p>


            <p>

                <b>Attendance:</b>

                ${data.attendance}%

            </p>


            <hr>


            <p>

                <b>Learning Support Area:</b>

            </p>


            <p>

                ${data.learningGapSubject}

                —

                ${data.learningGapTopic}

            </p>


            <p>

                <b>Topic Mastery:</b>

                ${data.learningGapMastery}%

            </p>


            <hr>


            <p>

                ${generateParentFacingInsight()}

            </p>


            <p style="
                color:#15803d;
                font-weight:bold;
            ">

                ✅ Academic support guidance only

            </p>

        </div>

    `;

}


/* =========================================================
   8. SAFE ENGINE CALL
========================================================= */

function runVrrittamEngineStep(
    functionName
){

    try{

        if(
            typeof window[functionName] ===
            "function"
        ){

            window[functionName]();

            console.log(
                "VRRITTAM:",
                functionName,
                "✓"
            );

        }
        else{

            console.warn(
                "VRRITTAM:",
                functionName,
                "not available."
            );

        }

    }
    catch(error){

        console.error(
            "VRRITTAM:",
            functionName,
            "failed.",
            error
        );

    }

}


/* =========================================================
   9. FINAL ENGINE INITIALIZATION
========================================================= */

function initializeVrrittamAI(){

    /*
       Prevent duplicate initialization
    */

    if(
        window.vrrittamAIInitialized === true
    ){

        console.log(
            "VRRITTAM AI Copilot already initialized."
        );

        return;

    }


    window.vrrittamAIInitialized = true;


    console.log(
        "=========================================="
    );

    console.log(
        "Starting VRRITTAM AI Copilot V2.0..."
    );

    console.log(
        "=========================================="
    );


    /* -----------------------------------------------------
       EXISTING CORE ENGINES
    ----------------------------------------------------- */

    runVrrittamEngineStep(
        "loadStudentProfile"
    );

    runVrrittamEngineStep(
        "loadLearningState"
    );

    runVrrittamEngineStep(
        "loadNextAction"
    );

    runVrrittamEngineStep(
        "loadReminders"
    );

    runVrrittamEngineStep(
        "loadLearningGap"
    );

    runVrrittamEngineStep(
        "loadProgress"
    );


    /* -----------------------------------------------------
       STUDENT GUIDANCE
    ----------------------------------------------------- */

    runVrrittamEngineStep(
        "showStudentGuidance"
    );


    /* -----------------------------------------------------
       PARENT GUIDANCE
       FINAL VERSION ONLY
    ----------------------------------------------------- */

    updateFinalParentGuidance();


    /* -----------------------------------------------------
       STUDENT ANALYTICS DASHBOARD
       FINAL VERSION ONLY
    ----------------------------------------------------- */

    runVrrittamEngineStep(
        "displayStudentAIAnalyticsDashboard"
    );


    /* -----------------------------------------------------
       FINAL AI INSIGHT
       IMPORTANT:
       Do NOT call updateAIInsightFromAnalytics()
       here because this final function is the
       single source of truth for aiInsightBox.
    ----------------------------------------------------- */

    updateFinalStudentAIInsight();


    /* -----------------------------------------------------
       SYSTEM STATUS
    ----------------------------------------------------- */

    showVrrittamAIStatus();


    /* -----------------------------------------------------
       CONSOLE AI INSIGHTS
    ----------------------------------------------------- */

    try{

        console.log(
            "Student AI Insight:",
            generateStudentFacingInsight()
        );

        console.log(
            "Parent AI Insight:",
            generateParentFacingInsight()
        );

    }
    catch(error){

        console.error(
            "VRRITTAM AI insight generation error:",
            error
        );

    }


    console.log(
        "=========================================="
    );

    console.log(
        "VRRITTAM AI Copilot V2.0 READY ✓"
    );

    console.log(
        "=========================================="

    );

}


/* =========================================================
   10. SAFE PAGE INITIALIZATION
========================================================= */

function startVrrittamAI(){

    if(
        document.readyState === "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            initializeVrrittamAI,
            {
                once: true
            }
        );

    }
    else{

        initializeVrrittamAI();

    }

}


/* =========================================================
   11. START VRRITTAM AI
========================================================= */

startVrrittamAI();


/* =========================================================
   FINAL INTEGRATION STATUS
========================================================= */

console.log(
    "=========================================="
);

console.log(
    "VRRITTAM AI COPILOT V2.0"
);

console.log(
    "FINAL INTEGRATION ACTIVE"
);

console.log(
    "Data → AI Insight → Learning Gap"
);

console.log(
    "Learning Gap → Intervention"
);

console.log(
    "Intervention → Guided Practice"
);

console.log(
    "Guided Practice → Outcome"
);

console.log(
    "Outcome → Parent Support"
);

console.log(
    "=========================================="
);