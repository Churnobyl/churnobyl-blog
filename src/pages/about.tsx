import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import "react-vertical-timeline-component/style.min.css";
import StoryComponent from "../components/about/storyComponent";
import NormalLayout from "../components/layout/normalLayout";
import FilteredTimeline, {
  TimelineItem,
} from "../components/timeline/filteredTimeline";
import TimelineTabs from "../components/timeline/timelineTabs";
import SchoolSvg from "../images/schoolSvg";
import WorkSvg from "../images/workSvg";
import CertificateSvg from "../images/certificateSvg";
import ProjectSvg from "../images/projectSvg";
import StarSvg from "../images/starSvg";
import PrizeSvg from "../images/prizeSvg";

const About = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "work" | "school" | "certificate" | "project" | "star" | "prize"
  >("all");

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { name: { eq: "portrait" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  `);

  const portraitImage = data.allFile.nodes[0].childImageSharp.gatsbyImageData;

  const timelineData: TimelineItem[] = [
    {
      id: "3929a085-c9cc-4a3e-93b1-60f8276396f0",
      type: "star",
      date: "",
      title: "",
      subtitle: "",
      description: "",
      icon: <StarSvg />,
      relatedPost: "",
    },
    {
      id: "e8548bb8-08fe-4357-9a5b-1eb1f4155374",
      type: "certificate",
      date: "2019",
      title: "JLPT N3",
      subtitle: "일본국제교육협회",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["외국어", "일본어"],
    },
    {
      id: "07348f5a-6770-4a7e-97e8-b5dc71437405",
      type: "school",
      date: "2013.03 - 2020.07",
      title: "숭실대학교",
      subtitle: "화학공학과 졸업",
      description: "",
      icon: <SchoolSvg />,
      relatedPost: "",
      tags: ["전공", "화학공학과"],
    },
    {
      id: "becc547a-f8e0-45e5-83e5-4199051a4456",
      type: "certificate",
      date: "2020.09",
      title: "화공기사",
      subtitle: "한국산업인력공단",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["전공", "화학공학과"],
    },

    {
      id: "b7288fe4-e371-424e-ab9b-0d9d1528ff85",
      type: "work",
      date: "2020.11 - 2022.11",
      title: "코스모화학",
      subtitle: "생산관리",
      description:
        "부산물 활용 신규 제품 생산 및 공장 내 폐기물 감소, 폐수 정화 및 배출 관리",
      icon: <WorkSvg />,
      relatedPost: "",
      tags: ["전공", "화학공학과", "실무경험"],
    },
    {
      id: "cbcf9faf-ad66-4db3-afb8-1f015b89b0c9",
      type: "school",
      date: "2023.03 - 2023.07",
      title: "스파르타 코딩클럽 내일배움캠프",
      subtitle: "AI트랙 5기 수료",
      description:
        "Python Django Rest Framework 기반 웹 서비스 경험 (Numpy, Pandas, OpenCV 등 활용)",
      icon: <SchoolSvg />,
      relatedPost: "",
      tags: ["부트캠프", "Python", "Django", "Numpy", "Pandas", "OpenCV", "AI"],
    },
    {
      id: "85c29a67-7def-4545-aa6e-2a267d526f24",
      type: "project",
      date: "2023.06 - 2023.07",
      title: "한국어 학습 서비스 'Han' 프로젝트",
      subtitle: "내일배움캠프 최종 프로젝트",
      description: "쉽고 재미있게 퀴즈를 통해 한국어를 학습할 수 있는 서비스",
      icon: <ProjectSvg />,
      relatedPost: "https://zeus2141.tistory.com/49",
      tags: ["Python", "Django", "JavaScript", "PostgreSQL", "Nlp"],
    },
    {
      id: "00ef2bd5-250b-47fc-a8af-24e36ff4be6c",
      type: "certificate",
      date: "2023.08",
      title: "PCCP Python Lv.1",
      subtitle: "그랩",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["알고리즘", "Python"],
    },
    {
      id: "058328bf-3f9e-4f19-8f63-8999a2e9aaa8",
      type: "certificate",
      date: "2023.10",
      title: "SQLD (SQL 개발자)",
      subtitle: "한국데이터산업진흥원",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["SQL"],
    },
    {
      id: "d10bef23-f8f4-43a2-b57f-f276019f84c8",
      type: "certificate",
      date: "2024.03",
      title: "ADsP (데이터 분석 준전문가)",
      subtitle: "한국데이터산업진흥원",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["데이터 분석"],
    },
    {
      id: "4ccfdda1-0ba0-48c5-8b00-0f16404f1eb6",
      type: "project",
      date: "2024.05",
      title: "기부 SNS 'Pistachio' 프로젝트",
      subtitle: "삼성 청년 SW 아카데미 1학기 최종 프로젝트",
      description:
        "기부자와 대상자의 직접 소통을 통해 기부 열정을 되살리는 SNS 서비스",
      icon: <ProjectSvg />,
      relatedPost: "",
      tags: ["Spring", "MyBatis", "MariaDB", "Redis"],
    },
    {
      id: "99b3cb92-4ede-447a-95b9-15a3e00cc69b",
      type: "prize",
      date: "2024.05",
      title: "삼성청년SW아카데미 1학기 최종 프로젝트 우수상 (2등)",
      subtitle: "삼성전자주식회사",
      description: "",
      icon: <PrizeSvg />,
      relatedPost: "",
    },
    {
      id: "c5480835-6b5b-4686-8015-b0378aefabed",
      type: "school",
      date: "2024.01 - 2024.06",
      title: "삼성 청년 SW 아카데미",
      subtitle: "11기 자바 비전공반 1학기 수료",
      description:
        "1학기: Java Spring, Vue.js 기반 웹 서비스 개발 경험 및 알고리즘 학습 / 2학기: 6개월간 3개의 프로젝트 수행",
      icon: <SchoolSvg />,
      relatedPost: "",
      tags: ["부트캠프", "Java", "Spring", "Vuejs"],
    },
    {
      id: "6f848da7-bda7-4dd3-9087-221aae36573a",
      type: "certificate",
      date: "2024.06",
      title: "정보처리기사",
      subtitle: "한국산업인력공단",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["CS"],
    },
    {
      id: "5a59f04e-b650-4e98-8f2f-518768910468",
      type: "project",
      date: "2024.07 - 2024.08",
      title: "AICoup 보드게임 프로젝트",
      subtitle: "삼성 청년 SW 아카데미 2학기 공통 프로젝트",
      description:
        "Jetson Orin Nano에 Yolov8s 모델 이식 및 ChatGPT Fine Tuning, AIoT 기반 1인 보드게임 서비스",
      icon: <ProjectSvg />,
      relatedPost: "",
      tags: [
        "AI",
        "AIoT",
        "Yolo",
        "Jetson Orin Nano",
        "Spring",
        "React",
        "Redis",
        "WebSocket",
        "MariaDB",
        "Docker",
      ],
    },
    {
      id: "1151a02c-d509-4308-9498-a3ae1a819c2b",
      type: "project",
      date: "2024.09 - 2024.10",
      title: "유기견 빅데이터 추천 서비스 '잎새' 프로젝트",
      subtitle: "삼성 청년 SW 아카데미 2학기 특별 프로젝트",
      description:
        "국가동물보호정보시스템의 유기견 데이터를 활용한 종, 색상, 크기 기반 추천 서비스 (코사인 유사도 계산 적용)",
      icon: <ProjectSvg />,
      relatedPost: "",
      tags: [
        "데이터 분석",
        "빅데이터",
        "Spring",
        "React",
        "Redis",
        "MySQL",
        "Docker",
      ],
    },
    {
      id: "75109f77-2e52-413d-8b34-af390d652fd3",
      type: "project",
      date: "2024.10 - 2024.11",
      title: "Pipe Watch 디지털 트윈 기반 파이프 관리 플랫폼",
      subtitle: "삼성 청년 SW 아카데미 2학기 자율 프로젝트",
      description:
        "스마트팩토리 구축을 위한 디지털 트윈 기반 파이프 관리 서비스 (단일 사진으로 3D 파이프 모델링)",
      icon: <ProjectSvg />,
      relatedPost: "https://pipewatch.co.kr",
      tags: [
        "스마트 팩토리",
        "디지털 트윈",
        "Spring",
        "Kubernetes",
        "ArgoCD",
        "GitOps",
        "PostgreSQL",
      ],
    },
    {
      id: "90d15ffe-f6bb-46e9-bd24-17449e9eb9a5",
      type: "prize",
      date: "2024.11",
      title: "삼성청년SW아카데미 자율 프로젝트 우수상 (1등)",
      subtitle: "삼성전자주식회사",
      description: "",
      icon: <PrizeSvg />,
      relatedPost: "",
    },
    {
      id: "1f55ebb8-fb86-4751-b6fc-8eba48c3173a",
      type: "prize",
      date: "2024.11",
      title: "삼성청년SW아카데미 자율 프로젝트 전국 결선발표회 3등",
      subtitle: "삼성전자주식회사",
      description: "",
      icon: <PrizeSvg />,
      relatedPost: "",
    },
    {
      id: "7eff0ba3-e246-42a0-97c3-60a8aaab7277",
      type: "certificate",
      date: "2024.12",
      title: "PCCP Java Lv.2",
      subtitle: "그랩",
      description: "",
      icon: <CertificateSvg />,
      relatedPost: "",
      tags: ["Java", "알고리즘"],
    },
  ];

  return (
    <NormalLayout>
      <div className="flex justify-center items-center space-y-10 mt-8 xl:mt-10 w-full mx-auto px-1 flex-col">
        <div className="w-full md:w-[800px] flex-col space-y-10">
          <div
            className={
              "text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark"
            }
          >
            <span>About</span>
          </div>
          <div
            className={
              "flex flex-col md:flex-row items-center justify-between text-main-text-black dark:text-white-dark"
            }
          >
            <div className={"min-w-40"}>
              <GatsbyImage
                image={portraitImage}
                className={"rounded-full"}
                alt="성철민"
              />
            </div>
            <div className={"flex flex-col space-y-2 ml-4 p-4"}>
              <div className={"font-bold text-lg md:text-2xl"}>
                안녕하세요{" "}
                <span
                  className={
                    "bg-gradient-to-bl from-main-blue to-sub-skyblue dark:from-sub-skyblue dark:to-main-blue bg-clip-text text-transparent"
                  }
                >
                  상상을 현실로 만드는 개발자
                </span>{" "}
                성철민입니다
              </div>
              <div className={"ml-4"}>
                <ul className={"list-disc"}>
                  <li>Backend</li>
                  <li>Java, JavaScript, Python</li>
                  <li>Spring, React, Gatsby, Django</li>
                  <li>Docker, Kubernetes</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={
              "text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark"
            }
          >
            <span>Story</span>
          </div>
          <div className={"flex flex-col space-y-12 text-sm xl:text-base"}>
            <StoryComponent
              imageName="story1"
              text={[
                "중학생 때 나만의 웹게임을 운영해보고 싶었던 적이 있습니다.",
                "월 5천원, 월 트래픽 1GB짜리 서버를 사고",
                "무작정 perl로 된 웹게임 소스코드를 다운받아서",
                "며칠 낑낑대다 서빙에 성공했을 때 행복했어요.",
                "동접자 수 20명의 서비스를 운영했던 첫번째 경험이었습니다.",
              ]}
              imageLocation="left"
            />
            <StoryComponent
              imageName="story2"
              text={[
                "이후 제대로 개발을 배우고 싶어서",
                "하교 후에 버스를 타고 30분 거리의 시내 컴퓨터 학원에 가서",
                "C언어를 공부했던 추억도 떠오릅니다.",
                "당장 이진법을 몰라서 선생님과 수학 공부를 하긴 했지만요(?)",
              ]}
              imageLocation="right"
            />
            <StoryComponent
              imageName="story3"
              text={[
                "십수년이 지나 화학공학과를 졸업하고 회사에 다니다가",
                "자연스레 업무 자동화에 관심을 갖게 됐습니다.",
                "파이썬으로 엑셀 데이터를 조작할 수 있다는 것을 알았어요.",
                "그리고 독학 끝에 공정의 센서 데이터를 파악하는",
                "프로그램을 만들어 회사에 기여를 할 수 있었습니다.",
              ]}
              imageLocation="left"
            />
            <StoryComponent
              imageName="story4"
              text={[
                "산업의 전선에서 맡은 바 최선을 다하는 것도 멋지지만,",
                "개발을 통해 더 많은 사람을 도울 수 있는 사람이 되고 싶었습니다.",
                "그래서 다니던 회사를 퇴사하고 새로운 항해를 시작했습니다.",
              ]}
              imageLocation="right"
            />
          </div>
          {/* <div className={"w-56"}>
            <a href="https://solved.ac/zeus2141" target="__blank">
              <img
                src="http://mazassumnida.wtf/api/v2/generate_badge?boj=zeus2141"
                alt="Solved.ac프로필"
              />
            </a>
          </div> */}
        </div>
        <div className="w-full min-[1170px]:w-[800px] flex-col space-y-10">
          <div className="text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark">
            <span>Timeline</span>
          </div>
          <TimelineTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilteredTimeline timelineData={timelineData} activeTab={activeTab} />
        </div>
      </div>
    </NormalLayout>
  );
};

export default About;
