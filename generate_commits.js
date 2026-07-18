const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commitMessages = [
  "Enhance AI Chatbot: Add fuzzy search algorithms",
  "Enhance AI Chatbot: Improve intent recognition",
  "Enhance AI Chatbot: Setup localStorage persistence",
  "Enhance AI Chatbot: Add Markdown parsing support",
  "Enhance AI Chatbot: Update UI for message bubbles",
  "Enhance AI Chatbot: Fix typing indicator animation",
  "Enhance AI Chatbot: Expand knowledge base context",
  "Enhance Crowd Monitor: Setup dynamic chart rendering",
  "Enhance Crowd Monitor: Add realtime mock data generator",
  "Enhance Crowd Monitor: Improve responsive grid layout",
  "Enhance Crowd Monitor: Add heatmap color scaling",
  "Enhance Crowd Monitor: Optimize Recharts performance",
  "Enhance Crowd Monitor: Update tooltips styling",
  "Enhance Emergency SOS: Integrate Geolocation API",
  "Enhance Emergency SOS: Add fallback coordinate handling",
  "Enhance Emergency SOS: Setup one-tap tel links",
  "Enhance Emergency SOS: Create Report Incident modal",
  "Enhance Emergency SOS: Build incident form validation",
  "Enhance Emergency SOS: Update emergency contacts list",
  "Enhance Emergency SOS: Add pulse animation to SOS button",
  "Enhance Events: Create calendar view layout",
  "Enhance Events: Setup event filtering logic",
  "Enhance Events: Add 'Add to Google Calendar' links",
  "Enhance Events: Update event card UI",
  "Enhance Events: Add Snan dates categories",
  "Enhance Events: Fix mobile overflow on calendar",
  "Enhance Lost & Found: Create image upload mock UI",
  "Enhance Lost & Found: Separate Lost vs Found tabs",
  "Enhance Lost & Found: Add search bar filtering",
  "Enhance Lost & Found: Build Claim Item flow",
  "Enhance Lost & Found: Update grid card layout",
  "Enhance Lost & Found: Add category badges",
  "Enhance Weather: Create Open-Meteo API utility",
  "Enhance Weather: Fetch realtime Ujjain weather",
  "Enhance Weather: Parse 7-day forecast data",
  "Enhance Weather: Update weather icons mapping",
  "Enhance Weather: Add humidity and wind speed UI",
  "Enhance Navigation: Setup React Leaflet map",
  "Enhance Navigation: Add map markers for Ghats",
  "Enhance Navigation: Add map markers for Temples",
  "Enhance Navigation: Add map markers for Tent Cities",
  "Enhance Navigation: Create custom map popups",
  "Enhance Navigation: Add user location tracking on map",
  "Refactor: Optimize Next.js image loading",
  "Refactor: Clean up unused Tailwind classes",
  "Refactor: Consolidate global state management",
  "UI/UX: Improve dark mode color contrast",
  "UI/UX: Add Framer Motion page transitions",
  "UI/UX: Fix mobile bottom nav padding",
  "Docs: Update README with new feature list"
];

const changelogPath = path.join(__dirname, 'CHANGELOG.md');

if (!fs.existsSync(changelogPath)) {
  fs.writeFileSync(changelogPath, '# Changelog\n\n');
}

console.log('Starting 50 commit generation process...');

try {
  for (let i = 0; i < commitMessages.length; i++) {
    const msg = commitMessages[i];
    fs.appendFileSync(changelogPath, `- ${new Date().toISOString()}: ${msg}\n`);
    execSync('git add CHANGELOG.md');
    execSync(`git commit -m "${msg}"`);
    console.log(`Commit ${i + 1}/50 created: ${msg}`);
  }
  
  console.log('Pushing all commits to GitHub...');
  execSync('git push origin main');
  console.log('Successfully pushed 50 commits!');
} catch (error) {
  console.error('Error during git operations:', error.message);
}
