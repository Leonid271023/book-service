import Author from "./author.model.js";
import Book from "./book.model.js";
import Publisher from "./publisher.model.js";
import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";

//Book and Publisher: Many-To-One relationship
Book.belongsTo(Publisher, {
    foreignKey: "publisher",
    targetKey: "publisher_name",
    as: "publisherDetails",
});

Publisher.hasMany(Book, {
    foreignKey: "publisher",
    sourceKey: "publisher_name",
    as:'books'
});

//define the junction table
const BooksAuthors =sequelize.define('BooksAuthors', {
    isbn:{
        type: DataTypes.STRING,
        references:{
            model:Book,
            key: 'isbn'
        }
    },
    author_name:{
        type: DataTypes.STRING,
        references:{
            model:Author,
            key: 'name'
        }
    }
},{
    tableName: 'books_authors',
    timestamps: false,
})

//Book and Author: many To many relationship
Book.belongsToMany(Author, {
    through: BooksAuthors,
    foreignKey: 'isbn',
    otherKey: 'author_name',
    as: 'authors',
})

const syncModels = async ()=>{
    try {
        await sequelize.sync();
        console.log('model successfully created');
    }catch (e){
        console.log('Error creating model', e);
    }
}

export {syncModels, Book, Publisher, Author}