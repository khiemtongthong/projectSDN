const Book = require('../models/book');
const aqp = require('api-query-params');
module.exports = {
    createBook: async (data) => {
        if (data.type === "EMPTY-BOOK") {
            let result = await Book.create(data);
            return result;
    }
    if (data.type === "ADD-COMMENT") {
        let myBook = await Book.findById(data.bookId).exec();
        for (let i = 0; i < data.commentsArr.length; i++) {
            myBook.comments.push(data.commentsArr[i]);
        }
        // check comment co ton tai trong Book hay chua sau do moi push

        let newResult = await myBook.save();

        //find project by id
        return newResult;
    }

    if (data.type === "REMOVE-COMMENT") {
        let myBook = await Book.findById(data.bookId).exec();
        for (let i = 0; i < data.commentsArr.length; i++) {
            myBook.comments.pull(data.commentsArr[i]);
        }
        // check comment co ton tai trong Book hay chua sau do moi push

        let newResult = await myBook.save();

        //find project by id
        return newResult;
    }
   
    return null;
},
    getBook: async (queryString) => {
        const page = queryString.page;
    
        const { filter, limit, population } = aqp(queryString);
    
        delete filter.page;

        if (queryString.minPrice) {
            filter.price = { $lt: parseFloat(queryString.minPrice) };
        }

        if (queryString.maxPrice) {
            filter.price = { $gt: parseFloat(queryString.maxPrice) };
        }
    
    
        let offset = (page - 1) * limit;
        const result = await Book.find(filter)
           .populate(population)
           .skip(offset)
           .limit(limit)
           .exec();
        return result;
    },
    uBook: async (data) => {
        try {
            let result = await Book.updateOne({ _id: data.id }, {...data });
            return result;
        } catch (error) {
            console.log(">>>error: ", error);
            return null;
        }
    },
    dBook: async (id) => {
        try {
            let result = await Book.deleteById(id);
            return result;
        } catch (error) {
            console.log(">>>error: ", error);
            return null;
        }
    }
}