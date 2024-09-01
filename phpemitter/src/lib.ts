import { createTypeSpecLibrary } from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "phpemitter",
  diagnostics: {},
  state: {
    customName: { description: "State for the @customName decorator" },
  },
});

export const { reportDiagnostic, createDiagnostic } = $lib;

export const StateKeys = $lib.stateKeys;