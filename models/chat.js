var name = 'default';
var _messages = [];

exports.getMessages = function() {
	return _messages;
};

exports.add = function(message, fromUser) {
	var messageObject = {message: message, user: fromUser, date: new Date()}
	_messages.push(messageObject);
};
