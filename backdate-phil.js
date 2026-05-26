const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
    try {
        const phil = await prisma.user.findFirst({
            where: { username: "Phil" }
        });
        if (phil) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            await prisma.user.update({
                where: { id: phil.id },
                data: {
                    currentStreak: 0,
                    lastActiveAt: yesterday
                }
            });
            console.log("✅ Backdated Phil to yesterday! Last active: " + yesterday.toISOString());
        } else {
            console.log("❌ Phil not found");
        }
    } catch (e) {
        console.error("Error backdating Phil:", e);
    } finally {
        await prisma.$disconnect();
    }
}
run();
