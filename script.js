
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
        timeSlots: [],
        totalSemesters: 8
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
    try {
        initializeTheme();
        initializeCourseDropdown();
        initializeSemesterDropdown();
        setupEventListeners();
        setupNavigation();
        initIssueReporting();
        console.log('✅ Initialization Complete');
    } catch (e) {
        console.error('❌ Initialization Failed:', e);
    }
});

function initializeSemesterDropdown() {
    const select = document.getElementById('course-semester');
    const editSelect = document.getElementById('edit-semester');
    const totalInput = document.getElementById('total-semesters');
    const applyBtn = document.getElementById('apply-semesters-btn');
    const deptRow = document.getElementById('dept-input-row');
    
    if(!select || !totalInput || !applyBtn) return;

    const updateDropdown = () => {
        const total = parseInt(totalInput.value) || 0;
        if (total < 1) {
            alert("Please enter a valid number of semesters.");
            return;
        }
        state.config.totalSemesters = total;
        
        // Update exam course semester dropdown
        const options = ['<option value="">Select Semester</option>'];
        for(let i = 1; i <= total; i++) {
            options.push(`<option value="${i}">Semester ${i}</option>`);
        }
        
        const optionsHtml = options.join('');
        select.innerHTML = optionsHtml;
        if (editSelect) editSelect.innerHTML = optionsHtml;
        
        // Show department row
        if (deptRow) {
            deptRow.classList.remove('hidden');
            // Scroll to it smoothly
            deptRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Visual feedback on button
        const originalContent = applyBtn.innerHTML;
        applyBtn.innerHTML = '<i class="fas fa-check-double"></i> Applied';
        applyBtn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            applyBtn.innerHTML = originalContent;
            applyBtn.style.backgroundColor = '';
        }, 2000);
        
        console.log(`✅ Applied ${total} semesters to configuration`);
    };

    applyBtn.addEventListener('click', updateDropdown);
}

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
        text: '#cbd5e1',
        textLight: '#94a3b8',
        border: '#334155',
        inputBg: '#334155',
        heading: '#38bdf8',
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

    // Edit Modal Buttons
    document.getElementById('close-edit-modal')?.addEventListener('click', () => {
        document.getElementById('edit-modal').classList.remove('active');
    });

    document.getElementById('cancel-edit-btn')?.addEventListener('click', () => {
        document.getElementById('edit-modal').classList.remove('active');
    });

    document.getElementById('save-edit-btn')?.addEventListener('click', () => {
        const semester = document.getElementById('edit-semester').value;
        const courseCode = document.getElementById('edit-course-code').value;
        const courseName = document.getElementById('edit-course-name').value;
        const depts = document.getElementById('edit-depts').value.split(',').map(d => d.trim()).filter(d => d !== '');
        const room = document.getElementById('edit-room').value;
        const invigilator = document.getElementById('edit-invigilator').value;
        
        if (!semester || !courseCode || !courseName) {
            alert('Please fill in required fields');
            return;
        }
        
        if (editingExamIndex === -1) {
            // Adding new
            const modal = document.getElementById('edit-modal');
            const date = modal.getAttribute('data-add-date');
            const slot = modal.getAttribute('data-add-slot');
            
            state.generatedDatesheet.push({
                date,
                time: slot,
                semester,
                courseCode,
                courseName,
                depts,
                room,
                invigilator
            });
        } else {
            // Updating existing
            const exam = state.generatedDatesheet[editingExamIndex];
            exam.semester = semester;
            exam.courseCode = courseCode;
            exam.courseName = courseName;
            exam.depts = depts;
            exam.room = room;
            exam.invigilator = invigilator;
        }
        
        document.getElementById('edit-modal').classList.remove('active');
        renderDatesheet();
        checkConflictsAfterMove();
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
            renderDeptList();
            updateDeptSelect();
            input.value = '';
        });
    }
}

function renderDeptList() {
    const container = document.getElementById('dept-list');
    if (!container) return;
    container.innerHTML = '';
    state.departments.forEach((dept, idx) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="item-details">
                <strong><i class="fas fa-building"></i> ${dept}</strong>
            </div>
            <button class="btn-icon delete-btn" onclick="removeDepartment(${idx})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

window.removeDepartment = function(idx) {
    state.departments.splice(idx, 1);
    renderDeptList();
    updateDeptSelect();
};

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
    const dept = deptSelect.value;

    if(dept) {
        if(!tempExamDepts.includes(dept)) {
            tempExamDepts.push(dept);
            renderTempExamDepts();
            deptSelect.value = '';
        } else {
            alert('This department is already added.');
        }
    } else {
        alert('Please select a department.');
    }
}

function renderTempExamDepts() {
    renderTags('exam-depts-list', tempExamDepts, (idx) => {
        tempExamDepts.splice(idx, 1);
        renderTempExamDepts();
    });
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
    const semester = document.getElementById('course-semester').value;
    const name = document.getElementById('course-name').value.trim();
    const code = document.getElementById('course-code').value.trim();

    if(semester && name && code && tempExamDepts.length > 0) {
        showConfirmation(`Add exam "${code} - ${name}" for Semester ${semester}?`, () => {
            state.exams.push({ 
                id: Date.now(), 
                semester,
                name, 
                code, 
                depts: [...tempExamDepts]
            });
            renderExamsList();
            // clear inputs
            document.getElementById('course-semester').value = '';
            document.getElementById('course-name').value = '';
            document.getElementById('course-code').value = '';
            tempExamDepts = [];
            document.getElementById('exam-depts-list').innerHTML = '';
            document.getElementById('course-dept-select').value = '';
        });
    } else {
        alert('Please fill all exam fields correctly (including Semester) and add at least one department.');
    }
}

function renderExamsList() {
    const container = document.getElementById('exams-list');
    container.innerHTML = '';
    state.exams.forEach((exam, idx) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        
        const deptsDisplay = exam.depts.join(', ');

        item.innerHTML = `
            <div class="item-details">
                <strong>${exam.code} - ${exam.name} (Semester ${exam.semester})</strong>
                <span>${deptsDisplay}</span>
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

    if(name) {
        showConfirmation(`Add room "${name}"?`, () => {
            state.rooms.push({ id: Date.now(), name });
            renderRoomsList();
            document.getElementById('room-name').value = '';
        });
    } else {
        alert('Please enter room name.');
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
    console.log('Generating datesheet...');
    try {
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
        
        console.log(`Dates: ${dates.length}, Slots: ${slots.length}`);

        // Create all possible slots (Date + Time)
        let availableSlots = [];
        dates.forEach(date => {
            slots.forEach(time => {
                availableSlots.push({ date, time, exams: [] });
            });
        });
        console.log(`Available Slots created: ${availableSlots.length}`);

        // Sort Exams
        const sortedExams = shuffleArray([...state.exams]);
        console.log(`Sorting ${sortedExams.length} exams`);

        // Greedy Allocation
        sortedExams.forEach(exam => {
            let placed = false;
            
            // Try to find a slot
            for (let slot of availableSlots) {
                
                // Check Room Availability
                const usedRoomsInSlot = slot.exams.map(e => e.room.id);
                let validRooms = state.rooms.filter(r => 
                    !usedRoomsInSlot.includes(r.id)
                );

                if(validRooms.length === 0) {
                    continue; // No room available in this slot
                }
                
                // Randomize room selection
                validRooms = shuffleArray(validRooms);

                // Check Invigilator Availability
                const busyInvigilatorsInSlot = slot.exams.map(e => e.invigilator ? e.invigilator.id : null).filter(id => id !== null);
                let validInvigilators = state.invigilators.filter(inv => 
                    !busyInvigilatorsInSlot.includes(inv.id) &&
                    inv.assignedDuties < inv.maxDuties &&
                    (inv.availableDates.length === 0 || inv.availableDates.includes(slot.date))
                );

                if(validInvigilators.length === 0 && state.invigilators.length > 0) {
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
                    semester: exam.semester,
                    courseCode: exam.code,
                    courseName: exam.name,
                    depts: exam.depts,
                    room: room.name,
                    invigilator: invigilator ? invigilator.name : 'N/A'
                });

                placed = true;
                break;
            }

            if(!placed) {
                console.warn(`Could not place exam: ${exam.code}`);
                state.conflicts.push(`Could not schedule ${exam.code} (${exam.name}) - No available room or invigilator.`);
            }
        });

        console.log(`Generated ${state.generatedDatesheet.length} entries`);
        renderDatesheet();
        renderConflicts();
        
        // Switch to view
        const datesheetNavItem = document.querySelector('.nav-item[data-section="datesheet"]');
        if (datesheetNavItem) datesheetNavItem.click();
    } catch (error) {
        console.error('Error generating datesheet:', error);
        alert('An error occurred while generating the datesheet. Check the console for details.');
    }
}


// ==========================================
// Rendering
// ==========================================

function renderDatesheet() {
    console.log('Rendering datesheet...');
    const container = document.getElementById('datesheet-container');
    if(!state.generatedDatesheet || state.generatedDatesheet.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <p>No datesheet generated yet or generation failed.</p>
            </div>`;
        return;
    }

    const start = state.config.startDate;
    const end = state.config.endDate;
    
    if (!start || !end) {
        console.error('Start or end date missing in state.config');
        return;
    }

    const dates = getDatesInRange(start, end);
    const slots = state.config.timeSlots;

    console.log(`Rendering grid for ${dates.length} dates and ${slots.length} slots`);

    let html = `
        <div class="datesheet-card">
            <div class="datesheet-wrapper">
                <table class="datesheet-grid-table">
                    <thead>
                        <tr>
                            <th>Date / Time</th>
                            ${slots.map(slot => `<th>${slot}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
    `;

    dates.forEach(date => {
        const dateObj = new Date(date);
        const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        html += `<tr><td>${dateStr}</td>`;
        
        slots.forEach(slot => {
            const entries = state.generatedDatesheet.filter(e => e.date === date && e.time === slot);
            const cellAttrs = `data-date="${date}" data-slot="${slot}"`;
            
            html += `<td class="datesheet-cell droptarget" ${cellAttrs}>`;
            
            entries.forEach(entry => {
                const idx = state.generatedDatesheet.indexOf(entry);
                html += `
                    <div class="exam-block" draggable="true" data-index="${idx}" onclick="event.stopPropagation(); editScheduledExam(${idx})">
                        <button class="block-delete-btn" onclick="event.stopPropagation(); deleteScheduledExam(${idx})"><i class="fas fa-times"></i></button>
                        <div class="block-code">${entry.courseCode} (S${entry.semester})</div>
                        <div class="block-name">${entry.courseName}</div>
                        <div class="block-meta">
                            <span class="block-tag"><i class="fas fa-door-open"></i> ${entry.room}</span>
                            <span class="block-tag"><i class="fas fa-user-tie"></i> ${entry.invigilator}</span>
                        </div>
                    </div>
                `;
            });
            
            html += `</td>`;
        });
        html += '</tr>';
    });

    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = html;
    setupTableEvents();
}

function setupTableEvents() {
    const container = document.getElementById('datesheet-container');
    
    // Drag events for blocks
    container.querySelectorAll('.exam-block').forEach(block => {
        block.addEventListener('dragstart', onDragStart);
    });

    // Drop events for cells
    container.querySelectorAll('.droptarget').forEach(cell => {
        cell.addEventListener('dragover', onDragOver);
        cell.addEventListener('dragleave', onDragLeave);
        cell.addEventListener('drop', onDrop);
        
        // Add support for clicking empty cell to add (optional, but requested similar functioning)
        cell.addEventListener('click', () => {
            if (!cell.querySelector('.exam-block')) {
                const date = cell.getAttribute('data-date');
                const slot = cell.getAttribute('data-slot');
                openAddExamModal(date, slot);
            }
        });
    });
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
    
    let csv = 'Date,Time,Semester,Course Code,Course Name,Departments,Room,Invigilator\n';
    state.generatedDatesheet.forEach(row => {
        const deptsStr = row.depts.join('; ');
        csv += `${row.date},${row.time},${row.semester},${row.courseCode},"${row.courseName}","${deptsStr}","${row.room}","${row.invigilator}"\n`;
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
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                form.reset();
                toggleModal(false);
                
                // Show Thank You Toast
                const toast = document.getElementById('thank-you-toast');
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }, function(error) {
                console.error('EmailJS Error:', error);
                statusMsg.textContent = "Failed to send issue. Please try again later.";
                statusMsg.className = 'error';
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// ==========================================
// Drag & Drop Functionality
// ==========================================
let draggedExamIndex = null;

window.onDragStart = function(e) {
    draggedExamIndex = parseInt(e.currentTarget.getAttribute('data-index'));
    e.dataTransfer.setData('text/plain', draggedExamIndex);
    e.dataTransfer.effectAllowed = 'move';
}

window.onDragOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-hover');
}

window.onDragLeave = function(e) {
    e.currentTarget.classList.remove('drag-hover');
}

window.onDrop = function(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-hover');
    
    const index = draggedExamIndex !== null ? draggedExamIndex : parseInt(e.dataTransfer.getData('text/plain'));
    if (isNaN(index)) return;
    
    const newDate = e.currentTarget.getAttribute('data-date');
    const newSlot = e.currentTarget.getAttribute('data-slot');
    
    if (newDate && newSlot) {
        state.generatedDatesheet[index].date = newDate;
        state.generatedDatesheet[index].time = newSlot;
        renderDatesheet();
        // Recalculate conflicts if necessary
        checkConflictsAfterMove();
    }
}

function checkConflictsAfterMove() {
    state.conflicts = [];
    const scheduled = state.generatedDatesheet;
    
    for (let i = 0; i < scheduled.length; i++) {
        for (let j = i + 1; j < scheduled.length; j++) {
            const a = scheduled[i];
            const b = scheduled[j];
            
            if (a.date === b.date && a.time === b.time) {
                // Same slot
                if (a.room === b.room) {
                    state.conflicts.push(`Conflict: ${a.courseCode} and ${b.courseCode} are both scheduled in ${a.room} on ${a.date} at ${a.time}`);
                }
                if (a.invigilator !== 'N/A' && a.invigilator === b.invigilator) {
                    state.conflicts.push(`Conflict: Invigilator ${a.invigilator} is assigned to both ${a.courseCode} and ${b.courseCode} on ${a.date} at ${a.time}`);
                }
            }
        }
    }
    renderConflicts();
}

// ==========================================
// Editing & Deletion
// ==========================================
let editingExamIndex = null;

window.editScheduledExam = function(index) {
    editingExamIndex = index;
    const exam = state.generatedDatesheet[index];
    
    document.getElementById('edit-semester').value = exam.semester;
    document.getElementById('edit-course-code').value = exam.courseCode;
    document.getElementById('edit-course-name').value = exam.courseName;
    document.getElementById('edit-depts').value = exam.depts.join(', ');
    
    // Fill room select
    const roomSelect = document.getElementById('edit-room');
    roomSelect.innerHTML = state.rooms.map(r => `<option value="${r.name}" ${r.name === exam.room ? 'selected' : ''}>${r.name}</option>`).join('');
    
    // Fill invigilator select
    const invSelect = document.getElementById('edit-invigilator');
    invSelect.innerHTML = '<option value="N/A">N/A</option>' + 
        state.invigilators.map(inv => `<option value="${inv.name}" ${inv.name === exam.invigilator ? 'selected' : ''}>${inv.name}</option>`).join('');
    
    document.getElementById('edit-modal').classList.add('active');
}

window.deleteScheduledExam = function(index) {
    showConfirmation('Are you sure you want to remove this scheduled exam?', () => {
        state.generatedDatesheet.splice(index, 1);
        renderDatesheet();
        checkConflictsAfterMove();
    });
}

window.openAddExamModal = function(date, slot) {
    // For simplicity, we can reuse the edit modal for adding
    // but we need to know we're adding.
    editingExamIndex = -1; // -1 indicates adding new
    
    document.getElementById('edit-semester').value = '';
    document.getElementById('edit-course-code').value = '';
    document.getElementById('edit-course-name').value = '';
    document.getElementById('edit-depts').value = '';
    
    const roomSelect = document.getElementById('edit-room');
    roomSelect.innerHTML = state.rooms.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
    
    const invSelect = document.getElementById('edit-invigilator');
    invSelect.innerHTML = '<option value="N/A">N/A</option>' + 
        state.invigilators.map(inv => `<option value="${inv.name}">${inv.name}</option>`).join('');
    
    // Store date/slot in modal for adding
    const modal = document.getElementById('edit-modal');
    modal.setAttribute('data-add-date', date);
    modal.setAttribute('data-add-slot', slot);
    
    document.getElementById('edit-modal').classList.add('active');
}

// Modal Buttons

