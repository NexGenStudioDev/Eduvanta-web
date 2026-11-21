/**
 * Eduvanta Frontend Configuration
 * Contains all static content, images, headings, and branding
 * loaded directly by the frontend without relying on backend socket or API.
 */

export const EDUVANTA_SOURCEFORGE_URL =
   'https://sourceforge.net/projects/eduvanta/';

export const EDUVANTA_LOGO_URL =
   'https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793010964/030f5f9d-b9c7-4135-b37f-dedb90870eab_lgxmb0.png';

export const EDUVANTA_LOGO_LOCAL = '/logo.png';

// Backward compatibility aliases
export const EDNORA_LOGO_URL = EDUVANTA_LOGO_URL;
export const EDNORA_LOGO_LOCAL = EDUVANTA_LOGO_LOCAL;

const frontendConfig = {
   logo: {
      url: EDUVANTA_LOGO_URL,
      local: EDUVANTA_LOGO_LOCAL,
      alt: 'Eduvanta — Where Knowledge Finds Its Future',
   },

   landingPage: {
      HeroSection: {
         homeBackgroundImage: '/Home_bg.webp',
         homeTitle: 'Learn Today. Build Tomorrow.',
         homeParagraph:
            'At Eduvanta, learning goes beyond textbooks. We help students build strong technical skills, explore new ideas, solve real-world problems, and turn their curiosity into practical knowledge. Through hands-on learning, expert guidance, and project-based education, we prepare students for the opportunities of tomorrow.',
         primaryCTA: 'Explore Our Courses',
         secondaryCTA: 'Discover Eduvanta',
      },
      AboutSection: {
         Heading_First: 'Empowering Students to Shape the Future',
         Heading_Second: 'Empowering Students to Shape the Future',
         paragraph_First:
            'Eduvanta is a learning community focused on technology, innovation, and personal growth. We believe every student should have the opportunity to explore their interests, develop practical skills, and build the confidence to achieve their goals.',
         paragraph_Second:
            'Our learning approach combines academic foundations with hands-on projects, modern computing facilities, and guided mentorship. From understanding core concepts to building real applications, we encourage students to learn by doing and prepare for a rapidly changing digital world.',
         CTA: 'Learn More About Us',
         image_First: '/Rectangle_1.webp',
         image_Second: '/Rectangle-2.webp',
         image_Third: '/Rectangle.webp',
      },
      Mission_and_Goals_Info: {
         heading: 'The Values That Drive Us',
         introduction:
            'We believe meaningful education develops more than technical knowledge. It builds curiosity, responsibility, creativity, and the ability to work with others.',
      },
      Mission_and_Goals: [
         {
            title: 'Innovation',
            content:
               'We encourage students to explore emerging technologies, experiment with new ideas, and develop creative solutions to real-world challenges.',
            image: '/Bagpack.webp',
         },
         {
            title: 'Integrity',
            content:
               'We promote honesty, accountability, respect, and ethical decision-making in every aspect of learning and professional growth.',
            image: '/Knowledge.webp',
         },
         {
            title: 'Excellence',
            content:
               'We strive for continuous improvement through strong academic foundations, practical experience, and a commitment to quality.',
            image: '/Student.webp',
         },
         {
            title: 'Diversity',
            content:
               'We value different perspectives, backgrounds, and experiences, creating a learning environment where everyone has the opportunity to grow.',
            image: '/Clock.webp',
         },
         {
            title: 'Collaboration',
            content:
               'We encourage teamwork through group projects, coding activities, open-source contributions, and collaborative problem-solving.',
            image: '/Webinar.webp',
         },
         {
            title: 'Sustainability',
            content:
               'We inspire students to use technology responsibly and develop solutions that contribute to a smarter, more sustainable future.',
            image: '/Research.webp',
         },
      ],
   },

   aboutPage: {
      AboutHero: {
         image: '/About_Hero.webp',
         Heading:
            'Discover Your Potential. Develop Your Skills. Shape Your Future.',
         paragraph:
            'Every great achievement begins with curiosity and a willingness to learn. At Eduvanta, we create opportunities for students to explore technology, strengthen their knowledge, and develop the practical skills needed to turn ideas into meaningful outcomes.',
      },
      History: {
         title: 'Built Around Learning, Driven by Innovation',
         paragraph_First:
            'Eduvanta was established with a clear purpose: to make technical education relevant to the needs of a changing world. We believe students learn best when strong academic foundations are combined with practical experience and opportunities to explore.',
         paragraph_Second:
            'Our approach focuses on helping learners move beyond theory and understand how knowledge is applied in real situations. Through practical exercises, laboratory sessions, collaborative projects, and guided learning, students can develop skills that extend beyond the classroom.',
         paragraph_Third:
            'As technology continues to evolve, we recognize the importance of keeping learning relevant. We encourage curiosity, independent thinking, and continuous skill development so students can adapt to new challenges and opportunities.',
         paragraph_Four:
            'Our goal is to build a supportive learning environment where students can discover their strengths, develop their potential, and take confident steps toward their academic and professional aspirations.',
      },
      Vision_and_Mission: {
         title: 'Preparing Learners for a Changing World',
         vision_title: 'Our Vision',
         vision_text:
            'To create a learning environment where technology, creativity, and knowledge come together to empower the next generation of innovators, problem-solvers, and technology professionals.',
         mission_title: 'Our Mission',
         mission_text:
            'To provide accessible, practical, and relevant education that helps students develop strong technical foundations, professional skills, and the confidence to pursue their ambitions.',
         beliefs_title: 'What We Believe',
         beliefs: [
            'Learn by doing: Practical experience makes knowledge meaningful.',
            'Think critically: Asking questions leads to deeper understanding.',
            'Build together: Collaboration creates better ideas and stronger solutions.',
            'Keep growing: Continuous learning is essential in a world shaped by technology.',
            'Act responsibly: Knowledge should be used ethically and thoughtfully.',
         ],
         paragraph_First:
            'Our Vision: To create a learning environment where technology, creativity, and knowledge come together to empower the next generation of innovators, problem-solvers, and technology professionals.',
         paragraph_Second:
            'Our Mission: To provide accessible, practical, and relevant education that helps students develop strong technical foundations, professional skills, and the confidence to pursue their ambitions.',
         paragraph_Third:
            'What We Believe: Learn by doing, think critically, build together, keep growing, and act responsibly with knowledge.',
         paragraph_Four:
            'Continuous learning is essential in a world shaped by technology. We inspire students to innovate with purpose and integrity.',
      },
      LearningEnvironment: {
         heading: 'A Space to Learn, Create, and Grow',
         paragraph:
            'A great learning environment supports both academic progress and personal development. Eduvanta aims to provide spaces and resources that encourage focused study, practical experimentation, collaboration, and creativity. From technology-enabled classrooms to hands-on computing facilities, the goal is to help students learn effectively and put their knowledge into practice.',
      },
      Description: {
         image: '/Knowledge.webp',
         heading: 'Facilities Designed Around Student Growth',
         paragraph:
            'The right environment can make learning more engaging and productive. Explore the facilities designed to support academic learning, practical skill development, student well-being, and campus life.',
         price: 'Campus Facilities',
         room: 'Student Spaces',
      },
      FacilitiesSection: {
         heading: 'Facilities Designed Around Student Growth',
         introduction:
            'The right environment can make learning more engaging and productive. Explore the facilities designed to support academic learning, practical skill development, student well-being, and campus life.',
      },
      Facilities: [
         {
            title: 'Advanced Computer Labs',
            Heading: 'Learn Technology Through Practice',
            description:
               'Build practical computing skills in dedicated laboratory environments designed for programming, software development, database practice, and technical experimentation. These spaces help students apply classroom concepts, explore development tools, and work on practical assignments.',
         },
         {
            title: 'Digital Classrooms',
            Heading: 'A More Engaging Learning Experience',
            description:
               'Technology-enabled classrooms support interactive teaching, multimedia presentations, and collaborative learning. They provide opportunities for students to engage with concepts, participate in discussions, and learn through different teaching methods.',
         },
         {
            title: 'Library',
            Heading: 'A Place for Knowledge and Discovery',
            description:
               'Explore books, technical references, journals, and digital learning resources to support your studies and independent research. Quiet study areas and collaborative spaces encourage focused learning, knowledge sharing, and deeper exploration of subjects.',
         },
         {
            title: 'Campus Hostels',
            Heading: 'A Comfortable Place to Call Home',
            description:
               'Residential facilities are designed to support students who need accommodation during their studies. Furnished rooms, internet access, security arrangements, and shared dining and recreation facilities help create a supportive residential environment.',
         },
         {
            title: 'Campus Transport',
            Heading: 'Convenient Connections to Campus',
            description:
               'Campus transport services help students travel between designated city locations and the institution. Planned routes and organized transportation support a more convenient daily commute.',
         },
         {
            title: 'High-Speed Wi-Fi',
            Heading: 'Stay Connected. Keep Learning.',
            description:
               'Internet connectivity supports research, online learning, software development, collaboration, and access to digital resources. Students can use connected learning spaces to explore documentation, work with development tools, and continue learning beyond textbooks.',
         },
         {
            title: 'Innovation and Hackathon Lounge',
            Heading: 'Turn Ideas Into Projects',
            description:
               'A collaborative space for students to experiment, develop prototypes, work in teams, and explore new ideas. Project-building activities and hackathons encourage creative thinking, practical problem-solving, and the confidence to build something of their own.',
         },
         {
            title: 'Health and Wellness',
            Heading: 'Supporting Student Well-Being',
            description:
               'Student well-being is an important part of a positive learning experience. Health and wellness facilities aim to support students through basic medical assistance, first-aid services, and access to appropriate support when needed.',
         },
         {
            title: 'Sports and Athletics',
            Heading: 'Stay Active. Play Together. Grow Stronger.',
            description:
               'Sports and recreational activities encourage physical fitness, teamwork, discipline, and healthy competition. Opportunities to participate in indoor and outdoor games help students balance academic responsibilities with an active campus life.',
         },
         {
            title: 'Career Development and Placement',
            Heading: 'Prepare for Your Next Opportunity',
            description:
               'Career preparation helps students understand professional expectations and develop the skills needed to pursue employment opportunities. Activities such as resume preparation, interview practice, technical workshops, and career guidance can help students approach their next steps with greater confidence.',
         },
      ],
   },

   academicPrograms: {
      heading: 'Find a Learning Path That Fits Your Goals',
      introduction:
         'Whether you want to build a foundation in computing, understand business, or develop practical web development skills, explore learning pathways designed around your interests and future ambitions.',
      programs: [
         {
            name: 'Bachelor of Computer Applications (BCA)',
            duration: '3 Years | 6 Semesters',
            description:
               'Develop a strong foundation in computer applications, programming, and information technology. Explore subjects such as web development, data structures, databases, cloud computing, and software architecture while building the knowledge needed to understand and create software applications.',
            cta: 'Explore BCA',
         },
         {
            name: 'Bachelor of Business Administration (BBA)',
            duration: '3 Years | 6 Semesters',
            description:
               'Build an understanding of business operations, management, and organizational decision-making. Explore areas such as marketing, financial management, business analytics, and strategic planning to develop a foundation for further study and professional growth.',
            cta: 'Explore BBA',
         },
         {
            name: 'Full Stack Web Development Certification',
            duration: '1 Year | Fast-Track Program',
            description:
               'Learn how modern web applications are designed, developed, and deployed. Build practical skills across frontend development, backend programming, databases, and application deployment using technologies such as React, Node.js, Next.js, PostgreSQL, and Docker.',
            cta: 'Explore the Program',
         },
      ],
   },

   gallery: {
      heading: 'Life at Eduvanta',
      introduction:
         'Learning happens in many places, from classrooms and computer labs to collaborative projects and campus events. Explore moments that reflect student creativity, teamwork, academic activities, and the experiences that make campus life meaningful.',
   },

   testimonials: {
      heading: 'Experiences That Inspire Us',
      introduction:
         'Every learning journey is different. Student experiences can offer a valuable perspective on the teaching, resources, and opportunities that shape life at an institution.',
      list: [],
   },

   contactPage: {
      title: "Let's Start a Conversation",
      paragraph:
         "Have questions about admissions, academic programs, campus facilities, or student life? We're here to help. Get in touch with our team to find the information you need and take the next step in your educational journey.",
      location:
         'Eduvanta Campus, Knowledge City, Dhanbad, Jharkhand 826001',
      email: 'info@eduvanta.edu',
      phone: '+91 96613 42993',
      hours: 'Monday to Saturday, 9:00 AM – 5:30 PM',
      cta: 'Contact Our Team',
   },

   authPage: {
      Login: {
         title: 'Welcome Back!',
         paragraph:
            'Continue your learning journey with Eduvanta. Sign in to access your student portal, review available academic information, check attendance, download fee receipts, and stay informed about important updates.',
         button: 'Sign In',
         supporting:
            "Don't have an account? Create one to get started.",
         image: '/login.png',
      },
      SignUp: {
         title: 'Start Your Journey with Eduvanta',
         paragraph:
            'Take the first step toward your academic goals. Create your account to begin the registration process, follow your application progress, and connect with the team for guidance on your next steps.',
         button: 'Create Account',
         supporting: 'Already have an account? Sign in.',
         image: '/signup.png',
      },
   },

   footer: {
      heading: 'Eduvanta — Where Knowledge Finds Its Future',
      paragraph:
         'Helping learners build knowledge, develop practical skills, and explore new possibilities through education, technology, and innovation.',
      closingLine:
         'Learn with purpose. Build with confidence. Grow for the future.',
   },
};

export default frontendConfig;
