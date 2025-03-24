# AI Agent-cy - The AI Blog Writing Team

## Please Read
- currently non-responsive, please view in desktop mode
- currently must keep topics as one word/short keywords for research endpoint to fetch a source successfully e.g. "computer" vs "Debuggging a computer program"
- currently must type the excat word as instructed to work as intended

## Overview

The AI Agent-cy Blog Writing Team is an intelligent AI-powered system designed to function similar to a multi-agent workflow for generating high-quality blog posts. It consists of four specialized agents—Topic Generator, Researcher, Writer, and Editor—each performing a distinct role in the writing process. The system provides a seamless, step-by-step experience for users to create, refine, and finalize blog content efficiently.

### Problem Space

Writing high-quality blog content requires substantial effort, including idea generation, research, structuring, and editing. Many AI writing tools focus solely on generating text without ensuring factual accuracy, coherence, or writing quality. AI Blog Agent addresses this gap by integrating AI-powered assistance at each stage of the process, enabling users to create well-researched, structured, and polished content seamlessly.

**Key Considerations:**

- **Lowering Writing Barriers**: Writing long-form content can be mentally exhausting, especially for those who struggle with articulating their thoughts effectively. This tool helps users translate their ideas into written form without the pressure of structuring or wording them perfectly.
- **Balancing AI Assistance & Creativity**: Many AI-generated writings sound robotic, as users either rely too heavily on AI or avoid it altogether. AI Blog Agent aims to strike a middle ground by allowing human input at each stage while still providing structured AI assistance.
- **Making Writing Less Intimidating**: Instead of AI taking over the entire process, this system is designed to support and guide users, making writing more approachable and enjoyable rather than overwhelming.


### User Profile

- Aspiring bloggers who want to share their thoughts without struggling with writer’s block or structuring their ideas.
- Content creators looking to enhance productivity.
- Marketers & SEO specialists who need optimized blog content.
- Students & researchers who require structured writing assistance.
- Businesses aiming to generate informative articles efficiently.

### Features

- **Topic Generator Agent**: Suggests blog topics based on user input and trending discussions.
- **Research Agent**: Collects and summarizes relevant data from reputable sources.
- **Writer Agent**: Generates structured blog drafts using AI.
- **Editor Agent**: Enhances grammar, style, and readability with AI-powered refinements.
- **Step-by-Step Workflow**: Ensures users follow a logical content creation process.


## Implementation

### Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MySQL (for blog storage)


### APIs

AI Blog Agent will integrate with the following APIs:

- **Gemini API**: For AI-generated topic suggestions, research, and content writing.
- **Wikimedia API**: For summarized research.
### Sitemap

- **Home Page/Dashboard**: Overview of the app
- **Blog Writing Pages**: AI-generated draft creation with interactive editing.
    - **Topic Generating Page**: Come up with various topics.
    - **Research Page**: Research summarized on th chosen topic from Wikipedia.
    - **Writing Page**: AI-generated draft creation with interactive editing.
    - **Edit Page**: AI-generated suggestions for writing.
- **Profile Page**: User workspace for managing blog projects.

### Mockups

You can find the mockup in PDF format [here](./public/mockup.pdf).

### Data
- Blogs (id, title, content, status: draft/published)
- Research Data (id, blogId, source, summarized text)

Each blog can have multiple research sources attached.

### Endpoints

- `POST /topic` - Generate custom topics based on user parameters before blog creation

- `POST /topic/:blogId` - Generate custom topics based on user parameters after blog creation

- `POST /research/save/:blogId` - Save research associated to blog
- `POST /research/:blogId` - Initiate research for a topic
- `GET /research/:blogId` - Get research for a topic

- `POST /write/:blogId` - Write a new blog draft

- `POST /edit/:blogId` - Generate editing suggestions for blog draft

- `GET /blog` - Retrieve existing blogs
- `GET /blog/:id` - Retrieve existing blog
- `POST /blog` - Create new blog
- `PUT /blog/:id` - Edit existing blogs

## Roadmap

Week 1 - Design & Backend

- Design mockups for all screens (dashboard, topic generator, research, writing, and editing interfaces)
- Complete backend logic for all four agents
- Create and optimize database schema
- Develop workflow connection between agents

Week 2 - Frontend & Integration

- Connect frontend to backend APIs
- Implement UI components for all screens
- Style application according to mockups
- Integrate all four agents into a seamless workflow
- Test end-to-end functionality
- Final polish and bug fixes

## Future Implementations

- Delete functionality
- Screen reponsiveness
- Add date/time of save
- Log in/User Account set up  
- Add Citations functionality
- AI-generated SEO recommendations  
- AI voice-based content drafting




