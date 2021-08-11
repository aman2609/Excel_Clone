let allAlignmentOptions=document.querySelectorAll(".align-cell-content span");
let leftAlign=allAlignmentOptions[0];
let centerAlign=allAlignmentOptions[1];
let rightAlign=allAlignmentOptions[2];
leftAlign.addEventListener("click",function(){
    if(lastCell){
        lastCell.style.textAlign="left";
        let address=lastCell.getAttribute("data-address");
        dataObj[address].align="left";
    }
})
centerAlign.addEventListener("click",function(){
    if(lastCell){
        lastCell.style.textAlign="center";
        let address=lastCell.getAttribute("data-address");
        dataObj[address].align="center";
    }
})
rightAlign.addEventListener("click",function(){
    if(lastCell){
        lastCell.style.textAlign="right";
        let address=lastCell.getAttribute("data-address");
        dataObj[address].align="right";
    }
})



let allColorOptions=document.querySelectorAll(".cell-color-options span");
let bgColorPicker=allColorOptions[0];
let fontColorPicker=allColorOptions[1];
let body=document.querySelector("body");
bgColorPicker.addEventListener("click",function(){
    let colorPickerElement=document.createElement("input");
    colorPickerElement.type="color";
    body.append(colorPickerElement);
    colorPickerElement.click();
    colorPickerElement.addEventListener("input",function(e){
        if(lastCell){
            console.log(e.currentTarget.value)
            lastCell.style.backgroundColor=e.currentTarget.value;
            let address=lastCell.getAttribute("data-address");
            dataObj[address].bgColor=e.currentTarget.value;
        }
    })

})
fontColorPicker.addEventListener("click",function(){
    let colorPickerElement=document.createElement("input");
    colorPickerElement.type="color";
    body.append(colorPickerElement);
    colorPickerElement.click();
    colorPickerElement.addEventListener("input",function(e){
        if(lastCell){
            lastCell.style.color=e.currentTarget.value;
            let address=lastCell.getAttribute("data-address");
            dataObj[address].color=e.currentTarget.value;
        }
    })

})


let menuOptions=document.querySelectorAll(".menu-bar-section div");
let fileOptions=menuOptions[0];
let helpOptions=menuOptions[1];
fileOptions.addEventListener("click",function(e){
    let isOpen=fileOptions.getAttribute("data-open");
    if(isOpen=="false"){
        fileOptions.setAttribute("data-open","true");
        let dropDown=document.createElement("div");
        dropDown.innerHTML="<p>Save</p><p>Clear</p>";
        let allOptions = dropDown.querySelectorAll("p");

        allOptions[0].addEventListener("click", function () {
            localStorage.setItem("sheet", JSON.stringify(dataObj));
        });

        allOptions[1].addEventListener("click", function () {
            localStorage.setItem("sheet", "");
        });
        dropDown.classList.add("file-drop-down");
        fileOptions.append(dropDown);   
    }else{
        fileOptions.setAttribute("data-open","false");
        document.querySelector(".file-drop-down").remove();
    }
    
})


let boldItalicUnderline=document.querySelectorAll(".bold-italics-underline span");
let boldOption=boldItalicUnderline[0];
let italicOption=boldItalicUnderline[1];
let underlineOption=boldItalicUnderline[2];
boldOption.addEventListener("click",function(e){
    if(lastCell){
        let isBold=boldOption.getAttribute("data-bold");
        if(isBold=="false"){
            boldOption.setAttribute("data-bold","true");
            lastCell.style.fontWeight="bold";
            let address=lastCell.getAttribute("data-address");
            dataObj[address].fontWeight="bold";
        }else{
            boldOption.setAttribute("data-bold","false");
            lastCell.style.fontWeight="normal";
            let address=lastCell.getAttribute("data-address");
            dataObj[address].fontWeight="normal";
        }
    }
})
italicOption.addEventListener("click",function(e){
    if(lastCell){
        let isItalic=italicOption.getAttribute("data-italic");
        if(isItalic=="false"){
            italicOption.setAttribute("data-italic","true");
            lastCell.style.fontStyle="italic";
            let address=lastCell.getAttribute("data-address");
            dataObj[address].fontStyle="italic";
        }else{
            italicOption.setAttribute("data-italic","false");
            lastCell.style.fontStyle="normal";
            let address=lastCell.getAttribute("data-address");
            dataObj[address].fontStyle="normal";
    }
    }
})
underlineOption.addEventListener("click",function(e){
    if(lastCell){
        let isunderline=underlineOption.getAttribute("data-underline");
        if(isunderline=="false"){
            // console.log(lastCell);
            underlineOption.setAttribute("data-underline","true");
            lastCell.style.textDecoration="underline";
            let address=lastCell.getAttribute("data-address");
            dataObj[address].textDecoration="underline";
        }else{
            underlineOption.setAttribute("data-underline","false");
            lastCell.style.textDecoration="none";
            let address=lastCell.getAttribute("data-address");
            dataObj[address].textDecoration="none";
        }
    }
})


let fontTypeSize=document.querySelectorAll(".font-type-size select");
let fontFamilyOption=fontTypeSize[0];
let fontSizeOption=fontTypeSize[1];
// console.log(fontFamilyOption);
fontFamilyOption.addEventListener("change",function(e){
    if(lastCell){
        // console.log(e.currentTarget.value);
        lastCell.style.fontFamily=e.currentTarget.value;
        let address=lastCell.getAttribute("data-address");
        dataObj[address].fontFamily=e.currentTarget.value;
    }
})
fontSizeOption.addEventListener("change",function(e){
    if(lastCell){
        // console.log(e.currentTarget.value);
        lastCell.style.fontSize=e.currentTarget.value+"px";
        let address=lastCell.getAttribute("data-address");
        dataObj[address].fontSize=e.currentTarget.value+"px";
        // console.log("hi");
    }
})
