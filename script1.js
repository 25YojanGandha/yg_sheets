let dataObject = {}
let rowContainer = document.querySelector(".row-container");
let columnContainer = document.querySelector(".column-container");
let inputcontainer = document.querySelector(".input-container");
let selectedCell = document.querySelector(".selected-cell-display");
let lastSelected = undefined;

// FORMULA INPUT
let formulaDiv = document.querySelector(".formula");
formulaDiv.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
    
        if(!lastSelected)return;
        
        let newFormula = e.currentTarget.value;
        let olderUpstream = dataObject[lastSelected].upstream;
        
        console.log(newFormula);

        for(let i=0; i<olderUpstream.length; i++){
            upstreamUpdate(lastSelected, olderUpstream[i]);
        }

        dataObject[lastSelected].upstream = [];
        dataObject[lastSelected].formula = newFormula;

        let upstreamCell = [];
        let formulaSplitArray = newFormula.split(" ");

        console.log(formulaSplitArray);

        // ISH PORTION OF CODE ME ERROR AARHI ye INFINITE TIMES CHAL RHA

        for(let i=0; i<formulaSplitArray.length; i++){
            if(formulaSplitArray[i] !="+" &&
                formulaSplitArray[i] !="-" && 
                formulaSplitArray[i] !="/" && 
                formulaSplitArray[i] !="*" && 
                isNaN(formulaSplitArray[i])
             ){
                console.log(formulaSplitArray[i]+"---::"+i+"----------------------------------------------");
                upstreamCell.push(formulaSplitArray[i]);
                // console.log(upstreamCell);
            }
        }
        
        console.log(upstreamCell);

        for(let i=0; i<upstreamCell.length; i++){
            addToDownStream(upstreamCell[i], lastSelected);
        }
        dataObject[lastSelected].upstream = upstreamCell;

        for(let i=0; i<dataObject[lastSelected].upstream.length; i++){
            newFormula = newFormula.replaceAll(dataObject[lastSelected].upstream[i], dataObject[dataObject[lastSelected].upstream[i]].value);
        }

        let newVal = eval(newFormula);
        console.log(newVal);
        dataObject[lastSelected].value = newVal;
        document.querySelector(`#${lastSelected}`).innerText = newVal;

        for(let i=0; i<dataObject[lastSelected].downstream.length; i++){
            downstreamUpdate(dataObject[lastSelected].downstream[i]);
        }
    
    formulaDiv.value = "";
    }
});

// COLUMN ADDITION
for(let i=0; i<26; i++){
    let colDiv = document.createElement("div");
    let alpha = String.fromCharCode(65+i);

    colDiv.innerText = alpha; 
    colDiv.classList.add("col-name");
    columnContainer.append(colDiv);
}

// ROW ADDITION
for(let i=1; i<=100; i++){
    let rowDiv = document.createElement("div");
    
    rowDiv.innerText = i; 
    rowDiv.classList.add("row-name");
    rowContainer.append(rowDiv);
}

// CELL CREATION
for(let i=1; i<=100; i++){
    let row = document.createElement("div");
    row.classList.add("row");

    for(let j=1; j<=26; j++){
        let cellDiv = document.createElement("div");
        let cellAddress = String.fromCharCode(65+j-1)+""+i;
        
        cellDiv.setAttribute("class",'cell');
        cellDiv.setAttribute("id",cellAddress);
        cellDiv.setAttribute("contenteditable","true");

        // CELL OBJECT CREATION
        let cellObj={
            value: undefined,
            formula: undefined,
            downstream: [],
            upstream: [],
            alignment: "left",
            bgcolor: "white",
            textcolor: "black",
            bold: "",
            italic: "",
            underline: "",
            fontstyle: "",
            fontsize: "16"
        }
        dataObject[cellAddress] = cellObj;

        row.append(cellDiv);
    }
    inputcontainer.append(row);
}

// SLIDING X & Y
inputcontainer.addEventListener("scroll", function(e){
    rowContainer.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
    columnContainer.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
})

// ALL CELL MODIFICATION
let allCells = document.querySelectorAll(".cell");

for(let i=0; i<allCells.length; i++){

// let a1 = document.querySelector("#A1");
// let a2 = document.querySelector("#A2");
// a1.innerText=20;
// dataObject.A1.downstream = ["A2"];
// dataObject.A1.value = 20;

// a2.innerText=40;
// dataObject.A2.value = 40;
// dataObject.A2.formula = "2 * A1";
// dataObject.A2.upstream = ["A1"];

    // CELL SELECTION
    allCells[i].addEventListener("click", function(e){
        let cad = e.currentTarget.getAttribute("id");
        selectedCell.innerText = cad;
   
        // console.log(cad);
        // console.log(dataObject[cad]);

        if(lastSelected!=undefined){
            let div = document.querySelector(`.cell#${lastSelected}`);
            div.classList.remove("selected-cell");
            // console.log(lastSelected+".......");
        }

        e.currentTarget.classList.add("selected-cell");
        lastSelected = cad;
    });

    // CELL VALUE UPDATE
    allCells[i].addEventListener("input", function(e){
        let cellID = e.currentTarget.getAttribute("id");
        dataObject[cellID].formula = "";
        dataObject[cellID].value = e.currentTarget.innerText;

        // UPSTREAM UPDATE
        for(let i=0; i<dataObject[cellID].upstream.length; i++){
            upstreamUpdate(dataObject[cellID].upstream[i], cellID);
        }

        // DOWNSTREAM UPDATE
        for(let i=0; i<dataObject[cellID].downstream.length; i++){
            downstreamUpdate(dataObject[cellID].downstream[i]);
        }
    });    
}

function upstreamUpdate(parentID, childID){
    let idx = dataObject[parentID].downstream.indexOf(childID);
    dataObject[parentID].downstream.splice(idx,1);
}

function downstreamUpdate(childID){
    let expression = dataObject[childID].formula;

    for(let i=0; i<dataObject[childID].upstream.length; i++){
        expression = expression.replaceAll(dataObject[childID].upstream[i], dataObject[dataObject[childID].upstream[i]].value);
    }

    let newVal = eval(expression);
    dataObject[childID].value = newVal;
    document.querySelector(`#${childID}`).innerText = newVal;

    for(let i=0; i<dataObject[childID].downstream.length; i++){
        downstreamUpdate(dataObject[childID].downstream[i]);
    }
}

function addToDownStream(parentID, childID){
    dataObject[parentID].downstream.push(childID);
}

// LOCAL STORAGE
if(localStorage.getItem("Sheet")){

    dataObject = JSON.parse(localStorage.getItem("Sheet"));
    for(let keys in dataObject){
        document.querySelector(`#${keys}`).style.fontFamily = dataObject[keys].fontstyle;
        document.querySelector(`#${keys}`).style.fontSize = dataObject[keys].fontsize;
        document.querySelector(`#${keys}`).style.backgroundColor = dataObject[keys].bgcolor;
        document.querySelector(`#${keys}`).style.color = dataObject[keys].textcolor;
        document.querySelector(`#${keys}`).style.textAlign = dataObject[keys].alignment;
        document.querySelector(`#${keys}`).style.fontWeight = dataObject[keys].bold;
        document.querySelector(`#${keys}`).style.fontStyle = dataObject[keys].italic;
        document.querySelector(`#${keys}`).style.textDecoration = dataObject[keys].underline;
       
        if(dataObject[keys].value)
        document.querySelector(`#${keys}`).innerText = dataObject[keys].value;
    }
}

// SAVE OPTION
let save = document.querySelector(".save");
save.addEventListener("click", function(){
    localStorage.setItem("Sheet",JSON.stringify(dataObject));
    alert("Sheet Saved ");
})

// CLEAR OPTION
let clear = document.querySelector(".clear");
clear.addEventListener("click", function(){
    if(localStorage.getItem("Sheet")){
        localStorage.setItem("Sheet", "");
        alert("Sheet Cleared");
    }
})