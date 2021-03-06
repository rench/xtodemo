/**
 * API
 * @param req
 * @param res
 */
var xto = require("xto");
exports.query = function(req, res){
    var params = req["params"];
    var company = params["company"];
    var number = params["number"];

    if(number === undefined) {
        var result = {
            "status"        : false,
            "msg"           : "请输入运猫号。",
            "data"          : []
        };

        var resultString = JSON.stringify(result);

        res.write(resultString);
        res.end();
        return;
    }

    xto.query(number, company, function(status, msg, data){
        data["stateText"] = xto.stateToText(data["state"]);

        var result = {
            "status"        : status,
            "msg"           : msg,
            "data"          : data
        };
        var resultString = JSON.stringify(result);

        res.write(resultString);
        res.end();
    });
};
