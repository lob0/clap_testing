# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0003_auto_20150119_1434'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rstr_reserva',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Rsvr_npess', models.IntegerField(default=1)),
                ('Rsvr_pessoa', models.CharField(default=b'', max_length=100)),
                ('Rsvr_data', models.DateField(default=datetime.date.today)),
                ('Rsvr_rstr', models.ForeignKey(default=1, to='restaurants.Minor_restaurant')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RenameField(
            model_name='minor_restaurant',
            old_name='Rstr_dlike',
            new_name='Rstr_pmax',
        ),
        migrations.RenameField(
            model_name='minor_restaurant',
            old_name='Rstr_like',
            new_name='Rstr_pmin',
        ),
        migrations.AddField(
            model_name='minor_restaurant',
            name='Rstr_phone',
            field=models.CharField(default=b'', max_length=30),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='minor_restaurant',
            name='Rstr_rate',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
