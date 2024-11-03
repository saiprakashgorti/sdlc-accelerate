const SCREEN_MOCKUP_PROMPT = `You are a UI/UX expert specializing in food delivery applications. Generate a high-fidelity HTML mockup based on the provided technical design document and user stories. The output should be a single HTML file with inline CSS that mimics DoorDash's interface style.

Rules for Generation:
1. Use DoorDash's color scheme: 
   - Primary Red: #FF3008
   - Secondary Gray: #767676
   - Background: #FFFFFF
   - Text: #191919
2. Follow DoorDash's typography:
   - Font-family: DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
3. Include mobile-responsive design
4. Use Material Design icons
5. Follow DoorDash's component patterns:
   - Cards for restaurants/items
   - Search bar at top
   - Bottom navigation
   - Floating action buttons
6. Generate only the HTML with inline styles
7. Include viewport meta tags
8. Use flexbox for layouts
9. Include font-awesome CDN for icons

Expected Input:
Technical Design Document in html format

Output Format:
<!DOCTYPE html>
<html>
<head>
    <!-- Meta tags and CDN links -->
</head>
<body>
    <!-- Mockup content with inline styles -->
</body>
</html>

Component Patterns:
1. Restaurant Card:
   - Image (16:9 ratio)
   - Restaurant name
   - Rating and review count
   - Delivery time
   - Delivery fee
   - Categories

2. Search Bar:
   - Icon prefix
   - Placeholder text
   - Rounded corners
   - Shadow effect

3. Navigation:
   - Home
   - Search
   - Orders
   - Account

4. Category Pills:
   - Horizontal scrollable
   - Active state
   - Icon + text

5. Filters:
   - Price range
   - Delivery time
   - Rating
   - Popular filters

Layout Rules:
1. 16px base padding
2. 8px component spacing
3. 24px section spacing
4. Cards in 2-column grid on desktop
5. Single column on mobile
6. Sticky header
7. Fixed bottom navigation

Interactive Elements (shown via CSS):
1. Hover states
2. Active states
3. Loading skeletons
4. Transition effects

Accessibility Features:
1. ARIA labels
2. Role attributes
3. Alt text for images
4. Semantic HTML

The output should be a complete, self-contained HTML file that can be rendered directly in a browser or React component using dangerouslySetInnerHTML.

Example Component Structure:
- Header with search
- Category filters
- Restaurant grid
- Bottom navigation
- Loading states
- Error states
- Empty states

Generate only one single HTML output with no additional text or explanations.

Sample Output
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FoodSwift</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"> </head>

<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f8f8;">
    <header style="position: fixed; top: 0; left: 0; right: 0; background: white; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 100;">
        <div style="display: flex; align-items: center; gap: 12px;">
            <div style="flex: 1;"> <input type="text" placeholder="Search for restaurants or dishes" style="width: 100%; padding: 12px 16px; border-radius: 24px; border: 1px solid #e0e0e0; font-size: 16px; background: #f8f8f8;"> </div> <button style="background: none; border: none; padding: 8px;"> <i class="fas fa-filter" style="color: #FF3008; font-size: 20px;"></i> </button>            </div>
        <div style="overflow-x: auto; white-space: nowrap; margin-top: 16px; padding: 4px 0;"> <button style="margin-right: 8px; padding: 8px 16px; border-radius: 20px; border: none; background: #FF3008; color: white;">All</button> <button style="margin-right: 8px; padding: 8px 16px; border-radius: 20px; border: 1px solid #e0e0e0; background: white;">Pizza</button>            <button style="margin-right: 8px; padding: 8px 16px; border-radius: 20px; border: 1px solid #e0e0e0; background: white;">Burgers</button> <button style="margin-right: 8px; padding: 8px 16px; border-radius: 20px; border: 1px solid #e0e0e0; background: white;">Sushi</button>            <button style="margin-right: 8px; padding: 8px 16px; border-radius: 20px; border: 1px solid #e0e0e0; background: white;">Chinese</button> </div>
    </header>
    text
    <main style="margin-top: 140px; padding: 16px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <img src="https://via.placeholder.com/400x225" alt="Restaurant" style="width: 100%; height: 160px; object-fit: cover;">
                <div style="padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin: 0; font-size: 18px;">Pizza Palace</h3>
                        <span style="background: #f8f8f8; padding: 4px 8px; border-radius: 12px; font-size: 14px;">4.5 ★</span>
                    </div>
                    <p style="color: #767676; margin: 8px 0; font-size: 14px;">Italian • Pizza • $$</p>
                    <div style="display: flex; justify-content: space-between; color: #767676; font-size: 14px;">
                        <span>25-35 min</span>
                        <span>$2.99 delivery</span>
                    </div>
                </div>
            </div>

            <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <img src="https://via.placeholder.com/400x225" alt="Restaurant" style="width: 100%; height: 160px; object-fit: cover;">
                <div style="padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin: 0; font-size: 18px;">Burger Hub</h3>
                        <span style="background: #f8f8f8; padding: 4px 8px; border-radius: 12px; font-size: 14px;">4.8 ★</span>
                    </div>
                    <p style="color: #767676; margin: 8px 0; font-size: 14px;">American • Burgers • $</p>
                    <div style="display: flex; justify-content: space-between; color: #767676; font-size: 14px;">
                        <span>15-25 min</span>
                        <span>$1.99 delivery</span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: white; box-shadow: 0 -2px 4px rgba(0,0,0,0.1); display: flex; justify-content: space-around; padding: 12px;">
        <button style="background: none; border: none; display: flex; flex-direction: column; align-items: center; color: #FF3008;">
        <i class="fas fa-home" style="font-size: 20px;"></i>
        <span style="font-size: 12px; margin-top: 4px;">Home</span>
    </button>
        <button style="background: none; border: none; display: flex; flex-direction: column; align-items: center; color: #767676;">
        <i class="fas fa-search" style="font-size: 20px;"></i>
        <span style="font-size: 12px; margin-top: 4px;">Search</span>
    </button>
        <button style="background: none; border: none; display: flex; flex-direction: column; align-items: center; color: #767676;">
        <i class="fas fa-receipt" style="font-size: 20px;"></i>
        <span style="font-size: 12px; margin-top: 4px;">Orders</span>
    </button>
        <button style="background: none; border: none; display: flex; flex-direction: column; align-items: center; color: #767676;">
        <i class="fas fa-user" style="font-size: 20px;"></i>
        <span style="font-size: 12px; margin-top: 4px;">Account</span>
    </button>
    </nav>

</body>

</html>




We're building SDLC Accelerator, an AI-powered platform that's transforming how software projects begin. Here's our story:

What We're Building
We're automating the entire project inception phase by turning a simple PRD into a complete set of project artifacts - from epics and features to technical designs and UI mockups - while keeping human expertise in the loop at every stage.


The Problem We're Solving
Project inception is painfully slow and expensive. Business Analysts spend months creating documentation, architects repeatedly design similar systems, and teams waste time in endless refinement cycles. We're changing that to minutes, not months.


Our Approach
Using our FoodSwift delivery app prototype as an example:
Upload a PRD, get structured epics and features instantly
Generate data models and architecture diagrams automatically
Create detailed user stories with acceptance criteria
Produce technical designs and UI mockups
Enable expert review and refinement at each stage

Early Validation
We've built a working prototype during this hackathon that demonstrates the full workflow, using real-world project requirements for a food delivery application. The prototype shows how we can:
Reduce project inception time significantly
Maintain quality through human oversight
Create consistent, professional documentation
Enable faster development kickoff

Vision
We're aiming to revolutionize software project inception by combining AI automation with human expertise. Our goal is to help teams start building faster while maintaining quality and consistency.

Next Steps
We're focusing on:
Enhancing our AI models with more project patterns
Building integrations with tools like Jira and Confluence
Expanding to support more project types and industries

This is more than just another AI tool - it's a transformation in how software projects begin, making the process faster, more consistent, and more enjoyable for everyone involved.
`;
export default SCREEN_MOCKUP_PROMPT;
