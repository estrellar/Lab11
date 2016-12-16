var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var account_dal = require('../model/account_dal');
//View all resumes
router.get('/all', function (req, res) {
    resume_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', {'result': result});
        }
    });
});

router.get('/', function (req, res){
    if(req.query.resume_id == null){
        res.send("resume_id is null");
    }
    else {
        resume_dal.getById(req.query.resume_id, function(err, result){
            if(err) {
                res.send(err);
            }
    else
        {
            res.render('resume/resumeViewById', {'result': result});
        }
    });
    }
});

router.get('/add', function(req,res){
    account_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('resume/resumeAdd', {'account':result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.resume_name ==  null){
        res.send('resume_name cannot be null');
    }
    else if(req.query.account_id == null){
        res.send('account_id cannnot be null');
    }
    else{
        resume_dal.insert(req.query, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/resume/all');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.resume_id == null){
        res.send('resume_id is null');
    }
    else{
        resume_dal.delete(req.query.resume_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/resume/all');
            }
        });
    }
});

module.exports = router;