import passport from "passport";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "./../lib/prisma.js";

passport.use(
    new localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            }); // temp
            if (!user) {
                return done(null, false, { message: "Email not found." });
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
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;