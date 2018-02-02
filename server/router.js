import bodyParser from 'body-parser';
import path from 'path';
import controller from '../controller';


const router = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    app.get('/user', (req, res) => {
        controller.readController.readData('userModel', {}, res);
    });
    app.post('/user', function (req, res) {
        controller.createController.insertData('userModel', req.body, res);
    });
    app.post('/customer', function (req, res) {
        controller.createController.insertData('customerModel', req.body, res);
    });

    app.get('/customer', function (req, res) {
        controller.readController.readData('customerModel', {}, res);
    });

    app.get('/customer/customerMobile/:customerMobile', function (req, res) {
        controller.readController.readData('customerModel', {customerMobile: req.params.customerMobile}, res);
    });

    app.post('/order', function (req, res) {
        const postObj = {
            "orderId": req.body.orderId,
            "orderDate": new Date(req.body.orderDate),
            "orderItems": req.body.orderItems,
            "customerMobile": req.body.customerMobile,
            "totalBillValue": req.body.totalBillValue,
            "createdDate": Date.now(),
            "lastUpdatedDate": Date.now(),
            "isPaid": req.body.isPaid,
	        "paymentMode": req.body.paymentMode,
            "orderMode": req.body.orderMode,
            "createdBy": req.body.createdBy
        }
        controller.createController.insertData('orderModel', postObj, res);
    });

    app.put('/order', function (req, res) {
        const update = {
            "orderDate": new Date(req.body.orderDate),
            "orderItems": req.body.orderItems,
            "customerMobile": req.body.customerMobile,
            "totalBillValue": req.body.totalBillValue,
            "lastUpdatedDate": Date.now(),
            "isPaid": req.body.isPaid,
	        "paymentMode": req.body.paymentMode,
            "orderMode": req.body.orderMode
        }
        const query = {
            "orderId": req.body.orderId
        }
	    const options = {upsert: true}
        controller.updateController.updateData('orderModel', query, update, options, res);
    });

    app.get('/order/outletId/:createdBy', function (req, res) {
        const query = [
            {
                $match: {
                    createdBy: req.params.createdBy
                }
            },
            {
                $lookup: {
                    
                    from: "customers",
                    localField: "customerMobile",
                    foreignField: "customerMobile",
                    as: "customer_info"
                                
                }
            },
            {
                $unwind: {
                    path : "$orderItems"
                }
            },
            {
                $lookup: {
                    from: "items",
                                localField: "orderItems.itemId",
                                foreignField: "itemId",
                                as: "item_info"
                }
            },
            {
                $group: {
                    _id: {orderId: "$orderId"},
                    createdDate: {$first: "$createdDate"},
                    lastUpdatedDate: {$first: "$lastUpdatedDate"},
                    isPaid: {$first: "$isPaid"},
                    orderMode: {$first: "$orderMode"},
                    items: {$push: {item_info: "$item_info", quantity: "$orderItems.quantity"}},
                    totalBillValue: {$first: "$totalBillValue"},
                    paymentMode: {$first: "$paymentMode"},
                    customerInfo: {$first: "$customer_info"}
                }
            },

	    ]
        controller.readController.aggregateData('orderModel', query, res);
    });

    app.get('/order/customerMobile/:customerMobile', function (req, res) {
        controller.readController.readData('orderModel', {customerMobile: req.params.customerMobile}, res);
    });

    app.get('/order/latest', function (req, res) {
        const query = [
            {
                $sort : {orderId: -1}
            },
            { 
                $limit : 1 
            },
            {
                $project: {orderId: 1, _id: 0}
            }
        ]
        controller.readController.aggregateData('orderModel', query, res);
    });

    app.get('/taxdetails/outletId/:createdBy', function (req, res) {
        controller.readController.readData('taxesModel', {createdBy: req.params.createdBy}, res);
    });

    app.get('/items/outletId/:createdBy', function (req, res) {
        controller.readController.readData('itemsModel', {createdBy: req.params.createdBy}, res);
    });

    app.put('/items', function (req, res) {
        controller.updateController.multiUpdate('itemsModel', req.body, res);
    });

    app.get('/paymentModes/outletId/:createdBy', function (req, res) {
        controller.readController.readData('paymentModesModel', {createdBy: req.params.createdBy}, res);
    });
    app.post('/paymentModes', function (req, res) {
        controller.createController.insertData('paymentModesModel', req.body, res);
    });

    app.get('/orderSources/orderSourceId/:orderSourceId', function (req, res) {
        controller.readController.readData('orderSourcesModel', {orderSourceId: req.params.orderSourceId}, res);
    });

}

export default router;
