const winston = require('winston');
//logger configuration
const logConfiguration = {
	transports: [
		new winston.transports.File({
			filename: './info.log',
			level: 'info',
			format: winston.format.combine(winston.format.timestamp(), winston.format.json())
		})
	]
};
//create logger
exports.logger = winston.createLogger(logConfiguration);
