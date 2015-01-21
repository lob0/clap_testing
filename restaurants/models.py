from django.db import models
import datetime
import json

# Create your models here.

#qunado adiciona localizaao desc fica id de rest
class Loca_main(models.Model):
    Loca_desc = models.CharField(max_length=150, default="")
    Loca_lat = models.DecimalField( max_digits=11, decimal_places=7, default=0)
    Loca_long = models.DecimalField( max_digits=11, decimal_places=7, default=0)
    Loca_type = models.IntegerField(default=0)

    def toJSON(self):
        locout={'desc':self.Loca_desc,
                'lat':str(self.Loca_lat),
                'long':str( self.Loca_long),
                'type':str(self.Loca_type)
               }
        return locout


class Minor_restaurant(models.Model):
    Rstr_name  = models.CharField(max_length=30)
    Rstr_rate  = models.IntegerField(default=0)
    Rstr_wsug  = models.BooleanField(default='false')
    Rstr_desc  = models.CharField(max_length=300)
    Rstr_img   = models.CharField(max_length=150, default="")
    Rstr_chefs = models.CharField(max_length=150, default="")
    Rstr_tcoz  = models.CharField(max_length=30, default="")
    Rstr_lot   = models.IntegerField(default=0)
    Rstr_rsoc  = models.CharField(max_length=150, default="")
    Rstr_wire  = models.BooleanField( default='true')
    Rstr_loca   = models.ForeignKey(Loca_main, default=1)
    Rstr_phone = models.CharField(max_length=30, default="")
    Rstr_pmax = models.IntegerField(default=0)
    Rstr_pmin = models.IntegerField(default=0)

    def toJSON(self):
        locout=self.Rstr_loca.toJSON()
        cena={
              'name': self.Rstr_name,
              'description': self.Rstr_desc,
              'rate':self.Rstr_rate,
              'image':self.Rstr_img,
              'chefs': self.Rstr_chefs,
              'tipo_cozinha':self.Rstr_tcoz,
              'lotacao':str(self.Rstr_lot),
              'redes_sociais':self.Rstr_rsoc,
              'loc':locout,
              'wire': self.Rstr_wire
             }
        return cena

class Restaurant(models.Model):
    Rstr_id   = models.ForeignKey(Minor_restaurant)
    Rstr_pass = models.CharField(max_length=100, default="")
    Rstr_mail = models.CharField(max_length=100, default="")

class Rstr_reserva(models.Model):
    Rsvr_rstr = models.ForeignKey(Minor_restaurant, default=1)
    Rsvr_npess= models.IntegerField(default=1)
    Rsvr_pessoa= models.CharField(max_length=100, default="")
    Rsvr_data = models.DateField(default=datetime.date.today)


class Rstr_menu(models.Model):
    Menu_date  = models.DateField(default=datetime.date.today)
    Menu_desc  = models.CharField(max_length=150, default="")
    Menu_rstr  = models.ForeignKey(Restaurant, default=1)
    Menu_preco = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    Menu_veg   = models.BooleanField(default='false')
    Menu_eco   = models.BooleanField(default='false')
# boolean para vegetariano, boleano para economico,  

    def toJSON():
         cena={
               'date': self.Menu_date,
               'description': self.Menu_desc,
               'restaurant':self.Menu_rstr,
               'preco':self.Menu_preco,
              }
         return cena


class Menu_Dish(models.Model):
    Dish_Desc = models.CharField(max_length=100, default="")
    Dish_menu = models.ForeignKey(Rstr_menu)


class Nts_course(models.Model):
    course_uc = models.CharField(max_length=30, default="")
    course_name = models.CharField(max_length=30, default="")


class Minor_nts(models.Model):
    nts_path = models.CharField(max_length=30, default="")
    nts_acc = models.BooleanField(default='false')
    nts_stdid = models.IntegerField( default=0)
    nts_ano = models.IntegerField(default=0)
    nts_uc = models.ForeignKey(Nts_course,default=1)

