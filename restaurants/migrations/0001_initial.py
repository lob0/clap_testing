# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Loca_main',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Loca_desc', models.CharField(default=b'', max_length=150)),
                ('Loca_lat', models.DecimalField(default=0, max_digits=11, decimal_places=7)),
                ('Loca_long', models.DecimalField(default=0, max_digits=11, decimal_places=7)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Menu_Dish',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Dish_Desc', models.CharField(default=b'', max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Minor_nts',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nts_path', models.CharField(default=b'', max_length=30)),
                ('nts_acc', models.BooleanField(default=b'false')),
                ('nts_stdid', models.IntegerField(default=0)),
                ('nts_ano', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Minor_restaurant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Rstr_name', models.CharField(max_length=30)),
                ('Rstr_like', models.IntegerField(default=0)),
                ('Rstr_dlike', models.IntegerField(default=0)),
                ('Rstr_wsug', models.BooleanField(default=b'false')),
                ('Rstr_desc', models.CharField(max_length=300)),
                ('Rstr_img', models.CharField(default=b'', max_length=150)),
                ('Rstr_chefs', models.CharField(default=b'', max_length=150)),
                ('Rstr_tcoz', models.CharField(default=b'', max_length=30)),
                ('Rstr_lot', models.IntegerField(default=0)),
                ('Rstr_rsoc', models.CharField(default=b'', max_length=150)),
                ('Rstr_wire', models.BooleanField(default=b'false')),
                ('Rstr_lat', models.DecimalField(default=1, max_digits=11, decimal_places=7)),
                ('Rstr_long', models.DecimalField(default=1, max_digits=11, decimal_places=7)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Nts_course',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('course_uc', models.CharField(default=b'', max_length=30)),
                ('course_name', models.CharField(default=b'', max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Rstr_pass', models.CharField(default=b'', max_length=100)),
                ('Rstr_mail', models.CharField(default=b'', max_length=100)),
                ('Rstr_id', models.ForeignKey(to='restaurants.Minor_restaurant')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Rstr_menu',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Menu_date', models.DateField(default=datetime.date.today)),
                ('Menu_desc', models.CharField(default=b'', max_length=150)),
                ('Menu_preco', models.DecimalField(default=0, max_digits=5, decimal_places=2)),
                ('Menu_veg', models.BooleanField(default=b'false')),
                ('Menu_eco', models.BooleanField(default=b'false')),
                ('Menu_rstr', models.ForeignKey(default=1, to='restaurants.Restaurant')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='minor_nts',
            name='nts_uc',
            field=models.ForeignKey(default=1, to='restaurants.Nts_course'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='menu_dish',
            name='Dish_menu',
            field=models.ForeignKey(to='restaurants.Rstr_menu'),
            preserve_default=True,
        ),
    ]
