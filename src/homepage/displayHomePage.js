import getDetails from './apidetails';
import { postLike, getLikes } from '../likes/apiInvolvement';
import counter from './counter';
import Comments from '../comments/comments';
import { postComment } from '../comments/involvementApi';

const display = (obj) => {
  const cardsContainer = document.querySelector('.cards-container');
  obj.drinks.forEach((drink) => {
    const divCol = document.createElement('div');
    cardsContainer.appendChild(divCol);
    divCol.className = 'col';
    divCol.innerHTML = `<div class='card card-drink h-100' id ='${drink.idDrink}'>
                          <img src='${drink.strDrinkThumb}' class='card-img-top p-3' alt='...'>
                          <div class='card-body'>
                            <h5 class='card-title'>${drink.strDrink}</h5>
                            <div class='card-text container'>
                              <button type='button' class='btn comments btn-outline-dark float-start'>Comments</button>
                                <div class='heart-container container' id='item-${drink.idDrink}'>                         
                                <div class='heart-like-button float-end'></div>  
                                </div>
                            </div>   
                          
                          </div>
                      </div>`;
  });

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
      const div2 = document.createElement('div');
      const ul = document.createElement('ul');
      const addCommnt = (username, comment) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const span2 = document.createElement('span');
        const p = document.createElement('p');
        const date = new Date().toLocaleDateString();
        span.innerHTML = `${username}: `;
        span2.innerHTML = ` ${date}`;
        span2.classList.add('px-3');
        p.innerHTML = comment;
        li.appendChild(span2);
        li.appendChild(span);
        li.appendChild(p);
        ul.appendChild(li);
        li.classList.add('d-flex');
        ul.classList.add('list-unstyled', 'col-12');
        div2.appendChild(ul);
      };
      const callComent = () => Comments.getComments(parentNodesid).then((data) => {
        const h3 = document.createElement('h3');
        h3.innerHTML = `Comments(${data.length})`;
        if (data.length === 0) {
          div2.innerHTML = 'No Comments Yet';
        } else {
          data.forEach((com) => {
            if (com.username === undefined || com.comment === undefined) {
              div2.innerHTML = 'No Comments Yet';
              div2.classList.add('text-center');
            } else {
              const li = document.createElement('li');
              const span = document.createElement('span');
              const span2 = document.createElement('span');
              const p = document.createElement('p');
              span.innerHTML = `${com.username}: `;
              span2.innerHTML = ` ${new Date().toLocaleDateString()}`;
              span2.classList.add('px-3');
              p.innerHTML = com.comment;
              li.appendChild(span2);
              li.appendChild(span);
              li.appendChild(p);
              ul.appendChild(li);
              li.classList.add('d-flex');
              ul.classList.add('list-unstyled', 'col-12');
              div2.appendChild(h3);
              div2.appendChild(ul);
            }
          });
        }
      });
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
           <div class = 'comment-list col-8'>
    
           </div>
          
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
        callComent();
        const commentsSection = document.querySelectorAll('.comment-list');
        commentsSection.forEach((comment) => {
          comment.appendChild(div2);
        });
        // commentpreview.forEach((com) => {
        //   com.innerHTML = div2.innerHTML;
        // });
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
            postComment(data);
            addCommnt(data.username, data.comment);
            data.username = '';
            data.comment = '';

            // call comments with no repetitions
          });
        });
      });
      content.appendChild(div);
    });
  });

  const hearts = document.querySelectorAll('.heart-like-button');
  const heartsContainer = document.querySelectorAll('.heart-container');

  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      const like = heart.parentElement.lastChild;
      const number = parseInt(like.innerHTML.split(' ')[0], 10);

      if (!(heart.classList.contains('liked'))) {
        heart.classList.add('liked');
        postLike(heart);
        like.innerHTML = `${number + 1} likes`;
      }
    });
  });

  heartsContainer.forEach((heartContainer) => {
    const likesp = document.createElement('p');
    likesp.className = 'likesp float-end p-2';
    heartContainer.appendChild(likesp);
    getLikes(heartContainer);
  });

  const drinksCount = document.querySelector('.drinks-number');
  drinksCount.innerHTML = `Drinks (${counter()})`;
};

export { display as default };