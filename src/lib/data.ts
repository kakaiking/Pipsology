// Shared mock data for the entire Tradey Markets platform

export const latestArticles = [
    { id: 1, slug: "eurusd-retests-range-support", title: "EUR/USD Retests Range Support After Sharp Losses", category: "Chart Art", tag: "chart-art", date: "Mar 5, 2026", readTime: "4 min", excerpt: "Price has retested the 1.0450 range support after a sharp 200-pip drop. Watch for bounce confirmation.", image: "/api/placeholder/400/220" },
    { id: 2, slug: "nfp-report-feb-2026", title: "Event Guide: U.S. Non-Farm Payrolls (Feb 2026)", category: "Analysis", tag: "event-guide", date: "Mar 5, 2026", readTime: "6 min", excerpt: "Consensus expects 180K jobs added. Here's how to trade the release in both bull and bear scenarios.", image: "/api/placeholder/400/220" },
    { id: 3, slug: "bitcoin-triangle-breakout", title: "Bitcoin Triangle Breakout and Retest", category: "Trading", tag: "crypto", date: "Mar 5, 2026", readTime: "3 min", excerpt: "BTC broke out of a multi-week symmetrical triangle and is now retesting the breakout level.", image: "/api/placeholder/400/220" },
    { id: 4, slug: "audchf-pullback-setup", title: "Watchlist: AUD/CHF Pullback Setup Emerges", category: "Premium", tag: "watchlist", date: "Mar 4, 2026", readTime: "5 min", excerpt: "After Australia's stronger-than-expected GDP, AUD/CHF is pulling back to key support.", image: "/api/placeholder/400/220" },
    { id: 5, slug: "strait-of-hormuz", title: "Strait of Hormuz Closure: A Global Economic Chokepoint?", category: "News", tag: "macro", date: "Mar 4, 2026", readTime: "7 min", excerpt: "What would a closure of the Strait of Hormuz mean for oil, currencies, and global trade?", image: "/api/placeholder/400/220" },
    { id: 6, slug: "missing-winning-trades", title: "5 Reasons You're Missing Winning Trade Setups", category: "Psychology", tag: "psychology", date: "Mar 4, 2026", readTime: "5 min", excerpt: "Confirmation bias, fear of loss, and over-analysis are silently costing you trades.", image: "/api/placeholder/400/220" },
];

export const calendarEvents = [
    { id: 1, time: "08:30", currency: "USD", event: "Non-Farm Payrolls", impact: "high", forecast: "182K", previous: "143K", actual: "" },
    { id: 2, time: "10:00", currency: "USD", event: "ISM Services PMI", impact: "high", forecast: "53.0", previous: "52.8", actual: "53.4" },
    { id: 3, time: "12:30", currency: "CAD", event: "Employment Change", impact: "high", forecast: "15.0K", previous: "-25.5K", actual: "" },
    { id: 4, time: "14:00", currency: "EUR", event: "ECB President Speech", impact: "medium", forecast: "—", previous: "—", actual: "" },
    { id: 5, time: "15:30", currency: "GBP", event: "Construction PMI", impact: "low", forecast: "48.5", previous: "48.1", actual: "47.9" },
];

export const forumPosts = [
    { id: 1, title: "My 6-month journey from $1K to $8K — lessons learned", category: "Trade Journals", replies: 142, views: "4.2K", timeAgo: "2h ago", author: "PipKing_EA" },
    { id: 2, title: "Does anyone else find EUR/JPY more predictable than EUR/USD?", category: "Trading Discussion", replies: 28, views: "890", timeAgo: "4h ago", author: "SwingMaster_FX" },
    { id: 3, title: "Best broker for scalping in 2026? My top 3 picks", category: "Broker Discussion", replies: 67, views: "2.1K", timeAgo: "6h ago", author: "ScalpKing247" },
    { id: 4, title: "Harmonic patterns — overhyped or genuinely useful?", category: "Trading Systems", replies: 45, views: "1.3K", timeAgo: "1d ago", author: "TraderPsych" },
];

export const courseGrades = [
    { id: "preschool", title: "Beginner", subtitle: "Complete beginner? Start here.", lessons: 6, free: true, progress: 100, color: "#22c55e" },
    { id: "kindergarten", title: "Novice", subtitle: "Brokers, analysis types & chart basics.", lessons: 3, free: true, progress: 100, color: "#22c55e" },
    { id: "elementary", title: "Intermediate", subtitle: "Core technical analysis fundamentals.", lessons: 5, free: true, progress: 60, color: "#4ade80" },
];



export const glossaryTerms = [
    { term: "Pip", slug: "pip", category: "Basics", definition: "The smallest unit of price movement for a currency pair. For most pairs, 1 pip = 0.0001." },
    { term: "Spread", slug: "spread", category: "Trading Costs", definition: "The difference between the bid (buy) price and the ask (sell) price of a currency pair." },
    { term: "Leverage", slug: "leverage", category: "Risk Management", definition: "The use of borrowed capital to increase potential return on investment. Also amplifies losses." },
    { term: "Lot Size", slug: "lot-size", category: "Basics", definition: "Standard lot = 100,000 units. Mini lot = 10,000. Micro lot = 1,000 units of base currency." },
    { term: "Stop Loss", slug: "stop-loss", category: "Risk Management", definition: "A pending order to automatically close a trade at a pre-set loss level to limit risk." },
    { term: "Take Profit", slug: "take-profit", category: "Risk Management", definition: "An order to close a winning trade automatically when price reaches your profit target." },
    { term: "Support", slug: "support", category: "Technical Analysis", definition: "A price level where buying interest is strong enough to prevent further decline." },
    { term: "Resistance", slug: "resistance", category: "Technical Analysis", definition: "A price level where selling pressure is strong enough to prevent further price gains." },
    { term: "RSI", slug: "rsi", category: "Indicators", definition: "Relative Strength Index — a momentum oscillator measuring overbought (>70) and oversold (<30) conditions." },
    { term: "MACD", slug: "macd", category: "Indicators", definition: "Moving Average Convergence Divergence — tracks relationship between two EMAs to spot trend changes and momentum." },
    { term: "Fibonacci", slug: "fibonacci", category: "Technical Analysis", definition: "Retracement tool using key ratios (23.6%, 38.2%, 61.8%) to identify potential support/resistance levels." },
    { term: "Margin", slug: "margin", category: "Account", definition: "The minimum capital required to open and maintain a leveraged trade position." },
];

export const socialPosts = [
    { id: 1, author: "FXProTrader", handle: "@fxprotrader", avatar: "FP", verified: true, pair: "EUR/USD", direction: "SELL", entry: "1.0880", sl: "1.0920", tp: "1.0780", content: "Clean rejection at the 61.8% Fib level on the H4. Watch for a continuation lower toward 1.0780. Strong bearish momentum with MACD crossover confirmation. Risk managed at 1% of account.", likes: 847, comments: 62, time: "2h ago", outcome: "active", chartUrl: "#" },
    { id: 2, author: "CryptoKingdom", handle: "@cryptkingdom", avatar: "CK", verified: false, pair: "BTC/USD", direction: "BUY", entry: "82,400", sl: "80,000", tp: "88,500", content: "Bitcoin broke out of the descending triangle and is retesting the breakout zone. This is a high-probability long setup with a 2.5R reward. Invalidated below $80K.", likes: 1247, comments: 134, time: "4h ago", outcome: "win", chartUrl: "#" },
    { id: 3, author: "SwingMaster_R", handle: "@swingmasterR", avatar: "SM", verified: true, pair: "GBP/JPY", direction: "BUY", entry: "192.40", sl: "191.20", tp: "195.80", content: "Oversold conditions on the RSI with bullish divergence on the H1 chart. Price bounced off the ascending trendline. Targeting the swing high at 195.80.", likes: 524, comments: 38, time: "6h ago", outcome: "active", chartUrl: "#" },
];

export const brokers = [
    { id: 1, slug: "forex-com", name: "FOREX.com", rating: 4.6, minDeposit: "$100", maxLeverage: "50:1", regulation: "NFA, FCA, ASIC", spread: "0.8 pips avg", platform: "MT4, MT5, Own", type: "Market Maker", pros: ["Tight spreads", "Strong regulation", "Great research tools"], cons: ["Higher min deposit", "Limited crypto"], reviews: 843, logo: "FC" },
    { id: 2, slug: "pepperstone", name: "Pepperstone", rating: 4.8, minDeposit: "$200", maxLeverage: "500:1 (ASIC)", regulation: "FCA, ASIC, DFSA", spread: "0.0 pips (Razor)", platform: "MT4, MT5, cTrader", type: "ECN/STP", pros: ["Near-zero spreads", "Fast execution", "cTrader available"], cons: ["No US clients", "Commission on Razor"], reviews: 1204, logo: "PP" },
    { id: 3, slug: "ic-markets", name: "IC Markets", rating: 4.7, minDeposit: "$200", maxLeverage: "500:1", regulation: "ASIC, CySEC, FSA", spread: "0.0 pips (Raw)", platform: "MT4, MT5, cTrader", type: "True ECN", pros: ["Institutional-grade liquidity", "No restrictions on EAs", "Low latency servers"], cons: ["Basic research", "Not available in US"], reviews: 967, logo: "IC" },
];

export const psychologyModules = [
    { id: 1, title: "The Trader's Mindset", slug: "traders-mindset", lessons: 4, icon: "🧠", desc: "Why 90% of traders fail and what separates the 10% who succeed." },
    { id: 2, title: "Emotions & Trading", slug: "emotions", lessons: 5, icon: "😤", desc: "Understanding fear, greed, and FOMO — and how they destroy accounts." },
    { id: 3, title: "Discipline & Consistency", slug: "discipline", lessons: 4, icon: "⚡", desc: "Building the habits that keep you profitable long-term." },
    { id: 4, title: "Risk & Loss Aversion", slug: "risk-loss-aversion", lessons: 3, icon: "🛡️", desc: "Why our brains are wired to lose money and how to rewire them." },
    { id: 5, title: "Revenge Trading", slug: "revenge-trading", lessons: 3, icon: "🔥", desc: "Recognizing and breaking the cycle of revenge trades." },
    { id: 6, title: "Building Your Rules", slug: "trading-rules", lessons: 4, icon: "📋", desc: "Create an ironclad trading plan you'll actually follow." },
];

export const learningPaths = [
    { id: "scalper", title: "Scalper's Path", icon: "⚡", color: "from-blue-500 to-cyan-500", desc: "Master rapid intraday trading on the M1–M15 timeframes.", steps: ["Beginner", "Intermediate", "Market Hours", "Oscillators", "Backtester"], weeks: 3, level: "Intermediate" },
    { id: "swing", title: "Swing Trader", icon: "📊", color: "from-green-500 to-emerald-500", desc: "Capture multi-day moves using H4 and Daily chart patterns.", steps: ["Beginner", "Intermediate", "Chart Patterns", "Fibonacci", "Risk Management"], weeks: 4, level: "Beginner" },
    { id: "price-action", title: "Price Action Purist", icon: "🎯", color: "from-purple-500 to-violet-500", desc: "Trade with no indicators — pure candles, S/R, and structure.", steps: ["Beginner", "Candlesticks", "Support & Resistance", "Chart Patterns", "Multi-TF"], weeks: 5, level: "Intermediate" },
    { id: "news-trader", title: "News Trader", icon: "📰", color: "from-orange-500 to-amber-500", desc: "Trade high-impact economic events with precision entries.", steps: ["Beginner", "Fundamental Analysis", "Economic Calendar", "Trading the News", "Event Guides"], weeks: 3, level: "Beginner" },
    { id: "long-term", title: "Long-Term Investor", icon: "🏦", color: "from-yellow-500 to-gold-500", desc: "Position trading on weekly/monthly charts using macro analysis.", steps: ["Beginner", "Fundamental Analysis", "Currency Correlations", "Carry Trade", "Risk Management"], weeks: 6, level: "Advanced" },
    { id: "crypto", title: "Crypto Trader", icon: "₿", color: "from-orange-400 to-red-500", desc: "Navigate the volatile crypto markets with proven strategies.", steps: ["School of Crypto", "On-Chain Analysis", "Crypto Chart Patterns", "Risk Management", "NFT Basics"], weeks: 4, level: "Beginner" },
];

export const achievements = [
    { id: 1, title: "First Steps", icon: "🎓", desc: "Complete your first lesson", xp: 50, earned: true },

    { id: 3, title: "7-Day Streak", icon: "🔥", desc: "Study 7 days in a row", xp: 200, earned: true },
    { id: 4, title: "Trade Logger", icon: "📓", desc: "Log your first 10 trades", xp: 150, earned: false },
    { id: 5, title: "Chart Master", icon: "📈", desc: "Complete 20 backtesting sessions", xp: 300, earned: false },
    { id: 6, title: "Community Voice", icon: "💬", desc: "Make 25 forum posts", xp: 200, earned: false },
    { id: 7, title: "Tradey Markets Graduate", icon: "🏆", desc: "Complete all free courses", xp: 500, earned: false },
    { id: 8, title: "Idea Publisher", icon: "🌐", desc: "Post 10 trade ideas to social feed", xp: 250, earned: false },
    { id: 9, title: "Risk Guardian", icon: "🛡️", desc: "Complete Risk Management module", xp: 200, earned: true },
    { id: 10, title: "30-Day Warrior", icon: "⚡", desc: "30-day consecutive study streak", xp: 750, earned: false },

    { id: 12, title: "Top Trader", icon: "⭐", desc: "Reach top 100 on the leaderboard", xp: 1000, earned: false },
];

export const webinars = [
    { id: 1, title: "Weekly Market Outlook: NFP Week Special", host: "Alex Rivera", date: "Mon, Mar 9", time: "09:00 EST", status: "upcoming", registered: 847, image: "/api/placeholder/400/220", category: "Market Outlook" },
    { id: 2, title: "Live Trade Session: Price Action on GBP/USD", host: "Sara Chen", date: "Wed, Mar 11", time: "14:00 EST", status: "upcoming", registered: 524, image: "/api/placeholder/400/220", category: "Live Trade" },
    { id: 3, title: "AMA: From Beginner to Funded Trader in 18 Months", host: "Mike Osei", date: "Fri, Mar 13", time: "16:00 EST", status: "upcoming", registered: 1203, image: "/api/placeholder/400/220", category: "AMA" },
    { id: 4, title: "Risk Management: The Framework That Changed My Account", host: "Priya Nath", date: "Feb 28", time: "Past", status: "replay", registered: 2103, image: "/api/placeholder/400/220", category: "Education" },
    { id: 5, title: "Elliott Wave Theory in Practice — Real Trade Examples", host: "Alex Rivera", date: "Feb 21", time: "Past", status: "replay", registered: 1567, image: "/api/placeholder/400/220", category: "Technical" },
];

export const preschoolLessons = [
    { 
        id: 1, 
        slug: "what-is-forex", 
        title: "What is Forex?", 
        done: true,
        content: [
            {
                id: "intro",
                title: "What is Forex?",
                text: [
                    "The foreign exchange market (forex, FX, or currency market) is the world's largest, most liquid financial market.",
                    "Currencies are traded against each other as exchange rate pairs — for example, EUR/USD or GBP/JPY."
                ],
                visualType: "l1-intro"
            },
            {
                id: "scale",
                title: "The Scale of Forex",
                text: [
                    "The forex market is massive. With a volume of $7.5 trillion per day traded, it dwarfs all global stock markets combined.",
                    "It operates 24 hours a day, 5 days a week across major financial centers in Sydney, Tokyo, London, and New York."
                ],
                visualType: "l1-scale"
            },
            {
                id: "participants",
                title: "Why Does Forex Exist?",
                text: [
                    "All international trade and business requires currency exchange. Participants include:",
                    "Central Banks, Commercial Banks, Hedge Funds, Retail Traders, and Corporations."
                ],
                visualType: "l1-participants"
            },
            {
                id: "pairs",
                title: "Currency Pairs",
                text: [
                    "In forex, currencies always trade in pairs. When you buy €1,000 with US Dollars, you're simultaneously buying EUR and selling USD.",
                    "Major, Minor, and Exotic pairs make up the market ecosystem."
                ],
                visualType: "l1-pairs"
            },
            {
                id: "history",
                title: "A Brief History of Forex",
                text: [
                    "Before 1971, currency exchange was tightly controlled by the Bretton Woods system.",
                    "The shift to floating exchange rates allowed the modern, free-market forex ecosystem to be born."
                ],
                visualType: "l1-history"
            }
        ]
    },
    { 
        id: 2, 
        slug: "how-to-trade", 
        title: "How Do You Trade Forex?", 
        done: true,
        content: [
            {
                id: "how-intro",
                title: "The Mechanics of Trading",
                text: [
                    "Trading forex is basically the simultaneous buying of one currency and selling of another.",
                    "You trade through a broker or market maker and trade in currency pairs."
                ],
                visualType: "l2-how-intro"
            },
            {
                id: "buying-selling",
                title: "Buying vs. Selling",
                text: [
                    "If you think one currency will get stronger against another, you buy (go long).",
                    "If you think it will get weaker, you sell (go short)."
                ],
                visualType: "l2-buy-sell"
            },
            {
                id: "pips-lots",
                title: "Pips and Lots",
                text: [
                    "Profits and losses are measured in 'pips'. A pip is usually the 4th decimal place in a price.",
                    "The amount of currency you trade is called a 'lot'. Standard lots are 100,000 units."
                ],
                visualType: "l2-pips-lots"
            },
            {
                id: "bull-bear",
                title: "Bulls vs. Bears",
                text: [
                    "In forex terminology, buyers are called 'bulls' because a bull attacks by thrusting its horns up.",
                    "Sellers are 'bears' because a bear swipes its paws down. You'll hear these terms constantly."
                ],
                visualType: "l2-bull-bear"
            },
            {
                id: "spread",
                title: "The Spread",
                text: [
                    "When you trade, you will notice two prices: the Bid and the Ask.",
                    "The difference between them is the 'spread', which is essentially the cost of the trade."
                ],
                visualType: "l2-spread"
            }
        ]
    },
    { 
        id: 3, 
        slug: "when-to-trade", 
        title: "When Can You Trade Forex?", 
        done: true,
        content: [
            {
                id: "sessions",
                title: "Global Trading Sessions",
                text: [
                    "The forex market is open 24 hours a day, but that doesn't mean it's always active.",
                    "There are four major sessions: Sydney, Tokyo, London, and New York."
                ],
                visualType: "l3-sessions"
            },
            {
                id: "overlap",
                title: "Market Overlaps",
                text: [
                    "The most active times are during 'overlaps' — when two sessions are open at the same time.",
                    "The London/New York overlap is the busiest time of the day."
                ],
                visualType: "l3-overlap"
            },
            {
                id: "tokyo",
                title: "The Tokyo Session",
                text: [
                    "This session opens first. It is sometimes called the Asian session.",
                    "It sets the tone for the rest of the day, particularly for JPY pairs."
                ],
                visualType: "l3-tokyo"
            },
            {
                id: "london",
                title: "The London Session",
                text: [
                    "London is the undisputed capital of forex. Its session sees the highest volume and volatility.",
                    "This is especially true since it overlaps with both Tokyo and New York."
                ],
                visualType: "l3-london"
            },
            {
                id: "new-york",
                title: "The New York Session",
                text: [
                    "This session starts right as Europe is returning from lunch.",
                    "Major economic news from the US often dictates price action during this time."
                ],
                visualType: "l3-new-york"
            }
        ]
    },
    { 
        id: 4, 
        slug: "who-trades-forex", 
        title: "Who Trades Forex?", 
        done: false,
        content: [
            {
                id: "major-players",
                title: "The Big Players",
                text: [
                    "Central Banks and commercial banks are the largest participants.",
                    "They account for the vast majority of volume in the 'interbank market'."
                ],
                visualType: "l4-major-players"
            },
            {
                id: "retail",
                title: "Retail Traders",
                text: [
                    "That's you! Retail traders use online brokers to access the market.",
                    "While small individually, retail traders collectively influence market sentiment."
                ],
                visualType: "l4-retail"
            },
            {
                id: "hedge-funds",
                title: "Hedge Funds",
                text: [
                    "These are the heavy hitters. Large financial institutions manage billions of dollars.",
                    "They trade forex to hedge their portfolios or speculate for massive profit."
                ],
                visualType: "l4-hedge-funds"
            },
            {
                id: "corporations",
                title: "Multinational Corporations",
                text: [
                    "Companies like Apple or Toyota need to convert huge amounts of cash from overseas sales.",
                    "They drive real commercial demand in the currency markets."
                ],
                visualType: "l4-corporations"
            },
            {
                id: "governments",
                title: "Governments and Central Banks",
                text: [
                    "Entities like the Federal Reserve or the ECB intervene in forex markets.",
                    "They do this to stabilize their currency or guide their domestic economy."
                ],
                visualType: "l4-governments"
            }
        ]
    },
    { 
        id: 5, 
        slug: "why-trade-forex", 
        title: "Why Trade Forex?", 
        done: false,
        content: [
            {
                id: "liquidity",
                title: "Extreme Liquidity",
                text: [
                    "Because the market is so huge, you can almost always buy or sell instantly at the current price.",
                    "This means no 'slippage' on major currency pairs most of the time."
                ],
                visualType: "l5-liquidity"
            },
            {
                id: "low-costs",
                title: "Low Transaction Costs",
                text: [
                    "Most forex brokers charge no commissions. Instead, they make money through the 'spread'.",
                    "This makes forex much cheaper to trade than stocks or options."
                ],
                visualType: "l5-low-costs"
            },
            {
                id: "no-middlemen",
                title: "No Middlemen",
                text: [
                    "In forex, you trade directly with the market making broker.",
                    "This decentralized nature means faster execution and lower fees compared to centralized stock exchanges."
                ],
                visualType: "l5-no-middlemen"
            },
            {
                id: "24-hour-access",
                title: "24-Hour Market",
                text: [
                    "Whether you're a morning person or a night owl, the market is open.",
                    "You can trade after work or before breakfast, giving you ultimate flexibility."
                ],
                visualType: "l5-24-hour"
            },
            {
                id: "no-manipulation",
                title: "Nobody Can Corner It",
                text: [
                    "The forex market is so incredibly massive that no single entity can control the market price.",
                    "Not even a central bank can hold the market hostage for an extended period."
                ],
                visualType: "l5-no-manipulation"
            }
        ]
    },
    { 
        id: 6, 
        slug: "margin-trading", 
        title: "Margin Trading 101", 
        done: false,
        content: [
            {
                id: "leverage",
                title: "The Power of Leverage",
                text: [
                    "Leverage allows you to control large amounts of money with a small deposit.",
                    "For example, 50:1 leverage lets you control $50,000 with just $1,000."
                ],
                visualType: "l6-leverage"
            },
            {
                id: "margin-call",
                title: "Managing Risk",
                text: [
                    "Leverage is a double-edged sword. It amplifies both profits and losses.",
                    "Always use stop losses to protect your capital from a 'margin call'."
                ],
                visualType: "l6-margin-call"
            },
            {
                id: "margin-used",
                title: "Used Margin vs Free Margin",
                text: [
                    "'Used Margin' is the amount locked up to keep your trades open.",
                    "'Free Margin' is what you have left to open new positions."
                ],
                visualType: "l6-margin-used"
            },
            {
                id: "equity",
                title: "Account Equity",
                text: [
                    "Your Equity is your account balance plus any floating profits or minus any floating losses.",
                    "It's the real-time, true value of your account."
                ],
                visualType: "l6-equity"
            },
            {
                id: "stop-out",
                title: "The Stop Out Level",
                text: [
                    "If your margin drops too low, your broker will automatically start closing your trades.",
                    "This safety mechanism is called a Stop Out, and it prevents negative balances."
                ],
                visualType: "l6-stop-out"
            }
        ]
    },
];

export const kindergartenLessons = [
    {
        id: 1,
        slug: "forex-brokers",
        title: "Choosing a Forex Broker",
        content: [
            {
                id: "broker-intro",
                title: "What is a Broker?",
                text: [
                    "A broker is a firm that provides traders with access to a platform for buying and selling foreign currencies.",
                    "They act as middlemen between you and the market."
                ],
                visualType: "k1-broker-intro"
            },
            {
                id: "regulation",
                title: "Regulation Matters",
                text: [
                    "Always choose a regulated broker. Regulation ensures your funds are protected and the broker operates fairly.",
                    "Look for licenses from authorities like the FCA, ASIC, or NFA."
                ],
                visualType: "k1-regulation"
            },
            {
                id: "execution",
                title: "Execution Speed",
                text: [
                    "A good broker should execute your trades instantly.",
                    "Delays or 'requotes' can cause you to miss the exact entry price you wanted."
                ],
                visualType: "k1-execution"
            },
            {
                id: "customer-service",
                title: "Customer Service",
                text: [
                    "Forex operates 24 hours a day, so your broker's support team should be available when you need them.",
                    "Test their responsiveness before funding an account."
                ],
                visualType: "k1-customer-service"
            },
            {
                id: "deposit-withdraw",
                title: "Deposits & Withdrawals",
                text: [
                    "Your funds should be easy to deposit and, more importantly, easy to withdraw.",
                    "Watch out for hidden fees or lengthy withdrawal processing times."
                ],
                visualType: "k1-deposit-withdraw"
            }
        ]
    },
    {
        id: 2,
        slug: "trading-platforms",
        title: "Trading Platforms",
        content: [
            {
                id: "platform-types",
                title: "Popular Platforms",
                text: [
                    "MetaTrader 4 (MT4) and MetaTrader 5 (MT5) are the industry standards.",
                    "Many brokers also offer proprietary platforms with advanced charting features."
                ],
                visualType: "k2-platform"
            },
            {
                id: "charting-tools",
                title: "Charting Tools",
                text: [
                    "A great platform offers robust charting capabilities.",
                    "This allows you to draw trendlines, apply indicators, and analyze price action efficiently."
                ],
                visualType: "k2-charting-tools"
            },
            {
                id: "order-types",
                title: "Advanced Order Types",
                text: [
                    "Beyond simple market orders, you need a platform that supports complex orders.",
                    "These include limit orders, stop orders, and trailing stops to execute your strategies."
                ],
                visualType: "k2-order-types"
            },
            {
                id: "mobile",
                title: "Mobile Trading",
                text: [
                    "In today's fast-paced world, trading on the go is essential.",
                    "The ability to monitor and manage your trades via a reliable mobile app is a crucial feature."
                ],
                visualType: "k2-mobile"
            },
            {
                id: "backtesting",
                title: "Backtesting Capabilities",
                text: [
                    "Some platforms let you test your trading strategy against historical data.",
                    "This is essential for verifying whether your strategy actually works before risking real money."
                ],
                visualType: "k2-backtesting"
            }
        ]
    },
    {
        id: 3,
        slug: "analysis-types",
        title: "Types of Analysis",
        content: [
            {
                id: "technical",
                title: "Technical Analysis",
                text: [
                    "Technical analysis involves using price charts and indicators to predict future price movements.",
                    "It's based on the idea that history repeats itself."
                ],
                visualType: "k3-technical"
            },
            {
                id: "fundamental",
                title: "Fundamental Analysis",
                text: [
                    "Fundamental analysis focuses on economic, social, and political forces that drive supply and demand.",
                    "Interest rates, GDP, and employment reports are key factors."
                ],
                visualType: "k3-fundamental"
            },
            {
                id: "sentiment",
                title: "Sentiment Analysis",
                text: [
                    "This involves gauging how other traders feel about the market.",
                    "Are they mostly bullish or bearish? Contrarian traders often use this to fade the crowd."
                ],
                visualType: "k3-sentiment"
            },
            {
                id: "which-is-best",
                title: "Which is Best?",
                text: [
                    "No single analysis type is perfectly predictive.",
                    "The best traders often combine all three: Fundamental, Technical, and Sentiment analysis."
                ],
                visualType: "k3-which-is-best"
            },
            {
                id: "self-fulfilling",
                title: "Self-Fulfilling Prophecy",
                text: [
                    "Technical analysis sometimes works simply because so many traders use it.",
                    "They are looking at the exact same support and resistance levels, causing price to react."
                ],
                visualType: "k3-self-fulfilling"
            }
        ]
    }
];

export const elementaryLessons = [
    {
        id: 1,
        slug: "support-resistance",
        title: "Support & Resistance",
        content: [
            {
                id: "support",
                title: "Support Levels",
                text: [
                    "Support is a price level where buying interest is strong enough to prevent the price from falling further.",
                    "Think of it as a floor that keeps the price up."
                ],
                visualType: "e1-support"
            },
            {
                id: "resistance",
                title: "Resistance Levels",
                text: [
                    "Resistance is a price level where selling pressure is high enough to prevent the price from rising further.",
                    "Think of it as a ceiling that caps the price."
                ],
                visualType: "e1-resistance"
            },
            {
                id: "breakout",
                title: "Breakouts",
                text: [
                    "Support and resistance levels are not unbreakable walls.",
                    "When price finally pushes through a level with strong momentum, it's called a breakout."
                ],
                visualType: "e1-breakout"
            },
            {
                id: "role-reversal",
                title: "Role Reversal",
                text: [
                    "A fascinating phenomenon in trading occurs when broken resistance becomes new support.",
                    "Conversely, broken support can flip to become new resistance."
                ],
                visualType: "e1-role-reversal"
            },
            {
                id: "fakeout",
                title: "Fakeouts",
                text: [
                    "Sometimes price pokes through a level just enough to trap breakout traders.",
                    "It then sharply reverses direction. These are known as false breakouts or 'fakeouts'."
                ],
                visualType: "e1-fakeout"
            }
        ]
    },
    {
        id: 2,
        slug: "candlestick-basics",
        title: "Candlestick Basics",
        content: [
            {
                id: "candle-body",
                title: "Reading a Candle",
                text: [
                    "Each Japanese candlestick tells a story of the battle between buyers and sellers.",
                    "The 'body' shows the open and close price, while the 'wicks' show the highs and lows."
                ],
                visualType: "e2-candle"
            },
            {
                id: "wicks",
                title: "The Wicks (Shadows)",
                text: [
                    "The thin lines above and below the body show the extreme prices.",
                    "They represent the highest and lowest prices reached during that specific time period."
                ],
                visualType: "e2-wicks"
            },
            {
                id: "bullish-candle",
                title: "Bullish Candles",
                text: [
                    "When the close price is higher than the open price, it indicates buying pressure.",
                    "These are often colored green or white on modern charting platforms."
                ],
                visualType: "e2-bullish-candle"
            },
            {
                id: "bearish-candle",
                title: "Bearish Candles",
                text: [
                    "When the close price is lower than the open price, it indicates selling pressure.",
                    "These are usually colored red or black to signify a drop in price."
                ],
                visualType: "e2-bearish-candle"
            },
            {
                id: "doji",
                title: "The Doji",
                text: [
                    "When a candle opens and closes at almost the exact same price, it forms a cross.",
                    "This shape is called a Doji, signifying extreme market indecision and a tug-of-war between buyers and sellers."
                ],
                visualType: "e2-doji"
            }
        ]
    }
];

export const curricula: Record<string, any[]> = {
    preschool: preschoolLessons,
    kindergarten: kindergartenLessons,
    elementary: elementaryLessons,
};

export const tradingVideos = [
    {
        id: "v1",
        title: "Forex Trading for Beginners",
        description: "A complete guide to get started in Forex trading from scratch. Learn about currency pairs, pips, leverage, and how the market works.",
        videoId: "SNX2F3G_YmY", 
    },
    {
        id: "v2",
        title: "Price Action Trading Strategies",
        description: "Master the art of reading price charts without indicators. Learn about candlestick patterns, support/resistance, and market structure.",
        videoId: "P67v_6rW6C0",
    },
    {
        id: "v3",
        title: "Understanding Risk Management",
        description: "The most important skill in trading. Learn how to calculate position size, set stop losses, and manage your account capital effectively.",
        videoId: "0h6Y-N5YxG8",
    },
    {
        id: "v4",
        title: "Trading Psychology",
        description: "Master your emotions and develop a winning mindset. Learn how to handle losses, avoid FOMO, and stay disciplined in your trading plan.",
        videoId: "8mG5w7v_F7g",
    },
    {
        id: "v5",
        title: "Top 5 Forex Mistakes",
        description: "Avoid the common traps that wipe out most beginner accounts. Learn why over-leveraging and revenge trading are dangerous.",
        videoId: "6vI4XzP0q0o",
    }
];

export const communityEvents = [
    { id: 1, title: "Forex Basics Workshop", date: "2026-05-15", time: "10:00 AM", type: "Webinar", description: "Learn the fundamentals of forex trading in this live workshop.", impact: "medium" },
    { id: 2, title: "Market Analysis Live", date: "2026-05-20", time: "2:00 PM", type: "Live Stream", description: "Join us for a live analysis of the major currency pairs.", impact: "high" },
    { id: 3, title: "Community Meetup", date: "2026-05-25", time: "6:00 PM", type: "Networking", description: "Connect with other traders and share your experiences.", impact: "low" },
];




