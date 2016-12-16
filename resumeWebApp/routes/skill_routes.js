var express = require('express');
var router = express.Router();
var skill_dal = require('../model/skill_dal');

//View All skills
router.get('/all', function(req, res){
    skill_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('skill/skillViewAll', {'result':result});
        }
    });
});

//View the company  for a given Id
router.get('/', function(req, res){
    if(req.query.skill_id == null){
        res.send('skill_id is null');
    }
    else{
        skill_dal.getById(req.query.skill_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('skill/skillViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    skill_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('skill/skillAdd', {'result':result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.name == null){
        res.send('Skill name must be provided');
    }
    else if(req.query.description == null){
        res.send('A description must be provided');
    }
    else{
        skill_dal.insert(req.query, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/skill/all');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.skill_id == null){
        res.send('skill_id is null');
    }
    else{
        skill_dal.delete(req.query.skill_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/skill/all');
            }
        });
    }
});

module.exports = router;