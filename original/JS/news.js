function loadNewsPage(page_id) {
    const theme = localStorage.getItem('theme');

    if (theme === null) {
        applyDarkMode();
    } else {
        if (theme === "light") {
            applyLightMode();
        } else {
            applyDarkMode();
        }
    }

    authentication(function(role) {
        const fd = new FormData();
        fd.append('page_id', page_id);
    
        $.post({
            url: getNewsDetailsEndpoint,
            data: fd,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.success) {
                    $('.ui-blog-post-name').text(response['response'][0].name);
                    document.title = response['response'][0].name;
                    $('.ui-blog-post-content').html(response['response'][0].content);
                    $('.ui-blog-post-author-avatar').prop('src', response['response'][0].author_avatar);
                    $('.ui-blog-post-author').text(response['response'][0].author);
                    $('.ui-blog-post-views').text(response['response'][0].views + " lượt đọc")
                    $('page-content').children().hide();
                    $('blog-post').show();
                    ajaxStop();
                    removeAllActiveIcons();
                    stopPlayback();
                    if (role === 'unauthenticated') {
                        $('.ui-blog-post-comment-self-fullname').text('bạn chưa đăng nhập');
                        $('.ui-blog-post-comment-button').text('đăng nhập để bình luận');
                        $('.ui-blog-post-comment-self-avatar').prop('src', 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg');
                    } else {
                        $('.ui-blog-post-comment-button').text('bình luận');
                        $('.ui-blog-post-comment-self-fullname').text(response['comment'].user_fullname);
                        $('.ui-blog-post-comment-self-avatar').prop('src', response['comment'].user_avatar);
                    }
                }
            }
        });
    });
}