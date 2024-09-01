import { resolvePath } from "@typespec/compiler";
import { createTestHost, createTestWrapper, expectDiagnosticEmpty, } from "@typespec/compiler/testing";
import { PhpemitterTestLibrary } from "../src/testing/index.js";
export async function createPhpemitterTestHost() {
    return createTestHost({
        libraries: [PhpemitterTestLibrary],
    });
}
export async function createPhpemitterTestRunner() {
    const host = await createPhpemitterTestHost();
    return createTestWrapper(host, {
        compilerOptions: {
            noEmit: false,
            emit: ["phpemitter"],
        },
    });
}
export async function emitWithDiagnostics(code) {
    const runner = await createPhpemitterTestRunner();
    await runner.compileAndDiagnose(code, {
        outputDir: "tsp-output",
    });
    const emitterOutputDir = "./tsp-output/phpemitter";
    const files = await runner.program.host.readDir(emitterOutputDir);
    const result = {};
    for (const file of files) {
        result[file] = (await runner.program.host.readFile(resolvePath(emitterOutputDir, file))).text;
    }
    return [result, runner.program.diagnostics];
}
export async function emit(code) {
    const [result, diagnostics] = await emitWithDiagnostics(code);
    expectDiagnosticEmpty(diagnostics);
    return result;
}
//# sourceMappingURL=test-host.js.map