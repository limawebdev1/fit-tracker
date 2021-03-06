var express = require('express');
var router = express.Router();
const knex = require('../knex');

/* GET home page. */
router.get('/', (req, res, next) => {
    if (req.session.userInfo === undefined) {
        res.redirect('index');
    } else {
        res.render('cheats', {
            stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
        <li><a class="logout" href="/">Log Out</a></li>
        <li><a href="day">Day</a></li>
        <li><a href="activities">Activities</a></li>
        <li><a href="cheats">Cheats</a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
        <li><a class="logout" href="/">Log Out</a></li>
        <li><a href="day">Day</a></li>
        <li><a href="activities">Activities</a></li>
        <li><a href="cheats">Cheats</a></li>
        </ul>`
        })
    }

});

router.put('/', (req, res, next) => {
    let cheat = req.body.cheatValue
    let points = 0
    if (cheat === '1') {
        points = 400
    } else if (cheat === '2') {
        points = 600
    } else {
        points = 700
    }
    return knex('users')
        .where('users.id', req.session.userInfo.id).first().then(user => {
            return user.tot_pts - points
        })
        .then(score => {
            return knex('users').where('users.id', req.session.userInfo.id).first()
                .update('tot_pts', score)
        })
        .then(() => {
            res.end();
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
