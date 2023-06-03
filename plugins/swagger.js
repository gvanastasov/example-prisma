const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const convert = require("json-schema-to-openapi-schema");
const mergePatch = require("json-merge-patch");
const fs = require("fs");

const { getSwaggerOptions } = require("../config/swagger.conf");

const plugin = function (app) {
    const swaggerSchema = swaggerJsdoc(getSwaggerOptions("v1"));

    const prismaJson = JSON.parse(fs.readFileSync("./db/__generated/json-schema.json", "utf8"));
    const prismaSchema = convert(prismaJson);

    const spec = mergePatch.apply(swaggerSchema, prismaSchema);

    // hack: the converter does not really transform properly, therefore some manual magic
    // trick here to do that. There might be other ways to handle the JSON to OA3 schema
    // mapping, which is beyound the scope of this.
    spec.components = {
        schemas: {
            ...spec.components.schemas,
            ...prismaSchema.definitions
        }
    };

    app.get("/api-docs/spec.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(spec);
    });

    var swaggerUIOptions = {
        explorer: true,
        swaggerOptions: {
            urls: [
                {
                    url: "http://localhost:3000/api-docs/spec.json",
                    name: "Spec1",
                },
            ],
        },
    };

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(null, swaggerUIOptions)
    );
};

module.exports = plugin;