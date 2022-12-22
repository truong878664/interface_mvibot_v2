<div class="text-2xl data-gpio-item">
    <button
        class="create-gpio mx-auto bg-[#0f6cbd] text-[#fff] btn px-2 min-w-[94px] rounded-sm">{{ $name_gpio_item }}</button>
    <input type="text" hidden name="{{ $name_gpio_item }}" id="{{ $name_gpio_item }}"
        class="{{ $name_gpio_item . '_' . $type }}"
        value="{{ $type === 'wake_up' && $name_gpio_item === 'out_set' ? '2,5,8,11,14,17' : '' }}">
    <div
        class="show-gpio-wrapper mt-2 w-full overflow-x-scroll h-[24px] select-none {{ $name_gpio_item . '_' . $type . '_show' }}">
    </div>
    <div class="in_pulldown_value form-gpio-item  lg:bottom-[auto] lg:top-[100%]">
        @for ($i = 0; $i < 21; $i++)
            <label class="checkbox-wrapper ">
                <label class="label-for-checkbox-gpio w-[16px]">{{ $i }}</label>
                <input class="checkbox-gpio {{ $name_gpio_item . '_' . $type . '_checkbox' }}" type="checkbox"
                    value="{{ $i }}" />
            </label>
        @endfor
        <button class="hidden-form-gpio-item"><i class="fa-solid fa-xmark"></i></button>
    </div>
</div>
