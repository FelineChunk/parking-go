import * as runtime from "@prisma/client/runtime/client";
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.0",
    "engineVersion": "ab56fe763f921d033a6c195e7ddeb3e255bdbb57",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel transactions {\n  id_transaction Int                @id @default(autoincrement())\n  time_in        DateTime           @default(now()) @db.Timestamp(6)\n  time_out       DateTime?          @db.Timestamp(6)\n  card_id        String?            @db.VarChar(50)\n  fee            Int?               @default(dbgenerated(\"\\nCASE\\n    WHEN (time_out IS NULL) THEN (0)::numeric\\n    ELSE (ceil((EXTRACT(epoch FROM (time_out - time_in)) / 3600.0)) * (2000)::numeric)\\nEND\"))\n  status         transaction_status @default(IN)\n}\n\nenum transaction_status {\n  IN\n  OUT\n  DONE\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"transactions\":{\"fields\":[{\"name\":\"id_transaction\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"time_in\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"time_out\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"card_id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fee\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"transaction_status\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"transactions.findUnique\",\"transactions.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"transactions.findFirst\",\"transactions.findFirstOrThrow\",\"transactions.findMany\",\"data\",\"transactions.createOne\",\"transactions.createMany\",\"transactions.createManyAndReturn\",\"transactions.updateOne\",\"transactions.updateMany\",\"transactions.updateManyAndReturn\",\"create\",\"update\",\"transactions.upsertOne\",\"transactions.deleteOne\",\"transactions.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"transactions.groupBy\",\"transactions.aggregate\",\"AND\",\"OR\",\"NOT\",\"id_transaction\",\"time_in\",\"time_out\",\"card_id\",\"fee\",\"transaction_status\",\"status\",\"equals\",\"in\",\"notIn\",\"not\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "QQsQCRwAAC8AMB0AAAQAEB4AAC8AMB8CAAAAASBAADEAISFAADIAISIBADMAISMCADQAISUAADUlIgEAAAABACABAAAAAQAgCRwAAC8AMB0AAAQAEB4AAC8AMB8CADAAISBAADEAISFAADIAISIBADMAISMCADQAISUAADUlIgMhAAA2ACAiAAA2ACAjAAA2ACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAGHwIAAAABIEAAAAABIUAAAAABIgEAAAABIwIAAAABJQAAACUCAQgAAAkAIAYfAgAAAAEgQAAAAAEhQAAAAAEiAQAAAAEjAgAAAAElAAAAJQIBCAAACwAwAQgAAAsAMAYfAgBBACEgQAA8ACEhQAA9ACEiAQA-ACEjAgA_ACElAABAJSICAAAAAQAgCAAADgAgBh8CAEEAISBAADwAISFAAD0AISIBAD4AISMCAD8AISUAAEAlIgIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgCBUAADcAIBYAADgAIBcAADsAIBgAADoAIBkAADkAICEAADYAICIAADYAICMAADYAIAkcAAAaADAdAAAXABAeAAAaADAfAgAbACEgQAAcACEhQAAdACEiAQAeACEjAgAfACElAAAgJSIDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAkcAAAaADAdAAAXABAeAAAaADAfAgAbACEgQAAcACEhQAAdACEiAQAeACEjAgAfACElAAAgJSINFQAAIgAgFgAALgAgFwAAIgAgGAAAIgAgGQAAIgAgJgIAAAABJwIAAAAEKAIAAAAEKQIALQAhKgIAAAABKwIAAAABLAIAAAABLQIAAAABCxUAACIAIBgAACwAIBkAACwAICZAAAAAASdAAAAABChAAAAABClAACsAISpAAAAAAStAAAAAASxAAAAAAS1AAAAAAQsVAAAlACAYAAAqACAZAAAqACAmQAAAAAEnQAAAAAUoQAAAAAUpQAApACEqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAEOFQAAJQAgGAAAKAAgGQAAKAAgJgEAAAABJwEAAAAFKAEAAAAFKQEAJwAhKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAAAABDRUAACUAIBYAACYAIBcAACUAIBgAACUAIBkAACUAICYCAAAAAScCAAAABSgCAAAABSkCACQAISoCAAAAASsCAAAAASwCAAAAAS0CAAAAAQcVAAAiACAYAAAjACAZAAAjACAmAAAAJQInAAAAJQgoAAAAJQgpAAAhJSIHFQAAIgAgGAAAIwAgGQAAIwAgJgAAACUCJwAAACUIKAAAACUIKQAAISUiCCYCAAAAAScCAAAABCgCAAAABCkCACIAISoCAAAAASsCAAAAASwCAAAAAS0CAAAAAQQmAAAAJQInAAAAJQgoAAAAJQgpAAAjJSINFQAAJQAgFgAAJgAgFwAAJQAgGAAAJQAgGQAAJQAgJgIAAAABJwIAAAAFKAIAAAAFKQIAJAAhKgIAAAABKwIAAAABLAIAAAABLQIAAAABCCYCAAAAAScCAAAABSgCAAAABSkCACUAISoCAAAAASsCAAAAASwCAAAAAS0CAAAAAQgmCAAAAAEnCAAAAAUoCAAAAAUpCAAmACEqCAAAAAErCAAAAAEsCAAAAAEtCAAAAAEOFQAAJQAgGAAAKAAgGQAAKAAgJgEAAAABJwEAAAAFKAEAAAAFKQEAJwAhKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAAAABCyYBAAAAAScBAAAABSgBAAAABSkBACgAISoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABAAAAAQsVAAAlACAYAAAqACAZAAAqACAmQAAAAAEnQAAAAAUoQAAAAAUpQAApACEqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAEIJkAAAAABJ0AAAAAFKEAAAAAFKUAAKgAhKkAAAAABK0AAAAABLEAAAAABLUAAAAABCxUAACIAIBgAACwAIBkAACwAICZAAAAAASdAAAAABChAAAAABClAACsAISpAAAAAAStAAAAAASxAAAAAAS1AAAAAAQgmQAAAAAEnQAAAAAQoQAAAAAQpQAAsACEqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAENFQAAIgAgFgAALgAgFwAAIgAgGAAAIgAgGQAAIgAgJgIAAAABJwIAAAAEKAIAAAAEKQIALQAhKgIAAAABKwIAAAABLAIAAAABLQIAAAABCCYIAAAAAScIAAAABCgIAAAABCkIAC4AISoIAAAAASsIAAAAASwIAAAAAS0IAAAAAQkcAAAvADAdAAAEABAeAAAvADAfAgAwACEgQAAxACEhQAAyACEiAQAzACEjAgA0ACElAAA1JSIIJgIAAAABJwIAAAAEKAIAAAAEKQIAIgAhKgIAAAABKwIAAAABLAIAAAABLQIAAAABCCZAAAAAASdAAAAABChAAAAABClAACwAISpAAAAAAStAAAAAASxAAAAAAS1AAAAAAQgmQAAAAAEnQAAAAAUoQAAAAAUpQAAqACEqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAELJgEAAAABJwEAAAAFKAEAAAAFKQEAKAAhKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAAAABCCYCAAAAAScCAAAABSgCAAAABSkCACUAISoCAAAAASsCAAAAASwCAAAAAS0CAAAAAQQmAAAAJQInAAAAJQgoAAAAJQgpAAAjJSIAAAAAAAABMUAAAAABATFAAAAAAQExAQAAAAEFMQIAAAABMgIAAAABMwIAAAABNAIAAAABNQIAAAABATEAAAAlAgUxAgAAAAEyAgAAAAEzAgAAAAE0AgAAAAE1AgAAAAEAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhoYBRsZCw"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map