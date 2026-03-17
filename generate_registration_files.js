const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'pages', 'RegisterCOL.jsx');
let templateStr = fs.readFileSync(srcPath, 'utf8');

const events = [
  { filename: 'RegisterBrainiac.jsx', componentName: 'RegisterBrainiac', eventId: 'brainiac', title: 'BRAINIAC', teamSizes: [] },
  { filename: 'RegisterCtrlAltElite.jsx', componentName: 'RegisterCtrlAltElite', eventId: 'ctrlaltelite', title: 'CTRL ALT ELITE', teamSizes: [1, 2] },
  { filename: 'RegisterDPL.jsx', componentName: 'RegisterDPL', eventId: 'dpl', title: 'DPL', teamSizes: [1, 2, 3] },
  { filename: 'RegisterEscapeRoom.jsx', componentName: 'RegisterEscapeRoom', eventId: 'escaperoom', title: 'ESCAPE ROOM', teamSizes: [2, 3, 4] },
  { filename: 'RegisterTreasureTrove.jsx', componentName: 'RegisterTreasureTrove', eventId: 'treasuretrove', title: 'TREASURE TROVE', teamSizes: [2, 3, 4, 5] }
];

const newFormState = "    name: '',\\n    email: '',\\n    phone: '',\\n    altPhone: '',\\n    rollNo: '',\\n    college: '',\\n    year: '',\\n    department: '',\\n    teamSize: '',\\n    transactionId: '',";

const newFieldsJSX = (teamSizes) => {
  let sizeOptions = teamSizes.map(size => '<option value="' + size + '">' + size + '</option>').join('\\n                ');
  
  let jsx = '';
  jsx += '            {/* Team Size */}\\n';
  if (teamSizes.length > 0) {
    jsx += '            <motion.div className="register-field-group" custom={1} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
    jsx += '              <label htmlFor="register-team-size" className="register-label text-[#00ffc8]">Number of Members *</label>\\n';
    jsx += '              <select id="register-team-size" name="teamSize" value={form.teamSize} onChange={handleChange} required className="register-input register-select">\\n';
    jsx += '                <option value="" disabled>Select team size...</option>\\n';
    jsx += '                ' + sizeOptions + '\\n';
    jsx += '              </select>\\n';
    jsx += '            </motion.div>\\n';
  }
  jsx += '            {/* Leader Name */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={2} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-name" className="register-label">Team Leader Name *</label>\\n';
  jsx += '              <input id="register-name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* Leader Email */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={3} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-email" className="register-label">Team Leader Email *</label>\\n';
  jsx += '              <input id="register-email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* Contact Number */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={4} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-phone" className="register-label">Leader Contact Number *</label>\\n';
  jsx += '              <input id="register-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="WhatsApp/Call" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* Alt Contact */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={5} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-alt-phone" className="register-label">Alternate Contact Number *</label>\\n';
  jsx += '              <input id="register-alt-phone" type="tel" name="altPhone" value={form.altPhone} onChange={handleChange} required placeholder="Another phone number" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* Roll No */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={6} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-rollno" className="register-label">Leader Roll No *</label>\\n';
  jsx += '              <input id="register-rollno" type="text" name="rollNo" value={form.rollNo} onChange={handleChange} required placeholder="Registration/Roll Number" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* College */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={7} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-college" className="register-label">College Name *</label>\\n';
  jsx += '              <input id="register-college" type="text" name="college" value={form.college} onChange={handleChange} required placeholder="Your institution" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* Year */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={8} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-year" className="register-label">Year *</label>\\n';
  jsx += '              <select id="register-year" name="year" value={form.year} onChange={handleChange} required className="register-input register-select">\\n';
  jsx += '                <option value="" disabled>Select your year…</option>\\n';
  jsx += '                <option value="1">1st Year</option>\\n';
  jsx += '                <option value="2">2nd Year</option>\\n';
  jsx += '                <option value="3">3rd Year</option>\\n';
  jsx += '                <option value="4">4th Year</option>\\n';
  jsx += '              </select>\\n';
  jsx += '            </motion.div>\\n';
  jsx += '            {/* Department */}\\n';
  jsx += '            <motion.div className="register-field-group" custom={9} initial="hidden" animate="visible" variants={fieldVariants}>\\n';
  jsx += '              <label htmlFor="register-department" className="register-label">Department *</label>\\n';
  jsx += '              <input id="register-department" type="text" name="department" value={form.department} onChange={handleChange} required placeholder="e.g. CSE, IT, ECE" className="register-input" />\\n';
  jsx += '            </motion.div>\\n';
  return jsx;
};

const colStateRegex = /name: '',\\n\\s*email: '',\\n\\s*phone: '',\\n\\s*year: '',\\n\\s*department: '',\\n\\s*teamSize: '1',\\n\\s*teamName: '',\\n\\s*transactionId: '',/g;

for (const event of events) {
  let fileContent = templateStr;
  
  fileContent = fileContent.replace(colStateRegex, newFormState);
  fileContent = fileContent.replace(/eventsData\.find\(\(ev\) => ev\.id === 'codeoflies'\)/g, "eventsData.find((ev) => ev.id === '" + event.eventId + "')");
  fileContent = fileContent.replace(/RegisterPage/g, event.componentName);
  fileContent = fileContent.replace(/>\\s*CODE OF LIES\\s*<\/h1>/g, ">" + event.title + "</h1>");
  fileContent = fileContent.replace(/uniqueFileName = \`COL_/g, "uniqueFileName = `" + event.eventId.toUpperCase() + "_");
  fileContent = fileContent.replace(/registerColForm/g, "register" + event.componentName + "Form");
  fileContent = fileContent.replace(/registerColStep/g, "register" + event.componentName + "Step");

  const startIndex = fileContent.indexOf('{/* Year */}');
  const endIndex = fileContent.indexOf('{/* Payment Section */}');
  const startNameIndex = fileContent.indexOf('{/* Name */}');
  
  if (startNameIndex !== -1 && endIndex !== -1) {
    const before = fileContent.substring(0, startNameIndex);
    const after = fileContent.substring(endIndex);
    fileContent = before + newFieldsJSX(event.teamSizes) + "            " + after;
  }

  const destPath = path.join(__dirname, 'src', 'pages', event.filename);
  fs.writeFileSync(destPath, fileContent);
  console.log("Generated " + event.filename);
}
