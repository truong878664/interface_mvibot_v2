@if (Session::has('msg'))
    <div class="message-success">
        <div class="check-icon"><i class="fa-solid fa-circle-check"></i></div>
        <p class="message-title">{{ Session::get('msg') }}</p>
    </div>
    <script>
        removeToastMsg()

        function removeToastMsg() {
            const toastMsg = document.querySelector(".message-success");
            if (toastMsg) {
                setTimeout(() => {
                    toastMsg.remove();
                }, 3000);
            }
        }
    </script>
@endif
