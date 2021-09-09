let selectTag = document.querySelectorAll("select");
let fontstyle = selectTag[0];
let fontsize = selectTag[1];
let bold = document.querySelector(".style-bold");
let italic = document.querySelector(".style-italic");
let underline = document.querySelector(".style-underline");
let alignleft = document.querySelector(".align-left");
let aligncenter = document.querySelector(".align-center");
let alignright = document.querySelector(".align-right");
let colorbg = document.querySelector(".color-bg");
let colortext = document.querySelector(".color-text");
let body = document.querySelector("body");

    // alignment: "left",
    //             bgcolor: "white",
    //             textcolor: "black",
    //             bold: "",
    //             italic: "",
    //             underline: "",
    //             fontstyle: "",
    //             fontsize: "16"

fontsize.addEventListener("click", function (e) {
    if (lastSelected) {
        let size = e.currentTarget.value;
        dataObject[lastSelected].fontsize = size;
        document.querySelector(`#${lastSelected}`).style.fontSize = `${size}px`;
    }
})

fontstyle.addEventListener("click", function (e) {
    if (lastSelected) {
        let style = e.currentTarget.value;
        dataObject[lastSelected].fontstyle = style;
        document.querySelector(`#${lastSelected}`).style.fontFamily = style;
    }
})

colorbg.addEventListener("click", function (e) {
    let input = document.querySelector("input[type='color'].bginput");

    if (input == undefined) {
        input = document.createElement("input");
        input.type = "color";
        input.classList.add("bginput");
        body.append(input);
    }

    input.click();

    input.addEventListener("input", function (e) {
        // console.log(e.currentTarget.value);
        if (lastSelected) {
            let color = e.currentTarget.value;
            dataObject[lastSelected].bgcolor = color;
            document.querySelector(`#${lastSelected}`).style.backgroundColor = color;
        }
    })

});

colortext.addEventListener("click", function (e) {
    let input = document.querySelector("input[type='color'].textcolor");

    if (input == undefined) {
        input = document.createElement("input");
        input.type = "color";
        input.classList.add("textcolor");
        body.append(input);
    }

    input.click();

    input.addEventListener("input", function (e) {
        // console.log(e.currentTarget.value);
        if (lastSelected) {
            let textcolor = e.currentTarget.value;
            dataObject[lastSelected].textcolor = textcolor;
            document.querySelector(`#${lastSelected}`).style.color = textcolor;
        }
    })

});

bold.addEventListener("click", function(){
    if(lastSelected && dataObject[lastSelected].bold == ""){
        document.querySelector(`#${lastSelected}`).style.fontWeight = "bold";
        dataObject[lastSelected].bold = "bold";

    }else if(lastSelected && dataObject[lastSelected].bold == "bold"){
        document.querySelector(`#${lastSelected}`).style.fontWeight = "";
        dataObject[lastSelected].bold="";
    }
})

italic.addEventListener("click", function(){
    if(lastSelected && dataObject[lastSelected].italic== ""){
        document.querySelector(`#${lastSelected}`).style.fontStyle = "italic";
        dataObject[lastSelected].italic = "italic";

    }else if(lastSelected && dataObject[lastSelected].italic == "italic"){
        document.querySelector(`#${lastSelected}`).style.fontStyle = "";
        dataObject[lastSelected].italic="";
    }
})

underline.addEventListener("click", function(){
    if(lastSelected && dataObject[lastSelected].underline == ""){
        document.querySelector(`#${lastSelected}`).style.textDecoration = "underline";
        dataObject[lastSelected].underline = "underline";

    }else if(lastSelected && dataObject[lastSelected].underline == "underline"){
        document.querySelector(`#${lastSelected}`).style.textDecoration = "";
        dataObject[lastSelected].underline="";
    }
})

alignleft.addEventListener("click", function(){
    if(lastSelected){
        document.querySelector(`#${lastSelected}`).style.textAlign = "left";
        dataObject[lastSelected].alignment = "left";
    }
})

alignright.addEventListener("click", function(){
    if(lastSelected){
        document.querySelector(`#${lastSelected}`).style.textAlign = "right";
        dataObject[lastSelected].alignment = "right";
    }
})

aligncenter.addEventListener("click", function(){
    if(lastSelected){
        document.querySelector(`#${lastSelected}`).style.textAlign = "center";
        dataObject[lastSelected].alignment = "center";
    }
})
