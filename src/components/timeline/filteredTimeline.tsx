import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StarSvg from "../../images/starSvg";
import { colorMapper } from "./colorMapper";
import { Link } from "gatsby";

export interface TimelineItem {
  id: string;
  type: "work" | "school" | "certificate" | "project" | "star" | "prize";
  date: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactElement;
  relatedPost: string;
  tags?: string[];
}

interface FilteredTimelineProps {
  timelineData: TimelineItem[];
  activeTab:
    | "all"
    | "work"
    | "school"
    | "certificate"
    | "project"
    | "star"
    | "prize";
}

const FilteredTimeline: React.FC<FilteredTimelineProps> = ({
  timelineData,
  activeTab,
}) => {
  const filteredData =
    activeTab === "all"
      ? timelineData
      : timelineData.filter((item) => item.type === activeTab);

  return (
    <VerticalTimeline
      className={"w-full"}
      layout={"1-column-left"}
      lineColor={"#F1F1F1"}
    >
      {filteredData.reverse().map((item, index) =>
        item.type === "star" ? (
          <VerticalTimelineElement
            key={item.id}
            iconStyle={{ background: colorMapper[item.type], color: "#fff" }}
            icon={<StarSvg />}
          />
        ) : (
          <VerticalTimelineElement
            key={item.id}
            className="vertical-timeline-element--work"
            contentStyle={{
              borderColor: colorMapper[item.type],
              borderTopWidth: "4px",
              background: "#F1F1F1",
              color: "#24292e",
              boxShadow: "none",
            }}
            contentArrowStyle={{
              borderRight: `7px solid #fff`,
            }}
            date={item.date}
            iconStyle={{ background: colorMapper[item.type], color: "#fff" }}
            icon={item.icon}
          >
            <h3 className="vertical-timeline-element-title font-bold">
              {item.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              {item.subtitle}
            </h4>
            <p className="text-sm">{item.description}</p>
            <div
              className={
                "text-main-blue dark:text-sub-skyblue w-full flex flex-wrap gap-2 mt-2"
              }
            >
              {item.tags &&
                item.tags.map((tag) => (
                  <div className={"inline text-sm"}>#{tag}</div>
                ))}
            </div>
            {item.relatedPost && (
              <div className={"mt-4"}>
                <a href={item.relatedPost} target="__blank">
                  <div
                    className={
                      "inline bg-main-blue dark:bg-sub-skyblue rounded-2xl py-1 px-2 text-white text-sm"
                    }
                  >
                    보기
                  </div>
                </a>
              </div>
            )}
          </VerticalTimelineElement>
        )
      )}
    </VerticalTimeline>
  );
};

export default FilteredTimeline;
