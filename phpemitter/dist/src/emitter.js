import { CodeTypeEmitter, StringBuilder, code } from "@typespec/compiler/emitter-framework";
export async function $onEmit(context) {
    const assetEmitter = context.getAssetEmitter(MyCodeEmitter);
    // emit my entire TypeSpec program
    assetEmitter.emitProgram();
    // or, maybe emit types just in a specific namespace
    // const ns = context.program.resolveTypeReference("MyNamespace")!;
    // assetEmitter.emitType(ns);
    // lastly, write your emit output into the output directory
    await assetEmitter.writeOutput();
}
class MyCodeEmitter extends CodeTypeEmitter {
    // context is covered later in this document
    modelDeclarationContext(model, name) {
        const sourceFile = this.emitter.createSourceFile(`${name}.php`);
        return {
            scope: sourceFile.globalScope,
        };
    }
    modelDeclaration(model, name) {
        const props = this.emitter.emitModelProperties(model);
        return this.emitter.result.declaration(name, code `<?php
class ${name} {
${props}
}`);
    }
    modelProperties(model) {
        const builder = new StringBuilder();
        let i = 0;
        for (const prop of model.properties.values()) {
            i++;
            const propVal = this.emitter.emitModelProperty(prop);
            builder.push(code `      ${propVal}\n`);
        }
        return this.emitter.result.rawCode(builder.reduce());
    }
    modelPropertyLiteral(property) {
        return code `public ${this.emitter.emitTypeReference(property.type)} $${property.name};`;
    }
    arrayLiteral(array, elementType) {
        return 'array';
    }
}
//# sourceMappingURL=emitter.js.map