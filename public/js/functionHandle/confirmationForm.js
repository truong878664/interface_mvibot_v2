export default function confirmationForm({ message = 'Do you want to delete?',callback}) {
    const divElement = document.createElement('div')
    divElement.classList.add('fixed', 'top-0', 'z-10', 'left-0', 'right-0', 'bottom-0', 'bg-[rgba(0,0,0,0.2)]',
        'confirmation-form', 'flex', 'justify-center', 'items-center')
    divElement.innerHTML = `<div class="p-4 bg-[#fff] rounded-md flex flex-col justify-center text-2xl">
        <p>${message}</p>
        <div class="flex justify-evenly mt-4">
            <button class="bg-yellow-500 text-[#fff] px-3 py-2 rounded-md btn" id='cancel-confirmation-form-btn'>Cancel</button>
            <button class="bg-red-500 text-[#fff] px-3 py-2 rounded-md btn" id='submit-confirmation-form-btn'>Submit</button>
        </div>
    </div>`
    document.body.appendChild(divElement)
    const formSubmitAgain = document.querySelector('.confirmation-form')
    const submitFormAgainBtn = document.querySelector('#submit-confirmation-form-btn')
    const cancelFormAgainBtn = document.querySelector('#cancel-confirmation-form-btn')
    cancelFormAgainBtn.addEventListener('click', hiddenFormAgain)
    submitFormAgainBtn.addEventListener('click', () => {
        hiddenFormAgain()
        callback()
    })
    formSubmitAgain.addEventListener('click', hiddenFormAgain)
    function hiddenFormAgain() {
        formSubmitAgain.remove()
    }
}