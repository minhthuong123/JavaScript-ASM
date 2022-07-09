"use strict";
//todo 9. Thay đổi thiết lập
let submitSetting = document.getElementById("btn-submit");
let inputPpagesize = document.getElementById("input-page-size");
let inputcategory = document.getElementById("input-category");
submitSetting.addEventListener("click", () => {
    let newsperpage = inputPpagesize.value;
    let newsCategory = inputcategory.value;
  if ((!newsperpage)) {
    alert("Import news per page");
    return;
  }else{
      if ( newsperpage< 1){
        alert("Post count is greater than 0"); 
      }
  }
  let settings = []
  settings.push({
    newsperpage:newsperpage,
    newsCategory:newsCategory
  })
  localStorage.setItem('settings',  JSON.stringify(settings));
});
