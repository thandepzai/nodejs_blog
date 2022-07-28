const Course = require('../../models/Course')
const {mutipleMongooseToObject} = require('../../until/mongoose')

class SiteController {

    //[GET] /search
    search(req,res){
        res.render('search')
    }

    // [GET] /
    index(req,res) {
        Course.find({})
            .then(courses=> {
                res.render('home',{
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(err=>next)
    }
}

module.exports = new SiteController
