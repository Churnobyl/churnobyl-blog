import React from "react";

interface TimelineTabsProps {
  activeTab: string;
  setActiveTab: (
    tab: "all" | "work" | "school" | "certificate" | "project" | "prize"
  ) => void;
}

const TimelineTabs: React.FC<TimelineTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div>
      <div className="text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark">
        <span>Timeline</span>
      </div>

      <div className="w-full overflow-x-auto md:overflow-hidden">
        <div className="inline-flex md:flex space-x-4 mt-4 text-sm justify-center items-center md:justify-start md:text-base whitespace-nowrap">
          {["all", "work", "school", "certificate", "project", "prize"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-main-blue dark:bg-sub-skyblue text-white"
                    : "bg-gray-light"
                }`}
                onClick={() =>
                  setActiveTab(
                    tab as
                      | "all"
                      | "work"
                      | "school"
                      | "certificate"
                      | "project"
                      | "prize"
                  )
                }
              >
                {tab === "all"
                  ? "전체보기"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineTabs;
