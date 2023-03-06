<div class="setting-detail flex flex-col hidden h-full">
    <div class="max-w-[700px] w-full h-full mx-auto overflow-auto">
        <div class="w-full h-[calc(100%_-_32px)] flex rounded-lg overflow-hidden text-2xl relative wifi-container">
            <div class=" w-full max-w-[800px] h-[calc(100%_-_200px)] mx-auto mt-10 relative">
                <div class="w-full h-[80px] rounded-lg bg-[#F2EAE8]  pl-[40px] pr-10 mb-[40px]">
                    <div class="flex justify-between items-center h-full wifi-connect-item hidden">
                        <div class="">
                            <label for="" class="text-sky-600"><i class="fa-solid fa-check"></i></label>
                            <span class="font-bold ml-4 wifi-connected text-2xl"></span>
                        </div>
                        <div class="">
                            <svg width="40" height="40" viewBox="0 0 40 20" fill="none"
                                class="wifi-icon-connected" id="" xmlns="http://www.w3.org/2000/svg">
                                <circle class="low medium height" fill="#9a9a9a" cx="19.9849" cy="16.9683"
                                    r="2.85505" />
                                <path class="height medium" fill="#9a9a9a"
                                    d="M28.5102 12.3681C29.0941 11.8562 29.1572 10.9611 28.5843 10.437C27.5973 9.5341 26.4726 8.78972 25.2497 8.23339C23.5992 7.4825 21.8079 7.09138 19.9946 7.08599C18.1814 7.08061 16.3877 7.46109 14.7328 8.20216C13.5067 8.75121 12.3775 9.4889 11.3852 10.3859C10.8091 10.9067 10.8669 11.802 11.4478 12.3174V12.3174C12.0286 12.8329 12.9117 12.7708 13.5036 12.2681C14.2199 11.66 15.0203 11.1546 15.8821 10.7687C17.1729 10.1907 18.5719 9.89388 19.9863 9.89808C21.4006 9.90228 22.7978 10.2074 24.0852 10.793C24.9447 11.1841 25.7421 11.6942 26.4547 12.3066C27.0436 12.8127 27.9263 12.8801 28.5102 12.3681V12.3681Z" />
                                <path class="height" fill="#9a9a9a"
                                    d="M33.7825 7.51599C34.3573 6.99541 34.4044 6.10346 33.8448 5.56666C32.171 3.96105 30.2278 2.65629 28.1007 1.71396C25.5448 0.58174 22.7801 -0.00213281 19.9847 5.85337e-06C17.1893 0.00214452 14.4255 0.590247 11.8714 1.72637C9.74564 2.67196 7.80452 3.97969 6.13312 5.58786C5.57433 6.12552 5.62286 7.01739 6.19839 7.5371V7.5371C6.77392 8.0568 7.65805 8.00678 8.22297 7.47557C9.62704 6.15529 11.2457 5.07815 13.0127 4.29213C15.2082 3.31552 17.584 2.80999 19.9868 2.80815C22.3897 2.80632 24.7663 3.30821 26.9633 4.28145C28.7315 5.06477 30.3518 6.13943 31.7578 7.45756C32.3236 7.98791 33.2078 8.03657 33.7825 7.51599V7.51599Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between">


                    <div class="flex items-center mb-4">
                        <span class="text-2xl block font-bold">Network available</span>
                        <span class="loader-wifi hidden"></span>
                    </div>
                    <button class="btn reset-wifi-btn">Reset</button>
                </div>

                <div
                    class="w-full min-h-[100px] max-h-full rounded-lg bg-[#F2EAE8] pl-[40px] relative wifi-wrapper pb-10 overflow-auto">

                    <div class="w-full h-[60px] border-b border-[rgba(67,67,67,0.1)] flex justify-between items-center hover:bg-[#cccccc39] cursor-pointer wifi-item hidden"
                        name-wifi="${item.ssid}">
                        <span class="font-bold ml-4"></span>

                        <div class="text-2xl flex items-center pr-4">
                            <div class="">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <div class="">
                                <svg width="40" height="40" viewBox="0 0 40 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle class="low medium height" fill="#9a9a9a" cx="19.9849" cy="16.9683"
                                        r="2.85505" />
                                    <path class="height medium" fill="#9a9a9a"
                                        d="M28.5102 12.3681C29.0941 11.8562 29.1572 10.9611 28.5843 10.437C27.5973 9.5341 26.4726 8.78972 25.2497 8.23339C23.5992 7.4825 21.8079 7.09138 19.9946 7.08599C18.1814 7.08061 16.3877 7.46109 14.7328 8.20216C13.5067 8.75121 12.3775 9.4889 11.3852 10.3859C10.8091 10.9067 10.8669 11.802 11.4478 12.3174V12.3174C12.0286 12.8329 12.9117 12.7708 13.5036 12.2681C14.2199 11.66 15.0203 11.1546 15.8821 10.7687C17.1729 10.1907 18.5719 9.89388 19.9863 9.89808C21.4006 9.90228 22.7978 10.2074 24.0852 10.793C24.9447 11.1841 25.7421 11.6942 26.4547 12.3066C27.0436 12.8127 27.9263 12.8801 28.5102 12.3681V12.3681Z" />
                                    <path class="height" fill="#9a9a9a"
                                        d="M33.7825 7.51599C34.3573 6.99541 34.4044 6.10346 33.8448 5.56666C32.171 3.96105 30.2278 2.65629 28.1007 1.71396C25.5448 0.58174 22.7801 -0.00213281 19.9847 5.85337e-06C17.1893 0.00214452 14.4255 0.590247 11.8714 1.72637C9.74564 2.67196 7.80452 3.97969 6.13312 5.58786C5.57433 6.12552 5.62286 7.01739 6.19839 7.5371V7.5371C6.77392 8.0568 7.65805 8.00678 8.22297 7.47557C9.62704 6.15529 11.2457 5.07815 13.0127 4.29213C15.2082 3.31552 17.584 2.80999 19.9868 2.80815C22.3897 2.80632 24.7663 3.30821 26.9633 4.28145C28.7315 5.06477 30.3518 6.13943 31.7578 7.45756C32.3236 7.98791 33.2078 8.03657 33.7825 7.51599V7.51599Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="overlay fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-20 hidden">

                </div>
                <div
                    class="absolute w-full max-w-[600px] bg-[#efefef] top-16 left-1/2 -translate-x-1/2 rounded-2xl shadow-lg p-10 hidden form-enter-password z-[21]">
                    <div class="flex justify-between">
                        <button class="mt-2 btn cancel-wifi-btn font-bold">Cancle</button>
                        <label class="font-bold text-[16px]">Enter password for "<span
                                class="label-wifi">null</span>"</label>
                        <button class="mt-2 btn connect-wifi-btn disabled:opacity-50 font-bold"
                            disabled>Connect</button>
                    </div>

                    <div data-status="pending" class="w-full h-[60px] rounded-xl bg-[#e6e6e6] mt-7 flex items-center px-10">
                        <span class="font-bold mr-4">Password</span>
                        <input class="flex-1 text-[16px] bg-transparent border-none outline-none tracking-[2px] py-4"
                            type="password" name="" id="password-wifi">
                        <button class="show-password-btn outline-none">
                            <i class="fa-regular fa-eye show"></i>
                            <i class="fa-regular fa-eye-slash hide"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        .active .show,
        .hide {
            display: none;
        }

        .active .hide,
        .show {
            display: block;
        }

        #medium .medium,
        #height .height,
        #low .low {
            fill: black
        }

        .loader-wifi {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            position: relative;
            border: 4px solid;
            border-color: rgba(128, 128, 128, 0.15) rgba(128, 128, 128, 0.25) rgba(128, 128, 128, 0.35) rgba(128, 128, 128, 0.5);
            box-sizing: border-box;
            animation: rotation 1.5s linear infinite;
        }

        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</div>
