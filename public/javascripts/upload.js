(function($) {
    // 当domReady的时候开始初始化
    $(function() {
        var $upload = $('#uploadBtn');

        var uploader = WebUploader.create({
            pick: {
                id: '#filePicker',
                label: '点击选择图片'
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
            console.log(token);
            uploader.options.formData.token = data.uptoken
        });

        uploader.on('ready', function() {
            window.uploader = uploader;
        });

        uploader.onUploadBeforeSend = function(file, data) {
            data.key = data.name;
        };

        uploader.onUploadProgress = function(file, percentage) {

        };

        uploader.onFileQueued = function(file) {

        };

        uploader.onFileDequeued = function(file) {

        };

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
