import { Hono } from "hono";
import { cors } from "hono/cors";
import { neon } from "@neondatabase/serverless";
import { isValidContent, isValidId } from "./helpers/validation.js";

type Bindings = {
    DATABASE_URL: string;
    FRONTEND_URL?: string;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
    const origin = c.env.FRONTEND_URL || "*";
    const corsMiddleware = cors({
        origin: origin,
        allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        maxAge: 600,
    });

    return corsMiddleware(c, next);
});

//GET
app.get("/chats/:chatId/mensajes", async (c) => {

    const sql = neon(c.env.DATABASE_URL);

    try {
        const chatId = c.req.param("chatId");

        if (!isValidId(chatId)) {
            return c.json(
                {
                    status: "error",
                    message: "chatId invalido",
                }, 400
            );
        }

        const chat = await sql`SELECT id FROM chats WHERE id = ${Number(chatId)}`;

        if (chat.length === 0) {
            return c.json(
                {
                    status: "error",
                    message: "Chat no encontrado",
                }, 404
            );
        }

        const mensajes = await sql`SELECT * FROM mensajes WHERE chat_id = ${Number(chatId)}
                                ORDER BY created_at ASC`;

        return c.json(
            {
                status: "success",
                mensajes,
            }
        );
    } catch (error) {
        return c.json(
            {
                status: "error",
                message: "error interno",
            }, 500
        );
    }
});

export default app;