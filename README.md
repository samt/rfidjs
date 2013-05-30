# RFID.js

Reads keyboard input (from an RFID device) and emits an event containing the
validated id code.

## Applications

This is pimarily useful for kiosks running some sort of web application

## Usage

Just register a listener for the event

```
document.addEventListener("RFIDCardScan",function (e) {
	console.log('Card Scanned: ' + e.idcode);
},false);
```

## License

[The MIT License](http://opensource.org/licenses/MIT)