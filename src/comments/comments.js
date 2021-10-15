import { getComment } from './involvementApi';

export default class Comments {
  static getComments(id) {
    return getComment(id).then((usercomments) => usercomments);
  }
}
