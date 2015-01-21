"""
Cripto.py works as a library

Classes:
	PKCS7Encoder
	InvalidBlockSizeError
"""


import os
import struct

from Crypto.Cipher import AES
from Crypto.Hash import HMAC, SHA256, SHA512
import hashlib

# automodule options
OPTIONS = ['members',
           'undoc-members',
           # 'inherited-members', # disabled because there's a bug in sphinx
           'show-inheritance',
          ]


q = 99494096650139337106186933977618513974146274831566768179581759037259788798151499814653951492724365471316253651463342255785311748602922458795201382445323499931625451272600173180136123245441204133515800495917242011863558721723303661523372572477211620144038809673692512025566673746993593384600667047373692203583

g = 44157404837960328768872680677686802650999163226766694797650810379076416463147265401084491113667624054557335394761604876882446924929840681990106974314935015501571333024773172440352475358750668213444607353872754650805031912866692119819377041901642732455911509867728218394542745330014071040326856846990119719675

class PKCS7Encoder():
    """ Technique for padding a string as defined in RFC 2315, section 10.3, note #2 """
    class InvalidBlockSizeError(Exception):
        """Raised for invalid block sizes"""
        pass

    def __init__(self, block_size=16):
        if block_size < 2 or block_size > 255:
            raise PKCS7Encoder.InvalidBlockSizeError('The block size must be between 2 and 255, inclusive')
        self.block_size = block_size

    def encode(self, text):
        text_length = len(text)
        amount_to_pad = self.block_size - (text_length % self.block_size)
        if amount_to_pad == 0:
            amount_to_pad = self.block_size
        pad = chr(amount_to_pad)
        return text + pad * amount_to_pad

    def decode(self, text):
        pad = ord(text[-1])
        return text[:-pad]

def sha256(x):
    " Computes the SHA256 checksum of the given data "
    h = SHA256.new()
    h.update(x)
    return (h.digest())

def sha512(x):
    " Computes the SHA512 checksum of the given data "
    h = SHA512.new()
    h.update(x)
    return (h.digest())

def cipher(k, m, iv):
    " Encrypts a message "

    obj = AES.new(k, AES.MODE_CBC, iv)
    encoder = PKCS7Encoder()

    padded_value = encoder.encode(m)
    ct = obj.encrypt(padded_value)

    return (ct)

def decipher(k, ct, iv):
    " Decrypts a ciphertext "

    obj = AES.new(k, AES.MODE_CBC, iv)
    encoder = PKCS7Encoder()

    padded_value = obj.decrypt(ct)
    m = encoder.decode(padded_value)

    return (m)

def hmac(k, x):
    " Authenticates some value "
    print 'value: ' + x.encode('hex')
    obj = HMAC.new(k, digestmod=SHA256)
    obj.update(x)

    return (obj.digest())

def verifies(k, x, tag):
    " Verifies the MAC "

    tag_to_check = hmac(k, x)

    return (tag_to_check == tag)

def encrypt(k1, k2, m, iv):
    " Encrypts under the encrypt-then-mac assumption "

    ct = cipher(k1, m, iv)
    tag = hmac(k2, iv + ct)

    print 'iv : ' + iv.encode('hex') + '\nct: ' + ct.encode('hex')

    return (iv + ct + tag)

def decrypt(k1, k2, iv, ct, tag):
    " Decrypts under the encrypt-then-mac assumption "

    if (verifies(k2, iv+ct, tag)):
        m = decipher(k1, ct, iv)
        return (m)
    else:
        print (hmac(k2, iv+ct)).encode('hex')
        print tag.encode('hex')
        print 'Invalid tag!'
