require({},
	["jquery", "mustache", "text!templates/preview-area.html"],
	function(jQuery, Mustache, previewAreaTemplate) {
            var dropContainer = $('#drop-container');
            dropContainer.bind('dragenter', noop);
            dropContainer.bind('dragover', noop);
            dropContainer.bind(
                'drop', function(event) {dropImage(event, previewAreaTemplate);});
});


var dropImage = function(event, previewAreaTemplate) {
    noop(event);
    console.log(event);

    var files = event.originalEvent.dataTransfer.files;
    console.log(files);
    var data = {"images": []};
    $.each(files, function(index, file) {
        data["images"].push(window.URL.createObjectURL(file));
    });
    console.log(data);
    $('#preview-area').append(Mustache.render(previewAreaTemplate, data));
};


var noop = function(event) {
    event.originalEvent.stopPropagation();
    event.originalEvent.preventDefault();
};
