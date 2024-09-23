document.addEventListener('DOMContentLoaded', () => {
    let skillCount = 1;
    let languageCount = 1;
    let techSkillCount = 1;
    let workCount = 1;

    document.getElementById('addSkillBtn').addEventListener('click', () => {
        skillCount++;
        const skillsDiv = document.getElementById('skills');
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'skill' + skillCount;
        input.placeholder = 'Skill ' + skillCount;
        input.maxLength = 20;
        skillsDiv.appendChild(input);
    });

    document.getElementById('addLanguageBtn').addEventListener('click', () => {
        languageCount++;
        const languagesDiv = document.getElementById('languages');
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'language' + languageCount;
        input.placeholder = 'Language ' + languageCount;
        input.maxLength = 20;
        languagesDiv.appendChild(input);
    });

    document.getElementById('addTechSkillBtn').addEventListener('click', () => {
        techSkillCount++;
        const techSkillsDiv = document.getElementById('techSkills');
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'techSkill' + techSkillCount;
        input.placeholder = 'Technical Skill ' + techSkillCount;
        input.maxLength = 20;
        techSkillsDiv.appendChild(input);
    });

    document.getElementById('addWorkBtn').addEventListener('click', () => {
        workCount++;
        const workExperienceDiv = document.getElementById('workExperience');
        const workDiv = document.createElement('div');
        workDiv.className = 'work';

        const jobTitleInput = document.createElement('input');
        jobTitleInput.type = 'text';
        jobTitleInput.id = 'jobTitle' + workCount;
        jobTitleInput.placeholder = 'Job Title';
        jobTitleInput.maxLength = 30;

        const companyInput = document.createElement('input');
        companyInput.type = 'text';
        companyInput.id = 'company' + workCount;
        companyInput.placeholder = 'Company Name';
        companyInput.maxLength = 50;

        const datesInput = document.createElement('input');
        datesInput.type = 'text';
        datesInput.id = 'dates' + workCount;
        datesInput.placeholder = 'Dates of Employment';
        datesInput.maxLength = 30;

        const achievementsTextarea = document.createElement('textarea');
        achievementsTextarea.id = 'achievements' + workCount;
        achievementsTextarea.placeholder = 'Key Achievements';
        achievementsTextarea.maxLength = 300;

        workDiv.appendChild(jobTitleInput);
        workDiv.appendChild(companyInput);
        workDiv.appendChild(datesInput);
        workDiv.appendChild(achievementsTextarea);

        workExperienceDiv.appendChild(workDiv);
    });

    document.getElementById('resumeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateResume();
    });
});

function sanitizeInput(input) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
}

function generateResume() {
    // Collect data
    const firstName = sanitizeInput(document.getElementById('firstName').value);
    const lastName = sanitizeInput(document.getElementById('lastName').value);
    const position = sanitizeInput(document.getElementById('position').value);
    const phoneNumber = sanitizeInput(document.getElementById('phoneNumber').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const linkedin = sanitizeInput(document.getElementById('linkedin').value);
    const location = sanitizeInput(document.getElementById('location').value);

    // Skills
    const skills = [];
    document.querySelectorAll('#skills input').forEach(input => {
        if (input.value.trim() !== '') {
            skills.push(sanitizeInput(input.value));
        }
    });

    // Languages
    const languages = [];
    document.querySelectorAll('#languages input').forEach(input => {
        if (input.value.trim() !== '') {
            languages.push(sanitizeInput(input.value));
        }
    });

    // Technical Skills
    const techSkills = [];
    document.querySelectorAll('#techSkills input').forEach(input => {
        if (input.value.trim() !== '') {
            techSkills.push(sanitizeInput(input.value));
        }
    });

    // Work Experience
    const workExperiences = [];
    document.querySelectorAll('#workExperience .work').forEach((workDiv) => {
        const jobTitle = sanitizeInput(workDiv.querySelector('input[id^="jobTitle"]').value);
        const company = sanitizeInput(workDiv.querySelector('input[id^="company"]').value);
        const dates = sanitizeInput(workDiv.querySelector('input[id^="dates"]').value);
        const achievements = sanitizeInput(workDiv.querySelector('textarea[id^="achievements"]').value);

        if (jobTitle && company && dates && achievements) {
            workExperiences.push({ jobTitle, company, dates, achievements });
        }
    });

    // Education
    const degree = sanitizeInput(document.getElementById('degree').value);
    const institution = sanitizeInput(document.getElementById('institution').value);
    const yearsAttended = sanitizeInput(document.getElementById('yearsAttended').value);

    // Build the resume layout
    let resumeHTML = `
    <html>
    <head>
        <title>${firstName} ${lastName} - Resume</title>
        <link rel="stylesheet" href="resume.css">
    </head>
    <body>
    <div class="resume">
        <div class="header">
            <h1>${firstName} ${lastName}</h1>
            <h2>${position}</h2>
        </div>
        <hr>
        <div class="content">
            <div class="left">
                <h3>Contact</h3>
                <p><strong>Phone:</strong> ${phoneNumber}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${linkedin ? `<p><strong>LinkedIn:</strong> ${linkedin}</p>` : ''}
                <p><strong>Location:</strong> ${location}</p>
                <hr>
                <h3>Skills</h3>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
                <hr>
                <h3>Education</h3>
                <p><strong>${degree}</strong></p>
                <p>${institution}</p>
                <p>${yearsAttended}</p>
                <hr>
                <h3>Languages</h3>
                <ul>
                    ${languages.map(language => `<li>${language}</li>`).join('')}
                </ul>
                <hr>
                <h3>Technical Proficiency</h3>
                <ul>
                    ${techSkills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
            <div class="right">
                <h3>Work Experience</h3>
                ${workExperiences.map(work => `
                    <div class="work-experience">
                        <h4>${work.jobTitle}</h4>
                        <p><strong>${work.company}</strong> (${work.dates})</p>
                        <p>${work.achievements}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        <hr>
    </div>
    </body>
    </html>
    `;

    // Open a new window and display the generated resume
    const newWindow = window.open('', '_blank');
    newWindow.document.write(resumeHTML);
    newWindow.document.close();
}
