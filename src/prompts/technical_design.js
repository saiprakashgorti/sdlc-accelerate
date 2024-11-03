const TECHNICAL_DESIGN_PROMPT = `You are a senior technical architect. Generate a complete HTML-formatted Technical Design Document using the provided user stories and CDM. Output must be valid HTML with proper styling.
text
<html>
<head>
<title>Technical Design Document - [Project Name]</title>
<style>
    body { 
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 40px;
        color: #333;
    }
    h1 { 
        color: #2c3e50;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
    }
    h2 { 
        color: #34495e;
        margin-top: 30px;
    }
    h3 { 
        color: #455a64;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f5f5f5;
    }
    .metadata {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    .code-block {
        background: #f6f8fa;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        white-space: pre;
    }
    .plantuml {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px 0;
    }
    .section {
        margin-bottom: 30px;
    }
</style>
</head>
<body>

<h1>Technical Design Document - [Project Name]</h1>

<div class="metadata">
    <strong>Version:</strong> 1.0<br>
    <strong>Last Updated:</strong> [Current Date]<br>
    <strong>Status:</strong> Draft<br>
    <strong>Classification:</strong> Internal
</div>

<div class="section">
    <h2>1. Executive Summary</h2>
    <p>[Executive summary content aligned with user stories]</p>
</div>

<div class="section">
    <h2>2. Scope</h2>
    
    <h3>2.1 In Scope</h3>
    <ul>
        <li>[Feature 1]</li>
        <li>[Feature 2]</li>
    </ul>

    <h3>2.2 Out of Scope</h3>
    <ul>
        <li>[Excluded Item 1]</li>
        <li>[Excluded Item 2]</li>
    </ul>

    <h3>2.3 User Story Mapping</h3>
    <table>
        <tr>
            <th>Story ID</th>
            <th>Description</th>
            <th>Technical Components</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>US-001</td>
            <td>[User Story]</td>
            <td>[Components]</td>
            <td>[H/M/L]</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>3. System Architecture</h2>

    <h3>3.1 Architecture Overview</h3>
    <div class="plantuml">
        [System context diagram]
    </div>

    <h3>3.2 Technology Stack</h3>
    <table>
        <tr>
            <th>Layer</th>
            <th>Technology</th>
            <th>Justification</th>
        </tr>
        <tr>
            <td>Frontend</td>
            <td>[Tech]</td>
            <td>[Reason]</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>4. Detailed Design</h2>

    <h3>4.1 Data Model</h3>
    <div class="plantuml">
        [Enhanced CDM diagram]
    </div>

    <h3>4.2 API Specifications</h3>
    <div class="code-block">
        Endpoint: [Path]
        Method: [GET/POST/PUT/DELETE]
        Description: [Purpose]
        
        Request:
        {
            "field": "type"
        }
        
        Response:
        {
            "field": "type"
        }
    </div>

    <h3>4.3 Component Design</h3>
    [Component details]
</div>

<div class="section">
    <h2>5. Security Design</h2>
    
    <h3>5.1 Authentication</h3>
    <ul>
        <li>Mechanism: [Details]</li>
        <li>Token Management: [Details]</li>
    </ul>

    <h3>5.2 Authorization Matrix</h3>
    <table>
        <tr>
            <th>Role</th>
            <th>Resource</th>
            <th>Permission</th>
        </tr>
        <tr>
            <td>[Role]</td>
            <td>[Resource]</td>
            <td>[CRUD]</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>6. Performance Requirements</h2>
    
    <h3>6.1 Metrics</h3>
    <table>
        <tr>
            <th>Metric</th>
            <th>Target</th>
            <th>Measurement</th>
        </tr>
        <tr>
            <td>Response Time</td>
            <td>[Time]</td>
            <td>[Method]</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>7. Implementation Guidelines</h2>
    [Implementation details]
</div>

<div class="section">
    <h2>8. Testing Strategy</h2>
    [Testing details]
</div>

<div class="section">
    <h2>9. Deployment</h2>
    [Deployment details]
</div>

<div class="section">
    <h2>10. Risks and Mitigations</h2>
    <table>
        <tr>
            <th>Risk</th>
            <th>Impact</th>
            <th>Likelihood</th>
            <th>Mitigation</th>
        </tr>
        <tr>
            <td>[Risk]</td>
            <td>H/M/L</td>
            <td>H/M/L</td>
            <td>[Strategy]</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>11. Dependencies</h2>
    [Dependencies details]
</div>

<div class="section">
    <h2>12. Monitoring and Support</h2>
    [Monitoring details]
</div>

<div class="section">
    <h2>13. Timeline</h2>
    <table>
        <tr>
            <th>Phase</th>
            <th>Duration</th>
            <th>Dependencies</th>
            <th>Deliverables</th>
        </tr>
        <tr>
            <td>[Phase]</td>
            <td>[Time]</td>
            <td>[Deps]</td>
            <td>[Items]</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>14. Appendix</h2>
    
    <h3>14.1 References</h3>
    [References]

    <h3>14.2 Glossary</h3>
    <table>
        <tr>
            <th>Term</th>
            <th>Definition</th>
        </tr>
        <tr>
            <td>[Term]</td>
            <td>[Definition]</td>
        </tr>
    </table>
</div>

</body>
</html>

[RULES:
Replace all placeholder text in [] with actual content
Maintain HTML structure and styling
Include all sections with proper content
Convert PlantUML diagrams to embedded images or SVG
Ensure all tables have proper formatting
Keep consistent styling throughout the document
It should look a proper Technical Design Document CSS wise (add in line css)
Validate HTML before output]

Sample Output
<html>

<head>
    <title>Technical Design Document - FoodSwift</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            font-size: 28px;
        }

        h2 {
            color: #34495e;
            margin-top: 30px;
            font-size: 24px;
            border-left: 4px solid #3498db;
            padding-left: 10px;
        }

        h3 {
            color: #455a64;
            font-size: 20px;
            margin-top: 20px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #f5f5f5;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .metadata {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
            border-left: 4px solid #3498db;
        }

        .code-block {
            background: #f6f8fa;
            padding: 15px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            white-space: pre;
            overflow-x: auto;
        }

        .section {
            margin-bottom: 40px;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>

<body>
    <h1>Technical Design Document - FoodSwift</h1>
    <div class="metadata"> <strong>Version:</strong> 1.0<br> <strong>Last Updated:</strong> November 2, 2024<br> <strong>Status:</strong> Draft<br> <strong>Classification:</strong> Internal </div>
    <div class="section">
        <h2>1. Executive Summary</h2>
        <p>FoodSwift is a comprehensive food delivery platform designed to connect customers, restaurants, and delivery partners through a mobile-first application. The system will handle real-time order tracking, location-based restaurant discovery, and
            secure payment processing, targeting 100,000 monthly active users within 6 months of launch.</p>
    </div>
    <div class="section">
        <h2>2. Scope</h2>
        text
        <h3>2.1 In Scope</h3>
        <ul>
            <li>Location-based restaurant discovery system</li>
            <li>Real-time order tracking and delivery management</li>
            <li>Payment processing and transaction management</li>
            <li>Restaurant and delivery partner dashboards</li>
        </ul>

        <h3>2.2 Out of Scope</h3>
        <ul>
            <li>Restaurant inventory management</li>
            <li>Loyalty program implementation</li>
            <li>Third-party delivery integration</li>
        </ul>

        <h3>2.3 User Story Mapping</h3>
        <table>
            <tr>
                <th>Story ID</th>
                <th>Description</th>
                <th>Technical Components</th>
                <th>Priority</th>
            </tr>
            <tr>
                <td>US-001</td>
                <td>Location-based Restaurant Discovery</td>
                <td>Geolocation, Search API, Maps Integration</td>
                <td>Highest</td>
            </tr>
            <tr>
                <td>US-002</td>
                <td>Real-time Order Tracking</td>
                <td>WebSocket, GPS Tracking, Push Notifications</td>
                <td>High</td>
            </tr>
        </table>

    </div>
    <div class="section">
        <h2>3. System Architecture</h2>
        text
        <h3>3.1 Technology Stack</h3>
        <table>
            <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Justification</th>
            </tr>
            <tr>
                <td>Frontend</td>
                <td>React Native</td>
                <td>Cross-platform mobile development with native performance</td>
            </tr>
            <tr>
                <td>Backend</td>
                <td>Node.js/Express</td>
                <td>Scalable, event-driven architecture for real-time features</td>
            </tr>
            <tr>
                <td>Database</td>
                <td>MongoDB, Redis</td>
                <td>Flexible schema for rapid iterations, in-memory caching</td>
            </tr>
        </table>

    </div>
    <div class="section">
        <h2>4. API Specifications</h2>
        <div class="code-block"> Endpoint: /api/v1/restaurants/nearby Method: GET Description: Fetch nearby restaurants based on user location Request: { "latitude": "number", "longitude": "number", "radius": "number", "filters": { "cuisine": "string[]", "priceRange": "string",
            "rating": "number" } } Response: { "restaurants": [{ "id": "string", "name": "string", "distance": "number", "estimatedDeliveryTime": "number", "rating": "number", "cuisine": "string[]", "isOpen": "boolean" }], "pagination": { "page": "number",
            "totalPages": "number", "hasMore": "boolean" } }
        </div>
    </div>
    <div class="section">
        <h2>5. Security Design</h2>
        text
        <h3>5.1 Authentication</h3>
        <table>
            <tr>
                <th>Component</th>
                <th>Implementation</th>
            </tr>
            <tr>
                <td>User Authentication</td>
                <td>JWT with refresh tokens, OAuth 2.0 for social login</td>
            </tr>
            <tr>
                <td>API Security</td>
                <td>HTTPS, API key authentication, rate limiting</td>
            </tr>
        </table>

    </div>
    <div class="section">
        <h2>6. Performance Requirements</h2>
        text
        <table>
            <tr>
                <th>Metric</th>
                <th>Target</th>
                <th>Measurement Method</th>
            </tr>
            <tr>
                <td>App Launch Time</td>
                <td>
                    < 3 seconds</td>
                        <td>Client-side performance monitoring</td>
            </tr>
            <tr>
                <td>Location Updates</td>
                <td>Every 30 seconds</td>
                <td>Server-side tracking</td>
            </tr>
            <tr>
                <td>Order Processing</td>
                <td>
                    < 2 seconds</td>
                        <td>API response time monitoring</td>
            </tr>
        </table>

    </div>
    <div class="section">
        <h2>7. Monitoring and Support</h2>
        <table>
            <tr>
                <th>Component</th>
                <th>Monitoring Solution</th>
            </tr>
            <tr>
                <td>Application Performance</td>
                <td>New Relic, Datadog</td>
            </tr>
            <tr>
                <td>Error Tracking</td>
                <td>Sentry</td>
            </tr>
            <tr>
                <td>Infrastructure</td>
                <td>AWS CloudWatch</td>
            </tr>
        </table>
    </div>
</body>

</html>
`;

export default TECHNICAL_DESIGN_PROMPT;
