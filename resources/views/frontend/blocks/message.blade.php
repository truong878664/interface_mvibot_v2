{{-- @if (Session::has('msg'))
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
@endif --}}
{{--  --}}
<div
    class="-translate-y-[120%] notification fixed top-[10px] left-1/2 -translate-x-1/2 z-[100] text-2xl bg-[#ffffff] px-4 py-2 min-w-[200px] h-[60px] rounded-lg flex items-center shadow-md ">
    <span class="text-[30px] rounded-md  flex justify-center items-center w-[30px]">
        <i class="fa-solid fa-check success-icon"></i>
        <i class="fa-solid fa-xmark error-icon"></i>
    </span>
    <div class="ml-4">
        <span class="font-bold">Notification</span>
        <div class="" style="">
            <span id="message" class=" w-full h-full "></span>
        </div>
    </div>
    <button class="absolute top-0 right-0 text-stone-300 px-4 py-2 hover:text-stone-500 delete-message-btn"><i
            class="fa-solid fa-xmark"></i></button>
    <style>
        .notification-show {
            transform: translateY(0) translateX(-50%);
        }

        .notification {
            transition: transform 100ms ease-in;
        }

        .error {
            color: rgb(239 68 68);
        }

        .success {
            color: rgb(34 197 94);
        }

        .success-icon,
        .error-icon {
            display: none;
        }

        .error .error-icon,
        .success .success-icon {
            display: block;
        }
    </style>
</div>
