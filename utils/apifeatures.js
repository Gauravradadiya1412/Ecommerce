  class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }

    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};

      this.query = this.query.find({ ...keyword });
      return this;
    }

    filter() {
      const queryCopy = { ...this.queryStr };
      // in js objects are passed through refrence so if we directly assign the value then it would change the orginial object as well

      //removing some fields from category
      const removefields = ["keyword", "page", "limit"];

      removefields.forEach((key) => delete queryCopy[key]);

      //filer for price and rating
    
      let queryStr = JSON.stringify(queryCopy);
      console.log(queryStr)
    
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
      

      this.query = this.query.find(JSON.parse(queryStr));

      return this;
    }

    pagination(resultPerPage){
      const currentpage = Number(this.queryStr.page) || 1;

      const skip = resultPerPage * (currentpage - 1);

      this.query = this.query.limit(resultPerPage).skip(skip);
      return this
    }
  }

module.exports = ApiFeatures;
