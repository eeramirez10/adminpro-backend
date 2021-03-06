const jwt = require('jsonwebtoken');


let generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {

                resolve(token);
            }

        })

    })
}






module.exports = {
    generarJWT
}