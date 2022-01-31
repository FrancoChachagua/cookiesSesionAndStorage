
const {default:AuthorsMongo} = await import('./authors/authorsMongo.js');
const {default:MessagesMongo} = await import('./messages/messagesMongo.js');
let authors = new AuthorsMongo();
let messages = new MessagesMongo();

export {authors,messages}