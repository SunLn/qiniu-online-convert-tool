$(function() {

    $('.js-md2html-btn').on('click', function() {
        $('#js-md-2-html').removeClass('hide').show();
        $('.tile-area>.tile-group').hide();
        var Qiniu = new QiniuJsSDK();

        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash', //上传模式,依次退化
            browse_button: 'md-file', //上传选择的点选按钮，**必需**
            uptoken_url: '/uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            unique_names: true,
            domain: 'http://metro-demo-qiniu.qiniudn.com/', //bucket 域名，下载资源时用到，**必需**
            container: 'md-box', //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '100mb', //最大文件体积限制
            flash_swf_url: './js-sdk/Moxie.swf', //引入flash,相对路径
            max_retries: 3, //上传失败最大重试次数
            dragdrop: true, //开启可拖曳上传
            drop_element: 'md-box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',
            auto_start: true,
            filters: {
                mime_types: [{
                    title: "Markdown files",
                    extensions: "md,MD,markdown"
                }]
            },
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key;
                    // 获取上传成功后的文件的Url
                    $('#md-url').val(sourceLink);
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后,处理相关的事情
                }
            }
        });

        $('#md-submit').on('click', function() {
            var $this = $(this);
            $.post('/md2html', {
                resource: $('#md-url').val(),
                mode: $('input[name="md-mode"]:checked').val(),
                css: $('input[name=md-style]').val()
            }).done(function(data) {
                console.log(data.resource);
                $this.next('a').attr('href', data.resource).removeClass('hide').show();
            }).fail(function() {

            });
            return false;
        });

    });

    $('#home').on('click', function() {
        $('.special-box').hide();
        $('.tile-area>.tile-group').show();
    });

    $('.js-doc2pdf-btn').on('click', function() {
        $('#js-doc-2-html').removeClass('hide').show();
        $('.tile-area>.tile-group').hide();
        window.scrollTo(0, window.scrollY)

        var Qiniu = new QiniuJsSDK();

        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash', //上传模式,依次退化
            browse_button: 'doc-file', //上传选择的点选按钮，**必需**
            uptoken_url: '/uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            unique_names: true,
            domain: 'http://metro-demo-qiniu.qiniudn.com/', //bucket 域名，下载资源时用到，**必需**
            container: 'doc-box', //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '100mb', //最大文件体积限制
            flash_swf_url: './js-sdk/Moxie.swf', //引入flash,相对路径
            max_retries: 3, //上传失败最大重试次数
            dragdrop: true, //开启可拖曳上传
            drop_element: 'doc-box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',
            auto_start: true,
            filters: {
                mime_types: [{
                    title: "Docs files",
                    extensions: "ppt,pptx,doc,docx"
                }]
            },
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key;
                    // 获取上传成功后的文件的Url
                    $('#doc-url').val(sourceLink);
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后,处理相关的事情
                }
            }
        });

        $('#doc-submit').on('click', function() {
            var $this = $(this);
            $.post('/doc2pdf', {
                resource: $('#doc-url').val()
            }).done(function(data) {
                // console.log(data.resource);
                $this.next('a').attr('href', data.resource).removeClass('hide').show();
            }).fail(function() {

            });
            return false;
        });

    });


    $('.js-pdf2img-btn').on('click', function() {
        $('#js-pdf-2-img').removeClass('hide').show();
        $('.tile-area>.tile-group').hide();
        window.scrollTo(0, window.scrollY)

        var Qiniu = new QiniuJsSDK();

        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash', //上传模式,依次退化
            browse_button: 'pdf-file', //上传选择的点选按钮，**必需**
            uptoken_url: '/uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            unique_names: true,
            domain: 'http://metro-demo-qiniu.qiniudn.com/', //bucket 域名，下载资源时用到，**必需**
            container: 'pdf-box', //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '100mb', //最大文件体积限制
            flash_swf_url: './js-sdk/Moxie.swf', //引入flash,相对路径
            max_retries: 3, //上传失败最大重试次数
            dragdrop: true, //开启可拖曳上传
            drop_element: 'pdf-box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',
            auto_start: true,
            filters: {
                mime_types: [{
                    title: "PDF files",
                    extensions: "pdf"
                }]
            },
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key;
                    // 获取上传成功后的文件的Url
                    $('#pdf-url').val(sourceLink);
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后,处理相关的事情
                }
            }
        });

        $('#pdf-submit').on('click', function() {
            var resource = $('#pdf-url').val();
            var page = $('input[name=pdf-page]').val();
            var type = $('select[name=pdf-img-type]').val();
            var url = resource + '?odconv/' + type + '/page/' + page;

            var $this = $(this);

            $this.next('a').attr('href', url).removeClass('hide').show();
            return false;
        });

    });

});
