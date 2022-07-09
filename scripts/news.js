"use strict";

//todo 6. Hiển thị các bài viết
//* check điều kiện url
let news;

function fetchCategory() {
  let category = JSON.parse(localStorage.getItem("settings"));
  category.map((value) => {
    if (value.newsCategory == "Technology") {
      news =
        "https://newsapi.org/v2/everything?" +
        "q=Apple&" +
        "from=2022-06-11&" +
        "sortBy=popularity&" +
        "apiKey=08da0799e37049689ed8f1e95126faff";
      return;
    } else {
      if (value.newsCategory == "world") {
        news =
          "https://newsapi.org/v2/top-headlines?" +
          "country=us&" +
          "apiKey=08da0799e37049689ed8f1e95126faff";
        return;
      } else {
        if (value.newsCategory == "BBC News") {
          news =
            "https://newsapi.org/v2/top-headlines?" +
            "sources=bbc-news&" +
            "apiKey=08da0799e37049689ed8f1e95126faff";
          return;
        }
      }
    }
  });
}
fetchCategory();

//* lấy API
let getNews = async () => {
  let response = await fetch(news);
  const { articles } = await response.json();
  return articles;
};
getNews().then((articles) => {
  //* điều kiện number page
  let newspage = JSON.parse(localStorage.getItem("settings"));
  let lengthpage = newspage[0].newsperpage;
  let start = 0;
  let end = lengthpage;
  let Pages = 1;
  function getArticles(articles) {
    let divNew = "";
    articles.map((article, index) => {
      if (index >= start && index < end) {
        divNew += `<ul id="ul">
                                        <li id="li">
                                        <img id="img" src="${article.urlToImage}" />
                                        <h3 id="h3">${article.title}
                                        </h3>
                                        <p id="p">${article.description}</p>
                                        <button type="button" id="btn-button">view</button>   
                                        </li>
                                        </ul>`;
      }
      return divNew;
    });
    document.getElementById("news-container").innerHTML = divNew;
  }

  getArticles(articles);
  let numberPage = Math.ceil(articles.length / lengthpage);

  //* number page
  function changePage() {
    let HTML = "";
    HTML = `<li class="page-item disabled active1" > 
                        <a  class="page-link"  >${1}</a>
                        </li>`;
    for (let i = 2; i <= numberPage; i++) {
      HTML += `<li class="page-item disabled"> 
                        <a  class="page-link"  >${i}</a>
                        </li>`;
    }
    document.getElementById("page-BB").innerHTML = HTML;
  }
  changePage();

  //* previous page
  let btnNext = document.getElementById("btn-next");
  btnNext.addEventListener("click", () => {
    Pages++;
    if (Pages >= numberPage) {
      Pages = numberPage;
    }
    start = (Pages - 1) * lengthpage;
    end = Pages * lengthpage;
    //* hiệu ứng page
    let pageBB = document.querySelectorAll(".page-BB li");
    for (let i = 0; i < pageBB.length; i++) {
      if (Pages == i + 1) {
        $(".page-BB li").removeClass("active1");
        pageBB[i].classList.add("active1");
      }
    }

     if (Pages == numberPage) {
       btnNext.style.opacity = 0.2;
       btnPrev.style.opacity = 1;
     } else {
       if (Pages !== 1 && Pages !== numberPage) {
         btnNext.style.opacity = 1;
         btnPrev.style.opacity = 1;
       } else {
         if (Pages == 1) {
           btnNext.style.opacity = 1;
           btnPrev.style.opacity = 0.2;
         }
       }
     }

    getArticles(articles);
  });

  //* previous page
  let btnPrev = document.getElementById("btn-prev");
  btnPrev.addEventListener("click", () => {
    Pages--;
    if (Pages <= 1) {
      Pages = 1;
    }
    start = (Pages - 1) * lengthpage;
    end = Pages * lengthpage;

    //* hiệu ứng page
   let pageBB = document.querySelectorAll(".page-BB li");
   for (let i = 0; i < pageBB.length; i++) {
     if (Pages == i + 1) {
       $(".page-BB li").removeClass("active1");
       pageBB[i].classList.add("active1");
     }
   }

    //* hiệu ứng  page
    if (Pages == numberPage) {
      btnNext.style.opacity = 0.2;
      btnPrev.style.opacity = 1;
    } else {
      if (Pages !== 1 && Pages !== numberPage) {
        btnNext.style.opacity = 1;
        btnPrev.style.opacity = 1;
      } else {
        if (Pages == 1) {
          btnNext.style.opacity = 1;
          btnPrev.style.opacity = 0.2;
        }
      }
    }
    getArticles(articles);
  });
  //* onclick page
  function numberpage() {
    let pageBB = document.querySelectorAll(".page-BB li");
    for (let i = 0; i < pageBB.length; i++) {
      pageBB[i].addEventListener("click", () => {
        let index = i + 1;
        console.log(index);
        Pages = index;
        $(".page-BB li").removeClass("active1");
        pageBB[i].classList.add("active1"); //* thêm CSS vào page
        start = (Pages - 1) * lengthpage;
        end = Pages * lengthpage;
         if (Pages == numberPage) {
           btnNext.style.opacity = 0.2;
           btnPrev.style.opacity = 1;
         } else {
           if (Pages !== 1 && Pages !== numberPage) {
             btnNext.style.opacity = 1;
             btnPrev.style.opacity = 1;
           } else {
             if (Pages == 1) {
               btnNext.style.opacity = 1;
               btnPrev.style.opacity = 0.2;
             }
           }
         }

        getArticles(articles);
      });
    }
  }
  numberpage();
});
