import db from '../DB';
import _ from 'lodash';

const updateOperation = (modelName, query, update, options) => {
    return new Promise((resolve, reject) => {
        db.model[modelName].update(query, update, options, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
};

const updateData = (modelName, query, update, options, res) => {
    updateOperation(modelName, query, update, options)
        .then(success => {
            res.send(success);
        })
        .catch(err => {
            res.send(err);
        })
};

const multiUpdate = (modelName, objArray, res) => {
    let successArray = [];
    objArray.forEach(each => {
        updateOperation(modelName, {
            itemId: each.itemId
        }, {
            isAvailable: each.isAvailable,
            quantity: each.quantity
        }, {}).then((success) => {
            successArray.push(success);
            if(successArray.length === objArray.length) res.send({"ok": objArray.length});
        }).catch(err => {
            res.send(err);
        })
        
    })

};


export default {
    updateData,
    multiUpdate
}
