import { achievements } from "@/lib/data";
import { Star, Flame, Trophy, Users, ChevronRight } from "lucide-react";

const leaderboardData = [
    { rank: 1, name: "FXProTrader", xp: 12840, streak: 45, avatar: "FP", level: "Elite" },
    { rank: 2, name: "PipKing_EA", xp: 11250, streak: 32, avatar: "PK", level: "Expert" },
    { rank: 3, name: "SwingMaster_R", xp: 9870, streak: 21, avatar: "SM", level: "Expert" },
    { rank: 4, name: "YouGrindhard", xp: 7540, streak: 18, avatar: "YG", level: "Advanced" },
    { rank: 5, name: "CryptoKingdom", xp: 6920, streak: 14, avatar: "CK", level: "Advanced" },
    { rank: 6, name: "You", xp: 2450, streak: 7, avatar: "ME", level: "Intermediate", isMe: true },
];

const levels = [
    { name: "Newbie", min: 0, max: 500, color: "text-white/40" },
    { name: "Beginner", min: 500, max: 1500, color: "text-green-400" },
    { name: "Intermediate", min: 1500, max: 3000, color: "text-blue-400" },
    { name: "Advanced", min: 3000, max: 6000, color: "text-purple-400" },
    { name: "Expert", min: 6000, max: 10000, color: "text-yellow-400" },
    { name: "Elite", min: 10000, max: 999999, color: "text-gradient" },
];

const dailyMissions = [
    { title: "Complete 1 Lesson", reward: 30, done: true },
    { title: "Log a trade in Journal", reward: 50, done: true },
    { title: "Post a comment in Forum", reward: 20, done: false },
    { title: "Run 1 Backtesting session", reward: 40, done: false },
];

const userXP = 2450;
const currentLevel = levels.find(l => userXP >= l.min && userXP < l.max)!;
const nextLevel = levels[levels.findIndex(l => l.name === currentLevel.name) + 1];
const pct = nextLevel ? ((userXP - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100;

export default function AchievementsPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-3">
                    <Trophy size={14} />
                    <span>Progression System</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-2">Achievements & <span className="text-gradient">Rewards</span></h1>
                <p className="text-white/50">Earn XP, unlock badges, and climb the leaderboard as you grow as a trader.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left panel */}
                <div className="space-y-5">
                    {/* Level card */}
                    <div className="glass rounded-2xl p-6">
                        <div className="text-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mx-auto mb-3 text-3xl font-bold text-blue-400">
                                ME
                            </div>
                            <div className={`text-xl font-bold font-display ${currentLevel.color}`}>{currentLevel.name}</div>
                            <div className="text-xs text-white/40 mt-1 flex items-center justify-center gap-2">
                                <Star size={12} className="text-yellow-400" />
                                <span className="font-bold text-yellow-400">{userXP.toLocaleString()} XP</span>
                            </div>
                        </div>
                        {nextLevel && (
                            <>
                                <div className="progress-bar mb-2"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                                <div className="flex justify-between text-xs text-white/35">
                                    <span>{userXP.toLocaleString()} XP</span>
                                    <span>{nextLevel.min.toLocaleString()} XP to {nextLevel.name}</span>
                                </div>
                            </>
                        )}
                        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5 text-center">
                            <div>
                                <div className="text-lg font-bold">🔥 7</div>
                                <div className="text-xs text-white/35">Day Streak</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">4</div>
                                <div className="text-xs text-white/35">Badges Earned</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">#6</div>
                                <div className="text-xs text-white/35">Leaderboard</div>
                            </div>
                        </div>
                    </div>

                    {/* Daily missions */}
                    <div className="glass rounded-2xl p-5">
                        <h3 className="font-semibold text-sm mb-1">Daily Missions</h3>
                        <p className="text-xs text-white/35 mb-4">Resets at midnight UTC</p>
                        <div className="space-y-3">
                            {dailyMissions.map((m) => (
                                <div key={m.title} className={`flex items-center gap-3 p-2.5 rounded-xl ${m.done ? "bg-green-500/8" : "glass"}`}>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${m.done ? "bg-green-500/30 text-green-400" : "border border-white/20 text-white/20"}`}>
                                        {m.done ? "✓" : ""}
                                    </div>
                                    <span className={`text-xs flex-1 ${m.done ? "text-white/40 line-through" : "text-white/70"}`}>{m.title}</span>
                                    <span className="text-xs font-bold text-yellow-400">+{m.reward} XP</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-xs text-white/30 text-center">
                            Completed 2/4 missions today · +80 XP earned
                        </div>
                    </div>
                </div>

                {/* Center: Achievements grid */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/30">Badges</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {achievements.map(ach => (
                            <div
                                key={ach.id}
                                className={`glass rounded-xl p-3 text-center transition-all ${ach.earned ? "border border-green-500/15" : "opacity-40"}`}
                                title={ach.desc}
                            >
                                <div className="text-2xl mb-1">{ach.icon}</div>
                                <div className="text-xs font-medium text-white/70 leading-tight">{ach.title}</div>
                                <div className="text-xs text-yellow-400 mt-1">+{ach.xp} XP</div>
                                {ach.earned && <div className="text-xs text-green-400 mt-0.5">✓ Earned</div>}
                            </div>
                        ))}
                    </div>
                    <div className="text-center text-xs text-white/25">4 of 12 badges unlocked</div>
                </div>

                {/* Right: Leaderboard */}
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/30 flex items-center gap-2">
                        <Users size={13} /> Global Leaderboard
                    </h2>
                    <div className="glass rounded-2xl overflow-hidden">
                        {leaderboardData.map((user) => (
                            <div key={user.rank} className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 ${user.isMe ? "bg-green-500/5 border-l-2 border-l-green-500/50" : ""}`}>
                                <span className="w-5 text-xs font-bold text-center shrink-0">
                                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                                </span>
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-xs font-bold text-green-400 shrink-0">{user.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-xs font-semibold ${user.isMe ? "text-green-400" : "text-white/80"}`}>{user.name} {user.isMe && "(You)"}</div>
                                    <div className="text-xs text-white/30">{user.level} · 🔥 {user.streak}d</div>
                                </div>
                                <div className="text-xs font-bold text-yellow-400">{user.xp.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>

                    {/* Weekly challenge */}
                    <div className="glass-brand rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Flame size={16} className="text-orange-400" />
                            <h3 className="font-semibold text-sm">This Week&apos;s Challenge</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-1 font-semibold">Best Trade Idea of the Week</p>
                        <p className="text-xs text-white/45 mb-4">Post your best trade idea to the Social Feed. Most likes by Friday wins 2,000 bonus XP 🏆</p>
                        <a href="/social" className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-500/15 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-all">
                            <span>Post My Idea</span>
                            <ChevronRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
