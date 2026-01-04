
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
        totalSemesters: 3
    },
    generatedDatesheet: [],
    conflicts: []
};

// Course mappings for dropdown and auto-selection
const courseMappings = [
    { code: "CS-308", name: "Artificial Intelligence" },
    { code: "GEN-102", name: "Applications of Information & Communication Technologies" },
    { code: "MATH-123", name: "Calculus & Analytical Geometry" },
    { code: "GEN-103", name: "Quantitative Reasoning – I" },
    { code: "GEN-204", name: "Quantitative Reasoning – II" },
    { code: "CS-103", name: "Quantitative Reasoning (Discrete Structure)" },
    { code: "CS-111 / CL-111", name: "Programming Fundamentals (Lab)" },
    { code: "CS-112", name: "Object Oriented Programming (OOP)" },
    { code: "GEN-107", name: "Functional English" },
    { code: "GEN-208", name: "Expository Writing" },
    { code: "ELL-113", name: "Introduction to Linguistics" },
    { code: "ELL-111", name: "Introduction to Literary Studies" },
    { code: "GEN-305", name: "Light, Color and Imaging" },
    { code: "CA-402", name: "Drawing from Observation and Materials" },
    { code: "DE-113", name: "Visual Communication-I" },
    { code: "CA-403", name: "Figure & Perspective Drawing" },
    { code: "ACT-417", name: "Financial Accounting" },
    { code: "MGT-114", name: "Fundamentals of Accounting" },
    { code: "GEN-302", name: "Environmental Science" },
    { code: "MGT-111", name: "Introduction to Business" },
    { code: "CA-410", name: "History of Art in Ancient Civilizations" },
    { code: "GEN-304", name: "Civics and Community Engagement" },
    { code: "GEN-202", name: "Pakistan Studies" },
    { code: "PSY-122", name: "Cognitive Psychology" },
    { code: "PSY-322", name: "Social Psychology" },
    { code: "PSY-224", name: "Ethical Issues in Psychology" },
    { code: "PSY-112", name: "Introduction to Psychology" },
    { code: "GEN-104", name: "Ideology and Constitution of Pakistan" },
    { code: "GEN-203", name: "Islamic Studies" },
    { code: "AHU-109", name: "Material and Process" },
    { code: "CA-401", name: "Fundamentals of Drawing" },
    { code: "MATH-104", name: "Basic Mathematics-I" },
    { code: "CS-307", name: "Computer Networks" },
    { code: "MGT-212", name: "Business Communication & Report Writing" },
    { code: "MGT-213", name: "Human Resource Management" },
    { code: "GEN-101", name: "Understanding of Holy Quran – I" }
];

const semesterCourseData = {
    "1": {
        "Computer Science (BS-CS)": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Programming Fundamentals (Lab)",
            "Calculus & Analytical Geometry",
            "Basic Mathematics-I"
        ],
        "Software Engineering (BS-SE)": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Programming Fundamentals (Lab)",
            "Calculus & Analytical Geometry",
            "Basic Mathematics-I"
        ],
        "Business Administration (BBA)": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Quantitative Reasoning – I",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Introduction to Business",
            "Fundamentals of Accounting"
        ],
        "Accounting & Finance (BS A&F)": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Quantitative Reasoning – I",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Introduction to Business",
            "Fundamentals of Accounting"
        ],
        "Psychology (BS-Psychology)": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Quantitative Reasoning – I",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Introduction to Psychology",
            "Cognitive Psychology"
        ],
        "Digital Design / Interior Design (DDCA)": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Quantitative Reasoning – I",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Fundamentals of Drawing",
            "History of Art in Ancient Civilizations"
        ],
        "Linguistics": [
            "Understanding of Holy Quran – I",
            "Applications of Information & Communication Technologies",
            "Quantitative Reasoning – I",
            "Ideology and Constitution of Pakistan",
            "Functional English",
            "Introduction to Literary Studies",
            "Introduction to Linguistics"
        ]
    },
    "2": {
        "Computer Science (BS-CS)": [
            "Introduction to Psychology",
            "Pakistan Studies",
            "Islamic Studies",
            "Expository Writing",
            "Calculus & Analytical Geometry",
            "Object Oriented Programming (OOP)"
        ],
        "Software Engineering (BS-SE)": [
            "Introduction to Psychology",
            "Pakistan Studies",
            "Islamic Studies",
            "Expository Writing",
            "Calculus & Analytical Geometry",
            "Object Oriented Programming (OOP)"
        ],
        "Accounting & Finance (BS A&F)": [
            "Introduction to Psychology",
            "Pakistan Studies",
            "Islamic Studies",
            "Quantitative Reasoning – II",
            "Expository Writing",
            "Fundamentals of Accounting",
            "Human Resource Management"
        ],
        "Psychology (BS-Psychology)": [
            "Applications of Information & Communication Technologies",
            "Pakistan Studies",
            "Islamic Studies",
            "Quantitative Reasoning – II",
            "Expository Writing",
            "Cognitive Psychology",
            "Social Psychology"
        ],
        "Digital Design / Communication Arts (DDCA)": [
            "Quantitative Reasoning – I",
            "Pakistan Studies",
            "Islamic Studies",
            "Expository Writing",
            "Material and Process",
            "Drawing from Observation and Materials",
            "History of Art in Ancient Civilizations"
        ]
    },
    "3": {
        "Computer Science (BS-CS)": [
            "Quantitative Reasoning (Discrete Structure)",
            "Pakistan Studies",
            "Civics and Community Engagement",
            "Introduction to Psychology",
            "Business Communication & Report Writing",
            "Computer Networks",
            "Artificial Intelligence"
        ],
        "Software Engineering (BS-SE)": [
            "Quantitative Reasoning (Discrete Structure)",
            "Pakistan Studies",
            "Civics and Community Engagement",
            "Introduction to Psychology",
            "Business Communication & Report Writing",
            "Computer Networks",
            "Artificial Intelligence"
        ],
        "Business Administration (BBA)": [
            "Pakistan Studies",
            "Quantitative Reasoning – II",
            "Environmental Science",
            "Civics and Community Engagement",
            "Business Communication & Report Writing",
            "Human Resource Management",
            "Financial Accounting"
        ],
        "Psychology (BS-Psychology)": [
            "Pakistan Studies",
            "Quantitative Reasoning – II",
            "Human Resource Management",
            "Civics and Community Engagement",
            "Business Communication & Report Writing",
            "Ethical Issues in Psychology",
            "Social Psychology"
        ],
        "Digital Design / Communication Arts (DDCA)": [
            "Quantitative Reasoning – I",
            "Pakistan Studies",
            "Civics and Community Engagement",
            "Light, Color and Imaging",
            "Material and Process",
            "Visual Communication-I",
            "Figure & Perspective Drawing"
        ]
    }
};

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
        saveState();
        
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
    // 1. Time Slots
    document.getElementById('add-timeslot-btn').addEventListener('click', addTimeSlot);
    
    // 2. Departments
    document.getElementById('add-dept-btn').addEventListener('click', addDepartment);

    // 3. Exams
    document.getElementById('add-exam-btn').addEventListener('click', addExam);
    document.getElementById('add-exam-dept-btn').addEventListener('click', addExamDeptTemp);
    document.getElementById('course-name').addEventListener('change', handleCourseNameInput);
    document.getElementById('course-semester').addEventListener('change', handleSemesterChange);
    document.getElementById('course-dept-select').addEventListener('change', handleDeptChange);

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
    
    // 8. CSV/Excel Import
    const importBtn = document.getElementById('import-csv-btn');
    const importInput = document.getElementById('csv-import-input');
    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', handleFileImport);
    }
    
    // 9. Modal
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('confirmation-modal').classList.remove('active');
    });
    document.getElementById('cancel-confirm-btn').addEventListener('click', () => {
        document.getElementById('confirmation-modal').classList.remove('active');
    });

    // 10. Config changes
    document.getElementById('start-date').addEventListener('change', (e) => {
        state.config.startDate = e.target.value;
        saveState();
    });
    document.getElementById('end-date').addEventListener('change', (e) => {
        state.config.endDate = e.target.value;
        saveState();
    });
    document.getElementById('total-semesters').addEventListener('change', (e) => {
        state.config.totalSemesters = parseInt(e.target.value);
        saveState();
    });

    // Edit Modal Buttons
    document.getElementById('close-edit-modal')?.addEventListener('click', () => {
        document.getElementById('edit-modal').classList.remove('active');
    });

    // PDF Modal Buttons
    document.getElementById('close-pdf-modal')?.addEventListener('click', () => {
        document.getElementById('pdf-modal').classList.remove('active');
    });

    document.getElementById('cancel-pdf-btn')?.addEventListener('click', () => {
        document.getElementById('pdf-modal').classList.remove('active');
    });

    document.getElementById('download-pdf-btn')?.addEventListener('click', () => {
        // This will be handled by the specialized export function
        processPDFDownload();
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
        saveState();
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
            saveState();
            renderTimeSlots();
            input.value = '';
        });
    }
}

function renderTimeSlots() {
    const container = document.querySelector('#time-slots-container .input-tag-group');
    if (!container) return;
    
    // We can't use renderTags directly if it clears the parent which contains the .input-tag-group
    // But renderTags takes an ID. Let's make sure it targets the right element.
    renderTagsOnElement(container, state.config.timeSlots, (idx) => {
        state.config.timeSlots.splice(idx, 1);
        saveState();
        renderTimeSlots();
    });
}

function renderTagsOnElement(element, items, removeCallback) {
    element.innerHTML = '';
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
        element.appendChild(tag);
    });
}

// Departments
function addDepartment() {
    const input = document.getElementById('dept-input');
    const val = input.value.trim();
    if(val && !state.departments.includes(val)) {
        showConfirmation(`Add department "${val}"?`, () => {
            state.departments.push(val);
            saveState();
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
    saveState();
    renderDeptList();
    updateDeptSelect();
};

function handleSemesterChange() {
    const semester = document.getElementById('course-semester').value;
    const deptSelect = document.getElementById('course-dept-select');
    const courseNameInput = document.getElementById('course-name');
    const courseCodeSelect = document.getElementById('course-code');

    // Reset logic
    deptSelect.value = '';
    courseNameInput.value = '';
    courseCodeSelect.value = '';
    tempExamDepts = []; // Clear temp depts list as well
    document.getElementById('exam-depts-list').innerHTML = '';

    if (semester) {
        deptSelect.disabled = false;
        updateDeptDropdown(semester);
        refreshCourseOptions();
    } else {
        deptSelect.disabled = true;
        courseNameInput.disabled = true;
        courseNameInput.innerHTML = '<option value="">Select Course Name</option>';
    }
}

function handleDeptChange() {
    const courseNameInput = document.getElementById('course-name');
    const courseCodeSelect = document.getElementById('course-code');

    // Reset logic
    courseNameInput.value = '';
    courseCodeSelect.value = '';

    refreshCourseOptions();
}

function refreshCourseOptions() {
    const semester = document.getElementById('course-semester').value;
    const currentDept = document.getElementById('course-dept-select').value;
    const courseNameSelect = document.getElementById('course-name');
    
    // Departments to show courses for: tempExamDepts + currentDept (if any)
    let deptsToShow = [...tempExamDepts];
    if (currentDept && !deptsToShow.includes(currentDept)) {
        deptsToShow.push(currentDept);
    }
    
    if (semester && deptsToShow.length > 0) {
        courseNameSelect.disabled = false;
        updateCourseDropdown(semester, deptsToShow);
    } else {
        if (tempExamDepts.length === 0 && !currentDept) {
            courseNameSelect.disabled = true;
        }
        courseNameSelect.innerHTML = '<option value="">Select Course Name</option>';
    }
}

function updateCourseDropdown(semester, depts) {
    const select = document.getElementById('course-name');
    const currentValue = select.value;
    select.innerHTML = '<option value="">Select Course Name</option>';

    if (!semesterCourseData[semester]) return;

    const deptsArray = Array.isArray(depts) ? depts : [depts];

    deptsArray.forEach(dept => {
        if (semesterCourseData[semester][dept]) {
            const group = document.createElement('optgroup');
            group.label = dept;
            
            const courses = semesterCourseData[semester][dept];
            courses.forEach(courseName => {
                const opt = document.createElement('option');
                opt.value = courseName;
                opt.innerText = courseName;
                group.appendChild(opt);
            });
            select.appendChild(group);
        }
    });
    
    if (currentValue) select.value = currentValue;
}

function updateDeptDropdown(semester) {
    const deptSelect = document.getElementById('course-dept-select');
    deptSelect.innerHTML = '<option value="">Select Dept</option>';

    if (semesterCourseData[semester]) {
        const departments = Object.keys(semesterCourseData[semester]);
        departments.forEach(dept => {
            const opt = document.createElement('option');
            opt.value = dept;
            opt.innerText = dept;
            deptSelect.appendChild(opt);
        });
    }
}

function updateDeptSelect() {
    const semester = document.getElementById('course-semester').value;
    if (semester) {
        updateDeptDropdown(semester);
        return;
    }
    const select = document.getElementById('course-dept-select');
    if (!select) return;
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
            refreshCourseOptions();
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
        refreshCourseOptions();
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
            saveState();
            // clear inputs
            document.getElementById('course-semester').value = '';
            document.getElementById('course-name').value = '';
            document.getElementById('course-code').value = '';
            tempExamDepts = [];
            document.getElementById('exam-depts-list').innerHTML = '';
            document.getElementById('course-dept-select').value = '';
            handleSemesterChange();
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
        saveState();
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
            saveState();
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
        saveState();
        renderInvigilatorsList();
    }
};

// Rooms
function addRoom() {
    const name = document.getElementById('room-name').value.trim();

    if(name) {
        showConfirmation(`Add room "${name}"?`, () => {
            state.rooms.push({ id: Date.now(), name });
            saveState();
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
        saveState();
        renderRoomsList();
    }
};

// Generic Tag Renderer
function renderTags(containerId, items, removeCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    renderTagsOnElement(container, items, removeCallback);
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

        // Greedy Allocation with Distribution
        sortedExams.forEach(exam => {
            let possibleSlots = [];
            
            // Find all valid slots for this exam
            for (let slot of availableSlots) {
                // Check Room Availability
                const usedRoomsInSlot = slot.exams.map(e => e.room.id);
                const validRooms = state.rooms.filter(r => !usedRoomsInSlot.includes(r.id));

                if(validRooms.length === 0) continue;
                
                // Check Invigilator Availability
                const busyInvigilatorsInSlot = slot.exams.map(e => e.invigilator ? e.invigilator.id : null).filter(id => id !== null);
                
                const validInvigilators = state.invigilators.filter(inv => 
                    !busyInvigilatorsInSlot.includes(inv.id) &&
                    inv.assignedDuties < inv.maxDuties &&
                    (inv.availableDates.length === 0 || inv.availableDates.includes(slot.date)) &&
                    !state.generatedDatesheet.some(entry => entry.date === slot.date && entry.invigilator === inv.name)
                );

                if(validInvigilators.length === 0 && state.invigilators.length > 0) continue;

                // This slot is valid, store it with its available resources
                possibleSlots.push({
                    slot: slot,
                    validRooms: validRooms,
                    validInvigilators: validInvigilators
                });
            }

            if (possibleSlots.length > 0) {
                // To distribute evenly, we sort possible slots by the number of exams already in them.
                // This will prioritize Slot 2 if Slot 1 is getting full, and vice versa.
                possibleSlots.sort((a, b) => a.slot.exams.length - b.slot.exams.length);
                
                const chosen = possibleSlots[0];
                const slot = chosen.slot;
                const room = shuffleArray(chosen.validRooms)[0];
                
                let invigilator = null;
                if (chosen.validInvigilators.length > 0) {
                    // Still balance the invigilator duties within the chosen slot
                    invigilator = shuffleArray(chosen.validInvigilators).sort((a, b) => a.assignedDuties - b.assignedDuties)[0];
                }

                if(invigilator) invigilator.assignedDuties++;
                
                slot.exams.push({ exam, room, invigilator });

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
            } else {
                console.warn(`Could not place exam: ${exam.code}`);
                state.conflicts.push(`Could not schedule ${exam.code} (${exam.name}) - No available room or invigilator that maintains spacing.`);
            }
        });

        console.log(`Generated ${state.generatedDatesheet.length} entries`);
        renderDatesheet();
        renderConflicts();
        saveState();
        
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
        const isSunday = dateObj.getDay() === 0;
        const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        const rowClass = isSunday ? 'sunday-row' : '';
        html += `<tr class="${rowClass}"><td>${dateStr}</td>`;
        
        slots.forEach(slot => {
            const entries = state.generatedDatesheet.filter(e => e.date === date && e.time === slot);
            const cellAttrs = `data-date="${date}" data-slot="${slot}"`;
            const cellClass = `datesheet-cell ${isSunday ? 'sunday-cell' : 'droptarget'}`;
            
            html += `<td class="${cellClass}" ${cellAttrs}>`;
            
            entries.forEach(entry => {
                const idx = state.generatedDatesheet.indexOf(entry);
                const isDraggable = !isSunday;
                const clickHandler = isSunday ? '' : `onclick="event.stopPropagation(); editScheduledExam(${idx})"`;
                const deleteBtn = isSunday ? '' : `<button class="block-delete-btn" onclick="event.stopPropagation(); deleteScheduledExam(${idx})"><i class="fas fa-times"></i></button>`;

                html += `
                    <div class="exam-block" draggable="${isDraggable}" data-index="${idx}" ${clickHandler}>
                        ${deleteBtn}
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
    if (!state.generatedDatesheet || state.generatedDatesheet.length === 0) {
        alert('No datesheet to export. Please generate one first.');
        return;
    }
    document.getElementById('pdf-modal').classList.add('active');
}

async function processPDFDownload() {
    const instituteName = document.getElementById('pdf-institute-name').value || 'University Datesheet';
    const examTitle = document.getElementById('pdf-exam-title').value || '';
    const logoFile = document.getElementById('pdf-logo').files[0];
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation

    let currentY = 20;

    // Handle Logo
    if (logoFile) {
        const logoData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(logoFile);
        });
        // Add logo (x, y, w, h)
        doc.addImage(logoData, 'PNG', 14, 10, 25, 25);
        currentY = 15; // Reset currentY for text alignment with logo
    }

    // Add Institute Name
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text(instituteName, logoFile ? 45 : 14, currentY + 10);
    
    // Add Exam Title
    if (examTitle) {
        doc.setFontSize(16);
        doc.setTextColor(100);
        doc.text(examTitle, logoFile ? 45 : 14, currentY + 18);
    }

    // Add Generation Date
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 280, 20, { align: 'right' });

    // Prepare table data
    const head = [['Date', 'Time', 'Sem', 'Course Code', 'Course Name', 'Departments', 'Room', 'Invigilator']];
    const body = state.generatedDatesheet.map(entry => [
        entry.date,
        entry.time,
        entry.semester,
        entry.courseCode,
        entry.courseName,
        entry.depts.join(', '),
        entry.room,
        entry.invigilator
    ]);

    // Generate Table
    doc.autoTable({
        head: head,
        body: body,
        startY: logoFile ? 40 : 45,
        theme: 'striped',
        headStyles: { fillColor: [74, 144, 226], textColor: 255 },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 25 }, // Date
            1: { cellWidth: 30 }, // Time
            2: { cellWidth: 10 }, // Sem
            3: { cellWidth: 25 }, // Course Code
            4: { cellWidth: 'auto' }, // Course Name
            5: { cellWidth: 40 }, // Departments
            6: { cellWidth: 20 }, // Room
            7: { cellWidth: 25 }  // Invigilator
        },
        margin: { top: 35 }
    });

    // Close Modal and Save PDF
    document.getElementById('pdf-modal').classList.remove('active');
    doc.save(`${instituteName.replace(/\s+/g, '_')}_Datesheet.pdf`);
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
        saveState();
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
    roomSelect.innerHTML = '<option value="">Select Room</option>' + 
        state.rooms.map(r => `<option value="${r.name}" ${r.name === exam.room ? 'selected' : ''}>${r.name}</option>`).join('');
    
    // Fill invigilator select
    const invSelect = document.getElementById('edit-invigilator');
    invSelect.innerHTML = '<option value="">Select Invigilator</option>' + 
        `<option value="N/A" ${exam.invigilator === 'N/A' ? 'selected' : ''}>N/A</option>` + 
        state.invigilators.map(inv => `<option value="${inv.name}" ${inv.name === exam.invigilator ? 'selected' : ''}>${inv.name}</option>`).join('');
    
    document.getElementById('edit-modal').classList.add('active');
}

window.deleteScheduledExam = function(index) {
    showConfirmation('Are you sure you want to remove this scheduled exam?', () => {
        state.generatedDatesheet.splice(index, 1);
        renderDatesheet();
        checkConflictsAfterMove();
        saveState();
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
    
    // Fill room select
    const roomSelect = document.getElementById('edit-room');
    roomSelect.innerHTML = '<option value="">Select Room</option>' + 
        state.rooms.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
    
    // Fill invigilator select
    const invSelect = document.getElementById('edit-invigilator');
    invSelect.innerHTML = '<option value="">Select Invigilator</option>' + 
        '<option value="N/A">N/A</option>' + 
        state.invigilators.map(inv => `<option value="${inv.name}">${inv.name}</option>`).join('');
    
    // Store date/slot in modal for adding
    const modal = document.getElementById('edit-modal');
    modal.setAttribute('data-add-date', date);
    modal.setAttribute('data-add-slot', slot);
    
    document.getElementById('edit-modal').classList.add('active');
}

// ==========================================
// File Import Logic (CSV/Excel)
// ==========================================

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            let data = [];
            
            if (fileName.endsWith('.csv')) {
                const text = e.target.result;
                data = parseCSV(text);
            } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary', cellDates: true });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                // Convert to array of arrays (like parseCSV does)
                data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            }

            if (data.length < 2) {
                alert('The file seems to be empty or invalid.');
                return;
            }

            processImportedData(data, event);

        } catch (error) {
            console.error('File Import Error:', error);
            alert('An error occurred while parsing the file. Please ensure it is a valid CSV or Excel file.');
        }
    };

    if (fileName.endsWith('.csv')) {
        reader.readAsText(file);
    } else {
        reader.readAsBinaryString(file);
    }
}

function processImportedData(data, event) {
    // 1. Find Header Row (Scan first 20 rows for keywords)
    let headerRowIndex = -1;
    const keywords = ['date', 'slot', 'code', 'subject', 'course'];
    
    for (let i = 0; i < Math.min(data.length, 20); i++) {
        const row = data[i].map(cell => cell ? cell.toString().toLowerCase().trim() : '');
        if (keywords.some(k => row.some(cell => cell.includes(k)))) {
            headerRowIndex = i;
            break;
        }
    }

    if (headerRowIndex === -1) {
        alert('Could not detect headers. Please ensure your file has columns like Date, Slot, and Course Code.');
        return;
    }

    const headers = data[headerRowIndex].map(h => (h ? h.toString().trim().toLowerCase() : ''));
    const rows = data.slice(headerRowIndex + 1);

    const findCol = (aliases) => {
        for (let alias of aliases) {
            const index = headers.findIndex(h => h && h.includes(alias.toLowerCase()));
            if (index !== -1) return index;
        }
        return -1;
    };

    const colMap = {
        date: findCol(['date', 'day']),
        slot: findCol(['slot', 'time', 'session']),
        code: findCol(['code', 'subject code', 'cid', 'id']),
        name: findCol(['name', 'subject', 'course', 'title']),
        semester: findCol(['semester', 'sem', 'level']),
        depts: findCol(['dept', 'department', 'program']),
        room: findCol(['room', 'venue', 'room no']),
        invigilator: findCol(['invigilator', 'teacher', 'supervisor', 'staff'])
    };

    const importedExams = [];
    const foundDates = new Set();
    const foundSlots = new Set();
    const foundDepts = new Set();
    const foundRooms = new Set();
    const foundInvigilators = new Set();
    let maxSemester = 0;

    rows.forEach((row, rowIndex) => {
        if (!row || row.length === 0) return;

        // Skip if date is missing completely
        let dateVal = colMap.date !== -1 ? row[colMap.date] : null;
        if (!dateVal) {
            console.warn(`Row ${rowIndex + headerRowIndex + 2}: Missing date, skipping.`);
            return;
        }

        // --- Improved Robust Date Parsing ---
        let finalDate = '';
        if (dateVal instanceof Date) {
            finalDate = dateVal.toISOString().split('T')[0];
        } else {
            const rawDate = dateVal.toString().trim();
            if (!rawDate) return;

            const d = new Date(rawDate);
            if (!isNaN(d.getTime())) {
                finalDate = d.toISOString().split('T')[0];
            } else {
                // Try DD-MM-YYYY or similar
                const match = rawDate.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
                if (match) {
                    const day = match[1].padStart(2, '0');
                    const month = match[2].padStart(2, '0');
                    const year = match[3].length === 2 ? '20' + match[3] : match[3];
                    finalDate = `${year}-${month}-${day}`;
                }
            }
        }

        if (!finalDate) {
            console.warn(`Row ${rowIndex + headerRowIndex + 2}: Invalid date format "${dateVal}", skipping.`);
            return;
        }

        // --- Flexible Data Extraction ---
        const semRaw = colMap.semester !== -1 && row[colMap.semester] ? row[colMap.semester].toString().trim() : '1';
        const semNum = parseInt(semRaw.replace(/\D/g,'')) || 1;
        if (semNum > maxSemester) maxSemester = semNum;

        const deptsStr = colMap.depts !== -1 && row[colMap.depts] ? row[colMap.depts].toString().trim() : '';
        const deptsList = deptsStr ? deptsStr.split(/[,;|]/).map(d => d.trim()).filter(d => d) : [];
        deptsList.forEach(d => foundDepts.add(d));

        const roomVal = colMap.room !== -1 && row[colMap.room] ? row[colMap.room].toString().trim() : 'N/A';
        if (roomVal && roomVal !== 'N/A') foundRooms.add(roomVal);

        const invVal = colMap.invigilator !== -1 && row[colMap.invigilator] ? row[colMap.invigilator].toString().trim() : 'N/A';
        if (invVal && invVal !== 'N/A') foundInvigilators.add(invVal);

        const exam = {
            date: finalDate,
            time: colMap.slot !== -1 && row[colMap.slot] ? row[colMap.slot].toString().trim() : '09:00 - 12:00',
            courseCode: colMap.code !== -1 && row[colMap.code] ? row[colMap.code].toString().trim() : `EXAM-${rowIndex + 1}`,
            courseName: colMap.name !== -1 && row[colMap.name] ? row[colMap.name].toString().trim() : 'Untitled Subject',
            semester: semNum.toString(),
            depts: deptsList,
            room: roomVal,
            invigilator: invVal
        };

        importedExams.push(exam);
        foundDates.add(exam.date);
        foundSlots.add(exam.time);
    });

    if (importedExams.length === 0) {
        alert('No valid exams found. Please ensure your file has valid dates and data.');
        return;
    }

    showConfirmation(`Identified ${importedExams.length} exams. Update datesheet?`, () => {
        state.generatedDatesheet = importedExams;
        
        // Also sync state.exams so they show up in the sidebar/added exams list
        state.exams = importedExams.map(ie => ({
            code: ie.courseCode,
            name: ie.courseName,
            semester: ie.semester,
            depts: ie.depts
        }));
        
        // Configuration Updates
        const sortedDates = [...foundDates].sort();
        state.config.startDate = sortedDates[0];
        state.config.endDate = sortedDates[sortedDates.length - 1];
        state.config.timeSlots = [...foundSlots];
        
        // Ensure totalSemesters is at least 8 or the max found
        state.config.totalSemesters = Math.max(8, maxSemester);

        // Sync auxiliary lists (Append new, keep existing)
        state.departments = [...new Set([...state.departments, ...foundDepts])];
        
        const existingRoomNames = new Set(state.rooms.map(r => r.name));
        foundRooms.forEach(name => {
            if (!existingRoomNames.has(name)) {
                state.rooms.push({ id: Date.now() + Math.random(), name });
            }
        });

        const existingInvNames = new Set(state.invigilators.map(i => i.name));
        foundInvigilators.forEach(name => {
            if (!existingInvNames.has(name)) {
                state.invigilators.push({ 
                    id: Date.now() + Math.random(), 
                    name, 
                    maxDuties: 5, 
                    availableDates: [], 
                    assignedDuties: 0 
                });
            }
        });

        // UI Refresh
        document.getElementById('start-date').value = state.config.startDate;
        document.getElementById('end-date').value = state.config.endDate;
        document.getElementById('total-semesters').value = state.config.totalSemesters;
        
        renderTimeSlots();
        renderDeptList();
        updateDeptSelect();
        renderRoomsList();
        renderInvigilatorsList();
        renderExamsList(); // Added this to refresh the exams list UI
        
        // Update semester dropdowns correctly
        const totalInput = document.getElementById('total-semesters');
        if (totalInput) {
            const applyBtn = document.getElementById('apply-semesters-btn');
            if (applyBtn) applyBtn.click();
        }

        // View Transition
        const datesheetNavItem = document.querySelector('.nav-item[data-section="datesheet"]');
        if (datesheetNavItem) datesheetNavItem.click();
        
        renderDatesheet();
        renderConflicts();
        saveState();
        if (event) event.target.value = '';
        console.log(`✅ Complex Import: ${importedExams.length} rows processed.`);
    });
}

function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    return lines.filter(l => l.trim()).map(line => {
        const result = [];
        let cur = '';
        let inQuote = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                result.push(cur);
                cur = '';
            } else {
                cur += char;
            }
        }
        result.push(cur);
        return result;
    });
}

// Modal Buttons
// ==========================================
// Persistence (Local Storage)
// ==========================================
function saveState() {
    try {
        localStorage.setItem('datesheet_generator_state', JSON.stringify(state));
    } catch (e) {
        console.warn('Could not save session to localStorage:', e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem('datesheet_generator_state');
        if (!saved) return;

        const loadedState = JSON.parse(saved);
        // Merge loaded state into current state
        Object.assign(state, loadedState);
        
        // Refresh all UI components
        refreshUIFromState();
        
        // Hide restore button after loading
        const restoreBtn = document.getElementById('restore-session-btn');
        if (restoreBtn) restoreBtn.classList.add('hidden');
        
        console.log('✅ Session restored successfully');
    } catch (e) {
        console.error('❌ Failed to restore session:', e);
        alert('Could not restore previous session.');
    }
}

function refreshUIFromState() {
    // 1. Config inputs
    if (state.config.startDate) document.getElementById('start-date').value = state.config.startDate;
    if (state.config.endDate) document.getElementById('end-date').value = state.config.endDate;
    if (state.config.totalSemesters) document.getElementById('total-semesters').value = state.config.totalSemesters;
    
    // 2. Render all lists
    renderTimeSlots();
    renderDeptList();
    updateDeptSelect();
    renderRoomsList();
    renderInvigilatorsList();
    renderExamsList();
    
    // 3. Update semester dropdowns
    const totalInput = document.getElementById('total-semesters');
    if (totalInput) {
        const applyBtn = document.getElementById('apply-semesters-btn');
        if (applyBtn) applyBtn.click();
    }
    
    // 4. Render datesheet
    if (state.generatedDatesheet && state.generatedDatesheet.length > 0) {
        renderDatesheet();
        renderConflicts();
    }
}

function checkSavedSession() {
    const saved = localStorage.getItem('datesheet_generator_state');
    const restoreBtn = document.getElementById('restore-session-btn');
    if (saved && restoreBtn) {
        restoreBtn.classList.remove('hidden');
    }
}

// Call this on initialization
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkSavedSession, 500); // Small delay to ensure all UI is ready
    
    document.getElementById('restore-session-btn')?.addEventListener('click', () => {
        showConfirmation('Restore your previous session? This will overwrite current changes.', () => {
            loadState();
        });
    });
});
