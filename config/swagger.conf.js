const definition = {
    openapi: "3.0.0",
    info: {
        title: "Example Express Swagger",
        description: "Example restful api, with swagger and in-memory mongodb.",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
};

const getSwaggerOptions = function (version) {
    return {
        definition: {
            ...definition,
            info: {
                ...definition.info,
                version,
            },
        },
        apis: [],
    };
};

module.exports = { getSwaggerOptions };