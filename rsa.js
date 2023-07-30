// RSA Key generation function
function generateRSAKeys() {
    // Step 1: Choose two distinct prime numbers p and q
    const p = 61;
    const q = 53;

    // Step 2: Compute n = p * q (public key)
    const n = p * q;

    // Step 3: Compute the totient of n (phi)
    const phi = (p - 1) * (q - 1);

    // Step 4: Choose an integer e such that 1 < e < phi and gcd(e, phi) = 1 (public key)
    let e = 17;

    // Step 5: Compute the modular multiplicative inverse of e modulo phi (private key)
    let d = 1;
    while ((d * e) % phi !== 1) {
        d++;
    }

    return { publicKey: { n, e }, privateKey: { n, d } };
}

// RSA Encryption function
function encrypt() {
    const plaintext = document.getElementById("plaintext").value;
    const { publicKey } = generateRSAKeys();
    const n = publicKey.n;
    const e = publicKey.e;

    const encrypted = [];
    for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const encryptedCharCode = modPow(charCode, e, n);
        encrypted.push(encryptedCharCode);
    }

    document.getElementById("ciphertext").value = encrypted.join(",");
}

// RSA Decryption function
function decrypt() {
    const ciphertext = document.getElementById("ciphertext").value.split(",");
    const { privateKey } = generateRSAKeys();
    const n = privateKey.n;
    const d = privateKey.d;

    const decrypted = [];
    for (let i = 0; i < ciphertext.length; i++) {
        const encryptedCharCode = parseInt(ciphertext[i]);
        const decryptedCharCode = modPow(encryptedCharCode, d, n);
        decrypted.push(String.fromCharCode(decryptedCharCode));
    }

    document.getElementById("decryptedtext").value = decrypted.join("");
}

// Modular exponentiation function (to handle large numbers)
function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;

    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}
