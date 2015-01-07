from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from models import Minor_restaurant
from models import Loca_main
from models import *
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import datetime
import sys

from crypto import *
from utils import *

# Create your views here.

#view para adicionar o restaurante

def calendar(request):
    template=loader.get_template('calendarDemo.html')
    context= RequestContext(request,{})
    return HttpResponse(template.render(context))

@csrf_exempt
def addRSTR(request):
    context= RequestContext(request,{})
    data=json.loads(request.body)
    if request.method == 'POST':
        name = data.get('nameRestaurant')
        desc = data.get('descriptionRestaurant')
        chef = data.get('chefs')
        tcoz = data.get('cuisineType')
        lot  = data.get('capacityRestaurant')
        pre  = data.get('averagePrice')
        print(data.get('restaurantImage'))
        entry= Minor_restaurant(Rstr_name=name, Rstr_desc=desc, Rstr_chefs=chef, Rstr_tcoz=tcoz, Rstr_lot=lot )
        entry.save()
    return HttpResponse("Done")

#ver dados de todos os restaurantes
@ensure_csrf_cookie
def index(request):
    alt = Minor_restaurant.objects.order_by('-Rstr_name')
    rst = []
    for p in alt:
        rst.append(p.toJSON())
    return HttpResponse(json.dumps(rst),content_type="application/json")

#informacao especifica de um restaurante
@ensure_csrf_cookie
def indexfix(request, rest):
    field=rest.replace('_',' ')
    alt = Minor_restaurant.objects.filter(Rstr_name=field)
    print(alt)
    rst = []
    for p in alt:
        rst.append(p.toJSON())
    return HttpResponse(rst)


#menus
@csrf_exempt
def addmenu(request):
    context= RequestContext(request,{})
    data=json.loads(request.body)
    if request.method == 'POST':
        date=data.get('data')
        desc=data.get('desc')
        prec=data.get('preco')
        restn=data.get('rest')
        rest=Minor_restaurant.objects.filter(Rstr_name=restn)[0]
        res=Rstr_menu(Menu_date=date, Menu_desc=desc, Menu_rstr=rest, Menu_preco=prec)
        res.save()
    return HttpResponse("Done")
        
#adicionar um menu


#view de teste
@csrf_exempt
def rstrget(request):
    print(request)
    print("\n")
    if request.method == 'POST':
        print("post\n")
        print("forma do yoan:\n")
        print(json.loads(request.body))
    return HttpResponse("Done")

#vitor P^2 abaixo esta a tua view 
#login

hash_pass = None 
ctrl = 1
cipher_key = None
server_challenge = None

@csrf_exempt
def logtrans(request):
    try:
        context= RequestContext(request,{})
        d=json.loads(request.body)

        if (request.method == 'POST'):
            if (ctrl == 1):
                manager = Restaurant.objects.filter(Rstr_mail = d)[0]
                
                global hash_pass
                hash_pass = (manager.Rstr_pass).decode('hex')
                
                global ctrl
                ctrl = 3
            
                return HttpResponse("Ready for key exchange")
            elif (ctrl == 3):
                iv, c, tag = parse_ct(d)

                m = decrypt(hash_pass, hash_pass, iv.decode('hex'), c.decode('hex'), tag.decode('hex'))
            
                pk_client = int(m)
                print 'pk_client: ' + str(pk_client)
                
                sk_server = int(os.urandom(128).encode('hex'), 16) % q
                print 'Server secret: ' + str(sk_server)
                
                shared_secret = pow(pk_client, sk_server, q)
                print 'Shared secret: ' + str(shared_secret)

                pk_server = pow(g, sk_server, q)
                print 'pk_server: ' + str(pk_server)
        
                ct1 = encrypt(hash_pass, hash_pass, str(pk_server), os.urandom(16))
                
                print ct1.encode('hex')

                global cipher_key
                global mac_key
                derivation = sha512(str(shared_secret))
                cipher_key = derivation[:32]
                mac_key = derivation[32:]
                
                global server_challenge
                server_challenge = createChallenge()
                print 'Challenge: ' + server_challenge
                ct2 = encrypt(cipher_key, mac_key, server_challenge, os.urandom(16))

                ctrl = 5

                return HttpResponse(ct1.encode('hex') + ',' + ct2.encode('hex'))

            elif (ctrl == 5):
                iv, c, tag = parse_ct(d)
                print 'cipher_key: ' + cipher_key.encode('hex') + '\nmac_key: ' + mac_key.encode('hex')
                m = decrypt(cipher_key, mac_key, iv.decode('hex'), c.decode('hex'), tag.decode('hex'))
                
                print 'message: ' + m
                
                split_ct = m.split(',')
                client_challenge = str(split_ct[0])
                
                if (split_ct[1] == server_challenge):
                    ct = encrypt(cipher_key, mac_key, client_challenge, os.urandom(16))
                    
                    ctrl = 1
                    
                    return HttpResponse(ct.encode('hex'))
    except:
        print "Unexpected error:", sys.exc_info()[0]
        ctrl = 1
        #manager = Restaurant.objects.filter(Rstr_mail=d)[0]
        #print(manager.Rstr_pass)
    return HttpResponse("Fim da view")


ctrl_dh = 1

@csrf_exempt
def register(request):
    "View de registo de um representante de restaurante"
    print 'Entrei na view!'
    #try:
    context= RequestContext(request,{})
    d=json.loads(request.body)
    
    if (request.method == 'POST'):
        if (ctrl_dh == 1):
            pk_client = int(d)
            print 'pk_client: ' + str(pk_client)
            
            sk_server = int(os.urandom(128).encode('hex'), 16) % q
            print 'Server secret: ' + str(sk_server)
            
            shared_secret = pow(pk_client, sk_server, q)
            print 'Shared secret: ' + str(shared_secret)

            pk_server = pow(g, sk_server, q)
            print 'pk_server: ' + str(pk_server)
     
            global ctrl_dh
            ctrl_dh = 2
       
            global cipher_key
            global mac_key
            derivation = sha512(str(shared_secret))
            cipher_key = derivation[:32]
            mac_key = derivation[32:]

            print 'controlador', ctrl_dh

            return HttpResponse(str(pk_server))
        elif (ctrl_dh == 2):

            print 'estou aqui'

            iv, c, tag = parse_ct(d)

            print 'fiz o parse do ct'

            print 'cipher_key: ' + cipher_key.encode('hex') + '\nmac_key: ' + mac_key.encode('hex')
            m = decrypt(cipher_key, mac_key, iv.decode('hex'), c.decode('hex'), tag.decode('hex'))
            
            print 'message: ' + m
            
            ctrl_dh = 1

            split_m = m.split(',')

            print split_m

            entry_rest = Minor_restaurant(Rstr_name=split_m[2], Rstr_desc=split_m[3])
            entry_rest.save()

#            entry_mana = Restaurant(Rstr_pass=split_m[0], Rstr_mail=split_m[1])
#            entry_mana.save()

            return HttpResponse('Registo efetuado com sucesso!')
        else: 
            print 'aqui'
            return HttpResponse('Chatisse!')
    #except:

    return HttpResponse('Fim da view')

@ensure_csrf_cookie
def locaget(request):
    alt = Loca_main.objects.all()
    loc = []
    for p in alt:
        loc.append( p.toJSON() )
    return HttpResponse(json.dumps(loc),content_type="application/json")

#@require_http_methods(["GET","POST"])

#Fabio work
@csrf_exempt
def locaput(request):
	#type(request)
	context= RequestContext(request,{})
	#print(request.body)
	d=json.loads(request.body)
	#print(context['lat'])
	print(d['lat'])
	print(d['lon'])
	print(d['type'])
	entry=Loca_main(Loca_desc=d['type'],Loca_lat=d['lat'],Loca_long=d['lon'])
	entry.save()
	return HttpResponse("Done")	
