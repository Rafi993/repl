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
  // output
  let editorOutput = monaco.editor.create(
    document.getElementById("container-output"),
    {
      value: ["// output"].join("\n"),
      language: "javascript",
      theme: "vs-dark",
      readOnly: true
    }
  );

  // Input
  let editorInput = monaco.editor.create(
    document.getElementById("container-input"),
    {
      value: ["// use ramdajs"].join("\n"),
      language: "javascript",
      theme: "vs-dark"
    }
  );

  editorInput.addListener("didType", () => {
    try {
      const val = eval(editorInput.getValue());
      editorOutput.setValue(JSON.stringify(val));
    } catch (e) {
      console.log("Invalid value", e);
    }
  });
});

for (const prop of Object.getOwnPropertyNames(R)) {
  window[prop] = R[prop];
}
