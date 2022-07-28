const Course = require('../../models/Course')
const {mutipleMongooseToObject} = require('../../until/mongoose')

class MeController {

    //[GET] /me
    storedCourses(req,res,next){
        let courseQuery = Course.find({})
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) => 
                res.render('me/stored-courses',{
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                }))
            .catch(next)
    }
    trashCourses(req, res, next){
        Course.findDeleted()
            .then(courses => res.render('me/trash-courses',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController
