const fileinput=document.querySelector(".file-input");
const chooseimgbtn=document.querySelector(".choose-img")
const previewimg=document.querySelector(".preview-img img")
const filteroptions=document.querySelectorAll(".filter button")
const filtername=document.querySelector(".filter-info .name");
const filterslider=document.querySelector(".slider input")
const filtervalue=document.querySelector(".filter-info .value")
const rotateoptions=document.querySelectorAll(".rotate button")
const resetbtn=document.querySelector(".reset-filter");
const savebtn=document.querySelector(".save-img")

let brightness=100;
let saturation=100;
let inversion =0;
let grayscale =0;
let rotate=0;
let fliphorizontal=1;
let flipvertical=1;

const applyfilters=()=>{
    previewimg.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal},${flipvertical})`; 
    previewimg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
}


filteroptions.forEach(option=>{
          option.addEventListener("click",()=>{
              document.querySelector(".filter .active").classList.remove("active");
              option.classList.add("active");
              filtername.innerHTML=option.innerText;

              if(option.id==="brightness"){
                  filterslider.max="200";
                  filterslider.value=brightness;
                  filtervalue.innerText=`${brightness}%`;
              }
              else if(option.id==="saturation"){
                  filterslider.max="200";
                  filterslider.value=saturation;
                  filtervalue.innerText=`${saturation}%`;
              }
              else if(option.id==="inversion"){
                  filterslider.max="100";
                filterslider.value=inversion;
                filtervalue.innerText=`${inversion}%`;
            }
            else{
                filterslider.max="100";
                filterslider.value=grayscale;
                filtervalue.innerText=`${grayscale}%`;
            }

          })
})

// => Loads the image to display it
const loadimage=()=>{
  let file=fileinput.files[0];
  if(!file){
     return ;
  }
     console.log(file);
    previewimg.src=URL.createObjectURL(file);
    previewimg.addEventListener("load",()=>{
        resetbtn.click();
        document.querySelector(".container").classList.remove("disable");
    })
}

// => loads the image when ever there is a change in file input
// => Function will be called when we click the file input button
fileinput.addEventListener("change",loadimage);






// =>updating slider value

filterslider.addEventListener("input",()=>{
  //  console.log(filterslider.value);
      filtervalue.innerText=`${filterslider.value}%`;
      const selectedfilter =document.querySelector(".filter .active");
      if(selectedfilter.id=="brightness"){
          brightness=filterslider.value;
      }
     else if(selectedfilter.id=="saturation"){
          saturation=filterslider.value;
     }
    else if(selectedfilter.id=="inversion"){
          inversion=filterslider.value;
    }
    else if(selectedfilter.id=="grayscale"){
           grayscale=filterslider.value;
    }

    applyfilters();
     

})









rotateoptions.forEach(option =>{
         option.addEventListener("click",()=>{
             if(option.id==="left"){
                     rotate-=90;
             }
             else if(option.id==="right"){
                 rotate+=90;
             }
             else if(option.id==="horizontal"){
                 fliphorizontal = fliphorizontal === 1 ? -1 : 1;
             }
             else if(option.id==="vertical"){
                 flipvertical = flipvertical === 1 ? -1 : 1;
            }
              
             applyfilters();
         })
})


const resetfilter = () =>{
     brightness=100;
     saturation=100;
     inversion =0;
     grayscale =0;
     rotate=0;
     fliphorizontal=1;
     flipvertical=1;
     filteroptions[0].click();
     applyfilters();
}

const saveimg = () =>{
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    canvas.width=previewimg.naturalWidth;
    canvas.height=previewimg.naturalHeight ;

   // ctx.drawImage(previewimg,0,0,canvas.width,canvas.height);


   ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
   ctx.translate(canvas.width / 2, canvas.height / 2);
   if(rotate !== 0) {
       ctx.rotate(rotate * Math.PI / 180);
   }
   ctx.scale(fliphorizontal, flipvertical);
   ctx.drawImage(previewimg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
   
   const link = document.createElement("a");
   link.download = "image.jpg";
   link.href = canvas.toDataURL();
   link.click();

}


//  => upon clicking the choose image button takes the 
chooseimgbtn.addEventListener("click",()=>{
        fileinput.click();
})

resetbtn.addEventListener("click",resetfilter)
savebtn.addEventListener("click",saveimg)
