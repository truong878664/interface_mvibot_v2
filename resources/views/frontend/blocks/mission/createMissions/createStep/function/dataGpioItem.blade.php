<div class="data-gpio-item">
    <label class="name_gpio_item" for={{ $name_gpio_item }}>{{ $name_gpio_item }}</label>
    <input type="text" hidden name="{{ $name_gpio_item }}" id="{{ $name_gpio_item }}">
    <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>
    <div class="show-gpio-wrapper"></div>
    <div class="in_pulldown_value form-gpio-item">
        @for ($i = 0; $i < 21; $i++)
            <label class="checkbox-wrapper">
                <label class="label-for-checkbox-gpio">{{ $i }}</label>
                <input class="checkbox-gpio" type="checkbox" value="{{ $i }}" />
            </label>
        @endfor
        <button class="hidden-form-gpio-item"><i class="fa-solid fa-xmark"></i></button>
    </div>
</div>
