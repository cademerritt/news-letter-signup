const express       = require("express");
const bodyParser    = require("body-parser");
const request       = require("request");
const { get, post } = require("request");
const https         = require("https");
const { url }       = require("inspector");
const { json }      = require("body-parser");


const app           = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const FN    = req.body.firstName;  
    const LN    = req.body.lastName;
    const X2     = req.body.email;

    const data  = {
        members: [
            {
                email_address:  X2,
                status:         "subscribed",
                merge_fields:{
                    FNAME: FN,
                    LNAME: LN, 
                }   
            }
        ] 
    };  
 
    const jsonData  = JSON.stringify(data);

    // https://<dc>.api.mailchimp.com/3.0/lists/{list_id}
    var url = "https://us2.campaign-archive.com/home/?u=2b4953cf27b34dd63430b5434&id=b2195ccfcb";
    // https://us2.campaign-archive.com/home/?u=2b4953cf27b34dd63430b5434&id=b2195ccfcb
    const options = {
        method: "post",
        auth: "cade1:1c8b12fb0c6d6c112c1d4d8465d5743c-us2"
    }
 
    
   
    const request = https.request(url, options, function(responce){
        responce.on("data", function(data){
          if (responce.statusCode === 200){
        res.sendFile(__dirname + "/failure.html");
    }else("cool");
        });
    });
    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, function(){
    console.log("go");
});


//                                API KEY
//  1c8b12fb0c6d6c112c1d4d8465d5743c-us2

//                                ADD LIST POST
// curl -X POST \
//   https://server.api.mailchimp.com/3.0/lists \
//   -H 'authorization: Basic <USERNAME:PASSWORD>' \
//   -d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'

//                                  AUDIENCE ID/LIST ID
//  b2195ccfcb.

