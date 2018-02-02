import db from '../DB';

const insertData = (modelName, postData, res) => {
    const newModel = new db.model[modelName](postData);
    newModel.save((err, data) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(data);
        }
      })
};


export default {
    insertData
}