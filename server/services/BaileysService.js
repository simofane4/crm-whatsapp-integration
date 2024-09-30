const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const path = require('path');

const connectWhatsApp = async () => {
    const { state, saveState } = useSingleFileAuthState(path.join(__dirname, 'auth_info.json'));
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    // Save credentials
    sock.ev.on('creds.update', saveState);

    // Display QR Code
    sock.ev.on('connection.update', (update) => {
        const { qr } = update;
        if (qr) {
            qrcode.generate(qr, { small: true });
        }
    });
};

module.exports = { connectWhatsApp };
