<div
    class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-40 flex justify-center items-center user-setting-detail hidden">
    <div class="bg-stone-50 z-50 w-[400px] p-4 rounded-t-lg">
        <div class="flex justify-between text-[16px] border-b border-b-stone-500 pb-4 text-[#333]">
            <button
                class="px-4 py-1 btn rounded-lg border border-yellow-500 text-yellow-500 close-tab-user">Cancel</button>
            <span class="">
                Change Password</span>
            <button class="px-4 py-1 btn rounded-lg border bg-main text-[#fff] change-pw-btn">Change</button>
        </div>

        <div class="py-4">
            <div class="text-[16px] mb-6 flex flex-col items-end">
                <div class="flex justify-end ">
                    <span class="mr-4">Current password</span>
                    <input type="password" class="px-2 py-1 w-1/2 password">
                </div>
                <span class="text-red-400 text-xl span-password"></span>

            </div>

            <div class="flex text-[16px] justify-end mb-6">
                <span class="mr-4">New password</span>
                <input type="password" class="px-2 py-1 w-1/2 new-password">
            </div>

            <div class="text-[16px] mb-6 flex flex-col items-end">
                <div class="flex justify-end ">
                    <span class="mr-4">Confirm new password</span>
                    <input type="password" class="px-2 py-1 w-1/2 confirm-password">
                </div>
                <span class="text-red-400 text-xl span-confirm"></span>

            </div>
        </div>
    </div>
</div>
