const wpAjaxAction = async (action, data = {}) => new Promise((resolve, reject) => {
    jQuery.ajax({
        url: '/wp-admin/admin-ajax.php',
        type : 'post',
        dataType : 'json',
        data : { action, ...data },
        success: function(response) {
            resolve(response);
        },
        error: (xhr, err) => {
            reject(err);
        }
    });
});

const wpAjax = async (url, data) => new Promise((resolve, reject) => {
    jQuery.ajax({
        url,
        type : data ? 'post' : 'get',
        dataType : 'json',
        data,
        success: function(response) {
            resolve(response);
        },
        error: (xhr, err) => {
            reject(xhr.responseJSON);
        }
    });
});



export {
    wpAjax,
    wpAjaxAction
};


