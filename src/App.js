import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

function App() {
  const [page, setPage] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const [plantUMLCode, setPlantUMLCode] = useState(`
    @startuml
    actor User
    User -> System : Uploads Project Requirements
    System -> User : Provides Workflow Steps
    @enduml
  `);

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <div className="app">
      <Sidebar page={page} />
      <div className="content">
        {page === 0 && (
          <PDFUploadScreen pdfFile={pdfFile} setPdfFile={setPdfFile} nextPage={nextPage} />
        )}
        {page === 1 && <DataTableScreen excelFile={excelFile} setExcelFile={setExcelFile} nextPage={nextPage} prevPage={prevPage} />}
        {page === 2 && <WordDocumentScreen wordFile={wordFile} setWordFile={setWordFile} nextPage={nextPage} prevPage={prevPage} />}
        {page === 3 && <PlantUMLScreen plantUMLCode={plantUMLCode} setPlantUMLCode={setPlantUMLCode} nextPage={nextPage} prevPage={prevPage} />}
        {page === 4 && <FinalReport pdfFile={pdfFile} excelFile={excelFile} wordFile={wordFile} plantUMLCode={plantUMLCode} prevPage={prevPage} />}
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

function PDFUploadScreen({ pdfFile, setPdfFile, nextPage }) {
  const handleFileChange = (e) => setPdfFile(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Upload Project Requirements PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfFile && (
        <div>
          <button onClick={nextPage}>Next</button>
        </div>
      )}
    </div>
  );
}

function DataTableScreen({ excelFile, setExcelFile, nextPage, prevPage }) {
  const sampleData = [
    { "epics": [ { "Epic": "Listing Management", "Features": [ "Product Catalog Integration: Enable seamless integration of seller's product catalog for easier listing management.", "Multi-format Listing Support: Allow listings in multiple formats including auctions and fixed-price sales for increased selling flexibility.", "Category-based Organization: Implement category-based organization of listings for improved product discoverability." ] }, { "Epic": "Inventory Management", "Features": [ "Real-time Inventory Sync: Maintain real-time inventory levels across all sales channels to prevent overselling.", "Minimum Threshold Alerts: Enable automated alerts for low stock levels to ensure timely replenishment.", "Automated Restock Triggers: Implement automated triggers for restocking items based on inventory levels and sales velocity." ] }, { "Epic": "Pricing System", "Features": [ "Dynamic Pricing Algorithms: Implement dynamic pricing algorithms to optimize listing prices based on market conditions and demand.", "Auction Management: Enable management of auction-style listings with automated bidding and closing processes.", "Bulk Pricing Updates: Allow sellers to update prices in bulk for efficient listing management." ] }, { "Epic": "Buyer Experience", "Features": [ "Advanced Search Functionality: Implement advanced search capabilities to help buyers find desired products easily.", "Secure Checkout Process: Ensure a secure checkout process with multiple payment methods for improved conversion rates.", "Order Tracking: Provide buyers with real-time tracking of their orders to enhance post-purchase experience." ] }, { "Epic": "Security", "Features": [ "Multi-factor Authentication: Implement multi-factor authentication for user accounts to enhance security.", "Encrypted Communications: Ensure all communications are encrypted to protect sensitive user data.", "Fraud Detection: Implement automated fraud detection mechanisms to protect users and maintain platform integrity." ] }, { "Epic": "Integration", "Features": [ "Third-Party System Integration: Enable integration with key third-party systems such as payment gateways, shipping carriers, and inventory management.", "RESTful API Architecture: Implement a RESTful API architecture to facilitate seamless integration and data exchange with external systems." ] }, { "Epic": "Compliance", "Features": [ "GDPR Compliance: Ensure platform complies with GDPR for data privacy and protection.", "PCI DSS Standards: Adhere to PCI DSS standards for secure payment processing and cardholder data protection." ] }, { "Epic": "Performance", "Features": [ "High Availability: Maintain 99.99% platform uptime for consistent user experience.", "Fast Load Time: Ensure page load time is under 2 seconds for improved user experience and SEO." ] } ] }
  ];  

  const flattenedDataForTable = [];
  const flattenedDataForExcel = [];

  sampleData[0].epics.forEach((epic) => {
    epic.Features.forEach((feature, index) => {
      if (index === 0) {
        flattenedDataForTable.push({
          Epic: epic.Epic,
          Feature: feature,
          RowSpan: epic.Features.length,
        });
      } else {
        flattenedDataForTable.push({
          Epic: "",
          Feature: feature,
          RowSpan: null,
        });
      }
      flattenedDataForExcel.push({
        Epic: index === 0 ? epic.Epic : "",
        Feature: feature,
      });
    });
  });

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

      <button className="btn btn-primary mt-3" onClick={() => downloadFile("grouped_epics_data.xlsx")}>
        Download as Excel
      </button>

      <div className="mt-3">
        <input type="file" accept=".xlsx" onChange={(e) => setExcelFile(e.target.files[0])} />
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

function PlantUMLScreen({ plantUMLCode, setPlantUMLCode, nextPage, prevPage }) {
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
