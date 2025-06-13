// Aa class API ma filtering/sorting/searching mate use thay che
class ApiFeature {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr
    }

    search() {
        const keyword = this.querystr.keyword?.trim()
            ? {
                name: {
                    $regex: this.querystr.keyword,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.querystr };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // ✅ Handle category
        if (queryCopy.category) {
            queryCopy.category = {
                $regex: queryCopy.category,
                $options: "i", // case-insensitive
            };
        }

        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gte|lte|gt|lt)\b/g, (key) => `$${key}`);

        const parsedQuery = JSON.parse(querystr);
        this.query = this.query.find(parsedQuery);
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