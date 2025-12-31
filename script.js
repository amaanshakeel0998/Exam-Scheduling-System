
// ==========================================
// Global State
// ==========================================
const state = {
    departments: [],
    exams: [],
    invigilators: [],
    rooms: [],
    config: {
        startDate: null,
        endDate: null,
        timeSlots: []
    },
    generatedDatesheet: [],
    conflicts: []
};

// Course mappings for dropdown and auto-selection
const courseMappings = [
    { code: "CS-308", name: "Artificial Intelligence" },
    { code: "GEN-102", name: "Application of ICT (Theory)" },
    { code: "GEN-102", name: "Application of ICT (Lab)" },
    { code: "MATH-123", name: "Calculus & Analytical Geometry" },
    { code: "GEN-103", name: "Quantitative Reasoning-I" },
    { code: "GEN-204", name: "Quantitative Reasoning-II" },
    { code: "CS-103", name: "Quantitative Reasoning(Discrete Structure)" },
    { code: "MATH-105", name: "Basic Mathematics Deficiency-II" },
    { code: "CS-111", name: "Programming Fundamentals (Theory)" },
    { code: "CL-111", name: "Programming Fundamentals (Lab)" },
    { code: "CS-112", name: "Object Oriented Programming (Theory)" },
    { code: "CL-112", name: "Object Oriented Programming (Lab)" },
    { code: "GEN-107", name: "Functional English" },
    { code: "GEN-108", name: "Expository Writing" },
    { code: "ELL-113", name: "Introduction to Linguistics" },
    { code: "ELL-111", name: "Introduction to Literary Studies" },
    { code: "GEN-305", name: "Light Color & Imaging" },
    { code: "CA-402", name: "Drawing From Observation & Material" },
    { code: "DE-113", name: "Visual Communication-I" },
    { code: "CA-403", name: "Figure & Perspective Drawing" },
    { code: "ACT-417", name: "Financial Accounting" },
    { code: "MGT-114", name: "Fundamentals of Accounting" },
    { code: "GEN-302", name: "Environmental Sciences" },
    { code: "MGT-111", name: "Introduction to Business" },
    { code: "CA-410", name: "History of Arts in Ancient Civilization" },
    { code: "GEN-304", name: "Civics & Community Engagement" },
    { code: "GEN-202", name: "Pakistan Studies" },
    { code: "PSY-122", name: "Cognitive Psychology" },
    { code: "PSY-322", name: "Social Psychology" },
    { code: "PSY-224", name: "Ethical Issues in Psychology" },
    { code: "PSY-112", name: "Introduction to Psychology" },
    { code: "GEN-104", name: "Ideology & Constitution of Pakistan" },
    { code: "GEN-203", name: "Islamic Studies" },
    { code: "AHU-109", name: "Material & Process" },
    { code: "CA-401", name: "Fundamentals of Drawing" },
    { code: "MATH-104", name: "Basic Mathematics Deficiency-I" },
    { code: "CS-307", name: "Computer Networks" },
    { code: "MGT-212", name: "Business Communication & Report Writing" },
    { code: "MGT-213", name: "Human Resource Management" },
    { code: "GEN-101", name: "Understanding of Holy Quran-I" }
];

// ==========================================
// Initialization & Theme
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Datesheet Generator Starting...');
    initializeTheme();
    initializeCourseDropdown();
    setupEventListeners();
    setupNavigation();
    initIssueReporting();
});

function initializeCourseDropdown() {
    const select = document.getElementById('course-code');
    if(!select) return;
    
    // Get unique codes
    const codes = [...new Set(courseMappings.map(m => m.code))].sort();
    
    codes.forEach(code => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.innerText = code;
        select.appendChild(opt);
    });
}

// Theme Presets
const themePresets = {
    default: { 
        header: '#4a90e2', 
        body: '#f5f7fa', 
        card: '#ffffff', 
        accent: '#4a90e2',
        text: '#333333',
        textLight: '#6c757d',
        border: '#dde1e6',
        inputBg: '#ffffff',
        heading: '#2c3e50',
        hoverBg: '#ecf0f1'
    },
    purple: { 
        header: '#667eea', 
        body: '#f3f4ff', 
        card: '#ffffff', 
        accent: '#667eea',
        text: '#333333',
        textLight: '#6c757d',
        border: '#e0e7ff',
        inputBg: '#ffffff',
        heading: '#4338ca',
        hoverBg: '#eef2ff'
    },
    green: { 
        header: '#56ab2f', 
        body: '#f0f8f0', 
        card: '#ffffff', 
        accent: '#56ab2f',
        text: '#333333',
        textLight: '#6c757d',
        border: '#dbe8db',
        inputBg: '#ffffff',
        heading: '#2d6a4f',
        hoverBg: '#e8f5e9'
    },
    orange: { 
        header: '#f46b45', 
        body: '#fff5f0', 
        card: '#ffffff', 
        accent: '#f46b45',
        text: '#333333',
        textLight: '#6c757d',
        border: '#fde6d8',
        inputBg: '#ffffff',
        heading: '#c2410c',
        hoverBg: '#fff7ed'
    },
    red: { 
        header: '#eb3349', 
        body: '#fff0f0', 
        card: '#ffffff', 
        accent: '#eb3349',
        text: '#333333',
        textLight: '#6c757d',
        border: '#fecaca',
        inputBg: '#ffffff',
        heading: '#b91c1c',
        hoverBg: '#fef2f2'
    },
    dark: { 
        header: '#1e293b', 
        body: '#0f172a', 
        card: '#1e293b', 
        accent: '#38bdf8',
        text: '#e2e8f0',
        textLight: '#94a3b8',
        border: '#334155',
        inputBg: '#334155',
        heading: '#f8fafc',
        hoverBg: '#334155'
    }
};

function initializeTheme() {
    loadThemeFromStorage();
    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleThemePanel);
    document.getElementById('close-theme-btn')?.addEventListener('click', closeThemePanel);
    
    // Color pickers sync & instant apply
    ['header', 'body', 'card', 'accent'].forEach(type => {
        document.getElementById(`${type}-color`)?.addEventListener('input', function() {
            document.getElementById(`${type}-color-text`).value = this.value;
            const theme = getCurrentCustomTheme();
            applyTheme(theme);
            saveThemeToStorage(theme);
        });
    });

    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = themePresets[btn.dataset.preset];
            if(preset) {
                applyTheme(preset);
                saveThemeToStorage(preset);
            }
        });
    });

    document.getElementById('reset-theme-btn')?.addEventListener('click', () => {
        applyTheme(themePresets.default);
        saveThemeToStorage(themePresets.default);
    });
}

function getCurrentCustomTheme() {
    return {
        header: document.getElementById('header-color').value,
        body: document.getElementById('body-color').value,
        card: document.getElementById('card-color').value,
        accent: document.getElementById('accent-color').value,
        text: '#333333',
        textLight: '#6c757d',
        border: '#dde1e6',
        inputBg: '#ffffff',
        heading: '#2c3e50',
        hoverBg: '#ecf0f1'
    };
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.header);
    root.style.setProperty('--secondary-color', theme.accent);
    root.style.setProperty('--bg-color', theme.body);
    root.style.setProperty('--card-bg', theme.card);
    
    // New Theme Variables
    if(theme.text) root.style.setProperty('--text-color', theme.text);
    if(theme.textLight) root.style.setProperty('--text-light', theme.textLight);
    if(theme.border) root.style.setProperty('--border-color', theme.border);
    if(theme.inputBg) root.style.setProperty('--input-bg', theme.inputBg);
    if(theme.heading) root.style.setProperty('--heading-color', theme.heading);
    if(theme.hoverBg) root.style.setProperty('--hover-bg', theme.hoverBg);
    
    // Update inputs
    document.getElementById('header-color').value = theme.header;
    document.getElementById('header-color-text').value = theme.header;
    document.getElementById('body-color').value = theme.body;
    document.getElementById('body-color-text').value = theme.body;
    document.getElementById('card-color').value = theme.card;
    document.getElementById('card-color-text').value = theme.card;
    document.getElementById('accent-color').value = theme.accent;
    document.getElementById('accent-color-text').value = theme.accent;
}

function loadThemeFromStorage() {
    const saved = localStorage.getItem('university_theme');
    if(saved) applyTheme(JSON.parse(saved));
}

function saveThemeToStorage(theme) {
    localStorage.setItem('university_theme', JSON.stringify(theme));
}

function toggleThemePanel() {
    document.getElementById('theme-panel').classList.toggle('active');
}

function closeThemePanel() {
    document.getElementById('theme-panel').classList.remove('active');
}

// ==========================================
// UI Logic & Event Listeners
// ==========================================
function setupNavigation() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if(menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if(sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== menuToggle) {
                sidebar.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            const sectionId = btn.dataset.section + '-section';
            document.getElementById(sectionId).classList.add('active');

            // Close mobile menu after selection
            if(sidebar) sidebar.classList.remove('active');
        });
    });
}

function setupEventListeners() {
    // 0. Global Click-to-Show Datalist Fix
    document.querySelectorAll('input[list]').forEach(input => {
        input.addEventListener('click', function() {
            // Only clear if user clicks an already focused input or just to show options
            this.value = ''; 
            this.dispatchEvent(new Event('input'));
        });
    });

    // 1. Time Slots
    document.getElementById('add-timeslot-btn').addEventListener('click', addTimeSlot);
    
    // 2. Departments
    document.getElementById('add-dept-btn').addEventListener('click', addDepartment);

    // 3. Exams
    document.getElementById('add-exam-btn').addEventListener('click', addExam);
    document.getElementById('add-exam-dept-btn').addEventListener('click', addExamDeptTemp);
    document.getElementById('course-name').addEventListener('input', handleCourseNameInput);

    // 4. Invigilators
    document.getElementById('add-invigilator-btn').addEventListener('click', addInvigilator);
    document.getElementById('add-available-date').addEventListener('click', addAvailableDateTemp);

    // 5. Rooms
    document.getElementById('add-room-btn').addEventListener('click', addRoom);

    // 6. Generate
    document.getElementById('generate-btn').addEventListener('click', generateDatesheet);
    document.getElementById('regenerate-btn').addEventListener('click', generateDatesheet);

    // 7. Exports
    document.getElementById('export-pdf-btn').addEventListener('click', exportPDF);
    document.getElementById('export-csv-btn').addEventListener('click', exportCSV);
    
    // 8. Modal
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('confirmation-modal').classList.remove('active');
    });
    document.getElementById('cancel-confirm-btn').addEventListener('click', () => {
        document.getElementById('confirmation-modal').classList.remove('active');
    });
}

// --- Helper for Confirmation ---
function showConfirmation(message, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    const msgEl = document.getElementById('confirmation-message');
    const confirmBtn = document.getElementById('confirm-action-btn');
    
    // Set message
    msgEl.innerText = message;
    modal.classList.add('active');

    // Replace button to remove old listeners
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    // Add new listener
    newConfirmBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        onConfirm();
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Data Management Helpers ---

// Time Slots
function addTimeSlot() {
    const input = document.getElementById('new-timeslot');
    const val = input.value.trim();
    if(val) {
        showConfirmation(`Add time slot "${val}"?`, () => {
            state.config.timeSlots.push(val);
            renderTags('time-slots-container', state.config.timeSlots, (idx) => {
                // Deletion also needs confirmation? Maybe not for deleting tags, 
                // but let's keep it simple for now. 
                // If user asked "confirmation popup for EVERY entry", maybe deletions too.
                // But typically entry means input.
                state.config.timeSlots.splice(idx, 1);
                renderTags('time-slots-container', state.config.timeSlots, null); // Re-render
            });
            input.value = '';
        });
    }
}

// Departments
function addDepartment() {
    const input = document.getElementById('dept-input');
    const val = input.value.trim();
    if(val && !state.departments.includes(val)) {
        showConfirmation(`Add department "${val}"?`, () => {
            state.departments.push(val);
            renderTags('dept-list', state.departments, (idx) => {
                state.departments.splice(idx, 1);
                updateDeptSelect();
                renderTags('dept-list', state.departments, null);
            });
            updateDeptSelect();
            input.value = '';
        });
    }
}

function updateDeptSelect() {
    const select = document.getElementById('course-dept-select');
    select.innerHTML = '<option value="">Select Dept</option>';
    state.departments.forEach(dept => {
        const opt = document.createElement('option');
        opt.value = dept;
        opt.innerText = dept;
        select.appendChild(opt);
    });
}

// Exams
let tempExamDepts = [];
function addExamDeptTemp() {
    const deptSelect = document.getElementById('course-dept-select');
    const val = deptSelect.value;
    if(val && !tempExamDepts.includes(val)) {
        tempExamDepts.push(val);
        renderTags('exam-depts-list', tempExamDepts, (idx) => {
            tempExamDepts.splice(idx, 1);
            renderTags('exam-depts-list', tempExamDepts, null);
        });
        deptSelect.value = '';
    }
}

function handleCourseNameInput() {
    const nameInput = document.getElementById('course-name');
    const codeSelect = document.getElementById('course-code');
    const selectedName = nameInput.value.trim();
    
    const mapping = courseMappings.find(m => m.name === selectedName);
    if(mapping) {
        codeSelect.value = mapping.code;
    } else {
        codeSelect.value = '';
    }
}

function addExam() {
    const name = document.getElementById('course-name').value.trim();
    const code = document.getElementById('course-code').value.trim();
    const count = parseInt(document.getElementById('student-count').value);

    if(name && code && tempExamDepts.length > 0 && count > 0) {
        showConfirmation(`Add exam "${code} - ${name}"?`, () => {
            state.exams.push({ 
                id: Date.now(), 
                name, 
                code, 
                depts: [...tempExamDepts], 
                count 
            });
            renderExamsList();
            // clear inputs
            document.getElementById('course-name').value = '';
            document.getElementById('course-code').value = '';
            document.getElementById('student-count').value = '';
            tempExamDepts = [];
            document.getElementById('exam-depts-list').innerHTML = '';
            document.getElementById('course-dept-select').value = '';
        });
    } else {
        alert('Please fill all exam fields correctly and add at least one department.');
    }
}

function renderExamsList() {
    const container = document.getElementById('exams-list');
    container.innerHTML = '';
    state.exams.forEach((exam, idx) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="item-details">
                <strong>${exam.code} - ${exam.name}</strong>
                <span>${exam.depts.join(', ')} | ${exam.count} Students</span>
            </div>
            <button class="btn-icon delete-btn" onclick="removeExam(${idx})"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(item);
    });
}
window.removeExam = function(idx) {
    // Optional: Confirm deletion
    if(confirm('Are you sure you want to remove this exam?')) {
        state.exams.splice(idx, 1);
        renderExamsList();
    }
};

// Invigilators
let tempAvailableDates = [];
function addAvailableDateTemp() {
    const dateInput = document.getElementById('invigilator-available-date');
    const val = dateInput.value;
    if(val && !tempAvailableDates.includes(val)) {
        // Just adding to a temp list, no need for full modal confirmation maybe?
        // But let's be consistent if requested.
        // showConfirmation(`Add available date ${val}?`, () => {
            tempAvailableDates.push(val);
            renderTags('available-dates-list', tempAvailableDates, (idx) => {
                tempAvailableDates.splice(idx, 1);
                renderTags('available-dates-list', tempAvailableDates, null);
            });
        // });
        // Commented out confirmation for sub-item to avoid annoyance, 
        // unless user complains.
        dateInput.value = '';
    }
}

function addInvigilator() {
    const name = document.getElementById('invigilator-name').value.trim();
    const maxDuties = parseInt(document.getElementById('max-duties').value);
    
    if(name && maxDuties > 0) {
        showConfirmation(`Add invigilator "${name}"?`, () => {
            state.invigilators.push({
                id: Date.now(),
                name,
                maxDuties,
                availableDates: [...tempAvailableDates],
                assignedDuties: 0 // Reset on generation
            });
            renderInvigilatorsList();
            
            // Reset inputs
            document.getElementById('invigilator-name').value = '';
            document.getElementById('max-duties').value = '';
            tempAvailableDates = [];
            document.getElementById('available-dates-list').innerHTML = '';
        });
    } else {
        alert('Please enter name and valid max duties.');
    }
}

function renderInvigilatorsList() {
    const container = document.getElementById('invigilators-list');
    container.innerHTML = '';
    state.invigilators.forEach((inv, idx) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="item-details">
                <strong>${inv.name}</strong>
                <span>Max: ${inv.maxDuties} | Avail: ${inv.availableDates.length} days</span>
            </div>
            <button class="btn-icon delete-btn" onclick="removeInvigilator(${idx})"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(item);
    });
}
window.removeInvigilator = function(idx) {
    if(confirm('Remove this invigilator?')) {
        state.invigilators.splice(idx, 1);
        renderInvigilatorsList();
    }
};

// Rooms
function addRoom() {
    const name = document.getElementById('room-name').value.trim();
    const capacity = parseInt(document.getElementById('room-capacity').value);

    if(name && capacity > 0) {
        showConfirmation(`Add room "${name}" (Cap: ${capacity})?`, () => {
            state.rooms.push({ id: Date.now(), name, capacity });
            renderRoomsList();
            document.getElementById('room-name').value = '';
            document.getElementById('room-capacity').value = '';
        });
    } else {
        alert('Please enter room name and capacity.');
    }
}

function renderRoomsList() {
    const container = document.getElementById('rooms-list');
    container.innerHTML = '';
    state.rooms.forEach((room, idx) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="item-details">
                <strong>${room.name}</strong>
                <span>Cap: ${room.capacity}</span>
            </div>
            <button class="btn-icon delete-btn" onclick="removeRoom(${idx})"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(item);
    });
}
window.removeRoom = function(idx) {
    if(confirm('Remove this room?')) {
        state.rooms.splice(idx, 1);
        renderRoomsList();
    }
};

// Generic Tag Renderer
function renderTags(containerId, items, removeCallback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach((item, idx) => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `<span>${item}</span>`;
        if(removeCallback) {
            const close = document.createElement('i');
            close.className = 'fas fa-times';
            close.onclick = () => removeCallback(idx);
            tag.appendChild(close);
        }
        container.appendChild(tag);
    });
}


// ==========================================
// Datesheet Generation Logic
// ==========================================

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let curr = new Date(startDate);
    const end = new Date(endDate);
    
    while(curr <= end) {
        dates.push(curr.toISOString().split('T')[0]);
        curr.setDate(curr.getDate() + 1);
    }
    return dates;
}

function generateDatesheet() {
    // 1. Validate Inputs
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;
    
    if(!start || !end || state.config.timeSlots.length === 0) {
        alert('Please set date range and at least one time slot.');
        return;
    }
    if(state.exams.length === 0) {
        alert('Please add at least one exam.');
        return;
    }
    if(state.rooms.length === 0) {
        alert('Please add at least one room.');
        return;
    }

    state.config.startDate = start;
    state.config.endDate = end;
    state.conflicts = [];
    state.generatedDatesheet = [];

    // Reset Assignments
    state.invigilators.forEach(inv => inv.assignedDuties = 0);
    
    const dates = getDatesInRange(start, end);
    const slots = state.config.timeSlots;
    
    // Create all possible slots (Date + Time)
    let availableSlots = [];
    dates.forEach(date => {
        slots.forEach(time => {
            availableSlots.push({ date, time, exams: [] });
        });
    });

    // Sort Exams (Largest first - harder to place)
    // Add Shuffle before sort to handle equal counts randomly
    const shuffledExams = shuffleArray([...state.exams]);
    const sortedExams = shuffledExams.sort((a, b) => b.count - a.count);

    // Greedy Allocation
    sortedExams.forEach(exam => {
        let placed = false;
        
        // Try to find a slot
        for (let slot of availableSlots) {
            
            // Check Room Availability
            const usedRoomsInSlot = slot.exams.map(e => e.room.id);
            let validRooms = state.rooms.filter(r => 
                !usedRoomsInSlot.includes(r.id) && r.capacity >= exam.count
            );

            if(validRooms.length === 0) continue; // No room available in this slot
            
            // Randomize room selection
            validRooms = shuffleArray(validRooms);

            // Check Invigilator Availability
            const busyInvigilatorsInSlot = slot.exams.map(e => e.invigilator?.id);
            let validInvigilators = state.invigilators.filter(inv => 
                !busyInvigilatorsInSlot.includes(inv.id) &&
                inv.assignedDuties < inv.maxDuties &&
                (inv.availableDates.length === 0 || inv.availableDates.includes(slot.date))
            );

            if(validInvigilators.length === 0 && state.invigilators.length > 0) {
                // strict invigilator check enabled if invigilators exist
                continue; 
            }
            
            // Randomize invigilator selection
            validInvigilators = shuffleArray(validInvigilators);

            // Assign
            const room = validRooms[0];
            const invigilator = validInvigilators.length > 0 ? validInvigilators[0] : null;

            if(invigilator) invigilator.assignedDuties++;
            
            slot.exams.push({
                exam: exam,
                room: room,
                invigilator: invigilator
            });

            state.generatedDatesheet.push({
                date: slot.date,
                time: slot.time,
                courseCode: exam.code,
                courseName: exam.name,
                depts: exam.depts,
                room: room.name,
                invigilator: invigilator ? invigilator.name : 'N/A',
                students: exam.count
            });

            placed = true;
            break;
        }

        if(!placed) {
            state.conflicts.push(`Could not schedule ${exam.code} (${exam.name}) - No available room/invigilator or capacity issue.`);
        }
    });

    renderDatesheet();
    renderConflicts();
    
    // Switch to view
    document.querySelector('.nav-item[data-section="datesheet"]').click();
}


// ==========================================
// Rendering
// ==========================================

function renderDatesheet() {
    const container = document.getElementById('datesheet-container');
    if(state.generatedDatesheet.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <p>No datesheet generated yet.</p>
            </div>`;
        return;
    }

    // Sort by Date then Time
    state.generatedDatesheet.sort((a, b) => {
        if(a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
    });

    let html = `
        <table class="datesheet-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Course</th>
                    <th>Dept</th>
                    <th>Room</th>
                    <th>Invigilator</th>
                    <th>Students</th>
                </tr>
            </thead>
            <tbody>
    `;

    state.generatedDatesheet.forEach(row => {
        // Pretty Date
        const dateObj = new Date(row.date);
        const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        html += `
            <tr>
                <td>${dateStr}</td>
                <td><span class="badge badge-time">${row.time}</span></td>
                <td>
                    <div style="font-weight:bold;">${row.courseCode}</div>
                    <div style="font-size:0.85em; color:var(--text-light);">${row.courseName}</div>
                </td>
                <td>
                    <div class="dept-badges">
                        ${row.depts.map(d => `<span class="badge badge-dept">${d}</span>`).join('')}
                    </div>
                </td>
                <td>${row.room}</td>
                <td>${row.invigilator}</td>
                <td>${row.students}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function renderConflicts() {
    const container = document.getElementById('conflicts-list');
    if(state.conflicts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                <p>No conflicts detected. All exams scheduled successfully.</p>
            </div>`;
    } else {
        let html = '<div class="conflicts-wrapper">';
        state.conflicts.forEach(c => {
            html += `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle"></i> ${c}
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }
}

// ==========================================
// Export
// ==========================================

function exportCSV() {
    if(state.generatedDatesheet.length === 0) return alert('No data to export');
    
    let csv = 'Date,Time,Course Code,Course Name,Departments,Room,Invigilator,Students\n';
    state.generatedDatesheet.forEach(row => {
        csv += `${row.date},${row.time},${row.courseCode},"${row.courseName}","${row.depts.join('; ')}","${row.room}","${row.invigilator}",${row.students}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datesheet.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportPDF() {
    // Simple Print View for now
    window.print();
}

// ==========================================
// Issue Reporting Feature (EmailJS)
// ==========================================
function initIssueReporting() {
    // EmailJS Initialization - Replace these with your actual credentials
    const EMAILJS_PUBLIC_KEY = "WhjA_Pwp1oLaqlsR-";
    const EMAILJS_SERVICE_ID = "service_kkiuyae";
    const EMAILJS_TEMPLATE_ID = "template_hskx2v8";

    if (EMAILJS_PUBLIC_KEY !== "") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const trigger = document.getElementById('issue-report-trigger');
    const modal = document.getElementById('issue-modal');
    const closeBtn = document.getElementById('close-issue-modal');
    const cancelBtn = document.getElementById('cancel-issue-btn');
    const form = document.getElementById('issue-form');
    const statusMsg = document.getElementById('issue-status-message');

    function toggleModal(show) {
        if (show) {
            modal.classList.add('active');
            statusMsg.style.display = 'none';
            statusMsg.className = '';
            form.reset();
        } else {
            modal.classList.remove('active');
        }
    }

    trigger.addEventListener('click', () => toggleModal(true));
    closeBtn.addEventListener('click', () => toggleModal(false));
    cancelBtn.addEventListener('click', () => toggleModal(false));

    window.addEventListener('click', (e) => {
        if (e.target === modal) toggleModal(false);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (EMAILJS_PUBLIC_KEY === "") {
            statusMsg.textContent = "EmailJS is not configured yet. Please provide your credentials.";
            statusMsg.className = 'error';
            return;
        }

        const submitBtn = document.getElementById('submit-issue-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        statusMsg.style.display = 'none';

        const templateParams = {
            from_name: document.getElementById('issue-name').value,
            from_email: document.getElementById('issue-email').value,
            message: document.getElementById('issue-description').value,
            to_email: 'itsmeandu822@gmail.com'
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function() {
                statusMsg.textContent = "Issue submitted successfully! We'll get back to you soon.";
                statusMsg.className = 'success';
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                form.reset();
                setTimeout(() => toggleModal(false), 3000);
            }, function(error) {
                console.error('EmailJS Error:', error);
                statusMsg.textContent = "Failed to send issue. Please try again later.";
                statusMsg.className = 'error';
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}
