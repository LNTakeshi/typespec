import { resolvePath } from "@typespec/compiler";
import { createTestLibrary, TypeSpecTestLibrary } from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const PhpemitterTestLibrary: TypeSpecTestLibrary = createTestLibrary({
  name: "phpemitter",
  packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
});
