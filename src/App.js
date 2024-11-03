import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons

function App() {
  const [page, setPage] = useState(0);
  const [visitedPages, setVisitedPages] = useState([true, false, false, false, false, false]);
  const [txtFile, setTxtFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [plantUMLCode, setPlantUMLCode] = useState(`
    @startuml
    actor User
    User -> System : Uploads Project Requirements
    System -> User : Provides Workflow Steps
    @enduml
  `);
  const [htmlContent, setHtmlContent] = useState("<h1>HTML Content Example</h1><p>This is an example HTML content.</p>");
  const [additionalHtmlContent, setAdditionalHtmlContent] = useState("<h1>Additional HTML Content</h1><p>This is additional HTML content.</p>");

  const nextPage = () => {
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
        {page === 0 && <TxtUploadScreen txtFile={txtFile} setTxtFile={setTxtFile} />}
        {page === 1 && <DataTableScreen excelFile={excelFile} setExcelFile={setExcelFile} />}
        {page === 2 && <PlantUMLScreen plantUMLCode={plantUMLCode} setPlantUMLCode={setPlantUMLCode} />}
        {page === 3 && <HtmlContentScreen htmlContent={htmlContent} setHtmlContent={setHtmlContent} />}
        {page === 4 && <AdditionalHtmlScreen additionalHtmlContent={additionalHtmlContent} setAdditionalHtmlContent={setAdditionalHtmlContent} />}
        {page === 5 && <FinalReport txtFile={txtFile} excelFile={excelFile} plantUMLCode={plantUMLCode} htmlContent={htmlContent} additionalHtmlContent={additionalHtmlContent} />}
      </div>

      {page > 0 && <button className="arrow arrow-left" onClick={prevPage}><i className="bi bi-arrow-left-circle"></i></button>}
      {page < 5 && <button className="arrow arrow-right" onClick={nextPage}><i className="bi bi-arrow-right-circle"></i></button>}
    </div>
  );
}

function ProgressBar({ page }) {
  const progressPercentage = ((page + 1) / 6) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
    </div>
  );
}

function Sidebar({ page, setPage, visitedPages }) {
  return (
    <div className="sidebar">
      <h2>Workflow Progress</h2>
      {visitedPages[0] && <p className={page === 0 ? "active" : ""} onClick={() => setPage(0)}>TXT Upload</p>}
      {visitedPages[1] && <p className={page === 1 ? "active" : ""} onClick={() => setPage(1)}>Excel File Processing</p>}
      {visitedPages[2] && <p className={page === 2 ? "active" : ""} onClick={() => setPage(2)}>PlantUML Diagram</p>}
      {visitedPages[3] && <p className={page === 3 ? "active" : ""} onClick={() => setPage(3)}>HTML Content</p>}
      {visitedPages[4] && <p className={page === 4 ? "active" : ""} onClick={() => setPage(4)}>Additional HTML Content</p>}
      {visitedPages[5] && <p className={page === 5 ? "active" : ""} onClick={() => setPage(5)}>Final Report</p>}
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
      <div className="html-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <div className="fixed-buttons">
        <button className="fixed-download" onClick={() => downloadFile("html_content.html", htmlContent)}>Download HTML Content</button>
        <input type="file" accept=".html" onChange={handleFileChange} />
      </div>
    </div>
  );
}

function AdditionalHtmlScreen({ additionalHtmlContent, setAdditionalHtmlContent }) {
  const handleFileChange = (e) => setAdditionalHtmlContent(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Additional HTML Content</h2>
      <div className="html-content" dangerouslySetInnerHTML={{ __html: additionalHtmlContent }} />
      <div className="fixed-buttons">
        <button className="fixed-download" onClick={() => downloadFile("additional_html_content.html", additionalHtmlContent)}>Download Additional HTML</button>
        <input type="file" accept=".html" onChange={handleFileChange} />
      </div>
    </div>
  );
}

function DataTableScreen({ excelFile, setExcelFile }) {
  const sampleData = [
    { 
      "epics": [ 
        { 
          "Epic": "Listing Management", 
          "Features": [ 
            "Product Catalog Integration: Enable seamless integration of seller's product catalog for easier listing management.", 
            "Multi-format Listing Support: Allow listings in multiple formats including auctions and fixed-price sales for increased selling flexibility.", 
            "Category-based Organization: Implement category-based organization of listings for improved product discoverability." 
          ] 
        }, 
        { 
          "Epic": "Inventory Management", 
          "Features": [ 
            "Real-time Inventory Sync: Maintain real-time inventory levels across all sales channels to prevent overselling.", 
            "Minimum Threshold Alerts: Enable automated alerts for low stock levels to ensure timely replenishment.", 
            "Automated Restock Triggers: Implement automated triggers for restocking items based on inventory levels and sales velocity." 
          ] 
        }, 
        { 
          "Epic": "Pricing System", 
          "Features": [ 
            "Dynamic Pricing Algorithms: Implement dynamic pricing algorithms to optimize listing prices based on market conditions and demand.", 
            "Auction Management: Enable management of auction-style listings with automated bidding and closing processes.", 
            "Bulk Pricing Updates: Allow sellers to update prices in bulk for efficient listing management." 
          ] 
        }, 
        { 
          "Epic": "Buyer Experience", 
          "Features": [ 
            "Advanced Search Functionality: Implement advanced search capabilities to help buyers find desired products easily.", 
            "Secure Checkout Process: Ensure a secure checkout process with multiple payment methods for improved conversion rates.", 
            "Order Tracking: Provide buyers with real-time tracking of their orders to enhance post-purchase experience." 
          ] 
        }
      ] 
    }
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

  const downloadExcelFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(flattenedDataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
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
              {row.Epic && (
                <td rowSpan={row.RowSpan}>{row.Epic}</td>
              )}
              <td>{row.Feature}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed-buttons">
        <button className="fixed-download" onClick={downloadExcelFile}>Download as Excel</button>
        <input type="file" accept=".xlsx" onChange={(e) => setExcelFile(e.target.files[0])} />
      </div>
    </div>
  );
}

function PlantUMLScreen({ plantUMLCode, setPlantUMLCode }) {
  const handleCodeChange = (e) => setPlantUMLCode(e.target.value);

  return (
    <div className="screen">
      <h2>Project Architecture - PlantUML Diagram</h2>
      <textarea value={plantUMLCode} onChange={handleCodeChange} rows={10} />
      <div className="fixed-buttons">
        <button className="fixed-download" onClick={() => downloadFile("project_uml.txt", plantUMLCode)}>Download PlantUML Code</button>
        <input type="file" accept=".txt" onChange={(e) => setPlantUMLCode(e.target.files[0])} />
      </div>
    </div>
  );
}

function FinalReport({ txtFile, excelFile, plantUMLCode, htmlContent, additionalHtmlContent }) {
  return (
    <div className="screen">
      <h2>Final Project Report</h2>
      <p>Requirements TXT: {txtFile ? txtFile.name : "Not Uploaded"}</p>
      <p>Excel Data Table: {excelFile ? excelFile.name : "Not Uploaded"}</p>
      <pre>PlantUML Diagram Code: {plantUMLCode}</pre>
      <div className="html-preview" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <div className="html-preview" dangerouslySetInnerHTML={{ __html: additionalHtmlContent }} />
    </div>
  );
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  FileSaver.saveAs(blob, filename);
}

export default App;
