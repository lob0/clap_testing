import unittest
import random
from key_exchange import *

""" To run the tests, simply run "python tests.py" """

def random_string(n):
    """ Generates a random string with n characters """
    res=[]
    for x in range(0,n):
        res.append(chr(random.randint(0,255)))

    return ''.join(res)

def random_text(n):
    """ Generates a random text (characters between 'a' and 'z') with n characters """

    res=[]
    for x in range(0,n):
        res.append(chr(random.randint(97,122)))
    
    return ''.join(res)

class TestClass(unittest.TestCase):

    def setUp(self):
        
        """ Generate random keys (16,24 and 32 bytes) """
        self.tk=[]
        for x in range(0,10):
            self.tk.append([random_string(16),random_string(16)])
        for x in range(10,20):
            self.tk.append([random_string(24),random_string(24)])
        for x in range(20,30):
            self.tk.append([random_string(32),random_string(32)])

        """ Generate random IVs """
        self.tiv=[]
        for x in range(0,10):
            self.tiv.append(random_string(16))

        """ Generate random messages """
        self.tm=["","mensagem_com$#caracteres!&especiais -.,="]
        for x in range(2,10):
            self.tm.append(random_text(x*50))

    def testEncoding(self):
        """ Tests the PKCS7Encoder class """

        pkcs7 = PKCS7Encoder()

        for x in range(0,10):
            """ decoding after encoding returns the original value """
            self.assertEqual( self.tm[x] , pkcs7.decode(pkcs7.encode(self.tm[x])) )
            """ encoding returns a string that is a multiple of 16 """
            self.assertEqual( len(pkcs7.encode(self.tm[x]))%16 , 0 )

    def testSHA(self):
        """ Tests the SHA hashes """

        for x in range(0,10):
            self.assertEqual(len(sha256(self.tm[x])) , 32)
            self.assertEqual(len(sha512(self.tm[x])) , 64)

    def testHmac(self):
        """ Tests the correction of the 'hmac' and 'verifies' functions """

        for x in range(0,10):
            self.assertTrue( verifies(self.tk[x][1] , self.tm[x] , hmac( self.tk[x][1] , self.tm[x] ) ) )
            self.assertEqual( len(hmac( self.tk[x][1] , self.tm[x] )) , 32 )

    def testEncryptCorrection(self):
        """ Test the correction of the 'encrypt' and 'decrypt' function, which depends on the cipher and hmac functions
            Implicitly, it also tests the parse_ct_original function """

        for x in range(0,10):
            ct=encrypt(self.tk[x][0],self.tk[x][1],self.tm[x],self.tiv[x])
            (iv,ct2,tag)=parse_ct_original(ct)
            res=decrypt(self.tk[x][0],self.tk[x][1],iv,ct2,tag)

            self.assertEqual(self.tm[x],res)

            ct=encrypt(self.tk[x+10][0],self.tk[x+10][1],self.tm[x],self.tiv[x])
            (iv,ct2,tag)=parse_ct_original(ct)
            res=decrypt(self.tk[x+10][0],self.tk[x+10][1],iv,ct2,tag)

            self.assertEqual(self.tm[x],res)

            ct=encrypt(self.tk[x+20][0],self.tk[x+20][1],self.tm[x],self.tiv[x])
            (iv,ct2,tag)=parse_ct_original(ct)
            res=decrypt(self.tk[x+20][0],self.tk[x+20][1],iv,ct2,tag)

            self.assertEqual(self.tm[x],res)



if __name__ == '__main__':
    unittest.main()