require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@0.8.3/min/vs" }
});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `self.MonacoEnvironment = { baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/' };
  importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');`
    ],
    { type: "text/javascript" }
  )
);

require(["vs/editor/editor.main"], function() {
  let editor = monaco.editor.create(document.getElementById("container"), {
    value: ["// use ramdajs"].join("\n"),
    language: "javascript",
    theme: "vs-dark"
  });

  editor.addListener("didType", () => {
    try {
      const val = eval(editor.getValue());
      console.log(val);
    } catch (e) {
      console.log("Invalid value");
    }
  });
});

for (const prop of Object.getOwnPropertyNames(R)) {
  window[prop] = R[prop];
}
