import React, { useState, useEffect } from "react";
import "./App.css";
import { getOpenAIResponse } from "./services/openaiService";
import { readExcelFile, readTextFile, generateUmlUrl } from "./helper";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

function App() {
  const [page, setPage] = useState(0);
  const [visitedPages, setVisitedPages] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [txtFile, setTxtFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [plantUMLCode, setPlantUMLCode] = useState(`
    @startuml
    actor User
    User -> System : Uploads Project Requirements
    System -> User : Provides Workflow Steps
    @enduml
  `);
  const [htmlContent, setHtmlContent] = useState(
    "<h1>HTML Content Example</h1><p>This is an example HTML content.</p>"
  );
  const [additionalHtmlContent, setAdditionalHtmlContent] = useState(
    "<h1>Additional HTML Content</h1><p>This is additional HTML content.</p>"
  );
  const [assistantResponse, setAssistantResponse] = useState("");
  const [umlUrl, setUmlUrl] = useState("");
  // const [fileType, setFileType] = useState("");
  const [rfd, setRfd] = useState("");

  const nextPage = async (e) => {
    debugger;
    e.preventDefault();
    setAssistantResponse("");
    try {
      let fileContent;
      let prompt;
      if (page === 0 && txtFile) {
        fileContent = await readTextFile(txtFile);
        prompt = "rfp_analyzer";
      } else if (page === 1 && excelFile) {
        fileContent = await readExcelFile(excelFile);
        prompt = "data_analyzer";
      }
      // const response = await getOpenAIResponse(fileContent, prompt);
      let response = "";
      if (page === 0) {
        response = `{ "epics": [ { "Epic": "Listing Management", "Features": [ "Product Catalog Integration: Enable seamless integration of seller's product catalog for easier listing management.", "Multi-format Listing Support: Allow listings in multiple formats including auctions and fixed-price sales for increased selling flexibility.", "Category-based Organization: Implement category-based organization of listings for improved product discoverability." ] }, { "Epic": "Inventory Management", "Features": [ "Real-time Inventory Sync: Maintain real-time inventory levels across all sales channels to prevent overselling.", "Minimum Threshold Alerts: Enable automated alerts for low stock levels to ensure timely replenishment.", "Automated Restock Triggers: Implement automated triggers for restocking items based on inventory levels and sales velocity." ] }, { "Epic": "Pricing System", "Features": [ "Dynamic Pricing Algorithms: Implement dynamic pricing algorithms to optimize listing prices based on market conditions and demand.", "Auction Management: Enable management of auction-style listings with automated bidding and closing processes.", "Bulk Pricing Updates: Allow sellers to update prices in bulk for efficient listing management." ] }, { "Epic": "Buyer Experience", "Features": [ "Advanced Search Functionality: Implement advanced search capabilities to help buyers find desired products easily.", "Secure Checkout Process: Ensure a secure checkout process with multiple payment methods for improved conversion rates.", "Order Tracking: Provide buyers with real-time tracking of their orders to enhance post-purchase experience." ] }, { "Epic": "Security", "Features": [ "Multi-factor Authentication: Implement multi-factor authentication for user accounts to enhance security.", "Encrypted Communications: Ensure all communications are encrypted to protect sensitive user data.", "Fraud Detection: Implement automated fraud detection mechanisms to protect users and maintain platform integrity." ] }, { "Epic": "Integration", "Features": [ "Third-Party System Integration: Enable integration with key third-party systems such as payment gateways, shipping carriers, and inventory management.", "RESTful API Architecture: Implement a RESTful API architecture to facilitate seamless integration and data exchange with external systems." ] }, { "Epic": "Compliance", "Features": [ "GDPR Compliance: Ensure platform complies with GDPR for data privacy and protection.", "PCI DSS Standards: Adhere to PCI DSS standards for secure payment processing and cardholder data protection." ] }, { "Epic": "Performance", "Features": [ "High Availability: Maintain 99.99% platform uptime for consistent user experience.", "Fast Load Time: Ensure page load time is under 2 seconds for improved user experience and SEO." ] } ] }`;
        setRfd(response);
      } else if (page === 1) {
        response = `@startuml
skinparam class {
BackgroundColor White
ArrowColor Black
BorderColor Black
}
entity "Customer" as CUST {
* customer_id
--
phone_number
email
status
}
entity "Restaurant" as REST {
* restaurant_id
--
name
location
cuisine_type
rating
status
}
entity "Order" as ORD {
* order_id
--
order_date
delivery_time
status
total_amount
}
entity "DeliveryPartner" as DEL {
* partner_id
--
status
current_location
rating
}
entity "MenuItem" as MENU {
* item_id
--
name
price
availability
category
}
entity "Address" as ADDR {
* address_id
--
location
type
}
entity "Payment" as PAY {
* payment_id
--
amount
status
payment_date
}
entity "Analytics" as ANAL {
* report_id
--
report_date
metrics
}
' Relationships
CUST ||--o{ ORD
CUST ||--o{ ADDR
REST ||--o{ MENU
REST ||--o{ ORD
ORD ||--|| DEL
ORD ||--|| PAY
REST ||--o{ ANAL
CUST ||--o{ ANAL
DEL ||--o{ ANAL
@enduml
`;
        setPlantUMLCode(response);
        generateUmlUrl(response, setUmlUrl);
      }
      setAssistantResponse(response);
    } catch (err) {
      console.log("Error processing the file. Please try again." + err);
    }
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      setVisitedPages((prevVisited) => {
        const newVisited = [...prevVisited];
        newVisited[nextPage] = true;
        return newVisited;
      });
      return nextPage;
    });
  };

  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <div className="app">
      <ProgressBar page={page} />
      <Sidebar page={page} setPage={setPage} visitedPages={visitedPages} />
      <div className="content">
        {page === 0 && (
          <TxtUploadScreen txtFile={txtFile} setTxtFile={setTxtFile} />
        )}
        {page === 1 && (
          <DataTableScreen
            data={rfd}
            excelFile={excelFile}
            setExcelFile={setExcelFile}
          />
        )}
        {page === 2 && (
          <PlantUMLScreen
            plantUMLCode={plantUMLCode}
            setPlantUMLCode={setPlantUMLCode}
            umlUrl={umlUrl}
            setUmlUrl={setUmlUrl}
          />
        )}
        {page === 3 && (
          <HtmlContentScreen
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        )}
        {page === 4 && (
          <AdditionalHtmlScreen
            additionalHtmlContent={additionalHtmlContent}
            setAdditionalHtmlContent={setAdditionalHtmlContent}
          />
        )}
        {page === 5 && (
          <FinalReport
            txtFile={txtFile}
            excelFile={excelFile}
            plantUMLCode={plantUMLCode}
            htmlContent={htmlContent}
            additionalHtmlContent={additionalHtmlContent}
          />
        )}
      </div>

      {page > 0 && (
        <button className="arrow arrow-left" onClick={prevPage}>
          <i className="bi bi-arrow-left-circle"></i>
        </button>
      )}
      {page < 5 && (
        <button className="arrow arrow-right" onClick={nextPage}>
          <i className="bi bi-arrow-right-circle"></i>
        </button>
      )}
    </div>
  );
}

function ProgressBar({ page }) {
  const progressPercentage = ((page + 1) / 6) * 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}

function Sidebar({ page, setPage, visitedPages }) {
  return (
    <div className="sidebar">
      <h2>Workflow Progress</h2>
      {visitedPages[0] && (
        <p className={page === 0 ? "active" : ""} onClick={() => setPage(0)}>
          TXT Upload
        </p>
      )}
      {visitedPages[1] && (
        <p className={page === 1 ? "active" : ""} onClick={() => setPage(1)}>
          Excel File Processing
        </p>
      )}
      {visitedPages[2] && (
        <p className={page === 2 ? "active" : ""} onClick={() => setPage(2)}>
          PlantUML Diagram
        </p>
      )}
      {visitedPages[3] && (
        <p className={page === 3 ? "active" : ""} onClick={() => setPage(3)}>
          HTML Content
        </p>
      )}
      {visitedPages[4] && (
        <p className={page === 4 ? "active" : ""} onClick={() => setPage(4)}>
          Additional HTML Content
        </p>
      )}
      {visitedPages[5] && (
        <p className={page === 5 ? "active" : ""} onClick={() => setPage(5)}>
          Final Report
        </p>
      )}
    </div>
  );
}

function TxtUploadScreen({ txtFile, setTxtFile }) {
  const handleFileChange = (e) => setTxtFile(e.target.files[0]);
  return (
    <div className="screen">
      <h2>Upload Project Requirements TXT</h2>
      <input type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
}

function HtmlContentScreen({ htmlContent, setHtmlContent }) {
  const handleFileChange = (e) => setHtmlContent(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Rendered HTML Content</h2>
      <div
        className="html-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div className="fixed-buttons">
        <button
          className="fixed-download"
          onClick={() => downloadFile("html_content.html", htmlContent)}
        >
          Download HTML Content
        </button>
        <input type="file" accept=".html" onChange={handleFileChange} />
      </div>
    </div>
  );
}

function AdditionalHtmlScreen({
  additionalHtmlContent,
  setAdditionalHtmlContent,
}) {
  const handleFileChange = (e) => setAdditionalHtmlContent(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Additional HTML Content</h2>
      <div
        className="html-content"
        dangerouslySetInnerHTML={{ __html: additionalHtmlContent }}
      />
      <div className="fixed-buttons">
        <button
          className="fixed-download"
          onClick={() =>
            downloadFile("additional_html_content.html", additionalHtmlContent)
          }
        >
          Download Additional HTML
        </button>
        <input type="file" accept=".html" onChange={handleFileChange} />
      </div>
    </div>
  );
}

function DataTableScreen({ data: jsonData, excelFile, setExcelFile }) {
  const sampleData = [
    {
      epics: [
        {
          Epic: "Listing Management",
          Features: [
            "Product Catalog Integration: Enable seamless integration of seller's product catalog for easier listing management.",
            "Multi-format Listing Support: Allow listings in multiple formats including auctions and fixed-price sales for increased selling flexibility.",
            "Category-based Organization: Implement category-based organization of listings for improved product discoverability.",
          ],
        },
        {
          Epic: "Inventory Management",
          Features: [
            "Real-time Inventory Sync: Maintain real-time inventory levels across all sales channels to prevent overselling.",
            "Minimum Threshold Alerts: Enable automated alerts for low stock levels to ensure timely replenishment.",
            "Automated Restock Triggers: Implement automated triggers for restocking items based on inventory levels and sales velocity.",
          ],
        },
        {
          Epic: "Pricing System",
          Features: [
            "Dynamic Pricing Algorithms: Implement dynamic pricing algorithms to optimize listing prices based on market conditions and demand.",
            "Auction Management: Enable management of auction-style listings with automated bidding and closing processes.",
            "Bulk Pricing Updates: Allow sellers to update prices in bulk for efficient listing management.",
          ],
        },
        {
          Epic: "Buyer Experience",
          Features: [
            "Advanced Search Functionality: Implement advanced search capabilities to help buyers find desired products easily.",
            "Secure Checkout Process: Ensure a secure checkout process with multiple payment methods for improved conversion rates.",
            "Order Tracking: Provide buyers with real-time tracking of their orders to enhance post-purchase experience.",
          ],
        },
      ],
    },
  ];

  const [flattenedDataForTable, setFlattenedDataForTable] = useState([]);
  const [flattenedDataForExcel, setFlattenedDataForExcel] = useState([]);

  useEffect(() => {
    // Parse the JSON data if it's provided as a string
    let data;
    try {
      data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    } catch (error) {
      console.error("Invalid JSON data", error);
      return;
    }

    // Check if data.epics exists and is an array
    if (data && Array.isArray(data.epics)) {
      const tableData = [];
      const excelData = [];

      data.epics.forEach((epic) => {
        epic.Features.forEach((feature, index) => {
          if (index === 0) {
            tableData.push({
              Epic: epic.Epic,
              Feature: feature,
              RowSpan: epic.Features.length,
            });
          } else {
            tableData.push({
              Epic: "",
              Feature: feature,
              RowSpan: null,
            });
          }
          excelData.push({
            Epic: index === 0 ? epic.Epic : "",
            Feature: feature,
          });
        });
      });

      setFlattenedDataForTable(tableData);
      setFlattenedDataForExcel(excelData);
    } else {
      console.error(
        "Data is not in the expected format. Expected 'data.epics' to be an array."
      );
    }
  }, [jsonData]);

  const downloadExcelFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(flattenedDataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, "grouped_epics_data.xlsx");
  };

  return (
    <div className="screen">
      <h2>Project Data Table</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Epic</th>
            <th>Features</th>
          </tr>
        </thead>
        <tbody>
          {flattenedDataForTable.map((row, index) => (
            <tr key={index}>
              {row.Epic && <td rowSpan={row.RowSpan}>{row.Epic}</td>}
              <td>{row.Feature}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed-buttons">
        <button className="fixed-download" onClick={downloadExcelFile}>
          Download as Excel
        </button>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setExcelFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}

function PlantUMLScreen({ plantUMLCode, setPlantUMLCode, umlUrl, setUmlUrl }) {
  const handleCodeChange = (e) => {
    setPlantUMLCode(e.target.value);
    generateUmlUrl(e.target.value, setUmlUrl);
  };

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      minHeight: '600px'  // Add a minimum height or adjust as needed
    }}>
      <div style={{
        width: '50%',
        padding: '20px',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
          }}
        >Project Architecture - PlantUML Diagram</h2>
        <textarea 
          value={plantUMLCode} 
          onChange={handleCodeChange}
          style={{
            width: '90%',
            flex: 1,
            resize: 'none',
            padding: '10px',
            fontFamily: 'monospace',
            border: '1px solid #ccc',
            marginTop: '10px',
            marginLeft: '35px'
          }} 
        />
      </div>
      
      <div style={{
        width: '50%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
       <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          Generated UML Diagram</h2>
        <div style={{
          flex: 1,
          overflow: 'auto',
          marginTop: '10px'
        }}>
          <img 
            src={umlUrl} 
            alt="PlantUML Diagram" 
            style={{
              width: '100%',
              height: 'auto'
            }} 
          />
        </div>
      </div>
    </div>
  );
}

function FinalReport({
  txtFile,
  excelFile,
  plantUMLCode,
  htmlContent,
  additionalHtmlContent,
}) {
  return (
    <div className="screen">
      <h2>Final Project Report</h2>
      <p>Requirements TXT: {txtFile ? txtFile.name : "Not Uploaded"}</p>
      <p>Excel Data Table: {excelFile ? excelFile.name : "Not Uploaded"}</p>
      <pre>PlantUML Diagram Code: {plantUMLCode}</pre>
      <div
        className="html-preview"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div
        className="html-preview"
        dangerouslySetInnerHTML={{ __html: additionalHtmlContent }}
      />
    </div>
  );
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  FileSaver.saveAs(blob, filename);
}

export default App;
