# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0002_auto_20150115_1706'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='minor_restaurant',
            name='Rstr_lat',
        ),
        migrations.RemoveField(
            model_name='minor_restaurant',
            name='Rstr_long',
        ),
        migrations.AddField(
            model_name='minor_restaurant',
            name='Rstr_loca',
            field=models.ForeignKey(default=1, to='restaurants.Loca_main'),
            preserve_default=True,
        ),
    ]
