const rq = require('request-promise-native');
const cheerio = require('cheerio');
const cookieJar = rq.jar();
const request = rq.defaults({ jar: cookieJar });

const cookieUrl = 'https://www.chalmersstudentbostader.se';
const url =
	'https://www.chalmersstudentbostader.se/widgets/?callback=jQuery&widgets%5B%5D=aptuslogin%40APTUSPORT';
const generateError = msg => {
	return msg;
};

const login = (username, pw) => {
	const options = {
		method: 'POST',
		uri: 'https://www.chalmersstudentbostader.se/wp-login.php',
		formData: {
			log: username,
			pwd: pw,
			redirect_to: 'https://www.chalmersstudentbostader.se/min-bostad/'
		},
		simple: false,
		resolveWithFullResponse: true
	};
	return request(options).then(res => {
		if (res.statusCode != 302) {
			throw generateError('Bad request');
		}
		const cookiesString = cookieJar.getCookieString(cookieUrl);
		if (cookiesString.indexOf('Fast2User_ssoId=') == -1) {
			throw generateError('Bad login');
		}
		return;
	});
};
const makeCsbJsCallback = async widgetName => {
	const options = {
		method: 'GET',
		uri: 'https://www.chalmersstudentbostader.se/widgets/',
		qs: {
			callback: 'jQuery',
			'widgets[]': widgetName
		}
	};
	return request(options)
		.then(res => res.substring(options.qs.callback.length + 1, res.length - 2))
		.then(JSON.parse)
		.then(data => data.data[widgetName]);
};
const getAptusLoginUrl = async () => {
	const widgetName = 'aptuslogin@APTUSPORT';
	return makeCsbJsCallback(widgetName).then(obj => obj.objekt[0].aptusUrl);
};

const getName = async () => {
	const widgetName = 'kontaktuppgifter';
	return makeCsbJsCallback(widgetName).then(data => {
		return `${data.fnamn.value} ${data.enamn.value}`;
	});
};

const loginAptus = loginUrl => {
	const options = {
		uri: loginUrl,
		followRedirect: false,
		simple: false,
		resolveWithFullResponse: true,
		headers: {
			'User-Agent': 'csbport'
		}
	};
	return request(options).then(
		res => {
			const cookiesString = cookieJar.getCookieString(loginUrl);
			if (cookiesString.indexOf('.ASPXAUTH=') == -1) {
				throw generateError('Could not authenticate with aptus');
			}
			return;
		},
		err => console.error(err)
	);
};
const openDoor = (code) => {
	if(!code) {
		code = '116402';
	}
	const options = {
		followRedirect: false,
		simple: false,
		resolveWithFullResponse: true,
		uri:
			`https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock/UnlockEntryDoor/${code}`
	};
	return request(options).then(resp => {
		if (resp.statusCode != 200)
			throw generateError('Could not open door' + resp.body);
		return resp.body;
	});
};

const getDoors = async () => {
	const options = {
		simple: false,
		resolveWithFullResponse: true,
		uri: 'https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock'
	};
	const resp = await request(options);
	if (resp.statusCode != 200) throw generateError('Could not get doors');
	const $ = cheerio.load(resp.body);
	const texts = $('.lockCard.animation>:first-child>span')
		.contents().toArray().map(ce => ce.data);
	const btns = $('.lockCard.animation').toArray()
		.map(ce => ce.attribs.id)
		.map(id => id.substring('entranceDoor_'.length));
	const toReturn = texts
		.map((val, index) => ({
			"text": val,
			"code": btns[index]
		}));
	return toReturn;
};

module.exports = {
	login,
	getAptusLoginUrl,
	loginAptus,
	openDoor,
	getName,
	getDoors
};
