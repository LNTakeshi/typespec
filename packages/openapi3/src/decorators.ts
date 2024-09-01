import { DecoratorContext, Model, ModelProperty, Operation, Program, setTypeSpecNamespace, Type, Union } from "@typespec/compiler";
import {  ErrorCodesDecorator, OneOfDecorator, UseRefDecorator } from "../generated-defs/TypeSpec.OpenAPI.js";
import { createStateSymbol, reportDiagnostic } from "./lib.js";

const refTargetsKey = createStateSymbol("refs");
export const $useRef: UseRefDecorator = (
  context: DecoratorContext,
  entity: Model | ModelProperty,
  refUrl: string
) => {
  context.program.stateMap(refTargetsKey).set(entity, refUrl);
};

export function getRef(program: Program, entity: Type): string | undefined {
  return program.stateMap(refTargetsKey).get(entity);
}

const oneOfKey = createStateSymbol("oneOf");
export const $oneOf: OneOfDecorator = (
  context: DecoratorContext,
  entity: Union | ModelProperty
) => {
  if (entity.kind === "ModelProperty" && entity.type.kind !== "Union") {
    reportDiagnostic(context.program, {
      code: "oneof-union",
      target: context.decoratorTarget,
    });
  }
  context.program.stateMap(oneOfKey).set(entity, true);
};

export function getOneOf(program: Program, entity: Type): boolean {
  return program.stateMap(oneOfKey).get(entity);
}

const errorCodesKey = createStateSymbol("errorCodes");
export const $errorCodes: ErrorCodesDecorator = (
  context: DecoratorContext,
  entity: Operation,
  errorCodes: Union
) => {
  context.program.stateMap(errorCodesKey).set(entity, errorCodes);
};

export function getErrorCodes(program: Program, entity: Type): Union {
  return program.stateMap(errorCodesKey).get(entity);
}
