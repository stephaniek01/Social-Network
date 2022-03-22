import React, { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";

const DashboardContent = () => {
  const [currentTab, setCurrentTab] = useState("education");

  const renderTable = () => {
    switch (currentTab) {
      case "education":
        return <Education />;
      case "experience":
      default:
        return <Experience />;
    }
  };
  return (
    <div className="mt-4">
      <ul className="border-b-2 border-gray-200 list-outside">
        <li
          className={`inline-block cursor-pointer ${
            currentTab === "education" &&
            "border-b-2 border-green-600 font-semibold text-black"
          }`}
        >
          <button className="px-4 py-2" onClick={() => setCurrentTab("education")}>Education</button>
        </li>
        <li
          className={`inline-block cursor-pointer ${
            currentTab === "experience" &&
            "border-b-2 border-green-600 font-semibold text-black"
          }`}
        >
          <button className="px-4 py-2" onClick={() => setCurrentTab("experience")}>
            Experience
          </button>
        </li>
      </ul>

      <div>{renderTable()}</div>
    </div>
  );
};

export default DashboardContent;
