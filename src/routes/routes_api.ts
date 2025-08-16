import Elysia, { t } from "elysia";


export const apiRoute = new Elysia({ prefix: "/api" })
    .post("/",({body})=>{
        console.log(body)
        return {message: "hello api"}
    },
    {
        body: t.Object({
            name: t.String()
        })
    }

)
