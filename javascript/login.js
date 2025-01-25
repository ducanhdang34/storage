$('#ui-login-form').on('submit', function(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append('username', $('#ui-login-form-username').val().trim());
    fd.append('password', $('#ui-login-form-password').val());

    $.ajax({
        url: loginEndpoint,
        method: 'POST',
        contentType: false,
        processData: false,
        data: fd,
        success: function(response) {
            if (!response.success) {
                if (response.username_err != '') {
                    $('#ui-login-form-username').addClass('is-invalid');
                    $('#ui-invalid-feedback-username').text(response.username_err);
                } else {
                    $('#ui-login-form-username').removeClass('is-invalid');
                }

                if (response.password_err != '') {
                    $('#ui-login-form-password').addClass('is-invalid');
                    $('#ui-invalid-feedback-password').text(response.password_err);
                } else {
                    $('#ui-login-form-password').removeClass('is-invalid');
                }

                if (response.login_err != '') {
                    $('#ui-login-form-username').addClass('is-invalid');
                    $('#ui-invalid-feedback-username').text(response.login_err);

                    $('#ui-login-form-password').addClass('is-invalid');
                    $('#ui-invalid-feedback-password').text(response.login_err);
                }
            } else {
                $('#ui-login-form-username').removeClass('is-invalid');
                $('#ui-login-form-password').removeClass('is-invalid');

                loadHomePage();
                window.history.pushState({additionalInformation: "Updated the URL with JS"}, "", "/");
            }
        }
    });
});