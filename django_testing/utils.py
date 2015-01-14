import os
import struct

from Crypto.Cipher import AES
from Crypto.Hash import HMAC, SHA256, SHA512
import hashlib

def parse_ct(ct):
    " Parses a ciphertext and returns the iv, ciphered message and tag, (WARNING:) when the string has been converted to hexadecimal"
    iv = ct[:32]
    c = ct[32:(len(ct)-64)]
    tag = ct[(len(ct)-64):]
    
    return (iv, c, tag)

def parse_ct_original(ct):
    " Parses a ciphertext when it is on its original form "
    return (ct[:16],ct[16:-32],ct[-32:])

def computeSecret(g, q):
    " Computes the challenge to be used in the key exchange protocol "
    r = int(os.urandom(128).encode('hex'), 16) % q
    sec = pow(g,r,q)
    return sec

def createChallenge():
    " Computes the challenge to be used in the key exchange protocol "
    cha = str(int(os.urandom(4).encode('hex'), 16))
    return cha