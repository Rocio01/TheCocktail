import getDetails from './apidetails';
import { postComment, getComment } from '../comments/involvementApi';

const display = (obj) => {
  const cardsContainer = document.querySelector('.cards-container');
  obj.drinks.forEach((drink) => {
    const divCol = document.createElement('div');
    cardsContainer.appendChild(divCol);
    divCol.className = 'col';
    divCol.innerHTML = `<div class='card h-100' id ='${drink.idDrink}'>
                          <img src='${drink.strDrinkThumb}' class='card-img-top p-3' alt='...'>
                          <div class='card-body'>
                            <h5 class='card-title'>${drink.strDrink}</h5>
                            <div class='card-text container'>
                              <button type='button' class='btn comments btn-outline-dark float-start'>Comments</button>
                                <div class='heart-container container'>                         
                                <div class='heart-like-button float-end'></div>  
                                </div>
                            </div>   
                          
                          </div>
                      </div>`;
  });

  const hearts = document.querySelectorAll('.heart-like-button');
  const modal = document.querySelector('.modal-m');
  const content = document.querySelector('.m-content');
  const comments = document.querySelectorAll('.comments');
  comments.forEach((comment) => {
    comment.addEventListener('click', () => {
      modal.classList.remove('d-none');
      // get the id of the card
      const cardNodes = comment.parentNode.parentNode.parentNode.childNodes;
      // get id of the card
      const parentNodesid = comment.parentElement.parentElement.parentElement.id;
      const details = getDetails(parentNodesid);
      // let detailData = [];
      const detailData = details.then((data) => data.drinks[0]);
      const imgSrc = cardNodes[1].getAttribute('src');
      const title = cardNodes[3].childNodes[1].innerHTML;
      const div = document.createElement('div');
      detailData.then((data) => {
        div.innerHTML = `<div class="card h-100">
           <header  class= 'd-flex justify-content-end'>
           <button class='btn-close'></button>
         </header>
           <img src='${imgSrc}' class='card-img-top p-3' alt='...'>
           <div class='card-body'>
             <h5 class='card-title text-center'>
             ${title}
             </h5>
             <section class='ingredients'>
              <h5 class = 'text-center'>Ingredients</h5>
              <ul class = 'list-unstyled d-flex justify-content-around'>
  <li>${data.strIngredient1}</li>
  <li>${data.strIngredient2}</li>
  <li>${data.strIngredient3}</li>
  <li>${data.strIngredient4}</li>
  <li>${data.strIngredient5}</li>
  <li>${data.strIngredient6}</li>
</ul>
   </section>
  
             <section class='comments d-flex flex-column align-items-center'>
             <h4>
               Comments(2)
             </h4>
             <span>03/11/2021 Alex: I would love to buy it</span>
             <span>03/11/2021 Mia: I would love to buy it</span>
             </section>
             <section class='add-comment'>
             <h3>Add a comment</h3>
             <form>
               <div class='mb-3'>
                 <input type='text' class='form-control' id='name'>
               </div>
               <div class='mb-3'>
                   <textarea class='form-control' placeholder='Leave a comment here' id='floatingTextarea'></textarea>
               </div>
               <button type='submit' class='btn submit btn-primary'>Submit</button>
             </form>
           </section>
             </div>     
           </div>
       </div>`;
        getComment(parentNodesid).then((val) => {
          console.log(val);
        });
        const closeBtn = document.querySelectorAll('.btn-close');
        closeBtn.forEach((btn) => {
          btn.addEventListener('click', () => {
            modal.classList.add('d-none');
            content.removeChild(content.childNodes[1]);
          });
        });
        const submitBtn = document.querySelectorAll('.submit');
        submitBtn.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const comments = document.querySelector('#floatingTextarea').value;
            const data = {
              item_id: parentNodesid,
              username: name,
              comment: comments,

            };
            console.log(postComment(data));
            // content.removeChild(content.childNodes[1]);
          });
        });
      });
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
