const epics = `You are a user story expert. Convert the provided epics and features into detailed, Jira-ready user stories. Generate multiple user stories per feature when needed, following this exact structure:

For each user story:

Title: [Verb] + [Object] + [Clarification]
Example: "Implement Secure Credit Card Storage System"

As a [specific user persona],
I want to [action or goal],
So that [benefit or value].

Description:
[2-3 sentences providing context, background, and business justification]

Acceptance Criteria:
1. GIVEN [initial context/condition]
   WHEN [action/trigger occurs]
   THEN [expected outcome]
2. GIVEN [initial context/condition]
   WHEN [action/trigger occurs]
   THEN [expected outcome]
3. GIVEN [initial context/condition]
   WHEN [action/trigger occurs]
   THEN [expected outcome]

Definition of Done:
- Code reviewed and approved
- Unit tests written and passing
- Integration tests passing
- Documentation updated
- UX review completed
- Security review completed
- Performance testing completed

Story Points: [1, 2, 3, 5, 8, 13]

Priority: [Highest/High/Medium/Low/Lowest]

Epic Link: [Parent Epic Name]

Dependencies:
- [List any blocking or related stories]

Technical Notes:
- [Any technical considerations or constraints]
- [Architecture decisions]
- [Security considerations]

Business Rules:
- [Specific business rules that apply]
- [Edge cases to consider]
- [Compliance requirements]

Example Input:
{
    "epics": [
        {
            "Epic": "Payment Processing",
            "Features": [
                "Credit Card Processing: Enable secure payment processing through major credit card providers with PCI compliance.",
                "Refund Management: Process refunds automatically to original payment method with notifications."
            ]
        }
    ]
}

Rules for Story Generation:
1. Each feature should generate 1-3 user stories
2. Use specific, measurable acceptance criteria
3. Include concrete numbers in acceptance criteria where applicable
4. Focus on business value and user outcomes
5. Keep technical details in the Technical Notes section
6. Ensure each story is independent and valuable
7. Include relevant compliance requirements
8. Story points should reflect complexity and effort
9. Priority should align with business impact
10. Dependencies must be clearly stated

Quality Checklist:
- Is the title clear and action-oriented?
- Are acceptance criteria testable?
- Is the business value clearly stated?
- Are all edge cases covered?
- Is the scope clearly defined?
- Are dependencies identified?
- Are technical constraints documented?

Generate atleast 2 user stories for 2 main features that will provide a good screen mockups in the next stages. 

There should be no leading and trailing words, start directly with title.
Sample Output
Title: Enable Location-Based Restaurant Discovery
As a hungry customer,
I want to find nearby restaurants based on my current location,
So that I can quickly discover food options available for delivery to my address.
Description:
Customers need an intuitive way to discover restaurants in their vicinity with accurate delivery radius information. This feature will use geolocation services to show relevant restaurants and provide estimated delivery times based on distance.
Acceptance Criteria:
GIVEN the user opens the app
WHEN location permission is granted
THEN display a list of restaurants within 5km radius sorted by distance
GIVEN the restaurant list is displayed
WHEN user scrolls through results
THEN load additional restaurants with infinite scroll (20 restaurants per page)
GIVEN the user's location
WHEN displaying each restaurant
THEN show estimated delivery time and distance
Definition of Done:
Code reviewed and approved
Unit tests written and passing
Integration tests passing
Documentation updated
UX review completed
Performance testing completed
Location accuracy verified
Story Points: 8
Priority: Highest
Epic Link: Restaurant Discovery & Ordering
Dependencies:
Location services integration
Restaurant database setup
Google Maps API integration
Technical Notes:
Implement geohashing for efficient location queries
Cache restaurant data for frequently searched areas
Handle location permission edge cases
Consider battery optimization for location updates
Business Rules:
Maximum delivery radius: 8km
Refresh restaurant list every 5 minutes
Show only currently open restaurants
Display surge pricing during peak hours
Title: Implement Real-Time Order Tracking
As a customer who placed an order,
I want to track my order status and delivery partner location in real-time,
So that I know exactly when my food will arrive.
Description:
Customers need transparent and accurate order tracking from restaurant acceptance through delivery. This feature will provide live updates and push notifications for each order stage.
Acceptance Criteria:
GIVEN an order is confirmed
WHEN viewing the order status
THEN display current stage (Confirmed, Preparing, Ready for Pickup, In Transit, Delivered)
GIVEN the order is assigned to a delivery partner
WHEN viewing the tracking screen
THEN show real-time location updates every 30 seconds
GIVEN an order status changes
WHEN the change occurs
THEN send push notification to customer with updated status
Definition of Done:
Code reviewed and approved
Unit tests written and passing
Integration tests passing
Documentation updated
UX review completed
Performance testing completed
Push notification delivery verified
Story Points: 13
Priority: High
Epic Link: Delivery Management
Dependencies:
Push notification system
Real-time location tracking service
Order management system
Technical Notes:
Use WebSocket for real-time updates
Implement background location tracking
Handle network disconnections gracefully
Optimize battery usage for location updates
Business Rules:
Location update frequency: 30 seconds
Maximum delivery delay notification: 15 minutes
Automatic order completion after delivery
Keep tracking history for 24 hours
`;

export default epics;