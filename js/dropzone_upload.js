$(document).ready(function() {
    // disable auto discover
    Dropzone.autoDiscover = false;
    // grap our upload form by its id
    $(".icon-upload").each(function() {
        console.log("Applying dropzone");
        $(this).dropzone({
            // restrict image size to a maximum 1MB
            maxFilesize: 1,
            // changed the passed param to one accepted by
            // our rails app
            paramName: "upload[image]",
            // show remove links on each image upload
            addRemoveLinks: true,
            // if the upload was successful
            success: function(file, response) {
                // find the remove button link of the uploaded file and give it an id
                // based of the fileID response from the server
                console.log("Image success uploaded" + response.url);
                $(file.previewTemplate).find('.dz-remove').attr('id', response.fileID);
                // add the dz-success class (the green tick sign)
                $(file.previewElement).addClass("dz-success");
                updateIconImages(response.url);
            },
            //when the remove button is clicked
            removedfile: function(file) {
                // grap the id of the uploaded file we set earlier
                var id = $(file.previewTemplate).find('.dz-remove').attr('id');
                // make a DELETE ajax request to delete the file
                $.ajax({
                    type: 'DELETE',
                    url: '/uploads/' + id,
                    success: function(data) {
                        console.log(data.message);
                    }
                });
            }
        });
    });

    function updateIconImages(url) {
        $('img').each(function() {
            var src = $(this).attr('src');
            var name = $(this).attr('name');
            var updated_url = url.replace('original', name);
            if (src.indexOf('place') >= 0) {
                // awesome pony detection algorithm triggered!
                $(this).attr('src', updated_url);
            }
        });
    };
    $(".screenshot-upload").each(function() {
        $(this).dropzone({
            // restrict image size to a maximum 1MB
            maxFilesize: 1,
            // changed the passed param to one accepted by
            // our rails app
            paramName: "upload[image]",
            previewsContainer: ".screenshot-preview",
            // show remove links on each image upload
            addRemoveLinks: true,
            success: function(file, response) {
                // find the remove button link of the uploaded file and give it an id
                // based of the fileID response from the server
                console.log("Image success uploaded" + response.url + ', slot: ' + response.slot);
                $(file.previewTemplate).find('.dz-remove').attr('id', response.fileID);
                // add the dz-success class (the green tick sign)
                $(file.previewElement).addClass("dz-success");
                updateScreenshotImages(response.url, response.slot);
            },
            //when the remove button is clicked
            removedfile: function(file) {
                // grap the id of the uploaded file we set earlier
                var id = $(file.previewTemplate).find('.dz-remove').attr('id');
                // make a DELETE ajax request to delete the file
                $.ajax({
                    type: 'DELETE',
                    url: '/uploads/' + id,
                    success: function(data) {
                        console.log(data.message);
                    }
                });
            }
        });
    });

    function updateScreenshotImages(url, slot) {
        $('img').each(function() {
            var src = $(this).attr('src');
            var image_slot = $(this).attr('slot');
            var size = $(this).attr('name')
            var updated_url = url.replace('original', size);
            if (image_slot && image_slot.indexOf(slot) >= 0) {
                // awesome pony detection algorithm triggered!
                $(this).attr('src', updated_url);
            }
        });
    };
});