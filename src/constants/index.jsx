import {LayoutDashboard, ChartSpline, Brain, SquareCode}  from "lucide-react";
import {conf} from "../utils/config.js"

const {serverBaseUrl} = conf;

const DAILY_API_POINT_LIMIT = 25;

const apiUseCases = [
    {
        title : "Build Dashboards",
        logo : <LayoutDashboard />,
        imageUrl : "/Images/Use Cases/sample_dashboard.png",
        text : "Track solved problems across multiple platforms in one place. Monitor progress and streaks over time. Compare performance across platforms like LeetCode, CodeChef, and GFG."
    },
    {
        title : "Coding Analysis",
        logo : <ChartSpline />,
        imageUrl : "/Images/Use Cases/sample_analytics.png",
        text : "Analyze trends in problem-solving skills. Identify strong and weak topics based on problem difficulty. Evaluate performance in contests and practice sessions."
    },
    {
        title : "Learning Insights",
        logo : <Brain />,
        imageUrl : "/Images/Use Cases/sample_insights.png",
        text : "Track student engagement and progress in coding practice. Identify topics where students need more focus. Generate reports for instructors to optimize learning paths."
    },
    {
        title : "Portfolio",
        logo : <SquareCode />,
        imageUrl : "/Images/Use Cases/sample_portfolio.png",
        text : "Aggregate coding achievements in a unified profile. Showcase badges, ratings, and contest performance easily. Share coding history publicly or privately with potential collaborators."
    },
]

const documentationData = [
    {
        category: "GFG",
        endpoints: [
            {
                title: "User Info",
                description: [
                    "Fetches user profile and progress from GeeksforGeeks.",
                ],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/gfg/user/profile?user=ashokbhacjou&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/profile",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs additional 0.5 API Points.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user (days with at least one submission)."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/gfg/user/submissions?user=ashokbhacjou&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/submissions",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Codechef",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from CodeChef."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/codechef/user/profile?user=ashokbhatt&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                    { name: "includeAchievements", type: "Boolean", example: "true", description: "Include achievements data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/profile",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs additional 0.5 API Points. If includeAchievements is set to true, it costs additional 0.5 API Points.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user (last 6 months)."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/codechef/user/submissions?user=ashokbhatt&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/submissions",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Code360",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from Code360 (Naukri)."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/code360/user/profile?user=ashokbhatt&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "Code360 username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                    { name: "includeCertificates", type: "Boolean", example: "true", description: "Include certificates data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/code360/user/profile",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs additional 0.5 API Points. If includeCertificates is set to true, it costs additional 0.5 API Points.",
            },
        ],
    },
    {
        category: "Hackerrank",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile, badges, and certificates from Hackerrank."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/hackerrank/user/profile?user=ashokbhatt2048&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "Hackerrank username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/hackerrank/user/profile",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Interviewbit",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile, badges, and submission stats from InterviewBit."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/interviewbit/user/profile?user=princesingh2002&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeSubmissionStats", type: "Boolean", example: "true", description: "Include submission stats.", status: "optional" },
                    { name: "includeBadges", type: "Boolean", example: "true", description: "Include badges.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/interviewbit/user/profile",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeSubmissionStats is set to true, it costs additional 0.5 API Points. If includeBadges is set to true, it costs additional 0.5 API Points.",
            },
        ],
    },
    {
        category: "Github",
        endpoints: [
            {
                title: "User Contribution Badges",
                description: ["Fetches all contribution badges shown on the user's GitHub profile page."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/github/user/badges?user=Ashok-Bhatt&apiKey=89123443-a4a9-409e-a478-25f146dhib77",
                },
                parameters: [
                    { name: "user", type: "String", example: "Ashok-Bhatt", description: "GitHub username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/github/user/badges",
                    response: [],
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
];

export {
    DAILY_API_POINT_LIMIT,
    apiUseCases,
    documentationData,
}