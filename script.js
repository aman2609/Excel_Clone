let rowNumberSection=document.querySelector(".row-number-section")
let coltagsection=document.querySelector(".column-tag-section");
let cellSection=document.querySelector(".cell-section");
let formulaBarSelectedCellDiv=document.querySelector(".selected-cell-div");
let dataObj={}
let lastCell;








cellSection.addEventListener("scroll",function(e){

    rowNumberSection.style.transform=`translateY(-${e.currentTarget.scrollTop}px)`;

    coltagsection.style.transform=`translateX(-${e.currentTarget.scrollLeft}px)`;

})

for(let i=1;i<=100;i++){
    let div=document.createElement("div");
    div.innerText=i;
    div.classList.add("row-number")
    rowNumberSection.append(div);
}


for(let i=0;i<26;i++){
    let a=String.fromCharCode(65+i);
    let div=document.createElement("div");
    div.innerText=a;
    div.classList.add("column-tag")
    coltagsection.append(div);
}



for(let i=1;i<=100;i++){
    let rowdiv=document.createElement("div");
    rowdiv.classList.add("row");
    for(let j=0;j<26;j++){
        let reqAlphabet=String.fromCharCode(65+j);
        let cellAddress=reqAlphabet+i;
        let cellDiv=document.createElement("div");
        cellDiv.setAttribute("contentEditable",true);
         dataObj[cellAddress]= {
            value: undefined,
            formula: undefined,
            upstream: [],
            downstream: [],
            align: "left",
            color:"black",
            bgColor:"white",
            fontWeight:"normal",
            textDecoration:"none",
            fontStyle:"normal",
            fontFamily:"Calibri",
            fontSize:15+"px",
        };











        cellDiv.addEventListener("input", function(e){
            
            let currentCellAddress=cellDiv.getAttribute("data-address");
            let currentCellObj=dataObj[currentCellAddress];
            // value
            currentCellObj.value=cellDiv.innerText;
            // formula
            currentCellObj.formula=undefined;
            // remove from downstream
            let currentCellUpstream=currentCellObj.upstream;
            for(let i=0;i<currentCellUpstream;i++){
            removeFromDownstream(currentCellAddress,currentCellUpstream[i]);
            }
            currentCellObj.upstream=[];

            let currDownstream=currentCellObj.downstream;
            for(let i=0;i<currDownstream.length;i++){
                updatedownstream(currDownstream[i]);
            }
            dataObj[currentCellAddress]=currentCellObj;
            // console.log(dataObj);
        })
        cellDiv.addEventListener("click",function(e){
            // console.log(1);
            let currentCellAddress=cellDiv.getAttribute("data-address");
            if(dataObj[currentCellAddress].formula!=undefined){
                let formulaInputSection=document.querySelector(".formula-input-section");
                formulaInputSection.value=dataObj[currentCellAddress].formula;
                // console.log(formulaInputSection)
                // console.log(2);
            
            }else{
                let formulaInputSection=document.querySelector(".formula-input-section");
                formulaInputSection.value="";
                
            }
            let optionFamily=document.getElementById("family").options;
            // console.log(dataObj[currentCellAddress].fontFamily+1)
            if(dataObj[currentCellAddress].fontFamily=="Calibri"){
                optionFamily[0].selected=true;
            }else{
                for(let i=1;i<optionFamily.length;i++){

                    if(optionFamily[i].text==dataObj[currentCellAddress].fontFamily){
                        optionFamily[i].selected=true;
                        break;
                    }
                }
            }
            let optionSize=document.getElementById("size").options;
            // console.log(dataObj[currentCellAddress].fontSize)
            if(dataObj[currentCellAddress].fontSize==15){
                optionSize[0].selected=true;
            }else{
                for(let i=1;i<optionSize.length;i++){

                    if(optionSize[i].text+"px"==dataObj[currentCellAddress].fontSize){
                        optionSize[i].selected=true;
                        break;
                    }
                }
            }
            // console.log(3);
        })




        









        cellDiv.classList.add("cell");
        cellDiv.setAttribute("data-address",cellAddress);
        cellDiv.addEventListener("click",function(e){
            // console.log(lastCell)
            if(lastCell!=undefined){
                // console.log(1);
                lastCell.classList.remove("cell-selected");
            }
            // console.log(2);
            e.currentTarget.classList.add("cell-selected");
            lastCell=e.currentTarget;
            let currentCellAddress=e.currentTarget.getAttribute("data-address");
            formulaBarSelectedCellDiv.innerText=currentCellAddress;
        });
        rowdiv.append(cellDiv);
    }
    cellSection.append(rowdiv);
}

if (localStorage.getItem("sheet")) {
    // console.log(1);
    dataObj = JSON.parse(localStorage.getItem("sheet"));
  
    for (let x in dataObj) {
        // console.log(x);
        // console.log(dataObj[x].backgroundColor)
        let cell = document.querySelector(`[data-address='${x}']`);
        if (dataObj[x].value) cell.innerText = dataObj[x].value;
        cell.style.textAlign=dataObj[x].align;
        cell.style.color=dataObj[x].color;
        cell.style.backgroundColor=dataObj[x].bgColor;
        cell.style.fontWeight=dataObj[x].fontWeight;
        cell.style.fontStyle=dataObj[x].fontStyle;
        cell.style.textDecoration=dataObj[x].textDecoration;
        cell.style.fontFamily=dataObj[x].fontFamily;
        cell.style.fontSize=dataObj[x].fontSize;
        
        // console.log(cell);//div
        //   console.log(x);//cell address
        //   console.log(dataObj[x]);//dataObj
        // dataObj[x]
    }
  }
// test case
// dataObj["A1"].value = 20;
// dataObj["A1"].downstream=["B1"];
// dataObj["B1"].formula="2 * A1";
// dataObj["B1"].upstream=["A1"];
// dataObj["B1"].value=40;

// let a1cell=document.querySelector("[data-address='A1']");
// let b1cell=document.querySelector("[data-address='B1']");
// a1cell.innerText=20;
// b1cell.innerText=40;



let formulaInputSection=document.querySelector(".formula-input-section")
formulaInputSection.addEventListener("keydown",function(e){
    if(e.key=="Enter"){

        // console.log("computing formula");
        let typedFormula=e.currentTarget.value;
        // console.log(typedFormula);
        if(!lastCell)return;
        let selectedCellAddress=lastCell.getAttribute("data-address");
        let currentCellObj=dataObj[selectedCellAddress];
        currentCellObj.formula= typedFormula;
        let selectedUpstream=currentCellObj.upstream;
        for(let i=0;i<selectedUpstream.length;i++){
            removeFromDownstream(selectedCellAddress,selectedUpstream[i]);
        }
        currentCellObj.upstream=[];

        let formulaArr=typedFormula.split(" ");
        let cellsInFormula=[];
        for(let i=0;i<formulaArr.length;i++){
            if(formulaArr[i]!="+"&&formulaArr[i]!="-"&&formulaArr[i]!="*"&&formulaArr[i]!="/"&&formulaArr[i]!="%"&&formulaArr[i]!="^"&&isNaN(formulaArr[i])){
                cellsInFormula.push(formulaArr[i]);
                addToDownStream(selectedCellAddress,formulaArr[i]);
            }
        }
        currentCellObj.upstream=cellsInFormula;

        let valueObj={};
        for(let i=0;i<cellsInFormula.length;i++){
            valueObj[cellsInFormula[i]]=dataObj[cellsInFormula[i]].value;
        }
        for(let key in valueObj){
            typedFormula=typedFormula.replace(key,valueObj[key]);
        }
        currentCellObj.value=eval(typedFormula);
        lastCell.innerText=eval(typedFormula);
        let downstream=currentCellObj.downstream;
        for(let i=0;i<downstream.length;i++){
            updatedownstream(downstream[i]);
        }

        dataObj[selectedCellAddress]=currentCellObj;

    }
})




function addToDownStream(childCell,parentCell){
    dataObj[parentCell].downstream.push(childCell);
}





function removeFromDownstream(childCell,parentCell){
    let ds=[];
    for(let j=0;j<dataObj[parentCell].downstream.length;j++){
        if(dataObj[parentCell].downstream[j]!=childCell){
            ds.push(dataObj[parentCell].downstream[j]);
        }
    }
    dataObj[parentCell].downstream=ds;
}






function updatedownstream(childCell){
    let formula=dataObj[childCell].formula;
    let currentCellUpstream=dataObj[childCell].upstream;
    let tempObj={};
    for(let j=0;j<currentCellUpstream.length;j++){
        tempObj[currentCellUpstream[j]]=dataObj[currentCellUpstream[j]].value;
    }
    for(let key in tempObj){
        formula=formula.replace(key,tempObj[key]);
    }
    dataObj[childCell].value=eval(formula);
    let cellUI=document.querySelector(`[data-address='${childCell}']`);
    cellUI.innerText=eval(formula);
    let downstream=dataObj[childCell].downstream;
    for(let i=0;i<downstream.length;i++){
        updatedownstream(downstream[i]);
    }
}