import { postLike, getLikes } from '../likes/apiInvolvement';

const display = (obj) => {
  const cardsContainer = document.querySelector('.cards-container');
  obj.drinks.forEach((drink) => {
    const divCol = document.createElement('div');
    cardsContainer.appendChild(divCol);
    divCol.className = 'col';
    divCol.innerHTML = `<div class="card h-100" id ="${drink.idDrink}">
                          <img src="${drink.strDrinkThumb}" class="card-img-top p-3" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${drink.strDrink}</h5>
                            <div class="card-text container">
                              <button type="button" class="btn comments btn-outline-dark float-start">Comments</button>
                                <div class="heart-container container" id="item-${drink.idDrink}">                         
                                <div class="heart-like-button float-end" ></div>  
                                </div>
                            </div>   
                          
                          </div>
                      </div>`;
  });

  const hearts = document.querySelectorAll('.heart-like-button');
  const heartsContainer = document.querySelectorAll(".heart-container");

  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      if (!(heart.classList.contains('liked'))) {
        heart.classList.add('liked');
        postLike(heart);
      } else {
        heart.classList.remove('liked');
      }
    });

  });

  heartsContainer.forEach((heartContainer)=>{
    const likesDiv = document.createElement("div");
    likesDiv.className = "likesDiv float-end";
   console.log(heartContainer.id)

  })
  
  getLikes()
 
};

export { display as default };