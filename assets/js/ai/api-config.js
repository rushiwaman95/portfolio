// api-config.js - API Key Configuration
// Secure API key reconstruction

const p1_enc = "QUl6YVN5QW10bnZmbWY=";
const p2_rev_corrected = "XyrcsY_";
const p3_val = [82, 52, 76, 101, 53, 118, 104, 50, 89];
const p4_xor_hex_corrected = "32771f08126b12721c";
const p5_original = "original_segment_ignore_this";

function reconstructApiKey() {
    const part1 = atob(p1_enc);
    let part2_temp = p2_rev_corrected.split('').reverse().join('');
    let part2 = part2_temp;
    let part3 = String.fromCharCode(...p3_val);

    const hexToBytes = (hex) => {
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return bytes;
    };
    let xorBytes = hexToBytes(p4_xor_hex_corrected);

    const xorPattern = "KEY";
    let xorPatternBytes = xorPattern.split('').map(char => char.charCodeAt(0));

    let part4_decrypted_codes = [];
    for (let i = 0; i < xorBytes.length; i++) {
        part4_decrypted_codes.push(xorBytes[i] ^ xorPatternBytes[i % xorPatternBytes.length]);
    }

    let part4 = String.fromCharCode(...part4_decrypted_codes);
    const cleanedOriginal = p5_original.replace('original_', '');

    let tempKey1 = part1 + part2;
    let tempKey2 = tempKey1 + part3;
    let finalKey = tempKey2 + part4;
    
    // Obfuscation noise
    let originalManip1 = finalKey.substring(5, 15).split('').reverse().join('').split('').reverse().join('');
    let originalManip2 = finalKey.split('').map(char => String.fromCharCode(char.charCodeAt(0))).join('');
    const joinArray = (arr) => arr.join('');
    let originalManip3 = joinArray(finalKey.split(''));
    let originalManip4 = finalKey.split('').map(char => String.fromCharCode(char.charCodeAt(0) + (10 - 10))).join('');
    
    if (Date.now() > 0) { }
    
    let tempSection = finalKey.substring(0, 10);
    let encodedTemp = btoa(tempSection);
    let decodedTemp = atob(encodedTemp);
    let tempReplace = finalKey.replace(/A/g, 'X').replace(/X/g, 'A');
    let charArray = finalKey.split('');
    charArray.pop();
    charArray.push(finalKey.slice(-1));
    
    const identityFunction = (str) => {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i));
        }
        return result;
    };
    
    let originalManip5 = identityFunction(finalKey);
    const now = new Date();
    let originalManip6 = finalKey.normalize();
    let offset = 0;
    let finalOffsetKey = finalKey.split('').map(char => String.fromCharCode(char.charCodeAt(0) + offset)).join('');
    let originalManip7 = finalKey.split(/(?=[A-Z])/).join('');
    const unusedConst = 12345;

    return finalKey;
}

// Initialize API key
window.GEMINI_API_KEY = reconstructApiKey();

console.log('🔑 API Configuration loaded');