var modCache = {};

function AsmiProtocolDirect(modName) {
	this.modName = modName;
}

var p = AsmiProtocolDirect.prototype;

p.initServer = function (outsideInterface) {

	var mod;
	if (modCache[this.modName]) {
		mod = modCache[this.modName];
	} else {
		mod = require(this.modName);
	}

	for (var method in mod) {
		if (typeof mod[method] == 'function') {
			outsideInterface[method] = mod[method].bind(mod);
		}
	}

	if (!modCache[this.modName]) {
		try {
			mod.start();
		} catch (e) {};

		modCache[this.modName] = outsideInterface;
	}
};

module.exports = exports = function (modName) {
	return new AsmiProtocolDirect(modName);
};
