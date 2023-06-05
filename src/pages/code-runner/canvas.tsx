import { Editor, useMonaco } from "@monaco-editor/react";
import { type NextPage } from "next";
import { useEffect } from "react";
import AppShell from "~/components/ui/AppShell";
import { LoadingSpinner } from "~/components/ui/Loading";

const CodeRunnerPage: NextPage = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) {
      return;
    }
    monaco.languages.register({ id: "glsl" });
    monaco.languages.setMonarchTokensProvider("glsl", {
      keywords: [
        "const",
        "uniform",
        "break",
        "continue",
        "do",
        "for",
        "while",
        "if",
        "else",
        "switch",
        "case",
        "in",
        "out",
        "inout",
        "true",
        "false",
        "invariant",
        "discard",
        "return",
        "sampler2D",
        "samplerCube",
        "sampler3D",
        "struct",
        "radians",
        "degrees",
        "sin",
        "cos",
        "tan",
        "asin",
        "acos",
        "atan",
        "pow",
        "sinh",
        "cosh",
        "tanh",
        "asinh",
        "acosh",
        "atanh",
        "exp",
        "log",
        "exp2",
        "log2",
        "sqrt",
        "inversesqrt",
        "abs",
        "sign",
        "floor",
        "ceil",
        "round",
        "roundEven",
        "trunc",
        "fract",
        "mod",
        "modf",
        "min",
        "max",
        "clamp",
        "mix",
        "step",
        "smoothstep",
        "length",
        "distance",
        "dot",
        "cross ",
        "determinant",
        "inverse",
        "normalize",
        "faceforward",
        "reflect",
        "refract",
        "matrixCompMult",
        "outerProduct",
        "transpose",
        "lessThan ",
        "lessThanEqual",
        "greaterThan",
        "greaterThanEqual",
        "equal",
        "notEqual",
        "any",
        "all",
        "not",
        "packUnorm2x16",
        "unpackUnorm2x16",
        "packSnorm2x16",
        "unpackSnorm2x16",
        "packHalf2x16",
        "unpackHalf2x16",
        "dFdx",
        "dFdy",
        "fwidth",
        "textureSize",
        "texture",
        "textureProj",
        "textureLod",
        "textureGrad",
        "texelFetch",
        "texelFetchOffset",
        "textureProjLod",
        "textureLodOffset",
        "textureGradOffset",
        "textureProjLodOffset",
        "textureProjGrad",
        "intBitsToFloat",
        "uintBitsToFloat",
        "floatBitsToInt",
        "floatBitsToUint",
        "isnan",
        "isinf",
        "vec2",
        "vec3",
        "vec4",
        "ivec2",
        "ivec3",
        "ivec4",
        "uvec2",
        "uvec3",
        "uvec4",
        "bvec2",
        "bvec3",
        "bvec4",
        "mat2",
        "mat3",
        "mat2x2",
        "mat2x3",
        "mat2x4",
        "mat3x2",
        "mat3x3",
        "mat3x4",
        "mat4x2",
        "mat4x3",
        "mat4x4",
        "mat4",
        "float",
        "int",
        "uint",
        "void",
        "bool",
      ],
      typeKeywords: [
        "vec2",
        "vec3",
        "vec4",
        "ivec2",
        "ivec3",
        "ivec4",
        "uvec2",
        "uvec3",
        "uvec4",
        "bvec2",
        "bvec3",
        "bvec4",
        "mat2",
        "mat3",
        "mat2x2",
        "mat2x3",
        "mat2x4",
        "mat3x2",
        "mat3x3",
        "mat3x4",
        "mat4x2",
        "mat4x3",
        "mat4x4",
        "mat4",
        "float",
        "int",
        "uint",
        "void",
        "bool",
      ],
      operators: [
        "=",
        ">",
        "<",
        "!",
        "~",
        "?",
        ":",
        "==",
        "<=",
        ">=",
        "!=",
        "&&",
        "||",
        "++",
        "--",
        "+",
        "-",
        "*",
        "/",
        "&",
        "|",
        "^",
        "%",
        "<<",
        ">>",
        ">>>",
        "+=",
        "-=",
        "*=",
        "/=",
        "&=",
        "|=",
        "^=",
        "%=",
        "<<=",
        ">>=",
        ">>>=",
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes:
        /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      integersuffix: /([uU](ll|LL|l|L)|(ll|LL|l|L)?[uU]?)/,
      floatsuffix: /[fFlL]?/,
      encoding: /u|u8|U|L/,
      tokenizer: {
        root: [
          // identifiers and keywords
          [
            /[a-zA-Z_]\w*/,
            {
              cases: {
                "@keywords": { token: "keyword.$0" },
                "@default": "identifier",
              },
            },
          ],

          // Preprocessor directive (#define)
          [/^\s*#\s*\w+/, "keyword.directive"],

          // whitespace
          { include: "@whitespace" },

          // delimiters and operators
          [/[{}()\[\]]/, "@brackets"],
          [
            /@symbols/,
            {
              cases: {
                "@operators": "operator",
                "@default": "",
              },
            },
          ],

          // numbers
          [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, "number.float"],
          [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, "number.float"],
          [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, "number.hex"],
          [/0[0-7']*[0-7](@integersuffix)/, "number.octal"],
          [/0[bB][0-1']*[0-1](@integersuffix)/, "number.binary"],
          [/\d[\d']*\d(@integersuffix)/, "number"],
          [/\d(@integersuffix)/, "number"],

          // delimiter: after number because of .\d floats
          [/[;,.]/, "delimiter"],
        ],

        comment: [
          [/[^\/*]+/, "comment"],
          [/\/\*/, "comment", "@push"],
          ["\\*/", "comment", "@pop"],
          [/[\/*]/, "comment"],
        ],

        // Does it have strings?
        string: [
          [/[^\\"]+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [
            /"/,
            {
              token: "string.quote",
              bracket: "@close",
              next: "@pop",
            },
          ],
        ],

        whitespace: [
          [/[ \t\r\n]+/, "white"],
          [/\/\*/, "comment", "@comment"],
          [/\/\/.*$/, "comment"],
        ],
      },
    });
  }, [monaco]);

  return (
    <AppShell>
      <div className="flex flex-row overflow-hidden">
        <div className="bg-secondary-800 p-3">
          <Editor
            height="100vh"
            width="50vw"
            theme="vs-dark"
            loading={<LoadingSpinner />}
            defaultLanguage="glsl"
            options={{ smoothScrolling: true }}
            defaultValue="void main(void) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }"
          />
        </div>
        <div className="block h-screen w-[45vw] bg-red-500"></div>
      </div>
    </AppShell>
  );
};

export default CodeRunnerPage;
