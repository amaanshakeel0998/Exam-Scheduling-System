# Datesheet Generator (Exam Scheduling System)

A single-page web app for creating and managing exam datesheets. It lets you configure date ranges and time slots, define departments and courses, manage invigilators and student enrollments, then generate a datesheet with conflict status and exports.

## Developer
- Muhammad Amaan

## Features
- Date range and daily time slot configuration
- Departments and semester setup
- Course/exam definitions by semester and department
- Invigilator management with max duties and optional availability dates
- Student enrollment (manual entry or CSV/Excel import)
- Generate datesheet with status/conflict view
- Export datesheet to PDF or CSV
- Import datesheet from CSV/Excel
- Theme customization with presets and color picker
- Local session restore via browser storage

## How to Run
This is a static frontend project. Open the HTML file directly in a browser:

```
open index.html
```

(Or double-click `index.html` in your file manager.)

## Project Structure
```
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## Usage Overview
1. Configure exam date range and daily time slots.
2. Add departments and set total semesters.
3. Define courses/exams for each semester and department.
4. Add invigilators and optional availability limits.
5. Add students manually or import from CSV/Excel.
6. Generate the datesheet and review conflicts.
7. Export to PDF/CSV or import a saved datesheet.

## Notes
- Session state and theme preferences are stored in browser localStorage.
- CSV/Excel import expects the format shown in the UI helper text.

## License
Add your license here.
