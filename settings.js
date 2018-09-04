// Change the url to the domain of your app
exports.url = 'https://robusfinance-email-subscribe.herokuapp.com';

exports.senderEmail = "jmiller@robusfinance.com";
exports.senderName = "RoBUS Finance";

// set 'exports.listId = null' to add contact to all contacts, but no specific list
// or a string with the listId to add to a specific list
exports.listId = 5036793;

// set 'exports.templateId = null' to opt out of using a template
// or a string with the templateId to use a template
exports.templateId = c20e23d1-2b38-49d8-b825-f9028b99c516;

// receive an email when a new signup is confirmed
exports.sendNotification = true;
exports.notificationEmail = "james@robusfinance.com";
