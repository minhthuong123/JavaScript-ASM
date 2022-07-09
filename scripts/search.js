"use strict";
let submitSeach = document.getElementById("btn-submit");
let inputQuery = document.getElementById("input-query");
let bitcoin = "bitcoin";

//* onclick sự kiện
submitSeach.addEventListener("click", () => {
  let query = inputQuery.value;
  if (!query) {
    alert("Please enter a keyword");
    return;
  }
  let apiNew = async () => {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${query.toUpperCase()}&apiKey=ebc7f7dfa79547ce9683b4d6563be620`
    );
    let { articles } = await response.json();

    return articles;
  };

  apiNew().then((articles) => {
    console.log(articles);
    //*điều kiện thỉ thị Page
    let lengthpageS = 5;
    let startS = 0;
    let endS = lengthpageS;
    let Pages = 1;
    let numberPageS = Math.ceil(articles.length / lengthpageS);
    //* hiển thị search
    function renderpetSearch(articles) {
      //* search filter
      let HTML = "";
      articles.map((value, index) => {
        if (index >= startS && index < endS) {
          HTML += `<ul id="ul">
                                        <li id="li">
                                        <img id="img" src="${value.urlToImage}"/>
                                        <h3 id="h3">${value.title}
                                        </h3>
                                        <p id="p">${value.description}</p>
                                        <button type="button" id="btn-button">view</button>   
                                        </li>
                                        </ul>`;
        }
        return HTML;
      });
      document.getElementById("news-container").innerHTML = HTML;
      document.getElementById("nav-page-number").style.display = "inline-block";
    }
    renderpetSearch(articles);

    //* number page
    function changePage(numberPageS) {
      let HTML = "";
      for (let i = 0; i < numberPageS; i++) {
        HTML += `<li class="page-item disabled">
                          <a  class="page-link"  >${i + 1}</a>
                          </li>`;
      }
      document.getElementById("pageA-AA").innerHTML = HTML;
      numberpage();
    }

    //* previous page
    let btnNext = document.getElementById("btn-next");
    btnNext.addEventListener("click", () => {
      Pages++;
      if (Pages >= numberPageS) {
        Pages = numberPageS;
      }
      startS = (Pages - 1) * lengthpageS;
      endS = Pages * lengthpageS;
      if (Pages == numberPageS) {
        btnNext.style.opacity = 0.2;
        btnPrev.style.opacity = 1;
      } else {
        if (Pages !== 1 && Pages !== numberPageS) {
          btnNext.style.opacity = 1;
          btnPrev.style.opacity = 1;
        } else {
          if (Pages == 1) {
            btnNext.style.opacity = 1;
            btnPrev.style.opacity = 0.2;
          }
        }
      }

      renderpetSearch(articles);
    });
    changePage(numberPageS);
    //* previous page
    let btnPrev = document.getElementById("btn-prev");
    btnPrev.addEventListener("click", () => {
      Pages--;
      if (Pages <= 1) {
        Pages = 1;
      }
      startS = (Pages - 1) * lengthpageS;
      endS = Pages * lengthpageS;

      //* hiệu ứng previous page
      if (Pages == numberPageS) {
        btnNext.style.opacity = 0.2;
        btnPrev.style.opacity = 1;
      } else {
        if (Pages !== 1 && Pages !== numberPageS) {
          btnNext.style.opacity = 1;
          btnPrev.style.opacity = 1;
        } else {
          if (Pages == 1) {
            btnNext.style.opacity = 1;
            btnPrev.style.opacity = 0.2;
          }
        }
      }
      renderpetSearch(articles);
    });
    //* onclick page
    function numberpage() {
      let pageBB = document.querySelectorAll(".pageA-AA li");
      for (let i = 0; i < pageBB.length; i++) {
        pageBB[i].addEventListener("click", () => {
          let index = i + 1;
          Pages = index;
          startS = (Pages - 1) * lengthpageS;
          endS = Pages * lengthpageS;
          if (Pages == numberPageS) {
            btnNext.style.opacity = 0.2;
            btnPrev.style.opacity = 1;
          } else {
            if (Pages !== 1 && Pages !== numberPageS) {
              btnNext.style.opacity = 1;
              btnPrev.style.opacity = 1;
            } else {
              if (Pages == 1) {
                btnNext.style.opacity = 1;
                btnPrev.style.opacity = 0.2;
              }
            }
          }
          renderpetSearch(articles);
        });
      }
    }
    numberpage();
  });
});
