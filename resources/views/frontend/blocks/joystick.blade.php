<div class="w-[210px] h-[210px] relative md:w-[300px] md:h-[300px] md:mb-4">
    <div
        class="joystick-wrapper absolute bg-[#ccc/0.5] left-1/2 top-1/2 rounded h-[160px] w-[160px] md:h-[250px] md:w-[250px]">
        <div id="zone_joystick"></div>
    </div>
    <div class="absolute z-[9] text-[#ccc] top-0 left-1/2 -translate-x-1/2 up">
        <i class="fa-solid fa-caret-up"></i>
    </div>
    <div class="absolute z-[9] text-[#ccc] left-0 top-1/2 -translate-y-1/2 left">
        <i class="fa-solid fa-caret-left"></i>
    </div>
    <div class="absolute z-[9] text-[#ccc] right-0 top-1/2 -translate-y-1/2 right">
        <i class="fa-solid fa-caret-right"></i>
    </div>
    <div class="absolute z-[9] text-[#ccc] bottom-0 left-1/2 -translate-x-1/2 down">
        <i class="fa-solid fa-caret-down"></i>
    </div>
</div>
<script src="/js/library/nipplejs.js"></script>

<style>
    .joystick-wrapper {
        background: radial-gradient(at 75% 75%, #f2f2f2 0%, #d9d9d9 100%);
        box-shadow: 0 -5px 5px rgba(255, 255, 255, 0.1),
            0 5px 5px rgba(255, 255, 255, 0.05), inset 0 5px 5px rgba(0, 0, 0, 0.2),
            inset 0 -5px 5px rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
    }

    .collection_0 {
        opacity: 1 !important;
    }

    .back {
        background: radial-gradient(at 25% 25%,
                #f2f2f2 0%,
                #d9d9d9 100%) !important;
        position: absolute;
        height: 80%;
        width: 80%;
        border-radius: 50%;
        transform-style: preserve-3d;
        perspective: 1000px;
        box-shadow: inset -5px -10px 40px rgba(0, 0, 0, 0.05),
            inset 0px 0px 10px rgba(0, 0, 0, 0.3),
            inset 0px 0px 5px rgba(0, 0, 0, 0.5),
            inset 0px 0px 3px 1px rgba(0, 0, 0, 0.51),
            0px 0px 10px rgba(0, 0, 0, 0.3);
        opacity: 1 !important;
    }

    .front {
        background: radial-gradient(at 50% 75%,
                #f2f2f2 100%,
                #d9d9d9 100%) !important;
        box-shadow: inset 5px 5px 10px rgba(255, 255, 255, 0.6),
            inset -5px -5px 10px rgba(0, 0, 0, 0.4),
            0 2px 10px -5px rgba(0, 0, 0, 0.7), 0 4px 20px -10px rgba(0, 0, 0, 0.4),
            -50px 0 40px -20px rgba(0, 0, 0, 0.3),
            50px 50px 40px -20px rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: 10;
        border-radius: 50%;
        transition: 200ms ease all;
        opacity: 1 !important;
    }

    .light {
        color: orange;
        text-shadow: 0 0 16px orange;
    }
</style>
