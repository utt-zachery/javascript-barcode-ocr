import Manages from '../models/managesModel.js'
import * as Page from '../routes/pageBuilder.js'

export const process = async(req, res) => {
    
    if (!req.cookies || req.cookies["userID"] == null || req.cookies["userID"] == "") {
        Page.buildPage(req, res, "creds", -1);
        return false;
    }

    await Manages.findOne( {"userID": req.cookies["userID"] }, (err, data) => {
        if (err || !data || req.cookies["foodBankID"] != data.foodBankID) {
            Page.buildPage(req, res, "creds", -1);
            return false;
        } else {
            Page.buildPageWithFoodBank(req, res, "manage", 2);
            return true;
        }
        
    });
}