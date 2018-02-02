import db from '../DB';

const readData = (modelName, query, res) => {
    db.model[modelName].find(query, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
};

const aggregateData = (modelName, query, res) => {
    model[modelName].aggregate(query, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
}


export default {
    readData,
    aggregateData
}