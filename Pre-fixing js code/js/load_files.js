/**
 * Created by ander on 2017-05-09.
 */
$(document).ready(function(e) {
    var files,
        file,
        extension,
        input = document.getElementById("fileURL"),
        output = document.getElementById("fileOutput"),
        fileNames = $('#fileNames');

    input.addEventListener("change", function(e) {
        files = e.target.files;
        output.innerHTML = "";

        var string = "";
        for (var i = 0, len = files.length; i < len; i++) {
            file = files[i];
            extension = file.name.split(".").pop();
            output.innerHTML += "<li class='type-" + extension + "'>" + file.name + "</li>";
            string += file.name + ",";
            fileNames.val(string);
        }
        fileNames.val(string.substring(0, string.length - 1));
    }, false);
});