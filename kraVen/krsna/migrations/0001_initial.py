# Generated by Django 5.1.2 on 2024-10-22 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Warranty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_address', models.CharField(max_length=42)),
                ('product_name', models.CharField(max_length=100)),
                ('warranty_start_date', models.DateField()),
                ('warranty_end_date', models.DateField()),
                ('imei_number', models.CharField(max_length=25, null=True)),
            ],
        ),
    ]
