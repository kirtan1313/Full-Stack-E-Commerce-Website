// Aa class API ma filtering/sorting/searching mate use thay che
class ApiFeature {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr
    }

    search() {
    
        const findKeyword = this.querystr.keyword 
            ? {
                name: {
                    $regex: this.querystr.keyword ,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...findKeyword });
        return this;
    }


    filter() {
        const queryCopy = { ...this.querystr };

        // Remove unwanted fields
        const removeField = ['keyword', 'page', 'limit'];
        removeField.forEach(key => delete queryCopy[key]);

        // Price & rating filtering
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }


    page(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }


}

module.exports = ApiFeature