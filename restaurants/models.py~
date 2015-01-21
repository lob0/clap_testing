from django.db import models
import datetime
import json

# Create your models here.


class Loca_main(models.Model):
    Loca_desc = models.CharField(max_length=150, default="")
    Loca_lat = models.DecimalField( max_digits=11, decimal_places=7, default=0)
    Loca_long = models.DecimalField( max_digits=11, decimal_places=7, default=0)

    def toJSON(self):
        locout={'desc':self.Loca_desc,
                'lat':str(self.Loca_lat),
                'long':str( self.Loca_long)
               }
        return locout

        
class Minor_restaurant(models.Model):
    Rstr_name = models.CharField(max_length=30)
    Rstr_like = models.IntegerField(default=0)
    Rstr_dlike = models.IntegerField(default=0)
    Rstr_wsug = models.BooleanField(default='false')
    Rstr_desc = models.CharField(max_length=300)
    Rstr_img = models.CharField(max_length=150, default="")
    Rstr_chefs= models.CharField(max_length=150, default="")
    Rstr_tcoz= models.CharField(max_length=30, default="")
    Rstr_lot = models.IntegerField(default=0)
    Rstr_loc = models.ForeignKey(Loca_main, default=1 )
    Rstr_rsoc= models.CharField(max_length=150, default="")

    def toJSON(self):
        locout=self.Rstr_loc.toJSON()
        cena={
              'name': self.Rstr_name,
              'description': self.Rstr_desc,
              'like':self.Rstr_like,
              'dlike':self.Rstr_dlike,
              'image':self.Rstr_img,
              'chefs': self.Rstr_chefs,
              'tipo_cozinha':self.Rstr_tcoz,
              'lotacao':str(self.Rstr_lot),
              'redes_sociais':self.Rstr_rsoc,
              'location':locout
             }
        return cena

class Restaurant(models.Model):
    Rstr_id = models.ForeignKey(Minor_restaurant)
    Rstr_pass = models.CharField(max_length=30, default="")
    Rstr_mail = models.CharField(max_length=30, default="")


class Rstr_menu(models.Model):
    Menu_date = models.DateField(default=datetime.date.today)
    Menu_desc = models.CharField(max_length=150, default="")
    Menu_rstr = models.ForeignKey(Restaurant, default=1)
    Menu_preco = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def toJSON():
         cena={
               'date': self.Menu_date,
               'description': self.Menu_desc,
               'restaurant':self.Menu_rstr,
               'preco':self.Menu_preco,
              }
         return cena

class Nts_course(models.Model):
    course_uc = models.CharField(max_length=30, default="")
    course_name = models.CharField(max_length=30, default="")


class Minor_nts(models.Model):
    nts_path = models.CharField(max_length=30, default="")
    nts_acc = models.BooleanField(default='false')
    nts_stdid = models.IntegerField( default=0)
    nts_ano = models.IntegerField(default=0)
    nts_uc = models.ForeignKey(Nts_course,default=1)

