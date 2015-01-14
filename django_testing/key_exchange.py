import os
import struct

from Crypto.Cipher import AES
from Crypto.Hash import HMAC, SHA256, SHA512
import hashlib

import random

q = 99494096650139337106186933977618513974146274831566768179581759037259788798151499814653951492724365471316253651463342255785311748602922458795201382445323499931625451272600173180136123245441204133515800495917242011863558721723303661523372572477211620144038809673692512025566673746993593384600667047373692203583

g = 44157404837960328768872680677686802650999163226766694797650810379076416463147265401084491113667624054557335394761604876882446924929840681990106974314935015501571333024773172440352475358750668213444607353872754650805031912866692119819377041901642732455911509867728218394542745330014071040326856846990119719675

class PKCS7Encoder():
    """ Technique for padding a string as defined in RFC 2315, section 10.3, note #2 """
    class InvalidBlockSizeError(Exception):
        """Raised for invalid block sizes"""
        pass

    """ This class is used in order to coordinate the JavaScript and Python libraries.
        JavaScript uses a standard block size of 16 bytes, and uses padding. Python does not.
        This library makes the padding process automatically, in accordance with the JavaScript standard """

    def __init__(self, block_size=16):
        " The argument is the block size used by the encoder (in bytes) "
        if block_size!=16:
            raise PKCS7Encoder.InvalidBlockSizeError('The block size must be between 2 and 255, inclusive')
        self.block_size = block_size

    def encode(self, text):
        " The text is the STRING to be encoded "
        text_length = len(text)
        amount_to_pad = self.block_size - (text_length % self.block_size)
        " The text must be padded in order to be a multiple of the block size "
        if amount_to_pad == 0:
            amount_to_pad = self.block_size
        pad = chr(amount_to_pad)
        " The last character of the text will never be the padding one (i.e. will never have an ASCII value between 1 and 16) "
        return text + pad * amount_to_pad

    def decode(self, text):
        pad = ord(text[-1])
        return text[:-pad]

def sha256(x):
    """ Computes the SHA256 checksum of the given data, using the SHA256 library """
    h = SHA256.new()
    h.update(x)
    return (h.digest())

def sha512(x):
    """ Computes the SHA512 checksum of the given data, using the SHA512 library """
    h = SHA512.new()
    h.update(x)
    return (h.digest())

""" On what follows, the key (k) and initialization vectors are strings.
    As the key is an AES key, it must be 16, 24 or 32 bytes (characters) long.
    The iv must be 16 bytes (characters) long, as that is the block size. """

def cipher(k, m, iv):
    """ Ciphers a message 'm' , with the key 'k' and using the initialization vector 'iv', using the AES library """

    obj = AES.new(k, AES.MODE_CBC, iv)
    encoder = PKCS7Encoder()

    padded_value = encoder.encode(m)
    """ The text must be padded before it is encrypted, as explained above """
    ct = obj.encrypt(padded_value)

    return (ct)

def decipher(k, ct, iv):
    """ Deciphers a ciphertext 'ct', with the key 'k' and using the initialization vector 'iv', using the AES library """

    obj = AES.new(k, AES.MODE_CBC, iv)
    encoder = PKCS7Encoder()

    padded_value = obj.decrypt(ct)
    """ Having decrypted the text, the unpadding must be done """
    m = encoder.decode(padded_value)

    return (m)

def hmac(k, x):
    """ Authenticates some value 'x', with the key 'k', using the HMAC library. I returns a value of 32 bytes """
    "print 'value: ' + x.encode('hex')"
    obj = HMAC.new(k, digestmod=SHA256)
    obj.update(x)

    return (obj.digest())

def verifies(k, x, tag):
    """ Verifies the MAC (if the tag 'tag' is correct for the value 'x' with the key 'k') """

    tag_to_check = hmac(k, x)

    return (tag_to_check == tag)

def encrypt(k1, k2, m, iv):
    """ Encrypts under the encrypt-then-mac assumption """

    ct = cipher(k1, m, iv)
    tag = hmac(k2, iv + ct)

    "print 'iv : ' + iv.encode('hex') + '\nct: ' + ct.encode('hex')"

    return (iv + ct + tag)

def decrypt(k1, k2, iv, ct, tag):
    """ Decrypts under the encrypt-then-mac assumption """

    if (verifies(k2, iv+ct, tag)):
        m = decipher(k1, ct, iv)
        return (m)
    else:
        print (hmac(k2, iv+ct)).encode('hex')
        print tag.encode('hex')
        print 'Invalid tag!'

def parse_ct(ct):
    """ Parses a ciphertext and returns the iv, ciphered message and tag, (WARNING:) when the string has been converted to hexadecimal """
    iv = ct[:32]
    c = ct[32:(len(ct)-64)]
    tag = ct[(len(ct)-64):]
    
    return (iv, c, tag)

def parse_ct_original(ct):
    """ Parses a ciphertext when it is on its original form """
    return (ct[:16],ct[16:-32],ct[-32:])

def computeSecret(g, q):
    """ Computes the challenge to be used in the key exchange protocol """
    r = int(os.urandom(128).encode('hex'), 16) % q
    sec = pow(g,r,q)
    return sec

def createChallenge():
    """ Computes the challenge to be used in the key exchange protocol """
    cha = str(int(os.urandom(4).encode('hex'), 16))
    return cha