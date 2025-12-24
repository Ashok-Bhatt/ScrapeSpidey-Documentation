import { LayoutDashboard, ChartSpline, Brain, SquareCode } from "lucide-react";
import { conf } from "../utils/config.js"

const { serverBaseUrl } = conf;

const DAILY_API_POINT_LIMIT = 25;

const apiUseCases = [
    {
        title: "Build Dashboards",
        logo: <LayoutDashboard />,
        imageUrl: "/Images/Use Cases/sample_dashboard.png",
        text: "Track solved problems across multiple platforms in one place. Monitor progress and streaks over time. Compare performance across platforms like LeetCode, CodeChef, and GFG."
    },
    {
        title: "Coding Analysis",
        logo: <ChartSpline />,
        imageUrl: "/Images/Use Cases/sample_analytics.png",
        text: "Analyze trends in problem-solving skills. Identify strong and weak topics based on problem difficulty. Evaluate performance in contests and practice sessions."
    },
    {
        title: "Learning Insights",
        logo: <Brain />,
        imageUrl: "/Images/Use Cases/sample_insights.png",
        text: "Track student engagement and progress in coding practice. Identify topics where students need more focus. Generate reports for instructors to optimize learning paths."
    },
    {
        title: "Portfolio",
        logo: <SquareCode />,
        imageUrl: "/Images/Use Cases/sample_portfolio.png",
        text: "Aggregate coding achievements in a unified profile. Showcase badges, ratings, and contest performance easily. Share coding history publicly or privately with potential collaborators."
    },
]

const documentationData = [
    {
        category: "GFG",
        endpoints: [
            {
                title: "User Info",
                description: [
                    "Fetches user profile and progress from GeeksforGeeks like total problems solved, streaks, coding score, institution rank, avatar, etc.",
                ],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/gfg/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user in the given year.", "If no year is provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v2/gfg/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v2/gfg/user/submissions?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Problems Solved",
                description: ["Fetches the list of problems solved by the user on GFG as per the difficulty level."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/gfg/user/problems",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/problems?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "LeetCode",
        endpoints: [
            {
                title: "User Profile",
                description: ["Fetches user profile and stats from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Language Stats",
                description: ["Fetches language problem counts for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/language-stats",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/language-stats?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Calendar",
                description: ["Fetches the user's calendar data (submission streaks, etc)."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/calendar",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2025", description: "The year for which heatmap is generated", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/calendar?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Recent Accepted Submissions",
                description: ["Fetches recent accepted submissions for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/recent-submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "limit", type: "Number", example: "10", description: "The number of submissions we want", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/recent-submissions?user=&apiKey=&limit=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Badges",
                description: ["Fetches user badges from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/badges?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Contest Ranking",
                description: ["Fetches contest ranking for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/contest-ranking",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/contest-ranking?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Skill Stats",
                description: ["Fetches skill stats for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/skill-stats",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/skill-stats?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question Progress",
                description: ["Fetches question progress for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/question-progress",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/question-progress?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Session Progress",
                description: ["Fetches session progress for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/user/session-progress",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/user/session-progress?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Contest Rating Histogram",
                description: ["Fetches contest rating histogram data."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/contest/histogram",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/contest/histogram?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question of Today",
                description: ["Fetches the question of the day from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/question/today",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/question/today?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Coding Challenge Medal",
                description: ["Fetches coding challenge medal info."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/leetcode/coding-challenge/medal",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Integer", example: "2025", description: "Year", status: "required" },
                    { name: "month", type: "Integer", example: "12", description: "Month number (1-12)", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/leetcode/coding-challenge/medal?apiKey=",
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
                description: ["Fetches user profile and progress from CodeChef like problems solved, contest performance, badges, skill tests, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/codechef/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                    { name: "includeAchievements", type: "Boolean", example: "true", description: "Include achievements data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/profile?user=&apiKey=&includeContests=&includeAchievements=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs additional 0.5 API Points. If includeAchievements is set to true, it costs additional 0.5 API Points.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user for the current year and the previous year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/codechef/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/submissions?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 3 API Point.",
            },
        ],
    },
    {
        category: "Code360",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from Code360 (formaly known as codestudios) like user details, avatar, streaks, badges, problems solved, contests performance, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/code360/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "AshokBhatt", description: "Code360 username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/code360/user/profile?user=&apiKey=&includeContests=true",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs an additional 0.5 API Points.",
            },
            {
                title: "User Submissions",
                description: ["Fetches submission history for the user on Code360 in the given year. If year is not provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/code360/user/submission",
                },
                parameters: [
                    { name: "user", type: "String", example: "AshokBhatt", description: "Code360 username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/code360/user/submission?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Hackerrank",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile data, badges, and certificates from Hackerrank."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v2/hackerrank/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "Hackerrank username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v2/hackerrank/user/profile?user=&apiKey=",
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
                description: ["Fetches user info like profile data, problems solved as per difficulty level, and as per category, submission analysis, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v2/interviewbit/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v2/interviewbit/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Submissions",
                description: ["Fetches user submission data from the given year. If year is not provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v2/interviewbit/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v2/interviewbit/user/submissions?user=&apiKey=&year=2024",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Badges",
                description: ["Fetches badges earned by the user on InterviewBit."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/interviewbit/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/interviewbit/user/badges?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
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
                    url: serverBaseUrl + "/api/v1/github/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "Ashok-Bhatt", description: "GitHub username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/github/user/badges?user=&apiKey=",
                    response: [],
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    }
];

const teamMembers = [
    {
        name: "Ashok Bhatt",
        role: "Founder & Lead Developer",
        image: "/Images/Team Members/ashok-bhatt.png",
        linkedin: "https://www.linkedin.com/in/ashokbhatt2048/",
    }
];

const faqs = [
    {
        question: "What is Scrape Spidey?",
        answer: "Scrape Spidey is a tool that allows you to fetch publicly available coding profile data from platforms like LeetCode, GeeksforGeeks, CodeChef, HackerRank, InterviewBit, and Code360."
    },
    {
        question: "What's next with Scrape Spidey?",
        answer: "In next updates, we will be adding endpoints for the codeforces and atcoder. We will also be adding endpoints that will provide the information about the upcoming coding contests.",
    },
    {
        question: "Is Scrape Spidey affiliated with coding platforms?",
        answer: "No, Scrape Spidey is an independent tool and is not affiliated with or endorsed by any coding platform."
    },
    {
        question: "What data can I scrape using Scrape Spidey?",
        answer: "You can scrape public profile information, including solved problems, contest participation, and statistics available on coding platforms."
    },
    {
        question: "Do I need an account to use Scrape Spidey?",
        answer: "Yes, you need to create an account on Scrape Spidey to use the service and track your scraping activity."
    },
    {
        question: "Is Scrape Spidey free to use?",
        answer: "Yes Scrape Spidey is free to use but comes with daily API Limit."
    },
    {
        question: "What if I want to expand the daily API Points Limit?",
        answer: "You can contact us using contact form and we will expand your daily API Points Limit."
    },
    {
        question: "Can Scrape Spidey access private or password-protected data?",
        answer: "No, Scrape Spidey only accesses publicly available data. Private or restricted content is not accessible through our platform."
    },
    {
        question: "How is my data used by Scrape Spidey?",
        answer: "Your data not used in any capacity. We do not sell or share your personal information with third parties."
    },
    {
        question: "Are there any risks in using Scrape Spidey?",
        answer: "No, there's no risk at all in using the Scrape Spidey API as you are just using the data provided by Scrape Spidey. All the fetching stuff is done by Scrape Spidey."
    },
];

export {
    DAILY_API_POINT_LIMIT,
    apiUseCases,
    documentationData,
    teamMembers,
    faqs,
}