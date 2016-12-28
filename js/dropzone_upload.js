$(document).ready(function() {
    // disable auto discover
    Dropzone.autoDiscover = false;
    // grap our upload form by its id
    $(".icon-upload").each(function() {
        console.log("Applying dropzone");
        var dropzone = $(this).dropzone({
            // restrict image size to a maximum 1MB
            maxFilesize: 1,
            // show remove links on each image upload
            addRemoveLinks: false,

            accept: function (file, done) {
                done('Here you can write anything');
                $('.dz-preview').last().toggleClass('dz-error dz-success');
                console.log("Icon accepted!");
                setTimeout(function() {generateImages(); }, 200);
            },
        });

        dropzone.on('addedfile', function (file) {
            console.log("Yoo");
        });
    });

    function generateImages() {
        var baseImg = $('.dz-image').children('img')[0]; 
        console.log("Src: " + baseImg.src);

        var sizes = [29, 40, 48, 50, 57, 60, 72, 76, 83.5];
        var sizeMultipliers = [1, 1.5, 2, 3, 4];

        for (var i = 0; i < sizes.length; i++) {
            for (var j = 0; j < sizeMultipliers.length; j++) {
                var name = sizes[i] + '@' + sizeMultipliers[j];
                console.log("Name: " + name);
                var matches = $("img[name='"+ name + "']");

                if (matches.size() > 0) {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var len = sizes[i] * sizeMultipliers[j];
                    canvas.width = len;
                    canvas.height = len;

                    ctx.drawImage(baseImg, 0, 0, len, len);
                    var url = canvas.toDataURL();

                    matches.each(function() {
                        this.src = url; 
                    });
                }
            }
        }
    }
});