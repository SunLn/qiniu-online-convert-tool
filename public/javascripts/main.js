(function($) {
    // 当domReady的时候开始初始化
    $(function() {
        var $upload = $('#uploadBtn');

        var uploader = WebUploader.create({
            pick: {
                id: '#filePicker'
            },
            paste: '#uploader',
            chunked: false,
            chunkSize: 512 * 1024,
            server: 'http://up.qiniu.com',

            // accept: {
            //     title: 'Images',
            //     extensions: 'gif,jpg,jpeg,bmp,png',
            //     mimeTypes: 'image/*'
            // },

            // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            disableGlobalDnd: true,
            fileNumLimit: 300,
            fileSizeLimit: 200 * 1024 * 1024, // 200 M
            fileSingleSizeLimit: 50 * 1024 * 1024 // 50 M
        });

        $.get('/uptoken').success(function(data) {
            $('#token').val(data.uptoken);
            uploader.options.formData.token = data.uptoken
        });

        uploader.on('ready', function() {
            window.uploader = uploader;
        });

        uploader.on('uploadBeforeSend', function(file, data) {
            data.key = data.name;
        });

        uploader.on('uploadProgress', function(file, percentage) {

        });

        uploader.on('fileDequeued', function(file) {

        });

        uploader.on('uploadSuccess', function(file, data) {
            // $('#' + file.id).find('p.state').text('已上传');
            console.log(file, data);
            console.log(data.key)
        });

        uploader.on('uploadError', function(file) {
            // $('#' + file.id).find('p.state').text('上传出错');
        });

        uploader.on('all', function(type) {

        });

        uploader.onError = function(code) {
            alert('Eroor: ' + code);
        };

        $upload.on('click', function() {
            uploader.upload();
        });

    });

})(jQuery);

$(function() {
    $('.icon-share-3').on('click', function() {
        $.Dialog({
            overlay: true,
            shadow: true,
            flat: true,
            icon: '<img src="images/excel2013icon.png">',
            title: 'Markdown To HTML',
            content: '',
            onShow: function(_dialog) {
                var content = _dialog.children('.content');
                content.html('Set content from event onShow');
            }
        });
    });
});
