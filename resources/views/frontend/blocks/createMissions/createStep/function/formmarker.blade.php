<link rel="stylesheet" href="/css/createMission/marker.css">
<p class="heading-form-mission">Marker</p>
{{-- <form action="">
    <label for="">Time sleep</label>
    <input type="text" class="time-sleep">
    <span>second</span>
    <button class="add-btn submit-btn">Add</button>
</form> --}}
<div class="type-marker">
    <label for="l-marker" class="marker-btn">L Marker</label>
    <label for="vl-marker" class="marker-btn">VL Marker</label>
    <label for="bar-marker" class="marker-btn">Bar Marker</label>
    <label for="none-marker-dis" class="marker-btn">None Marker dis</label>
    <label for="none-marker-angle" class="marker-btn">None Marker angle</label>
</div>

<input name="marker" type="radio" id="l-marker">
<input name="marker" type="radio" id="vl-marker">
<input name="marker" type="radio" id="bar-marker">
<input name="marker" type="radio" id="none-marker-dis">
<input name="marker" type="radio" id="none-marker-angle">

<div class="form-marker-wrapper form-l-marker">
    <button class="close-form-marker-btn"><i class="fa-solid fa-xmark"></i></button>
    <div class="marker-title">L Marker</div>
    <div class="wrapper-marker">
        <form class="form-marker-item form-marker" action="">
            <div class="offset-wrapper-all">
                <div class="offset-wrapper-input">
                    <label for="">Marker dir</label>
                    <select name="marker_dir" class="input-offset">
                        <option value=""></option>
                        <option value="font_ward">Font ward</option>
                        <option value="back_ward">Back ward</option>
                    </select>
                </div>

                <div class="offset-wrapper-input">
                    <label for="">Offset X1</label>
                    <input class="input-offset" type="text">
                </div>
                <div class="offset-wrapper-input">
                    <label for="">Offset X2</label>
                    <input class="input-offset" type="text">
                </div>

                <div class="offset-wrapper-input">
                    <label for="">Offset Y1</label>
                    <input class="input-offset" type="text">
                </div>
                <div class="offset-wrapper-input">
                    <label for="">Offset Y2</label>
                    <input class="input-offset" type="text">
                </div>
            </div>
            <button class="submit-btn submit-marker">Add</button>

        </form>
        <div class="form-marker-item illustration">
            <img src="/img/markerl.png" alt="">
        </div>
    </div>
</div>

{{-- 
<div class="form-vl-marker">
    <form action="">

    </form>
    <div class="illustration">
        456
    </div>
</div>

<div class="form-bar-marker">
    <form action="">

    </form>
    <div class="illustration">
        
    </div>
</div>

<div class="none-marker-dis">
    <form action="">

    </form>
    <div class="illustration">
        
    </div>
</div>

<div class="none-marker-angle">
    <form action="">

    </form>
    <div class="illustration">
        456
    </div>
</div> --}}
<script>
    // const allradio = document.querySelectorAll("input[name='marker']")
    // const xBtn = document.querySelector('.x-btn')
    // console.log(xBtn)
    // xBtn.addEventListener('click', () => {
    //     allradio.forEach(element => {
    //         element.checked = false
    //     });
    // })
</script>
