<div
    class="group/noti text-white -translate-y-[120%] notification [&.notification-show]:translate-y-0 transition-transform duration-100 [&.error]:text-red-500 [&.success]:text-green-500 success fixed top-[10px] left-1/2 -translate-x-1/2 z-[100] bg-[#ffffff] px-4 py-2 min-w-[200px] min-h-[60px] max-h-[120px] rounded-lg flex items-center shadow-md overflow-hidden">
    <span class="text-3xl rounded-md  flex justify-center items-center w-[30px] aspect-square">
        <i class="fa-solid fa-check hidden group-[.success]/noti:block success-icon"></i>
        <i class="fa-solid fa-xmark hidden group-[.error]/noti:block error-icon"></i>
    </span>
    <div class="ml-4 flex flex-col">
        <span class="font-bold">Notification</span>
        <span id="message"></span>
    </div>
    <button class="absolute top-0 right-0 text-stone-300 px-4 py-2 hover:text-stone-500 delete-message-btn">
        <i class="fa-solid fa-xmark"></i>
    </button>
</div>
