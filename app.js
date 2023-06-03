const express = require("express");
const ejs = require("ejs");
const path = require("path");

const { prisma } = require("./db");
const { install } = require("./plugins");

const app = express();

install(app, "swagger");

app.engine(".html", ejs.renderFile);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.get("/", async (_req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.render("index", { users });
    } catch (error) {
        next(error);
    }
});

app.get("/:id/posts", async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await prisma.user
            .findUnique({ 
                where: { id: Number(id) },
                include: { posts: true }
            });
        res.render("posts", { user });
    } catch (error) {
        next(error);
    }
});

app.use(express.static(path.join(__dirname, "public")));

module.exports = { app };
