// using of modules 
module.exports.getdate = getdate;

function getdate(){
    var today=new Date();
 
    var option={
        weekday:"long",
        day : "numeric",
        month : "long"
    };

    var day=today.toLocaleDateString("en-IN",option);

    return day;
}

module.exports.getday=getday;
function getday(){
    var today=new Date();
 
    var option={
        weekday:"long"
    };

    var day=today.toLocaleDateString("en-IN",option);

    return day;
}