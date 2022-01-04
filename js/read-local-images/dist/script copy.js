document.getElementById("file").addEventListener("change", ev => {
  for (let i = 0; i < ev.target.files.length; i++) {
    let file = ev.target.files[i];

    // ディレクトリの相対パス
    let relativePath = file.webkitRelativePath;


    let fileReader = new FileReader();
    fileReader.onload = function (theFile) {
      return function (e) {
        // Render thumbnail.
        var figure = document.createElement("figure");
        figure.innerHTML = `
          <img class="thumb" src="${e.target.result}"
           />
          <figcaption style="text-align: center">${theFile.name}</figcaption>
         `;
        document.getElementById("list").insertBefore(figure, null);
      };
    }(file);

    fileReader.readAsDataURL(file);
  }
});