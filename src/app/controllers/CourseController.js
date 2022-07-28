const Course = require('../../models/Course')
const {mongooseToObject} = require('../../until/mongoose')

class SiteController {

    //[GET] /courses slug
    show(req,res,next){   
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show',{course: mongooseToObject(course)});
            })
            .catch(next)
    }
    //[GET] /courses create
    create(req,res,next){   
        res.render('courses/create');
    }

    //[POST] /courses create
    store(req,res,next){  
        const formData = req.body 
        req.body.image = 'https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-6/295867312_535851524995544_6860365612682764977_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0jd-LirzSmgAX8Q_flq&_nc_ht=scontent.fhan2-2.fna&oh=00_AT_e8zILe25neei_WQ2WeYEDfsxKWDm74Z7VgbxFrhVJKA&oe=62E5BBB5'
        const course = new Course(formData)
        course.save()
            .then (()=>res.redirect('/'))
            .catch (error => {})
    }

    //[GET] /courses/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{course:mongooseToObject(course)}))
            .catch(next)
        
    }
    update(req, res,next) {
        Course.updateOne({_id: req.params.id},req.body)
         .then(() => res.redirect('/me/stored/courses'))
         .catch(next)
    }
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
         .then(() => res.redirect('/me/stored/courses'))
         .catch(next)
    }
    restore(req,res,next){
        Course.restore({_id: req.params.id})
         .then(() => res.redirect('back'))
         .catch(next)
    }
    // xóa thật
    clear(req, res, next) {
        Course.deleteOne({_id: req.params.id})
         .then(() => res.redirect('back'))
         .catch(next)
    }

    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break
            default:
                res.json({message: 'Action not allowed'})
        }
    }
}

module.exports = new SiteController
