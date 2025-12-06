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
                    "Fetches user profile and progress from GeeksforGeeks.",
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
                    request: serverBaseUrl + "/api/v1/gfg/user/profile?user=ashokbhacjou&apiKey=",
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
                    url: serverBaseUrl + "/api/v1/gfg/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2025", description: "The year for which you want to access submission history", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/submissions?user=ashokbhacjou&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Institution Top 3 Ranked Users",
                description: ["Fetches the top 3 ranked users in a given institution.", "Ranks are based on GFG's leaderboard."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/gfg/institution/top-3",
                },
                parameters: [
                    { name: "institution", type: "String", example: "itm-university-baroda", description: "Institution name", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/institution/top-3?institution=IIT%20Delhi&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            // {
            //     title: "Institution Info",
            //     description: ["Fetches information about a given institution from GFG."],
            //     request: {
            //         type: "GET",
            //         colorClass: { text: "text-green-800", bg: "bg-green-200" },
            //         url: serverBaseUrl + "/api/v1/gfg/institution/info",
            //     },
            //     parameters: [
            //         { name: "institution", type: "String", example: "itm-university-baroda", description: "Institution name", status: "required" },
            //         { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
            //     ],
            //     example: {
            //         text: "Try example (But use your api key first)",
            //         request: serverBaseUrl + "/api/v1/gfg/institution/info?institution=IIT%20Delhi&apiKey=",
            //         response: {},
            //     },
            //     quotasInfo: "Calling this endpoint costs 1 API Point.",
            // },
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/profile?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/language-stats?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/calendar?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/recent-submissions?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/badges?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/contest-ranking?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/skill-stats?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/question-progress?user=ashokbhatt2048&apiKey=",
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
                    request: serverBaseUrl + "/api/v1/leetcode/user/session-progress?user=ashokbhatt2048&apiKey=",
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
                description: ["Fetches user profile and progress from CodeChef."],
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
                    request: serverBaseUrl + "/api/v1/codechef/user/profile?user=ashokbhatt&apiKey=",
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
                    url: serverBaseUrl + "/api/v1/codechef/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/submissions?user=ashokbhatt&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    // {
    //     category: "Code360",
    //     endpoints: [
    //         {
    //             title: "User Info",
    //             description: ["Fetches user profile and progress from Code360 (Naukri)."],
    //             request: {
    //                 type: "GET",
    //                 colorClass: { text: "text-green-800", bg: "bg-green-200" },
    //                 url: serverBaseUrl + "/api/v1/code360/user/profile",
    //             },
    //             parameters: [
    //                 { name: "user", type: "String", example: "ashokbhatt", description: "Code360 username", status: "required" },
    //                 { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
    //                 { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
    //                 { name: "includeCertificates", type: "Boolean", example: "true", description: "Include certificates data.", status: "optional" },
    //             ],
    //             example: {
    //                 text: "Try example (But use your api key first)",
    //                 request: serverBaseUrl + "/api/v1/code360/user/profile?user=AshokBhatt&apiKey=",
    //                 response: {},
    //             },
    //             quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs additional 0.5 API Points. If includeCertificates is set to true, it costs additional 0.5 API Points.",
    //         },
    //     ],
    // },
    {
        category: "Hackerrank",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile, badges, and certificates from Hackerrank."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-200" },
                    url: serverBaseUrl + "/api/v1/hackerrank/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "Hackerrank username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/hackerrank/user/profile?user=ashokbhatt2048&apiKey=",
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
                    url: serverBaseUrl + "/api/v1/interviewbit/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "kartik-sharma_294", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                    { name: "includeSubmissionStats", type: "Boolean", example: "true", description: "Include submission stats.", status: "optional" },
                    { name: "includeBadges", type: "Boolean", example: "true", description: "Include badges.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/interviewbit/user/profile?user=princesingh2002&apiKey=",
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
                    url: serverBaseUrl + "/api/v1/github/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "Ashok-Bhatt", description: "GitHub username", status: "required" },
                    { name: "apiKey", type: "String", example: "89123443-a4a9-409e-a478-25f146dhib77", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/github/user/badges?user=Ashok-Bhatt&apiKey=",
                    response: [],
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
];

const teamMembers = [
    {
        name: "Ashok Bhatt",
        role: "Founder & Lead Developer",
        image: "https://media.licdn.com/dms/image/v2/D4E35AQEFh7bYa_ZEkw/profile-framedphoto-shrink_400_400/B4EZmi6hjdKwAc-/0/1759374875101?e=1760288400&v=beta&t=3fOH36MkzFV-n70W_Id9GiJ-bzJ43wYkUH9Q3Chpkng",
        linkedin: "https://www.linkedin.com/in/ashokbhatt2048/",
    },
    {
        name: "Vrajesh Pandya",
        role: "UI/UX Designer and Developer",
        image: "https://media.licdn.com/dms/image/v2/D4D03AQFOe6wnlSMgGw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681141383004?e=1762387200&v=beta&t=_I8bHlMY8YiTh1uL3shGfl0smbTYGD10Td2mt1ooRmg",
        linkedin: "https://www.linkedin.com/in/vrajesh-n-pandya-a8ba25266/",
    },
];

const faqs = [
    {
        question: "What is Scrape Spidey?",
        answer: "Scrape Spidey is a tool that allows you to fetch publicly available coding profile data from platforms like LeetCode, GeeksforGeeks, and others."
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
        answer: "Scrape Spidey offers free and premium plans. Free plans have daily API usage limits, while premium plans provide higher limits and additional features."
    },
    {
        question: "Can Scrape Spidey access private or password-protected data?",
        answer: "No, Scrape Spidey only accesses publicly available data. Private or restricted content is not accessible through our platform."
    },
    {
        question: "How is my data used by Scrape Spidey?",
        answer: "Your data is used only to provide scraping services and analytics. We do not sell or share your personal information with third parties."
    },
    {
        question: "Are there any risks in using Scrape Spidey?",
        answer: "Scraping is based on publicly available data, but users should ensure they comply with the terms of the original platforms. Scrape Spidey is not responsible for account restrictions imposed by third-party platforms."
    },
    {
        question: "How many profiles can I scrape per day?",
        answer: "The daily scraping limit depends on your plan. Free users have a limited number of API requests per day, while premium users have higher limits."
    },
    {
        question: "How can I upgrade to a premium plan?",
        answer: "You can upgrade to a premium plan through your account dashboard. Premium plans unlock higher API limits and additional features."
    }
];

export {
    DAILY_API_POINT_LIMIT,
    apiUseCases,
    documentationData,
    teamMembers,
    faqs,
}