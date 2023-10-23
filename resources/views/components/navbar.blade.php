<nav class="fixed top-0 left-0 z-10 flex h-full w-[74px] flex-col bg-slate-50 shadow-sm">
    <ul class="flex flex-col gap-6 pt-16 pb-5">
        <a href="{{ route('home') }}">
            <li
                class="home flex cursor-pointer flex-col items-center justify-center border-l-4 text-2xl text-stone-600/50 [&.active]:border-main [&.active]:text-main">
                <i class="fa-solid fa-house"></i>
                <span class="text-sm">Home</span>
            </li>
        </a>
        <a href="{{ route('dashboard.') }}">
            <li
                class="dashboard flex cursor-pointer flex-col items-center justify-center border-l-4 text-2xl text-stone-600/50 [&.active]:border-main [&.active]:text-main">
                <i class="fa-solid fa-gamepad"></i>
                <span class="text-sm">Dashboard</span>
            </li>
        </a>
        <a href="{{ route('user') }}">
            <li
                class="user flex cursor-pointer flex-col items-center justify-center border-l-4 text-2xl text-stone-600/50 [&.active]:border-main [&.active]:text-main">
                <i class="fa-solid fa-user-gear"></i>
                <span class="text-sm">User</span>
            </li>
        </a>
    </ul>
    <hr />
    <ul
        class="bookmark-wrapper hidden h-full flex-col items-center overflow-y-auto gap-4 overflow-x-hidden pt-4 md:flex">
    </ul>
</nav>
