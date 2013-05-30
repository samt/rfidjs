/*
 * RFID.js
 *
 * Version 1.0.0
 *
 * Reads keyboard input (from an RFID device) and emits an event containing the
 * validated id code.
 *
 * The MIT License 
 * (c) 2013 Sam Thompson <sam@emberlabs.org>
 */
(function (window) {

	// Create new event for the document
	var event = window.document.createEvent('Event');
	event.initEvent('RFIDCardScan', true, true);

	var buf = '';
	var lastpress = new Date();

	// Listen for the 'keypress' event, this is rather interesting because the
	// "keyboard" will fire off 11 of these for a valid ID. We have to keep a
	// state to allow it to be aware of everthing.
	window.addEventListener('keypress', function (e) {
		// For comparison against 'lastpress' to throw out slow entry (such as
		// manual entry)
		var now = new Date();

		// if it's still potentially a valid ID...
		if (buf.length <= 10 && ((now - lastpress) < 125 || buf.length == 0)) {
			lastpress = now;
			if (e.which == 13) {
				if (buf.length == 10) {
					// We're valid at this point, populate idcode and dispatch
					// the event
					event.idcode = buf;
					window.document.dispatchEvent(event);
				}
			}
			else if (e.which >= 48 && e.which <= 57) { // 48 = 0 ... 57 = 9
				buf += String.fromCharCode(e.which);
				return; // This is important as we do not want to clear 'buf'
			}
		}

		// clear it out (most cases fall through to this)
		buf = '';
	}, false);

})(window);
