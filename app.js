document.getElementById('submit-presence').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var currentTime = new Date().toLocaleString(); // Mendapatkan waktu saat ini dalam format lokal
    document.getElementById('attendance-time').value = currentTime; // Menampilkan waktu presensi otomatis

    if (name.trim() === '') {
        alert('Masukkan Nama terlebih dahulu');
        return;
    }

    // Gabungkan data untuk presensi (Nama + Waktu)
    var presenceData = `Nama: ${name}, Waktu: ${currentTime}`;

    // 1. Enkripsi SHA-256
    var shaHash = CryptoJS.SHA256(presenceData).toString(CryptoJS.enc.Base64);
    document.getElementById('sha-result').value = shaHash;

    // 2. Enkripsi AES
    var secretKey = '1234567890123456'; // Kunci AES 128-bit
    var aesEncrypted = CryptoJS.AES.encrypt(presenceData, secretKey).toString();
    document.getElementById('aes-result').value = aesEncrypted;

    // 3. Enkripsi RSA
    // var rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);
    // var pubKey = rsaKeypair.pubKey;
    // var encryptedRsa = pubKey.encrypt(presenceData);
    // var rsaEncryptedBase64 = KJUR.crypto.CipherUtil.bytesToBase64(encryptedRsa);
    // document.getElementById('rsa-result').value = encryptedRsa;

    var rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);
    var pubKey = rsaKeypair.pubKeyObj; // Akses kunci publik yang benar

    // Enkripsi data menggunakan kunci publik
    var encryptedRsaHex = pubKey.encrypt(presenceData); // Menghasilkan output dalam HEX

    // Konversi HEX ke Base64
    var rsaEncryptedBase64 = hextob64(encryptedRsaHex); // hextob64 bawaan jsrsasign
    document.getElementById('rsa-result').value = rsaEncryptedBase64;
});
