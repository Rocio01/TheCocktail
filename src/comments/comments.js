import { getComment } from './involvementApi';

export default class Comments {
 static comments = [];

 static getComments(id) {
   getComment(id).then((usercomments) => {
     this.comments.push(usercomments);
   });
   return this.comments;
 }
}
