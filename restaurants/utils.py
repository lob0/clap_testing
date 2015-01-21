import os
import struct

from Crypto.Cipher import AES
from Crypto.Hash import HMAC, SHA256, SHA512
import hashlib

def parse_ct(ct):
    " Parses a ciphertext and returns the iv, ciphered message and tag "
    iv = ct[:32]
    c = ct[32:(len(ct)-64)]
    tag = ct[(len(ct)-64):]

    return (iv, c[:len(c) / 2], tag)

def computeSecret(g, q):
    " Computes the challenge to be used in the key exchange protocol "
    r = int(os.urandom(128).encode('hex'), 16) % q
    sec = pow(g,r,q)
    return sec

def createChallenge():
    " Computes the challenge to be used in the key exchange protocol "
    cha = str(int(os.urandom(4).encode('hex'), 16))
    return cha
