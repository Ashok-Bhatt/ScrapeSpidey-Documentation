import { title } from "framer-motion/client";
import {LayoutDashboard, ChartSpline, Brain, SquareCode}  from "lucide-react";
import {conf} from "../utils/config.js"

const {serverBaseUrl} = conf;

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
        category : "GFG",
        endpoints : [
            {
                title : "User Info",
                description : ["This endpoint will fetch the information regarding the progress made by user on geeksforgeeks platform"],
                request: {
                    type : "GET",
                    color: "green-500",
                    url : serverBaseUrl + "/api/v1/gfg/user/<username>",
                },
                parameters : [
                    {
                        name : "apiKey",
                        type: "String",
                        example : "89123443-a4a9-409e-a478-25f146dhib77",
                        description : "An unique API Key that you need to attach with every request you made for coding profiles."
                    }
                ],
                example : {
                    text : "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/ashokbhacjou",
                    response : {
                        "username": "ashokbhacjou",
                        "avatar": "https://www.geeksforgeeks.org//_next/image/?url=https%3A%2F%2Fmedia.geeksforgeeks.org%2Fauth%2Fprofile%2F87f1gz2lt16vki1r4fe7&w=256&q=75",
                        "institutionName": "ITM University Baroda",
                        "institutionRank": "1",
                        "languagesUsed": "C++, Python, C, Java",
                        "userMaxStreak": "28",
                        "globalMaxStreak": "1497",
                        "contestRating": "1754",
                        "contestLevel": "3",
                        "contestRanking": "4830",
                        "contestAttended": "2",
                        "contestTopPercentage": "16",
                        "contestTotalParticipants": "30183",
                        "codingScore": "1444",
                        "problemsSolved": {
                            "total": "557",
                            "school": "2",
                            "basic": "94",
                            "easy": "218",
                            "medium": "222",
                            "hard": "21"
                        }
                    }
                },
                quotasInfo : "Calling this endpoint costs 1 API Point",
            },
            {
                title : "Submission History",
                description : ["This endpoint will fetch the information regarding the submission made by user in current year", "Note: It will show the count of only those days where at least one submission is made."],
                request: {
                    type : "GET",
                    color: "green-500",
                    url : serverBaseUrl + "/api/v1/gfg/user/submissions/<username>",
                },
                parameters : [
                    {
                        name : "apiKey",
                        type: "String",
                        example : "89123443-a4a9-409e-a478-25f146dhib77",
                        description : "An unique API Key that you need to attach with every request you made for coding profiles."
                    }
                ],
                example : {
                    text : "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/gfg/user/submissions/ashokbhacjou",
                    response : {
                        "2025-08-19": 1,
                        "2025-08-18": 1,
                        "2025-08-17": 1,
                        "2025-08-09": 1,
                        "2025-08-06": 2,
                        "2025-08-05": 1,
                        "2025-08-04": 2,
                        "2025-07-27": 1,
                        "2025-07-23": 1,
                        "2025-07-16": 2,
                        "2025-07-11": 1,
                        "2025-07-10": 1,
                        "2025-07-05": 1,
                        "2025-07-01": 2,
                        "2025-06-30": 2,
                        "2025-06-29": 2,
                        "2025-06-27": 3,
                        "2025-06-26": 1,
                        "2025-06-23": 2,
                        "2025-06-22": 1,
                        "2025-06-19": 1,
                        "2025-06-15": 4,
                        "2025-06-14": 1,
                        "2025-06-13": 1,
                        "2025-06-09": 1,
                        "2025-06-06": 1,
                        "2025-06-05": 4,
                        "2025-06-04": 1,
                        "2025-06-03": 1,
                        "2025-06-02": 1,
                        "2025-06-01": 3,
                        "2025-05-31": 1,
                        "2025-05-30": 1,
                        "2025-05-29": 1,
                        "2025-05-26": 2,
                        "2025-05-23": 2,
                        "2025-05-19": 5,
                        "2025-05-16": 1,
                        "2025-05-15": 2,
                        "2025-05-11": 1,
                        "2025-05-07": 1,
                        "2025-05-06": 1,
                        "2025-05-03": 1,
                        "2025-04-29": 4,
                        "2025-04-28": 3,
                        "2025-04-27": 3,
                        "2025-04-26": 2,
                        "2025-04-24": 1,
                        "2025-04-23": 3,
                        "2025-04-21": 1,
                        "2025-04-20": 2,
                        "2025-04-18": 1,
                        "2025-04-16": 1,
                        "2025-04-15": 1,
                        "2025-04-12": 1,
                        "2025-04-11": 1,
                        "2025-04-10": 2,
                        "2025-04-08": 1,
                        "2025-04-07": 1,
                        "2025-04-06": 2,
                        "2025-04-05": 2,
                        "2025-04-04": 1,
                        "2025-04-03": 3,
                        "2025-04-02": 2,
                        "2025-04-01": 2,
                        "2025-03-31": 3,
                        "2025-03-30": 3,
                        "2025-03-29": 1,
                        "2025-03-28": 2,
                        "2025-03-27": 3,
                        "2025-03-26": 1,
                        "2025-03-25": 2,
                        "2025-03-24": 2,
                        "2025-03-23": 2,
                        "2025-03-22": 2,
                        "2025-03-21": 2,
                        "2025-03-20": 1,
                        "2025-03-19": 1,
                        "2025-03-18": 1,
                        "2025-03-17": 2,
                        "2025-03-16": 1,
                        "2025-03-15": 1,
                        "2025-03-14": 1,
                        "2025-03-13": 1,
                        "2025-03-12": 1,
                        "2025-03-11": 1,
                        "2025-03-09": 2,
                        "2025-03-07": 3,
                        "2025-03-06": 1,
                        "2025-03-05": 1,
                        "2025-02-21": 2,
                        "2025-02-19": 4,
                        "2025-02-18": 3,
                        "2025-02-17": 4,
                        "2025-02-16": 1,
                        "2025-02-15": 1,
                        "2025-02-14": 1,
                        "2025-02-13": 1,
                        "2025-02-12": 2,
                        "2025-02-11": 2,
                        "2025-02-10": 2,
                        "2025-02-09": 1,
                        "2025-02-08": 2,
                        "2025-02-07": 2,
                        "2025-02-06": 1,
                        "2025-02-05": 6,
                        "2025-02-04": 1,
                        "2025-02-03": 3,
                        "2025-02-02": 5,
                        "2025-02-01": 2,
                        "2025-01-18": 1,
                        "2025-01-11": 1,
                        "2025-01-02": 4,
                        "2025-08-29": 3,
                        "2025-09-05": 1,
                        "2025-09-06": 1
                    }
                },
                quotasInfo : "Calling this endpoint costs 1 API Point",
            }
        ]
    }, 
    {
        category : "Hackerrank",
        endpoints : [   
            {
                title : "User Info",
                description : ["This endpoint will fetch the information regarding the progress made by user on hackerrank platform", "Note: This endpoint does not return a lot of data unlike apis of other platforms that were returning comprehensive data like problems solved, contest data, etc. The reason behind this is the profile page of hackerrank which exposes negligible data and we are scraping data from that page only", "The data that api for hackerrank returns is username, url to user profile, list of certificates and list of badges"],
                request: {
                    type : "GET",
                    color: "green-500",
                    url : serverBaseUrl + "/api/v1/hackerrank/user/<username>",
                },
                parameters : [
                    {
                        name : "apiKey",
                        type: "String",
                        example : "89123443-a4a9-409e-a478-25f146dhib77",
                        description : "An unique API Key that you need to attach with every request you made for coding profiles."
                    }
                ],
                example : {
                    text : "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/hackerrank/user/ashokbhatt2048",
                    response : {
                        "username": "ashokbhatt2048",
                        "profileImage": "https://hrcdn.net/s3_pub/hr-avatars/ddec9e33-da14-4125-ac8b-9b07cd880a84/150x150.png",
                        "badges": [
                            {
                                "image": "https://hrcdn.net/fcore/assets/badges/problem-solving-ecaf59a612.svg",
                                "title": "Problem Solving",
                                "stars": 3
                            },
                            {
                                "image": "https://hrcdn.net/fcore/assets/badges/cpp-739b350881.svg",
                                "title": "CPP",
                                "stars": 3
                            },
                            {
                                "image": "https://hrcdn.net/fcore/assets/badges/python-f70befd824.svg",
                                "title": "Python",
                                "stars": 3
                            },
                            {
                                "image": "https://hrcdn.net/fcore/assets/badges/sql-89e76e7082.svg",
                                "title": "Sql",
                                "stars": 2
                            },
                            {
                                "image": "https://hrcdn.net/fcore/assets/badges/c-d1985901e6.svg",
                                "title": "C language",
                                "stars": 1
                            }
                        ],
                        "certificates": [
                            {
                                "link": "https://www.hackerrank.com/certificates/edf5060a6511",
                                "title": "Python (Basic)"
                            },
                            {
                                "link": "https://www.hackerrank.com/certificates/67973248b070",
                                "title": "Problem Solving (Basic)"
                            },
                            {
                                "link": "https://www.hackerrank.com/certificates/7e8942b3619c",
                                "title": "Problem Solving (Intermediate)"
                            }
                        ]
                    }
                },
                quotasInfo : "Calling this endpoint costs 1 API Point",
            },
        ]
    },
    {
        category : "Interviewbit",
        endpoints : [   
            {
                title : "User Info",
                description : ["This endpoint will fetch the information regarding the progress made by user on interviewbit platform"],
                request: {
                    type : "GET",
                    color: "green-500",
                    url : serverBaseUrl + "/api/v1/interviewbit/user/<username>",
                },
                parameters : [
                    {
                        name : "apiKey",
                        type: "String",
                        example : "89123443-a4a9-409e-a478-25f146dhib77",
                        description : "An unique API Key that you need to attach with every request you made for coding profiles."
                    }
                ],
                example : {
                    text : "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/interviewbit/user/princesingh2002",
                    response : {
                        "username": "princesingh2002",
                        "totalScore": 119453,
                        "totalCoins": 265998,
                        "streak": 0,
                        "globalRank": 31,
                        "universityRank": 1,
                        "joinedOn": "Since: Oct 2020",
                        "timeSpent": "4 days",
                        "problemsSolved": {
                            "totalProblems": 954,
                            "solvedProblems": {
                                "easy": 230,
                                "medium": 300,
                                "hard": 52,
                                "total": 582
                            }
                        },
                        "badges": [
                            {
                                "title": "Two Pointers Captain",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/119/original/2_pointers.svg\");"
                            },
                            {
                                "title": "Arrays Master",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/120/original/Arrays.svg\");"
                            },
                            {
                                "title": "Backtracking Expert",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/121/original/backtracking.svg\");"
                            },
                            {
                                "title": "Binary Search Pro",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/122/original/binary_search.svg\");"
                            },
                            {
                                "title": "Bit Manipulation Pro",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/123/original/bit_manupulation.svg\");"
                            },
                            {
                                "title": "Dynamic Programming Wizard",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/124/original/dynamic_programming.svg\");"
                            },
                            {
                                "title": "Graph Data Structure and Algorithms Pro",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/125/original/graph_data_structure.svg\");"
                            },
                            {
                                "title": "Greedy Algorithms Captain",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/126/original/greedy_algorithms.svg\");"
                            },
                            {
                                "title": "Hashing Captain",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/127/original/hashing.svg\");"
                            },
                            {
                                "title": "Heaps and Maps Star",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/128/original/heaps_and_maps.svg\");"
                            },
                            {
                                "title": "Linked List Wizard",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/129/original/linked_lists.svg\");"
                            },
                            {
                                "title": "Maths Star",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/130/original/maths.svg\");"
                            },
                            {
                                "title": "Stacks and Queues Master",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/131/original/stacks_and_queues.svg\");"
                            },
                            {
                                "title": "Strings Expert",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/132/original/strings.svg\");"
                            },
                            {
                                "title": "Time Complexity Wizard",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/133/original/Time_complexity.svg\");"
                            },
                            {
                                "title": "Tree Data Structure Master",
                                "date": "1 Dec 23",
                                "image": "background-image: url(\"https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/004/134/original/Tree_data_structure.svg\");"
                            }
                        ],
                        "submissionAnalysis": {
                            "correctAnswers": 1656,
                            "wrongAnswers": 774,
                            "compilationErrors": 247,
                            "others": 11
                        }
                    }
                },
                quotasInfo : "Calling this endpoint costs 1 API Point",
            },
        ]
    },
    {
        category : "Codechef",
        endpoints : [
            {
                title : "User Info",
                description : ["This endpoint will fetch the information regarding the progress made by user on codechef platform"],
                request: {
                    type : "GET",
                    color: "green-500",
                    url : serverBaseUrl + "/api/v1/codechef/user/<username>",
                },
                parameters : [
                    {
                        name : "apiKey",
                        type: "String",
                        example : "89123443-a4a9-409e-a478-25f146dhib77",
                        description : "An unique API Key that you need to attach with every request you made for coding profiles."
                    }
                ],
                example : {
                    text : "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/ashokbhatt",
                    response : {
                        "username": "ashokbhatt",
                        "problemsSolved": 70,
                        "profileImage": "https://cdn.codechef.com/sites/default/files/uploads/pictures/1d86a89c09e289e9700e7a9f09fe4b82.jpg",
                        "currentRating": "NA",
                        "highestRating": "NA",
                        "contestDiv": "NA",
                        "contestStars": 0,
                        "globalRank": "NA",
                        "countryRank": "NA",
                        "skillTests": [],
                        "badges": [
                            {
                                "badgeImage": "https://cdn.codechef.com/images/badges/problem/bronze.svg",
                                "badgeTitle": "Problem Solver",
                                "badgeLevel": "Bronze Badge",
                                "badgeDescription": "Received for solving 50 Problems"
                            },
                            {
                                "badgeImage": "https://cdn.codechef.com/images/badges/streak/silver.svg",
                                "badgeTitle": "Daily Streak",
                                "badgeLevel": "Silver Badge",
                                "badgeDescription": "Received for maintaining a streak of 25 days"
                            }
                        ]
                    }
                },
                quotasInfo : "Calling this endpoint costs 1 API Point",
            },
            {
                title : "Submission History",
                description : ["This endpoint will fetch the information regarding the submission made by user in last 6 months"],
                request: {
                    type : "GET",
                    color: "green-500",
                    url : serverBaseUrl + "/api/v1/codechef/user/submissions/<username>",
                },
                parameters : [
                    {
                        name : "apiKey",
                        type: "String",
                        example : "89123443-a4a9-409e-a478-25f146dhib77",
                        description : "An unique API Key that you need to attach with every request you made for coding profiles."
                    }
                ],
                example : {
                    text : "Try example (But use your api key first)",
                    request: serverBaseUrl + "/api/v1/codechef/user/submissions/ashokbhatt",
                    response : {
                        "2025-3-6": 0,
                        "2025-3-7": 0,
                        "2025-3-8": 0,
                        "2025-3-9": 0,
                        "2025-3-10": 0,
                        "2025-3-11": 0,
                        "2025-3-12": 0,
                        "2025-3-13": 0,
                        "2025-3-14": 0,
                        "2025-3-15": 0,
                        "2025-3-16": 0,
                        "2025-3-17": 0,
                        "2025-3-18": 0,
                        "2025-3-19": 0,
                        "2025-3-20": 0,
                        "2025-3-21": 0,
                        "2025-3-22": 0,
                        "2025-3-23": 0,
                        "2025-3-24": 0,
                        "2025-3-25": 0,
                        "2025-3-26": 0,
                        "2025-3-27": 0,
                        "2025-3-28": 0,
                        "2025-3-29": 0,
                        "2025-3-30": 0,
                        "2025-3-31": 0,
                        "2025-4-1": 0,
                        "2025-4-2": 0,
                        "2025-4-3": 0,
                        "2025-4-4": 0,
                        "2025-4-5": 0,
                        "2025-4-6": 0,
                        "2025-4-7": 0,
                        "2025-4-8": 0,
                        "2025-4-9": 0,
                        "2025-4-10": 0,
                        "2025-4-11": 0,
                        "2025-4-12": 0,
                        "2025-4-13": 0,
                        "2025-4-14": 0,
                        "2025-4-15": 0,
                        "2025-4-16": 0,
                        "2025-4-17": 0,
                        "2025-4-18": 0,
                        "2025-4-19": 0,
                        "2025-4-20": 0,
                        "2025-4-21": 0,
                        "2025-4-22": 0,
                        "2025-4-23": 0,
                        "2025-4-24": 0,
                        "2025-4-25": 0,
                        "2025-4-26": 0,
                        "2025-4-27": 0,
                        "2025-4-28": 0,
                        "2025-4-29": 0,
                        "2025-4-30": 0,
                        "2025-5-1": 0,
                        "2025-5-2": 0,
                        "2025-5-3": 0,
                        "2025-5-4": 0,
                        "2025-5-5": 0,
                        "2025-5-6": 0,
                        "2025-5-7": 0,
                        "2025-5-8": 0,
                        "2025-5-9": 0,
                        "2025-5-10": 0,
                        "2025-5-11": 0,
                        "2025-5-12": 0,
                        "2025-5-13": 0,
                        "2025-5-14": 0,
                        "2025-5-15": 0,
                        "2025-5-16": 0,
                        "2025-5-17": 0,
                        "2025-5-18": 0,
                        "2025-5-19": 0,
                        "2025-5-20": 0,
                        "2025-5-21": 0,
                        "2025-5-22": 0,
                        "2025-5-23": 0,
                        "2025-5-24": 0,
                        "2025-5-25": 0,
                        "2025-5-26": 0,
                        "2025-5-27": 0,
                        "2025-5-28": 0,
                        "2025-5-29": 0,
                        "2025-5-30": 0,
                        "2025-5-31": 0,
                        "2025-6-1": 0,
                        "2025-6-2": 0,
                        "2025-6-3": 0,
                        "2025-6-4": 0,
                        "2025-6-5": 0,
                        "2025-6-6": 0,
                        "2025-6-7": 0,
                        "2025-6-8": 0,
                        "2025-6-9": 0,
                        "2025-6-10": 0,
                        "2025-6-11": 0,
                        "2025-6-12": 0,
                        "2025-6-13": 0,
                        "2025-6-14": 0,
                        "2025-6-15": 0,
                        "2025-6-16": 0,
                        "2025-6-17": 0,
                        "2025-6-18": 0,
                        "2025-6-19": 0,
                        "2025-6-20": 0,
                        "2025-6-21": 0,
                        "2025-6-22": 0,
                        "2025-6-23": 0,
                        "2025-6-24": 0,
                        "2025-6-25": 0,
                        "2025-6-26": 0,
                        "2025-6-27": 0,
                        "2025-6-28": 0,
                        "2025-6-29": 0,
                        "2025-6-30": 0,
                        "2025-7-1": 0,
                        "2025-7-2": 0,
                        "2025-7-3": 0,
                        "2025-7-4": 0,
                        "2025-7-5": 0,
                        "2025-7-6": 0,
                        "2025-7-7": 0,
                        "2025-7-8": 0,
                        "2025-7-9": 0,
                        "2025-7-10": 0,
                        "2025-7-11": 0,
                        "2025-7-12": 0,
                        "2025-7-13": 0,
                        "2025-7-14": 0,
                        "2025-7-15": 0,
                        "2025-7-16": 0,
                        "2025-7-17": 0,
                        "2025-7-18": 0,
                        "2025-7-19": 0,
                        "2025-7-20": 0,
                        "2025-7-21": 0,
                        "2025-7-22": 0,
                        "2025-7-23": 0,
                        "2025-7-24": 0,
                        "2025-7-25": 0,
                        "2025-7-26": 0,
                        "2025-7-27": 0,
                        "2025-7-28": 0,
                        "2025-7-29": 0,
                        "2025-7-30": 0,
                        "2025-7-31": 0,
                        "2025-8-1": 0,
                        "2025-8-2": 0,
                        "2025-8-3": 0,
                        "2025-8-4": 0,
                        "2025-8-5": 0,
                        "2025-8-6": 0,
                        "2025-8-7": 0,
                        "2025-8-8": 0,
                        "2025-8-9": 0,
                        "2025-8-10": 0,
                        "2025-8-11": 0,
                        "2025-8-12": 0,
                        "2025-8-13": 0,
                        "2025-8-14": 0,
                        "2025-8-15": 0,
                        "2025-8-16": 0,
                        "2025-8-17": 0,
                        "2025-8-18": 0,
                        "2025-8-19": 0,
                        "2025-8-20": 0,
                        "2025-8-21": 0,
                        "2025-8-22": 0,
                        "2025-8-23": 0,
                        "2025-8-24": 0,
                        "2025-8-25": 0,
                        "2025-8-26": 0,
                        "2025-8-27": 0,
                        "2025-8-28": 0,
                        "2025-8-29": 0,
                        "2025-8-30": 0,
                        "2025-8-31": 0,
                        "2025-9-1": 0,
                        "2025-9-2": 0,
                        "2025-9-3": 0,
                        "2025-9-4": 0,
                        "2025-9-5": 0,
                        "2025-9-6": 0,
                        "2025-9-7": 0
                    }
                },
                quotasInfo : "Calling this endpoint costs 1 API Point",
            }
        ]
    },
]

export {
    apiUseCases,
    documentationData,
}