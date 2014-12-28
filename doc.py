#!/usr/bin/python
"""
Author          : Jorge Lobo
Date (dd-mm-aa) : 271214
Description     : Script to automatically insert block commentaries in 'text' files.
Input           : <line number>/<function name> <comment file> <code file>
Output          : 'less' file w/ modified lines 

open the comment file
read comment from comment file, and concat it with comment symbol of the language
open code file
locate line number or function number to add the comment
add the comment
"""
#glob supports UNIX style pathname 
import glob
#re supports regular expressions
import re
#sys to deal w/ command line arguments
import sys

#
# the script gets only 3 arguments, defined above
# or instead, implement usage mode on run, ex: usage : test.py -i file -o output
#
try:
	x = len(sys.argv)
except not x == 4:           
 	print "we can only handle 4 arguments, either you accept that or go away mess with your mother"
 	print "you are now advised to re-run the command with 3 arguments : 1 - line/function 2 - comment file 3- code file"
 	
#
# both files shall be passed with is path correctly accessible.
# 
#  raise and error if  the file do not open, specify the error path, pointer, empty, etc
try:
   fh = open(sys.argv[2], "a")
   #fh.write("\nThis is my test file for exception handling!!")
   except IOError:
   print "Error: can\'t find file or read data"
   
"""
pseudo:
begin structure

while not eof
	while not \n

	take the line, and put it in the new spot with # concatened

end of outter while

open code file

if -l vai para a linha, if -f vai para a function, see how works flags on pros 

just paste the code

close the file
close the file


"""
fh.close()

#
# copiar o codigo para nova estrutura, com os hastag antes
#



