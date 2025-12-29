import os
import re

# Programs data (same as in courses/index.html)
programs = [
    {"title": "Full Stack Web Development", "brochure": "brochures/FULL STACK WEB DEVELOPMENT.pdf"},
    {"title": "Java Full Stack", "brochure": "brochures/JAVA FULL STACK SYLLABUS COPY.pdf"},
    {"title": "Java Programming", "brochure": "brochures/JAVA-1.pdf"},
    {"title": "Python Programming", "brochure": "brochures/PYTHON.pdf"},
    {"title": "Artificial Intelligence", "brochure": "brochures/Ai Syllabus copy-1.pdf"},
    {"title": "Machine Learning", "brochure": "brochures/ML SYLLABUS COPY.pdf"},
    {"title": "Data Science", "brochure": "brochures/DATA SCIENCE-1.pdf"},
    {"title": "Data Analytics", "brochure": "brochures/DATA ANALYTICS.pdf"},
    {"title": "Business Analytics", "brochure": "brochures/BUSINESS ANALYTICS.pdf"},
    {"title": "Cyber Security", "brochure": "brochures/CYBER SECURITY SYLLABUS COPY.pdf"},
    {"title": "AWS Cloud Computing", "brochure": "brochures/AWS SYLLABUS COPY.pdf"},
    {"title": "DevOps", "brochure": "brochures/DEVOPS.pdf"},
    {"title": "SQL", "brochure": "brochures/SQL.pdf"},
    {"title": "Linux", "brochure": "brochures/LINUX SYLLABUS COPY.pdf"},
    {"title": "C Programming", "brochure": "brochures/C LANGUAGE.pdf"},
    {"title": "Embedded Systems", "brochure": "brochures/EMBEDDED SYSTEMS (1).pdf"},
    {"title": "IoT & Robotics", "brochure": "brochures/IOT & Robotics-1.pdf"},
    {"title": "VLSI Design", "brochure": "brochures/VLSI-1.pdf"},
    {"title": "SolidWorks", "brochure": "brochures/Solid Works Syllabus copies.pdf"},
    {"title": "AutoCAD", "brochure": "brochures/AUTOCAD.pdf"},
    {"title": "CATIA", "brochure": "brochures/CATIA.pdf"},
    {"title": "Revit", "brochure": "brochures/REVIT.pdf"},
    {"title": "Construction Planning & Management", "brochure": "brochures/CONSTRUCTION PLANNING MANAGEMENT (1).pdf"},
    {"title": "Human Resources", "brochure": "brochures/HR.pdf"},
    {"title": "Digital Marketing", "brochure": "brochures/DIGITAL MARKETING.pdf"},
    {"title": "Marketing", "brochure": "brochures/MARKETING.pdf"},
    {"title": "Finance", "brochure": "brochures/FINANCE.pdf"},
    {"title": "Power BI", "brochure": "brochures/POWER BI.pdf"},
    {"title": "SAP", "brochure": "brochures/SAP.pdf"},
    {"title": "ChatGPT & Prompt Engineering", "brochure": "brochures/CHAT GPT.pdf"},
    {"title": "Video Editing", "brochure": "brochures/Video Editing Course.pdf"},
    {"title": "UI / UX Design", "brochure": "brochures/UI&UX.pdf"},
    {"title": "Biomedical Technology", "brochure": "brochures/Biomedical Syllabus Copy.pdf"},
    {"title": "Stock Market", "brochure": "brochures/STOCK MARKETING.pdf"}
]

# Nav and Footer from courses/index.html
nav_html = """
  <!-- Navigation -->
  <nav id="nav">
    <div class="nav-container">
      <div class="logo">
        <a href="../index.html">
          <img src="../logo.png" alt="NxtSync Logo">
        </a>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span class="hamburger"></span>
      </button>
      <ul class="nav-links">
        <li class="dropdown">
          <div class="dropdown-header">
            <a href="../courses/">Programs</a>
            <span class="dropdown-toggle"><i class="fa-solid fa-caret-down"></i></span>
          </div>
          <ul class="dropdown-menu">
            <li><a href="../courses/more/webdev.html">Web Development</a></li>
            <li><a href="../courses/more/AI.html">AI & ML</a></li>
            <li><a href="../courses/more/cc.html">Cloud Computing</a></li>
            <li><a href="../courses/more/uiux.html">UI/UX Design</a></li>
            <li><a href="../courses/">View More</a></li>
          </ul>
        </li>
        <li><a href="../about/">About Us</a></li>
        <li><a href="../contact/">Contact Us</a></li>
        <li><a href="../refer.html">Refer & Earn</a></li>
        <li><a href="https://lms.nxtsync.in/"><span class="nav-icon">👥</span>LMS</a></li>
        <li class="nav-login">
          <a href="javascript:void(0)" class="btn-login">Login</a>
        </li>
      </ul>
    </div>
  </nav>
"""

footer_html = """
<!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="brand-section">
          <div class="brand-logo"><img src="../logo.png" alt="NxtSync Logo"></div>
          <p class="brand-description">Empowering the next generation with cutting-edge courses and exclusive internship opportunities. Building careers, one student at a time.</p>
<div style="display:flex; flex-direction:column; gap:0.8rem; align-items:flex-start;">      
      <a href="/pdf/privacypolicy.pdf" target="_blank" style="color:#fcfbfb; text-decoration:none; font-size:0.95rem; cursor:pointer;">Privacy Policy</a>
      <a href="/pdf/Termsandconditions.pdf" target="_blank" style="color:#fdfbfb; text-decoration:none; font-size:0.95rem; cursor:pointer;">Terms & Conditions</a>
      <a href="/pdf/termsandconditions-interns.pdf" target="_blank" style="color:#fdfbfb; text-decoration:none; font-size:0.95rem; cursor:pointer;">Internship Terms & Conditions</a>
    </div>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <div class="footer-links"><a href="/home/">Home</a><a href="/courses/">Courses</a><a href="/about/">About Us</a><a href="/contact/">Contact Us</a></div>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <div class="contact-info"><div class="contact-item"><a href="https://maps.app.goo.gl/wj1dTCTgNmoQgTGu9" style="text-decoration: none; color: white;" >📍 1st floor, Divya diamonds building, Kavuri Hills Rd, CBI Colony, Madhapur, Hyderabad, Telangana 500033</a></div><div class="contact-item"><a href="tel:+916302655033"  style="text-decoration: none; color: white;">+916302655033</a></div><div class="contact-item"><a href="mailto:support@nxtsync.in" style="color: white; text-decoration: none;">✉️ support@nxtsync.in</a></div></div>
        </div>
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
  <a href="https://www.instagram.com/nxt_sync" class="social-link" target="_blank">
    <i class="fab fa-instagram"></i>
  </a>
  <a href="https://linkedin.com/company/nxtsync" class="social-link" target="_blank">
    <i class="fab fa-linkedin-in"></i>
  </a>
</div>
</div>
      </div>
     
    </div>
  </footer>
  <div class="footer-bottom">
  <div class="copyright">© <span class="year">2025</span> NXTSYNC. All rights reserved.</div>
  <div class="tagline">Building Tomorrow's Leaders Today</div>
</div>
"""

# Function to generate slug
def generate_slug(title):
    return re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')

# Create courses directory if not exists
os.makedirs('courses', exist_ok=True)

# Generate HTML for each program
for program in programs:
    slug = generate_slug(program['title'])
    filename = f'courses/{slug}.html'
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{program['title']} - NxtSync</title>
<style>
/* Include the styles from courses/index.html */
body {{
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: radial-gradient(circle at top right, #111a40, transparent 40%),
              radial-gradient(circle at bottom left, #1b2a6b, transparent 45%),
              #070b1a;
  color: #ffffff;
}}

.pdf-container {{
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}}

.pdf-viewer {{
  width: 100%;
  height: 80vh;
  border: none;
}}
</style>
</head>
<body>
{nav_html}

<section class="pdf-container">
  <h1>{program['title']} - Course Details</h1>
  <iframe src="{program['brochure']}" class="pdf-viewer"></iframe>
</section>

{footer_html}

<script>
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  /* Hamburger toggle */
  navToggle.addEventListener('click', () => {{
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  }});

  /* Dropdown toggle on mobile */
  dropdownToggles.forEach(toggle => {{
    toggle.addEventListener('click', (e) => {{
      e.preventDefault();
      toggle.closest('.dropdown').classList.toggle('open');
    }});
  }});

  /* Close menu when link clicked */
  document.querySelectorAll('.nav-links a').forEach(link => {{
    link.addEventListener('click', () => {{
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    }});
  }});
</script>
</body>
</html>"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f'Created {filename}')

print('All course detail pages generated.')
