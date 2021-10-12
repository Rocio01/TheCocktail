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
                                <div class="heart-container container ">                         
                                <div class="heart-like-button float-end "></div>  
                                </div>
                            </div>   
                          
                          </div>
                      </div>`;
  });

  const hearts = document.querySelectorAll('.heart-like-button');
  const cards = document.querySelectorAll('.card');
  const modal = document.querySelector('.modal-m');
  const content = document.querySelector('.m-content');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      modal.classList.remove('d-none');
      const cardNodes = card.childNodes;
      const imgSrc = cardNodes[1].getAttribute('src');
      const title = cardNodes[3].childNodes[1].innerHTML;
      const div = document.createElement('div');
      div.innerHTML = `<div class="card h-100">
      <img src="${imgSrc}" class="card-img-top p-3" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">
        ${title}
        </h5>
        <div class="comments d-flex flex-column align-items-center">
        <h4>
          Comments(2)
        </h4>
        <span>03/11/2021 Alex: I would love to buy it</span>
        <span>03/11/2021 Mia: I would love to buy it</span>
        </div>
        </div>   
      
      </div>
  </div>`;
      console.log(cardNodes[3].childNodes[1].innerHTML);
      console.log(card);
      content.appendChild(div);
    });
  });

  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('liked')) {
        heart.classList.remove('liked');
      } else {
        heart.classList.add('liked');
      }
    });
  });
};

export { display as default };