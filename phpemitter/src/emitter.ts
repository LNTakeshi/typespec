import { EmitContext, Model, ModelProperty, Program, Type, emitFile, resolvePath } from "@typespec/compiler";
import { CodeTypeEmitter, Context, EmitterOutput, StringBuilder, code } from "@typespec/compiler/emitter-framework";

export async function $onEmit(context: EmitContext) {
  const assetEmitter = context.getAssetEmitter(MyCodeEmitter);

  // emit my entire TypeSpec program
  assetEmitter.emitProgram();

  // lastly, write your emit output into the output directory
  await assetEmitter.writeOutput();
}

class MyCodeEmitter extends CodeTypeEmitter {
  // context is covered later in this document
  modelDeclarationContext(model: Model, name: string): Context {
    const sourceFile = this.emitter.createSourceFile(`${name}.php`);
    return {
      scope: sourceFile.globalScope,
    };
  }

  modelDeclaration(model: Model, name: string) {
    const props = this.emitter.emitModelProperties(model);
    return this.emitter.result.declaration(name, code`<?php
class ${name} {
${props}
}`);
  }

  modelProperties(model: Model): EmitterOutput<string> {
    const builder = new StringBuilder();
    let i = 0;
    for (const prop of model.properties.values()) {
      i++;
      const propVal = this.emitter.emitModelProperty(prop);
      builder.push(code`      ${propVal}\n`);
    }
    return this.emitter.result.rawCode(builder.reduce());
  }

  modelPropertyLiteral(property: ModelProperty): EmitterOutput<string> {
    return code`public ${this.emitter.emitTypeReference(property.type)} $${property.name};`;
  }

  arrayLiteral(array: Model, elementType: Type): EmitterOutput<string> {
      return 'array';
  }

}