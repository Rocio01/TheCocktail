import { getComment } from './involvementApi';

export default class Comments {
 static comments = [];

 static getComments(id) {
   return getComment(id).then((usercomments) => usercomments);
 }
}
