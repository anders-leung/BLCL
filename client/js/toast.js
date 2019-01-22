$(document).ready(function () {
    var toasts = $('#toasts');
    $(this).on('toast', function (e, text, noExpire) {
        var toast = (`
            <div style="margin:0; display: none" class="toast">
                <div class="alert alert-warning alert-dismissible pull-right" role="alert" style="display:inline-flex; opacity: 0.8">
                    <div style="display: inline-table">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="padding:2px 5px">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <p style="margin:0 5px">${text}</p>
                    </div>
                </div>
            </div>
        `)

        toast = $(toast).appendTo(toasts);
        toast.fadeIn()
        
        if (!noExpire) {
            setTimeout(() => {
                toast.fadeOut();
            }, 5000);
        }
    });
});