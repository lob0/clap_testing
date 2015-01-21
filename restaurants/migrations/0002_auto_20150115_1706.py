# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='loca_main',
            name='Loca_type',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='minor_restaurant',
            name='Rstr_wire',
            field=models.BooleanField(default=b'true'),
            preserve_default=True,
        ),
    ]
