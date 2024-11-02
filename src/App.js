import React, { useState, useEffect } from "react";
import "./App.css";
import { getOpenAIResponse } from './services/openaiService';
import * as XLSX from 'xlsx';
import plantumlEncoder from 'plantuml-encoder';
import * as FileSaver from "file-saver";

function App() {
  const [page, setPage] = useState(0);
  const [fileType, setFileType] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [umlUrl, setUmlUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [textFile, setTextFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [plantUMLCode, setPlantUMLCode] = useState(`
    @startuml
    actor User
    User -> System : Uploads Project Requirements
    System -> User : Provides Workflow Steps
    @enduml
  `);

  const nextPage = async (e) => {
    e.preventDefault();
    setAssistantResponse('');
    setError('');
    setLoading(true);

    try {
      let fileContent;
      let prompt;

      if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && excelFile) {
        fileContent = await readExcelFile(excelFile);
        prompt = 'data_analyzer';
      } else if (fileType === 'text/plain' && textFile) {
        fileContent = await readTextFile(textFile);
        prompt = 'rfp_analyzer';
      } else {
        setError('Unsupported file type. Please upload a .txt or .xlsx file.');
        setLoading(false);
        return;
      }

      // const response = await getOpenAIResponse(fileContent, prompt);
      let response = '';
      if (fileType === 'text/plain') {
        response = `{ "epics": [ { "Epic": "Listing Management", "Features": [ "Product Catalog Integration: Enable seamless integration of seller's product catalog for easier listing management.", "Multi-format Listing Support: Allow listings in multiple formats including auctions and fixed-price sales for increased selling flexibility.", "Category-based Organization: Implement category-based organization of listings for improved product discoverability." ] }, { "Epic": "Inventory Management", "Features": [ "Real-time Inventory Sync: Maintain real-time inventory levels across all sales channels to prevent overselling.", "Minimum Threshold Alerts: Enable automated alerts for low stock levels to ensure timely replenishment.", "Automated Restock Triggers: Implement automated triggers for restocking items based on inventory levels and sales velocity." ] }, { "Epic": "Pricing System", "Features": [ "Dynamic Pricing Algorithms: Implement dynamic pricing algorithms to optimize listing prices based on market conditions and demand.", "Auction Management: Enable management of auction-style listings with automated bidding and closing processes.", "Bulk Pricing Updates: Allow sellers to update prices in bulk for efficient listing management." ] }, { "Epic": "Buyer Experience", "Features": [ "Advanced Search Functionality: Implement advanced search capabilities to help buyers find desired products easily.", "Secure Checkout Process: Ensure a secure checkout process with multiple payment methods for improved conversion rates.", "Order Tracking: Provide buyers with real-time tracking of their orders to enhance post-purchase experience." ] }, { "Epic": "Security", "Features": [ "Multi-factor Authentication: Implement multi-factor authentication for user accounts to enhance security.", "Encrypted Communications: Ensure all communications are encrypted to protect sensitive user data.", "Fraud Detection: Implement automated fraud detection mechanisms to protect users and maintain platform integrity." ] }, { "Epic": "Integration", "Features": [ "Third-Party System Integration: Enable integration with key third-party systems such as payment gateways, shipping carriers, and inventory management.", "RESTful API Architecture: Implement a RESTful API architecture to facilitate seamless integration and data exchange with external systems." ] }, { "Epic": "Compliance", "Features": [ "GDPR Compliance: Ensure platform complies with GDPR for data privacy and protection.", "PCI DSS Standards: Adhere to PCI DSS standards for secure payment processing and cardholder data protection." ] }, { "Epic": "Performance", "Features": [ "High Availability: Maintain 99.99% platform uptime for consistent user experience.", "Fast Load Time: Ensure page load time is under 2 seconds for improved user experience and SEO." ] } ] }`;
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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
      }
      setAssistantResponse(response);

      if (response.includes('@startuml')) {
        setPlantUMLCode(response);
        generateUmlUrl(response);
      }
    } catch (err) {
      setError('Error processing the file. Please try again.');
    } finally {
      setLoading(false);
    }

    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Convert each sheet to JSON and concatenate all sheets into one JSON object
        const sheetsData = workbook.SheetNames.map((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          return { sheetName, data: XLSX.utils.sheet_to_json(worksheet, { header: 1 }) };
        });

        // Convert the JSON to a text format for easier readability in GPT-4
        const formattedText = sheetsData
          .map(
            (sheet) =>
              `Sheet: ${sheet.sheetName}\n` +
              sheet.data
                .map((row) => row.join('\t'))
                .join('\n')
          )
          .join('\n\n');

        resolve(formattedText);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const generateUmlUrl = (umlCode) => {
    debugger
    const encoded = plantumlEncoder.encode(umlCode);
    console.log(encoded);
    const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
    setUmlUrl(url);
  };

  return (
    <div className="app">
      <Sidebar page={page} />
      <div className="content">
        {page === 0 && (
          <TextFileUpload file={textFile} setFile={setTextFile} setFileType={setFileType} nextPage={nextPage} />
        )}
        {page === 1 && <DataTableScreen data={assistantResponse} excelFile={excelFile} setExcelFile={setExcelFile} fileType={fileType} setFileType={setFileType} nextPage={nextPage} prevPage={prevPage} />}
        {/* {page === 2 && <WordDocumentScreen wordFile={wordFile} setWordFile={setWordFile} nextPage={nextPage} prevPage={prevPage} />} */}
        {page === 2 && <PlantUMLScreen plantUMLCode={plantUMLCode} setPlantUMLCode={setPlantUMLCode} url={umlUrl} nextPage={nextPage} prevPage={prevPage} />}
        {page === 3 && (
          <HtmlRendererScreen htmlCode={htmlCode} setHtmlCode={setHtmlCode} nextPage={nextPage} prevPage={prevPage} />
        )}
        {page === 4 && <FinalReport pdfFile={textFile} excelFile={excelFile} wordFile={wordFile} plantUMLCode={plantUMLCode} prevPage={prevPage} />}
      </div>
    </div>
  );
}

function Sidebar({ page }) {
  return (
    <div className="sidebar">
      <h2>Workflow Progress</h2>
      {page > 0 && <p>PDF Uploaded</p>}
      {page > 1 && <p>Excel File Processed</p>}
      {page > 2 && <p>Word Document Processed</p>}
      {page > 3 && <p>PlantUML Diagram Processed</p>}
    </div>
  );
}

function TextFileUpload({ file, setFile, fileType, setFileType, nextPage }) {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(selectedFile.type);
  };
  // const handleFileChange = (e) => setPdfFile(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Upload Project Requirements PDF</h2>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {file && (
        <div>
          <button onClick={nextPage}>Next</button>
        </div>
      )}
    </div>
  );
}

function DataTableScreen({ data: jsonData, setExcelFile: setFile, setFileType, nextPage, prevPage }) {
  const [flattenedDataForTable, setFlattenedDataForTable] = useState([]);
  const [flattenedDataForExcel, setFlattenedDataForExcel] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(selectedFile.type);
  };

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
      console.error("Data is not in the expected format. Expected 'data.epics' to be an array.");
    }
  }, [jsonData]);

  // Function to download data as Excel file
  const downloadFile = (filename) => {
    const worksheet = XLSX.utils.json_to_sheet(flattenedDataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, filename);
  };

  return (
    <div className="screen">
      <h2>Project Data Table</h2>

      {flattenedDataForTable.length > 0 ? (
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
                {row.Epic && (
                  <td rowSpan={row.RowSpan}>{row.Epic}</td>
                )}
                <td>{row.Feature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available to display.</p>
      )}

      <button className="btn btn-primary mt-3" onClick={() => downloadFile("grouped_epics_data.xlsx")}>
        Download as Excel
      </button>

      <div className="mt-3">
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
      </div>

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={prevPage}>
          Previous
        </button>
        <button className="btn btn-success" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

function WordDocumentScreen({ wordFile, setWordFile, nextPage, prevPage }) {
  const wordContent = "This is the project overview and initial notes...";
  const handleFileChange = (e) => setWordFile(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Word Document Content</h2>
      <textarea defaultValue={wordContent} readOnly rows={10} />
      <button onClick={() => downloadFile("project_overview.docx")}>Download Word Document</button>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <div>
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

function PlantUMLScreen({ plantUMLCode, setPlantUMLCode, url, nextPage, prevPage }) {
  const handleCodeChange = (e) => setPlantUMLCode(e.target.value);

  return (
    <div className="screen">
      <h2>Project Architecture - PlantUML Diagram</h2>
      <textarea value={plantUMLCode} onChange={handleCodeChange} rows={10} />
      <button onClick={() => downloadFile("project_uml.txt")}>Download PlantUML Code</button>
      <input type="file" accept=".txt" onChange={(e) => setPlantUMLCode(e.target.files[0])} />
      <div>
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <div>
          <h2>Generated UML Diagram</h2>
          <img src={url} alt="PlantUML Diagram" />
        </div>
    </div>
  );
}

function HtmlRendererScreen({ htmlCode, setHtmlCode, nextPage, prevPage }) {
  
  // Handle changes in the HTML input field
  const handleHtmlChange = (e) => {
    setHtmlCode(e.target.value);
  };

  return (
    <div className="screen">
      <h2>Render HTML Code</h2>

      {/* Textarea to input HTML code */}
      <textarea value={htmlCode} onChange={handleHtmlChange} rows={10}></textarea>

      {/* Render the HTML code dynamically */}
      <div className="html-preview" dangerouslySetInnerHTML={{ __html: htmlCode }}></div>

      {/* Navigation buttons */}
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}


function FinalReport({ pdfFile, excelFile, wordFile, plantUMLCode, prevPage }) {
  return (
    <div className="screen">
      <h2>Final Project Report</h2>
      <p>Requirements PDF: {pdfFile ? pdfFile.name : "Not Uploaded"}</p>
      <p>Excel Data Table: {excelFile ? excelFile.name : "Not Uploaded"}</p>
      <p>Word Document: {wordFile ? wordFile.name : "Not Uploaded"}</p>
      <pre>PlantUML Diagram Code: {plantUMLCode}</pre>
      <button onClick={prevPage}>Previous</button>
    </div>
  );
}

function downloadFile(filename) {
  const link = document.createElement("a");
  link.href = `data:text/plain;charset=utf-8,Download content for ${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


export default App;
