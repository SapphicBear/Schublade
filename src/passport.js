import passport from "passport";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "./../lib/prisma.js";

passport.use(
    new localStrategy( async (name, password, done) => {
        try {
            const { row } = await prisma.user.findUnique({
                where: { name: name, password: password }
            }); // temp
            const user = rows[0];
            if (!user) {
                return done(null, false, { message: "Username not found." });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Wrong password." });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }), 
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await prisma.findUnique({
            where: { id: parseInt(id) },
        });
        const user = rows[0];
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;