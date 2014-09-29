$(function() {

    $('.icon-share-3').on('click', function() {
        $('#js-md-2-html').removeClass('hide');

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

        // var tempHtml = $('#js-md-2-html').find('.container');
        // $.Dialog({
        //     overlay: true,
        //     shadow: true,
        //     flat: true,
        //     icon: '<img src="images/excel2013icon.png">',
        //     title: 'Markdown To HTML',
        //     // content: '<div class="span8 offset1 container"><label class="inline-block">Upload Markdown :</label><div id="upMDBox" data-role="input-control" class="input-control text"><div><input type="input" tabindex="-1" style="z-index: 0;"><button id="upMD" type="button" class="btn-file"></button></div></div><div id="upMDBtn" class="button small info"> 开始上传</div><label>Choose Mode :</label><div data-role="input-control" class="input-control radio"><label class="inline-block"><input type="radio" name="md-mode" checked="" value="0"><span class="check"></span>Render All</label><label class="inline-block offset1"><input type="radio" name="md-mode" value="1"><span class="check"></span>Only Render Body</label></div><label>CSS URL :</label><div data-role="input-control" class="input-control text"><input type="text" placeholder=""><button tabindex="-1" type="button" class="btn-clear"></button></div><input type="submit" value="Submit"></div>',
        //     onShow: function(_dialog) {
        //         var content = _dialog.children('.content');
        //         // if (content.find('.container').length == 0) {
        //         //     // temp.appendTo(content).;
        //         content.append($('#js-md-2-html').find('.container') || tempHtml);
        //         content.addClass('span10').parent('.window').css('height', '');
        //         // }
        //         // content.append()
        //         $.Metro.initInputs();
        //         console.log($('#upMD'));

        //     }
        // });
        $('#md-submit').on('click', function() {
            $.post('/md2html', {
                resource: $('#md-url').val(),
                mode: $('input[name="md-mode"]:checked').val(),
                css: $('input[name=md-style]').val()
            }).done(function(data) {
                console.log(data.resource);
            }).fail(function() {

            });
            return false;
        });


        $('#upMDBtn').on('click', function() {
            uploader.start();
        });
        // $('#upMD .btn-file').on('click', function() {
        //     $('#upMD').trigger('click');
        // });

    });
});
