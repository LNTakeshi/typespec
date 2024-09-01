import { resolvePath } from "@typespec/compiler";
import { createTestLibrary } from "@typespec/compiler/testing";
import { fileURLToPath } from "url";
export const PhpemitterTestLibrary = createTestLibrary({
    name: "phpemitter",
    packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
});
//# sourceMappingURL=index.js.map