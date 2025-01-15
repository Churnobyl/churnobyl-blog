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
    <div className="w-full flex space-x-4 mt-4">
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
  );
};

export default TimelineTabs;
