const sg = require('sendgrid')(process.env.SG_API_KEY);
sg.globalRequest.headers['User-Agent'] = 'subscription-widget/1.0.0';

const path = require('path');
const Settings = require('../../settings');
const optIn = 'opt-in';

function prepareConfirmationEmail(reqBody) {
	const subject = "Please Confirm Your Email Address";
	const url = formatUrl(Settings.url) + '/success';
	const link = "<a href='" + url + "'>Click this link to verify your email address</a>"
	const mailText = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">@media only screen and (max-width:480px){.footer td{font-size:12px!important}.footer__main__col1,.footer__main__col2{width:100%!important}.footer__main__col2__td{text-align:left;padding-bottom:20px}.footer__main__col2__td__img{padding-left:0!important}.gray-hr hr{margin-bottom:10px!important;margin-top:10px!important}}@media only screen and (min-width:1025px){.background,.body-with-bg{background-color:#F1F1F1}.body-with-bg .main{border:1px solid #E9E9E9!important;max-width:960px;margin:0 auto}.background{padding:30px}}</style></head><body class="body-with-bg" style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none;"><table class="background rbcc" style="border: 0; cellpadding: 0; cellspacing: 0;" border="0" cellpadding="0" cellspacing="0" width="100%"><tr style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td><table class="main rbcc" style="border: 0; cellpadding: 0; cellspacing: 0; padding-top: 15px;" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="100%"><tr class="rbcc" style="-webkit-box-sizing: border-box; border: 0; box-sizing: border-box; cellpadding: 0; cellspacing: 0; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="main__welcome" style="color: #000; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 22px; padding: 10px 30px 0 30px;"><b>Hi there,</b></td></tr><tr class="rbcc" style="-webkit-box-sizing: border-box; border: 0; box-sizing: border-box; cellpadding: 0; cellspacing: 0; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="main__content" style="color: #000; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; padding: 10px 30px 0 30px;">Thanks for signing up! ' + link + '.</td></tr><tr class="sp" style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="sp__inner" style="padding: 15px 0;"></td></tr><tr class="rbcc" style="-webkit-box-sizing: border-box; border: 0; box-sizing: border-box; cellpadding: 0; cellspacing: 0; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="footer" style="border-top: 8px solid #EAEAEA; color: #888; padding: 20px 30px 0px 30px;" bgcolor="#f5f5f5"><table class="rbcc footer__main" style="border: 0; cellpadding: 0; cellspacing: 0;" border="0" cellpadding="0" cellspacing="0" width="100%"><tr style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="footer__main__signature" align="left" style="align: left; color: #888; font-size: 14px;">Thanks,<br>RoBUS Finance<br></td></tr><tr class="gray-hr" style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td width="100%"><hr class="gray-hr" style="background: transparent; border-bottom: 1px solid #E4E4E4; border-top: none; color: transparent; margin-bottom: 20px; margin-top: 20px;"></td></tr><tr style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><table class="rbcc footer__main__col1" align="left" style="align: left; border: 0; cellpadding: 0; cellspacing: 0; margin-bottom: 30px;" border="0" cellpadding="0" cellspacing="0" width="70%"><td class="footer__main__col1__td" align="left" style="align: left; color: #888; font-size: 14px;"><strong>Call <a href="tel:8015904499" style="color: #888; text-decoration: none;"><span style="color: #888 !important; text-decoration: none !important;">(801) 590-4499</span></a> or email us at <a href="mailto:info@robusfinance.com" target="_blank" style="color: #888; text-decoration: none;">info@robusfinance.com</a></strong><br><a href="https://www.google.com/search?q=robus+finance&rlz=1C1MKDC_enUS771US771&oq=robus+finance&aqs=chrome.0.69i59j69i60j0l2j69i61j69i60.1910j0j8&sourceid=chrome&ie=UTF-8#lrd=0x87528bd6e6094105:0xbeb5ee7c94089f07,3" style="color: #888; text-decoration: none;"><span style="color: #888 !important; text-decoration: none !important;">5295 S Commerce Dr ste 205, SLC, UT 84107</span></a></td></table><table class="rbcc footer__main__col2" align="right" style="align: right; border: 0; cellpadding: 0; cellspacing: 0;" border="0" cellpadding="0" cellspacing="0" width="30%"><td class="footer__main__col2__td" align="right" style="align: right; color: #888; font-size: 14px;"><a href="https://www.robusfinance.com" style="color: #888; text-decoration: none;"><img src="https://uploads-ssl.webflow.com/5a2f3dac41c3aa0001dc9104/5b804c1a34f0197083183c51_light.png" alt="RoBUS Finance" class="footer__main__col2__td__img" style="border: 0; height: auto; max-height: 38px; max-width: 100%; padding-left: 10px; padding-top: 6px;"></a></td></table></tr></table></td></tr></table></td></tr></table></body></html>';

	var emailBody = {
	  personalizations: [
	    {
	      to: [
	        {
	          email: reqBody.email,
	        }
	      ],
	      subject: subject,
	      custom_args: {
	      	type: optIn,
	      	time_sent: String(Date.now()),
	      },
	      substitutions: {
	      	link_insert: link
	      }
	    },
	  ],
	  from: {
	    email: Settings.senderEmail,
	    name: Settings.senderName,
	  },
	  content: [
	    {
	      type: "text/html",
	      value: mailText,
	    }
	  ]
	}

	const templateId = Settings.templateId;
	if (templateId) emailBody.template_id = templateId;

	for (key in reqBody) {
		emailBody.personalizations[0].custom_args[key] = reqBody[key];
	}

	return emailBody;
}

function prepareNotificationEmail(reqBody) {
	const subject = "New email signup";
	const mailText = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">@media only screen and (max-width:480px){.footer td{font-size:12px!important}.footer__main__col1,.footer__main__col2{width:100%!important}.footer__main__col2__td{text-align:left;padding-bottom:20px}.footer__main__col2__td__img{padding-left:0!important}.gray-hr hr{margin-bottom:10px!important;margin-top:10px!important}}@media only screen and (min-width:1025px){.background,.body-with-bg{background-color:#F1F1F1}.body-with-bg .main{border:1px solid #E9E9E9!important;max-width:960px;margin:0 auto}.background{padding:30px}}</style></head><body class="body-with-bg" style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none;"><table class="background rbcc" style="border: 0; cellpadding: 0; cellspacing: 0;" border="0" cellpadding="0" cellspacing="0" width="100%"><tr style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td><table class="main rbcc" style="border: 0; cellpadding: 0; cellspacing: 0; padding-top: 15px;" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="100%"><tr class="rbcc" style="-webkit-box-sizing: border-box; border: 0; box-sizing: border-box; cellpadding: 0; cellspacing: 0; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="main__welcome" style="color: #000; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 22px; padding: 10px 30px 0 30px;"><b>Hi there,</b></td></tr><tr class="rbcc" style="-webkit-box-sizing: border-box; border: 0; box-sizing: border-box; cellpadding: 0; cellspacing: 0; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="main__content" style="color: #000; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; padding: 10px 30px 0 30px;">A new person just confirmed they would look to receive your emails via your email subscription widget.<br/><b>Name: </b>' + reqBody.first_name + ' ' + reqBody.last_name + '<br/><b>Email: </b>' + reqBody.email + '</td></tr><tr class="sp" style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="sp__inner" style="padding: 15px 0;"></td></tr><tr class="rbcc" style="-webkit-box-sizing: border-box; border: 0; box-sizing: border-box; cellpadding: 0; cellspacing: 0; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="footer" style="border-top: 8px solid #EAEAEA; color: #888; padding: 20px 30px 0px 30px;" bgcolor="#f5f5f5"><table class="rbcc footer__main" style="border: 0; cellpadding: 0; cellspacing: 0;" border="0" cellpadding="0" cellspacing="0" width="100%"><tr style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td class="footer__main__signature" align="left" style="align: left; color: #888; font-size: 14px;">Thanks,<br>RoBUS Finance<br></td></tr><tr class="gray-hr" style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><td width="100%"><hr class="gray-hr" style="background: transparent; border-bottom: 1px solid #E4E4E4; border-top: none; color: transparent; margin-bottom: 20px; margin-top: 20px;"></td></tr><tr style="-webkit-box-sizing: border-box; box-sizing: border-box; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"><table class="rbcc footer__main__col1" align="left" style="align: left; border: 0; cellpadding: 0; cellspacing: 0; margin-bottom: 30px;" border="0" cellpadding="0" cellspacing="0" width="70%"><td class="footer__main__col1__td" align="left" style="align: left; color: #888; font-size: 14px;"><strong>Call <a href="tel:8015904499" style="color: #888; text-decoration: none;"><span style="color: #888 !important; text-decoration: none !important;">(801) 590-4499</span></a> or email us at <a href="mailto:info@robusfinance.com" target="_blank" style="color: #888; text-decoration: none;">info@robusfinance.com</a></strong><br><a href="https://www.google.com/search?q=robus+finance&rlz=1C1MKDC_enUS771US771&oq=robus+finance&aqs=chrome.0.69i59j69i60j0l2j69i61j69i60.1910j0j8&sourceid=chrome&ie=UTF-8#lrd=0x87528bd6e6094105:0xbeb5ee7c94089f07,3" style="color: #888; text-decoration: none;"><span style="color: #888 !important; text-decoration: none !important;">5295 S Commerce Dr ste 205, SLC, UT 84107</span></a></td></table><table class="rbcc footer__main__col2" align="right" style="align: right; border: 0; cellpadding: 0; cellspacing: 0;" border="0" cellpadding="0" cellspacing="0" width="30%"><td class="footer__main__col2__td" align="right" style="align: right; color: #888; font-size: 14px;"><a href="https://www.robusfinance.com" style="color: #888; text-decoration: none;"><img src="https://uploads-ssl.webflow.com/5a2f3dac41c3aa0001dc9104/5b804c1a34f0197083183c51_light.png" alt="RoBUS Finance" class="footer__main__col2__td__img" style="border: 0; height: auto; max-height: 38px; max-width: 100%; padding-left: 10px; padding-top: 6px;"></a></td></table></tr></table></td></tr></table></td></tr></table></body></html>';

	var emailBody = {
	  personalizations: [
	    {
	      to: [
	        {
	          email: Settings.notificationEmail,
	        }
	      ],
	      subject: subject
	    },
	  ],
	  from: {
	    email: Settings.senderEmail,
	    name: Settings.senderName,
	  },
	  content: [
	    {
	      type: "text/html",
	      value: mailText,
	    }
	  ],
	}

	return emailBody;
}

// Send confirmation email to contact with link to confirm email
exports.sendConfirmation = (req, res, next) => {
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: prepareConfirmationEmail(req.body)
	});

	sg.API(request, function(error, response) {
		if (error) {
			console.log('Error response received');
		}

		if (response.statusCode >= 200 && response.statusCode < 300) {
			res.sendFile(path.join(__dirname, '../static/check-inbox.html'));
		} else {
			res.sendFile(path.join(__dirname, '../static/error.html'));
		}
	});
}

// Create new contact and add contact to given list
exports.addUser = function(req, res, next) {
	addUserToList(req.body[0], function() {
		//send notification about the new signup
		if (Settings.sendNotification) {
			console.log("Sending notification");

			var request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: prepareNotificationEmail(req.body[0])
			});

			sg.API(request, function(error, response) {
				if (error) {
					console.log('Error sending notification');
				}
			});
		}

		res.sendStatus(200);
	});
}

function addUserToList(emailBody, callback) {
	console.log(emailBody);

	var ignoreFields = ['ip', 'sg_event_id', 'sg_message_id', 'useragent', 'event',
		'url_offset', 'time_sent', 'timestamp', 'url', 'type', 'smtp-id'];

	var customFields = [{}];
	var customFieldArr = [];

	for (key in emailBody) {
		if (!stringInArray(key, ignoreFields)) {
			customFields[0][key] = emailBody[key];
			if (key != 'email' && key != 'first_name' && key != 'last_name') {
				customFieldArr.push(key);
			}
		}
	}

	checkAndAddCustomFields(customFieldArr, function() {
		const emailType = emailBody.type;
		const timestamp = parseInt(emailBody.time_sent);
		const listId = Settings.listId;
		const secondsInDay = 86400;
		const timeElapsed = (Date.now() - timestamp) / 1000;

		// Confirm email type is opt in and link has been clicked within 1 day
		if (emailType == optIn && timeElapsed < secondsInDay) {
			var request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/contactdb/recipients',
				body: customFields
			});

			sg.API(request, function(error, response) {
		    	if (listId) {
					var contactID = JSON.parse(response.body.toString()).persisted_recipients[0];
					var request = sg.emptyRequest({
						method: 'POST',
						path: '/v3/contactdb/lists/' + listId + '/recipients/' + contactID,
						body: customFields
					});
					sg.API(request, function(error, response) {
				    	console.log(response.statusCode)
				    	console.log(response.body)
				    	console.log(response.headers)

						callback();
					});
				} else {
					callback();
				}
			});
		} else {
			callback();
		}
	});

}

function checkAndAddCustomFields(submittedFields, callback) {
	var request = sg.emptyRequest({
		method: 'GET',
		path: '/v3/contactdb/custom_fields',
	});

	sg.API(request, function(error, response) {
    	console.log(response.statusCode)
    	console.log(response.body)
    	console.log(response.headers)

    	var existingCustomFields = JSON.parse(response.body);
		var fieldsToCreate = [];

		submittedFields.map((submittedField) => {
			var fieldExists = false;
			existingCustomFields.custom_fields.map((field) => {
				if (submittedField == field.name) {
					fieldExists = true;
				}
			});
			if (!fieldExists) {
				fieldsToCreate.push(submittedField)
			}
		});

		if (fieldsToCreate.length == 0) {
			callback();
		} else {
			fieldsToCreate.map((fieldsToCreate) => {
				var body = { name: fieldsToCreate, type: 'text' };

				var request = sg.emptyRequest({
					method: 'POST',
					path: '/v3/contactdb/custom_fields',
					body: body
				});

				sg.API(request, function(error, response) {
			    	callback();
			    });
			});
		}

    });
}

function formatUrl(url) {
	if (url.substr(-1) == '/') {
		return url.substring(0, url.length - 1);
	}
	return url;
}

function stringInArray(string, array) {
	var isInArray = false;
	array.map((item) => {
		if (string == item) {
			isInArray = true;
		}
	});
	return isInArray;
}
