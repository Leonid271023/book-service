//indPublishersByAuthor
import {Author, Publisher} from "../model/index.js";

export const findPublishersByAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.name);
    if (!author) {
        return res.status(404).send({error: `Author with name ${req.params.name} not found`});
    }
    const book = await author.getBooks();
    const publishers = [...new Set(book.map(b=>b.publisher))]
    return res.json(publishers)

}