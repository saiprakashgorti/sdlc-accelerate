import React, { useState } from "react";
import "./App.css";

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
      {pdfFile && <button onClick={nextPage}>Next</button>}
    </div>
  );
}

function DataTableScreen({ excelFile, setExcelFile, nextPage, prevPage }) {
  const sampleData = [
    { Task: "Define Project Scope", DueDate: "2024-11-10", Status: "Not Started" },
    { Task: "Data Collection", DueDate: "2024-11-12", Status: "In Progress" },
    { Task: "Model Training", DueDate: "2024-11-20", Status: "Pending" }
  ];

  const handleFileChange = (e) => setExcelFile(e.target.files[0]);

  return (
    <div className="screen">
      <h2>Project Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, index) => (
            <tr key={index}>
              <td>{row.Task}</td>
              <td>{row.DueDate}</td>
              <td>{row.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => downloadFile("project_data.xlsx")}>Download as Excel</button>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {excelFile && <button onClick={nextPage}>Next</button>}
      <button onClick={prevPage}>Previous</button>
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
      {wordFile && <button onClick={nextPage}>Next</button>}
      <button onClick={prevPage}>Previous</button>
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
      {plantUMLCode && <button onClick={nextPage}>Next</button>}
      <button onClick={prevPage}>Previous</button>
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
