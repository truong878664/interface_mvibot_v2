@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=""></div>
    <div class="relative overflow-hidden w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2">
        {{-- <canvas id="map-test" class="bg-red-100 w-full h-full "></canvas>
        <div class="absolute top-0 left-0 ">
            <input type="range" min="0" max="100" class="change-canvas">
            <input type="range" min="0" max="100" class="change-left">
            <input type="range" min="0" max="100" class="change-right">
        </div> --}}

        <button id="submit-btn" class="bg-blue-400 p-4 btn">tesst</button>
    </div>



    <script>
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)
        $('#submit-btn').onclick = () => {
            showActive({
                message: 'Do you want do submit this?',
                callback: deleteMission
            })
        }

        function deleteMission() {
            console.log(123);
        }

        function showActive({ message = 'Do you want to delete?',callback}) {
            const divElement = document.createElement('div')
            divElement.classList.add('fixed', 'top-0', 'z-10', 'left-0', 'right-0', 'bottom-0', 'bg-[rgba(0,0,0,0.2)]',
                'form-submit-again', 'flex', 'justify-center', 'items-center')
            divElement.innerHTML = `<div class="p-4 bg-[#fff] rounded-md flex flex-col justify-center text-2xl">
                <p>${message}</p>
                <div class="flex justify-evenly mt-4">
                    <button class="bg-yellow-500 text-[#fff] px-3 py-2 rounded-md btn" id='cancel-form-again-btn'>Cancel</button>
                    <button class="bg-red-500 text-[#fff] px-3 py-2 rounded-md btn" id='submit-form-again-btn'>Submit</button>
                </div>
            </div>`
            document.body.appendChild(divElement)
            const formSubmitAgain = document.querySelector('.form-submit-again')
            const submitFormAgainBtn = document.querySelector('#submit-form-again-btn')
            const cancelFormAgainBtn = document.querySelector('#cancel-form-again-btn')

            cancelFormAgainBtn.addEventListener('click', hidenFormAgain)
            submitFormAgainBtn.addEventListener('click', () => {
                hidenFormAgain()
                callback()
            })
            formSubmitAgain.addEventListener('click', hidenFormAgain)

            function hidenFormAgain() {
                formSubmitAgain.remove()
            }
        }
    </script>

    {{-- <script>
        function readPGM(path) {
            return new Promise((resolve, reject) => {
                // Tạo một XMLHttpRequest để tải tệp PGM
                const xhr = new XMLHttpRequest();
                xhr.open('GET', path, true);
                xhr.responseType = 'arraybuffer';

                // Xử lý kết quả khi tải xong
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        // Chuyển đổi dữ liệu arraybuffer sang Uint8Array
                        const arrayBuffer = xhr.response;
                        const uint8Array = new Uint8Array(arrayBuffer);

                        // Tìm vị trí đầu tiên của dữ liệu ảnh
                        let headerLength = 0;
                        while (uint8Array[headerLength] !== 10) {
                            headerLength++;
                        }
                        headerLength++;

                        // Tìm kích thước ảnh
                        let width = '';
                        let height = '';
                        while (uint8Array[headerLength] !== 32) {
                            width += String.fromCharCode(uint8Array[headerLength]);
                            headerLength++;

                        }
                        headerLength++;
                        while (uint8Array[headerLength] !== 10) {
                            height += String.fromCharCode(uint8Array[headerLength]);
                            headerLength++;
                        }
                        headerLength++;

                        // Tìm giá trị tối đa của pixel
                        let maxVal = '';
                        while (uint8Array[headerLength] !== 10) {
                            maxVal += String.fromCharCode(uint8Array[headerLength]);
                            headerLength++;
                        }
                        headerLength++;

                        // Lưu dữ liệu ảnh vào mảng pixels
                        const pixels = new Uint8Array(uint8Array.buffer, headerLength);

                        // Trả về đối tượng PGMData
                        resolve({
                            width: parseInt(width),
                            height: parseInt(height),
                            maxVal: parseInt(maxVal),
                            pixels: pixels
                        });
                    } else {
                        reject(new Error(`Failed to load image file ${path}`));
                    }
                };

                // Xử lý lỗi khi tải
                xhr.onerror = () => {
                    reject(new Error(`Failed to load image file ${path}`));
                };

                // Bắt đầu tải tệp PGM
                xhr.send();
            });
        }

        const canvas = document.getElementById('map-test');
        const ctx = canvas.getContext('2d');

        let imgData


        function zoomCanva(width, left, right) {
            readPGM('/map/map22.pgm').then(pgmData => {
                const WIDTH = 1760
                const HEIGHT = 1536
                canvas.width = width * 2;
                canvas.height = width * 0.8727 * 1.2;
                const imageData = ctx.createImageData(WIDTH, HEIGHT);
                console.log(pgmData.pixels);
                for (let i = 0; i < pgmData.pixels.length; i++) {
                    imageData.data[i * 4] = pgmData.pixels[i];
                    imageData.data[i * 4 + 1] = pgmData.pixels[i];
                    imageData.data[i * 4 + 2] = pgmData.pixels[i];
                    imageData.data[i * 4 + 3] = 255;
                    // console.log(pgmData.pixels[i]);

                    // imageData.data[i * 4] = pgmData.pixels[i];
                    // imageData.data[i * 4 + 1] = pgmData.pixels[i];
                    // imageData.data[i * 4 + 2] = pgmData.pixels[i];
                    // imageData.data[i * 4 + 3] = 255;
                }
                imgData = imageData
                ctx.putImageData(imageData, left, right);
            })
        }

        const rangeZoom = document.querySelector('.change-canvas')
        const rangeLeft = document.querySelector('.change-left')
        const rangeRight = document.querySelector('.change-right')


        let newValue = 5000
        let left = 0
        let right = 0
        zoomCanva(newValue, left, right)

        rangeLeft.oninput = e => {
            const value = parseInt(e.target.value)
            const value2 = value * 100
            left = value2 + -1500
            zoomCanva(newValue, left, right)

        }


        rangeRight.oninput = e => {
            const value = parseInt(e.target.value)
            const value2 = value * 100
            right = value2 + -1500
            zoomCanva(newValue, left, right)

        }

        rangeZoom.oninput = e => {
            const VALUE = 5000
            const value = parseInt(e.target.value)
            newValue = VALUE - (VALUE * value / 100)
            zoomCanva(newValue, left, right)

        }

        var mouse = {
            x: 0,
            y: 0,
            down: false
        };

        canvas.addEventListener("mousedown", function(event) {
            mouse.down = true;
            mouse.x = event.offsetX;
            mouse.y = event.offsetY;
        });

        canvas.addEventListener("mouseup", function(event) {
            mouse.down = false;
        });


        // Sự kiện khi chuột được di chuyển
        canvas.addEventListener("mousemove", function(event) {
            if (mouse.down) {
                // Tính toán khoảng cách di chuyển của chuột
                var deltaX = mouse.x;
                var deltaY = mouse.y;

                console.log(deltaX, deltaY)

                // Vẽ lại hình ảnh ở vị trí mới

                // Cập nhật vị trí chuột mới
                mouse.x = event.offsetX;
                mouse.y = event.offsetY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.putImageData(imgData, deltaX, deltaY);
            }
        });
    </script> --}}
@endsection
