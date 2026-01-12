//indPublishersByAuthor
import {Author, Book, Publisher} from "../model/index.js";

export const findPublishersByAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.name);
    if (!author) {
        return res.status(404).send({error: `Author with name ${req.params.name} not found`});
    }
    const book = await Book.findAll({
        include:{
            model: Author, as: 'authors',
            where: {name: req.params.name}
            ,through: {attributes: []}
        },
        attributes: ['publisher'],
        raw: true,
        group: ['publisher']
    });
    const publishers = book.map(b => b.publisher);
    return res.json(publishers)

}