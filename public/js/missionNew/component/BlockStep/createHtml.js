const buttonAddStep = `
    <button data-action-block-step="add"
        class="btn w-[25px] h-[20px] relative flex justify-center text-[16px] rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center [&.active]:bg-sky-800 [&.active]:text-white">
            <i class="fa-solid fa-plus"></i>
    </button>
`;
const buttonMore = `
    <div class="absolute top-0 right-0 hover:z-50">
        <div class="group/more">
            <span class="h-[20px] w-[20px] mr-3 text-3xl btn text-stone-500 hover:text-stone-900 "><i class="fa-solid fa-ellipsis"></i></span>
            <div class="absolute top-[20px] right-2 h-[50px] text-2xl hidden group-hover/more:block">
                <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden">
                    <li class="px-6 py-2 hover:bg-stone-100 text-xl">
                        <button data-action-block-step="delete" class="btn flex">
                        <span class="mr-2 text-red-500">
                            <i class="fa-solid fa-trash-can"></i>
                        </span>
                        <span>Delete</span>
                        </button>
                        </li>
                    <li class="px-6 py-2 hover:bg-stone-100 text-xl">
                        <button data-action-block-step="hidden" class="btn flex group/hidden" data-status="show">
                            <span class="flex group-data-[status='show']/hidden:hidden">
                                <span class="mr-2 text-green-500">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <span>Show</span>
                            </span>
                            <span class="hidden group-data-[status='show']/hidden:flex">
                                <span class="mr-2 text-green-500">
                                    <i class="fa-solid fa-eye-low-vision"></i>
                                </span>
                                <span>Hidden</span>
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
`;
const createHtml = {
    htmlBlock: {
        normal: `
        <div data-block-wrapper="normal" data-show-data="" class="group/wrapper flex w-full shadow-block bg-white p-4 rounded-lg my-4 relative pt-[20px]" data-address="{{address}}" data-address-index="{{address-index}}">
            <span class="text-red-400 mr-3 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-bullseye"></i>
            </span>
            <div class="flex-1 flex flex-wrap items-start group-data-[show-data='hidden']/wrapper:hidden" data-data-block="normal">
                {{data}}
                ${buttonAddStep}
            </div>
            ${buttonMore}
        </div>
        `,
        ifelse: `
        <div data-block-wrapper="ifelse" data-show-data="" class="group/wrapper flex w-full shadow-block bg-white p-4 rounded-lg my-4 relative pt-[20px]" data-address="{{address}}" data-address-index="{{address-index}}">
        <span class="text-green-400 mr-3 rotate-90 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-code-fork"></i>
        </span>
        <div class="flex-1 text-[16px] group-data-[show-data='hidden']/wrapper:hidden">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3 text-red-600">If</span>
                <div class="flex-1 flex flex-wrap items-start" data-data-block="condition">
                    {{condition}}
                    ${buttonAddStep}
                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3 text-red-700">Then</span>
                <div class="flex-1 flex flex-wrap items-start" data-data-block="if_">
                   {{if_}}
                    ${buttonAddStep}
                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3 text-red-700">Else</span>
                <div class="flex-1 flex flex-wrap items-start" data-data-block="else_">
                    {{else_}}
                    ${buttonAddStep}
                </div>
            </div>
        </div>
        ${buttonMore}
    </div>
        
        `,
        trycatch: `
        <div data-block-wrapper="trycatch" data-show-data="" class="group/wrapper flex w-full shadow-block bg-white p-4 rounded-lg my-4 relative pt-[20px]" data-address="{{address}}" data-address-index="{{address-index}}">
            <span class="text-yellow-500 mr-3 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </span>
            <div class="flex-1 text-[16px] group-data-[show-data='hidden']/wrapper:hidden">
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">Try</span>
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="try_">
                        {{try_}}
                        ${buttonAddStep}
                    </div>
                </div>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">Catch</span>
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="catch_">
                        {{catch_}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
            ${buttonMore}
        </div>
        `,
        while: `
        <div data-block-wrapper="while" data-show-data="" class="group/wrapper flex w-full shadow-block bg-white p-4 rounded-lg my-4 relative pt-[20px]" data-address="{{address}}" data-address-index="{{address-index}}">
            <span class="text-sky-400 mr-3 rotate-90 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-arrows-spin"></i>
            </span>
            <div class="flex-1 text-[16px] group-data-[show-data='hidden']/wrapper:hidden">
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">While</span>
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="condition">
                        {{condition}}
                        ${buttonAddStep}
                    </div>
                </div>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">Do</span>
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="do_">
                        {{do_}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
            ${buttonMore}
        </div>
        `,
        logicAnd: `
        <div data-block-wrapper="logic_and" data-show-data="" class="group/wrapper inline-flex shadow-block bg-white p-4 rounded-lg my-4 mr-4 relative min-w-[100px] min-h-[50px]" data-address="{{address}}" data-address-index="{{address-index}}">
            <span class="text-pink-500 mr-3 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-link"></i>    
            </span>
            <div class="flex-1 text-[16px] flex group-data-[show-data='hidden']/wrapper:hidden">
                <div class="bg-stone-100 p-4  rounded-lg flex mb-3 items-start">
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="logicA">
                        {{logicA}}
                        ${buttonAddStep}
                    </div>
                </div>
                <span class="px-4 font-bold text-red-700">AND</span>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3 items-start">
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="logicB">
                        {{logicB}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
            ${buttonMore}
        </div>
        `,
        logicOr: `
        <div data-block-wrapper="logic_or" data-show-data="" class="group/wrapper inline-flex shadow-block bg-white p-4 rounded-lg my-4 mr-4 relative min-w-[100px] min-h-[50px]" data-address="{{address}}" data-address-index="{{address-index}}">
            <span class="text-blue-500 mr-3 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-grip-lines-vertical"></i>
            </span>
            
            <div class="flex-1 text-[16px] flex group-data-[show-data='hidden']/wrapper:hidden">
                <div class="bg-stone-100 p-4  rounded-lg flex mb-3 items-start">
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="logicA">
                        {{logicA}}
                        ${buttonAddStep}
                    </div>
                </div>
                <span class="px-4 font-bold text-red-700">OR</span>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3 items-start">
                    <div class="flex-1 flex flex-wrap items-start" data-data-block="logicB">
                        {{logicB}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
            ${buttonMore}
        </div>
        `,
    },
    normal({ normal, address }) {
        return this.htmlBlock.normal
            .replace("{{data}}", normal.join(""))
            .replace("{{address}}", address)
            .replace("{{address-index}}", address);
    },
    ifelse({ condition, if_, else_, address }) {
        return this.htmlBlock.ifelse
            .replace("{{condition}}", condition.join(""))
            .replace("{{if_}}", if_.join(""))
            .replace("{{else_}}", else_.join(""))
            .replace("{{address}}", address)
            .replace("{{address-index}}", address);
    },
    trycatch({ try_, catch_, address }) {
        return this.htmlBlock.trycatch
            .replace("{{try_}}", try_.join(""))
            .replace("{{catch_}}", catch_.join(""))
            .replace("{{address}}", address)
            .replace("{{address-index}}", address);
    },
    while({ condition, do_, address }) {
        return this.htmlBlock.while
            .replace("{{condition}}", condition.join(""))
            .replace("{{do_}}", do_.join(""))
            .replace("{{address}}", address)
            .replace("{{address-index}}", address);
    },

    logicAnd({ logicA, logicB, address }) {
        return this.htmlBlock.logicAnd
            .replace("{{logicA}}", logicA.join(""))
            .replace("{{logicB}}", logicB.join(""))
            .replace("{{address}}", address)
            .replace("{{address-index}}", address);
    },
    logicOr({ logicA, logicB, address }) {
        return this.htmlBlock.logicOr
            .replace("{{logicA}}", logicA.join(""))
            .replace("{{logicB}}", logicB.join(""))
            .replace("{{address}}", address)
            .replace("{{address-index}}", address);
    },
};

export default createHtml;
